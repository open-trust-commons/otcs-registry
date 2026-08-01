!!! info "Generated page"
    Compiled from `registry/ + src/generate.ts` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Capability matrix

Every cell is a **ladder rung**, never a checkmark. A checkmark would say "this works";
a rung says exactly how far the evidence goes.

| Rung | What it establishes |
|---|---|
| `CLAIMS_TO_IMPLEMENT` | the project asserts it |
| `MANIFEST_VALIDATED` | the record passes schema and semantic validation |
| `REFERENCE_IMPLEMENTATION` | a named implementation exists |
| `CONFORMANCE_TESTED` | it passed a published suite |

**The top two rungs are unpopulated.** No proposal has recorded a reference implementation and
no conformance suite exists. Saying so is the point of publishing the ladder at all.

| Project | Provides | Consumes |
|---|---|---|
| ABT — Ambiguity Bandwidth Theory | `environment` MANIFEST_VALIDATED | — |
| Example Gatekeeper (fictional) | `receipt` MANIFEST_VALIDATED | `decision` |
| Example Ledgerline (fictional) | `receipt` MANIFEST_VALIDATED<br>`provenance` MANIFEST_VALIDATED | — |
| Example Mendwell (fictional) | `repair` MANIFEST_VALIDATED | — |
| Example Watchtower (fictional) | `environment` MANIFEST_VALIDATED<br>`observer` MANIFEST_VALIDATED | — |
| Kinetic Trust Protocol | — | — |
| KTP Environmental Demo | `environment` MANIFEST_VALIDATED<br>`decision` MANIFEST_VALIDATED<br>`receipt` MANIFEST_VALIDATED | — |
| Lifecycle Process Fixture (not a real project) | — | — |
