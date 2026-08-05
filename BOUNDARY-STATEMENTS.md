# Stating where your thing stops

*Version 0.1 · Status: EXPERIMENTAL · Executes the resolution of wayfinder issue #10; the builder-facing surface that consumes this is issue #11's subject.*

The smallest act this vocabulary supports is not registration. It is a **boundary statement**: a few lines of prose, in vocabulary terms, saying what your system does, where it stops, and what it does not claim. No schema, no submission, no entry anywhere. Producible in minutes from this page.

Stating a boundary and registering are **separate acts, kept separate on purpose** — nobody should be pulled into custody as a side effect of describing themselves. Nothing on this page funnels toward registration, and while OTCS-0004 (entry licensing) remains undecided — it cannot be decided before 2026-09-14 — the standing advice in [FAQ.md](FAQ.md) §13 applies: what is useful now is your comment, not your record.

A boundary statement earns nothing: no badge, no score, no place in any comparison ([NON-GOALS.md](NON-GOALS.md) §2, §5; [BADGE-AND-CLAIMS-POLICY.md](BADGE-AND-CLAIMS-POLICY.md)). It is a statement you publish on your own infrastructure, for your own readers, in a vocabulary that lets someone else's system say precisely where it hands off to yours.

---

## 1. The method

Take your system's stages, or its transitions — whichever it naturally has — and for each one ask: **which functions does this invoke?**

Three rules govern the mapping, and each one grants a permission:

- **Stage or transition → functions invoked.** One stage may invoke several functions; a transition may invoke one; the mapping is many-to-many, not a relabeling.
- **Zero-to-many.** A stage that invokes *no* function is a legitimate answer. Do not stretch a verb to cover it.
- **Unmapped is admissible.** A part of your architecture the vocabulary cannot express is a finding about the vocabulary, not a defect in your system. Say what would not map — that line is the most useful one in the statement (§4 is this project recording the same thing about itself).

**A perfect fit is suspect.** The calibration corpus has never produced one: every honest mapping so far has found at least one place where the vocabulary loses something the system's own terms preserve. A statement in which everything maps cleanly has usually stretched a verb or silently dropped the part that did not fit.

## 2. The template and a worked example — current vector

!!! warning "This section is written against the current coordinate vector"
    OTCS-0003 proposes splitting the vector into three layers (doctrine: [LAYERS.md](LAYERS.md)); it cannot be decided before 2026-09-10. Everything vector-shape-specific in this document is confined to this one section, so a ratified split re-expresses this section and nothing else. The boundary-statement concept, the enforce test, the stop-line, non-claims, and the triangulation rule (§3) are layer-independent and unaffected.

### 2a. The template

Five required lines, one optional. Terms carry the meanings in `docs/coordinate-system.md`.

```text
functions:   <function: weight, …>            # the enforce test applies — see below
time:        <where in the action's life you operate>
stop-line:   "<the sentence that says where your responsibility ends
              and someone else's begins>"
nearest calibration corner: <TCP | Bitcoin | STP> — <one line: what you
              share with it, and the first place you differ>
non-claims:  "<what your system does not do, and what of your design
              these coordinates do not represent>"
reference-profile (optional): <the §1.5 informative profile you are
              nearest to, if any>
```

- **The enforce test** is the hardest claim on the sheet and it is applied to every statement: `enforce` above zero requires a **declared enforcement point**. If the governed system can ignore your decision, you score `decide`, not `enforce`. This is the difference between a system that governs and a system that comments.
- **The time position** distinguishes one-shot pre-authorization (`before_action`) from runtime governance (`during_action`, `across_trajectory`) — the most common overclaim in the field is writing the second while building the first.
- **The stop-line** is the point of the exercise: one sentence naming the point past which enforcement, consequence, or repair is somebody else's. If you cannot write it, the boundary statement has found something.
- **The non-claims line is required, and it is a permission, not a confession.** Declared loss is the honest state (§4). An empty coordinate means "does not address," never "deficient."

### 2b. A worked example — synthetic

A fictional system, invented for this page: **a deployment-approval service** that evaluates release requests against policy and emits an approve/deny decision, which a separate CD pipeline consumes.

```text
functions:   interpret 0.6, decide 0.9, record 0.7, enforce 0
             (no enforcement point — the pipeline can deploy without us;
              we emit a decision, we cannot refuse the action)
time:        before_action, commit_point
stop-line:   "Downstream of our decision record, execution is not ours.
              If the pipeline ignores a deny, that is visible in our log
              and stoppable by nobody here."
nearest calibration corner: TCP — like TCP congestion control, our output
             is honored voluntarily; unlike TCP, the party that decides
             and the party that acts are different systems.
non-claims:  "Rollback, deploy execution, and runtime health are outside
              this system. Our internal approval workflow — who may
              approve, in what order — is not represented in these
              coordinates."
```

Note what the enforce test did: the system's authors would naturally have written `enforce 0.8` ("we block bad deploys"). The declared-enforcement-point question forced `enforce 0` and moved the real claim into `decide` — which is exactly the correction the calibration set found when the same test was run against TCP ([CALIBRATION.md](CALIBRATION.md) §3).

## 3. Triangulation — required, against the three disinterested corners

Every boundary statement carries one line comparing its placement against the calibration set ([CALIBRATION.md](CALIBRATION.md)): **TCP** (empty authority, environment is everything, no enforcement power) · **Bitcoin** (authority without identity, near-zero environment) · **STP** (elected authority, a real enforcement point).

