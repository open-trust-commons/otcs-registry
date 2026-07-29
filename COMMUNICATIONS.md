# Where things get said, and where they count

*Version 0.1 · Status: EXPERIMENTAL · The governing rule is §7*

Six places conversation happens. **Only one of them is the record.**

The failure this prevents is governance quietly leaking into whichever channel is most convenient and least written down.

Section numbers are fixed — other documents cite them.

---

| | Plane | What it is | Canonical? |
|---|---|---|---|
| **1** | A — the repository | Specifications, records, proposals, decisions, ballots, the log | **Yes. Only this** |
| **2** | B — discussion | Long-form threaded debate | No |
| **3** | C — chat | Real time | No |
| **4** | D — broadcast | Announcements and notices | No |
| **5** | E — meetings | Calls | No |
| **6** | F — private | Emergencies only | No |

## 1. Plane A — the repository

Holds the authoritative record: specifications, project records, schemas, proposals, pull requests, decisions, ballots, conformance results, release history, and the governance log.

> **A statement is not part of the decision record until it is attached to the relevant proposal.**

## 2. Plane B — discussion

Long-form, threaded, quotable, moderated, with persistent URLs and a searchable archive. Repository discussions at version 0.1; something like Discourse at scale.

Every topic references a proposal or record ID. **A serious argument acquires force only when the author or sponsor writes it into the proposal record** — not when it is posted.

## 3. Plane C — chat

Open, federated, self-hostable, rooms per area. **Never canonical.**

Anything material that surfaces in chat — a decision, an objection, evidence — has to be written back to the proposal record **by whoever wants it to count.**

## 4. Plane D — broadcast

Subscribable by project, interface, domain, proposal class, governance change or security notice. Mailing list, feeds, webhooks.

Broadcast exists so that **governance never depends on someone happening to watch a chat room.** Every event that starts a clock ([GOVERNANCE.md](GOVERNANCE.md) §3) is broadcast when it starts.

## 5. Plane E — meetings

Calls are allowed. **Binding decisions in calls are not.**

> No binding decision exists only in a meeting.

Any meeting touching a proposal publishes: agenda · who attended · a recording where appropriate · minutes · proposal links · what was decided · unresolved objections · assigned actions.

Those minutes enter Plane A. **Only then does any of it count.**

## 6. Plane F — private

Private channels are legitimate for exactly four things:

- Vulnerability details
- Personal safety
- Active exploitation
- Credential compromise

Every governance action taken privately must later produce a public, appropriately redacted record: **what authority acted · what changed · why · for how long · on what evidence · when it gets reviewed** ([GOVERNANCE.md](GOVERNANCE.md) §8, [SECURITY.md](SECURITY.md) §4).

## 7. The rule everything else serves

> **A claim, objection, agreement or decision cannot acquire any governance force until it enters the public proposal record.**

Private channels may coordinate logistics. They may not create decisions nobody can see.

This rule exists because of an observable pattern in adjacent fields:

```text
private coordination
    → public appearance of independent agreement
        → vague claims that "the ecosystem agreed"
            → authorship relationships nobody can see
```

**This project denies that pattern any formal force by construction** — not by promising to behave, but by making the private version count for nothing.

## 8. AI in these channels

Per [VOTING.md](VOTING.md) §10: summaries link their sources, are labelled as generated, are correctable, never replace the record, never vote, and never establish consensus.

An AI summary of a discussion is **Plane B convenience material** until a human moves its content into Plane A under their own name. See [AI-USE.md](AI-USE.md).

---

**See also:** [GOVERNANCE.md](GOVERNANCE.md) §14 — the same rule, stated as governance · [SECURITY.md](SECURITY.md) §5 — how to report a vulnerability · [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — conduct in every plane
