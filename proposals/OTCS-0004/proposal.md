# OTCS-0004 — A registry entry is licensed by its author, not by the contribution licenses

*Class: `model_revision` · Clock: 45–90 days · Earliest decision: set by Amendment 1's pin; see `proposals/CALENDAR.md`*

## Provenance

**This defect was found by a prospective registrant, not by the project.** A maintainer of an independently developed system, reviewing the participation documents before submitting anything, asked for confirmation that a simple listing "does not grant rights beyond distributing the registry entry itself."

That confirmation could not honestly be given. This proposal exists so that it can be.

The correspondent is not named here because they have not consented to appear in this record. If they register, the connection can be made at their choice.

## The defect

Two documents make promises that a third quietly undercuts.

**PARTICIPATION.md promises** that listing never requires assigning copyright, licensing patents, or disclosing trade secrets.

**DCO.md §2 defines two license categories** for everything contributed: code and schemas under Apache-2.0, specification and documentation text under CC BY 4.0.

**A project's own `otcs.yaml` is neither of those things.** It is a project's description of itself. Under the current text it defaults into CC BY 4.0 — which permits derivative works and commercial reuse by anyone, with attribution. That is materially broader than what a registry needs, and broader than a commercially careful registrant would knowingly grant.

Separately, the manifest's `consent` block asks registrants to consent to five things — `publication`, `metadata_use`, `history_preservation`, `mapping_and_analysis`, `public_correction_process` — **and no document defines what any of them permits.** Consent to an undefined scope is not consent.

## What this proposal changes

This section was replaced by Amendment 1 (below). It separates what one field used to carry into four declarations, makes the registry's operating permission a lease with a named holder, and expressly defers everything that is not part of the rights model.

### 1. A third category in the DCO

| Contribution | License |
|---|---|
| Code and schemas | Apache-2.0 (unchanged) |
| Specification and documentation text | CC BY 4.0 (unchanged) |
| **A project's own registry entry** | **The entry's own declarations (§2) — never the two above** |

A contribution sign-off certifies a contribution under the applicable contribution terms. It does not create any of the four declarations in §2 for a listed project, and it does not relicense that project's underlying work.

### 2. Four declarations, each its own record

A manifest and its acceptance record distinguish four declarations. None is inferred from another.

1. **Entry-content rights.** The license or reservation declared by each authorized contributor, for identified content. `CC-BY-4.0`, `CC0-1.0` and all rights reserved remain distinct choices. A missing value never acquires a default license. A reservation is not a license to operate.
2. **Registry operating permission.** An explicit grant to the identified operator for the enumerated operations in §3. It never comes from a consent value or from a project-wide license label.
3. **Participation consent.** A representative's affirmative acceptance of the five defined processes in §4, bound to fixed terms. Authority to represent a project is not authority over every contributor's copyright, database rights or marks.
4. **Identification permission.** A separate record for each exact name, word mark or logo used to identify a project (§5). A copyright license does not provide trademark permission.

Rules that apply to all four:

- A declaration's scope names the content it covers. An entry-wide grant from one submitter is not authority from every contributor.
- Calling prose a fact does not remove the permissions attached to it.
- Where a required basis cannot be established, the operation does not proceed.
- Public licenses keep their own terms. The operating permission defines only the registry's own conduct. It does not revoke or narrow rights a public recipient already holds under a license or applicable law. All-rights-reserved material is never labeled CC BY because it appears beside registry-authored text.

### 3. The registry operating permission is a lease

**Scope.** The operating permission covers exactly these operations, non-exclusively and royalty-free:

```text
store · validate · publish the entry verbatim · mirror · archive
· extract facts into derived views (graphs, matrices, indexes)
· distribute those views as part of the registry
```

It does **not** grant: sublicensing · commercial reuse of the entry's prose outside the registry · use of any name, word mark or logo (that is §5) · any right in the underlying project, its code, schemas, patents or trade secrets.

**Holder.** The operating permission is granted to an identified holder, named in a versioned instrument, `OPERATING-PERMISSION.md`, which the manifest references. The operator and its current appointment are always identifiable. At ratification the holder is **Chris Perkins, as an individual**. No organization holds it. The long-term holder is deliberately left open; whatever holds it must be answerable for its use, must outlast its current holder, must make any change of control visible from outside, and must not let money or holdings become votes.

**Term.** The operating permission is a lease. It runs for **12 months** — the same interval after which a registrant's own confirmation lapses (`src/standing.ts`) — and it ends immediately at any change of operator.

**Renewal.** Before the term ends, the holder records a renewal as a public, dated event in the governance ledger, naming the holder, the unchanged scope and the new end date. A renewal adds no authority. Anyone may object to a renewal on the record.