The comparison is **placement-similarity, never product-similarity**. You are not saying your system resembles Bitcoin; you are saying your placement sits nearest that corner of the space, and naming the first coordinate where you differ. The set spans the extremes by construction, so every placement lands somewhere in the triangle — and answering forces the enforce test on every statement, because the corners differ most sharply there.

**Anchor eligibility.** Required anchors have **disinterested subjects**: no stake in OTCS, not authored or maintained by the founder, placement checkable against public documentation. KTP and ABT are therefore **excluded from the required set** while the declared conflict exists ([CHARTER.md](CHARTER.md) §6, §11; [NON-GOALS.md](NON-GOALS.md) §17). KTP remains available as an *optional* secondary anchor through the informative reference profiles in `docs/coordinate-system.md` §1.5, and registry entries become optional comparanda as they arrive. Candidate corners for expanding the required set (WebPKI, maker-checker, DNSSEC, Certificate Transparency) enter only as full calibration cases under [CALIBRATION.md](CALIBRATION.md) §2's fail-differently rule.

## 4. When the vocabulary cannot hold you — the five representation-limit findings

The permission in §1 — unmapped is admissible — is not a courtesy. It is what this project found when the vocabulary was run, hard, against a governed architecture it had never met. Five limits surfaced. They are published here as findings about **this project's vocabulary**, in the section that teaches declared loss, because a builder deciding what their non-claims line should say deserves to know where the instrument itself stops.

**Attribution.** The test architecture, the corrections that sharpened these findings through review, and the institutional-custody principle now in [CHARTER.md](CHARTER.md) §2a were supplied by **Richard Lynes, Founder & CTO, Genesis AiX**. His contribution is confined to exactly that; it is **not an endorsement of OTCS**, of this document, or of any interpretation beyond these five findings.

**Finding 1 — the vocabulary cannot express a governed lifecycle.** Functions are capability weights; time values are phases a project operates in. Neither composes into an ordered sequence of states with gates between them, so there is no way to say *stage N+1 cannot be entered until stage N has produced a basis*. A system whose architecture **is** a sequence maps as a bag of capabilities — the record comes out accurate about what it can do and silent about its design.

**Finding 2 — an evaluation is an object, a transition, and a state, and the vocabulary can hold none of the three.** A governed gate is evidenced by its own evaluation object with a purpose-scoped basis; it permits or refuses a transition; the result is a state that persists with its own expiry and revocation. OTCS has no first-class evaluation object, no ordered transitions (finding 1), and no object states — its time values describe when a *project* operates, not what state an *object* occupies. The rule this makes inexpressible is the one that separates governing from recording: **one evaluation cannot silently authorize another transition.**

**Finding 3 — authority records the type of authority, never which one, never versioned.** The authority coordinate can say a system relies on `consent`; it cannot say *this* consent record, *this* version, *this* hash. The generalizable principle supplied in review is the direct hit: *"Every governed object declares its authoritative dependencies by identifier, version, and basis hash."* The coordinate system can represent that such a binding exists, but not what it binds to. (The same gap, seen from the registry's own side, is why standing could not catch a superseded external artifact — the break the dependency-declaration work closes.)

**Finding 4 — admission-class governance acts have no verb.** The action vocabulary covers `read`, `write`, `bind`, `execute`, `commit` well. Acts that *admit* material into a governed space, place it under separate protection, or explicitly activate it have nothing: `modify_policy` is far too strong, `delegate` is a different act, and `commit` is a transactional verb — it means finalizing a change, not admitting something into custody. Three governance acts in a row, mid-lifecycle, invisible to the verb list.

**Finding 5 — negative rules prohibit inferences and transitions, not just claims.** `non_claims` lets a project say what it does not do — at project level. But the strongest negative rules in governed systems have the form *being X does not make you Y*: each forbids a specific inference and forecloses a specific transition. The vocabulary has no transition to attach such a rule to, so the registry can record that a project *claims* the property while remaining unable to represent the mechanism that makes it true — and recording the claim is not representing the mechanism.

These five are declared loss, worn openly, per the discipline in [CALIBRATION.md](CALIBRATION.md) §4: findings are published where they teach, never patched quietly. Whether any of them becomes a model revision is a proposal-process question, not this page's.

## 5. What a boundary statement is not

- **Not a registration**, not a step toward one, and not recorded anywhere by this project unless you later choose to register — a choice this page takes no position on.
- **Not scored, ranked, or compared.** No interface will ever render boundary statements side by side with better/worse coloring ([NON-GOALS.md](NON-GOALS.md) §2, §5, §15).
- **Not a conformance claim.** "My statement uses OTCS terms" asserts vocabulary use, not compatibility, quality, or safety ([NON-GOALS.md](NON-GOALS.md) §18).
- **Not homework owed to anyone.** The zero-to-many rule and the non-claims line exist so the statement can be finished by its author, alone, against public documents — the way this page's own examples were.

---

**See also:** [CALIBRATION.md](CALIBRATION.md) — the three corners and the fail-differently rule · [LAYERS.md](LAYERS.md) — the proposed three-layer split · [REGISTERING.md](REGISTERING.md) — the separate act, if you later want it · [FAQ.md](FAQ.md) §13–14 — why commenting beats registering today
