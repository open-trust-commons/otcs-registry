!!! info "Generated page"
    Compiled from `EVIDENCE-MODEL.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# How evidence works here

*Version 0.1 · Status: EXPERIMENTAL · Enforced by `schemas/claim.schema.json` and `schemas/relationship.schema.json`*

The rules that decide what any statement in this registry actually means — and what stops a weak claim from looking like a strong one.

Section numbers are fixed; other documents cite them. The words in `CODE_FONT` are exact values used by the software and cannot be reworded.

---

## 1. Three kinds of statement, never mixed

| Kind | What it is | Who controls it |
|---|---|---|
| **Self-asserted claims** | What a project says about itself | The project |
| **Evidence-verified facts** | What the record shows — dates, files, hashes, citations | Nobody. They are checkable |
| **Community interpretations** | What other people conclude from it | Whoever said it, **named** — never anonymous consensus |

They are kept apart on purpose. Most of the ways a registry becomes misleading involve one of these quietly becoming another.

## 2. What a claim records

Every claim carries six things:

- **Who** is claiming it
- **What** they claim
- **When**
- **The artifact** it points to
- **The supporting evidence**
- **How it relates** to earlier work

Claims come in kinds: `ORIGINALITY` · `IMPLEMENTATION` · `PERFORMANCE` · `SECURITY` · `INTEROPERABILITY` · `STANDARDS` · `DERIVATION` · `ATTRIBUTION` · `VALIDATION`.

**Every claim is judged on its own.** A claim never inherits credibility from the project around it.

One project can hold all of these at once, and that is the **expected** state, not a problem:

- *"Public code exists"* — verified
- *"The code implements the whole framework"* — disputed
- *"It improves safety"* — untested

A mature product can carry an unverified claim. A young project can carry one rigorously verified mechanism.

## 3. Evidence states

Applied **per claim**, never per project.

| State | Meaning |
|---|---|
| `SELF_ASSERTED` | The project says so |
| `DOCUMENTED` | A public artifact says so — a specification, a post, a repository |
| `REPRODUCIBLE` | An outsider can re-derive it from published material |
| `INDEPENDENTLY_TESTED` | Verified by someone the project owner does not control |
| `FIELD_OBSERVED` | Repeated real-world evidence, **including known failures** |
| `DISPUTED` | An open dispute exists ([GOVERNANCE.md](governance.md) §10) |
| `RETRACTED` | Withdrawn by whoever claimed it. The retraction is permanent |

### What counts as independent

**A separate legal entity is not automatically independent.** An evaluator is independent only if *none* of these apply, and each is a disclosed field on the record:

- Shared founders
- Shared funders
- An advisory relationship
- Reciprocal review arrangements
- Employment
- Contractor status
- Code contributed to the project being evaluated
- Commercial dependency
- Substantial prior collaboration

Fail any one of them and the evaluation is `DOCUMENTED`, not `INDEPENDENTLY_TESTED` — **with the relationship stated.**

### Independence is a condition at a moment, not a property

The list above is a test applied on a date. Any of those relationships can form *after* an evaluation: a laboratory takes a support contract, a reviewer joins an advisory board, an evaluator's employer is acquired by a funder.

**That later relationship does not falsify the evaluation.** It happened, under the conditions that held at the time, and the record says so permanently. What it changes is how the evaluation should be read *now*.

Recording only one of the two moments gets it wrong in one of two directions:

| Recording only… | Produces |
|---|---|
| The assessment | Independence that is **falsely permanent** — a decade-old evaluation still presenting as arm's-length |
| The present | Independence **retroactively erased** — a genuine past evaluation deleted by a relationship that formed afterwards |

So both are carried, in `evaluator_independence` on every `INDEPENDENTLY_TESTED` claim: `independent_at_assessment` with its `assessed_at` date, and a `current_status` — `UNCHANGED`, `RELATIONSHIP_FORMED_SINCE`, or `UNREVIEWED` — with the date it was last determined. A relationship formed since must say what it is; a status with no description is not a disclosure. `UNREVIEWED` is the honest default and is never a synonym for `UNCHANGED`.

The claim keeps the state its evidence earned. The current relationship travels beside it.

**Historical validity and current standing are different questions, and the record answers both separately.** That principle is not confined to independence — it applies wherever an upstream fact can change under a record that has already been published.

**What is not built:** there is no mechanical dependency graph. When an evidence source is withdrawn, a witness loses independence, an evaluation method is shown defective, or an artifact is superseded, nothing automatically walks the dependent records and marks them stale, disputed or review-required. Today that is a human job done through the correction process, which means it can be missed. Naming it here rather than in a roadmap because a reader deciding whether to rely on this needs to know it is a gap and not a feature. The seam was identified in architectural review by Richard Lynes (Genesis AiX).

## 4. The maturity scale

Scored **separately for each kind of claim**. A project's conceptual, implementation and validation maturity routinely differ, and the record keeps them apart.

| Level | Name | What it takes |
|---|---|---|
| **0** | Claim only | A name, an idea, a post |
| **1** | Specified | Definitions, diagrams, a threat model, a formal description |
| **2** | Reproducible artifact | Public code, formats, test cases, a simulation |
| **3** | Operational | Deployed, or realistically runnable |
| **4** | Independent evaluation | Tested by someone the owner does not control |
| **5** | Field validation | Repeated real-world evidence — including failures and repairs |

**Evidence has to match the size of the claim.** An essay is not validated infrastructure. A demo is not a standard. Code existing is not code deployed.

## 4b. Doing evidence is not the same as having evidence

A circularity worth naming, because it is easy to fall into.

| | |
|---|---|
| **The evidence coordinate** | Something a project *does* — it produces receipts, records, proof surfaces. A position in the vocabulary |
| **Evidence maturity** | How well *any* of that project's claims are supported. A quality of the record |

**Never use one to grade the other.**

A flight recorder that has never been independently tested is **high** on the coordinate and **zero** on validation. The record has to be able to say both at once, without either cancelling the other.

## 5. How connections between projects are recorded

Every stated connection carries who asserted it, the evidence, the date, and a status. Weakest first:

```text
otcs_observed → self_asserted → mutually_confirmed → independently_verified   (or → disputed)
```

| Status | Who said it |
|---|---|
| `otcs_observed` | **We did.** Neither named project has said anything |
| `self_asserted` | One of the two projects claims it |
| `mutually_confirmed` | Both agreed |
| `independently_verified` | Checked by someone neither side controls |

Reaching `mutually_confirmed` requires **the other party signing off** on the change.

### Observations we make about others

`otcs_observed` sits **below** `self_asserted`, because it is the one status where nobody involved has spoken. It exists so the registry can record a reading of two projects without pretending either of them made the claim.

An `otcs_observed` edge is **required** to carry:

- **`non_claims`** — what the edge explicitly does not assert. *No derivation established. No equivalence established.*
- **`observed_source`** — the public material it was drawn from, so the subject can check our work

The schema refuses an observed edge without both. An unbounded assertion about a project nobody asked, with no way to trace where it came from, is precisely the harm the `observed` record state exists to contain — so it is blocked mechanically rather than left to good intentions.

**Nobody registers a connection on another project's behalf** at any status above `self_asserted`.

The kinds of connection: `BUILDS_ON` · `IMPLEMENTS` · `EXTENDS` · `USES` · `INTEGRATES_WITH` · `SUPPLIES_SIGNAL_TO` · `ENFORCES_FOR` · `RECORDS_FOR` · `TESTS` · `VALIDATES` · `CRITIQUES` · `FORKS` · `TRANSLATES` · `ADAPTS` · `INSPIRED_BY` · `CONCEPTUALLY_OVERLAPS` · `CLAIMS_PRIORITY_OVER` · `DISPUTES_DERIVATION_FROM`.

## 6. Two projects being similar is not evidence one copied the other

Sitting in a similar position says nothing about where either came from. Derivation is assessed separately, using chronology, documented access, distinctive wording, structural correspondence, citations, and each project's own prior lineage.

| Similar, and… | Reading |
|---|---|
| No evidence either saw the other | Possibly **independent convergence** |
| Documented prior access | Worth reviewing the history |
| Explicit attribution | A known extension or implementation |
| Copied wording or diagrams | Possibly a licensing or authorship problem |

**Independent convergence is a finding, recorded as one.** It strengthens *both* records rather than diminishing either.

### Declared facts and computed opinions live apart

The registry stores what projects **declared**, plus verified connections and evidence.

Anything **derived** from that — overlap, complementarity, suggested integrations, apparent duplication — is stored separately and always carries:

- Which algorithm version produced it
- Which record versions it read
- What weights it used
- When it ran
- What went into the result

**A computed score presented as though it were a fact about a project — a reputation detached from its assumptions — violates this model.** It is not a feature to be added later.

## 7. What these rules prevent

| The move | What stops it |
|---|---|
| **Validation inflation** — self-tests and friendly reviews presented as independent | The independence checklist in §3 |
| **Provenance laundering** — an idea quietly becoming "common knowledge" | Every claim keeps who said it, when, and pointing at what |
| **Synthetic convergence** — friendly accounts agreeing with each other to manufacture consensus | Agreement is a community interpretation with relationships disclosed. It is never an evidence state |
| **Layer inflation** — claiming to be foundational infrastructure | The vocabulary plus per-claim maturity make it checkable against what the project actually does |
| **Directory theatre** — being listed implying anything | Being listed asserts existence and nothing else. Every stronger statement needs its own evidence |

## 8. What an honest record looks like

This project's own entry, showing all three states at once:

```yaml
project: ktp
claims:
  - class: STANDARDS
    content: "Engineering specifications published in IETF-draft style"
    evidence_state: DOCUMENTED
    maturity: 1
  - class: IMPLEMENTATION
    content: "Reference behavior demo (ktp-demo) with pre-registered falsifiers"
    evidence_state: REPRODUCIBLE
    maturity: 2
  - class: VALIDATION
    content: "Independent second implementation reproducing the falsifier suite"
    evidence_state: SELF_ASSERTED     # sought, not achieved
    maturity: 0
```

Note the last one. It is the claim the project most wants to make, and it is recorded at the lowest state there is, with a comment saying so.

**This registry's credibility rests on records that look like this** — strong where the evidence is strong, and plainly weak where it is weak.
