# Retiring things without erasing them

*Version 0.1 · Status: EXPERIMENTAL*

**Nothing is removed silently, and nothing is removed in a patch.**

---

## 1. The lifecycle states

```text
PROPOSED · EXPERIMENTAL · ACTIVE · STABLE · DEPRECATED
UNMAINTAINED · REVOKED · ARCHIVED · DISPUTED
```

Defined in [GOVERNANCE.md](GOVERNANCE.md) §9.

## 2. Deprecating a stable interface or schema

**1 · Announce**, naming the ratified proposal that authorises it, and either the replacement or an explanation of why there isn't one.

**2 · Wait.** Minimum one minor release. **Minimum two** for anything with independent implementations.

**3 · Consult everyone affected.** Every project declaring the interface is notified individually. A credible claim of severe breakage forces the hold-test-revise path ([GOVERNANCE.md](GOVERNANCE.md) §6).

**4 · Write the migration entry** in [MIGRATIONS.md](MIGRATIONS.md), including a command that verifies the migration worked.

**5 · Remove**, only after the period has elapsed, in a release whose notes name exactly what went ([RELEASE-PROCESS.md](RELEASE-PROCESS.md) §2).

## 3. Deprecated is not deleted

A deprecated artifact **stays readable, documented, and resolvable by its identifier, permanently.**

> A consumer has to be able to discover *that* something was deprecated and *what replaced it.* Neither is possible if it vanished.

## 4. Records that decay on their own

Projects become `UNMAINTAINED` by **objective inactivity criteria, not by anyone's judgment**, and the record stays published either way.

Withdrawal, archival and disappearance follow [PROJECT-LIFECYCLE.md](PROJECT-LIFECYCLE.md). In every one of those cases:

- **The identifier is never reassigned** ([IDENTIFIERS.md](IDENTIFIERS.md))
- **History is preserved**

---

**See also:** [MIGRATIONS.md](MIGRATIONS.md) — the steps that go with a breaking change · [VERSIONING.md](VERSIONING.md) §3 — what stability means after `v1.0.0` · [PROJECT-LIFECYCLE.md](PROJECT-LIFECYCLE.md) — a project's own path through these states
