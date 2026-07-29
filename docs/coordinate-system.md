# The OTCS Coordinate System — Normative Semantics

*Version 0.1 · Status: EXPERIMENTAL · This document is normative: manifests claiming OTCS compatibility use these terms with these meanings. Machine form: `schemas/project-manifest.schema.json`.*

Projects will use the same words differently; this document exists so that manifests exchanging the same word are exchanging the same meaning. Every core term gets four things: what it **means**, what it does **not** mean, its **required fields** where it appears in records, and its **failure states**. Terms are marked **[N]** normative (validators enforce) or **[D]** descriptive (informative).

## 1. The coordinate vector

Every registered project carries `C(p) = ⟨Actor, Authority, Action, Environment, Function, Time, Maturity⟩`. Coordinates are **sets or weighted vectors, never single labels** — a project may govern several actor types, supply several functions. Omitting a coordinate means "does not address," not "addresses implicitly."

### 1.1 Actor **[N]**

**Means:** the kind of entity whose behavior the project governs or observes. Vocabulary: `human · ai_agent · model · service · organization · tool · delegated_subagent`, each weighted 0.0–1.0.
**Does not mean:** the project's users (that is `primary_users`), nor its maintainers.
**Failure states:** actor coordinates claimed but no governed_object consistent with them (validator warning).

### 1.2 Authority **[N]**

**Means:** what makes a governed action legitimate, per the project's model. Vocabulary: `identity · credential · role · capability · mandate · delegation · consent · contract · law · organizational_policy · situational_approval`.
**Does not mean:** that the project *verifies* every listed source — listing `mandate` claims the project reasons about mandate, at the maturity its claims carry. **A system that verifies identity but not mandate must not be represented as governing the full authority chain.**
**Distinctions the vocabulary enforces:** *identity* (who is acting) ≠ *credential* (a presented artifact) ≠ *mandate* (a currently-valid grant of purpose from a principal) ≠ *delegation* (a transfer of some authority, itself requiring provenance).

### 1.3 Action **[N]**

**Means:** the consequential verbs the project governs. Common vocabulary: `read · write · send · publish · execute · purchase · transfer · delete · delegate · impersonate · bind · commit · modify_policy · create_identity · revoke`. Domain-specific verbs are permitted and MUST map to a common verb (`maps_to` field).
**Does not mean:** everything the governed actor *can* do — only what the project's controls actually cover.

### 1.4 Environment **[N] — the primary coordinate**

**Means:** the changing conditions the project observes or constrains: `system_health · data_quality · identity_confidence · dependency_health · threat_pressure · ambiguity_load · repair_capacity · reversibility · financial_exposure · legal_context · human_availability · uncertainty · cumulative_trajectory · downstream_capacity`.
**Does not mean:** configuration (static), policy (an authority artifact), or the actor's own state alone. Environment is what the *world* can bear, not what the actor is permitted.
**Why primary:** most systems in this field have strong actor/authority coordinates and weak environmental coverage; the coordinate exists to make that visible, not to shame it.
**Failure states:** claiming `cumulative_trajectory` without a decaying accumulation mechanism in the declaration; claiming `uncertainty` while treating reduced observability as neutral or favorable (see §2.5 — uncertainty must be conservative).

### 1.5 Control function **[N]**

**Means:** what the project actually does, as capability weights: `sense · interpret · constrain · decide · enforce · record · repair`.
**Does not mean:** aspiration. `enforce` claimed above 0 requires a declared enforcement point.
**Reference profiles (informative):** observability platform ≈ sense+record high, decide/enforce low · policy engine ≈ interpret medium, decide high, enforce low unless bound to a gate · gateway ≈ enforce high, record medium · a full KTP runtime ≈ all seven.

### 1.6 Time **[N]**

**Means:** where in an action's life the project operates: `design · registration · before_action · initiation · during_action · commit_point · after_action · across_trajectory · repair_window`.
**Not to be confused with** the `repair` *function* (§1.5): `repair_window` is *when*, `repair` is *what the project can do*.
**Key distinction:** `before_action` (pre-authorization: the request is evaluated once) vs `during_action`/`across_trajectory` (runtime governance: authority is recomputed as conditions and accumulated path change). Claiming `across_trajectory` requires a declared trajectory mechanism, as with §1.4.

### 1.7 Evidence maturity **[N]**

`M ∈ {0..5}` per claim area, per EVIDENCE-MODEL.md §4. Scored separately for at least: `specification`, `implementation`, `independent_validation`. The registry preserves the split; a single collapsed number is non-conformant.

## 2. Core terms

### 2.1 identity **[N]**

**Means:** the durable answer to *who or what is acting*, with continuity over time. In trajectory-based models, identity includes the actor's history — the path traced, not only the label presented.
**Does not mean:** a credential. Possession of a valid credential is evidence *toward* identity, never identity itself.
**Required fields when asserted in records:** subject, scope, verification method, confidence, freshness.
**Failure states:** credential-identity conflation; identity asserted with stale verification; identity continuity claimed across a substitution event.

### 2.2 authority **[N]**

**Means:** the current, scoped legitimacy of a specific action by a specific actor — derived from one or more authority sources (§1.2), each with provenance.
**Does not mean:** permission granted once in the past. Authority is evaluated at use, and can be narrower than any credential held.
**Required fields:** source(s), scope, grantor, valid_from/until, revocation path.
**Failure states:** authority outliving its mandate; scope creep across delegation hops; unrevocable grants.

