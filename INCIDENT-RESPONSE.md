# When the trust anchors themselves fail

*Version 0.1 · Status: EXPERIMENTAL*

**A project about trust has to be able to say how it recovers when its own keys, hosts or maintainers are compromised.** This is that answer, written before it is needed.

---

## 1. Who holds the keys

| | Stage 1 (now) |
|---|---|
| **Who holds release keys** | The founding maintainer ([MAINTAINERS.md](MAINTAINERS.md) §1) |
| **Signatures per release** | One. **Two, from different holders, from Stage 2** |
| **Rotation** | Annually, and immediately on any suspicion of compromise |
| **Publication** | Fingerprints published in [MAINTAINERS.md](MAINTAINERS.md); every change is a logged event |
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

Records from the exposure window are marked `DISPUTED`, **never deleted.** Deleting them would destroy the evidence needed to understand what happened — the same reasoning as [SECURITY.md](SECURITY.md) §2, where revocation adds a marked cut rather than rewriting.

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

**This is why archival redundancy is a release requirement** ([HOSTING-AND-MIRRORS.md](HOSTING-AND-MIRRORS.md)). A forge compromise with no external archive is unrecoverable.

## 6. A malicious workflow

Continuous integration runs only what a contributor can run locally ([CONTRIBUTING.md](CONTRIBUTING.md) §1), so a workflow change that adds behaviour shows up as a reviewable diff on a protected path.

Response: revert · rotate any secret the workflow could reach · audit artifacts built during the window · re-verify hashes.

## 7. What is promised

| | |
|---|---|
| **Most that can be lost** | The working branch. Never more than the last public release plus the current log |
| **Time to a verified restored record** | 72 hours. Longer for a full host migration |

**These are commitments about the record, not about uptime.** The site being down is an inconvenience. The record being unverifiable is an existential failure.

## 9. Restoration tested

**§7's 72-hour promise is untested until someone actually restores from nothing.** On 2026-08-01 the maintainer did.

**Scope.** A fresh clone of the public repository into a machine that had never held a copy — no working directory, no cached `node_modules`, no prior state of any kind. Deliberately *not* tested: organisation deletion, a compromised or lost signing key, or restoring from an archival deposit (none exists yet — §7's "last public release plus the current log" currently means the git remote itself, since no DOI has been issued).

**What was verified, from zero:**

| Step | Result |
|---|---|
| Clone the public remote | Current — included the commit pushed moments before |
| `npm ci` | Clean install, no drift |
| `npm run ledger:verify` | 32 events, chain intact |
| `npm run validate` | All records pass |
| `npm run anchor:status` | **All three anchors `ANCHOR_CONFIRMED`, both witnesses** — proving the `.ots` and `.sig` proof files were genuinely committed and pushed, not left on the machine that made them |
| `npm run build:site`, twice | Byte-identical hash both times |

**Time.** Hands-on-task time — clone through second build — was a few minutes. Wall-clock elapsed was longer because an unrelated `/doctor` health-check ran in the middle of the exercise; that gap is disclosed rather than folded into the number, since reporting the interrupted wall-clock as the RTO would overstate how long restoration actually takes and reporting only the hands-on time without saying so would hide that the exercise was not done in one uninterrupted sitting.

**The gap this exercise found.** §1 commits to an offline key backup, "verified at every release." Checked directly: **the signing key exists in exactly one place** — this machine, `~/.ssh/otcs-signing`. No offline copy exists anywhere. If this machine were lost before one is made, §2's recovery path (publish a new key, signed by the old one) becomes unavailable, because the old one would be gone too.

This is not fixed by this document. It is recorded here because the alternative — noting §1's promise as met without checking — is exactly the kind of untested assumption an untested backup already warns against.

## 10. Reporting an incident

Private channel ([SECURITY.md](SECURITY.md) §5). Acknowledged in the log **after** remediation, with an appropriately redacted public record.

---

**See also:** [SECURITY.md](SECURITY.md) — the threats and what is admitted to be open · [HOSTING-AND-MIRRORS.md](HOSTING-AND-MIRRORS.md) — why there is more than one host · [ANCHORING.md](ANCHORING.md) — external timestamps that survive a compromise here
