# OTCS-0003 — Split the coordinate vector into three layers

**Class:** `model_revision` · **Phase:** DRAFT · **Clock start:** 2026-07-27
**Clock:** 45 days minimum (GOVERNANCE.md §3, model revision 45–90) — **earliest ratification 2026-09-10**
**Doctrine:** `LAYERS.md` (published 2026-07-27, explicitly marked unratified)

## Motivation — a question about repair, and what it exposed

The question was narrow: is repair a coordinate? Testing it produced a wider answer.

Six coordinates describe **the situation being governed** — who acts, under what authority, doing what, under what conditions, when in the action's life, and what can be proven. One coordinate, `Control function`, describes something categorically different: **what the governing project itself does.**

The vector has carried two subjects in one list since the very first record. Every record answers two unrelated questions in the same structure, and there is no place at all for a third question that projects disagree about more than either: **what is this project trying to preserve?**

Per CHARTER.md §9, the v0.1 model expects revisions of this kind. This is the first one large enough to exercise the process.

---

## Revision 1 — Three layers replace one vector

**Layer 1 — Coordinates (what is?)** — descriptive; says nothing about what should happen.

`Actor` · `Authority` · `Action` · `Environment` · `Time` · `Evidence`

**Layer 2 — Governance Intent (what should happen?)** — the project's normative model.

**Layer 3 — Functions (how?)** — operational capability.

`Observe` · `Interpret` · `Coordinate` · `Decide` · `Constrain` · `Enforce` · `Record` · `Repair` · `Learn`

The justification rests on one claim and deliberately not on another. **Coordinates are decision inputs; functions are system work.** The available alternative — that coordinates must be universal and repair is conditional — is rejected in `LAYERS.md`, because `Environment` fails that same test and does so by design. Reviewers should attack the first claim; the second is already withdrawn.

## Revision 2 — `verbs` becomes `Action`; `Maturity` becomes `Evidence`

Two naming fixes that also close an existing divergence: the normative document (`docs/coordinate-system.md` §1.3, §1.7) already says *Action* and *Evidence maturity*, while the schema says `verbs` and the teaching surface says *Maturity*. The three surfaces have disagreed since the vocabulary was first written down. Values are unchanged in both cases.

## Revision 3 — Layer 2 is declared, never enumerated

A project states its governance intent **in its own words**. There is no controlled vocabulary, no permitted-value list, and no tag scheme that resolves to one. Examples such as safety, privacy, mission, legitimacy, fairness, compliance, resilience, human oversight, and environmental sustainability are illustrative and MUST NOT become an enum.

**Normative constraints.** Layer 2 content MUST NOT be counted, scored, ranked, compared across projects, used as a filter or facet, or rendered as a filled-versus-unfilled grid. A project declaring one intent is not behind a project declaring six.

**Rationale.** A fixed list of normative goods becomes a count; a count becomes a score; a score becomes a ranking. That is the rating system removed before the first release returning through a side entrance, and it would arrive attached to the most contestable claims in the registry.

**Attribution.** The normative layer is not OTCS's own contribution. The distinction between what an environment *can* support and what *should* be permitted comes from **Tamed Autonomy** (Robin Martherus). OTCS adopts it and says so.

## Revision 4 — No control-decision coordinate

An axis whose permitted values are `ALLOW` / `SHAPE` / `DEAUTOMATE` / `VETO` is **explicitly rejected** and this proposal records the rejection so it need not be relitigated.

Those four are KTP's output vocabulary. An axis named for one framework's answers is that framework advertising with a schema around it, and a project using a different decision vocabulary would score empty on it. Layer 3's `Decide` · `Constrain` · `Enforce` describe the same work without borrowing anyone's conclusions. A project emitting the four declares them inside its own record.

This is the discipline `CALIBRATION.md` exists to test, applied in advance.

## Revision 5 — Token collisions in the coordinate vocabulary (already applied)

Two tokens carried two meanings each. **Both were corrected on 2026-07-27 ahead of this proposal**, as defect repairs rather than model changes, and are recorded here for completeness:

| Old | New | Collision |
|---|---|---|
| `time: repair` | `time: repair_window` | collided with the `repair` **function** — the phase versus the capability |
| `time: commit` | `time: commit_point` | collided with the `commit` **verb** — the moment versus the act |

A validator could not distinguish either pair, and neither could a reader. Zero collisions remain across the vocabulary; a check enforces this.

---

## Compatibility mapping (old term → new term)

