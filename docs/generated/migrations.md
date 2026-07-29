!!! info "Generated page"
    Compiled from `MIGRATIONS.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Migrations

*Version 0.1 · Status: EXPERIMENTAL*

**Every breaking change gets an entry here before its release is tagged.** Entries are append-only — a migration note is never rewritten once published, because somebody may be following it.

---

## 1. The format

```markdown
## vX.Y.Z — <what broke>
**Affected:** schemas / records / interfaces
**Why:** the proposal that ratified it (OTCS-NNNN)
**Steps:** exact, runnable
**Verification:** the command that proves the migration worked
**Backout:** how to get back to the prior state
```

Two of those fields do the real work:

- **Verification** — a migration you cannot prove worked is a suggestion
- **Backout** — a migration with no way back is a one-way door, and should be flagged as one

## 2. Entries

*None affecting a published record. **`v0.1.0` is the first public release**, so nothing before it can have broken anyone's data ([VERSIONING.md](versioning.md) §1).*

One change of meaning happened during incubation and is recorded here anyway, because a reader comparing a pre-release artifact against `v0.1.0` needs to be able to find it.

### v0.1.0 — two coordinate values renamed *(pre-release)*

**Affected:** `schemas/project-manifest.schema.json`, and every record declaring `time`

**Why:** Two tokens each meant two different things. `commit` was a value of both `time` and `verbs`; `repair` was a value of both `time` and `functions`. A validator could not tell the two senses apart, and neither could a reader.

| Was | Is now | In |
|---|---|---|
| `commit` | `commit_point` | `time` |
| `repair` | `repair_window` | `time` |

**The `verbs` and `functions` values were not touched.** Only the `time` senses were renamed, because `time` is the coordinate where the word was doing the weaker job.

**Steps:** in every project record, inside `coordinates.time` only:

```bash
# review first — this must not touch verbs or functions
grep -rn "time:.*\b\(commit\|repair\)\b" registry/
```

Then rename those two values by hand. There are few enough records that a scripted substitution is more dangerous than a manual edit.

**Verification:**

```bash
npm run validate     # a stale value now fails the enum; 0 failures means done
```

**Backout:** restore the previous enum in the schema and revert the record edits. Nothing else read these values, so the change is fully reversible.

> **Note on timing.** The rename landed on 2026-07-27, during incubation, and this entry was written two days afterwards rather than alongside it. **Nobody was affected, because nothing had been published** — but the entry was late by the standard at the top of this page, and the gap is recorded rather than tidied away. The rule only protects anyone if it is followed while the stakes are still zero.

---

Every other change during incubation was additive. **No other record changed meaning.**

## 3. Pending

| Version | What it carries |
|---|---|
| `v0.3.0` | The OTCS-0002 migration — object-level contribution lifecycle, artifact typing, claim kinds, evidence anchoring |

That proposal's impact analysis says the changes are additive and non-breaking. **The migration entry will confirm that or correct it when it lands** — an impact analysis is a prediction, not a result.

---

**See also:** [VERSIONING.md](versioning.md) — when a change counts as breaking · [DEPRECATION.md](deprecation.md) §2 — the removal path a migration usually accompanies · [RELEASE-PROCESS.md](release-process.md) §2 — where in the release this gets written
