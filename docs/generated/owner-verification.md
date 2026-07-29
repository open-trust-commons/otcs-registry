!!! info "Generated page"
    Compiled from `OWNER-VERIFICATION.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Proving you speak for a project

*Version 0.1 · Status: EXPERIMENTAL*

**There is no generic "verified" badge.** The record states *how* authority was established, and a reader can judge the method for themselves.

---

## 1. The accepted methods

| Method | What it actually proves |
|---|---|
| `repository_control_confirmed` | A challenge value was committed to the canonical repository |
| `domain_control_confirmed` | A challenge was published at `/.well-known/otcs-challenge` on the canonical domain |
| `organization_email_confirmed` | Confirmed from an address at the project's own domain |
| `signed_statement` | Signed with a key the project had already published |
| `platform_account_confirmed` | Confirmed from the project's official platform account |
| `documentation_naming` | The project's existing documentation names this person as maintainer |
| `transcribed_by_otcs` | A contributor here transcribed the record. **The owner has not confirmed anything** |

Recorded in full, never collapsed to a single flag:

```yaml
owner_verification:
  status: repository_control_confirmed
  verified_at: "2026-08-04"
  evidence:
    - https://github.com/example/project/commit/...
  verified_by: <maintainer>
```

## 2. The weakest state is visible, not hidden

`transcribed_by_otcs` publishes with a banner naming the contributor who supplied it and stating plainly that the owner has not confirmed.

**It is a courtesy for owners without Git literacy. It is not a claim of their participation.**

Owner confirmation upgrades it, and the transcription history stays in the record.

## 3. Verification goes stale

Verification carries a date. Records reconfirm **annually** by default.

A lapsed confirmation shows as `OWNER_CONFIRMATION_STALE`. **The record stays published; the staleness is visible.** It stops counting toward release gates until reconfirmed ([QUALIFYING-PROJECTS.md](qualifying-projects.md) §4).

## 4. Changes of control

Ownership changes are **governance events, not field edits** ([PROJECT-LIFECYCLE.md](project-lifecycle.md) §1).

- The new owner verifies control
- The old owner acknowledges, where reachable
- An unexpected ownership or licence change on a synced record **triggers review before merge** ([SYNC-POLICY.md](sync-policy.md) §3)

---

**See also:** [PROJECT-LIFECYCLE.md](project-lifecycle.md) — transfers, withdrawal and disappearance · [REGISTERING.md](registering.md) — where verification happens in the registration flow · [SECURITY.md](security.md) §2 — impersonation as a named threat
