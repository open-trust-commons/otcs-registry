# Calibration — is this vocabulary neutral, or is it advertising?

*Version 0.1 · Status: EXPERIMENTAL · A permanent, checkable test that this project can fail.*

The registry uses KTP's vocabulary, and **the same person wrote both.** That is a problem, it is declared in [CHARTER.md](CHARTER.md) §6, and this is the standing check on it.

---

## 1. The problem this solves

[CHARTER.md](CHARTER.md) §11 says being listed is not endorsement of KTP, and that any project may contest how it was described.

**That is a promise, not a demonstration.**

The failure mode is specific: a vocabulary built by the author of one framework will describe that framework's concerns richly and everything else thinly — so every project it maps looks like an incomplete version of KTP. A registry doing that is a sales instrument with a schema attached.

So calibration asks one falsifiable question of each case:

> **Can this vocabulary describe a highly successful system that sits at an extreme of the space — without implying that system is deficient?**

If yes, the vocabulary is descriptive. If no, it is advocacy, and the model needs revision ([GOVERNANCE.md](GOVERNANCE.md) §11).

## 2. How a case is chosen

Four criteria, all required:

- **It predates KTP** — so it cannot have been designed toward these coordinates
- **It is enormously successful** — a mapping that makes it look deficient is obviously the mapping's failure
- **It is fully documented** — nothing rests on private knowledge
- **It sits at an extreme** of the space, not comfortably in the middle

And one rule about the set rather than the case:

> **A new case must fail differently from the existing ones.** Three systems that break the vocabulary in the same place are one case with extra steps.

## 3. The cases

| Case | Sits at | Passes | Breaks |
|---|---|---|---|
| **[Bitcoin](calibration/bitcoin.md)** | Authority with no identity · **near-zero environment** | 4 of 5 | Ownerless projects can never qualify |
| **[TCP congestion control](calibration/tcp-ip.md)** | **Empty authority** · environment is everything · no enforcement power | 4 of 5 | Governor and governed are the same party |
| **[Spanning Tree](calibration/spanning-tree.md)** | Elected authority · **a real enforcement point** | 3 of 5 | Authority's provenance · the unconverged state |

**Bitcoin and TCP are near-inverses**, which is deliberate. Bitcoin has authority and almost no environment; TCP has almost no authority and lives entirely in environment. A vocabulary that handled only one corner would have been caught by the other.

**Spanning Tree passes the `enforce` test where TCP cannot.** That contrast is the most useful single result in the set: the vocabulary's hardest claim discriminates between two systems that both plausibly "govern network traffic."

## 4. What the set has found

Three findings, none of them patched quietly.

**1 · Ownerless projects break an assumption the schema makes silently.** `freshness.next_owner_confirmation`, `ownership.verification` and the 12-month confirmation rule all presume a party who can attest. Bitcoin has nobody and never will, and neither will abandoned specifications or standards whose issuing body does not take part. Such projects can only ever be `observed` and can never become qualifying projects. **Defensible — but nobody decided it. It fell out of the schema.**

**2 · The vocabulary cannot say why anyone complies.** TCP is the most successful voluntary governance regime in computing and has no enforcement point at all. The `enforce` test correctly scores it `decide`/`constrain` — and in doing so loses the thing that makes it remarkable, that compliance is unenforced and near-universal anyway.

**3 · The vocabulary records authority, never its provenance.** Spanning Tree elects its root bridge by a deterministic rule over arbitrary identifiers. `authority: [role]` captures the outcome and discards the mechanism. For a registry about legitimacy, *how someone came to decide* is close to the central question and is currently inexpressible.

Spanning Tree adds a fourth, still open: **no coordinate describes a governor mid-decision, whose own invariant is temporarily suspended.** Every `time` value is positioned relative to a governed action; none describes the interval in which the governor cannot yet make its promise.

## 5. Why this is permanent

Calibration is not a launch exercise. **Every model revision re-runs the whole set** ([GOVERNANCE.md](GOVERNANCE.md) §11):

> If a proposed change to the vocabulary would make **any** calibration case look deficient, **the change is wrong.**

That is a concrete, checkable constraint on how the model may evolve, and the closest thing this project has to a falsification test of its own neutrality.

## 6. What calibration does not cover

**The near field.** All three cases sit at extremes, where a biased mapping would be obvious. None tests a project whose concerns overlap KTP's heavily — where a self-serving vocabulary could quietly reframe it as incomplete KTP and nobody would notice. **That is the harder case and it is not covered here.**

[Domain profiles](profiles/README.md) are the other half of the method. Calibration asks whether the vocabulary can describe something at the edge without implying deficiency. A profile asks whether it can say anything precise *inside* one real industry. The first profile found that **only one of six coordinates has an extension mechanism** — a structural limit calibration was never going to surface.

**Candidates for future cases:** the ISO 9001 audit regime · a national land-title registry · DNS · certificate transparency. Each would have to break the vocabulary somewhere the current three do not.

---

**See also:** [LAYERS.md](LAYERS.md) — the vocabulary being tested · [NON-GOALS.md](NON-GOALS.md) — what this registry refuses to become · [profiles/README.md](profiles/README.md) — the near-field half of the method · [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §7 — the moves these rules prevent
