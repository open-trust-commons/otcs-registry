# OTCS-0016 — The observed-record end condition

**Class:** `model_revision` · **Phase:** DELIBERATION · **Clock start:** 2026-09-20
**Clock:** 45–90 days (`GOVERNANCE.md` §3 and §11) — **earliest ratification: clock start + 45 days**
**Executes:** wayfinder issue #12 (decided) via #45. Founder's ruling to open now: 2026-09-19.

## The decision this implements

#12 resolved: an observed record may exist once **a record can carry its subject's own words**, and only where **a registered record cannot be read without it**. This proposal builds the three conditions and replaces the undated hold.

## The three conditions, all validator-checkable

1. **A response field on records.** Every record gains `subject_response` using the analysis five-state vocabulary, imported from `analysis.schema.json` so there is one dialect: `confirmed · confirmed_with_qualification · disputed · no_response · declined_to_respond`. An observed record without a `subject_response` state does not validate.
2. **Permanence.** `OWNER-RESPONSE-POLICY.md` §2 — "an owner's response stays visible even when the analyst does not adopt it" — extends from analyses to records, as a schema constant (`preserve_historical_record: true`) that a validator refuses to see set otherwise.
3. **Refusal mechanized.** `CHARTER.md` §10's *do not create a page in our name* becomes a recorded governance event, `SUBJECT_REFUSED`, that **blocks record creation**: a validator fails any observed record whose subject has a refusal event on the ledger. Today refusal is a promise that depends on the founder seeing the request.

## The scope rule, stated so a validator or a reviewer can apply it

An observed record is permitted only for a **relationship target, a cited predecessor or fork parent, or a standard a registrant claims to implement** — named by a `registered` record. It is refused for "notable in the field" and for map completeness. Nothing in any candidate pile becomes eligible by this proposal; eligibility still requires a registrant to cite it.

## What this changes in the documents

- `REGISTRY-POLICY.md`: the undated hold ("until the correction and right-of-reply processes are mature") is replaced by the stated end condition and the scope rule.
- `OWNER-RESPONSE-POLICY.md` §2: extended to records.
- `schemas/project-manifest.schema.json`: `subject_response`, `preserve_historical_record`; `schemas/governance-event.schema.json`: `SUBJECT_REFUSED`.
- `src/validate.ts`: the three checks, warnings until ratification, failures after.

## The bake-period reset, justified rather than passed silently

This is the third `stable_schemas` reset in one window (OTCS-0010, OTCS-0011, this). It is opened now, on the founder's ruling, because statutes and public policies cannot enter the registry by any other door — their stewards will not self-register — and every day the hold is undated is a day the registry cannot say when it will be able to describe the law that governs its own registrants. The reset is the price of that door, and it is stated here so that a reviewer can object to the price rather than discover it.

## Sequencing

Checked against OTCS-0003: this touches no coordinate and no layer. It adds top-level fields and one event type, and lands on either shape of the vector.

## On decision

If ratified: the schema and validator changes take effect; the first observed records may be created only where a registered record cites them. If rejected: the hold in `REGISTRY-POLICY.md` stays, but gains a date or a stated criterion — an undated hold is not an acceptable outcome of deciding this either way.
