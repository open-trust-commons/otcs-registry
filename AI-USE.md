# Using AI here

*Version 0.1 · Status: EXPERIMENTAL · Extends [VOTING.md](VOTING.md) §10 from ballots to every surface*

This registry exists partly in response to a field flooded with AI-generated framework material. **Its own use of AI has to be legible, or the criticism is hollow.**

---

## 1. What AI may be used for

- Drafting
- Summarising
- Suggesting taxonomies
- Detecting candidate relationships
- Detecting duplicates
- Translation
- Generating code
- Assisting review

## 2. The conditions attached

| Rule | Why |
|---|---|
| Summaries link to their source records | An unlinked summary is an assertion with no provenance |
| Generated material is labelled as generated | The reader decides how much weight to give it |
| Generated material is correctable | Errors get fixed in the open, not quietly regenerated |
| Material AI assistance is disclosed on contributions | Provenance of the contribution itself — [DCO.md](DCO.md) §2 |
| Model and version recorded where practical | Reproducibility |

## 3. What AI may never do

- **Cast a ballot** — individual or project
- **Establish consensus.** No output may be presented as evidence of it
- **Decide a provenance dispute**
- **Silently modify a project record**
- **Promote a relationship candidate to a confirmed edge** without a human confirming it
- **Author a change to an evidence state**

The banned sentence, in every phrasing:

> *"The AI says the community agrees."*

Consensus exists only as signed human and project ballots ([VOTING.md](VOTING.md) §9).

## 4. Suggested relationships need a human

Correlation and duplicate-detection output is a **candidate list. It is never an edge.**

```text
model output → candidate → a human attaches an evidence class
                        → above self_asserted, also a reason
                              → only then, an edge
```

This is the declared-versus-computed rule ([EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §6) applied to machine assistance.

## 5. Why the strictness

> A registry that let generated content into its record unmarked would manufacture exactly the synthetic convergence it was built to make visible.

---

**See also:** [AI-REVIEW-PROTOCOL.md](AI-REVIEW-PROTOCOL.md) — the eight-pass procedure for AI-assisted analysis · [ANALYST-DISCLOSURE.md](ANALYST-DISCLOSURE.md) — disclosing model use in published work · [ALGORITHM-REGISTRY.md](ALGORITHM-REGISTRY.md) — deterministic computation, which has its own rules · [VOTING.md](VOTING.md) §10 — where these limits started
