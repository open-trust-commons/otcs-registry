# OTCS-0009 — When the kill criteria are read: the recalibrated clock

*Class: `constitutional` · Clock: 45–90 days · Earliest decision: 2026-09-18*

## Provenance

PREMORTEM.md §2 evaluates the kill criteria 12 months after first public release — 2027-07-29. That number was chosen before any evidence existed on how long this class of artifact takes to be adopted. Ticket #8 supplied dates from 17 primary-sourced cases (`research/vocabulary-adoption`, commit `d1c238a`); ticket #16 applied them. Decisions were made by the founder on prepared decision material, on the public record in issue #16.

This proposal amends the test now, while the outcome is unknown. Amending a test in advance is legitimate; adjusting it near the deadline reads as goalpost-moving regardless of intent, and the date is the entire defence. The reasoning below rests on the adoption record, not on how the project happens to be doing — the calibration would be identical had the registry already filled. It ratifies alongside OTCS-0007 (what counts as evidence) and OTCS-0008 (who reads it) as one dated set: the three reforms to PREMORTEM.md §2 reference each other while all are still amendable.

## The defect being repaired

Four problems, all created by an uncalibrated number:

1. **The clock is below the record's floor.** The fastest observed times to a first external dependency, among efforts with a working adoption engine and institutional backing: CVE ~15 months to 29 declaring organisations (MITRE behind it); in-toto ~19 months to its first external production deployment — with a framework co-author inside the adopting company and a funded academic lab behind the project; OpenTelemetry semconv 21 months to its first genuinely independent emitter (a vendor coalition shipping the vocabulary as SDK defaults); CWE ~24 months to its first named vendor declaration; CycloneDX's first external *organisations* at 21, 29 and 47 months. Where no artifact carried the vocabulary, adoption never arrived at all (DOAP, SWID). A 12-month kill test on a one-person registry with no adoption engine is not a health check; it fails projects that match the healthy cases in the record.
2. **The effective window is shorter than the stated one.** Registration is held until 2026-09-14 (OTCS-0004), so the entry-dependent evidence lines run ~318 days against a nominal 360, and both intake paths are self-held.
3. **The threshold arithmetic assumes an independence the criteria do not have.** OTCS-0007 made the coupling literal: with zero external registrations, entry use is structurally impossible, so criterion 3 is met alongside criterion 1 — two of four from a single failure, an automatic narrow. The 2-of-4 threshold silently becomes 1-of-1.
4. **Criterion 2 is unfalsifiable in the healthy direction.** All ten interface domains are stamped *EXPERIMENTAL — NOT a normative specification*, and only two wire formats are SPECIFIED (`decision`, `signal`). For eight of ten domains there is nothing to implement against, yet PREMORTEM.md §1 reads the absence of implementations as "the strongest signal that the model is wrong rather than early." A criterion that cannot be passed measures nothing, and its firing is not a signal.

Left unrepaired, the criteria stop doing their real job. PREMORTEM.md's own purpose line — stopping cleanly beats persisting as an empty authority — requires a test that can kill the project without the founder's cooperation *and* that a healthy project could pass. The current test has the first property and not the second.

## What this proposal adds

### 1. The final evaluation moves to 24 months — 2028-07-29