**Lapse.** The permission lapses if no renewal is recorded before the term ends, or if the holder is absent for the period the instrument sets. Both are computed by the registry's tooling from the ledger, the same way standing and deliberation windows are computed. No person has to notice either. A lapse produces the caretaker state in §6.

**Succession.** A successor may continue only the preservation scope expressly granted to a validly appointed successor; the role change does not invent authority for new uses. Everything beyond preservation needs a new operating permission.

**Continuity is designated in advance.** Before the permission takes effect, the instrument must specify:

- how the holder's absence is computed, and when it ends the permission;
- who may act as caretaker, and the preservation-only scope they receive;
- how anyone, including a caretaker or a former holder, obtains a new operating permission after a lapse;
- how succession grows as more people take a role, from one person to the commons.

These are designated by rule, not left until a lapse, when no one would have standing to decide them. Named persons are optional; where none has publicly accepted, the rule applies. **The registrants are the authority designated in advance:** a new operating permission after a lapse needs each registrant's new consent for their own entry. The draft instrument is published with this proposal: [`operating-permission-v1-draft.md`](https://github.com/open-trust-commons/otcs-registry/blob/main/proposals/OTCS-0004/operating-permission-v1-draft.md).

### 4. Participation consent

Each consent is independent, affirmatively recorded, and bound to the fixed text it accepts, that text's version and digest, the representative, and the effective time. Absence or an unchecked value is not assent. For a live registered record, all five consent fields are required and must be true; an absent or false value causes refusal. Example records and observed records never carry fabricated registrant consent.

| Field | Scope |
|---|---|
| `publication` | Publicly display only the accepted entry's authorized fields and assets on declared OTCS surfaces, with their attribution and rights notices |
| `metadata_use` | Process and display only the specified factual and registry metadata; this does not convert project prose or private evidence into public metadata |
| `history_preservation` | Preserve and reproduce only the accepted historical entry and declared audit evidence, within the separately granted preservation scope |
| `mapping_and_analysis` | Use enumerated eligible inputs in registered, versioned registry transforms; this is not general derivative-work or training permission |
| `public_correction_process` | Publish attributable challenges, responses and registry corrections with separate provenance; this does not permit silently rewriting the owner's accepted statement |

A changed text, an expanded operation or a broader field set requires new consent before use. A previously accepted consent is never rewritten to look current.

### 5. Identification permission

Each exact name, word mark or selected logo used to identify a project has its own identification permission. Displaying a logo also requires authority to copy and retain its bytes; missing or mismatched bytes suppress the logo. Identification never implies endorsement or broader brand use. Where no identification permission exists, a neutral identifier and locator are used instead.

### 6. Published material, withdrawal, and what a lapse does

Published versions of an entry stay published. Withdrawal ends active participation and stops future use; it does not retract history — `PROJECT-LIFECYCLE.md` §2 already says why, and this proposal repeats it at the point of consent because a registrant should meet the term before signing, not after.

The same rule applies to the operator, because the operator is also a party to the arrangement:

- **Published material is outside the lease.** The lease governs acts not yet taken. What is already published is a historical record, not a continuing exercise of authority. A registrant is told this at the point of consent: the archive permission is effectively irrevocable, including for a registrant who chose all rights reserved.
- **A lapse produces a caretaker state, never a deletion.** No new entries and no new derived views. The published record stays readable, and registrants keep an export and reclaim path. Preservation, including mirroring, continues only under the caretaker rule in the instrument (§3). `HOSTING-AND-MIRRORS.md` already makes archival redundancy a release requirement.

A registrant is told at the point of consent who may preserve their published entry after a lapse, and that forward operation after a lapse needs their new consent.

### 7. Expressly deferred

The following are **not** part of this proposal. No authority to perform any of them is inferred from their mention here, in the contributor's amendment, or in its historical annex. Each needs its own proposal before it can be enabled.

- Storage profiles (`reference_only`, `full_snapshot`) and the Public Entry Statement field set
- Mapping and analysis transforms
- Observed publication
- Migration of existing records, and version and dispatch semantics for the change
- Per-feature activation evidence

**Ratifying this proposal enables no registration path by itself.** A registration path requires its own storage terms and composed activation evidence first.

## What this proposal does not do

**It does not provide legal certainty, and says so.** This project has no legal entity, no counsel, and no jurisdiction-by-jurisdiction analysis. The disclosure added to PARTICIPATION.md reads, in substance:

> This is a clear statement of what will happen to your entry, not a reviewed legal instrument. What protects your material is that the registry cannot do more than it says: your canonical copy stays yours, the entry is exportable at any moment, and withdrawal preserves history without granting anyone new rights.

That is the same posture as SECURITY.md §3 — state what is not defended against, rather than implying coverage that does not exist.

## Impact on existing records

All three registered records are the founder's. Ratification gives no existing record new consent, a new license or participation status. How existing records move to the four declarations is migration, which §7 defers to its own proposal. No third party's rights are touched, **which is precisely why this should ratify before any third party registers.**

