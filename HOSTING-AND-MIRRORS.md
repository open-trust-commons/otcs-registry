# Where this is published

*Version 0.1 · Status: EXPERIMENTAL*

```text
GitHub         canonical source and governance record
Vercel         primary public site  →  https://opentrustcommons.org
GitHub Pages   public mirror        →  https://open-trust-commons.github.io/otcs-registry/
```

The hostnames differ. **The source data and the commit behind them must be identical.**

---

## 1. Neither website is the record

> **The record is the repository.** Both sites are renderings of one commit.

The mirror says so out loud. It carries a `canonical` link to the primary site and a visible banner:

```text
MIRROR OF THE CANONICAL OTCS SITE · built from commit 93ad2c7
```

## 2. Both hosts publish what they were built from

```yaml
build:
  commit: 93ad2c7
  registry_version: 0.2.0
  schema_version: 0.1.0
  generated_at_source: git_commit_time
  content_hash: sha256:...
```

A monitoring job compares the two manifests. **Divergence raises an alert**, and the mirror displays `Mirror status: current | stale` so a reader is never quietly served an old build.

## 3. Why the build has to be reproducible

Same input, byte-identical output. That is what makes the two manifests comparable at all.

- No live timestamps in page content — build time comes from the Git commit
- Every generated list sorted
- Normalised line endings
- Pinned dependencies
- No absolute paths that depend on the machine
- Deterministic graph layout
- A build manifest emitted every time

All of it is enforced by the deterministic-build test, which runs on every pull request ([CONTRIBUTING.md](CONTRIBUTING.md) §1).

## 4. Preview builds from outside contributors

**Do not auto-deploy previews from arbitrary forks.** Every external manifest is hostile input until it has been checked ([SECURITY.md](SECURITY.md) §1).

```text
external fork opens a PR → CI validation
   → a maintainer marks it preview-safe
      → trusted preview branch → preview published
```

## 5. Why two hosts

**So one can fail without the record becoming unreadable.**

If both fail, the repository and the archived release bundles remain. That is why archival redundancy is a release requirement rather than a nicety, and why [INCIDENT-RESPONSE.md](INCIDENT-RESPONSE.md) §5 can describe a recovery at all.

---

**See also:** [INCIDENT-RESPONSE.md](INCIDENT-RESPONSE.md) — recovering when a host is compromised · [SYNC-POLICY.md](SYNC-POLICY.md) — how content reaches these hosts · [FEDERATION.md](FEDERATION.md) — why no host is permanent
