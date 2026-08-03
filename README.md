# Open Trust Commons

**A public list of the projects trying to control what automated software is allowed to do — written in one shared vocabulary, so they can finally be compared.**

*Formally: OTCS, the Open Trust Coordination System. The Commons is what it is; the Coordination System is how it works.*

---

## The problem

- Dozens of teams are building ways to govern what automated systems can do.
- They use **different words for the same idea**, and the **same word for different ideas**.
- So the work is hard to compare, easy to duplicate, and almost impossible to fit together.
- Buyers cannot tell what any of it actually covers. Builders cannot tell what already exists.

## What this does

Every project describes itself using one shared set of questions. We keep that description, date it, and publish it.

Then you can put two projects side by side and see **where one stops and the other has to begin** — without either having to absorb the other.

## What a listing does *not* mean

This is the part most directories get wrong, so it is stated first:

- **Not an endorsement.** A listing says a project described itself. Nothing more.
- **No scores, no rankings, no badges.** There is nothing here to win and nothing to display.
- **Not a review.** We have not tested that any listed project works.
- **Not a claim of completeness.** Plenty of good work is missing.

Every claim carries how well established it is, and every stated connection between projects records whether both sides agreed or only one side said so.

## What is in this repository

| | |
|---|---|
| **Start here** | [FAQ.md](FAQ.md) — the questions people actually ask, plainest first |
| **Where this is going** | [ROADMAP.md](ROADMAP.md) — in plain language |
| **Getting listed** | [REGISTERING.md](REGISTERING.md) — what happens, step by step |
| **The rules** | [CHARTER.md](CHARTER.md), [GOVERNANCE.md](GOVERNANCE.md), [VOTING.md](VOTING.md) |
| **What gets listed** | [REGISTRY-POLICY.md](REGISTRY-POLICY.md), [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md), [QUALIFYING-PROJECTS.md](QUALIFYING-PROJECTS.md) |
| **What we refuse to do** | [NON-GOALS.md](NON-GOALS.md) — twenty things this will not become |
| **The vocabulary** | `docs/coordinate-system.md`, [LAYERS.md](LAYERS.md) |
| **Where the vocabulary breaks** | [CALIBRATION.md](CALIBRATION.md), [profiles/README.md](profiles/README.md) — two standing tests it can fail |
| **Running it** | [RUNBOOK.md](RUNBOOK.md) — written so it does not have to be the founder |
| **How it could fail** | [PREMORTEM.md](PREMORTEM.md) — including when to stop |
| **Machine-checkable formats** | `schemas/` |
| **Where projects hand off to each other** | `interfaces/` |
| **The listings themselves** | `registry/` |
| **Every governance action, in order** | `governance-log/` |
| **The tooling** | `src/`, `tests/` |

Safety, privacy and acceptable use: [SAFETY.md](SAFETY.md), [PRIVACY.md](PRIVACY.md), [ACCEPTABLE-USE.md](ACCEPTABLE-USE.md).
On AI: [AI-USE.md](AI-USE.md) — it may assist; it may not vote, decide, or settle a disagreement.

## Check it yourself

Nothing here asks to be taken on trust. Clone it and run the same checks we run:

```bash
npm install
npm run validate       # every format, record and cross-reference
npm test               # the full test suite
npm run ledger:verify  # confirm the governance history has not been altered
npm run build:site     # build the site
npm run serve          # preview at http://localhost:8138
```

If your results differ from ours, that is a bug and we want to hear about it.

## Who controls what

| | |
|---|---|
| **Kinetic Trust Protocol** ([separate project](https://github.com/nmcitra/ktp-rfc)) | The vocabulary and the underlying model |
| **This repository** | The list, the rules for being on it, and the record of changes |
| **Each listed project** | Itself — its own roadmap, its own code, its own claims |

Listed projects do not become part of KTP. They describe themselves in a vocabulary it defines.

**The same person authored both.** That is a conflict of interest, it is written down in [CHARTER.md](CHARTER.md) §6, and [CALIBRATION.md](CALIBRATION.md) is a standing test of whether the vocabulary favours its author's other project.

## Status

**Version 0.1, in development.** Nothing has been published yet.

This project is measured on the same six-level scale it asks of everyone else, and the scale is scored **separately for each kind of claim** — collapsing them into one number is the thing it warns against, so here they are apart:

| | Level | Meaning |
|---|---|---|
| Written down | **2 of 5** | Reproducible — public formats, test cases, tools that run |
| Built | **0 of 5** | Nothing operational |
| Checked by outsiders | **0 of 5** | Nobody independent has evaluated any of it |

Two of those three are zero. That is stated here rather than buried, because a registry that grades its own homework is worth nothing.

## License

- Code and formats — Apache-2.0 (`LICENSE`)
- Written specifications — CC BY 4.0 (`LICENSE-SPECS`)

Kinetic Trust Protocol © Chris Perkins (nmcitra).
