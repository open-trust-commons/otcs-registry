# Calibration case — TCP congestion control

*Version 0.1 · Status: EXPERIMENTAL · The method is in [CALIBRATION.md](../CALIBRATION.md)*

**What this case tests: can the vocabulary describe governance that has no authority term at all, and no power to stop anyone?**

It is chosen as the near-inverse of the Bitcoin case. Bitcoin has authority and almost no environment. **TCP has almost no authority and lives entirely in environment.**

---

## Why TCP

- **It predates KTP by four decades** — congestion control dates to 1988
- **It is the most widely deployed governance regime in computing**, running on effectively every networked device
- **It is exhaustively documented** in RFCs, with no private knowledge involved
- **It is extreme in the space** — and extreme in a different direction from Bitcoin, which is the point of having two

## The mapping

| Coordinate | TCP congestion control | |
|---|---|---|
| **Actor** | `service` 1.0 | No `human`, no `organization`, no `ai_agent` |
| **Authority** | **empty** | An IP address is not a credential. **Nothing checks permission to send** |
| **Action** | `send` | |
| **Environment** | `system_health` · `dependency_health` · `downstream_capacity` | Loss, round-trip time, and the receive window |
| **Function** | `sense` 1.0 · `decide` 1.0 · `constrain` 1.0 · `repair` 1.0 · `record` 0.6 | **`enforce` 0** |
| **Time** | `during_action` · `across_trajectory` | Continuous, and it accumulates state |
| **Evidence** | sequence numbers, acknowledgements, checksums | Strong and cheap |

## What the mapping shows

**`downstream_capacity` maps exactly.** TCP's receive window *is* a declaration of what the downstream party can absorb. That coordinate value was not chosen with TCP in mind, and it lands on the nose — the strongest evidence in either calibration case that the environment vocabulary describes something real rather than something invented.

**Authority is genuinely empty, and the system governs anyway.** Bitcoin's finding was authority without identity. TCP's is stronger: **governance with no authority coordinate whatsoever.** Nothing grants a host permission to send, nothing revokes it, and no credential is presented. Yet TCP unquestionably governs — it dictates how fast you may transmit.

## The results

| Test | Result |
|---|---|
| Can it express an **empty** authority list without implying deficiency? | **Pass** — any subset is permitted, and absence means *does not address* rather than *fails to* |
| Can it express environment as the dominant coordinate? | **Pass** — and `downstream_capacity` fits with no strain |
| Does the `enforce` test behave correctly here? | **Pass** — TCP scores `decide`/`constrain`, never `enforce`, because it genuinely cannot stop anyone. The rule works |
| Does anything rank TCP as lesser for scoring zero on authority? | **Pass, by construction** — no aggregate score exists |
| Can it express **who is being governed**? | **Fail — see below** |

## The finding this produced

**The governor and the governed are the same party, and the vocabulary has no way to say so.**

TCP congestion control is *self-imposed*. There is no external enforcer. A host that ignores it gains bandwidth, and nothing in the protocol prevents that — the only reason the internet does not collapse is that almost everyone runs code which restrains itself.

The vocabulary assumes a governing project acting on a governed action. It cannot express **governance by shared implementation, voluntarily observed, with no enforcement point** — which happens to be the most successful voluntary governance regime in the history of computing.

The `enforce` test handles this correctly and honestly: TCP scores `decide` and `constrain`, not `enforce`. **But recording the most effective voluntary restraint regime ever deployed as merely "decides" loses the thing that makes it remarkable** — that compliance is unenforced and near-universal anyway.

This is not an argument for softening the `enforce` test. It is an argument that the vocabulary describes *what a project does* and has no coordinate for *why anyone goes along with it*.

## A second, smaller finding

**`repair` is TCP's steady state, not its exception.**

[LAYERS.md](../LAYERS.md) argues repair is "work performed **downstream** of that decision" — rollback, compensate, restore. In TCP, retransmission is not what happens when something goes wrong. **Loss is the expected operating condition**, and repair runs continuously as part of normal function.

The layer argument still holds — repair is system work, not a decision input. But its framing as post-decision cleanup does not fit a system where repair is the loop.

---

**See also:** [CALIBRATION.md](../CALIBRATION.md) — the method and the other cases · [calibration/spanning-tree.md](spanning-tree.md) — the case that *does* have an enforcement point · [LAYERS.md](../LAYERS.md) — the repair-as-function argument
