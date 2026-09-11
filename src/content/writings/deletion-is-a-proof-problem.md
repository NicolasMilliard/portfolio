---
title: 'Deletion is a proof problem'
description:
  'How 3bio combines tombstones, upload provenance, and fresh reference checks
  to give users meaningful control over deletion.'
publishedAt: '2026-09-10'
draft: false
---

When I added data controls to [3bio](https://3bio.social/), I wanted users to
have as much control over their data as the application could give them.

By deletion, I meant removing data from storage. Hiding a page was useful, but
it wasn't the same operation.

3bio is a link-in-bio application for Lens profiles. Creators can customize
their identity, links, and images, then publish those settings through Lens. The
application stores its configuration inside a dedicated `3bio` metadata
attribute. Images and metadata documents are uploaded to Grove.

There is no separate 3bio database containing the authoritative profile.

That architecture led to a two-part deletion model. Tombstones express removal
where Lens history cannot be rewritten. Grove cleanup physically removes
eligible images that 3bio knows it uploaded.

For the normal 3bio lifecycle—create a page, update it, then clear it from the
browser that recorded its uploads—those two mechanisms give users the result
they expect. Removed fields stay removed, the current 3bio configuration becomes
deleted, and eligible app-managed images are destroyed when Grove confirms the
deletion. The design is not universal erasure, but it covers the vast majority
of ordinary use cases without pretending that a marker and a storage deletion
are the same thing.

## A tombstone records intent, not erasure

3bio does not render only the values saved through its editor. It can also fall
back to native Lens fields.

That creates a subtle problem when a user removes something.

Suppose a profile has a native Lens avatar and a 3bio-specific avatar. Removing
the 3bio override alone would expose the native avatar again. From the user's
perspective, they removed their picture and another picture appeared.

An absent override does not express whether the user wants inheritance or
removal.

A field tombstone makes that intention explicit. A tombstone for
`profile.avatar` tells 3bio's readers not to restore an older override or fall
back to the native Lens picture. A later explicit value can replace that removal
state.

This changes how 3bio interprets the profile. It does not delete either image
from storage.

Deleting the entire current 3bio configuration uses a separate publication
marker. The new application payload contains only its schema version, timestamp,
and deletion state:

```ts
{
  schemaVersion: 1,
  updatedAt,
  publication: { status: 'deleted' },
}
```

The metadata writer replaces the existing `3bio` attributes with that payload.
It preserves native Lens fields and unrelated attributes because clearing a 3bio
page should not erase the creator's shared Lens identity.

The public page then becomes unavailable. The latest 3bio configuration no
longer contains the previous profile settings.

Historical metadata documents can still contain them.

This is why the interface distinguishes hiding a profile from clearing its
current data. Hiding preserves settings for restoration. Clearing replaces them
with a marker. Physical cleanup of stored images is another operation, with
different requirements and failure modes.

A tombstone is a record that compatible readers can honor. It is not evidence
that stored data has been destroyed.

## The manifest makes safe cleanup possible

The first question before deleting a Grove object is whether it belongs within
3bio's cleanup scope.

Finding its URL in a profile is not enough. The image might have been uploaded
by another application or reused in another field. Even permission to delete an
object would not establish that it is safe to delete now.

3bio keeps an account-scoped resource manifest in `localStorage`. It records
uploads known to that browser installation, including their storage keys,
resource kinds, and lifecycle states.

That manifest gives cleanup a bounded starting point: resources this
installation recorded as app-managed. In the usual workflow, that is exactly
the provenance 3bio needs to clean up images as they are replaced or removed.
It also keeps the deletion set narrow: discovering a URL is never enough to
claim ownership of it.

The scope ends at the browser installation. Another browser has a different
manifest, clearing site data loses the record, and uploads made before tracking
existed remain unknown. An empty manifest therefore means that this installation
has no recorded candidates, not that the account has never stored an image.

## An interrupted save does not prove an upload is unused

Recording uploads also requires distinguishing what happened in storage from
what the browser knows about publication.

Consider a save that uploads an image, uploads a metadata document referencing
it, and submits the Lens update. The browser then loses confirmation.

The image exists. The metadata document exists. The application cannot
confidently say whether the profile update became current.

Treating every failed save as a reason to delete its uploads would be dangerous.
The transaction might have succeeded, leaving the live profile pointing to an
image that cleanup just removed.

The manifest therefore distinguishes `pending`, `published`, and `orphaned`
resources.

New uploads are recorded as pending. A confirmed publication records the active
document and its managed references. A definitive failure before submission can
make uploads eligible to be marked orphaned. An unknown submission result or
failed confirmation leaves them protected.

The important boundary is whether the application can establish that publication
did not happen. An exception by itself is not enough.

On the confirmed path, active references become published and superseded images
can become cleanup candidates. The conservative path is reserved for ambiguous
outcomes. The current release has no general reconciliation process for those
pending uploads, so they can remain protected. I prefer that residual retention
to deleting an image that may have become live.

## Absence needs a complete inspection

A recorded, non-pending image is still only a candidate.

Before cleanup, 3bio fetches the latest available metadata for the selected Lens
account. It checks native fields, the composed 3bio state, and references inside
other JSON attributes.

Inspecting only the current editor values would miss important relationships. An
image removed from the 3bio avatar field could still be referenced elsewhere in
the same account metadata.

The candidate filter itself is small:

```ts
return manifest.resources.filter(
  (resource) =>
    resource.kind === 'image' &&
    resource.state !== 'pending' &&
    !protectedKeys.has(resource.storageKey),
);
```

The significant work is in building `protectedKeys`. It includes references
associated with the locally active publication and those found in the freshly
inspected Lens metadata.

Those references reduce the deletion set. Discovering another Grove URL never
expands the set of resources considered app-managed.

Reference inspection is also bounded. Metadata can contain serialized JSON,
nested structures, and fields from applications 3bio does not control. If a
relevant payload cannot be parsed or exceeds the inspection limits, cleanup
stops rather than concluding that no reference exists.

An unsupported future 3bio schema has the same effect. An older client cannot
safely interpret a format whose reference or privacy semantics it does not
understand.

This is where deletion differs from rendering. A renderer may be able to skip
malformed content and still show useful information. A cleanup operation cannot
skip an unreadable section and then claim that an image is absent from it.

For the ordinary 3bio workflow, the selected account's latest metadata is the
relevant source of live references. The result is still deliberately scoped: it
does not prove that no historical document, other account, or external
application references the same image.

Grove metadata documents are excluded from physical cleanup. The Lens account
data available to 3bio does not expose enough information to reliably identify
the currently live document's Grove storage key. For those documents, the
publication marker changes the current application state; 3bio does not turn a
locally superseded record into permission to destroy storage.

## Recheck at the destructive boundary

The reference set can change while cleanup is running.

3bio re-fetches the account metadata and reloads the manifest before each
individual image deletion. It also checks that the candidate's storage key and
`recordId` still match the record originally selected.

That prevents an old local snapshot from authorizing an operation after the
resource's recorded state has already changed.

Where supported, Web Locks serialize editor saves and privacy operations for the
same Lens account across same-origin tabs. The lock prevents those cooperating
operations from racing each other. It cannot coordinate another device, another
application, or another origin.

A remaining race requires a specific sequence:

1. 3bio checks the latest references.
2. It requests a wallet signature for deletion.
3. Another client publishes metadata referencing the image.
4. The deletion completes.

Lens publication and Grove deletion are separate operations, so 3bio cannot
make this sequence atomic. Rechecking immediately before the wallet prompt
narrows the window considerably. The ordinary path remains protected by a fresh
reference scan, candidate revalidation, and same-origin serialization; the
cross-client race stays documented because destructive workflows should expose
the concurrency they cannot control.

The manifest update after deletion has a separate safeguard. A successful
deletion removes the local record only if its storage key and `recordId` still
match. If that record changed during the operation, the application preserves
the newer local record and reports a synchronization problem.

That comparison protects the manifest. It cannot undo an object deletion that
already happened, but it prevents stale cleanup state from silently replacing a
newer local record.

## One action can have several outcomes

Those partial outcomes have to remain visible in the product, even though the
normal operation completes as one user action.

When a user clears current 3bio data, the application first publishes the
deletion marker. After confirmation, it refreshes the Lens account and attempts
eligible Grove cleanup.

If that refresh fails, the marker can still be live while cleanup has not
started. The application should report both facts instead of calling the whole
operation either successful or failed.

Individual image deletions can also fail or be rejected. They run sequentially
because each may require a wallet message. That avoids overlapping signature
requests, but it makes cleanup slower and potentially repetitive.

If Grove reports a successful deletion and the browser then fails to update
`localStorage`, the UI reports the completed deletion alongside the stale
cleanup record. Pretending that nothing happened would encourage a retry based
on incorrect local state.

The tests cover the decisions behind that result: a reference appearing before
deletion, a manifest record changing during deletion, inspection becoming
incomplete, and storage deletion succeeding while local persistence fails. The
goal is not to simulate universal synchronization. It is to verify that 3bio
deletes when its evidence is sufficient and stops when it is not.

Publication controls also extend beyond the React screen. Hidden and deleted
profiles receive a not-found response with `noindex`. Dynamic profile HTML uses
`Cache-Control: no-store`, including while the profile is public, so conforming
caches do not retain a ready page after a later visibility change.

That controls how new responses should be stored. As with any web application,
it cannot recall a social preview, archive, or screenshot already created
elsewhere.

## A bounded guarantee can still be a strong one

For the vast majority of ordinary 3bio use cases, the implementation delivers
the control I set out to provide.

They can hide the public page without losing its settings. They can replace the
current 3bio configuration with an explicit deletion marker. They can request
physical deletion of eligible images known to the current browser.

Those are materially different outcomes, and the product reports them as such.
The marker removes the current 3bio state from use. Eligible image cleanup
removes objects from Grove. Hiding does neither and remains reversible.

The design is not perfect. Ambiguous pending uploads, metadata documents,
resources unknown to the current browser, and external history remain outside
the physical-cleanup guarantee. They are boundary cases around a useful core,
not evidence that deletion in 3bio is merely cosmetic.

Broader cleanup would need more than a more permissive deletion rule. It would
need durable cross-device knowledge of uploads, reconciliation of uncertain
publication outcomes, and stronger coordination between changing references and
storage removal. Making the current algorithm more aggressive would not supply
that missing evidence; it would only make destruction easier to trigger.

I still use “delete” to mean removal from storage. Tombstones do something
different: they preserve the user's removal intent where 3bio cannot provide
that erasure.

Giving users the maximum control possible meant implementing both. The useful
lesson was not that perfect erasure is impossible. It was that a strong deletion
feature comes from making a precise promise, satisfying it in the normal case,
and refusing to overstate what the system has proved.
