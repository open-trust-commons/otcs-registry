# Work Types — batch 1 drafts (not ratified)

**Status: DRAFT. Nothing here is ratified, and none of it is part of OTCS-0017's pinned text.** OTCS-0017 (`../../proposal.md`) governs every field. These files are the material for the first batch proposal under §6, a `model_revision` decided no earlier than OTCS-0017 itself. They sit beside the 18 seed drafts in `../work-types/`.

**Provenance.** Generalized from a content pack of the author's own design, worked through an invented organization, with every organization-specific term removed. Drafted with AI assistance under the author's direction (`AI-USE.md` §2); every value in the source was checked automatically for allowed values, and a sample by a second blind review pass. The `requires` block of each type is taken from the defaults below, not from the source. All of it is the author's proposal for deliberation.

## What is in this batch

- **65 work types**, each with two or more independent descriptions recorded in the source (counts, not citations; the citations are attached in the batch proposal, and a type without them is recorded `single_description`).
- **25 object classes** beyond OTCS-0017 §2's seed list, each with means and does-not-mean, below. Only classes these types use enter; the rest of the source's classes wait for their types.
- No observation work. Every type here carries no `observation_domain`, so no domain question arises in this batch (0017 §8).

## Rules applied (the batch's own, recorded on the private tracker 2026-10-15)

1. **Roles are Actor values.** The source named job titles; here `configurator: [human]`, `acceptor: [human]`, `effect_verifier: human`, and the executor is `[human]`, `[human, ai_agent]` or `[human, service]` according to whether the source named an agent or a platform as executor.
2. **The outcome follows standing** (0017 §9). The source's one outcome per type is dropped; `decision_outputs` lists all four.
3. **Constructability pattern.** `human_approver`, `policy_engine`, `gateway` and `identity_fabric` points are COMMIT_GATED; on a `contain`-ceiling type, scope and continuation are NON_CONSTRUCTABLE, as in `objective.pursue`. The native points the source named are kept in each file's `crosswalk`.
4. **Ceiling coverage.** Every `mutate` type has a point that can refuse consequence; every `contain` type has one that can refuse continuation. Where the source lacked it the point was added; the list is below.
5. **Deployment-record material stays out.** The source's grant shape, execution evidence and mandate binding describe a deployment (0017 Amendment 1), not a kind of work, and are not carried. The source's lease class is carried only as the mandate, case or change window that bounds `authority_validity.valid_until`; a grant-scope field is proposed with the batch, not here.
6. **Word collisions.** `process` is renamed `business_process` (CISSP and D3FEND own `process` for an operating-system process). `control.*` types are left out until a `control` class is settled. A board-adopted policy is not the seed `policy` and waits for its own class.

## `requires` defaults (G3 Q7)

Each type takes the default for its consequence ceiling, then the override for its class group; the file's `notes` name both. Derived from the 18 seed drafts.

| Ceiling | authority | environment | time | maximum_unobserved_interval | evidence_efficacy |
|---|---|---|---|---|---|
| evidence_only | role | data_quality, uncertainty | during_action, across_trajectory | the data-access grant's `valid_until` | EVIDENCE_ONLY |
| recommend | role | ambiguity_load, uncertainty, human_availability | before_action, after_action | the case's `valid_until` | EVIDENCE_TO_DECISION |
| mutate | role, organizational_policy | reversibility, system_health, downstream_capacity | before_action, commit_point, after_action, repair_window | the change window's `valid_until` | EVIDENCE_TO_DECISION |
| contain | mandate, role, organizational_policy | reversibility, downstream_capacity, system_health, human_availability | before_action, commit_point, during_action, after_action, repair_window | the mandate's `valid_until` | EVIDENCE_TO_DECISION |

