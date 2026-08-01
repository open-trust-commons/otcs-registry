# OTCS-0004 — A registry entry is licensed by its author, not by the contribution licences

*Class: `model_revision` · Clock: 45–90 days · Earliest decision: 2026-09-14*

## Provenance

**This defect was found by a prospective registrant, not by the project.** A maintainer of an independently developed system, reviewing the participation documents before submitting anything, asked for confirmation that a simple listing "does not grant rights beyond distributing the registry entry itself."

That confirmation could not honestly be given. This proposal exists so that it can be.

The correspondent is not named here because they have not consented to appear in this record. If they register, the connection can be made at their choice.

## The defect

Two documents make promises that a third quietly undercuts.

**PARTICIPATION.md promises** that listing never requires assigning copyright, licensing patents, or disclosing trade secrets.

**DCO.md §2 defines two licence categories** for everything contributed: code and schemas under Apache-2.0, specification and documentation text under CC BY 4.0.

**A project's own `otcs.yaml` is neither of those things.** It is a project's description of itself. Under the current text it defaults into CC BY 4.0 — which permits derivative works and commercial reuse by anyone, with attribution. That is materially broader than what a registry needs, and broader than a commercially careful registrant would knowingly grant.

Separately, the manifest's `consent` block asks registrants to consent to five things — `publication`, `metadata_use`, `history_preservation`, `mapping_and_analysis`, `public_correction_process` — **and no document defines what any of them permits.** Consent to an undefined scope is not consent.

## What this proposal changes

### 1. A third category in the DCO

| Contribution | Licence |
|---|---|
| Code and schemas | Apache-2.0 (unchanged) |
| Specification and documentation text | CC BY 4.0 (unchanged) |
| **A project's own registry entry** | **The entry's declared `entry_license` — never the two above** |

### 2. The registrant declares the entry's licence

New manifest field:

```yaml
record:
  entry_license: CC-BY-4.0 | CC0-1.0 | all-rights-reserved
```

`all-rights-reserved` is a first-class choice. A registrant keeps everything, and grants only the operating minimum below.

### 3. The operating minimum, stated once

Whatever `entry_license` says, registration grants the registry exactly this, non-exclusively and royalty-free:

```text
store · validate · publish the entry verbatim · mirror · archive
· extract facts into derived views (graphs, matrices, indexes)
· distribute those views as part of the registry
```

And explicitly does **not** grant: sublicensing · commercial reuse of the entry's prose outside the registry · trademark use · any right in the underlying project, its code, schemas, patents or trade secrets.

Two notes on scope, stated rather than buried:

- **Most of a manifest is facts** — identifiers, URLs, versions, coordinate values, dates, evidence states. Facts carry no copyright in most jurisdictions; the licence question only genuinely touches the prose fields (`declaration.*`, `project_statement`). The grant is written to cover the whole entry anyway, so nothing turns on that analysis being right everywhere.
- **Derived views are the registry's whole function.** The grant permits deriving *registry views* while withholding general derivative rights. That line is the entire drafting difficulty, and it is drawn here in plain words rather than legal ones.

### 4. The consent booleans get definitions

Each of the five consent fields gets a one-paragraph scope in PARTICIPATION.md, so a registrant can read what they are agreeing to before a schema asks them to agree.

### 5. Irrevocability, stated where the registrant will see it

Published versions of an entry stay published. Withdrawal ends active participation and stops future use; it does not retract history — PROJECT-LIFECYCLE.md §2 already says why, and this proposal repeats it at the point of consent because a registrant should meet the term before signing, not after.

## What this proposal does not do

**It does not provide legal certainty, and says so.** This project has no legal entity, no counsel, and no jurisdiction-by-jurisdiction analysis. The disclosure added to PARTICIPATION.md reads, in substance:

> This is a clear statement of what will happen to your entry, not a reviewed legal instrument. What protects your material is that the registry cannot do more than it says: your canonical copy stays yours, the entry is exportable at any moment, and withdrawal preserves history without granting anyone new rights.

That is the same posture as SECURITY.md §3 — state what is not defended against, rather than implying coverage that does not exist.

## Impact on existing records

All three registered records are the founder's. Each will have `entry_license` added when this ratifies; no third party's rights are touched, **which is precisely why this should ratify before any third party registers.**

## Alternatives considered

- **Draft a bespoke registry licence.** Rejected: untested text nobody has relied on, in every jurisdiction at once, is weaker than declared standard licences plus a stated operating minimum.
- **Require CC0 for entries.** Rejected: forcing surrender of rights to be listed would contradict PARTICIPATION.md's core promise.
- **Do nothing and answer registrants case-by-case.** Rejected: the first honest answer would still be "the documents contradict each other."