The number is imported from the record, not invented: 24 months is the top of the observed range for a first external dependency among funded, artifact-backed efforts (CWE ~24 months; CycloneDX's external organisations began at 21). OTCS — one maintainer, no adoption engine yet — gets exactly the top of that range and no more. The entry-dependent lines gain a ~683-day effective window from the registration hold's earliest lift.

OTCS-0008's failure-to-appear rule travels with the date: a computed survival nobody independent will attest is HELD and narrows after 90 days. Extending the clock therefore never extends an unevaluated authority — the empty-authority risk is guarded independently of the date chosen.

### 2. The original date becomes the interim reading — the all-dark tripwire

On 2027-07-29 the recompute (#19) publishes in full — every line, conservative counts, contested instances excluded until ruled — and is read under OTCS-0008's determination machinery. The reading is pre-registered now:

| Interim observable, 2027-07-29 | Outcome |
|---|---|
| Zero external self-registrations **and** zero qualifying entry-use instances **and** zero qualifying vocabulary-use instances **and** zero party-published instrument decisions | **The narrow executes at the interim.** Not at 24 months |
| Any single line non-zero | The clock continues to 2028-07-29. The interim grants nothing — it can narrow, and can never pass |

The instrument-decisions line keeps zero force toward criterion 3; OTCS-0007's force assignments are untouched. The interim asks a different question — not *"is the data used?"* but *"is anyone out there at all?"* — and a party-published instrument decision (their own words, on a dated public record, handle fine; the founder's paraphrase never counts, per OTCS-0007's qualifying rules) is evidence of life without being evidence of use. Fifteen months of total public silence is the no-community finding OTCS-0008 §5 already names, made computable a year earlier.

**Criterion 4 — unmanageable legal or moderation burden — keeps immediate force at all times**, at both dates and between them. It was never adoption-dependent, and nothing here makes it wait.

### 3. The coupled pair counts once

If the count of externally self-registered projects is **zero** at an evaluation date, entry use was structurally impossible, and criteria 1 and 3 together contribute **one** toward the 2-of-4 / 3-of-4 thresholds. The annotation is computed from the registry count, never judged. If one or more external registrations exist, the criteria count separately: entries existed, dependence on them was possible, and both failures are real.

The thresholds' wording is unchanged. What changes is the counting rule under structural coupling, pre-registered — restoring the independence assumption the arithmetic was built on, and keeping full strictness exactly where the failures are independent.

### 4. Criterion 2 is scoped to what can be implemented

Rekeyed: *"no independently maintained implementation — producer or consumer — of any SPECIFIED wire format."* Today that scope is `schemas/wire/decision.schema.json` and `schemas/wire/signal.schema.json`; it grows automatically as further formats reach SPECIFIED status, computable from the schema record, and it is evaluated at the final date only.

PREMORTEM.md §1's "strongest signal" reading gains the matching qualification: absence of implementations is the strongest signal the model is wrong *where implementation was possible*. The prior art runs the same way — RFC 6410 requires two independent implementations at full Internet Standard maturity, not at Proposed; the W3C Process asks its implementation questions at Candidate Recommendation. No regime in the record demands independent implementations of explicitly non-normative experimental text.

### The recalibrated test, in one table

| Date | What runs | What can execute |
|---|---|---|
| **2027-07-29** (interim) | Full recompute published; all-dark tripwire read under OTCS-0008 | Narrow, on total silence only |
| **2028-07-29** (final) | Full 2-of-4 / 3-of-4 arithmetic, coupled-pair counting, criterion 2 as rescoped, OTCS-0007's matrix | Narrow or stop; survival only via a qualified determination, else HELD → narrow (OTCS-0008 §5) |
| **At all times** | Criterion 4 | Its own force, immediately |

## What this proposal does not do

- **Redefine what counts as evidence.** OTCS-0007's three lines, qualifying rules, two-party bar and force assignments are untouched; its matrix now reads at the final date.
- **Choose or change the evaluator.** OTCS-0008's machinery is applied at both dates; its substance is untouched.
- **Score anything.** Every rule here is a count of qualifying instances or a registry count, reported side by side, never collapsed into a score, rank, or growth target (NON-GOALS.md §2, §5).
- **Extend any authority.** The interim can only narrow. Survival cannot arrive by default at either date (CHARTER.md §12; OTCS-0008 §5).

## Impact on existing documents

- **PREMORTEM.md** §2: evaluation date, the interim tripwire, the coupled-pair counting rule, and criterion 2's rescoped wording; §1's strongest-signal row gains its qualification. Applied at OPERATION, not before.
- **OTCS-0007** (DRAFT): matrix date rekeyed to the final evaluation; review date to 2028-08-01. In-draft amendment, its clock unaffected.
- **OTCS-0008** (DRAFT): failure-to-appear rule keyed to both evaluation dates; review date to 2028-08-01. In-draft amendment, its clock unaffected.
- **FAQ.md** §27: restated with pointers, at OPERATION.
- **#19's recompute**: outputs must include the external self-registration count (the coupled-pair annotation input) and the four interim lines.

**Review date.** 2028-08-01 — after the final evaluation this proposal governs, for the sibling rationale: the rules of a test must not come up for revision while the test is being scored.

## Alternatives considered

- **Keep 12 months.** Below the fastest case in the record (CVE, ~15 months, with MITRE behind it), on a ~318-day effective entry window. The mechanism-for-killing-a-healthy-sapling the ticket named.
- **18 months.** Below CWE's 24 and most CycloneDX organisation timelines; split-the-difference, not evidence-derived, and the derivation is the defence.
- **30–36 months.** Beyond every observed first-dependency time in the set. Insurance, not calibration.
- **Full 2-of-4 evaluation at both dates.** Re-imports the original defect at the interim: the record says entry-use failure at 12 months is expected for healthy projects, so the interim would narrow on schedule-noise.
- **Publication-only interim.** Zero teeth; the extension would then be the weakening it must not be.
- **A periodic annual determination cadence.** Converts OTCS-0008's date-keyed rule into a standing obligation — a larger amendment than the defect requires, and it blurs which reading is *the* evaluation.
- **Raise thresholds to 3-of-4 / 4-of-4.** Dulls the teeth for genuinely independent failure combinations to pay for one structural coupling.
- **Merge criteria 1 and 3.** Overcorrects: where external entries exist, registration count and entry use measure different things and must be able to fail separately.
- **Drop criterion 2.** Deletes the only criterion measuring whether the technical model — not the registry — attracts builders, and forces new threshold arithmetic besides.
- **Engagement-based criterion 2** (issues, questions, patches count). Soft: a drive-by typo fix would defeat the strongest-signal criterion, and "engagement" drifts into the participation measures issue #14 already owns.