| Class group | Override |
|---|---|
| identity (credential, entitlement, session, account, facility_access, person, delegation, position, employment) | authority adds `mandate`; environment is identity_confidence, reversibility, human_availability (plus legal_context for person, employment, position); interval bounded by the mandate |
| data (data_set, reference_data, schema, record, master_record, model, knowledge_article, content, consent, telemetry, evidence_artifact, agent_context) | environment adds data_quality, legal_context |
| finance (budget, transaction, purchase_order, contract, supplier, payee_account, bank_account, ledger_entry, accounting_period, payroll, obligation, dispute, ip_right) | authority adds `mandate` (and `contract` for contract, supplier, purchase_order, obligation, dispute, ip_right); environment adds financial_exposure, legal_context; interval bounded by the mandate |
| physical (asset, facility, device, equipment, power_supply, route, frequency, feed) | environment adds human_availability |
| governance (everything else) | the ceiling default |

`decision_outputs` is `[ALLOW, SHAPE, DEAUTOMATE, VETO]` throughout. Any type whose refusal points include `mandate` also lists `mandate` under authority and sets `required_before_fan_out: true`.

Types by class group: data 10, finance 9, governance 32, identity 8, physical 6.

## Object classes entering with this batch (OTCS-0017 §2 format)

| Class | Means | Does not mean |
|---|---|---|
| `asset` | a physical item the organization holds and accounts for, other than IT hosts and devices | a host or device (seed classes), or data |
| `baseline` | an approved scope, schedule or cost plan that change is measured against | a plan draft, or the work itself |
| `budget` | an approved allocation of funds | a payment, or a ledger entry |
| `business_process` | a business process: a repeatable way of working (the pack's `process`, renamed) | an operating-system process (CISSP, D3FEND); a process held in place in the Six Sigma sense |
| `campaign` | a planned set of outward messages to a target audience | one message |
| `change` | a change record that is approved and scheduled | the configuration it changes |
| `code_change` | a proposed change to source code | a release |
| `configuration_item` | a record of a managed item in the configuration database | the item itself |
| `contract` | a binding agreement with another party | the supplier, or an obligation imposed by an authority |
| `deliverable` | a work product accepted against stated criteria | a release, or a phase |
| `facility` | a building, venue or space the organization occupies or operates | the systems in it |
| `facility_access` | a person's right to enter a site or zone | a digital entitlement |
| `knowledge_article` | a published piece of operational knowledge | a record kept for legal retention |
| `message` | a statement sent to named people or published to the public | a campaign |
| `obligation` | a condition imposed by an authority: permit, grant, venue-owner commitment | a contract the organization negotiated |
| `phase` | a stage of a project or programme bounded by gates | a schedule window |
| `problem` | the underlying cause of one or more incidents | an incident or a case |
| `product` | an offering sold or given to customers | an internal IT service |
| `reference_data` | a governed code list or lookup | master records |
| `risk` | a recorded risk with an owner and treatment | a finding, or a vulnerability |
| `service_level` | an agreed level of service and its measures | the service |
| `service_request` | a standard request from a user for something already offered | an incident or a change |
| `supplier` | an organization that supplies goods or services | a contract with it |
| `ticket` | an IT service ticket | an event ticket (admission) |
| `transaction` | a movement of money: payment, refund, chargeback | a ledger entry |

## The drafts

| Work type | Label | Maps to | Ceiling | Fan-out | Descriptions recorded | Class group |
|---|---|---|---|---|---|---|
| [`otcs-work:asset.dispose`](work-types/asset.dispose.yaml) | Sell, donate, scrap or return a physical asset | transfer, delete | mutate | bounded | 2 | physical |
| [`otcs-work:asset.transfer`](work-types/asset.transfer.yaml) | Move an asset's custody or location to another holder or site | transfer, write | mutate | bounded | 2 | physical |
| [`otcs-work:baseline.change`](work-types/baseline.change.yaml) | change an approved scope, schedule or cost baseline | write | mutate | none | 11 | governance |
| [`otcs-work:budget.commit`](work-types/budget.commit.yaml) | commit funds to work | transfer | mutate | none | 4 | finance |
| [`otcs-work:campaign.launch`](work-types/campaign.launch.yaml) | Start, change or halt a marketing campaign to a target audience | publish, send | mutate | open | 2 | governance |
| [`otcs-work:case.escalate`](work-types/case.escalate.yaml) | move a case to another team or seat | delegate | mutate | none | 3 | governance |
| [`otcs-work:change.approve`](work-types/change.approve.yaml) | approve a change | commit | mutate | none | 4 | governance |
| [`otcs-work:change.expedite`](work-types/change.expedite.yaml) | make an emergency change | modify_policy | mutate | bounded | 2 | governance |
| [`otcs-work:code_change.merge`](work-types/code_change.merge.yaml) | merge a code change | write, commit | mutate | none | 4 | governance |
| [`otcs-work:configuration_item.update`](work-types/configuration_item.update.yaml) | update a configuration item | write | mutate | bounded | 3 | governance |
| [`otcs-work:contract.amend`](work-types/contract.amend.yaml) | Change the terms, scope or value of an existing agreement | bind, write | mutate | none | 3 | finance |
| [`otcs-work:contract.award`](work-types/contract.award.yaml) | award a contract to a supplier | purchase | mutate | none | 6 | finance |
| [`otcs-work:credential.issue`](work-types/credential.issue.yaml) | create a credential | bind | mutate | none | 4 | identity |
| [`otcs-work:data_set.backup`](work-types/data_set.backup.yaml) | backup a data set | read, write | mutate | bounded | 3 | data |
| [`otcs-work:data_set.classify`](work-types/data_set.classify.yaml) | classify a data set | read, write | mutate | none | 4 | data |
| [`otcs-work:data_set.delete`](work-types/data_set.delete.yaml) | delete a data set | delete | mutate | bounded | 4 | data |
| [`otcs-work:data_set.export`](work-types/data_set.export.yaml) | export a data set | read, transfer | mutate | bounded | 2 | data |
| [`otcs-work:data_set.hold`](work-types/data_set.hold.yaml) | hold a data set | write, modify_policy | contain | bounded | 3 | data |
| [`otcs-work:data_set.migrate`](work-types/data_set.migrate.yaml) | Move or convert data from one system to another at cutover | transfer, write | mutate | bounded | 2 | data |
| [`otcs-work:data_set.restore`](work-types/data_set.restore.yaml) | restore a data set | write | mutate | bounded | 3 | data |
| [`otcs-work:deliverable.accept`](work-types/deliverable.accept.yaml) | accept a work product against stated criteria | commit | mutate | none | 5 | governance |
| [`otcs-work:device.configure`](work-types/device.configure.yaml) | configure a device | modify_policy, write | mutate | bounded | 2 | physical |
| [`otcs-work:device.retire`](work-types/device.retire.yaml) | retire a device | revoke, write | mutate | bounded | 2 | physical |
| [`otcs-work:entitlement.review`](work-types/entitlement.review.yaml) | periodic recertification of access | read | recommend | bounded | 2 | identity |
| [`otcs-work:facility.commission`](work-types/facility.commission.yaml) | Accept a built or modified facility into operational use | commit, write | mutate | none | 2 | physical |
| [`otcs-work:facility.decommission`](work-types/facility.decommission.yaml) | Remove overlay and return or close a facility | delete, transfer | mutate | none | 2 | physical |
| [`otcs-work:facility_access.grant`](work-types/facility_access.grant.yaml) | grant a person physical access to a site or zone | bind | mutate | none | 3 | identity |
| [`otcs-work:host.patch`](work-types/host.patch.yaml) | patch a host | write, execute | mutate | bounded | 3 | governance |
| [`otcs-work:integration.deploy`](work-types/integration.deploy.yaml) | deploy a integration | execute, bind | mutate | bounded | 3 | governance |
| [`otcs-work:knowledge_article.publish`](work-types/knowledge_article.publish.yaml) | publish a knowledge article | publish | mutate | none | 7 | data |
| [`otcs-work:message.send`](work-types/message.send.yaml) | send a message | send | mutate | bounded | 2 | governance |
| [`otcs-work:model.train`](work-types/model.train.yaml) | train a model | execute, write | mutate | bounded | 2 | data |
| [`otcs-work:network_path.change`](work-types/network_path.change.yaml) | change a network path | execute | contain | bounded | 4 | governance |
| [`otcs-work:obligation.report`](work-types/obligation.report.yaml) | report a obligation | send, commit | mutate | none | 4 | finance |
| [`otcs-work:person.assign`](work-types/person.assign.yaml) | assign a person to a role in the work | delegate | mutate | none | 5 | identity |
| [`otcs-work:person.notify`](work-types/person.notify.yaml) | notify a person | send | mutate | bounded | 3 | identity |
| [`otcs-work:person.offboard`](work-types/person.offboard.yaml) | remove a person's access when they leave | revoke | contain | bounded | 2 | identity |
| [`otcs-work:person.onboard`](work-types/person.onboard.yaml) | bring a person into the organization | create_identity | mutate | bounded | 5 | identity |
| [`otcs-work:person.verify`](work-types/person.verify.yaml) | verify a person | read | recommend | none | 3 | identity |
| [`otcs-work:phase.advance`](work-types/phase.advance.yaml) | move work through a gate into its next phase | commit | mutate | bounded | 6 | governance |
| [`otcs-work:policy.change`](work-types/policy.change.yaml) | change a policy | modify_policy | mutate | bounded | 7 | governance |
| [`otcs-work:problem.diagnose`](work-types/problem.diagnose.yaml) | diagnose a problem | read | recommend | none | 3 | governance |
| [`otcs-work:business_process.change`](work-types/business_process.change.yaml) | change how a business process runs | modify_policy | mutate | bounded | 5 | governance |
| [`otcs-work:business_process.handoff`](work-types/business_process.handoff.yaml) | hand an improved process to its owner | delegate | mutate | none | 3 | governance |
| [`otcs-work:business_process.pilot`](work-types/business_process.pilot.yaml) | run a change on a limited scope first | execute | mutate | bounded | 2 | governance |
| [`otcs-work:product.launch`](work-types/product.launch.yaml) | Release a new product or service offering to customers | publish, commit | mutate | open | 2 | governance |
| [`otcs-work:reference_data.update`](work-types/reference_data.update.yaml) | update a reference data | write, publish | mutate | bounded | 4 | data |
| [`otcs-work:release.deploy`](work-types/release.deploy.yaml) | deploy a release | execute, write | mutate | bounded | 3 | governance |
| [`otcs-work:release.test`](work-types/release.test.yaml) | test a release | execute, read | recommend | bounded | 4 | governance |
| [`otcs-work:risk.accept`](work-types/risk.accept.yaml) | accept a risk (human-held work) | commit | mutate | none | 5 | governance |
| [`otcs-work:schedule.change`](work-types/schedule.change.yaml) | change a schedule | write, send | mutate | bounded | 5 | governance |
| [`otcs-work:service.continuity_test`](work-types/service.continuity_test.yaml) | continuity test a service | execute | mutate | bounded | 3 | governance |
| [`otcs-work:service.failover`](work-types/service.failover.yaml) | failover a service | execute | mutate | bounded | 3 | governance |
| [`otcs-work:service.publish`](work-types/service.publish.yaml) | make a service available to request in the catalogue | publish | mutate | none | 2 | governance |
| [`otcs-work:service.recover`](work-types/service.recover.yaml) | restore a service from backup or failover | execute | mutate | bounded | 3 | governance |
| [`otcs-work:service.retire`](work-types/service.retire.yaml) | take a service out of the catalogue and out of operation | revoke | mutate | bounded | 3 | governance |
| [`otcs-work:service.scale`](work-types/service.scale.yaml) | scale a service | execute, purchase | mutate | bounded | 3 | governance |
| [`otcs-work:service_level.report`](work-types/service_level.report.yaml) | report a service level | read, publish | mutate | none | 3 | governance |
| [`otcs-work:service_request.fulfil`](work-types/service_request.fulfil.yaml) | fulfil a service request | execute, write | mutate | bounded | 9 | governance |
| [`otcs-work:supplier.assess`](work-types/supplier.assess.yaml) | assess a supplier's risk | read | recommend | none | 4 | finance |
| [`otcs-work:supplier.offboard`](work-types/supplier.offboard.yaml) | end a supplier's access and data flows | revoke | contain | bounded | 3 | finance |
| [`otcs-work:supplier.onboard`](work-types/supplier.onboard.yaml) | onboard a supplier | create_identity, write | mutate | none | 3 | finance |
| [`otcs-work:ticket.update`](work-types/ticket.update.yaml) | update a ticket | write | mutate | none | 4 | governance |
| [`otcs-work:transaction.execute`](work-types/transaction.execute.yaml) | execute a transaction | transfer | mutate | none | 5 | finance |
| [`otcs-work:transaction.reverse`](work-types/transaction.reverse.yaml) | Refund, void, credit or charge back a completed transaction | transfer, write | mutate | bounded | 2 | finance |

## Changes made to the source, listed

- `asset.dispose`: composed_of `device.sanitize` not in batch 1 or on main; carried as a note
- `asset.dispose`: scoped to non-IT assets; `device.sanitize` named in notes until it enters a batch
- `credential.issue`: Q4 added a point for consequence
- `data_set.backup`: Q4 added a point for consequence
- `data_set.hold`: Q4 added a point for consequence, continuation
- `data_set.migrate`: composed_of `data_set.load` not in batch 1 or on main; carried as a note
- `device.retire`: composed_of `device.sanitize` not in batch 1 or on main; carried as a note
- `facility_access.grant`: Q4 added a point for consequence
- `model.train`: Q4 added a point for consequence
- `network_path.change`: Q4 added a point for continuation
- `person.offboard`: Q4 added a point for consequence, continuation
- `person.offboard`: composed_of `account.disable` not in batch 1 or on main; carried as a note
- `person.offboard`: composed_of `facility_access.revoke` not in batch 1 or on main; carried as a note
- `person.onboard`: Q4 added a point for consequence
- `person.onboard`: composed_of `account.create` not in batch 1 or on main; carried as a note
- `process.change` → `business_process.change`: Q5 word collision (`process` is an operating-system process in CISSP and D3FEND)
- `process.handoff` → `business_process.handoff`: Q5 word collision (`process` is an operating-system process in CISSP and D3FEND)
- `process.pilot` → `business_process.pilot`: Q5 word collision (`process` is an operating-system process in CISSP and D3FEND)
- `business_process.pilot`: Q4 added a point for consequence
- `service.retire`: composed_of `integration.retire` not in batch 1 or on main; carried as a note
- `service_request.fulfil`: Q4 added a point for consequence
- `supplier.offboard`: Q4 added a point for consequence, continuation
- `supplier.offboard`: composed_of `account.disable` not in batch 1 or on main; carried as a note
- `supplier.onboard`: Q4 added a point for consequence
- `supplier.onboard`: composed_of `payee_account.change` not in batch 1 or on main; carried as a note
- `ticket.update`: Q4 added a point for consequence

- Left out of this batch: `control.remediate`, `control.test` (the `control` class is deferred).

## Gaps this batch carries into its proposal

- **Citations.** The source records how many independent descriptions each type has, not which. The batch proposal cites them; a type whose citations cannot be produced is recorded `single_description`.
- **The defaults are a proposal.** The `requires` values are the author's defaults, applied by class group; deliberation may move any type off its default.
- **`composed_of` references** to types not yet in a batch are carried in `notes`, not in the field, so every reference resolves.
- **Grant scope.** A field for how far one grant reaches (per case, per session, standing) is proposed with the batch proposal, not in these files.
