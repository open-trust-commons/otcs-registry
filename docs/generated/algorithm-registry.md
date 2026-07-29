!!! info "Generated page"
    Compiled from `ALGORITHM-REGISTRY.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Every algorithm, and what it weighs

*Version 0.1 · Status: EXPERIMENTAL*

**Every computed output names the algorithm that produced it. Every algorithm is listed here.**

An algorithm nobody can inspect is a judgment nobody can argue with.

---

## 1. The registered algorithms

| Id | Version | What it does | Weights disclosed | Public output |
|---|---|---|---|---|
| `graph` | 0.1.0 | Assembles the relationship graph from declared records | not applicable | yes |
| `matrix` | 0.1.0 | Capability matrix, ladder rungs | rung logic stated | yes |
| `complementarity` | 0.2.0-categorical | Pair relationship **bands** | yes, in the source | **categorical only** |
| `candidate-neighbors` | *planned* | Builds the candidate set so deep review does not have to be all-pairs | to be disclosed | internal |

## 2. Every computed artifact carries its stamp

- Algorithm id and version
- The record versions it was computed from
- The weights
- A timestamp
- `non_authoritative: true`

**A computed output without that stamp is not publishable.**

## 3. Weights are public

An algorithm whose weighting is not disclosed **cannot produce public output.**

> Hidden weights are hidden judgment. A number nobody can reconstruct reads as objective while resting entirely on choices somebody made in private.

## 4. Changing an algorithm is a recorded event

Changing an algorithm changes what its past outputs would have been.

- Prior outputs **keep their original algorithm version**
- Nothing is silently recomputed
- A recomputation is a **new artifact**, not an update to the old one

## 5. No numerical relationship scores in public output

Removed before the first release, and still removed ([NON-GOALS.md](non-goals.md)).

`complementarity` still holds numbers under `_experimental`, used for internal candidate discovery and sensitivity work. **The published surface is categorical bands.**

Returning numbers to public output would require all five of these, and never as a ranking:

- Disclosed weights
- Algorithm versioning
- **Sensitivity analysis** — how much does the answer move when a weight moves?
- Explanatory factors, so a reader can see what drove it
- A route to appeal and correct it

## 6. Candidate generation stays internal

The candidate set exists to make deep review tractable across a large registry. It is not a similarity list, and it is not published.

> **Being someone's candidate neighbour is not a finding.**

---

**See also:** [ANALYSIS-MODEL.md](analysis-model.md) §5 — why candidates exist at all · [NON-GOALS.md](non-goals.md) — the standing refusal to rank · [EVIDENCE-MODEL.md](evidence-model.md) §4b — the same rule applied to maturity
