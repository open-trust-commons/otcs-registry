# What happens to a record over time

*Version 0.1 · Status: EXPERIMENTAL · Companion to [REGISTRY-POLICY.md](REGISTRY-POLICY.md)*

Projects get acquired, abandoned, renamed, forked and deleted. **Every one of those is a recorded governance event, never a quiet field edit.**

---

## 1. Ownership transfers

A project is acquired. A maintainer steps down. A steward changes. The name can stay exactly the same while ownership, licence, strategy and relationships all change underneath it.

So a transfer is **recorded, not overwritten:**

```yaml
ownership_history:
  - owner: ...
    from: "2026-01-15"
    to: "2026-11-02"
    transfer_evidence: ...
maintainership_transfers: [...]
organization_history: [...]
```

- The new owner verifies control ([OWNER-VERIFICATION.md](OWNER-VERIFICATION.md))
- The old owner acknowledges, where they are reachable
- A contested transfer goes to the dispute process on **dated evidence**
- **The project identifier never changes** ([IDENTIFIERS.md](IDENTIFIERS.md))

## 2. Withdrawal

An owner may end active participation at any time, for any reason or none.

```yaml
withdrawal:
  active_participation: false
  preserve_historical_record: true
  withdrawn_at: "2027-03-01"
  reason: <optional, in the owner's own words>
```

The record state becomes `withdrawn` and the page stays up with the withdrawal visible.

> **Withdrawal removes participation, not history.**

Independently verifiable facts, prior versions and existing disputes all survive it. The alternative is a registry where inconvenient history can be deleted on request — which is not a record at all.

## 3. Observed records

An `observed` record documents a publicly visible project **without representing it as a participant.**

Requirements:

- Public evidence only
- No personal data beyond a contact the project itself published
- A visible label, structurally and visually distinct from a registered record
- An open path for the owner to **claim it, correct it, or decline it**

**A declining owner is honoured** ([CHARTER.md](CHARTER.md) §10) — the record comes down and the decline is logged. It is never counted as participation and never shown with a verification status it does not have.

> **Deferred until the moderation and legal processes are mature.** No version is named, because readiness here is a judgement about process maturity rather than a release date. The capability exists in the schema. Using it at scale before the process can support it would be exactly the surveillance failure [SAFETY.md](SAFETY.md) warns about.

## 4. Disappearance

Repository deleted. Domain expired. Organisation dissolved.

- Preserve the last accepted snapshot
- Keep the archive references
- Mark `UNMAINTAINED` or `SOURCE_UNREACHABLE` ([SYNC-POLICY.md](SYNC-POLICY.md) §4)
- **Never reassign the identifier**
- Preserve the full history

## 5. Name collisions and forks

**Names are mutable. Identifiers are not.**

Two projects claiming one name is a dispute resolved on dated evidence — **not a race to register.**

Three relationship types make the outcome legible rather than leaving it to whoever won:

```text
FORK_OF · FORMERLY_KNOWN_AS · SUCCESSOR_TO
```

---

**See also:** [OWNER-VERIFICATION.md](OWNER-VERIFICATION.md) — proving control at each transition · [IDENTIFIERS.md](IDENTIFIERS.md) — why the identifier outlives the name · [DEPRECATION.md](DEPRECATION.md) §4 — records that decay without anyone acting
