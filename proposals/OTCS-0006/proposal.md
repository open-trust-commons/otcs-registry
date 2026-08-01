# OTCS-0006 — Project families: one project, several artifacts, honest counts

*Class: `model_revision` · Clock: 45–90 days · Earliest decision: 2026-09-14*

## Provenance

Two sources, converging.

**A design test.** A prospective subject with a constitution, a standard, a runtime engine, and predecessor concepts was walked through the registry shape as a dry run. Under the current schema those would become four or five registered projects — inflating every count the gates depend on — or one record that flattens the differences between a specification, an implementation, and a superseded idea.

**The registry's own first records.** `ktp`, `ktp-demo` and `abt` are a family already: one body of work, three records. QUALIFYING-PROJECTS.md §3 refuses to count several versions of one project separately — **but that rule exists only at the counting layer.** Nothing in a record states the family, so the counting rule works by maintainer judgement rather than by structure. The founder's own records are the first honest test case, which is the right place to make a structural change before any third party registers.

## The defect

The schema can say a project was *forked from*, *superseded by*, or *depends on* another. It cannot say:

- **This record is a component of that one** — a specification, an implementation, a runtime, a demo
- **These N records are one body of work** for counting purposes
- **This artifact is a predecessor concept** — incorporated, superseded, or still active inside the family

The consequences run in both directions. A project with many artifacts either inflates counts or flattens itself. And a reader cannot tell a standalone project from a component that only makes sense inside its family.

## What this proposal adds

### 1. The `family` block

```yaml
family:
  umbrella: <project-id>          # the family's primary record; self for the umbrella
  role: umbrella | component | predecessor
  component_kind: specification | implementation | runtime | demo |
                  dataset | evaluator | paper | other     # components only
  status_in_family: active | incorporated | superseded    # predecessors only
```

- **Absence means standalone.** No family block, no change to anything — the field is additive
- `umbrella` must reference a registered record whose own `family.role` is `umbrella`
- A component's lifecycle remains its own: a family member can be withdrawn, archived or disputed individually

### 2. The counting rule becomes structural

QUALIFYING-PROJECTS.md §1 gains one condition and §3 loses a judgement call:

> **A family counts as one qualifying project** — the umbrella, if it qualifies. Components and predecessors never count separately, whatever their individual states.

`roadmap:status` computes this from the `family` block rather than from anyone's opinion about which records are "really" one project.

### 3. What a family is not

- **Not a hierarchy of authority.** The umbrella does not govern its components; each record keeps its own ownership, verification and consent. A family is a counting and rendering structure, nothing more
- **Not a relationship replacement.** `IMPLEMENTS`, `SUPERSEDES`, `FORKS` still describe edges *between* families and standalone projects. The family block describes membership *within* one body of work
- **Not retroactively imposed.** OTCS never assigns a family to records it observes; family membership is declared by the owner or not at all

## Impact on existing records

`ktp` becomes the umbrella; `ktp-demo` declares `component / demo`; `abt` remains standalone (it is a distinct method, not a KTP component — and if that judgement is wrong, the dispute process is the right place to say so). The measured count does not change — 1 qualifying project before, 1 after — **which is the point: the structure now says what the count already assumed.**

## Alternatives considered

- **Sub-records inside one manifest.** Rejected: components have their own versions, artifacts and lifecycles; nesting them makes withdrawal and dispute of a single component unrepresentable
- **A `PART_OF` relationship type.** Rejected: relationships carry evidence states and counterparty confirmation machinery that is meaningless inside one body of work, and a relationship cannot carry the counting rule
- **Leave it to maintainer judgement.** Rejected: that is the current state, and it survives exactly until the first registrant with four artifacts and a disagreement about whether they are one project
