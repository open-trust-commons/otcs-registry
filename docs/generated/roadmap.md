!!! info "Generated page"
    Compiled from `ROADMAP.md + roadmap/status.yaml` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Roadmap

!!! note "Measured 2026-08-07, not asserted"
    Commons stage **C0 — Seed**.
    **1** qualifying active project(s) of 8 records ·
    **1** independent steward(s) · 0 project class(es).
    Computed from the live registry by `npm run roadmap:status` against the rules in
    `QUALIFYING-PROJECTS.md`. Records that fail are listed below with the reason.

### Records that do not qualify

| Record | Why not |
|---|---|
| `abt` | no canonical public artifact|
| `ex-gatekeeper` | record_state=example · owner not verified · no canonical public artifact · no evidence record · owner confirmation older than 12 months|
| `ex-ledgerline` | record_state=example · owner not verified · no canonical public artifact · no evidence record · owner confirmation older than 12 months|
| `ex-mendwell` | record_state=example · owner not verified · no canonical public artifact · no evidence record · owner confirmation older than 12 months|
| `ex-watchtower` | record_state=example · owner not verified · no canonical public artifact · no evidence record · owner confirmation older than 12 months|
| `ktp-demo` | no canonical public artifact|
| `lifecycle-fixture` | record_state=withdrawn · no canonical public artifact · no evidence record · withdrawn|

### Road to v1.0.0

Qualifying active projects **1 / 10** · independent stewards **1 / 7** · project classes **0 / 4**.

---

## What this is

A lot of people are building ways to control what automated software is allowed to do. They use different words for the same idea, and the same word for different ideas. So the work is hard to compare, easy to duplicate, and almost impossible to fit together.

This project is a public list of that work, written in one shared vocabulary. Each project describes itself. We keep the description, date it, and publish it. Anyone can then look at two projects and see where one stops and the other starts.

We do not rate anything. There are no scores, no rankings, and no badges. A listing here says a project described itself, not that it is any good.

---

## Where things stand today

**Version 0.1 is published.** Everything the project has written is in the repository, public, and runnable by anyone who clones it.

Two numbers describe this project and they are not the same number:

| | Now |
|---|---|
| **Version** — the technical and governance contract | **0.1** |
| **Stage** — how large and diverse the ecosystem is | **C0 Seed** · 1 qualifying project, 1 steward |

The second one is the honest one. **A registry with one project in it is a format, not a commons**, and only outside participation moves it ([COMMONS-STAGES.md](commons-stages.md)).

---

## There is no numbered plan between here and 1.0

An earlier version of this page listed nine steps, 0.1 through 0.9. **They were removed, because every file all nine of them rested on had already shipped at 0.1.** What was left in each step was not work — it was waiting for somebody outside the project to use a rule for the first time.

That is a real and important thing to wait for. **It is not a version number.** Adoption is what the Commons stages measure, and using version numbers for it meant the two axes were describing the same thing while claiming not to.

So:

- **Versions happen when something changes** — a schema, an interface, the governance contract. Not on a schedule ([VERSIONING.md](versioning.md) §1)
- **1.0 arrives when its criteria are met** — 22 of them, in `roadmap/releases/1.0.0.yaml`, each carrying a state and its evidence
- **Progress is measured, not asserted** — `npm run roadmap:status` computes it from the live registry

```bash
npm run roadmap:status     # what is actually true today
```

**The gate is not close.** 1.0 requires 10 qualifying projects and 7 independent stewards, sustained 90 days. There is currently 1 of each, and it is the founder's. No amount of writing moves that number — only other people do.

---

## What shipped at 0.1

The whole corpus, all at once. The table below is an inventory of the release, not a list of the only files in it.

A small number of projects described in the shared vocabulary, published so anyone could read them. Deliberately tiny — the point was to prove the format worked on real projects rather than invented ones.

