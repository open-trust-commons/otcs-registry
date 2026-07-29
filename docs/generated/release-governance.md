!!! info "Generated page"
    Compiled from `RELEASE-GOVERNANCE.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Who decides a release may go out

*Version 0.1 · Status: EXPERIMENTAL*

Releases are decided using KTP's own decision vocabulary. **A system arguing that authority must be recomputed against what the environment can support ought to apply that to its own shipping.**

---

## 1. The four possible decisions

| Decision | When | What happens |
|---|---|---|
| **ALLOW** | Every required criterion passes | The release proceeds |
| **SHAPE** | Criteria pass, but real non-blocking limitations remain | Proceeds with **narrowed scope, explicit caveats, or features switched off** |
| **DEAUTOMATE** | The automated checks are insufficient, conflicting, or the question is governance-sensitive | **Release automation stops. Named humans decide** |
| **VETO** | A critical gate fails | The release cannot proceed |

**What triggers a veto:**

- An unresolved critical vulnerability
- An invalid process
- A copyright or rights problem
- A false evidence claim
- An affected party who was not notified
- A broken migration
- A compromised release key
- **An environment that cannot support the proposed major transition**

> **A majority vote must not override a release veto without first repairing the failed environment.** You cannot vote your way past an environment that will not support the action.

## 2. Automation recommends. It does not publish

Automated evaluation **generates evidence.** A named panel verifies it.

Automation may recommend `ALLOW`. It **cannot publish a major release on its own.**

`DEAUTOMATE` exists precisely for the case where every check is green and something about the situation still is not right.

## 3. Criteria freeze at the first release candidate

Changing a major version's exit criteria after that point requires a public model-revision proposal and **restarts the review clock** ([VERSION-EXIT-CRITERIA.md](version-exit-criteria.md)).

> Goalposts that move as the ball approaches are not criteria. They are ceremony.

## 4. Not every release faces the same gates

| Class | Ecosystem gates? |
|---|---|
| **Patch** `x.y.Z` | **No.** Defects, security, wording, validator, links, dependencies |
| **Minor** `x.Y.0` | Capability-specific criteria only. Not every minor needs a threshold |
| **Major** `X.0.0` | **Yes** — a new stable contract *and* a minimum Commons stage, sustained ([COMMONS-STAGES.md](commons-stages.md)) |

> **A security patch must never wait on a project-count criterion.** Using exit criteria that way would be dangerous, not rigorous.

## 5. Waivers

A `MUST` criterion can be waived **only by constitutional proposal**, with the waiver, its grounds and its expiry published on the release record.

**This should be extremely rare.** A waiver that becomes routine means the criterion was wrong, and it should be revised in the open instead of excused every time.

## 6. The release record

Every release publishes:

- Its decision
- Each evaluated criterion, with links to the evidence
- Who was on the panel
- Any narrowing applied under `SHAPE`
- Any waiver

> **A release whose decision cannot be reconstructed from its record did not follow this process.**

---

**See also:** [RELEASE-PROCESS.md](release-process.md) — the mechanics once the decision is made · [VERSION-EXIT-CRITERIA.md](version-exit-criteria.md) — where the criteria live and how they behave · [GOVERNANCE.md](governance.md) §8 — emergency powers and their expiry
