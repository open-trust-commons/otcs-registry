!!! info "Generated page"
    Compiled from `ROADMAP.md + roadmap/status.yaml` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Roadmap

!!! note "Measured 2026-07-29, not asserted"
    Commons stage **C0 — Seed**.
    **1** qualifying active project(s) of 7 records ·
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

### Road to v1.0.0

Qualifying active projects **1 / 10** · independent stewards **1 / 7** · project classes **0 / 4**.

---

## What this is

A lot of people are building ways to control what automated software is allowed to do. They use different words for the same idea, and the same word for different ideas. So the work is hard to compare, easy to duplicate, and almost impossible to fit together.

This project is a public list of that work, written in one shared vocabulary. Each project describes itself. We keep the description, date it, and publish it. Anyone can then look at two projects and see where one stops and the other starts.

We do not rate anything. There are no scores, no rankings, and no badges. A listing here says a project described itself, not that it is any good.

---

## Where things stand today

Nothing below version 0.1 has been released publicly yet. Versions 0.1 through 0.9 are written in the past tense on purpose: they are the steps to the first stable release, and by the time anyone reads this alongside version 1.0, that is the order they happened in. Until then, treat them as the plan.

*(Delete this section once 1.0 ships.)*

---

## Getting to the first stable release

Nine steps, each adding one capability.

Most of the written rules shipped at 0.1, all at once. The steps after it are not new documents appearing — they are each rule being **used for the first time by someone outside the project**. A rule nobody has followed yet is a draft, whatever file it lives in.

Each step lists the files it rests on. They are filenames now, and become links once the repository is public.

### 0.1 — The first public listing

A small number of projects, described in the shared vocabulary, published so anyone could read them. Deliberately tiny — the point was to prove the format worked on real projects rather than invented ones.

| What | Files |
|---|---|
| The rules | [CHARTER.md](charter.md), [GOVERNANCE.md](governance.md), [VOTING.md](voting.md), [CODE_OF_CONDUCT.md](code-of-conduct.md) |
| What gets listed | [REGISTRY-POLICY.md](registry-policy.md), [EVIDENCE-MODEL.md](evidence-model.md), [QUALIFYING-PROJECTS.md](qualifying-projects.md) |
| What we refuse to do | [NON-GOALS.md](non-goals.md), [BADGE-AND-CLAIMS-POLICY.md](badge-and-claims-policy.md), [ACCEPTABLE-USE.md](acceptable-use.md) |
| The vocabulary | `docs/coordinate-system.md`, [LAYERS.md](layers.md) |
| Checkable formats | 9 files under `schemas/`, plus 3 under `schemas/wire/` |
| Handoff points | 10 files under `interfaces/` |
| The first entries | 7 under `registry/projects/` — 3 real, 4 written as examples |
| The tools | `npm run validate`, `npm test`, `npm run ledger:verify` |

Anyone who downloads this runs the same checks we do and gets the same answers.

### 0.2 — Anyone can submit

Until this point, entries were added by hand. From here, the owner of a project submits their own description and corrects it later.

- **Rests on** — [PARTICIPATION.md](participation.md), [OWNER-VERIFICATION.md](owner-verification.md), [OWNER-RESPONSE-POLICY.md](owner-response-policy.md), the forms in `.github/ISSUE_TEMPLATE/`
- First time someone outside the project got listed without us doing it for them
- A refusal leaves a trace, the same as an agreement

### 0.3 — Keeping track of changes

Projects change. Every entry now carries a full history: who changed what, when, and what it said before.

- **Rests on** — [PROJECT-LIFECYCLE.md](project-lifecycle.md), `governance-log/events.jsonl`, `src/ledger.ts`
- Nothing gets quietly rewritten
- Run `npm run ledger:verify` against a copy to check the history has not been tampered with

### 0.4 — Describing how projects connect

A project can say which parts of the job it hands off and which it picks up.

