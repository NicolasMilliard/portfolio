---
title: 'How I kept a real-time frontend from drifting'
description:
  'The hard part wasn’t receiving updates. It was making every view tell the
  same truth.'
publishedAt: '2026-07-31'
updatedAt: '2026-08-03'
image:
  src: '/og/articles/og-image-how-i-kept-a-real-time-frontend-from-drifting.png'
  alt:
    'The hard part wasn’t receiving updates. It was making every view tell the
    same truth.'
  width: 1200
  height: 630
---

At [Yper](https://www.yper.fr/), I worked on a support dashboard that aggregates
conversations from WhatsApp, Messenger, live chat, and email.

The UI wasn’t just real-time. It was constantly being reshaped by incoming
messages, reassigned agents, and priority changes, while users applied more than
ten filters on top of it.

The dangerous failure wasn’t a disconnected socket. It was a dashboard that
looked healthy while showing stale state. A conversation could change priority
while an agent was looking at a filtered queue. If an older update won the race,
the row could remain in a view where it no longer belonged.

Nothing crashed. The interface simply stopped matching the backend.

That gave the frontend one invariant: older state must never replace newer
state. Normalization, cache updates, and optimistic reconciliation were all
different ways of protecting that rule.

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

The retry recovered the transport, not the data. After a disconnect, the client
couldn’t assume it had seen every event. A fresh REST snapshot re-established
the baseline before the WebSocket returned to providing incremental updates.

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

The normalizer did more than hide API differences. It made `updatedAt`
comparable across both transports, so every cache update could follow the same
rule: compare first, mutate second.

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

  return old.map((conversation) => {
    if (conversation.id !== update.id) return conversation;
    if (conversation.updatedAt.getTime() >= update.updatedAt.getTime()) {
      return conversation;
    }

    return { ...conversation, ...update };
  });
});
```

The UI already subscribed to TanStack Query, so WebSocket events naturally
became incremental cache mutations instead of a parallel state system.

That mattered most when the table became more complex. With more than ten
filters active at once, full refetches on every event would have been both
expensive and visually unstable. Incremental updates kept the interface
responsive while preserving the user’s current view.

Updating the entity was only half the job. A status or priority change could
also move a conversation out of the current filtered queue. The filtered view
had to react to the same cache mutation; otherwise the data was technically
updated while the screen remained wrong.

## Consistency is the real problem

Real-time systems rarely fail loudly. They drift.

Events arrive out of order, updates overlap, and state changes while the user is
actively filtering data.

For each conversation, an incoming update was applied only when its timestamp
was newer than the version already in the cache. Replayed and stale events
became no-ops.

That rule did not recover events missed during a disconnection—the fresh
snapshot handled that—but it gave every normalizer and cache updater the same
decision: validate, compare, then mutate.

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

The authoritative message replaced its temporary counterpart instead of being
appended beside it. Once reconciled, receiving the same server event again
updated one message rather than creating another.

## Trade-offs

The cost wasn’t the WebSocket itself. It was enforcing the same contract at
every entry point. Each handler had to validate its payload, compare ordering,
update the entity, and account for a filtered view or optimistic counterpart.

As the number of event types grew, that logic became repetitive and easy to make
subtly inconsistent. The normalization layer concentrated most of it, but it
also duplicated rules the backend already understood.

That was the trade-off: more frontend code and tests in exchange for a UI that
didn’t depend on a refetch to repair itself.

## What I’d revisit today

The architecture still holds up: one authoritative snapshot, one normalized
event path, and one client-side state layer.

What I’d change is the contract. Ideally, the REST API and real-time events
would deliver the same normalized shape with a monotonic revision. That would
move the ordering guarantee closer to the source and remove mapping logic from
the frontend.

I’d also evaluate transport choices more selectively. WebSockets made sense for
highly interactive parts of the system, but Server-Sent Events could replace
them for purely one-way updates. I wouldn’t add another live data source beside
the existing one—that would recreate the same consistency problem.

## Conclusion

Real-time UI is easy to demonstrate and hard to get right.

The challenge isn’t speed. It’s consistency under continuous change.

Once you model the system as a snapshot plus an event stream, everything becomes
easier to reason about. The hard part is not pushing updates. It is enforcing
the same rule at every boundary: validate, compare, then mutate.

A reconnect, a stale event, and an optimistic confirmation should all converge
on the same state. That is what keeps the interface from quietly drifting away
from the reality the user is looking at.
