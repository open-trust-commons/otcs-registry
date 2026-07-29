# How to get your project listed

*Version 0.1 · Status: EXPERIMENTAL*

What actually happens, start to finish. Around an hour of work, most of it spent deciding what your project honestly does **not** do.

Related: [PARTICIPATION.md](PARTICIPATION.md) (whether your kind of project fits — it almost certainly does) · [REGISTRY-POLICY.md](REGISTRY-POLICY.md) (the rules) · [NON-GOALS.md](NON-GOALS.md) (what being listed will never mean).

---

## Before you start

Three things are true and worth knowing up front:

- **Being listed is not an endorsement.** It records that you made a public, attributable claim about your project. Nothing more.
- **You do not have to be on GitHub, be open source, or contain any software.** A doctrine, a specification, a research programme, or a closed commercial product can all be listed.
- **You do not have to adopt KTP or agree with it.** You can be listed while publicly disputing how we described you.

## The five steps

| | Step | Who does it | Roughly |
|---|---|---|---|
| 1 | Open a registration issue | You | 10 min |
| 2 | Prove you speak for the project | You | 5 min |
| 3 | Write your record | You | 30 min |
| 4 | Validation and mapping review | Us, with you | A few days |
| 5 | Published | Us | — |

### 1. Open a registration issue

Use the **Register a project** form. It asks for the name, a canonical public location, what problem the project addresses, and — the field people skip — **what your project does not claim.**

A social media profile is not a canonical location. A repository, a versioned specification, a DOI, or official documentation all are.

### 2. Prove you speak for the project

Any one of these is enough:

| Method | How |
|---|---|
| `repository_control_confirmed` | Push a file we name, or reference the issue from the repo |
| `domain_control_confirmed` | A DNS record or a file at a path we name |
| `organization_email_confirmed` | Reply from an address at the organisation |
| `signed_statement` | A signed statement |
| `platform_account_confirmed` | Post from the project's official account |
| `documentation_naming` | Your project's own docs already name you |

Until one of these is done, nothing gets published as `registered`.

### 3. Write your record

One file, `otcs.yaml`. It can live in your repository or in ours if you have no natural home for it. The full shape is in `schemas/project-manifest.schema.json`; the required minimum is below.

### 4. Validation and mapping review

Two things happen, and they are different:

- **Validation is mechanical.** Does the file parse, do the values exist in the vocabulary, is anything missing. You can run this yourself before submitting: `npm run validate`.
- **Mapping review is a conversation.** We read what you wrote and check the coordinates match the description. This is where most registrations change, and it is the useful part.

**If we disagree about your mapping, you win by default and the disagreement is recorded.** Your words are published; our reading is marked as ours.

### 5. Published

Your entry appears with its evidence levels, its date, and its full history from that point on.

---

## What this looks like in practice

*A short fictional example. Watchtower is an invented project.*

**Watchtower** is a monitoring tool. Its maintainer opens a registration issue, confirms control of the repository, and writes a first draft claiming three functions: `sense`, `record`, and `enforce`.

We ask one question:

> When Watchtower detects a problem, what stops the action?

The honest answer is nothing. Watchtower raises an alert and a human decides. It has no enforcement point — nothing downstream is obliged to obey it.

The maintainer removes `enforce`. Not because we told them to, but because the question made the gap visible. The record now says `sense` and `record`, and the `non_claims` field says outright: *does not block or modify any request.*

**That entry is more useful than the first draft**, and more useful than a glowing one. A reader can now see exactly where Watchtower stops — which is precisely the point at which they need something else.

Total elapsed time: two days, most of it waiting on the maintainer.

---

## The record itself

The minimum that will validate. This exact file passes the schema.

```yaml
otcs_version: "0.1"

project:
  id: watchtower
  name: Watchtower
  canonical_url: https://example.org/watchtower
  status: beta                        # concept · research · prototype · alpha · beta · production · archived
  first_public_date: "2026-03-14"
  license: Apache-2.0
  record_state: registered
  contact: maintainers@example.org
  maintainers:
    - name: A. Maintainer
      representative: true

declaration:
  problem: >-
    Operators cannot see how conditions are changing across their estate
    while automated systems are acting on it.
  governed_object: [action, environment]
  known_limitations: >-
    Watches four conditions. Cannot stop or alter any action. No independent
    evaluation has been done.
  non_claims:
    - Does not block or modify any request.
    - Does not decide whether an action is permitted.
    - Has not undergone independent security evaluation.

coordinates:
  functions: { sense: 0.9, record: 0.6 }
  environment: [system_health, dependency_health, threat_pressure, uncertainty]
  time: [during_action]

evidence:
  specification: 1
  implementation: 0
  independent_validation: 0
```

### The fields that matter most

| Field | Why |
|---|---|
| `non_claims` | The field that makes everything else readable. A record with no stated limits reads as marketing |
| `known_limitations` | Required. Where the project stops working, in your own words |
| `evidence` | Three numbers, kept apart. **Never collapse them into one** |
| `functions` | What the project does. Claiming `enforce` means something downstream must obey — see the example above |

**Everything else is optional.** Ownership history, freshness dates, disclosures, lineage — add them when they are true, not to look complete.

## Common corrections

Four things come up nearly every time:

- **Claiming `enforce` without an enforcement point.** If the governed system can ignore your decision, that is `decide`, not `enforce`.
- **One evidence number instead of three.** Written down, built, and checked by outsiders are separate, and collapsing them destroys the information.
- **An empty `non_claims`.** Nothing does everything. An empty list reads as either evasion or inattention.
- **Claiming a connection to another project.** You can say you integrate with X. That records *your* claim, not X's agreement, until X signs off.

## What happens afterwards

- **You can change your entry at any time.** Corrections are normal and the history stays visible.
- **You can leave at any time.** The page goes; the record that it existed stays.
- **Nobody can add a claim about you that you cannot answer.** The correction and dispute processes are in [GOVERNANCE.md](GOVERNANCE.md) §10.
- **Your entry does not expire**, but it does get stale, and staleness is visible in the record.

## If something goes wrong

| Situation | What to do |
|---|---|
| We described your project wrongly | Open a correction request. Your statement is published verbatim |
| Someone else claims your project's identity | The dispute process, decided on dated evidence |
| Someone lists a connection to you that you reject | Reject it. It cannot rise above one-sided without your sign-off |
| You want out entirely | `UNLIST`. No explanation required |