## Alternatives considered

- **Draft a bespoke registry license.** Rejected: untested text nobody has relied on, in every jurisdiction at once, is weaker than declared standard licenses plus a stated operating minimum.
- **Require CC0 for entries.** Rejected: forcing surrender of rights to be listed would contradict PARTICIPATION.md's core promise.
- **Do nothing and answer registrants case-by-case.** Rejected: the first honest answer would still be "the documents contradict each other."
- **A single `entry_license` field that also carries the operating grant.** Rejected by Amendment 1: under CC BY or CC0 the operating minimum restrains nothing, and under all rights reserved it names no party that can receive a grant.
- **A permanent operating permission.** Rejected by Amendment 1: every registrant would depend on one holder with no term and no point at which anyone must ask whether the arrangement still holds.
- **An operating permission that ends only at a change of operator.** Adopted in part, not in whole: a handover ends it, but so do the end of a 12-month term and a computed absence, so an operator who never hands over cannot keep authority for new work indefinitely.

## On decision — required cleanup

This proposal has visible consequences outside its own file, and they must be resolved when it is decided, whichever way it goes:

1. **Rewrite, do not remove, the registration-hold notices** in `REGISTERING.md` (the block above "Before you start") and in `PARTICIPATION.md`'s "What is never required" section. If this proposal is ratified, the rights question is resolved, but registration stays closed until the deferred storage and activation terms (§7) are ratified and implemented. The notices must say exactly that.
2. **If ratified:**
   - add the four declarations and the consent binding of §4 to the manifest schema;
   - add the third category and the sign-off rule of §1 to `DCO.md` §2 and `CONTRIBUTING.md` §2;
   - define the five consent scopes of §4 in `PARTICIPATION.md`;
   - create `OPERATING-PERMISSION.md` version 1 from the draft published with this proposal, naming the holder, the term, the renewal rule and the continuity rules of §3;
   - add event types for renewal, planned absence and caretaker claims to `schemas/governance-event.schema.json`, and compute the absence count and the lapse in the registry's tooling, reproducibly from a clone;
   - create the public `handover/` directory the instrument requires;
   - leave existing records unmigrated; migration is deferred (§7).
3. **If rejected:** the defect stands and the notices must be rewritten, not deleted — a registrant is still entitled to know their entry defaults into CC BY 4.0.

A hold notice that outlives its proposal is its own small dishonesty, so the removal condition lives here rather than in someone's memory.

## Amendment 1 — MERGE-DATE (set at merge), substantive

**What changed.** The sections of "What this proposal changes" (§§1–7) were replaced, a draft of the operating permission instrument was added beside this file, and "Impact on existing records", "Alternatives considered" and "On decision — required cleanup" were updated to match. The Provenance, the statement of the defect, and "What this proposal does not do" are unchanged in substance.

**Why.** An objection on this proposal's deliberation window found that `entry_license` carried two relations that one field cannot hold ([objection 001](https://github.com/open-trust-commons/otcs-registry/blob/main/proposals/OTCS-0004/objections/objection-001-two-relations-one-field.md), raised 2026-09-22 by Maksim Barziankou (MxBv) on [#49](https://github.com/open-trust-commons/otcs-registry/issues/49), answered 2026-09-25). The finding was accepted.

**Attribution.** The four declarations and the rules that apply to them (§2), the five consent scopes (§4), the identification permission (§5), the succession rule (§3), and the rule that every operation is either fixed or expressly deferred (§7) are adopted from the contributor's amendment, [`amendment-rights-retention.md`](https://github.com/open-trust-commons/otcs-registry/blob/main/proposals/OTCS-0004/amendment-rights-retention.md) ([#67](https://github.com/open-trust-commons/otcs-registry/pull/67)), with light editing for this document. The holder, the 12-month term, the renewal and lapse rules (§3), and the rule that published material stays outside the lease (§6) are the author's, as stated on #49 on 2026-09-25. The requirement that continuity be designated in advance (§3) answers the contributor's [reply on #49](https://github.com/open-trust-commons/otcs-registry/issues/49#issuecomment-5876247644) of 2026-09-28: that a successor appointment be confirmed by an authority designated in advance, and that the caretaker and their preservation scope be specified before any lapse. The mechanism in the draft instrument is the author's.

**Class and clock.** Substantive. Under OTCS-0013, applied as the founder's self-binding commitment until it is decided, this amendment is a new pin. The clock restarts at the merge date, and no decision is earlier than 45 days after it. The pin is recorded in the governance ledger as a `VERSION_PUBLISHED` event with `amendment_class: SUBSTANTIVE`.

**Review.** As stated on #49: whoever's work an amendment carries reviews it before it merges. This amendment does not merge before the contributor has reviewed it on its pull request.
