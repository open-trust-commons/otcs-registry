# What an analyst has to disclose

*Version 0.1 · Status: EXPERIMENTAL*

**Anyone may publish analysis here. Everyone discloses on the same terms.**

---

## 1. What goes with every published analysis

- **Identity** — a real, contactable name. There is no anonymous analysis
- **Affiliation**
- **Conflicts of interest with any project being analysed**
- **Methodology and its version** ([ANALYSIS-MODEL.md](ANALYSIS-MODEL.md) §10)
- **Sources**
- **AI assistance** — which models, which runs ([AI-REVIEW-PROTOCOL.md](AI-REVIEW-PROTOCOL.md))
- **Any prior relationship** with the subjects

```yaml
participants:
  author: "Name <contact>"
  affiliation: "Org"
  reviewers: ["Name"]
  conflicts:
    - "employed by <subject project's parent> until 2026-03"
    - "co-authored a specification with <subject>"
  ai_assistance: ["reviews/ai-runs/2026-08-01-openai.json"]
```

**"None" is a perfectly good answer.** A missing field is not — an analysis without a disclosure block cannot be merged.

## 2. Having a conflict does not disqualify you

It gives the reader context.

An analyst with a commercial relationship to a project can still produce sound work, and the reader is entitled to know about it while reading. **What is disqualifying is the conflict nobody declared** — that is a conduct matter ([ACCEPTABLE-USE.md](ACCEPTABLE-USE.md)).

## 3. The founder's standing conflict

The founder writes KTP, maintains this registry, and maintains three registered projects ([CHARTER.md](CHARTER.md) §6, [MAINTAINERS.md](MAINTAINERS.md) §1).

**Every founder-authored analysis touching those projects carries that disclosure in full.** No exception, no shorthand, no assumption that everyone already knows.

## 4. Claiming that someone tested it independently

An analysis asserting `INDEPENDENTLY_TESTED` for any claim has to show that the evaluator meets the strict definition in [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §3.

Each of these defeats independence on its own:

- Shared founders
- Shared funders
- An advisory role
- Reciprocal review — they reviewed you, you reviewed them
- Employment or contractor status
- Contributing code
- Commercial dependency
- Substantial prior collaboration

> **A separate legal entity is not independence.** Two companies can share every one of the things on that list.

---

**See also:** [ANALYSIS-MODEL.md](ANALYSIS-MODEL.md) — what analysis is and where it stops · [AI-REVIEW-PROTOCOL.md](AI-REVIEW-PROTOCOL.md) — disclosing model involvement · [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §3 — the evidence states this protects
