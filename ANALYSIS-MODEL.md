# How analysis works, and where it stops

*Version 0.1 · Status: EXPERIMENTAL*

The registry holds records. **Analysis is what someone derives from those records** — a separate subsystem with its own rules, not a feature that quietly arrives with a database.

---

## The shape of it

```text
registry         the records: claims, evidence, relationships, versions, disputes
    ↓
compiler         validates · normalises · resolves identifiers · builds the graph
    ↓
analysis plane   deterministic analysis + AI-assisted review + human verification
                 + responses from the projects being analysed
    ↓
Trust Atlas      project pages, comparisons, maps, crosswalks, gaps, conflicts
```

> **No hidden database holds the "real" analysis.** Everything treated as official lives in the repository, versioned, and open to challenge.

## 1. Five operations, kept apart

"Analysis" was doing too much work as a single word. These five have different rules, different authors and different ways of going wrong.

| Operation | The question it answers | Who may do it |
|---|---|---|
| **Aggregation** | What is in the registry? | The compiler — deterministic |
| **Normalisation** | How can unlike projects share one vocabulary without pretending to be the same? | Compiler plus the project's own self-mapping |
| **Analysis** | What can reasonably be inferred from the record as it stands? | A named analyst, AI-assisted, anchored to sources |
| **Synthesis** | What larger pattern emerges? | A named analyst — **the strictest disclosure rules apply here** |
| **Adjudication** | What status does this registry officially assign? | **A human governance process. Nothing else** |

**Normalisation preserves disagreement.** Four things sit side by side, and none overwrites the others:

- The project's own vocabulary
- The project's own mapping into these coordinates
- This registry's mapping
- **The disagreements between them**

A project saying *"we accept your Actor and Authority mappings but do not consider Environment part of our architecture"* is a recordable, publishable state — not an error to be resolved.

**Adjudication is where the line is absolute.** AI never adjudicates. Neither does a maintainer who simply holds an opinion. A status change follows the evidence and the governance process, or it does not happen ([GOVERNANCE.md](GOVERNANCE.md) §1).

## 2. Four scales

| Scale | What gets examined |
|---|---|
| **One project** | Claim quality, evidence profile, coordinates, interfaces, lifecycle, provenance, stated limitations, staleness |
| **A pair** | Overlap, complementarity, conflict, dependency, a possible interface, technical and legal and governance compatibility |
| **A collection** | A domain, a standard, an interface, a use case |
| **The whole ecosystem** | Coverage, missing functions, duplication, centralisation, shared dependencies, **concentration of validation authority, circular review networks** |

## 3. The project baseline — three columns, never one number

| What the project says | What the record shows | Status |
|---|---|---|
| Runtime enforcement | Documented gateway middleware | Documented |
| Instant revocation | Offline tokens may stay valid until they expire | Qualified |
| Complete action receipt | Verification events only; the payload is not kept | Overbroad |

