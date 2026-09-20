# OTCS-0012 — The first policy record: the registry's AI-use policy

**Class:** `registry_update` · **Phase:** DRAFT · **Clock start:** 2026-09-19
**Clock:** 3–7 days (`GOVERNANCE.md` §3, updating a project's listing) — **earliest decision: clock start + 3 days**

## What this registers

One `registered` record, founder-stewarded and disclosed as such, a governance method under `QUALIFYING-PROJECTS.md` §2:

| Record | Subject | Why it is in the registry |
|---|---|---|
| `otcs-ai-use` | `AI-USE.md` — what AI may be used for inside this registry, the conditions, and what it may never do | A policy that controls what automated software is allowed to do, by the letter of `CHARTER.md` §1. The first record whose subject is a policy rather than a system |

## Why now

The civic-governance analysis of 2026-09-19 found that policies and laws are the kind of object this registry already describes, and that the only way to turn that finding into evidence is a record. This is the one policy the founder can register without anyone's consent and whose canonical artifact is already public. It proves the mechanism, not adoption; the decision record must say that. A second candidate, the Lighthouse for Schools, was drafted and withdrawn: its repository stays private, and `QUALIFYING-PROJECTS.md` requires a canonical public artifact. It governs a district's dependence on automated software and no software verb, so it also sits at the edge of `CHARTER.md` §1; when it is public, the record will have to argue that reading, and a boundary statement (`BOUNDARY-STATEMENTS.md`) is the honest first step for it until then.

## What the trial found — a finding against the schema

`declaration.decision_outputs` admits only `ALLOW · SHAPE · DEAUTOMATE · VETO`. Those are KTP's outputs. OTCS-0003 Revision 4 rejects a *coordinate* named for one framework's answers on exactly that ground; the same four words sit in `declaration` as an enum, and this proposal's subject — a policy whose outputs are *permitted / conditioned / prohibited* — had to be mapped onto them.

This proposal does not change the schema (that is a model revision). It records the finding so that a later proposal can open `decision_outputs` to a project's own vocabulary with a `maps_to`, the way `custom_action` already works for verbs.

## Impact

Registered count 3 → 4; `computed/` regenerated; `tests/generators.test.ts` record-state expectation updated. The record has no relationships yet and cites no standard, so nothing in the observed-record candidate pile becomes eligible (the observed-record end condition, to be proposed).

## Conditions before filing

- `AI-USE.md` at `main` is the canonical artifact; `canonical_url` pins it.

## On decision

If ratified: records enter; `REGISTERING.md`'s hold notice stays (OTCS-0004 is still open); the `decision_outputs` finding is queued as a candidate model revision. If rejected: the finding stands on its own and is filed as an issue.
