# Changing the roadmap

*Version 0.1 · Status: EXPERIMENTAL*

**The roadmap is a public commitment. Changing it is a recorded act, not an edit.**

---

## 1. What can change freely

- Estimated dates
- Descriptive wording
- The order of **minor** releases
- Adding a new minor release that introduces no new gate

## 2. What needs a proposal

- Changing any **major-version exit criterion**
- Changing a **Commons stage threshold** ([COMMONS-STAGES.md](COMMONS-STAGES.md))
- Changing the definition of a qualifying project ([QUALIFYING-PROJECTS.md](QUALIFYING-PROJECTS.md))
- Changing the sustaining criteria
- **Removing a planned major release**
- **Reordering major releases**

These are model-revision class ([GOVERNANCE.md](GOVERNANCE.md) §11): a 45–90 day clock, an impact analysis, migration notes, and a determination that the process was valid.

> The thresholds are version 0.1 policy assumptions. **They are revisable — never quietly.**

## 3. After a release candidate

That major version's criteria are frozen ([VERSION-EXIT-CRITERIA.md](VERSION-EXIT-CRITERIA.md) §3). **A change restarts the review clock.**

## 4. The log

Every roadmap change records four things:

- What changed
- Why
- Which proposal authorised it
- **What it would have meant for assessments already made under the old version**

> A roadmap whose history cannot be reconstructed is a marketing document.

## 5. Entries

### v0.1.0 — a v1.0 exit criterion added *(pre-release)*

**What changed.** `roadmap/releases/1.0.0.yaml` gains `governance.runbook_followed_by_non_founder`, required, currently `unmet`.

**Why.** [ROADMAP.md](ROADMAP.md) states three claims for version 1.0, and the third is *"someone else can run it — the instructions are written down and have been followed by a person who is not the founder."* **No criterion checked it.** The roadmap was promising something the gate would not have caught. Writing [RUNBOOK.md](RUNBOOK.md) satisfies half the claim; the criterion is satisfied only by a handover record, per §7 of that page.

**Which proposal authorised it.** None was required. Criteria freeze at the first release candidate (§3), which has not happened, and nothing has been published for anyone to have relied on.

**What it would have meant for prior assessments.** The `v1.0.0` gate becomes marginally harder. **Nothing was ever assessed against the old set**, so no result changes.

### v0.1.0 — the roadmap rewritten for a first-time reader *(pre-release)*

**What changed.** [ROADMAP.md](ROADMAP.md) was rewritten end to end. Versions `0.1` through `0.9` are now described in past tense with an inventory of what each one shipped; `1.0` through `4.0` gained plain-language exit criteria; every section was restructured for scanning rather than reading straight through.

**Why.** The previous version assumed the reader already knew what this project was. Nothing about the plan changed — only whether an outsider could follow it.

**Which proposal authorised it.** None was required. Under §1 this is descriptive wording plus minor-release detail that introduces no new gate.

**What it would have meant for prior assessments.** Nothing. **Every major-version gate was checked against its last incubation value and is unchanged:**

| Gate | Projects | Stewards | Sustained |
|---|---:|---:|---|
| `1.0.0` | 10 | 7 | 90 days |
| `2.0.0` | 50 | 30 | 180 days |
| `3.0.0` | 100 | 50 | 180 days |
| `4.0.0` | 250 | 100 | — |

Any assessment made under the old roadmap yields the same result under this one.

---

Before that, the roadmap was established and then extended three times — with the analysis track, then the two-dimensional model, Commons stages and count gates — **all during incubation, before any public commitment existed.**

Those three predate this log. They are in the incubation section of [CHANGELOG.md](CHANGELOG.md), by internal tag, and **this log deliberately starts at the first public release.** A change-control record that reaches back before there was anything to control is theatre.

---

**See also:** [ROADMAP.md](ROADMAP.md) — the roadmap itself · [VERSION-EXIT-CRITERIA.md](VERSION-EXIT-CRITERIA.md) — the criteria this protects · [GOVERNANCE.md](GOVERNANCE.md) §11 — the model-revision class