**The gap between the first two columns is the analysis.** A single maturity number would destroy exactly that information, which is why [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §4b forbids collapsing to one.

## 4. Eight lenses — and KTP is only one of them

| Lens | Looks at |
|---|---|
| `ktp_coordinates` | Position in the coordinate vocabulary ([LAYERS.md](LAYERS.md)) |
| `interface` | What it consumes and emits, schemas, enforcement dependencies, proof obligations |
| `evidence` | Claimed · supported · first-party? · evaluator independent? · reproduced? · current? |
| `provenance` | Who published first, what was cited, who had access, what exactly moved, was attribution kept, was it superseded |
| `standards_authority` | Binding, voluntary or advisory; relevance vs mapping vs conformance vs certification |
| `operational_composition` | Can one project's output become another's input; who enforces; what happens when a component is down |
| `threat` | Bypass, stale authority, replay, escalation, false provenance, cumulative harm, compromised observer, governance capture |
| `governance_health` | Shared maintainers, commercial ties, circular validation, concentration of review authority |

### The identity triad — a lens within `provenance` and `governance_health`

When a project's claims rest on *who it is* — a constitutional identity, a chartered mandate, a long-lived agent — the analysis separates three things that the word "identity" flattens:

| | Asks |
|---|---|
| **Declared identity** | Who does the system say it is, and what does it exist to serve? |
| **Runtime bearer** | Which process, deployment or party is *currently* acting in that identity's name? |
| **Continuity evidence** | What supports the claim that the current bearer still embodies the declared identity and authority? |

The gap between the first two is where impersonation, drift, capture and succession disputes live, and continuity evidence is the only thing that closes it. The triad applies far beyond any one architecture: machine identities, organisations, credential rotation, delegated authority, forks and successor projects all decompose the same way.

**This is analysis vocabulary, not schema.** No manifest field asks for it; an analyst uses it to structure a finding, and a project may reject the decomposition in its response like any other analytical claim.

> **A neutral baseline is produced before any KTP mapping is applied.** The order is the point. Map first and every finding comes out KTP-shaped — the analysis plane becomes an opinion engine wearing a coordinate system.

## 5. Overlap is not complementarity

```text
Coverage(S) = ⋃ C(p)              Gap(D,S) = D − Coverage(S)
Overlap(p,q) = C(p) ∩ C(q)
```

Two projects **compose** when one's outputs feed the other's inputs **and they do different jobs.**

Three projects all claiming "operational legitimacy" can have enormous vocabulary overlap and **zero compositional value.** That is the most common false finding in this field, and most of the machinery in [AI-REVIEW-PROTOCOL.md](AI-REVIEW-PROTOCOL.md) exists to catch it.

**Candidates, not all pairs.** A thousand projects is half a million pairs, and nearly all are irrelevant. A candidate set is built from shared interfaces, coordinates, verbs, domain and citations; only candidates get deep review. **Being someone's candidate neighbour is not a finding** ([ALGORITHM-REGISTRY.md](ALGORITHM-REGISTRY.md)).

## 6. What the label on an analysis means

```text
AUTO-GENERATED      deterministic; no human has reviewed it
AI-GENERATED        model output; not verified
HUMAN-REVIEWED      a named reviewer checked it
SOURCE-VERIFIED     every material finding checked against sources
OWNER-RESPONDED     the affected projects were given a way to respond
MUTUALLY-CONFIRMED  all affected parties confirmed this specific relationship
PARTIALLY-DISPUTED  some findings remain contested
SUPERSEDED · STALE · RETRACTED
```

> **No check mark, badge or summary icon may collapse these into one.** The distinction between them is the entire information content of an analysis header.

## 7. Going stale

Every analysis records exactly what it was computed from — registry release, per-project record versions, graph snapshot hash — plus a review date.

When a source record changes materially, everything derived from it moves:

```text
CURRENT → POTENTIALLY_STALE → STALE
```

A stale analysis stays readable and stays labelled. It is replaced by a successor that names it, **never silently overwritten** ([GOVERNANCE.md](GOVERNANCE.md) §9).

What triggers recomputation:

- A project registers → baseline, candidate neighbours, a preview for the owner
- A version changes → dependents marked
- A relationship is asserted → the counterparty is notified
- Evidence is added → only dependent claims recompute
- An interface version changes → impact report
- A standard changes → crosswalks go stale
- A project withdraws → history preserved, dependency views regenerated

## 8. Two different things on the website

| | Exploratory view | Published analysis |
|---|---|---|
| **What it is** | You pick 2–5 projects; your browser computes from a static file | A reviewed, versioned repository record |
| **Server** | None. No database | The repository |
| **Carries** | A permanent banner: *"Exploratory view generated from current registry records. This is not a reviewed OTCS analysis."* | Methodology, input snapshot, findings, AI runs, human verification, owner responses, disputes, history |
| **Citable** | No | Yes |

*Running a query is not publishing a report.*

## 9. The central rule

> **Nothing becomes an accepted analysis because it appeared on the website or came out of an interface. It becomes accepted when its versioned record enters the Commons through the published process.**

## 10. Methodology

Every published analysis names its method and that method's version. Methods live in `analysis/methods/` and are versioned artifacts in their own right — **changing a method changes the record; it is not an implementation detail.**

- Deterministic tooling is listed with exact versions
- Algorithms and their weights are registered ([ALGORITHM-REGISTRY.md](ALGORITHM-REGISTRY.md))
- **An analysis that cannot be re-run is not reproducible, and cannot reach `SOURCE-VERIFIED`**

## 11. Where the files live

```text
analysis/methods/ projects/ pairs/ collections/ ecosystem/
reviews/ai-runs/ human-verification/ owner-responses/
compiled/registry.json graph.json claims.json interfaces.json atlas.json
```

`compiled/` is generated and disposable. `analysis/` and `reviews/` are the record. Large source bundles go to durable external archives — **Git is the index, not the warehouse.**

## 12. The whole thing in one line

> **Aggregate automatically. Abstract transparently. Analyse reproducibly. Synthesise cautiously. Adjudicate only through an explicit human governance process.**

---

**See also:** [ANALYST-DISCLOSURE.md](ANALYST-DISCLOSURE.md) — what an analyst must reveal about themselves · [AI-REVIEW-PROTOCOL.md](AI-REVIEW-PROTOCOL.md) — how models may take part · [ALGORITHM-REGISTRY.md](ALGORITHM-REGISTRY.md) — every algorithm and its weights · [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) — what a claim's evidence level means
