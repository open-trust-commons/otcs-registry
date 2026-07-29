# Keeping records in step, without automating away the review

*Version 0.1 · Status: EXPERIMENTAL*

> **Automate the clerical work. Never automate the moments where trust is earned.**

Everything starts as a pull request a human can see.

---

## 1. Two different problems, often confused

| | What it is | Status |
|---|---|---|
| **Repository → website** | Merge to `main` → validate → build → deploy | **Live.** Event-driven, nothing is polled |
| **A project's own file → this registry** | Pulling a manifest a project hosts itself | **Deliberately deferred** |

The second is deferred because remote sync automates a process once it is stable. **It must not be used to avoid finding out what the process should be.**

## 2. The staged rollout

### Version 0.1 — no remote sync at all

Every accepted manifest lives in this repository. Owners open a pull request, or use assisted registration ([REGISTERING.md](REGISTERING.md)).

What that buys: review · stable history · deterministic builds · no remote compromise path · no dependency on anyone else's uptime.

### Version 0.3 — a project-hosted pilot

Projects may publish `/.well-known/otcs.yaml` on their own domain. The registry record then carries where it came from:

```yaml
source:
  mode: project_hosted
  url: https://project.example/.well-known/otcs.yaml
  expected_owner: ...
  verification_method: domain_control
```

A sync process fetches it, validates it, diffs it against the current snapshot, **opens a pull request**, and records the source hash.

> **It never writes to `main`.**

**Cadence:** a webhook-triggered check where supported · daily reconciliation for missed changes and unreachable files · a weekly integrity audit covering ownership, signatures, stale records, redirects and missing artifacts · a snapshot at each release freezing the accepted registry.

## 3. The rule all of this protects

> **A remote file is a proposal source. It is never write access to the Commons.**

A compromised project website must not be able to:

- Alter relationships
- Claim independent validation
- Inject markup
- Remove a dispute
- Change its own ownership record
- Assert compatibility with anything

**Every one of those is a reviewed change**, whoever proposes it.

## 4. When a remote source goes away

**The project's page is not deleted.** The last accepted snapshot keeps publishing, with the source status shown:

```text
SOURCE_CURRENT · SOURCE_STALE · SOURCE_UNREACHABLE
SOURCE_INVALID · SIGNATURE_FAILED · OWNER_WITHDREW
```

```text
Last successful sync: 2026-09-03
Current source status: unreachable
Published page uses the last accepted snapshot.
```

This protects the record from domain outages, deleted repositories, malformed changes, acquisitions, hostile takeover and ordinary hosting failure.

## 5. Not every field updates the same way

| Who controls it | Fields | How it changes |
|---|---|---|
| **The project** | Name · description · contact · current version · roadmap · status · what it offers · what it needs · preferred citation · official links | A simple pull request |
| **The registry** | Evidence status · independent-validation status · dispute state · external-review classification · observed publication history · freshness · process-integrity status | The owner **cannot** change these alone |
| **Both parties** | `BUILDS_ON` · `INTEGRATES_WITH` · `VALIDATES` · `IMPLEMENTS` · `SUPERSEDES` · `DECOUPLED_FROM` · any promotion to `MUTUALLY_CONFIRMED` | Requires the counterparty ([EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §5) |

This split is encoded in the schema, not left to good manners, and it is visible in the interface.

---

**See also:** [REGISTERING.md](REGISTERING.md) — how a record gets here in the first place · [HOSTING-AND-MIRRORS.md](HOSTING-AND-MIRRORS.md) — where the built site goes · [FEDERATION.md](FEDERATION.md) — sync between whole instances, later
