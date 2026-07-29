!!! info "Generated page"
    Compiled from `COMMONS-STAGES.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# How big this actually is

*Version 0.1 · Status: EXPERIMENTAL · The thresholds here are policy assumptions, not laws — changing one requires a model-revision proposal ([GOVERNANCE.md](governance.md) §11)*

---

## 1. Two numbers, always published together

| | Describes |
|---|---|
| **Version** | The technical and governance contract |
| **Stage** | Ecosystem size, diversity and operating maturity |

**Neither substitutes for the other.** A mature contract with four participants is a real thing, and so is a large ecosystem on an unstable contract. Publishing only one of the two lets a reader assume the other.

```text
OTCS v1.3.0 · Networked Commons · 31 active projects · 19 independent stewards
```

## 2. The stages

| Stage | Projects | Independent stewards | What it means |
|---|---:|---:|---|
| **C0 — Seed** | 1–4 | 1–3 | Founding records and fictional test cases |
| **C1 — Founding Commons** | 5–9 | 3–6 | First outside participants; owner workflows exist |
| **C2 — Stable Commons** | 10–24 | 7+ | Registry, evidence, governance and analysis contracts are stable |
| **C3 — Networked Commons** | 25–49 | 15+ | A meaningful ecosystem graph, owner-hosted manifests, reusable interfaces |
| **C4 — Federated Commons** | 50–99 | 30+ | More than one registry operator; distributed stewardship |
| **C5 — Runtime Commons** | 100–249 | 50+ | Live cross-project signal, decision, enforcement and receipt exchange |
| **C6 — Public Infrastructure** | 250+ | 100+ | Durable, multi-operator, multi-domain public-interest infrastructure |

Only qualifying active projects count ([QUALIFYING-PROJECTS.md](qualifying-projects.md)).

## 3. A stage has to be held, not touched

**A threshold met for a single day is manufactured.**

| | Sustained for |
|---|---|
| A major release | **≥ 90 consecutive days** |
| From `v2.0.0` onward | **≥ 180 consecutive days** |

The longer window applies from `v2.0.0` because by then the project is claiming institutional durability, and that claim needs a longer proof.

## 4. When participation drops

**Versions are never rolled back.** The stage is what carries the honesty:

```text
OTCS v2.1.0
Federated Commons status: AT RISK
Current qualifying projects: 38
Sustaining threshold: 40
Governance review required if below threshold for 180 days
```

- The sustaining threshold is **80% of the original gate**
- Falling below it publishes `AT RISK`
- Sustained failure triggers a **governance review** — not a silent demotion, and not a pretence that nothing changed

## 5. What a stage does not mean

A stage records **scale. Never consensus.**

> C3 does not mean twenty-five projects agree with each other, with KTP, or with this registry. It means twenty-five stewarded projects chose to be **locatable in a shared coordinate system** — a different and far more modest claim.

---

**See also:** [QUALIFYING-PROJECTS.md](qualifying-projects.md) — the counting rule · [VERSION-EXIT-CRITERIA.md](version-exit-criteria.md) §6 — the gates that are not counts · [ROADMAP-CHANGES.md](roadmap-changes.md) §2 — changing a threshold