### 2.3 mandate **[N]**

**Means:** a currently-valid grant of *purpose* from a principal: what the actor is *for*, now.
**Does not mean:** role membership, or a token's scopes. A mandate can expire, be narrowed, or be withdrawn while every credential remains technically valid.
**Required fields:** principal, purpose, scope, freshness/reaffirmation, withdrawal path.
**Failure states:** mandate freshness unbounded ("approved once, live forever"); purpose drift unmeasured.

### 2.4 environment **[N]**

**Means:** the aggregate current condition of the world an action lands in — what it can support, in the §1.4 dimensions.
**Does not mean:** the actor's context alone; a static deployment descriptor.
**Required fields when supplied as a signal:** per the signal wire format (value, confidence, freshness, source, scope — `interfaces/` P4).
**Failure states:** self-attested environment treated as high-confidence; blind spots treated as neutral.

### 2.5 trust **[N]**

**Means (in OTCS records):** a *bounded* claim: ⟨subject, action, environment, evidence, scope, duration, consequence⟩ — never a property of a project as a whole. Where a numeric score is exchanged, it is a **supportable-capacity estimate carried as a band** (a value with confidence), and consumers MUST read it conservatively: decisions consume the band's lower bound, and reduced observability lowers — never raises — the consumable value.
**Does not mean:** reputation, popularity, endorsement, or an unbounded adjective ("trustworthy").
**Failure states:** unbounded trust claims in manifests (validator rejection); a score whose consumable value increases as observability falls (non-conformant by definition).

### 2.6 decision **[N]**

**Means:** the outcome of evaluating a proposed action against authority and environment. Standard outcomes: **`ALLOW` · `SHAPE` · `DEAUTOMATE` · `VETO`**.
- `ALLOW` — proceed without added resistance.
- `SHAPE` — proceed under constraint: added latency, reduced rate, narrowed scope, or evidence requirements, with resistance non-decreasing as demand approaches what the environment supports.
- `DEAUTOMATE` — remove automation from the path: the action returns to human deliberation or supervisory control. Not a denial; a change of operator.
- `VETO` — the action does not execute. A system MAY implement containment without surfacing an adaptable error to the governed actor.
**Does not mean:** a boolean. Systems emitting only allow/deny declare only those outcomes — mapping deny→VETO is conformant; claiming SHAPE or DEAUTOMATE without the mechanism is not.
**Required fields:** per the decision wire format (P4): outcome, action reference, constraints, reasons, environment snapshot, authority reference, expiry, receipt requirements.

### 2.7 receipt **[N]**

**Means:** the evidentiary record that a decision was enforced and what happened: actor, action, target, timestamp, result, state before/after, enforcement point, evidence hashes, exceptions.
**Does not mean:** a log line. A receipt is referenced, hash-linked evidence sufficient to reconstruct the decision after the fact.
**Failure states:** receipts editable in place; receipts issued by the governed actor about itself with no external anchor.

### 2.8 enforcement **[N]**

**Means:** the property that a decision is *effective* — the governed action cannot proceed except as decided, at a declared enforcement point.
**Does not mean:** advice, alerting, or post-hoc review. A project whose decisions can be ignored by the governed system scores `decide`, not `enforce`.
**Failure states:** bypassable enforcement points; enforcement claims without a declared point; fail-open defaults undeclared.

### 2.9 repair **[N]**

**Means:** restoring environmental capacity after damage or degradation: incident response, reconciliation, rollback, uncertainty-resolution, human review queues.
**Does not mean:** retry logic.
**Failure states:** repair capacity claimed but unmeasured; repair queues that only accumulate.

### 2.10 intent **[D]**

**Means (descriptive):** the purpose behind an action or trajectory. OTCS records do not require intent attribution; coordinate mapping is deliberately built on *observable* actions, authority, and environment, because intent can be decomposed across many individually-innocuous steps and actors. Where projects claim intent detection, the claim carries its own evidence state like any other.

## 3. Interpretation rules for validators

1. **Absence is honest.** A missing coordinate or term means "not addressed." Validators MUST NOT default-fill.
2. **Claims bind to vocabulary.** Unknown coordinate values fail validation; domain verbs without `maps_to` fail validation.
3. **Consistency checks (warnings, not rejections):** `enforce > 0` without enforcement point · `across_trajectory`/`cumulative_trajectory` without a trajectory mechanism · `M ≥ 4` on any claim whose evidence state is below `INDEPENDENTLY_TESTED` (this one **rejects**: the maturity scale and evidence states may not contradict).
4. **The conservative-uncertainty rule (§2.5) is definitional.** A manifest describing a trust signal whose consumable value rises when observability falls is rejected, not warned.

## 4. Relationship to KTP

The coordinate system adopts KTP's action model: a proposed action `⟨actor, authority, verb, object, context, intended trajectory⟩` evaluated as `A(t) ≤ E(t)` — the action's autonomy demand held within what the environment supports — with the four standard outcomes. OTCS does not require any participant to adopt one implementation of the evaluation; it standardizes the coordinates and interfaces by which competing implementations declare what signals they use, how fresh they are, what uncertainty remains, what decision they emit, and where it is enforced. KTP's own specifications are registered and scored like any other project's (CHARTER.md §6).