| v0.0.x | v0.1+ | Kind |
|---|---|---|
| `coordinates.verbs` | `coordinates.action` | rename, values unchanged |
| `coordinates.custom_verbs` | `coordinates.custom_action` | rename |
| `coordinates.functions` | **`functions`** (Layer 3, outside coordinates) | **relocation** |
| `Maturity` (teaching surface) | `Evidence` | rename, `M ∈ {0..5}` unchanged |
| function `sense` | function `Observe` | rename |
| function `interpret` · `decide` · `constrain` · `enforce` · `record` · `repair` | unchanged | — |
| — | functions `Coordinate`, `Learn` | **new** |
| — | **Layer 2** | **new**, optional at introduction |

**No function is removed.** `Constrain` was proposed for removal during drafting and restored: a project whose entire function is narrowing what an action may be would otherwise have to declare itself `decide` or `enforce`, both of which overstate what it does. Overstatement is the failure this registry exists to prevent, and the migration must not force any record into it.

## Impact analysis — which existing records change meaning

Seven records. **No record changes what it asserts**; every change is a relocation or a rename with an exact target.

| Record | Effect |
|---|---|
| `ktp` | `verbs` → `action`; `functions` relocates to Layer 3. Meaning unchanged. |
| `ktp-demo`, `abt` | same relocation and rename. Meaning unchanged. |
| `ex-gatekeeper`, `ex-watchtower`, `ex-ledgerline` | same. `ex-gatekeeper` already migrated for Revision 5. |
| `ex-mendwell` | same. Carried both colliding `repair` tokens; already migrated for Revision 5. |
| **all seven** | Layer 2 arrives **empty**. It is optional at introduction and MUST NOT be treated as an incomplete record. |

**Breaking for consumers, not for meaning.** Any tool reading `coordinates.functions` or `coordinates.verbs` breaks at the path level. There are no known external consumers; if any exist by ratification, the deprecation window below applies to them.

## Deprecation of displaced semantics

Per GOVERNANCE.md §11, a long deprecation period for displaced semantics:

1. **Ratification → +6 months:** validators accept the old paths, emit a deprecation **warning**, and map them to the new locations automatically. Both shapes validate.
2. **+6 months → +12 months:** old paths emit an **error** but a documented one-command migration is published and supported.
3. **+12 months:** old paths are removed.

Layer 2 is exempt from all deadlines. It is optional indefinitely and a permanently empty Layer 2 is a valid, complete record.

## Trial requirement

Before RATIFICATION:

1. **All seven records migrated** on a branch, with `npm run validate`, `npm test`, and the golden-file reproduction green, and a diff showing no record's assertions changed.
2. **Two adversarial mappings** exercising the split against systems OTCS did not design for: **Bitcoin** (near-zero Environment, no trajectory, minimal Layer 3, and — critically — Layer 2 must be expressible for a system that never stated an intent) and one **external architecture with heavy Layer 3 coverage and thin Evidence**. Recorded in `CALIBRATION.md`.
3. **The neutrality check re-run.** If the three-layer model makes either mapping look deficient where the single vector did not, the revision is wrong and does not proceed.

## Open questions for reviewers

1. Is "decision inputs versus system work" the right cut, or is there a coordinate that belongs on neither side?
2. Does `Coordinate` (Layer 3) overlap `Action`? One is the project exchanging state with peers; the other is the governed verb. The names collide even though the referents do not.
3. Is 45 days sufficient for the most consequential change class, or should this take the full 90? **This bears on launch sequencing** — see below.
4. Should Layer 2 permit *optional* non-exhaustive tags for search, or does any tag vocabulary become an enum in practice? The proposal currently says no tags.

## Note on sequencing — a decision the author cannot make alone

The clock puts earliest ratification at **2026-09-10**, and v0.1.0 is not yet released. Three options, none free:

- **Launch first on the old model** — the founding cohort registers, then re-maps within weeks. A poor first experience for exactly the people the registry most needs, and it contradicts the claim that records are taken seriously.
- **Hold v0.1.0 until ratification** — launch slips at least six weeks.
- **Take the full 90 days** — launch slips to late October.

The clock is a floor and 45 days is defensible for this class. The reason to prefer the floor here is **not** that no external participants exist to object — "nobody is here, so we can move faster" is precisely how a commons becomes one person's project. The reason is that the alternative is worse: launching on a model already known to be changing.

Recorded in `FOR-CHRIS.md`. This is a sequencing decision, not a technical one.
