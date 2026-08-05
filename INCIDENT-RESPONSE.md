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

## 8. The offline key backup — procedure

**Written before the backup exists, so the steps are a checklist and not a memoir.** This closes the gap §9 found: the signing key exists in exactly one place, and §2's recovery path dies with the machine that holds it. Order is fixed by the v1.0 criterion (`roadmap/releases/1.0.0.yaml`): **back up the current key offline first, then drill rotation** — a rotation drill before a verified backup risks the only copy of the thing being drilled.

**The key never touches an agent, a workflow, or any automated process.** The same asymmetry as anchoring: the witness that records an identity requires the identity's holder. Every step below is the maintainer's hands.

### The backup checklist

- [ ] **Prepare two removable media**, each fully encrypted (an encrypted volume with a strong passphrase; the medium's own hardware encryption is not a substitute).
- [ ] **Copy the signing keypair** to each medium. The private key exists unencrypted only inside the encrypted volume, never on an intermediate disk or clipboard.
- [ ] **Keep the passphrase apart from the media** — memorised plus one written copy stored in a third place. A passphrase taped to the backup is not encryption.
- [ ] **Verify each medium before it leaves the room** (procedure below). An unverified backup is not a backup — §1's own words.
- [ ] **Store the media in two different physical places**, at least one of them not the building that holds the working machine.
- [ ] **Record the fact, not the location:** date, key fingerprint, that two verified copies exist, in this document's §9 — locations stay out of the record.

### The restoration-verification procedure

Run at creation and **at every release** ([RELEASE-PROCESS.md](RELEASE-PROCESS.md) §2, the signing step):

1. On a machine or account that does not hold the working key, mount the encrypted volume.
2. Restore the key to a temporary location and check its **fingerprint against the published one** in [MAINTAINERS.md](MAINTAINERS.md).
3. **Sign a test artifact with the restored copy and verify the signature against the published public key.** A backup that can be read but not used to sign has not been verified.
4. Remove the temporary copy so the restored key outlives the test nowhere.
5. Note the verification date in §9's record.

### When the checklist has been executed

- Update §9's finding to record closure — date, fingerprint, "two verified offline copies exist."
- Append the ledger event (drafted in the overnight run report) recording that §1's backup commitment is now met.
- Set the stage for the rotation drill (`key_rotation_tested`), which may now run without risking the only copy.

Until then, §9's finding stands: **no offline copy exists**, and this section is a plan, not a state.

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

The procedure that closes this gap is now written — §8 — and the gap remains **open** until its checklist has been executed by the key's holder and the verification recorded here.

## 10. Reporting an incident

Private channel ([SECURITY.md](SECURITY.md) §5). Acknowledged in the log **after** remediation, with an appropriately redacted public record.

---

**See also:** [SECURITY.md](SECURITY.md) — the threats and what is admitted to be open · [HOSTING-AND-MIRRORS.md](HOSTING-AND-MIRRORS.md) — why there is more than one host · [ANCHORING.md](ANCHORING.md) — external timestamps that survive a compromise here
