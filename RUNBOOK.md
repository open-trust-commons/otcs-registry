# Running this registry

*Version 0.1 · Status: EXPERIMENTAL*

**Instructions for whoever operates this, written so that it does not have to be the person who built it.**

This page is **sequence**. The rules live in the documents it links to. Where the two ever disagree, **the linked document wins** — a runbook that restates rules will drift out of step with them, and then quietly become the thing people follow.

---

## 1. From a clean machine

```bash
git clone <repository>
cd otcs
nvm use                  # the version is pinned in .nvmrc
npm ci
```

Then prove the copy is sound before touching anything:

```bash
npm run validate         # schemas, records, cross-references
npm test                 # ledger, generators, site, sanitisation
npm run ledger:verify    # the history has not been tampered with
npm run coherence        # the documents still agree with each other
npm run build:site       # deterministic — same input, byte-identical output
```

**All five must pass on a fresh clone.** If any fails on an untouched checkout, stop and fix that before doing operator work — you cannot tell your own changes from a pre-existing fault otherwise.

## 2. The recurring work

### Someone wants their project listed

```text
issue or pull request → does it meet the record rules? → checks pass? → merge
```

| Step | Where the rule is |
|---|---|
| What may be listed at all | [REGISTRY-POLICY.md](REGISTRY-POLICY.md) |
| Walk the submitter through it | [REGISTERING.md](REGISTERING.md) |
| Confirm they speak for the project | [OWNER-VERIFICATION.md](OWNER-VERIFICATION.md) §1 |
| Check nothing overclaims | [CONTRIBUTING.md](CONTRIBUTING.md) §4 |

**Refusing is a recorded act, not a silence.** A refusal leaves a trace with its grounds ([GOVERNANCE.md](GOVERNANCE.md) §12).

### Someone asserts a relationship with another project

**One project claiming a partnership is a claim, not a connection.** Anything above `self_asserted` needs the counterparty's sign-off in the pull request ([EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §5).

### Someone asks for a correction

Corrections are **new records**. Nothing is edited in place, and history is annotated rather than rewritten ([PRIVACY.md](PRIVACY.md) §3, [OWNER-RESPONSE-POLICY.md](OWNER-RESPONSE-POLICY.md) §5).

### A project has gone quiet

```bash
npm run roadmap:status   # recomputes freshness and gate eligibility
```

A lapsed confirmation shows `OWNER_CONFIRMATION_STALE`. **The record stays published** — it only stops counting toward gates ([QUALIFYING-PROJECTS.md](QUALIFYING-PROJECTS.md) §4).

## 3. Moving a proposal

```text
draft → its clock starts → discussion → ballots → decision record → merge
```

- The clock is set by consequence class ([GOVERNANCE.md](GOVERNANCE.md) §3)
- **You cannot shorten a clock by merging.** Nor can you decide a proposal was valid when the process says otherwise ([MAINTAINERS.md](MAINTAINERS.md) §3)
- Every ballot is a signed file, not a click ([VOTING.md](VOTING.md) §9)
- **Process validity is determined separately from the vote total.** A proposal can pass and still be invalid

## 4. Cutting a release

Follow [RELEASE-PROCESS.md](RELEASE-PROCESS.md) §2 in order. Two steps are ordered for a reason and cannot be swapped:

- **Anchor after hashing** — the manifest commits the hash of the artifact set
- **Log the anchor after the round completes** — a manifest cannot commit the hash of a log that already contains it

The decision to release at all is [RELEASE-GOVERNANCE.md](RELEASE-GOVERNANCE.md) §1. **Automation may recommend. It may not publish.**

## 5. When something goes wrong

| Situation | Go to |
|---|---|
| Vulnerability reported | [SECURITY.md](SECURITY.md) §5 — private channel, acknowledged after remediation |
| Key lost or compromised | [INCIDENT-RESPONSE.md](INCIDENT-RESPONSE.md) §2–3 |
| Host or organisation compromised | [INCIDENT-RESPONSE.md](INCIDENT-RESPONSE.md) §5 |
| Someone is being harmed | [SAFETY.md](SAFETY.md) §3 |
| A submission is abusive | [ACCEPTABLE-USE.md](ACCEPTABLE-USE.md) §3 |

**Emergency powers expire in 7 days unless ratified** ([GOVERNANCE.md](GOVERNANCE.md) §8). That is not a reminder to renew them. It is a limit, and letting one lapse is the normal outcome.

## 6. What you may not do, whatever the pressure

- **Remove an independently verifiable fact because it is unfavourable.** Evidence authority is not an operator power ([MAINTAINERS.md](MAINTAINERS.md) §3)
- **Delete history.** `RETRACTED` and `DISPUTED` are states; deletion is not ([SECURITY.md](SECURITY.md) §2)
- **Decide a provenance dispute yourself.** It is a record, not a verdict ([NON-GOALS.md](NON-GOALS.md))
- **Act on anything that never entered the public record** ([COMMUNICATIONS.md](COMMUNICATIONS.md) §7)

## 7. The handover record

> **`v1.0` claims "someone else can run it." Writing this page proves nothing. Somebody who is not the founder following it, and saying so, is the evidence.**

Those are two separate claims, and only the second is checkable. The exit criterion `runbook_followed_by_non_founder` in `roadmap/releases/1.0.0.yaml` stays `unmet` until a record exists at `handover/<date>-<name>.md` containing:

- **Who** — a named person who is not the founder, with their signing identity
- **When**
- **What they did** — every section of this page they actually exercised, and the ones they did not
- **Where it was wrong** — the steps that were unclear, out of date, or missing
- **What they could not complete without asking** — the important field, and the one most likely to be left blank out of politeness

**A handover record with an empty "where it was wrong" section has not been taken seriously.** No page written by one person survives first contact with a second one intact.

The founder does not write, edit or approve this record. It is merged as submitted.

---

**See also:** [CONTRIBUTING.md](CONTRIBUTING.md) — for contributors rather than operators · [MAINTAINERS.md](MAINTAINERS.md) — what an operator may and may not do · [GOVERNANCE.md](GOVERNANCE.md) — the process this serves
