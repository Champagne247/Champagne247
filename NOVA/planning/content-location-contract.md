# M.A.P. content, imagery and place contract

This expansion prepares records and presentation for review. It does not deploy the site, verify external accounts, or publish private source material.

## Shared records

Composer, downloaded exports, My Life, category timelines, and Explore pin details use the same `MAP_DATA.entries` IDs. `assets/map/content.js` supplies shared media selection and detail rendering. Existing records stay intact; enrichment and deduplication need an explicit review, not silent replacement.

Entries may carry:

- `projects`: project IDs/names connecting an experience to ongoing work.
- `sources`: public `{label, url}` evidence references. Private source paths and records belong outside the public repository.
- `datePrecision`: `exact`, `day`, or `unknown`. Unknown event dates remain null, distinct from `reportedAt`. Do not treat a document timestamp as an event date.
- `links`: existing `{label, url}` fields plus `kind: "business"`, `sourceUrl`, and `verification` where applicable. A link recorded in historical context is not a freshly verified business identity.
- Multiple `locations`: `label`, optional `lat`/`lng`, `role` (hotel, launch, restaurant, worksite, destination, place), `mapsUrl`, `sourceUrl`, `verification`, `precision`, and `visibility`.
- `media[].provenance`: `kind` (`own`, `official`, `ai`, or `unverified`), `actualSubject`, `sourceUrl`, `credit`, and an AI fallback `reason`.

## Image and video policy

1. Chris's actual photos/videos of the subject first.
2. Appropriate official imagery of that actual subject second, with its source and attribution. Verify usage rights before publishing externally sourced assets.
3. Clearly labeled AI illustrations only when needed. Reviewed exports require a fallback reason; rendering suppresses AI alternatives when actual subject media is available. Preserve original metadata rather than deleting alternatives.

Generic category heroes are illustrations with unverified origins, not event photographs. Do not infer AI authorship from appearance. Unknown legacy provenance remains explicitly unverified. Broken actual photos do not silently become a category hero labeled as an actual photo. Multiple images, videos, credits and source links remain accessible in the record details.

## Places and maps

Explore currently uses Leaflet/OpenStreetMap, not Google Maps JavaScript or Places APIs. `/map/` is the M.A.P. landing page. Multiple valid public coordinate pairs produce multiple pins per activity; place labels without coordinates remain in details without a fabricated pin. Empty, partial, private or out-of-range coordinates are rejected. Zero is a valid coordinate, not a substitute for missing input.

Google Maps URLs link out. A generated search URL is an **unverified lookup**, not a resolved place or verified coordinate. A source-marked verified place needs both its Google Maps URL and public evidence; the UI does not independently verify that evidence. Unverified pins have a dashed outline. Do not call legacy city/state/country coordinates exact without evidence. Precise future travel, homes, customer worksites and private itineraries remain outside public data unless specifically approved.

## Audit and review scope

Private source-ledger, inventory, candidate entries, enrichment proposals, duplicate decisions, and visual coverage preview are intentionally outside this repository. Do not copy uploaded NOVA personal/business records into Git. Private backend/RLS readiness has not been validated; local private files are working storage, not a deployed database or automated synchronization service.

The audit distinguishes source-reported events, projects, research, ideas, goals, canceled plans and unverified outcomes. Preserve contradictory dates and newer state updates. Candidate topics may be subtasks/routines rather than separate timeline posts; select granularity during review. No live account, official place, image-license or coordinate verification follows merely from a URL in a source snapshot.

## Validation

From the repository root:

```sh
NODE_PATH=/workspace/.onboarding/browser/node_modules node --test tests/*.test.cjs
```

See `tests/README.md` for portable tool setup. The browser suite intercepts external requests, exercises the real Leaflet library locally, and verifies record IDs, multiple pins, media priority, evidence/business links, filters, exports, uncertainty and private-place exclusion. Live OSM tiles and external place lookups require a separate connectivity/verification check.
