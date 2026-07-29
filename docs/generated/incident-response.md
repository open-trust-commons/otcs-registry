!!! info "Generated page"
    Compiled from `INCIDENT-RESPONSE.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# When the trust anchors themselves fail

*Version 0.1 · Status: EXPERIMENTAL*

**A project about trust has to be able to say how it recovers when its own keys, hosts or maintainers are compromised.** This is that answer, written before it is needed.

---

## 1. Who holds the keys

| | Stage 1 (now) |
|---|---|
| **Who holds release keys** | The founding maintainer ([MAINTAINERS.md](maintainers.md) §1) |
| **Signatures per release** | One. **Two, from different holders, from Stage 2** |
| **Rotation** | Annually, and immediately on any suspicion of compromise |
| **Publication** | Fingerprints published in [MAINTAINERS.md](maintainers.md); every change is a logged event |
| **Backup** | Offline, in a different physical place from the working machine |
| **Restore testing** | Verified at every release — **an untested backup is not a backup** |

## 2. A key is lost

```text
announce → publish a new key, signed by a still-valid one where possible
        → re-sign the current release → record the transition in the log
```

**Signatures made before the loss date stay valid.** A lost key does not retroactively invalidate history.

## 3. A key or maintainer is compromised

Immediately:

- Revoke the key and the merge rights
- Audit every merge and release inside the exposure window
- Re-verify the log chain
- **Publish an advisory naming what was affected and what could not be verified**
- Replace any release signed during the window

Records from the exposure window are marked `DISPUTED`, **never deleted.** Deleting them would destroy the evidence needed to understand what happened — the same reasoning as [SECURITY.md](security.md) §2, where revocation adds a marked cut rather than rewriting.

## 4. A release has to be pulled

A release may be marked revoked. **It is never deleted.** Its artifacts, hashes and DOI persist with a revocation notice attached.

> Downstream consumers need to be able to tell that what they are holding is revoked — which requires it to still be there.

## 5. The organisation or the forge is compromised

The premise: **GitHub is one implementation. It is not the record.**

```text
restore the repository from a maintainer clone + archived release bundles
   → verify the log chain and artifact hashes against published SHA256SUMS
      and the archival deposits
      → re-establish the organisation, or move hosts
         → publish a full account
```

**This is why archival redundancy is a release requirement** ([HOSTING-AND-MIRRORS.md](hosting-and-mirrors.md)). A forge compromise with no external archive is unrecoverable.

## 6. A malicious workflow

Continuous integration runs only what a contributor can run locally ([CONTRIBUTING.md](contributing.md) §1), so a workflow change that adds behaviour shows up as a reviewable diff on a protected path.

Response: revert · rotate any secret the workflow could reach · audit artifacts built during the window · re-verify hashes.

## 7. What is promised

| | |
|---|---|
| **Most that can be lost** | The working branch. Never more than the last public release plus the current log |
| **Time to a verified restored record** | 72 hours. Longer for a full host migration |

**These are commitments about the record, not about uptime.** The site being down is an inconvenience. The record being unverifiable is an existential failure.

## 8. Reporting an incident

Private channel ([SECURITY.md](security.md) §5). Acknowledged in the log **after** remediation, with an appropriately redacted public record.

---

**See also:** [SECURITY.md](security.md) — the threats and what is admitted to be open · [HOSTING-AND-MIRRORS.md](hosting-and-mirrors.md) — why there is more than one host · [ANCHORING.md](anchoring.md) — external timestamps that survive a compromise here
