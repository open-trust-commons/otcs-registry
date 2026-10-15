# OTCS-0017 — Work Types: kinds of work, and what must be able to refuse them

**Class:** `model_revision` · **Phase:** DRAFT · **Clock start:** 2026-10-14 (restarted by Amendment 1; first published 2026-10-08)
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the shared vocabulary) — **earliest decision: see `proposals/CALENDAR.md`; the class floor 2026-11-28, not before 28 days after the deliberation window opens (OTCS-0013), and no earlier than OTCS-0010 and OTCS-0011** (this proposal uses their fields)

## The gap

A technology product is sold as an **offer**. An offer has a name and a sentence about what it can do. It sometimes lists the controls it aligns with, and says how much it does on its own. The registry can describe a **project** that governs actions. It cannot describe the **kind of work** an offer performs.

That gap has four effects:

- **Two offers with different names can be the same kind of work.** Nothing lets a reader see that.
- **One offer can hide several kinds of work.** "Assistant" or "automation" can cover reading, changing and fanning out at once.
- **Next year's name creates a new category** instead of being recognized as a known kind of work.
- **The offer says what the work does, and rarely what can stop it.** A platform capability is not an authorized capability, and an authorized capability is not an approved autonomous action. A license is not permission. Acting is not verifying. Empty evidence is unknown, not healthy.

## What this proposal adds

### 1. A work type

A **work type** is a durable description of a kind of consequential work (work that changes something). An offer is an **instance** of one or more work types.

Two records describe an instance, and this proposal keeps them apart. An **instance declaration** is what a registered project states about its offer, and it lives in the registry (§7). A **deployment record** is what a deploying party records about the work as it runs in one place, and it lives outside the registry (§7, §11). Every field in this proposal names which of the two it belongs to.

A work type is a **profile**. It is a name, plus the values it requires in fields OTCS already has or proposes (§3), plus a small set of fields that nothing else in OTCS carries (§4). It changes the meaning of no coordinate.

