!!! info "Generated page"
    Compiled from `CHARTER.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# The constitution

*Version 0.1 · Status: EXPERIMENTAL · Changing this document takes 45–90 days (see [GOVERNANCE.md](governance.md))*

This is the constitution. It says what this project is, who decides what, and what it is not allowed to become.

Section numbers are fixed — other documents cite them — so they stay put even when the wording changes.

---

## 1. What OTCS is

A public list of projects that try to control what automated software is allowed to do, written in one shared vocabulary so they can be compared.

For each listed project we keep:

- What it says it does, in its own words
- How well established each of those claims is
- How it connects to other listed projects, and whether both sides agreed
- The full history of every change to its entry

**It is a governed commons, not a directory.** A directory lists things. This one has written rules about who may change what, what counts as evidence, how disagreements are settled, and how the people running it can be removed. Those rules apply to the people running it too.

## 2. The constitutional boundary

Three separate areas of control. **None may absorb another.**

| Who | Controls | Does not control |
|---|---|---|
| **KTP** — the Kinetic Trust Protocol | The vocabulary and the underlying model | Any listed project; how this registry is governed |
| **OTCS** — this project | The list, the rules for being on it, how connections and evidence are recorded | Any project's own description, roadmap, releases or licence; KTP's meanings |
| **Listed projects** | Themselves — their code, roadmap, licence, and which connection points they support | The factual record around them: dates, citations, dependencies, criticism, forks, outside tests |

Listed projects do not become part of KTP. They describe themselves in a vocabulary it defines.

## 3. The three kinds of authority inside OTCS

- **A project's authority over itself.** Maintainers control their own description, releases, roadmap, licence, and what they claim to be compatible with.
- **Authority over evidence.** A project owner **cannot delete an inconvenient fact** that someone else can verify. What counts as evidence, who may rebut it, and how corrections work are in [EVIDENCE-MODEL.md](evidence-model.md).
- **Authority over the rules themselves.** The vocabulary, the record formats, the dispute process and the version scheme change only through the proposal process in [GOVERNANCE.md](governance.md). This authority stops at the boundary of any individual project.

## 4. The governing principle

**A decision about this project may only proceed while the conditions exist to make it properly.**

Every governance action has a size — how much it changes the shared system. The environment for deciding it has a capacity, made of things like: how sure we are who is participating, how good the evidence is, whether affected people were reached, whether there was time to review, and whether objections were answered.

Written formally, and cited elsewhere as such: **`A_g(t) ≤ E_g(t)`** — the size of the action must not exceed what the deliberative environment can support.

| If | Then |
|---|---|
| The conditions support the decision | **ALLOW** — ratify it |
| The scope or the evidence is too thin | **SHAPE** — narrow it and try again |
| Deliberation was bypassed or overwhelmed | **DEAUTOMATE** — return it to human discussion |
| It cannot be legitimately supported at all | **VETO** — reject it |

The bigger the decision, the more of that environment it needs.

**Nothing here is permanent by default.** Emergency powers expire. Every significant decision carries a date by which it must be reviewed, renewed, or lapse.

## 5. The canonical voting principle

Stated in full, because other documents quote it:

> **OTCS voting is trajectory-qualified rather than seniority-weighted. Every participant has immediate voice. Binding votes require demonstrated engagement with the proposal across time, evidence, and objection. Early contributors receive permanent provenance and may earn stewardship roles, but they do not receive permanent control merely for arriving first. Late participants may acquire equal voting standing through an explicit catch-up path.**

In plainer words:

- **Anyone can speak immediately.** No waiting period to be heard.
- **Voting requires having done the work** — engaged with the proposal, the evidence, and the objections to it.
- **Arriving early earns credit, not control.** Being first is recorded permanently and can earn responsibility. It does not buy a permanent vote.
- **Arriving late is not a penalty.** There is a defined path to full standing.

Short version: *attention is the stake, time is the proof, authority stays bounded.* Mechanics are in [VOTING.md](voting.md).

## 6. Conflicts of interest — declared

This project is run by one person during its early life, and that person's other work overlaps its subject. Saying so plainly is a design requirement, not a formality.

**Chris Perkins (nmcitra) is at the same time:**

- The author of KTP — the vocabulary this project adopts
- The maintainer of this project, and so of its rules
- The maintainer of three listed projects: `ktp`, `ktp-demo`, `abt`

**What is done about it:**

| Mitigation | In practice |
|---|---|
| KTP is listed under the same rules as anything else | With honest scores, including a zero for outside evaluation |
| Founder-maintained connections are marked one-sided | `self_asserted` until someone else confirms them, exactly like everyone else's |
| This project's own scores are published | Written down 2 of 5, built 0 of 5, checked by outsiders 0 of 5 |
| The vocabulary is tested against work it did not design for | [CALIBRATION.md](calibration.md) — a standing check on whether it quietly favours KTP |

**Nothing is validated by the fact of being listed here.** The registry does not grade its own homework, and neither does its founder.

## 7. Stewardship and succession

How control passes on, written down now, before this is worth controlling.

| Stage | What it means |
|---|---|
| **1 — now** | Founder-led, declared openly, every decision on the public record |
| **2** | A documented group of maintainers — triggered by the first sustained outside maintainer |
| **3** | Wider governance — the group plus specification editors plus seats for affected projects |
| **4** | An independent foundation or fiscal host |

Moving between stages requires a constitutional-class proposal.

**The trigger cannot be blocked by the founder.** Once someone outside has participated substantively in the rules for **90 days or more**, nominations for maintainer open. The founder cannot veto that opening. Appointment itself still requires a ratification vote.

Registering a project **never** conscripts anyone into helping govern the rules.

A maintainer candidate has to show: sustained participation · understanding of the boundary in §2 · disclosed conflicts · capacity to review changes · willingness to enforce the evidence rules **against allies** · agreement that governance happens in public.

Removal, succession and emergency powers: [GOVERNANCE.md](governance.md). Security incidents: [SECURITY.md](security.md).

## 8. What registration means — and does not mean

Being listed means exactly one thing: **this project made a public, attributable claim about itself.**

It does not mean any of:

- Endorsed
- Validated or tested
- Interoperable with anything
- Original
- Conformant to any standard
- A member of any coalition

Evidence has to match the size of the claim. An essay is not tested infrastructure. A demo is not a standard. Code existing is not code deployed.

## 9. Provisional semantics

**The vocabulary in version 0.1 is a hypothesis, not a finished map of the field.**

The first serious outside registrants are expected to break parts of it. **That is what they are for.**

Changing the vocabulary, the meanings, the evidence levels, the connection points or the relationship terms requires a **model-revision proposal** ([GOVERNANCE.md](governance.md) §11) — near-constitutional, with migration notes, an impact analysis and a mapping from old terms to new.

Treating the founder's current understanding of the field as settled fact is a named way this project fails. It is listed in [NON-GOALS.md](non-goals.md).

## 10. The right not to take part

**A project may refuse to appear here.** "Do not create a page in our name" is honoured.

| Record state | Meaning |
|---|---|
| **REGISTERED** | The project submitted it and confirmed it |
| **OBSERVED** | Built from public evidence, not project-controlled, used only where that is ethical and lawful — and **never presented as participation** |
| **EXAMPLE** | An invented record, for demonstration only |

Nobody unwilling is ever made to look like a participant. Removal and refusal: [GOVERNANCE.md](governance.md) §12.

## 11. Neutrality toward KTP — being listed is not agreement

This project uses KTP's vocabulary as its shared language. **That language remains open to challenge, and being listed is not agreeing with it.**

Being listed here does **not** mean a project endorses KTP, adopts its formalism, agrees with `A ≤ E`, accepts how it has been mapped, or recognises KTP as governing its architecture.

**A project can take part while disagreeing with how it has been described.** The record keeps these apart:

| State | Meaning |
|---|---|
| The project's own words | Always controlled by the project |
| `otcs_observed` | Our mapping, not theirs |
| `project_confirmed` | They agreed with our mapping |
| `disputed` | They disagree — **their objection is published in their own words** |
| `unmapped` | No mapping claimed |

**A disputed mapping is a normal state, not a defect.** If outside mappings keep failing, that is evidence against the vocabulary itself (§9), and the revision process exists to act on it.

## 12. How this could fail

Named in advance, because an institution that has not described its own failure modes cannot be held to them.

| Failure | What happens |
|---|---|
| **Not enough participation** | The proposal is HELD. It never passes by default |
| **Deadlock** | It expires at its review date and returns to discussion rather than hanging forever |
| **A maintainer's own project is affected** | They must recuse, and the recusal is recorded |
| **A maintainer needs removing** | Through the dispute process, escalating to the next stage |
| **Emergency powers** | Scoped, recorded, and expiring automatically after 7 days |
| **A contested election** | Settled on dated evidence. A tie holds rather than favouring the incumbent |
| **One employer or vendor takes over** | Disclosed affiliations make concentration visible; it is grounds to halt a decision |
| **Maintainers go inactive** | Objective criteria trigger a review, not silent removal |
| **A project leaves** | It may withdraw; its history survives ([REGISTRY-POLICY.md](registry-policy.md)) |
| **The whole thing ends** | The record is archived publicly with a written account. Everything stays available |

**Forking is explicitly allowed and expected.** Everything needed to fork — records, formats, history, tooling — is openly licensed and portable by design.

**A fork is not a failure of this Commons. Being unable to fork would be.**

Forks should use a different name ([TRADEMARKS.md](trademarks.md)) and their own identifiers ([IDENTIFIERS.md](identifiers.md)), and are encouraged to say what they changed and why.

## 13. Licences

- Code, formats and tooling — Apache-2.0 (`LICENSE`)
- Written specifications — CC BY 4.0 (`LICENSE-SPECS`)

Kinetic Trust Protocol © Chris Perkins (nmcitra). Distinctive KTP constructs are cited where used.
