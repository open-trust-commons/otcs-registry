!!! info "Generated page"
    Compiled from `MAINTAINERS.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Who maintains this, and what that does not entitle them to

*Version 0.1 · Status: EXPERIMENTAL*

**One person maintains this project today.** That is written down here rather than implied, because a registry that asks everyone else to declare their position has to declare its own.

---

## 1. The current list

| | |
|---|---|
| **Name** | Chris Perkins (`nmcitra`) |
| **Role** | Founding maintainer · protocol authority |
| **Since** | 2026-07-25 |
| **Signing identity** | `SHA256:xYmRe0iaVZGTw77FEhx3Ez2/E6K28GL8EO9YuN8/FMM` (SSH ed25519) |

**Check a signature against that fingerprint, not against a name.** The public key is also registered with the forge, but a forge showing "Verified" is that forge's assertion. The fingerprint above is the thing to compare — and comparing it is the reader's job, not something this page can do for them.

**Rotation is annual, and immediately on any suspicion of compromise** (§5). When it rotates, the new fingerprint replaces this one and the transition is a logged event — the old one stays valid for everything it signed before the rotation date ([INCIDENT-RESPONSE.md](incident-response.md) §2).

**Declared conflicts of interest:**

- Author of **KTP**, the coordinate vocabulary this registry adopted
- Maintainer of three registered projects: `ktp`, `ktp-demo`, `abt`

Both are stated in [CHARTER.md](charter.md) §6 and are the reason [CALIBRATION.md](calibration.md) exists as a permanent, failable test rather than a promise.

**This is Stage 1 of four** ([CHARTER.md](charter.md) §7) — founder-led incubation, named as such, with every decision on the public record.

## 2. What a maintainer may do

- Merge to the canonical repository **once the process conditions have been met**
- Publish releases
- Act under scoped emergency security authority (§5)

## 3. What a maintainer may not do

- **Skip a clock.** Waiting periods are not waivable by whoever is merging
- **Skip a ballot**
- **Decide that a proposal was valid** when the process says otherwise
- **Remove an independently verifiable fact because it is unfavourable**

> That last one is the important one. **Evidence authority is not a maintainer power.** A maintainer who could delete inconvenient facts would make every other rule in this repository decorative.

## 4. How more maintainers get added

Nobody is appointed. **The first sustained outside participation opens a nomination process**, and the founder cannot veto that opening once the trigger is met.

```text
trigger: sustained external protocol-class participation across ≥ 90 days
   → nominations open
      → candidates demonstrate the six things below
         → appointment by ratification ballot
```

What a candidate has to show:

- Sustained participation
- Understanding of the constitutional boundary — what this project has permanently refused ([NON-GOALS.md](non-goals.md))
- Disclosed conflicts of interest
- Capacity to review changes
- **Willingness to enforce the evidence model against people they agree with**
- Agreement to the no-invisible-governance rule ([COMMUNICATIONS.md](communications.md) §7)

**Registering a project never conscripts anyone into governance.** Listing yourself and helping run the place are unrelated.

## 5. Review, removal, and emergencies

| | |
|---|---|
| **Review** | Annually, and again whenever a maintainer's conflicts change |
| **Removal** | Through the dispute process, with the record preserved rather than erased |
| **Emergency authority** | Scoped, recorded in the ledger, and **expires automatically after 7 days** unless a ballot ratifies it ([SECURITY.md](security.md) §4) |

The auto-expiry is deliberate. **An emergency power that has to be renewed in public cannot quietly become permanent.**

---

**See also:** [RUNBOOK.md](runbook.md) — how to actually operate this, step by step · [GOVERNANCE.md](governance.md) — the process a maintainer serves · [VOTING.md](voting.md) §1 — why authority is separate from voice and standing · [CONTRIBUTING.md](contributing.md) — how to take part without being one