- **Rests on** — `schemas/relationship.schema.json`, the 10 files under `interfaces/`
- Both sides have to agree before a connection counts as mutual
- One project claiming a partnership is a claim, not a connection

### 0.5 — Describing when a project acts

Some tools check a request once, before it runs. Others keep watching while it runs and can stop it partway.

- **Rests on** — the `time` section of `schemas/project-manifest.schema.json`
- A project claiming to watch continuously has to say how
- The word on its own is not evidence

### 0.6 — Seeing the whole picture at once

The first view showing many projects together rather than one at a time, so the gaps between them become visible.

- **Rests on** — `src/generate.ts`, `computed/graph.json`, `computed/matrix.json`, [ALGORITHM-REGISTRY.md](algorithm-registry.md)
- Every view states what it leaves out
- A summary that hides its own edits is misleading

### 0.7 — Trying it in one field

Everything above is general. This tested whether the vocabulary survives contact with one specific industry, with its own regulators and its own words for things.

- **Rests on** — `profiles/README.md`, `profiles/financial-crime/`, `schemas/domain-profile.schema.json`
- The first profile covers fraud and financial-crime controls: 13 terms mapped, **6 did not**
- Published alongside an honest account of what the general vocabulary could not express
- **Still open** — no practitioner in that field has reviewed the crosswalk, and the profile says so on its first line

### 0.8 — Making the record durable

Backups, copies hosted in more than one place, and a way to prove an entry has not been altered since it was written.

- **Rests on** — [HOSTING-AND-MIRRORS.md](hosting-and-mirrors.md), [SYNC-POLICY.md](sync-policy.md), [INCIDENT-RESPONSE.md](incident-response.md), [BITCOIN-ANCHORING.md](bitcoin-anchoring.md), `src/anchor.ts`
- The timestamp comes from outside, so the proof does not depend on trusting us
- A public record nobody can verify is just a website

### 0.9 — Nothing new

A deliberate pause. No features.

- **Rests on** — [VERSION-EXIT-CRITERIA.md](version-exit-criteria.md), [RELEASE-PROCESS.md](release-process.md), [RUNBOOK.md](runbook.md)
- Fix what is broken, finish the documentation, rehearse the whole release from a clean machine

---

## Version 1.0 — the first stable release

Three claims, and nothing more:

| Claim | What it means |
|---|---|
| **The vocabulary is settled** | If it changes after this, that comes with notice, a migration path, and a long period where both old and new descriptions work |
| **The list is worth reading** | Enough real projects, kept current by their owners, that it is useful rather than a demonstration |
| **Someone else can run it** | The instructions are written down and have been followed by a person who is not the founder |

---

## After 1.0

Nine more steps, alternating on purpose.

- **Odd numbers are maintenance** — reliability, tooling, security, documentation. No new capability.
- **Even numbers add capability** — new information, new views, new ways to use the record.

Maintenance is the first thing abandoned under pressure, so it gets its own numbers instead of being fitted in around the work that shows.

| Version | Kind | What it does |
|---|---|---|
| **1.1** | maintenance | Fix what 1.0 got wrong — speed, reliability, and the bugs that only appear once real people use something |
| **1.2** | capability | Grow the list, and improve the entries already in it by asking their owners better questions |
| **1.3** | maintenance | Make submitting easier. The first version will be clumsy, and every hour of friction costs listings |
| **1.4** | capability | Collections and comparisons, so a reader can start from a question rather than a list |
| **1.5** | maintenance | Let people outside the project examine what is here and publish disagreements, as a supported process |
| **1.6** | capability | Profiles for specific fields, without splintering the shared vocabulary |
| **1.7** | maintenance | External security review, tested backups, and a rehearsed recovery from nothing |
| **1.8** | capability | Published analysis — what is well covered, what nobody is working on, what changed. Method attached |
| **1.9** | maintenance | Hand it over. Not a document saying it is possible; a handover someone actually performs |

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
