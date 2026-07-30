# Calibration case — Spanning Tree Protocol

*Version 0.1 · Status: EXPERIMENTAL · The method is in [CALIBRATION.md](../CALIBRATION.md)*

**What this case tests: can the vocabulary describe where authority came from, and can it describe a governor that is mid-decision?**

It answers no to both, and those are the two findings.

---

## Why Spanning Tree

- **It predates KTP by three decades** — IEEE 802.1D, 1990
- **It runs in effectively every switched network on earth**, usually invisibly
- **It is fully specified** by a public standard
- **It elects its own authority**, which nothing else in the calibration set does

## The mapping

| Coordinate | Spanning Tree | |
|---|---|---|
| **Actor** | `service` 1.0 | Switches. No human in the loop at all |
| **Authority** | `role` | The root bridge holds one. **How it got the role does not map — see below** |
| **Action** | `send` · `revoke` | Forwarding frames, and blocking a port |
| **Environment** | `dependency_health` · `system_health` | Link state, and topology change |
| **Function** | `sense` 1.0 · `decide` 1.0 · `enforce` 1.0 · `repair` 1.0 | **A real enforcement point** |
| **Time** | `during_action` · `repair_window` | Convergence and reconvergence |
| **Evidence** | bridge protocol data units | Continuous and observable |

## What the mapping shows

**Spanning Tree passes the `enforce` test, and TCP does not.** A blocked port drops frames — the switch has both the decision and the power to make it stick. That contrast inside the calibration set is useful: the vocabulary's hardest claim discriminates between two systems that both "govern network traffic," which is exactly what a coordinate should do.

## The results

| Test | Result |
|---|---|
| Can it express a declared enforcement point? | **Pass** — the blocked port, unambiguously |
| Can it express automated governance with no human actor? | **Pass** — `actor: [service]` alone is a complete answer |
| Can it express **how authority was acquired**? | **Fail** |
| Can it express **a governor mid-decision**? | **Fail** |
| Does anything rank it against Bitcoin or TCP? | **Pass, by construction** — no aggregate score exists |

## Finding one — the vocabulary records authority, never its provenance

The root bridge is elected by **lowest bridge ID**, which is a configured priority followed by the switch's MAC address as a tiebreak.

**A MAC address is a manufacturing accident.** So authority here is assigned by a deterministic rule over arbitrary identifiers. It is not `identity`, not `credential`, not `mandate`, not `consent`, not `delegation`, and not `law`.

You can record `role` — the root bridge has one. But that captures the *outcome* and discards the *mechanism*, and the mechanism is the interesting part:

```text
recorded:      authority: [role]
not recorded:  acquired by deterministic election over arbitrary identifiers,
               re-run automatically whenever the topology changes
```

> **The vocabulary describes what authority a party holds. It has no coordinate for how that party came to hold it.**

For a registry whose subject is legitimacy, that is close to the central question. "Who decides" and "how did they come to decide" are different, and only the first is expressible.

This is a genuine gap rather than a mapping failure, and it is the second structural finding the calibration set has produced — the first being that only one coordinate has an extension mechanism ([profiles/financial-crime/profile.md](../profiles/financial-crime/profile.md) §5).

## Finding two — no coordinate for an unconverged state

While Spanning Tree reconverges, **its own guarantee does not hold.** Some ports block, some forward, and for tens of seconds in classic STP a loop is possible. The protocol is not broken during this window; it is *working*, and the invariant it exists to maintain is temporarily suspended.

Every `time` value describes a position relative to a **governed action**:

```text
design · registration · before_action · initiation · during_action
commit_point · after_action · across_trajectory · repair_window
```

None of them describes *the governing system is mid-decision and its own invariant does not currently hold.*

`repair_window` is the closest and it is not the same thing — repair happens after damage, whereas this is the interval during which the governor cannot yet make its promise. **Any distributed governor has this state**, and a registry of distributed governance systems cannot currently record it.

## A third observation, not yet a finding

Spanning Tree exists to prevent **broadcast storms**, which have no gradual onset — a network goes from healthy to unusable in seconds.

The environment vocabulary leans toward gradients: `cumulative_trajectory`, `reversibility`, `repair_capacity` all suggest conditions that accumulate and can be watched. A cliff is a different shape of risk. Whether that is a gap or simply a system the environment coordinate is not aimed at is not clear enough to call, so it is recorded as an observation rather than promoted to a finding.

---

**See also:** [CALIBRATION.md](../CALIBRATION.md) — the method and the other cases · [calibration/tcp-ip.md](tcp-ip.md) — the case with **no** enforcement point · [profiles/financial-crime/profile.md](../profiles/financial-crime/profile.md) — the extension-mechanism finding this one echoes
