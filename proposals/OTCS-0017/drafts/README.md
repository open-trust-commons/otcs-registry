# Work Types — parked drafts (not ratified)

**Status: DRAFT. Nothing here is ratified, and none of it is part of OTCS-0017's pinned text.** OTCS-0017 (`../proposal.md`) defines what a work type is and governs every field below. These files are drafts of the seed work types, parked here so they can be read, cited and argued with before any of them is proposed.

- The values are the author's proposal for deliberation. Any of them may change.
- New work types enter Work Types only through a batch proposal of class `model_revision` (OTCS-0017 §6). These drafts are the material for the first batch.
- Each draft follows OTCS-0017 §4. `basis` is `single_description` throughout until each draft's independent descriptions are cited in a proposal.
- The first entry, `otcs-work:objective.pursue`, is in OTCS-0017 §9 itself and is not repeated here.

## The drafts

| Work type | Label | Maps to | Ceiling | Fan-out | Observation domain |
|---|---|---|---|---|---|
| [`otcs-work:agent_context.write`](work-types/agent_context.write.yaml) | write to an agent's context or memory | write | mutate | none | — |
| [`otcs-work:case.investigate`](work-types/case.investigate.yaml) | investigate a case | read | recommend | bounded | security, network, application |
| [`otcs-work:configuration.change`](work-types/configuration.change.yaml) | change a system's configuration | modify_policy, write | mutate | bounded | — |
| [`otcs-work:credential.revoke`](work-types/credential.revoke.yaml) | revoke a credential | revoke | contain | none | — |
| [`otcs-work:detection.author`](work-types/detection.author.yaml) | author a detection | write | mutate | none | — |
| [`otcs-work:entitlement.change`](work-types/entitlement.change.yaml) | change an entitlement | bind, revoke | mutate | none | — |
| [`otcs-work:evidence_artifact.analyze`](work-types/evidence_artifact.analyze.yaml) | analyze an evidence artifact | read | evidence_only | none | security |
| [`otcs-work:finding.observe`](work-types/finding.observe.yaml) | observe security findings | read | evidence_only | none | security |
| [`otcs-work:finding.triage`](work-types/finding.triage.yaml) | triage a finding | read | recommend | none | security |
| [`otcs-work:integration.author`](work-types/integration.author.yaml) | build or change an integration | write | mutate | none | — |
| [`otcs-work:journey.observe`](work-types/journey.observe.yaml) | observe whether a user journey is usable | read | evidence_only | none | application, network |
| [`otcs-work:network_path.observe`](work-types/network_path.observe.yaml) | observe network paths | read | evidence_only | none | network |
| [`otcs-work:playbook.draft`](work-types/playbook.draft.yaml) | draft a playbook | write | recommend | none | — |
| [`otcs-work:playbook.execute`](work-types/playbook.execute.yaml) | execute a playbook | execute | contain | bounded | — |
| [`otcs-work:service.observe`](work-types/service.observe.yaml) | observe service health | read | evidence_only | none | application |
| [`otcs-work:service.verify`](work-types/service.verify.yaml) | verify a service has recovered | read | evidence_only | none | security, network, application |
| [`otcs-work:session.terminate`](work-types/session.terminate.yaml) | end a session | revoke | contain | none | — |
| [`otcs-work:telemetry.observe`](work-types/telemetry.observe.yaml) | observe telemetry | read | evidence_only | none | application, network |

## Changes from the earlier seed list

Settling the object classes (OTCS-0017 §2) changed some identifiers:

| Earlier seed | Draft | Why |
|---|---|---|
| `detection.triage` | `finding.triage` | Triage acts on findings, not on detections |
| `identity.mutate` | `credential.revoke`, `session.terminate`, `entitlement.change` | Identity split into separate object classes; each refuses differently |
| `security_finding.observe` | `finding.observe` | `finding` is an object class |
| `service_health.observe` | `service.observe` | `service` is the object class |
| `journey_experience.observe` | `journey.observe` | `journey` is the object class |
| `recovery.verify` | `service.verify` | No `recovery` class; recovery is verified on the service |

Three drafts are new and fill gaps: `configuration.change`, `integration.author` and `agent_context.write`.

## Candidates for later batches

Named here so they can be argued with. None is drafted yet, and each must pass the same-or-different test (OTCS-0017 §6) before it is. Some will merge with others. Classes marked † do not exist yet and are settled in the batch that first needs them.

| Area | Candidates |
|---|---|
| Identity and access | `account.create` · `account.disable` · `account.delete` · `person.verify` · `non_human_identity.create` · `non_human_identity.retire` · `credential.issue` · `credential.rotate` · `entitlement.review` · `session.elevate` |
| Security work | `host.isolate` · `evidence_artifact.collect` · `finding.suppress` · `detection.disable` · `detection.test` · `detection.promote` · `playbook.promote` · `vulnerability.assess` · `vulnerability.remediate` · `reference_data.update`† · `control.test`† · `control.remediate`† · `policy.change` |
| Cases | `case.open` · `case.classify` · `case.coordinate` · `case.escalate` · `case.close` · `problem.diagnose`† |
| Change and infrastructure | `release.deploy` · `release.rollback` · `release.test` · `service.restart` · `service.scale` · `service.failover` · `service.continuity_test` · `host.patch` · `host.retire` · `device.configure` · `device.retire` · `network_path.change` · `schedule.change` · `configuration_item.update`† · `integration.deploy` · `cloud_resource.provision`† · `cloud_resource.delete`† · `code_change.merge`† |
| Data | `data_set.classify` · `data_set.export` · `data_set.delete` · `data_set.hold` · `data_set.backup` · `data_set.restore` · `telemetry.redact` |
| AI systems | `model.train` · `model.evaluate` · `model.deploy` · `agent.deploy` · `agent.configure` · `agent.retire` · **`agent.promote`** |
| Governance | `risk.accept` · `change.approve` · `obligation.report`† · `service_level.report`† · `knowledge_article.publish`† · `supplier.onboard`† |
| Acting for people | `message.send`† · `transaction.execute`† · `ticket.update`† · `person.notify` · `service_request.fulfil`† |

**`agent.promote`** raises how much an agent may do on its own. The stages it moves between, lowest first: **replay** (re-runs past cases, acts on nothing) · **shadow** (runs live, its outputs unused) · **recommend** (its outputs go to a person) · **bounded execute** (performs only a pre-approved, low-consequence class, with scoped credentials and rate limits). Each step up is its own act, accepted by a person.

`risk.accept` and `change.approve` are work a person holds: their executor role is `human` only.

## Plugging in your own use cases and requirements

An organization's own use cases and requirements can be mapped to these work types through a **requirement profile**, proposed separately. A requirement is a duty, not a feature; mapping it to a work type is never permission to act.

## What these drafts do not do

They describe what must be able to refuse each kind of work. They never describe any work as allowed, and they name no product or company.