| What | Files |
|---|---|
| The rules | [CHARTER.md](charter.md), [GOVERNANCE.md](governance.md), [VOTING.md](voting.md), [CODE_OF_CONDUCT.md](code-of-conduct.md) |
| What gets listed | [REGISTRY-POLICY.md](registry-policy.md), [EVIDENCE-MODEL.md](evidence-model.md), [QUALIFYING-PROJECTS.md](qualifying-projects.md) |
| What we refuse to do | [NON-GOALS.md](non-goals.md), [BADGE-AND-CLAIMS-POLICY.md](badge-and-claims-policy.md), [ACCEPTABLE-USE.md](acceptable-use.md) |
| The vocabulary | `docs/coordinate-system.md`, [LAYERS.md](layers.md) |
| Checkable formats | 12 files under `schemas/`, plus 3 under `schemas/wire/` |
| Handoff points | 10 files under `interfaces/` |
| The first entries | 7 under `registry/projects/` — 3 real, 4 written as examples |
| The tools | `npm run validate`, `npm test`, `npm run ledger:verify` |

Anyone who downloads this runs the same checks we do and gets the same answers.

## Version 1.0 — the first stable release

Three claims, and nothing more:

| Claim | What it means |
|---|---|
| **The vocabulary is settled** | If it changes after this, that comes with notice, a migration path, and a long period where both old and new descriptions work |
| **The list is worth reading** | Enough real projects, kept current by their owners, that it is useful rather than a demonstration |
| **Someone else can run it** | The instructions are written down and have been followed by a person who is not the founder |

---

## After 1.0

Same rule as before it: **versions happen when something changes.** There is no numbered plan here either.

One principle survives from the plan that used to sit in this space, because it was doing real work:

> **Maintenance is the first thing abandoned under pressure.** Reliability, tooling, security and documentation get their own releases rather than being fitted in around the work that shows.

Naming which release that will be, years ahead, was the part that could not be honoured.

---

## Moving from 1.x to 2.0

**Version 2 is one change: more than one registry, run by different people, that can still talk to each other.**

Today this is one list in one place — a single point of failure and a single point of control. Version 2 means several independent lists that can exchange entries, disagree about a project, and each keep their own version without one overwriting the other.

| Before starting | Why |
|---|---|
| **50 projects** listed and kept current by their owners | Below this, a federation solves a problem nobody has |
| **30 separate owners** | Fifty projects from five companies is not a commons |
| **8 kinds of project** | Not eight variations of one kind |
| **Held for 6 months** | A level, not a spike |
| **Someone else already runs a second copy** | Prove the format supports it before promising it does |
| **Most maintainers are not the founder** | And the project has survived a real disagreement about a listing |

The last two matter most. Everything above them is counting; those two are evidence the thing works without the person who started it.

---

## Moving from 2.x to 3.0

**Version 3 is a change in kind: from describing software to helping it work together while it runs.**

Up to here the record is documentation. Version 3 means the descriptions are precise enough that two systems built by different people can connect using them, and that connection can be tested rather than asserted.

| Before starting | Why |
|---|---|
| **100 projects** from **50 independent owners** | Scale enough that connecting them matters |
| **5 separate registries** run by 5 separate groups | Federation working in practice, not in principle |
| **3 independent implementations** of each connection point | Built by others, not three copies of ours |
| **3 complete working examples** end to end | Across teams that do not share a codebase |
| **3 published failures**, each with what was done about it | A record with no failures in it is not being kept honestly |

---

## Moving from 3.x to 4.0

**The goal, not a promise. No date attached.**

Public infrastructure: 250 projects, 100 owners, 10 independent registries, several countries and languages, and outside institutions relying on the record.

The real test is simpler than any of those numbers:

- No single host is necessary
- No single group of maintainers is necessary
- If this organisation stopped existing tomorrow, the record and the connections between projects would continue without it

If we get there, the last useful thing we can do is become unnecessary.
