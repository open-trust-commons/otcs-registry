# Calibration case — Bitcoin

*Version 0.1 · Status: EXPERIMENTAL · The method is in [CALIBRATION.md](../CALIBRATION.md)*

**What this case tests: can the vocabulary describe a system that scores near zero on the coordinate the framework treats as primary, without implying that system is deficient?**

---

## Why Bitcoin

The hardest available case:

- **It predates KTP entirely** — it cannot have been designed toward these coordinates
- **It is enormously successful** — a mapping that makes it look deficient is obviously the mapping's failure
- **It is maximally documented** — nothing rests on private knowledge
- **It sits at an extreme corner** of the space, not comfortably in the middle

### This is not a record, and Bitcoin is not a listed project

It is a document and it stays one.

Bitcoin has no owner to give consent, so the only record state it could ever hold is `observed` — and observed records are deliberately withheld until the correction and right-of-reply processes are mature ([REGISTRY-POLICY.md](../REGISTRY-POLICY.md), [PROJECT-LIFECYCLE.md](../PROJECT-LIFECYCLE.md) §3). **Publishing an analysis of something that cannot answer back is exactly what those safeguards exist for.**

So it ships as prose claiming nothing about participation. **Nothing here says Bitcoin has joined anything.**

## The mapping

Using the vocabulary as it stands today, not the proposed [three-layer split](../LAYERS.md) — which changes where these live, not what they say.

| Coordinate | Bitcoin | |
|---|---|---|
| **Actor** | `service` 1.0 · `human` 0.3 · `organization` 0.2 | No `ai_agent` at all |
| **Authority** | `capability`, and nothing else | **No identity, no credential, no role, no mandate.** Holding the key *is* the authority |
| **Action** | `transfer` · `commit` | Not `delegate`, not `revoke` |
| **Environment** | **near-zero** | Senses almost nothing, responds to almost nothing |
| **Function** | `enforce` 1.0 · `record` 1.0 · `decide` 0.4 | No `sense`, no `interpret`, no `repair` |
| **Time** | `commit_point` · `after_action` | **No `across_trajectory`** |
| **Evidence** | maximal | The chain *is* the evidence surface |

## What the mapping shows

**Bitcoin is the purest governance-at-rest system in existence.** Every transaction is evaluated independently against fixed rules. No accumulated trajectory cost, no environmental recomputation, no shaping, no deautomation, no veto based on conditions. A transaction valid under the rules is valid regardless of what that key has done before, what the network is experiencing, or what the consequences are.

In KTP's terms Bitcoin has **no environmental term at all** — and that is not a gap.

It is the central design achievement. Environmental insensitivity is precisely what makes it censorship-resistant: a system that shapes or vetoes based on conditions is a system whose conditions can be attacked or captured. Bitcoin traded environmental responsiveness for exactly that property, deliberately, and the trade has held for fifteen years.

**Authority without identity** is the second finding. Bitcoin recognises one authority source, and it is none of the ones enterprise systems assume. A vocabulary that required identity — or treated `authority: [capability]` alone as impoverished — could not describe the most successful decentralised trust system ever built.

## The results

| Test | Result |
|---|---|
| Can it express near-zero environment **without** implying deficiency? | **Pass** — a missing coordinate means *does not address*, and validators must not default-fill ([docs/coordinate-system.md](../docs/coordinate-system.md) §3). Bitcoin's is genuinely empty and the record says so neutrally |
| Can it express `authority: [capability]` alone as complete? | **Pass** — any subset is permitted; nothing marks a short list as incomplete |
| Can it express governance-at-rest as a **design choice**? | **Pass** — `time` without `across_trajectory` is a valid position, not a lower tier |
| Does anything rank a project by proximity to KTP? | **Pass, by construction** — numerical comparison was removed before the first release and no aggregate score exists |
| Does the maturity model handle a project with **no owner to attest**? | **Partial** — see below |

## The finding this produced

**Ownerless projects break an assumption the schema makes quietly.**

`freshness.next_owner_confirmation`, `ownership.verification`, and the qualifying-project rule's "owner confirmation within 12 months" all presume someone who can attest. Bitcoin has nobody and never will.

Neither will several categories this registry says it welcomes:

- Abandoned but important specifications
- The work of authors who have died
- Standards whose issuing body does not take part

Such projects can currently only ever be `observed`, and can never become qualifying projects. **That is defensible — but nobody decided it. It fell out of the schema.**

Which is exactly what a calibration case is for. It is queued as a candidate model revision rather than quietly patched.

---

**See also:** [CALIBRATION.md](../CALIBRATION.md) — the method and the other cases · [LAYERS.md](../LAYERS.md) — the vocabulary being tested · [EVIDENCE-MODEL.md](../EVIDENCE-MODEL.md) §7 — the moves these rules prevent
