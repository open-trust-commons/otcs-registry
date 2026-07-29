!!! info "Generated page"
    Compiled from `CHANGELOG.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/). Versioning: VERSIONING.md.

> **Read this first.** The public version arc is **0.1 → 0.9 → 1.0** ([ROADMAP.md](roadmap.md)). **`v0.1.0` is the first public release.**
>
> Everything tagged `v0.0.x` below is **internal incubation history**. Those tags exist only in the private staging repository and **are deliberately not pushed to the public repository** — the public history starts at `v0.1.0`, cut fresh. Nothing under `v0.1.0` was ever published, so nothing under `v0.1.0` can have broken anyone's records — see [MIGRATIONS.md](migrations.md) §2.

## [Unreleased] — v0.1.0 First public release

Everything in the incubation sections below ships as one release. The entries are kept separate because they record what was decided when, and collapsing them would erase the order the reasoning arrived in.

### Added
- **`CALIBRATION.md`** — Bitcoin as a permanent, checkable test of whether the seven coordinates *describe* the field or *advocate* for KTP. Bitcoin predates KTP, is maximally successful and maximally documented, and sits at an extreme corner of the coordinate space: authority with **no identity**, `time: [commit]` with **no trajectory**, and **near-zero environment** — KTP's own primary coordinate. Four of five calibration tests pass; the fifth is a genuine finding, recorded rather than patched.
- **`src/anchor.ts`** + `npm run anchor` / `anchor:stamp` / `anchor:verify` / `anchor:status` — OpenTimestamps anchoring. A round writes one **immutable manifest** committing the ledger, the registry tree digest, the measured status, and `SHA256SUMS.hash`, then stamps that manifest. Stamping the manifest rather than the artifacts is deliberate: the ledger grows, so a proof bound to its bytes would be void by the next event.
- `EVIDENCE_ANCHORED` governance-event type with `anchor_id` / `covers_through_event` / `anchor_status`, schema-conditioned so **only** an anchor event may carry them — a decision record cannot describe itself as anchored.
- Anchoring wired into `RELEASE-PROCESS.md` (after hashing, before archiving) and `release.yml` (`continue-on-error`).
### Changed
- **Two `time` coordinate values renamed: `commit` → `commit_point`, `repair` → `repair_window`.** Each token was a value of two coordinates at once — `commit` in both `time` and `verbs`, `repair` in both `time` and `functions` — so a validator could not distinguish the senses and neither could a reader. `verbs` and `functions` are unchanged. This lands **inside the first public release**, so no published record is affected; it is recorded in [MIGRATIONS.md](migrations.md) §2 anyway, because it is the only substantive change of meaning in the whole incubation history and a reader comparing an incubation artifact against `v0.1.0` needs to find it.

### Notes
- **The finding calibration produced:** ownerless projects break assumptions the schema makes quietly. `freshness.next_owner_confirmation`, `ownership.verification`, and the QAP 12-month rule all presume a party who can attest; Bitcoin has none and never will, and neither will abandoned specifications or standards whose issuing body does not participate. Such projects can currently only ever be `observed` and can never become QAPs. Defensible, but nobody decided it — it fell out of the schema. Queued as a model-revision candidate, not silently patched.
- **Bitcoin is not a registry record and is not a registered project.** `observed` records are gated to v2.2 behind right-of-response processes, and a calibration analysis of a project that cannot answer back is exactly what those safeguards are for. It ships as prose.
- The anchor round runs with **no OpenTimestamps client installed**: two manifests exist, both `ANCHOR_PENDING`, digests fixed and stampable later. `ANCHOR_PENDING` must never be described as anchored.
- OTCS holds no cryptocurrency, solicits none, and endorses no asset.

---

# Incubation — internal tags, never published

Everything below was tagged in the private staging repository. **None of it was released.** It is kept as the reasoning record — what was decided, and when — not as a release history anyone could have depended on.

## [v0.0.9] — Release Gates & Commons Stages
### Added
- **Two-dimensional model**: version (technical contract) + Commons stage (ecosystem maturity), always published together
- `COMMONS-STAGES.md` — C0 Seed → C6 Public Infrastructure, with **sustaining criteria** (80% threshold, AT RISK status, versions never rolled back)
- `QUALIFYING-PROJECTS.md` — the **QAP** rule; independent stewards counted by disclosed affiliation so one org cannot trigger a major version alone
- `RELEASE-GOVERNANCE.md` — releases decided by **KTP's own vocabulary** (ALLOW/SHAPE/DEAUTOMATE/VETO); a majority may not override a veto without repairing the environment; automation recommends but **cannot publish a major release**; criteria freeze at first RC
- `VERSION-EXIT-CRITERIA.md` · `DEPRECATION.md` · `ROADMAP-CHANGES.md`
- `roadmap/stages.yaml`, `roadmap/releases/{1,2,3,4}.0.0.yaml` — machine-readable gates with `state` + `evidence` per criterion
- **`npm run roadmap:status`** — computes QAP count, steward count, Commons stage, and gate progress **from the live registry**, writing `roadmap/status.yaml`. The dashboard is a measurement, not a claim.
- Owner verification, freshness, and consent blocks completed on the three registered records
- ROADMAP.md rewritten around the locked major gates (v1@10 · v2@50 · v3@100 · v4@250) and mid-major markers (v1.5@25 · v2.5@75 · v3.5@150)
### Notes
- First measurement: **1 qualifying active project of 7 records** — `ktp-demo` and `abt` correctly fail on "no canonical public artifact" because they are not published. The counting rule caught the founder's own records first, which is the intended behavior.

## [v0.0.8] — The Analysis Plane
### Added
- `ANALYSIS-MODEL.md` — the analysis plane as a first-class subsystem: **five separated operations** (aggregation · normalization · analysis · synthesis · **adjudication, human-only**), four scales, eight lenses, the three-column baseline, status vocabulary, freshness/supersession, exploratory-vs-published, methodology policy
- `AI-REVIEW-PROTOCOL.md` — eight passes with **coordinate mapping deliberately after the neutral pass**; the anti-convergence gate (eight questions; six ascending relationship states)
- `ANALYST-DISCLOSURE.md` · `OWNER-RESPONSE-POLICY.md` (**an owner's response stays visible even when OTCS does not adopt it**) · `MINORITY-REPORTS.md` · `ALGORITHM-REGISTRY.md`
- `schemas/analysis.schema.json` + fixtures — **the gate is schema-enforced**: any finding above `FUNCTIONAL_OVERLAP` requires a `skeptical_review`, so "both use the word continuity, therefore derivation" fails validation
- `analysis/` `reviews/` `compiled/` skeletons with their READMEs
- Roadmap gains the parallel **analysis track** (A0.1 → A1.0)
### Notes
- The thinner named documents (ANALYSIS-STATUS, ANALYSIS-FRESHNESS, METHODOLOGY-POLICY) were folded into ANALYSIS-MODEL.md as sections rather than fragmenting one subsystem across five files.

## [v0.0.7] — Project-Location Neutrality
### Added
- `PARTICIPATION.md` — **four modes** (GitHub-native · other Git · no repository · private/commercial); the participation contract; what is never required; the project-owner bill of rights
- `OWNER-VERIFICATION.md` (seven named methods, no generic "verified" badge) · `SYNC-POLICY.md` (PRs first; remote manifest is a proposal source, never write access; last-known-good) · `HOSTING-AND-MIRRORS.md` · `BADGE-AND-CLAIMS-POLICY.md` (**no OTCS badge will ever be issued**) · `PROJECT-LIFECYCLE.md` (transfer, withdrawal, observed records, disappearance, collisions) · `FEDERATION.md`
- `docs/decisions/ADR-001-site-renderer.md` — MkDocs recorded as a **deferred** amendment, not a silent bolt-on
- Schema: participation/source mode, source status, ownership + verification method, ownership history, freshness + owner-confirmation staleness, withdrawal (history preservation constant true), disclosures (licenses/patents/funding/shared maintainers/AI), consent block, `project_type`, `lifecycle`, `canonical_artifact`, `non_claims`
### Changed
- Roadmap gains the owner journey (`v0.1.x`), gated observed records (`v0.2.1`), project-hosted manifest pilot (`v0.3.0`), renderer decision point (`v0.6.0`)

## [v0.0.6] — Institutional Immune System
### Added
- `IPR-POLICY.md` — patent disclosure required on interface proposals; **no interface reaches STABLE with an undisclosed patent position**
- `AI-USE.md` · `SAFETY.md` · `ACCEPTABLE-USE.md` · `ACCESSIBILITY.md` · `INCIDENT-RESPONSE.md` · `SUSTAINABILITY.md` · `PREMORTEM.md` · `IDENTIFIERS.md`
- CHARTER §11 neutrality toward KTP (registration ≠ endorsement; mappings are disputable) · §12 governance failure modes **including an explicit right to fork**
- GOVERNANCE §7 IPR gate · §13 external-review gate before v1.0.0 (must include a project that disagrees with KTP)
- EVIDENCE-MODEL §4b separating the evidence *coordinate* from evidence *maturity*
- NON-GOALS extended 12 → 20 (accreditation authority, court, patent registry, rating service, alliance-that-owns-members, required-KTP-program, safety proof, derivation proof)
- Schema: `withdrawn` record state · `urn`/`aliases`/`superseded_by`/`forked_from` · `localized_name` (i18n-permitting) · `mapping` block with `disputed` + verbatim project statement · `ipr_disclosure` required on interface-class proposals
- `tests/sanitization.test.ts` — stored-XSS, homoglyph, RTL-override, oversized-input resistance (4 tests)
### Changed — **deferral**
- **Numerical complementarity and overlap scores are no longer published.** Output is categorical bands (`HIGH_FUNCTIONAL_OVERLAP`, `DIFFERENT_CONTROL_FUNCTIONS`, `POSSIBLE_COMPLEMENT`, `INTERFACE_RELATIONSHIP_DECLARED`, `NO_IMPLEMENTATION_EVIDENCE`, `LEGAL_COMPATIBILITY_UNKNOWN`). A figure like "84% complementary" reads as objective evaluation while resting on incomplete self-description, subjective weights, and unstable semantics. Numerics retained under `_experimental` for internal sensitivity work; not rendered, not authoritative.

## [v0.0.5] — Tracking & Policy Layer
### Added
- `ROADMAP.md` — sequence to v1.0.0 with exit criteria per release and the v0.1.0 publication gate
- `VERSIONING.md`, `RELEASE-PROCESS.md`, `MIGRATIONS.md`, `CHANGELOG.md`
- `REGISTRY-POLICY.md`, `PRIVACY.md`, `TRADEMARKS.md`, `MAINTAINERS.md`, `DCO.md`, `CONTRIBUTING.md`
- `CITATION.cff`, `NOTICE`
- `docs/releases/TEMPLATE.md` — release-note template with a mandatory non-claims section
### Notes
- Milestones `v0.0.1`–`v0.0.4` tagged retroactively against the commits that delivered them.

## [v0.0.4] — Trust Atlas Preview
Deterministic static site: project pages, capability matrix, relationship graph, interfaces, proposals, governance renders, audience views, About with OTCS self-scored. Five process diagrams in deterministic HTML/CSS (no diagram runtime, no JS).

## [v0.0.3] — Registry Mechanics
Seed registry: `ktp`, `ktp-demo`, `abt` (honest maturity profiles, independent validation 0) + four watermarked fictional examples. Relationships with assertion status, claims with evidence states, stamped generators (graph, capability ladder, complementarity), OTCS-0000 and the clock-bound OTCS-0001.

## [v0.0.2] — Protocol Skeleton
Seven coordinates with normative semantics; ten schemas + twenty fixtures; validator with semantic rules; interface model and ten non-normative capability domains; hash-chained governance ledger with tamper tests.

## [v0.0.1] — Founding Record
Constitutional documents (charter, governance, voting, evidence model, security, communications, conduct, non-goals); Apache-2.0 + CC BY 4.0; the constitutional boundary among OTCS, KTP, and registered projects.
