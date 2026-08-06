!!! info "Generated page"
    Compiled from `RELEASE-PROCESS.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# How a release ships

*Version 0.1 · Status: EXPERIMENTAL*

> **Discussion explores. A proposal formalises. A pull request changes the record. A release establishes a version.**

Nothing becomes canonical because somebody said it in a discussion.

---

## Before v1.0.0 — published means the repository, not a Release page

**Everything below v1.0.0 is built in the open.** A pre-1.0 version is published the moment its signed tag is on the public repository — the tag, the decision record, the notes and the anchors are all public and independently verifiable from a clone.

**The forge's "Release" page is packaging, and the packaging begins at v1.0.0.** Until then the workflow still builds and hashes the artifact set on every tag, and the set is retained unpublished so its anchored hashes stay resolvable — but no Release is published, because a Releases page implies a cadence of finished products that a version-0 contract has not earned.

This is the same distinction the rest of the process already draws: the repository is the record, and every other surface is a rendering of it.

## 1. What is in a release

```text
Source archive              Specification bundle        Schema bundle
Registry snapshot           Generated-site archive      SHA256SUMS
Governance decision record  Release notes               CITATION.cff
OpenTimestamps proof (or a recorded ANCHOR_PENDING)     DOI
Migration guide, when one is needed
```

## 2. The ten steps

**1 · Verify locally.**

```bash
npm run validate && npm test && npm run ledger:verify && npm run coherence && npm run build:site
```

Continuous integration runs the identical commands. **CI never does anything a contributor cannot run** ([CONTRIBUTING.md](contributing.md) §1).

**2 · Update `CHANGELOG.md`**, and [MIGRATIONS.md](migrations.md) if anything breaks.

Also set `version`, `date-released` and `doi` in `CITATION.cff`. **The date is written when the release is cut, never in advance** — a release date set ahead of time is a guess that ships as a fact.

**3 · Write the release notes** from the template — **including the non-claims section, which is mandatory.**

Run the accessibility verification at this point too. Its failures block a release ([ACCESSIBILITY.md](accessibility.md) §4).

**4 · Governance.** A release changing protocol semantics names its ratified proposal and the determination that the process was valid ([RELEASE-GOVERNANCE.md](release-governance.md)).

**5 · Sign the tag.** Verified signatures are required for release tags, governance decisions, maintainer merges, interface adoptions and emergency actions. **They are not required from ordinary contributors** — onboarding friction is a real cost ([DCO.md](dco.md)).

While the key is out: run the offline-backup restoration verification ([INCIDENT-RESPONSE.md](incident-response.md) §8) — §1 of that document promises it at every release, and this is the step where the promise is either kept or skipped.

**6 · Hash.** Publish `SHA256SUMS` covering every artifact, **plus a hash of the manifest itself**, so the artifact *set* is tamper-evident and not only its members.

**7 · Anchor.**

```bash
npm run anchor v<version>
```

This runs **after** hashing, because the manifest it stamps commits the hash of the artifact set. If the timestamp servers are unreachable the release still ships, marked `ANCHOR_PENDING`, and the proof attaches later ([ANCHORING.md](anchoring.md)).

> **A missing anchor never blocks a release, and never blocks a security patch.**

**8 · Archive.** Deposit for a DOI. **An immutable archive can be an anchor; a live URL never is.**

**9 · Record the anchor in the log** — *after* the round completes. The event necessarily follows the manifest that describes it, because a manifest cannot commit the hash of a log that already contains it.

**10 · Announce**, linking the signed tag, the DOI and the decision record.

---

**See also:** [RUNBOOK.md](runbook.md) §4 — the operator's view of this · [RELEASE-GOVERNANCE.md](release-governance.md) — who decides a release may go out · [VERSIONING.md](versioning.md) — what the number means · [INCIDENT-RESPONSE.md](incident-response.md) §4 — pulling a release after the fact
