# Financial crime — what the vocabulary could not say

*Version 0.1 · Status: EXPERIMENTAL · The mapping is [`crosswalk.yaml`](crosswalk.yaml); this is what it found*

**Thirteen domain terms mapped. Six did not.** The six are the result.

---

## Read this before anything else

> **No practitioner has reviewed this crosswalk.** It was assembled from public domain knowledge by the maintainer, who has worked in and around this field but has never operated a fraud desk.

That is recorded as `reviewed_by_practitioner: false` in the crosswalk, and it is a real limit on how much the findings below are worth. **A profile nobody in the domain has read is a guess about the domain.** Practitioner review is the next step, not a formality.

## 1. Why this domain

| | |
|---|---|
| **It has its own regulators** | Supervisory expectations, sanctions authorities, scheme rules — obligations that bind in different ways |
| **It has its own words** | Decades of settled vocabulary that predates any of this |
| **It is adversarial** | The conditions the control responds to are chosen by an opponent |
| **It is old** | Long enough to have solved problems this vocabulary is still discovering |

## 2. What mapped cleanly

Two terms out of thirteen lost nothing: **hard decline** → `enforce`, and **pre-authorisation check** → `before_action`.

The `enforce` fit is worth noting, because `enforce` is the coordinate with a falsifiable test attached — claiming it above zero requires a declared enforcement point ([LAYERS.md](../../LAYERS.md)). In this domain that point exists and is unambiguous: **the authorisation switch.** A payment is stopped or it is not.

**This is the vocabulary's best showing.** The hardest claim in the model is exactly the one the domain can satisfy without argument.

## 3. What mapped with loss

Eleven terms fit somewhere and lost something. Three patterns recur:

**Time collapses.** The domain distinguishes initiation, authorisation, clearing and settlement — four moments with different reversibility. `transfer` is one verb for all four. Same-day retrospective review and long-horizon pattern detection both land on `across_trajectory`. A chargeback window has a scheme-defined length and a hard expiry; `repair_window` carries no duration at all.

**Authority is treated as static.** `law` reads as fixed everywhere else in the vocabulary. A sanctions list is law **that changes between one transaction and the next**. Scheme rules bind parties who never signed them and change without their agreement, which is not what `contract` means anywhere else. A model governance approval that lapses when monitoring stops maps to `mandate`, which has no expiry semantics.

**Queues are invisible.** A referral to manual review is a handoff to a queue, not a decision — and the queue's depth is part of the control. The vocabulary can say humans are scarce. It cannot say the backlog is deep.

## 4. The six that did not map

| Term | Belongs in | Why it does not fit |
|---|---|---|
| **Sanctions list currency** | Environment | Screening against a stale list is a different act from screening against a current one. Not data quality, not threat pressure, not dependency health — and forced into all three |
| **Typology drift** | Environment | The adversary changing method is not the same as pressure rising. **Pressure is volume; drift is shape.** A control can face falling volume and rising drift at once |
| **Population drift** | Environment | The population a model scores no longer resembles the one it was fitted on. **The most common reason a fraud control silently degrades**, and there is no value for it |
| **Mule network density** | Environment | A property of the counterparty graph, belonging to neither party. The vocabulary has no place for a condition that belongs to the network |
| **Supervisory examination finding** | Authority | Binding in practice, unenforceable in form, often confidential. **There is no value for an obligation that binds without being a rule** |
| **Dual-use disclosure limit** | Evidence | A control that publishes how it works is degraded by publishing it |

## 5. The structural finding

Five of the six failures land on **Environment**, and that is not a coincidence.

> **Only one coordinate has an extension mechanism. Action has `custom_verbs` with a required `maps_to`. Environment, Authority, Actor, Time and Evidence have none.**

That is checkable against `schemas/project-manifest.schema.json` in about a minute, and it means a domain can name its own *actions* but must force its own *conditions* into fourteen fixed values.

The consequence is worse than a missing feature. **Environment is the primary coordinate** — the one the vocabulary exists to make visible, because most systems in this field have strong actor and authority coverage and weak environmental coverage. So the coordinate carrying the most weight is the one a domain has the least ability to speak precisely in, and every domain-specific condition arrives pre-flattened into `data_quality` or `threat_pressure`.

**Nobody decided this.** It fell out of the schema, the same way the ownerless-project gap fell out of it in [CALIBRATION.md](../../CALIBRATION.md). It is recorded here as a candidate revision rather than quietly patched.

## 6. The finding that is not about a coordinate

**Dual-use disclosure is a genuine conflict with the evidence model, not a gap in it.**

[EVIDENCE-MODEL.md](../../EVIDENCE-MODEL.md) assumes more disclosure is more honest. In adversarial domains that assumption inverts: **the most effective controls are the ones least able to evidence themselves**, because describing the control tells the adversary how to route around it.

Today such a claim sits at `SELF_ASSERTED` permanently — indistinguishable from a claim nobody bothered to support. The model has no way to say *"withheld for a legitimate reason"* as distinct from *"not evidenced."*

**No fix is proposed here.** A "trust us, it's secret" state is exactly the move the evidence model exists to prevent, and inventing one to solve this would be worse than the problem. Recording the conflict honestly is the correct output; resolving it needs adversarial review, not a schema edit.

## 7. What this profile does not claim

- **Not that the vocabulary failed.** Thirteen of nineteen terms mapped, and the hardest coordinate mapped cleanly
- **Not that these six terms should become coordinate values.** Five of them argue for an extension *mechanism*, which is a different and smaller change
- **Not a description of any named product.** Every term is a control archetype
- **Not reviewed by anyone who works in this field**

---

**See also:** [profiles/README.md](../README.md) — what a profile is and the rule it follows · [CALIBRATION.md](../../CALIBRATION.md) — the other standing test · [LAYERS.md](../../LAYERS.md) — the vocabulary under test · [GOVERNANCE.md](../../GOVERNANCE.md) §11 — the route from a finding to a change