**A work type never describes work as allowed.** It describes **what must be able to refuse the work.** Whether the work is allowed is decided by the governance of whoever deploys it, at run time (`NON-GOALS.md` #9, #10).

The collection of work types is called **Work Types**.

### 2. Identity

Every work type has a stable identifier:

```text
otcs-work:<object>.<verb>
```

- `<object>` is an **object class** from the table below. It names a *kind* of object, never a particular object.
- `<verb>` names what is done to it, and **maps to a common Action verb** (`docs/coordinate-system.md` §1.3) through `maps_to`, exactly as domain verbs already do.
- Lowercase, with underscores between words. An identifier is never reused. A retired identifier follows `DEPRECATION.md`.

**Seed object classes.** A starting list, grouped for reading. The groups carry no meaning. New classes are added the same way as new work types (§6).

| Object class | Means | Does not mean |
|---|---|---|
| **People and identities** | | |
| `person` | a human being | any account, credential or record about them |
| `account` | a named identity a system recognizes | the person or workload behind it |
| `non_human_identity` | an identity a workload, service, job or bot acts under | the workload itself, an agent, or a human account |
| `credential` | a secret, token, key or certificate that proves an identity | the identity it proves |
| `session` | one period of authenticated activity, from start to end | the account, or the person |
| `entitlement` | a permission or role an identity holds | the identity, or the resource it applies to |
| **Systems** | | |
| `host` | a physical or virtual computer | the services running on it |
| `device` | an endpoint or network appliance | its owner, or the network it joins |
| `application` | software that delivers a function to users | one release of it |
| `service` | a running function others depend on | its host |
| `data_set` | a defined body of stored data | the system that stores it |
| `model` | a trained machine-learning model | an agent that uses it |
| `agent` | a deployed AI agent, as something acted on | the model inside it, its identities, or its output |
| `agent_context` | the information an agent is given, retrieves or remembers: instructions, retrieved documents, memory | the agent, or the model |
| `integration` | a connection that moves data or commands between systems | either system it connects |
| `configuration` | the settings that govern how a system behaves | the system, or a change ticket |
| `policy` | a written rule set that a system enforces | the authority that issued it |
| `release` | a versioned change to an application or service | a build artifact by itself |
| **Networks and observation** | | |
| `network_path` | a route that traffic actually takes between endpoints | the endpoints, or a diagram |
| `telemetry` | traces (including spans), metrics, logs and events as collected | the system emitting them |
| `journey` | a sequence of steps a user takes to reach one outcome | one user, or one page |
| `schedule` | a calendar of windows: maintenance windows, change freezes, on-call rotations, bookings | the work done inside a window |
| **Security work** | | |
| `detection` | a rule or model that finds a condition | a finding it produced |
| `finding` | one result a detection produced | the detection, or a confirmed incident |
| `vulnerability` | a known weakness in a system or component | an attack that used it |
| `case` | the record of one investigation | the systems it covers |
| `evidence_artifact` | an item collected for analysis | the conclusion drawn from it |
| `playbook` | a procedure written to be run | one run of it |
| **Goals** | | |
| `objective` | a goal stated to an agent | the agent, or a prompt |

### 3. Values a work type requires in existing fields

A work type states the values it requires in these fields. It adds no new meaning to any of them.

| What the work type requires | Field | Defined in |
|---|---|---|
| The kinds of actor allowed in each role | `Actor` coordinate, through the roles in §4 | `docs/coordinate-system.md` §1.1 |
| Sources of authority, including whether a **mandate** is required | `Authority` coordinate; the value `mandate` | §1.2, §2.3 |
| The consequential verbs | `Action` coordinate, with `maps_to` | §1.3 |
| Conditions the work depends on | `Environment` coordinate | §1.4 |
| Where in the action's life refusal can happen | `Time` coordinate | §1.6 |
| When authority began, how long it holds, how fresh its basis must be, who can end it, and what must stay true | `authority_validity` (`established_at`, `valid_until`, `freshness_requirement`, `revocation_source`, `continuation_conditions`) | OTCS-0010 §1 |
| **The longest the work may run unchecked**, as a ceiling | `reassessment.maximum_unobserved_interval` | OTCS-0010 §2 |
| What happens when the work cannot be confirmed as still allowed | `invalidation.uncertainty_behavior` | OTCS-0010 §3 |
| How strong each refusal point must be | `constructability` (MONITORED · REASSESSED · COMMIT_GATED · NON_CONSTRUCTABLE) | OTCS-0010 §4 |
| What the work's evidence must be able to cause | `evidence_efficacy` (EVIDENCE_ONLY · EVIDENCE_TO_DECISION · EVIDENCE_TO_ENFORCEMENT) | OTCS-0011 |
| The outcomes a refusal point must be able to produce | `decision_outputs` (ALLOW · SHAPE · DEAUTOMATE · VETO) | the manifest schema |

Where each required value is written: the roles in §4 carry Actor values; `maps_to` carries the Action verbs; each refusal point (§5) carries `constructability` and, in an instance declaration or a deployment record, `uncertainty_behavior`; the `requires:` block in §4 carries the rest.

A work type may set **no** ceiling on `maximum_unobserved_interval` only if it also requires a recorded acceptance of the risk by the deploying party's governance, with a date and a reviewer. OTCS never accepts the risk.

### 4. Fields only a work type carries

```yaml
work_type:
  id: otcs-work:<object>.<verb>
  label:                       # short, industry-general; never a product name
  maps_to: []                  # common Action verbs
  roles:                       # values from the Actor coordinate (§1.1) only
    configurator: []           # may set the work up
    executor: []               # may carry it out
    effect_verifier: human     # confirms the effect; never the executor; machine checks inform it, never hold it
    acceptor: [human]          # accepts this kind of work, can stop it, owns the residual risk
  mandate:
    required_before_fan_out: true | false
    fan_out: none | bounded | open
  consequence_ceiling: evidence_only | recommend | mutate | contain   # in increasing order
  observation_domain: []       # security | network | application; observation work only
  composed_of: []              # other work types this one contains
  refusal_points: []           # §5
  requires:                    # the required values from §3
    authority: []
    environment: []
    time: []
    authority_validity:
    maximum_unobserved_interval:
    evidence_efficacy:
    decision_outputs: []
  basis: single_description | independent_descriptions
```

**Roles.**

- Roles take values from the `Actor` coordinate only. Work Types adds no list of worker kinds.
- Here a **machine** is any `Actor` value other than `human` and `organization`.
- **The effect verifier is never the executor.** A system's confirmation of its own effect does not count.
- **The effect verifier is `human`.** Machine checks may inform the confirmation. They are inputs to the verifier's judgment, not holders of the role, and a confirmation made of machine checks alone is no confirmation.
- **A machine is an executor only.** It never holds the configurator, effect-verifier or acceptor role.
- **The acceptor is always `human`.** The acceptor accepts this kind of work, can stop it, and owns the residual risk. This is the party OTCS-0010's `revocation_source` points to.

**Mandate and fan-out.** When `required_before_fan_out` is true, a mandate is stated before any part of the work spreads to other actors. "Do what I meant" is not a mandate. No part of the work may exceed the mandate it was given.

**Fan-out.** `none`: the work does not spread to other actors. `bounded`: the spread has a limit, set by policy, by what the environment can hold, or by physics. A deployment record names which bound applies; an instance declaration may state the bound the offer supports. `open`: no limit is stated.

**Consequence ceiling.** The most the work may do, not what it usually does. The levels rise in this order: `evidence_only`, `recommend`, `mutate`, `contain`.

**Conditional fields.** `observation_domain` applies only to work that observes. `composed_of` may be empty. Every other field is set.

### 5. Refusal points

Refusal points appear at three levels:

- **In a work type, they are requirements:** what must be able to refuse the work, and how strong each point must be.
- **In an instance declaration, they are what the offer states about itself:** which points it supplies, and at what rung, as built.
- **In a deployment record, they are the actual points** that meet the requirements where the work runs.

Each point states:

```yaml
refusal_point:
  can_refuse: [scope | identity | path | consequence | mandate | continuation]   # continuation: the work going on once started
  constructability:            # work type: minimum rung · instance declaration: the rung the offer states, as built · deployment record: the rung in force; OTCS-0010 §4
  kind: gateway | identity_fabric | policy_engine | human_approver | runtime_hook   # instance declaration: what the offer supplies · deployment record: what is in place; identity_fabric: the systems that issue and check identities
  environment:                 # deployment record only; environments can contain environments
  uncertainty_behavior:        # instance declaration: the offer's posture as shipped · deployment record: the posture in force; OTCS-0010 §3
```

Rules:

1. **A work type with no refusal points is not part of Work Types.**
2. **If a deployment record does not state `uncertainty_behavior` for a point, a reader treats that point as giving no assurance** when it fails. OTCS-0010 §3 already holds that reduced observability may never argue for continuation. **An instance declaration that is silent on a field has not stated it,** and nothing more (`docs/coordinate-system.md` §3). Silence in the registry is absence, never a posture.
3. **The work type applies at every point that can refuse,** not only where the work starts. The same work type applies inside one organization, across organizations on one case, and across connected networks. The points change; the work type does not.
4. **No part of the work may weaken or remove a refusal point, or widen its own mandate.**

### 6. Rules for the collection

- **Completeness applies to work types only.** A work type sets every field that applies to it (§4). A project record, including its instance declarations, keeps the rule that absence is honest (`docs/coordinate-system.md` §3). What a deployment record must contain before the work is `authorized` is in §7.
- **Same or different.** A different object class or verb is always a different work type. Under one object class and verb, different refusal points or a different consequence ceiling means a different work type, and the same refusal points and ceiling under a new name means the same work type.
- **Not work types.** "Assistant", "copilot", "automation", "AI platform", "agentic workforce", "digital worker", "AI teammate" and "agent persona" are names for offers, not kinds of work. An offer under such a name is described as one or more work types.
- **Basis.** A new work type cites at least two independent descriptions that name no product (`basis: independent_descriptions`). With one, it is recorded as `basis: single_description`, and the record says so.
- **Adding and changing.** New work types are added in batches, each batch a proposal of this class (`model_revision`, changing the shared vocabulary). A faster class for single entries may be proposed later, as a change to `GOVERNANCE.md`. Changing a field, the grammar or the object classes is always a `model_revision`.
- **Versions.** Each ratified batch is a version of Work Types, named by the proposal that ratified it. This proposal is version OTCS-0017. Every instance declaration and every deployment record names the version of Work Types it was described against.

### 7. Instance declarations and deployment records

An **instance declaration** is a registered project's own statement of the work types its offer performs. In the registry, each declared work type carries:

- the status **`offered`**: the project performs this kind of work as sold or documented;
- the §5 fields marked for an instance declaration, as the project chooses to state them. A field the project does not state is not stated;
- an evidence maturity, as for any claim (`EVIDENCE-MODEL.md`). A project's statement of its own refusal points is `SELF_ASSERTED` until evidence of a higher state is cited.

A project's own declaration is its own words. When anyone other than the project attributes a work type to it, the states in `CHARTER.md` §11 apply.

**A deployment record is outside the registry.** A registry record describes a project, not a running authorization instance (OTCS-0010, *What this deliberately does NOT add*). A deployment record is kept by the deploying party. It is where the §5 fields marked for it live: the environment each point sits in, the rung and posture in force, and which fan-out bound applies. It carries two further statuses:

- **`configured`**: set up in a deployment.
- **`authorized`**: granted by the deploying party's governance. An instance is `authorized` only when every required role is assigned: the configurator, effect verifier and acceptor are named people, or teams of people, and the objects in scope are named. Until then it is at most `configured`.

Public material can establish `offered` and nothing more. Who holds each role in a deployment, and what is in force at each point, is that party's record, not OTCS's.

The manifest field that carries instance declarations, and its validator checks, are specified in a separate proposal (§11). So is the deployment record's format (§11).

### 8. Observation

Work that observes declares one or more **observation domains**: `security`, `network`, `application`. Each domain has its own, independently developed open standards (§10).

**Experience is the question that joins them, not a fourth domain:** is the user's journey usable right now? Experience is observed as **availability**, **retainability** and **quality** (the network standards in §10 call the last one *integrity*), each reported separately. **They are never combined into one score** (`NON-GOALS.md` #2).

### 9. The first entry

```yaml
work_type:
  id: otcs-work:objective.pursue
  label: user-directed agency
  maps_to: [delegate, execute]
  roles:
    configurator: [human]
    executor: [ai_agent, delegated_subagent]
    effect_verifier: [human]         # machine checks may contribute; never the executor
    acceptor: [human]
  mandate:
    required_before_fan_out: true
    fan_out: open
  consequence_ceiling: contain       # the stated mandate may set it lower, never higher
  composed_of: []                    # the work types its parts perform, named in the deployment record
  refusal_points:                    # at least one point able to refuse each of:
    - can_refuse: [scope]
      constructability: NON_CONSTRUCTABLE
    - can_refuse: [identity]
      constructability: COMMIT_GATED
    - can_refuse: [path]
      constructability: COMMIT_GATED
    - can_refuse: [consequence]
      constructability: COMMIT_GATED
    - can_refuse: [mandate]
      constructability: COMMIT_GATED
    - can_refuse: [continuation]
      constructability: NON_CONSTRUCTABLE
  requires:
    authority: [mandate]             # a natural-language request is not a grant
    environment: [reversibility, downstream_capacity, human_availability, uncertainty]
    time: [design, initiation, before_action, commit_point, during_action, across_trajectory, after_action, repair_window]
    authority_validity:
      established_at: when the mandate is given, before any fan-out
      valid_until: set by the mandate; a relational consequence has none to set, because the work never completes it (rule 6)
      freshness_requirement: how long the work may act on the person's intent before it re-asks whether the intent is still meant
      revocation_source: [the person who gave the mandate, the acceptor, any party with recognized authority over an object in scope]
      continuation_conditions: see the rules below
    maximum_unobserved_interval: no longer than the time remaining on the mandate's authority_validity.valid_until
    evidence_efficacy: EVIDENCE_TO_DECISION   # at least
    decision_outputs: [ALLOW, SHAPE, DEAUTOMATE, VETO]
  basis: single_description
```

Rules for this entry:

- **Time.** Refusal must be possible at design (scope and continuation cannot be built otherwise), when the work starts, before and while it acts, at commit, across its whole path, after it acts (when the effect is verified), and in the repair window (undo and hand-back). Registration is not a point in the work's life.
- **Who can end it.** The person who gave the mandate, the acceptor, and any party with recognized authority over an object in scope can each refuse continuation. That party may be a data owner, or a community exercising collective control over its data or knowledge.
- **Continuation conditions.** The work may go on only while all of these hold:
  1. The mandate is unchanged and still valid, and the person's intent was re-asked within `freshness_requirement`.
  2. The work still serves the stated objective, not only remains permitted. The deployment record states where this question is answered and by whom. Work Types supplies no norms of its own.
  3. A hand-back path exists. A refusal returns the work, its state and the decision to the person who gave the mandate. A stop with no way back is not accepted.
  4. Conditions that travel with an object in scope are honored. They are set by whoever holds authority over the object, including labels a community applies under its own protocols. Work Types neither defines nor applies them.
  5. Time windows on objects in scope are honored, including seasonal and scheduled windows (`schedule`).
  6. A relational consequence is never completed by a machine. An act that changes trust, obligation, consent or standing between people may be prepared by the work, never completed by it.
- **The outcome follows standing.** If a named person in the deploying party has standing to complete the act now, the outcome is DEAUTOMATE, and the act goes to that person. If no one in the deploying party has that standing, the outcome is VETO, and the deployment record names who does. If the failure touches only some objects in scope, the outcome is SHAPE: those objects are removed and the work goes on.
- **Applied to the conditions:** a withdrawn, expired or changed mandate (1) → VETO · intent not re-asked in time (1) → DEAUTOMATE, to the person who gave the mandate · no longer serves the objective (2) → DEAUTOMATE · no hand-back path (3) → VETO · an object's own conditions not honored (4) → VETO, or SHAPE if only some objects · outside a window the deploying party set (5) → DEAUTOMATE, to the schedule's owner · outside a window another authority set (5) → VETO, or SHAPE if only some objects · relational consequence (6) → DEAUTOMATE.
- **DEAUTOMATE goes to a named person,** never to the work's own judgment.
- **Scope and continuation are NON_CONSTRUCTABLE.** No part of the work can be built to act outside its scope, and no part can be built to keep acting once continuation is refused. The other four points are at least COMMIT_GATED.
- **No ceiling is not permitted.** The work runs unchecked for no longer than the mandate itself is valid.
- **The evidence must show the state reached against the stated mandate,** not only that something completed.
- **In a deployment, the outcome is VETO** if any of these is missing from its record (a refusal point below its required rung counts as missing): a refusal point for each listed refusal, including continuation, a human effect verifier, the objects in scope, or a consequence ceiling. An instance declaration that omits one of them has not stated it (§5 rule 2). It reads as `offered` with that field not stated, not as VETO.
- **Completion is not success, and inefficiency is not a defense.**

It is recorded with `basis: single_description` until two independent descriptions are cited in the decision record.

### 10. Relationship to existing standards

Most of these standards describe **the work**. One group describes **who holds authority over data and knowledge**. None of them describes, **for a kind of work, what must be able to refuse it.** Work Types describes that, and points to them for the rest.

| Standard | What it describes | Relationship |
|---|---|---|
| OpenC2 Language Specification v1.0 (OASIS, 2019) | a command: action, target, actuator; refusal only as the actuator's own response | object and verb; executor |
| CACAO Security Playbooks v2.0 (OASIS, 2023) | a playbook; signatures prove integrity, not approval | `playbook` work types |
| STIX 2.1 (OASIS, 2021) | threat information; a course of action is guidance, not execution | the `recommend` ceiling |
| OCSF schema 1.9.0 (2026) | security events; remediation activities defined by D3FEND | one lineage with D3FEND, not two |
| MITRE D3FEND 1.6.0 | countermeasure techniques acting on digital artifacts; already used to map products' claimed techniques | prior art for describing offers against a shared catalog |
| NIST CSF 2.0 (2024) and SP 800-61r3 (2025) | outcomes, including verifying restored assets (RC.RP-05); an independent verifier is not required | the effect-verifier role |
| OpenTelemetry semantic conventions v1.44.0 (2026); OpenSLO (`openslo/v1`) | application telemetry and service objectives | the `application` observation domain |
| 3GPP TS 32.450 V19.0.0 (2025) | network performance indicators: accessibility, retainability, integrity, availability | the `network` domain; the experience terms |
| Local Contexts Traditional Knowledge Labels; the First Nations Principles of OCAP®; the CARE Principles for Indigenous Data Governance (2020) | communities' own conditions on their data and knowledge, and their authority to control it | condition 4 and the revocation source in §9. Work Types refers to these systems and never enumerates, copies or applies their labels or principles. |
| OWASP Agent Control Standard v0.1.0 (2026) | the run-time exchange between an agent and a guardian: hooks, and dispositions allow, deny, modify, ask, defer | **a run-time layer a deployment of `objective.pursue` can use to supply refusal points** |

**Licence and lineage.** OCSF and OpenTelemetry's semantic conventions are Apache-2.0; OpenSLO is Apache-2.0. OpenC2, CACAO and STIX are OASIS specifications under OASIS IPR, Non-Assertion Mode. D3FEND is distributed under MITRE's Terms of Use, a non-exclusive, royalty-free licence for research, development and commercial use that requires MITRE's copyright designation to be reproduced; the ontology releases page lists 1.6.0 first. The 3GPP and ETSI text is copyright its publishers; this proposal names its categories and does not reproduce it. The licence of the OWASP Agent Control Standard's documentation is not yet established, and this proposal names its hooks and dispositions only. The licence wording of NIST CSF 2.0 is not yet established; this proposal cites its subcategory identifiers. Work Types refers to Local Contexts, OCAP® and CARE and reproduces none of their labels or principles.

ACS dispositions read onto `decision_outputs` as follows: `allow` → ALLOW · `deny` → VETO · `modify` → SHAPE · `ask` → DEAUTOMATE. `defer` is a pending state, not an outcome. As of v0.1.0, the ACS reference implementation proceeds when its guardian fails, unless it is configured otherwise. Under §5 rule 2, a deployment whose record does not state otherwise gives no assurance at that point.

Sources: https://docs.oasis-open.org/openc2/oc2ls/v1.0/oc2ls-v1.0.html · https://docs.oasis-open.org/cacao/security-playbooks/v2.0/security-playbooks-v2.0.html · https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html · https://github.com/ocsf/ocsf-schema · https://d3fend.mitre.org/resources/ontology/ · https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf · https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf · https://github.com/open-telemetry/semantic-conventions · https://github.com/OpenSLO/OpenSLO · https://www.etsi.org/deliver/etsi_TS/132400_132499/132450/19.00.00_60/ts_132450v190000p.pdf · https://localcontexts.org/labels/traditional-knowledge-labels/ · https://fnigc.ca/ocap-training/ · https://doi.org/10.5334/dsj-2020-043 · https://github.com/GenAI-Security-Project/agent-control-standard

OCAP® is a registered trademark of the First Nations Information Governance Centre (FNIGC). Local Contexts label names and texts are © Local Contexts.

### 11. Expressly deferred

These need their own proposals. Nothing here enables them.

- The remaining seed work types, in batches. Any object class a batch needs beyond §2's list is settled in the same batch. Drafts of the first batch are parked, not ratified, in `drafts/` beside this file.
- Requirement profiles: an organization's own use cases and requirements, mapped to work types. Proposed separately.
- The manifest field for instance declarations, and its validator checks.
- A method for classifying an offer, with a test of whether independent classifiers agree.
- Descriptions of a project's offers by someone other than the project. These are observed records, and they wait for the rules that govern observed records (OTCS-0016).
- The deployment record's format (§7): an optional, EXPERIMENTAL format a deploying party can use to publish its role holders, statuses and the §5 fields marked for a deployment record. It would never make the registry hold deployments.
- A faster class for adding single work types (§6).
- A machine-readable linked-data context for Work Types.

## What this proposal does not do

- It does not certify, rank, score or endorse any offer or project (`NON-GOALS.md` #1, #2, #4, #5, #15).
- It does not decide whether any work is allowed. It is in no system's execution path (#9).
- It does not hold deployments, role holders or organizations (#6).
- It names no product or company in any work type.
- It does not define, apply or speak for any community's protocols. It honors conditions set by those who hold authority over an object.
- It does not change the meaning of any coordinate or any field it reuses.
- It is not a finished map of the kinds of work (#11). It is a structure for describing them.

## Dependencies and sequencing

- **OTCS-0010 and OTCS-0011.** This proposal reuses their fields. It is decided no earlier than both. If either is withdrawn, the fields this proposal takes from it are restated here by amendment.
- **OTCS-0003.** Work Types refers to the coordinates as they stand in `docs/coordinate-system.md` when this proposal is decided.

## Impact on existing records

None. No manifest changes in this proposal. Instance declarations need the separate proposal in §11.

## Alternatives considered

- **A new record with its own fields.** Rejected: six of its fields would duplicate fields OTCS-0010, OTCS-0011 and the manifest already define. OTCS-0010 already refused a second vocabulary for one concept.
- **A lease category (session, case, standing).** Rejected: duration is a measured interval in OTCS-0010, and OTCS-0010 places leases in run-time formats, not in records. A ceiling on the interval says the same thing exactly.
- **Naming refusal points after one protocol's architecture.** Rejected: a project that does not use that architecture could not describe itself (`CHARTER.md` §11). Generic kinds and an open run-time standard are used instead.
- **A list of worker kinds (agent, engine, pipeline and similar).** Rejected: the `Actor` coordinate already names the kinds of entity.
- **Holding deployments and their role holders in the registry.** Rejected: a registry record describes a project (OTCS-0010; `NON-GOALS.md` #6).
- **Classifying or enumerating community protocols or labels.** Rejected: that authority belongs to the communities (§10).
- **Outcomes set by how severe a failure is.** Rejected: outcomes follow standing (§9), so a person is only asked to decide what they have the authority to decide.
- **Categories taken from product marketing.** Rejected: they name offers, not work (§6).
- **One experience score.** Rejected: `NON-GOALS.md` #2.
- **One word for the offer and the running system.** Rejected in Amendment 1: an offer can state what it supplies; only a deployment can state where it runs and what is in force. Using *instance* for both made the registry demand facts a project cannot have, and made silence in the registry read as failure.

## On decision — required cleanup

1. **If ratified:**
   - create `schemas/work-type.schema.json`, `WORK-TYPES.md` and `work-types/`, with the entry `otcs-work:objective.pursue` exactly as in §9;
   - add a coherence check that `WORK-TYPES.md` matches §§1–9 of the ratified text;
   - add the dispositions table in §10 to `WORK-TYPES.md`.
2. **If rejected:** nothing to remove.

## Amendments

**Amendment 1** (SUBSTANTIVE under OTCS-0013 §3.1; pinned as v1 at its merge, 2026-10-14, which restarted the clock). Made before deliberation, after the author's own adversarial read of this proposal with OTCS-0010, OTCS-0011, OTCS-0019 and OTCS-0020. Five changes:

1. **Two records, not one word.** *Instance* covered both a project's statement in the registry and a running deployment. §1 now names an **instance declaration** (registry) and a **deployment record** (outside the registry), and every §4, §5, §7, §9 and §10 field says which it belongs to. `environment` is a deployment-record field only.
2. **Silence in the registry is absence.** §5 rule 2 and §9's VETO rule now apply to a deployment record. An instance declaration that omits a field has not stated it (`docs/coordinate-system.md` §3). §7 states that a project's own refusal points are `SELF_ASSERTED` until evidence is cited.
3. **Same or different.** §6's two sentences on identity were read as contradicting each other on the four parked `*.observe` drafts. The second sentence now applies under one object class and verb.
4. **The effect verifier is `human`.** §4 said every verifier set includes `human` and that a machine never holds the role. The field is now the scalar `human`; machine checks are inputs to the confirmation, not holders of the role. §9's entry already read this way.
5. **Types.** `maximum_unobserved_interval` is a duration and `valid_until` a point in time; §9 and the eighteen parked drafts bounded the one by the other. They now say "the time remaining on" the grant's `valid_until`. §9's `valid_until: zero` for a relational consequence is replaced: there is nothing to set, because the work never completes that act (rule 6).

**Amendment 2** (NON_SUBSTANTIVE under OTCS-0013 §3.1; pinned as v2 at its merge, 2026-10-14; the clock did not restart). Adds no field and changes no meaning. Three changes: the licence of this proposal, its drafts and its future schema is stated in Provenance, under the two categories in `DCO.md` §2; the D3FEND source points at the ontology releases page that lists 1.6.0 first; §10 records the licence of each standard it names, and says where that licence is not yet established.

## Provenance

The structure was designed by the founder. The standards in §10 were checked against their primary sources, with versions and licenses recorded. The finding that open standards describe the work but not what can refuse it comes from that check. Background: `research/vocabulary-adoption.md` covers why shared vocabularies spread through tools that emit them, which is why a work type's identifier is a single string a tool can log.

**Licence of this proposal.** Its text and its drafts are specification and documentation text, under CC BY 4.0 as `DCO.md` §2 defines it. The work-type schema, created only on ratification, is a schema under Apache-2.0.
