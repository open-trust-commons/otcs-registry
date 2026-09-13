# Calibration case — NeMo Guardrails *(OTCS-0003 trial draft)*

*Version 0.1 · Status: **DRAFT — subject selected by the founder before this enters the set** (OTCS-0003 trial requirement 2: "one external architecture with heavy Layer 3 coverage and thin Evidence"). The method is in [CALIBRATION.md](../CALIBRATION.md). Mapped from public documentation only; nothing rests on private knowledge.*

**What this case tests: can the three-layer split describe a system that is almost entirely Layer 3 — a stack of functions bolted around a model — without making its thin Layer 1 and thin Evidence read as deficiency, and without Layer 2 turning into a checklist?**

---

## Why this subject

- **Open source and maximally documented** (NVIDIA, Apache-2.0): every claim below is checkable against the repository and its docs.
- **It is functions all the way down.** Input rails, dialog rails, retrieval rails, output rails, execution rails: the product *is* a set of capabilities wrapped around an actor it does not own. If the split cannot describe that, the split is wrong.
- **Its Evidence is thin by construction.** A programmable toolkit has a specification and an implementation and no independent validation of any particular deployment's behaviour, because the behaviour is whatever the operator programmed.
- **It predates OTCS and was not designed toward these coordinates.**

### This is not a record

As with Bitcoin: a document, claiming nothing about participation. **Nothing here says the project has joined anything.** If its maintainers ever register, their record replaces this page's reading of them.

## The mapping — three layers

| Layer | NeMo Guardrails | |
|---|---|---|
| **1 — Actor** | `ai_agent` 1.0 · `service` 0.6 · `human` 0.3 | The governed actor is the model and the application around it |
| **1 — Authority** | `mandate` | The operator's configuration is the only authority source; no identity, no delegation, no situational approval |
| **1 — Action** | `send` · `publish` · `execute` | Responses out, and tool/action calls when execution rails are configured |
| **1 — Environment** | `threat_pressure`, and little else | Jailbreak and injection detection sense adversarial pressure; almost nothing else about the environment is read |
| **1 — Time** | `before_action` · `during_action` | Input rails before the model acts, output rails before the response leaves; no `across_trajectory` |
| **1 — Evidence** | thin: specification present, implementation open, **independent validation none known** | The honest state for a toolkit |
| **2 — Governance intent** | *In its own words, from the project's stated purpose:* keep a conversational application on topic, safe, and secure. **Not tagged, not counted.** | A project declaring one intent is complete |
| **3 — Functions** | `interpret` 0.9 · `constrain` 0.9 · `enforce` 0.8 · `decide` 0.7 · `observe` 0.6 · `record` 0.3 · `repair` 0.2 · `coordinate` 0.2 · `learn` 0 | Almost the whole of the project lives here. `enforce` above 0 is warranted: the rails sit inline and block or rewrite |

## The results

| Test | Result |
|---|---|
| Can a system that is nearly all Layer 3 be described without its thin Layer 1 reading as deficient? | **Pass** — every Layer 1 absence is "does not address," and the record is complete with three action verbs and one environment signal |
| Does thin Evidence make the record look worse than the single vector did? | **Pass** — Evidence is unchanged by the split; it was thin before and is thin after, stated the same way |
| Can Layer 2 hold a one-line intent without becoming a tag? | **Pass** — free text, never enumerated, never compared |
| Does the single vector lose anything that the split recovers? | **Yes, one thing:** under v0.1, `functions` sat *inside* coordinates, so a record that is 90% functions read as a record that had answered the "what is governed" question mostly with "what we do." Separating the subjects makes the thinness of Layer 1 visible *as a fact about the system*, not as a gap in the record |
| Does the split make the subject look deficient where the vector did not? | **No.** Neutrality check passes |

## What this produced

**A heavy-Layer-3 system is exactly the case the single vector described worst,** because it had to spend coordinate slots on capabilities. The split does not change what such a system asserts; it changes where the reader looks. That is the whole claim of OTCS-0003 and this case supports it.

---

**See also:** [CALIBRATION.md](../CALIBRATION.md) · [bitcoin.md](bitcoin.md) — the near-inverse case: thin Layer 3, maximal Evidence · [LAYERS.md](../LAYERS.md)
