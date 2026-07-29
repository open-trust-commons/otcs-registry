!!! info "Generated page"
    Compiled from `VERSIONING.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# What the version numbers mean

*Version 0.1 · Status: EXPERIMENTAL*

Ordinary Semantic Versioning. **Before `v1.0.0` the contract is explicitly unstable, and that instability is deliberate** — the version 0.1 model is a set of provisional hypotheses, stated as such in [CHARTER.md](charter.md) §9.

---

## 1. Before `v1.0.0`

**The public arc is `0.1` → `0.9` → `1.0`. `v0.1.0` is the first public release** ([ROADMAP.md](roadmap.md)).

Anything numbered below `v0.1.0` is incubation history from the private staging repository. It was never published, so **nothing below `v0.1.0` can have broken anyone's records** — which is why [MIGRATIONS.md](migrations.md) has no entry affecting a published record.

| Bump | What it means | Example |
|---|---|---|
| **Patch** `0.2.1` | Corrections that change no meaning and invalidate no existing data | Fixing validator messages |
| **Minor** `0.3.0` | New features or schema changes. **May break things**, always with a migration note | Adding the object-level contribution lifecycle |
| **Major** | Reserved. Nothing uses it until after `v1.0.0` | — |

## 2. Four things carry versions, independently

```text
release version          this repository's tag
manifest schema          otcs_version, in every project record
interface specification  per interface, once they stabilise
project record           each registrant's own versioning of their entry
```

Through `v0.x` the repository release coordinates all four.

**After `v1.0.0` they come apart.** A stable interface must not be forced to re-release because an unrelated part of the repository changed.

## 3. What is promised about compatibility

| | |
|---|---|
| **Before `v1.0.0`** | **Nothing is guaranteed.** Every breaking change ships with an entry in [MIGRATIONS.md](migrations.md) |
| **From `v1.0.0`** | The manifest, the relationship model, the evidence model and the proposal lifecycle are **stable within a major version** |

Breaking any of those after `v1.0.0` needs a major bump **and** a deprecation period ([DEPRECATION.md](deprecation.md), [GOVERNANCE.md](governance.md) §9).

---

**See also:** [RELEASE-PROCESS.md](release-process.md) — how a version actually ships · [MIGRATIONS.md](migrations.md) — every breaking change, with steps · [VERSION-EXIT-CRITERIA.md](version-exit-criteria.md) — what has to be true before a major version
