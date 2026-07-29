# The three layers

*Version 0.1 · Status: **PROPOSED. Not ratified, not implemented.** See [where this stands](#where-this-stands).*

The vocabulary was carrying two different kinds of question in one list. It took a question about repair to make that visible.

---

## The problem

Six of the seven coordinates describe **the situation being governed** — who acts, under what authority, doing what, under what conditions, when in the action's life, and what can be proven.

One of them, control function, describes something else entirely: **what the governing project itself does.**

Those are different subjects. The first six are about the action. The seventh is about the system looking at the action. Folding them into one list made every project answer two unrelated questions in the same breath — and left no room for a third that matters more than either.

## The three layers

| | Layer | Asks | Character |
|---|---|---|---|
| **1** | Coordinates | What is? | Descriptive |
| **2** | Governance Intent | What should happen? | Normative |
| **3** | Functions | How? | Operational |

### Layer 1 — Coordinates

`Actor` · `Authority` · `Action` · `Environment` · `Time` · `Evidence`

These describe the situation, and **say nothing about whether it should happen.** A record filling all six has stated where a project operates and nothing whatsoever about whether the project is any good.

### Layer 2 — Governance Intent

What is the project trying to preserve? What principles determine success? Under what conditions should action proceed?

Layer 1 cannot answer this and never could. Coordinates can say a project evaluates authority against environment at commit time. They cannot say whether it is protecting safety, privacy, a mission, legitimacy, fairness, compliance, resilience, human oversight, or environmental sustainability — and **that difference is frequently the entire disagreement between two projects.**

**This layer is declared, never enumerated.** A project states its intent in its own words. No fixed list of permitted values, no controlled vocabulary, no tagging scheme that resolves to one. The examples above are illustrative and will never become an enum.

That constraint is the most important rule in this document:

> The moment a fixed list of normative goods exists, someone counts how many each project claims. A count becomes a score. A score becomes a ranking. And the rating system this project removed before its first release walks back in through a side entrance.

So nothing in Layer 2 is counted, scored, compared across projects, filtered on, or rendered as a filled-versus-unfilled grid. **A project declaring one intent is not behind a project declaring six.**

**Attribution.** The normative layer is not this project's work. It comes from **Tamed Autonomy** (Robin Martherus) — the body of work concerned with what an automated system *should* be permitted to do, as distinct from what its environment *can* support. This project adopts the distinction; it did not originate it.

### Layer 3 — Functions

`Observe` · `Interpret` · `Coordinate` · `Decide` · `Constrain` · `Enforce` · `Record` · `Repair` · `Learn`

The work a project actually performs. This is where projects differ operationally, and where the old control-function coordinate went.

**`Enforce` keeps its name and its test:** claiming enforce above zero requires declaring an enforcement point. If the governed system can ignore the decision, the project scores `decide`, not `enforce`.

That is the difference between a system that governs and a system that comments, and it survives this reorganisation unchanged — renaming it to anything softer would dissolve the only falsifiable claim on the axis.

**`Constrain` is in the list.** It was proposed for removal during drafting and restored: a project whose entire function is narrowing what an action may be would otherwise have to declare itself `Decide` or `Enforce`, and both overstate what it does. **No migration should force a record into an overstatement.**

## Why repair is a function, not a coordinate

Repair answers *now what?* It happens **after** the governance decision, not before it.

- The six coordinates describe the state a decision is made **from**
- Repair is work performed **downstream** of that decision — rollback, revoke, compensate, reconcile, restore, quarantine, hand off to a human, rescope, invalidate, rebuild

That is the whole argument, and it is the only one this rests on:

> **Coordinates are decision inputs. Functions are system work.**

### The argument deliberately not used

A weaker one was available: *coordinates should be universal, repair is conditional, therefore repair is not a coordinate.*

**It does not hold.** By that test `Environment` fails too — several successful systems address no environment at all, and do so on purpose.

The useful property is not that a coordinate is always *present* but that it is always *askable*. You can always ask what environment a system responds to and get "none" as a meaningful answer. The same is true of repair. **Universality does not separate them; subject matter does.**

## Why there is no control-decision coordinate

An obvious candidate for Layer 1 is the decision a system emits — allow, shape, deautomate, veto.

**It is deliberately absent.** Those four are KTP's output vocabulary, and a coordinate whose permitted values are one framework's answers is not a coordinate system. It is that framework advertising, with a schema wrapped around it. A project using different decision vocabulary would score empty on an axis named after somebody else's conclusions.

Layer 3's `Decide`, `Constrain` and `Enforce` describe the same work without borrowing anyone's answer. A project that emits allow/shape/deautomate/veto declares that as its own vocabulary inside its record, where it belongs.

This is the discipline [CALIBRATION.md](CALIBRATION.md) exists to test, applied before the fact rather than after.

## What the layers do together

Layer 1 and Layer 3 form a matrix, and **the empty cells are the diagnostic.**

| A project that… | …is saying |
|---|---|
| Reads `Environment` but has no `Repair` function | It can detect degradation and cannot act on it |
| Scores `Enforce` but addresses no `Time` beyond `commit_point` | It enforces once and never revisits |

Neither observation requires a score and neither ranks anything. Both simply state what the record says and what it does not.

**That is the expressive gain.** Not that three layers hold more information than one list — that separating the situation, the work, and the purpose makes their mismatches legible.

## Where this stands

**Not ratified. Not implemented.**

| | |
|---|---|
| The schema today | Control function inside the coordinate block, no Layer 2, older function vocabulary |
| Records today | Validate against that shape, and will until a revision ratifies |
| The route | **OTCS-0003**, a `model_revision` proposal opened 2026-07-27 |
| Earliest ratification | **2026-09-10** — a 45-day floor |

That route is deliberate. This is the first change large enough to genuinely exercise the proposal process, and **a coordinate system altered by its author without process would be a poor advertisement for a registry that asks everyone else to declare and be challenged.**

---

**See also:** [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) — what a claim's evidence level means · [CALIBRATION.md](CALIBRATION.md) — the standing test of whether this vocabulary is neutral · [GOVERNANCE.md](GOVERNANCE.md) §11 — how the vocabulary may be changed
