!!! info "Generated page"
    Compiled from `CALIBRATION.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Calibration — is this vocabulary neutral, or is it advertising?

*Version 0.1 · Status: EXPERIMENTAL · A permanent, checkable test that this project can fail.*

The registry uses KTP's vocabulary, and **the same person wrote both.** That is a problem, it is declared in [CHARTER.md](charter.md) §6, and this document is the standing check on it.

---

## The problem this solves

[CHARTER.md](charter.md) §11 says being listed is not endorsement of KTP, and that any project may contest how it was described.

**That is a promise, not a demonstration.**

The failure mode is specific: a vocabulary built by the author of one framework will describe that framework's concerns richly and everything else thinly — so every project it maps looks like an incomplete version of KTP. A registry doing that is a sales instrument with a schema attached.

So calibration asks one falsifiable question:

> **Can this vocabulary describe a highly successful trust system that scores near zero on KTP's own primary coordinate — without implying that system is deficient?**

If yes, the vocabulary is descriptive. If no, it is advocacy, and the model needs revision ([GOVERNANCE.md](governance.md) §11).

## Why Bitcoin

The hardest available case:

- **It predates KTP entirely** — it cannot have been designed toward these coordinates
- **It is enormously successful** — a mapping that makes it look deficient is obviously the mapping's failure
- **It is maximally documented** — nothing rests on private knowledge
- **It sits at an extreme corner** of the space, not comfortably in the middle

### This is not a record, and Bitcoin is not a listed project

It is a document and it stays one.

Bitcoin has no owner to give consent, so the only record state it could ever hold is `observed` — and observed records are deliberately withheld until the correction and right-of-reply processes are mature ([REGISTRY-POLICY.md](registry-policy.md), [PROJECT-LIFECYCLE.md](project-lifecycle.md) §3). **Publishing an analysis of something that cannot answer back is exactly what those safeguards exist for.**

So it ships as prose claiming nothing about participation. **Nothing here says Bitcoin has joined anything.**

## The mapping

Using the vocabulary as it stands today, not the proposed [three-layer split](layers.md) — which changes where these live, not what they say.

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
| Can it express near-zero environment **without** implying deficiency? | **Pass** — a missing coordinate means *does not address*, and validators must not default-fill ([docs/coordinate-system.md](docs/coordinate-system.md) §3). Bitcoin's is genuinely empty and the record says so neutrally |
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

## Why this document is permanent

Calibration is not a launch exercise. **Every model revision re-runs it** ([GOVERNANCE.md](governance.md) §11):

> If a proposed change to the vocabulary would make Bitcoin look deficient, **the change is wrong.**

That is a concrete, checkable constraint on how the model may evolve, and the closest thing this project has to a falsification test of its own neutrality.

## Further cases

More are welcome, chosen on the same basis — predating KTP, highly successful, fully documented, extreme in the space. Worth adding: TCP/IP · the ISO 9001 audit regime · a national land-title registry.

**One gap in the method is worth naming.** Bitcoin tests the *far* corner, where a biased mapping would be obvious. It does not test the **near field** — a project whose concerns overlap KTP's heavily, where a self-serving vocabulary could quietly reframe it as incomplete KTP and nobody would notice. That is the harder case and this document does not cover it.

**Domain profiles are the other half of that method** ([profiles/README.md](profiles/README.md)). Calibration asks whether the vocabulary can describe something at the edge without implying deficiency. A profile asks whether it can say anything precise inside one real industry at all. The first one found that **only one of six coordinates has an extension mechanism**, which is a structural limit calibration was never going to surface.

---

**See also:** [LAYERS.md](layers.md) — the vocabulary being tested · [NON-GOALS.md](non-goals.md) — what this registry refuses to become · [EVIDENCE-MODEL.md](evidence-model.md) §7 — the moves these rules prevent
