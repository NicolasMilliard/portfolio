---
title: 'Designing a real-time frontend that doesn’t break'
description:
  'How normalization, cache updates, and careful reconciliation kept a complex
  support dashboard consistent.'
publishedAt: '2026-07-31'
---

At [Yper](https://www.yper.fr/), I worked on a support dashboard that aggregates
conversations from WhatsApp, Messenger, live chat, and email.

The UI wasn’t just real-time. It was constantly being reshaped by incoming
messages, reassigned agents, and priority changes, while users applied more than
ten filters on top of it.

## One WebSocket, many events

We used a single WebSocket connection for the entire app, emitting events for
messages, conversation updates, agent changes, priority updates, and type
transitions.

This simplified the backend but shifted complexity to the client, which had to
correctly interpret and apply a growing set of event types in real time.

Reconnection was handled with a simple capped backoff.

```tsx
const retry = (attemptNumber: number) => Math.min(5_000, attemptNumber * 1_000);

useWebSocket(url, {
  shouldReconnect: () => true,
  reconnectInterval: retry,
});
```

## The normalization layer

The system only became manageable once I introduced a strict normalization
layer.

Every incoming payload—REST or WebSocket—was validated with Zod and mapped into
a shared internal format.

```tsx
function normalizeConversation(
  input: RestConversation | WsConversationEvent,
): Conversation {
  if ('event_type' in input) {
    return {
      id: input.payload.id,
      status: input.payload.state,
      updatedAt: new Date(input.payload.updated_at),
    };
  }

  return {
    id: input.id,
    status: input.status,
    updatedAt: new Date(input.updatedAt),
  };
}
```

Without this layer, every feature would have interpreted real-time data slightly
differently. With it, the system became deterministic.

## Snapshot + event stream

The data model followed a simple idea.

The REST API provides a snapshot.

The WebSocket provides a stream of updates.

Instead of maintaining separate state for both, I used TanStack Query as the
single client-side state layer and applied WebSocket updates directly to its
cache.

```tsx
queryClient.setQueryData<Conversation[]>(['conversations'], (old) => {
  if (!old) return old;

  return old.map((conversation) =>
    conversation.id === update.id
      ? { ...conversation, ...update }
      : conversation,
  );
});
```

The UI already subscribed to TanStack Query, so WebSocket events naturally
became incremental cache mutations instead of a parallel state system.

That mattered most when the table became more complex. With more than ten
filters active at once, full refetches on every event would have been both
expensive and visually unstable. Incremental updates kept the interface
responsive while preserving the user’s current view.

## Consistency is the real problem

Real-time systems rarely fail loudly. They drift.

Events arrive out of order, updates overlap, and state changes while the user is
actively filtering data.

To handle that, I relied on ordering and idempotency. Each event carried a
timestamp, allowing deterministic application of updates and safe rejection of
stale ones. Combined with schema validation, this kept the system predictable.

## Optimistic UI changes the rules

One subtle challenge was outgoing messages.

When an agent sends a message, waiting for server confirmation before displaying
it makes the interface feel slow. In a support tool, that delay is immediately
noticeable.

So messages were rendered optimistically before the server confirmed them.

That introduces a new problem: reconciliation.

A WebSocket event arrives shortly after with the authoritative version of the
same message. Without careful handling, this leads to duplicates, ordering
issues, and temporary inconsistencies.

To solve it, optimistic messages carried temporary client-side identifiers and
were reconciled once the server event arrived. The UI stayed instant, while the
backend remained the source of truth.

## Trade-offs

This architecture worked, but it wasn’t free.

The combination of REST and WebSockets is powerful, but also the hardest part to
reason about. Keeping both sources in sync requires discipline, especially as
the number of event types grows.

The normalization layer also introduced duplication of logic that could arguably
live server-side.

None of these decisions are universally correct. They are trade-offs you accept
to make the system predictable under constant change.

## What I’d revisit today

Looking back, the architecture holds up well.

REST snapshots, WebSocket event streams, strict normalization, and TanStack
Query as the client-side state layer formed a coherent model that stayed
manageable even as complexity increased.

The main thing I’d revisit is where normalization happens. A portion of that
logic could likely move server-side to simplify the frontend and reduce
duplication.

I’d also evaluate transport choices more selectively. WebSockets made sense for
highly interactive parts of the system, but some one-way updates could likely be
handled with Server-Sent Events at a lower complexity cost.

## Conclusion

Real-time UI is easy to demonstrate and hard to get right.

The challenge isn’t speed. It’s consistency under continuous change.

Once you model the system as a snapshot plus an event stream, everything becomes
easier to reason about. The hard part is not pushing updates.

It’s making sure those updates never break the shape of reality the user is
looking at.
