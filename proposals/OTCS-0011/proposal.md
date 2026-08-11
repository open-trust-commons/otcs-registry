# OTCS-0011 — Evidence efficacy: what a record can cause, and what cryptography does not establish

**Class:** `model_revision` · **Phase:** DRAFT · **Clock start:** 2026-08-11
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the shared vocabulary) — **earliest ratification 2026-09-25**

## The gap

The vocabulary can say **what evidence a project produces** — `declaration.evidence_outputs` — and **how well any given claim is supported** — the `evidence` coordinate's specification / implementation / independent_validation split.

It cannot say **what the evidence can do.**

A tamper-evident log and an inline control both satisfy `evidence_outputs`. One makes an action observable after the fact. The other can stop it. The record currently flattens that difference, and the difference is most of the value.

## What this adds

```yaml
evidence_efficacy: EVIDENCE_ONLY | EVIDENCE_TO_DECISION | EVIDENCE_TO_ENFORCEMENT
```

| Rung | The record can… |
|---|---|
| `EVIDENCE_ONLY` | Make the trajectory reconstructable after the fact |
| `EVIDENCE_TO_DECISION` | Update the governance judgment while the action is live |
| `EVIDENCE_TO_ENFORCEMENT` | Cause scope reduction, deautomation, refusal, rollback or recovery |

The distinction in one line, from the commentary that produced it: **evidence generated during execution makes an action observable; evidence connected to an authority capable of changing execution makes it governable.**

**The field is optional, and absence means "does not address."** A project producing no evidence omits it, and that omission reads as *does not address*, never *fails to* — the standing rule for every coordinate (`docs/coordinate-system.md` §1). This is stated up front rather than discovered later, per the lesson recorded in OTCS-0010 Amendment 1.

**Evidence rules:**

- `EVIDENCE_TO_DECISION` requires naming what consumes the record and what judgment changes.
- `EVIDENCE_TO_ENFORCEMENT` additionally requires a declared enforcement point — the same test `enforce` already carries — and the path from record to consequence must be stated, not implied.

Independent convergence on these three rungs: aviation separates the flight recorder from TCAS; medicine separates the chart note from the hard-stop interaction block; finance separates the transaction log from the inline decline; security separates the SIEM from inline blocking.

## The bounding qualification

Cryptography establishes **record integrity and authenticity** — this key signed this receipt, this payload is unaltered, this policy version was evaluated. It does not establish:

- that the authority relied upon was legitimate;
- that the policy applied was correct;
- that the evidence captured was complete;
- that the recorded claims were true;
- that the external consequence matched the internal record.

**A receipt can faithfully preserve a false decision.** `SECURITY.md` §3 already says this for the governance ledger; this proposal extends the same honesty to project evidence claims, so no project may present cryptographic integrity as semantic truth.

## Tested against the registry before proposing

Assessed against all three registered records **before** this proposal opened, not after:

| Record | Rung | Basis |
|---|---|---|
| `ktp-demo` | **`EVIDENCE_ONLY`** | The Flight Recorder is appended to, and read only by `verify()` and the reporter. Nothing reads a past record to change a future decision — the trajectory memory that produces the sleeper result is the Oracle's own internal state (`this.cost`), not evidence-derived |
| `ktp` | **not on the ladder** | Specification-stage. It describes tamper-evident decision records; its implementations would produce them. A specification has no evidence to be efficacious |
| `abt` | **not on the ladder** | Measurement model — zone measurements and saturation indicators, manually instrumented |

The first row is the useful one and it is uncomfortable: **the demonstration built to prove governance-in-motion produces evidence that does not feed back into governance.** That is not a defect in the demo, which never claimed otherwise — it is the ladder discriminating correctly on its author's own work, which is the only test that matters for a vocabulary term this project will ask others to use.

It also predicts something checkable: a project claiming `EVIDENCE_TO_ENFORCEMENT` must be able to show the read path. Where the record is write-only, the claim fails on inspection rather than on argument.

## What this deliberately does NOT add

A per-decision `decision_receipt` field set (action, actor, authority, policy, environment snapshot, drift events, recovery actions, signatures) was considered and **refused here**. That describes a **wire format for one receipt**, and one already exists — `schemas/wire/receipt.schema.json`, SPECIFIED, with nine required fields. Extending it is `interfaces/receipt.md`'s business under its own formalization trigger ("two evidence systems exchanging receipts for one action path"), which has not fired. A project manifest declares what a project *does*; it is not the place to redefine a wire format.

Also refused: a `supervisory_authority` field block (supervisor identity, authority source, override, challenge path). It is a real gap — a supervisory layer that interprets intent in order to apply it becomes the author of that intent — but it belongs with authority and delegation semantics, not with evidence, and folding it in would make this proposal two proposals.

## Impact on existing records

One optional field; no existing record becomes invalid. `ktp-demo` would gain `EVIDENCE_ONLY`; the other two would omit the field.

**Cost, stated:** resets the `stable_schemas` bake period, as OTCS-0010 does. Two model revisions inside one bake window is a deliberate choice — both close honesty gaps in claims the registry already invites projects to make, and deferring either would mean inviting a claim the vocabulary cannot yet qualify.

## Sequencing

Ratifiable from 2026-09-25, after OTCS-0003 (09-10) and alongside OTCS-0010 (09-24). Like 0010, this field belongs with the control-function layer under 0003's three-layer split; if 0003 is rejected, it stands unmodified against the current vector. 0010 and 0011 are independent — neither depends on the other's outcome.

## Provenance

The distinction was drawn in public commentary on Charmaine Threat's series on evidence generated during execution. She has no relationship to this project, has not been contacted, and has endorsed nothing here. The rungs, the evidence rules, the bounding qualification and the refusals are this project's.
