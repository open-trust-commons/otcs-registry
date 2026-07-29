!!! info "Generated page"
    Compiled from `AI-REVIEW-PROTOCOL.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# How models are allowed to help with analysis

*Version 0.1 · Status: EXPERIMENTAL · The absolute limits live in [AI-USE.md](ai-use.md); this document is the procedure inside them*

The risk this protocol is built against is specific: **a language model asked to compare two projects will find similarities, because that is what it was asked for.** Everything below exists to make that tendency visible and to stop it becoming a record.

---

## 1. Eight passes, in this order

| # | Pass | What happens |
|---|---|---|
| **1** | **Independent reading** | Each model gets the same records and sources — **no access to the other model's output, and no instruction to look for convergence.** It extracts: the governed object, explicit claims, interfaces, non-claims, evidence, limitations, terminology |
| **2** | **Neutral comparison** | Same problem or same implementation · vocabulary similarity vs functional equivalence · overlapping functions · differing assumptions · possible interfaces · contradictions · gaps |
| **3** | **Coordinate mapping** | Actor, Authority, Action, Environment, Function, Time, Evidence — **and only now** |
| **4** | **Sceptical review** | Each model must argue against its own finding: why it may be false · prior art · missing evidence · incompatible semantics · hidden dependencies · likely overclaims |
| **5** | **Cross-model disagreement** | A deterministic process compares the structured claims |
| **6** | **Human source verification** | A named person checks every material finding against sources |
| **7** | **Owner response** | The affected projects see the draft before it is published |
| **8** | **Publication** | The complete packet enters the repository as a pull request |

Three of those need saying plainly:

> **Pass 3 comes after pass 2, always.** Map to KTP coordinates first and every subsequent finding comes out KTP-shaped.

> **Pass 5: two models agreeing is not verification.** Concurrence may reflect shared training data rather than shared evidence.

> **Pass 6 is the only route to `SOURCE-VERIFIED`.** No amount of model agreement reaches it.

**Pass 7 is a right of response, not a veto.** A project may correct, contest and have its answer published alongside. It may not suppress. The one exception is material that is confidential or legally prohibited.

## 2. The anti-convergence gate

Forbidden, in every phrasing:

> *"Both projects use the word continuity, therefore they independently converged."*

Every relationship claim answers all eight of these:

1. What exact objects are being compared?
2. What does each one do?
3. What source passage supports the comparison?
4. Do they share only vocabulary?
5. Do they share structure?
6. Do they share implementation behaviour?
7. Is there evidence that one had access to the other?
8. Do the authors confirm the relationship?

The permitted findings, weakest first — **and they are not interchangeable:**

```text
SEMANTIC SIMILARITY ONLY
FUNCTIONAL OVERLAP
STRUCTURAL CORRESPONDENCE
POTENTIAL INTERFACE
DOCUMENTED DERIVATION
MUTUALLY CONFIRMED INTEGRATION
```

**A finding that cannot answer questions 5 through 8 cannot go above `FUNCTIONAL OVERLAP`.** That ceiling is the whole mechanism — see [EVIDENCE-MODEL.md](evidence-model.md) §6, which says the same thing about human analysts.

## 3. What gets recorded for every run

- Provider
- **The exact model identifier** — not "GPT" or "Claude", the version
- Run identifier
- **The prompt, verbatim**
- The raw final output
- A hash of the input snapshot
- Any redactions, and why

Stored in `reviews/ai-runs/`.

> **An AI-assisted analysis whose prompts and outputs were not published is not reproducible, and cannot be accepted.**

## 4. What a model may never do

Restated from [AI-USE.md](ai-use.md) because this is where the pressure actually lands. A model may not:

- Confirm a relationship
- Determine legal ownership
- Certify conformance
- Cast a ballot
- Resolve a provenance dispute
- Establish independent validation
- Assign any evidence or relationship status

---

**See also:** [AI-USE.md](ai-use.md) — the outer limits on AI everywhere in the project · [ANALYSIS-MODEL.md](analysis-model.md) §6 — what the resulting labels mean · [ANALYST-DISCLOSURE.md](analyst-disclosure.md) — disclosing the human side
