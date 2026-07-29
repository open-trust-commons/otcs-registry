# What has to be true before a version ships

*Version 0.1 · Status: EXPERIMENTAL · The criteria themselves live in `roadmap/releases/*.yaml`; this document says how they behave*

---

## 1. Criteria are machine-readable

Every criterion carries a state and the evidence for it:

```yaml
state: unmet | in_progress | met | regressed | waived
evidence: [link to a registry query, test, decision, or report]
```

```bash
npm run roadmap:status     # computes roadmap/status.yaml from the live registry
```

That file is **computed, not hand-maintained.**

> **A criterion that cannot be evidenced is `unmet` by definition.** There is no state meaning "we believe this is fine."

## 2. Criteria decide, not the calendar

Target quarters may be published as estimates. **They never override a criterion.**

A release ships when its criteria are met and its environment supports it ([RELEASE-GOVERNANCE.md](RELEASE-GOVERNANCE.md) §1), or it does not ship.

## 3. Freeze at the first release candidate

A major version's criteria **freeze the moment the first release candidate is cut.**

Changing them afterwards requires a public model-revision proposal and **restarts the review clock**. This is the specific control against manufacturing readiness by moving the target.

## 4. Criteria can go backwards

A criterion may move from `met` to `regressed` — an interface loses its second implementation, a maintainer leaves, a security finding reopens.

| When | What it does |
|---|---|
| **Before release** | Blocks it |
| **After release** | Does **not** un-ship the version. It marks the Commons stage `AT RISK` ([COMMONS-STAGES.md](COMMONS-STAGES.md)) |

## 5. Waivers

Only by constitutional proposal, with grounds and expiry published on the release record. **Extremely rare by design.**

> A waiver that recurs means the criterion was wrong. Revise it in the open rather than excusing it every time.

## 6. The gates that are not counts

Every major release has ecosystem gates **and** technical, evidence, interoperability, governance and security gates.

**A registry can reach a hundred records and still be incapable of a single end-to-end composition.**

> The counts make the trajectory visible. The non-count criteria make it honest.

---

**See also:** [RELEASE-GOVERNANCE.md](RELEASE-GOVERNANCE.md) — who evaluates these and what they may decide · [ROADMAP-CHANGES.md](ROADMAP-CHANGES.md) — changing a criterion is itself a governed act · [COMMONS-STAGES.md](COMMONS-STAGES.md) — the ecosystem thresholds
