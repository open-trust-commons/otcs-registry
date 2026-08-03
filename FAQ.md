# Questions people actually ask

*Version 0.1 · Status: EXPERIMENTAL*

Plainest first, most detailed last. Every answer points at the document that governs it — this page summarises, those documents decide.

**If you are deciding whether to list a project, read [§13](#13-should-i-register-right-now) first.** The honest answer today is *not yet*, for a specific and temporary reason.

---

## Just landed

### 1. What is this?

A public list of projects working on trust and governance for automated systems, each described in one shared vocabulary. Every project describes **itself**; we keep the description, date it, and publish it.

You can then put two projects side by side and see where one stops and the other starts. The shared vocabulary is in [LAYERS.md](LAYERS.md); where the project is heading is in [ROADMAP.md](ROADMAP.md).

### 2. Is it a standard, a certification, or a rating?

None of the three. There are **no scores, no rankings, no badges, and no certification** — and there never will be, by constitutional refusal. [NON-GOALS.md](NON-GOALS.md) lists twenty things this will not become. [BADGE-AND-CLAIMS-POLICY.md](BADGE-AND-CLAIMS-POLICY.md) explains why a badge would be worth more to a vendor than the record is, which is the definition of a corruptible incentive.

### 3. Who runs it?

One person, currently: Chris Perkins, who is also the author of KTP — the vocabulary this registry borrows. That conflict is declared rather than buried ([CHARTER.md](CHARTER.md) §6, [MAINTAINERS.md](MAINTAINERS.md) §1), and it is the reason [CALIBRATION.md](CALIBRATION.md) exists as a test the vocabulary can publicly fail.

More maintainers arrive through a nomination process the founder cannot veto ([MAINTAINERS.md](MAINTAINERS.md) §4).

### 4. What does being listed actually mean?

That you made a public, attributable, dated claim about your own project. **Nothing more.** It is not endorsement, validation, approval, or evidence that your project works. [CHARTER.md](CHARTER.md) §8 and [PARTICIPATION.md](PARTICIPATION.md) say this at greater length.

### 5. Does it cost anything?

No, and nothing here is purchasable — not position, not prominence, not inclusion, not an evidence state. [SUSTAINABILITY.md](SUSTAINABILITY.md) sets those rules before any money exists, which is the only time they can be written honestly.

### 6. Is my project eligible?

Probably. A doctrine, specification, research programme, open-source implementation, **commercial product**, service, dataset, benchmark, or governance method all qualify. What is required is a real, bounded, stewarded object — not that it be software, open, or hosted anywhere in particular. [QUALIFYING-PROJECTS.md](QUALIFYING-PROJECTS.md) §2.

### 7. How many projects are in it?

**One qualifying project, one steward — and both are the founder's.** Eight records exist; the rest are fictional examples that exercise the schema and are excluded from every count, plus real records that fail the counting rule for stated reasons.

The registry publishes this number rather than a flattering one: `npm run roadmap:status` computes it from the live registry ([QUALIFYING-PROJECTS.md](QUALIFYING-PROJECTS.md) §6). A registry with one project in it is a format, not a commons.

---

## Thinking about listing

### 8. What do I have to give up?

Nothing. [PARTICIPATION.md](PARTICIPATION.md) lists what is never required: hosting here, open-sourcing anything, disclosing trade secrets, using KTP internally, agreeing with how we mapped you, transferring governance, assigning copyright, or licensing patents to be listed.

### 9. Do I have to use KTP, or agree with it?

No. You can be listed while **publicly disputing** how we described you, and the dispute publishes alongside the mapping in your own words. Projects that implement KTP, complement it, disagree with it, or are being compared against it are all equally listable. [CHARTER.md](CHARTER.md) §11.

### 10. Do I have to disclose patents?

**No.** The disclosure duty in [IPR-POLICY.md](IPR-POLICY.md) §2 attaches to *interface proposals* — proposing a shared connection point others will implement. A listing is not that. The manifest's required fields don't include any IPR field, and no royalty-free commitment attaches to being listed.

### 11. Who controls my project's description?

You do. Name, description, contact, version, roadmap, status, and official links are yours to set and correct. What you cannot unilaterally set is evidence status, dispute state, or verification status — those are what the registry is for. [SYNC-POLICY.md](SYNC-POLICY.md) §5 has the full split.

### 12. Can I leave?

Yes, at any time, for any reason or none. Withdrawal ends active participation. It does **not** delete history — published versions stay published, and `preserve_historical_record` is a schema constant that cannot be set false.

That cuts against you in one direction and for you in every other: a registry where inconvenient history can be deleted on request is not a record. [PROJECT-LIFECYCLE.md](PROJECT-LIFECYCLE.md) §2.

### 13. Should I register right now?

**Not yet — and here is exactly why.**

A project's own registry entry currently falls into a broader licence than intended. [DCO.md](DCO.md) §2 recognises two licence categories, and your entry is neither of them, so it defaults into CC BY 4.0 — which permits derivative works and commercial reuse by anyone.

**OTCS-0004** fixes it: you declare your entry's licence, `all-rights-reserved` is a first-class choice, and registration grants only a stated operating minimum. It cannot be decided before **2026-09-14**, and the clock is not being shortened ([GOVERNANCE.md](GOVERNANCE.md) §3).

**What is useful right now is your comment, not your registration.** The open proposals are public, and the clock exists precisely so people outside this project can object before anything hardens. A proposal that has actually been read by someone it affects is worth more than one ratified quickly. Objections, corrections, and "this is wrong because —" are all more valuable to this registry today than another record would be.

### 14. What can I do meanwhile?

Publish your `otcs.yaml` at your own URL and have it validated against the live schema. Nothing enters the registry, your copy stays canonical, and you find out where the vocabulary breaks against your architecture before committing to anything. [REGISTERING.md](REGISTERING.md) walks through the record itself.

### 15. What happens after I submit?

A pull request, the same checks anyone can run locally, and a merge once the record rules are met. Refusal is a recorded act with stated grounds, never a silence ([GOVERNANCE.md](GOVERNANCE.md) §12). [REGISTERING.md](REGISTERING.md) §"The five steps".

---

## Evaluating it seriously

### 16. Where does my canonical record live?

Wherever you want. The record format carries `source_mode: project_hosted` and `canonical_manifest_url`, so your copy can be canonical and ours a validated snapshot with a hash.

**The honest limit:** there is no automated fetch loop yet, so our snapshot updates when you tell us it changed rather than on a schedule. Staleness is visible rather than silent — `source_status` has six states including `SOURCE_STALE` — but freshness is manual. [SYNC-POLICY.md](SYNC-POLICY.md) §2.

### 17. What licence does my entry carry?

Today, see [§13](#13-should-i-register-right-now) — this is the open defect. After OTCS-0004, you declare it.

### 18. Can someone claim a relationship with my project without my agreement?

They can claim it. They cannot have it recorded as mutual. A relationship starts at `self_asserted` and the schema **rejects** any edge claiming `mutually_confirmed` without a recorded counterparty sign-off.

One project claiming a partnership is a claim, not a connection. [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §5.

### 19. What if you describe my project wrongly?

Dispute it. `disputed` is a first-class mapping state, your statement publishes verbatim, and **a disputed project remains fully registered** — disagreement costs you nothing here. Corrections are new records, never silent edits. [OWNER-RESPONSE-POLICY.md](OWNER-RESPONSE-POLICY.md).

### 20. What if I disagree with an analysis about my project?

You see it before publication and may confirm, qualify, object, supply evidence, or publish a response. **Your response stays visible even when the analyst does not adopt it.** It is a right of reply, not a veto — you cannot suppress a source-grounded finding by declining to agree. [OWNER-RESPONSE-POLICY.md](OWNER-RESPONSE-POLICY.md) §§1–2.

### 21. How do versions, forks, and ownership transfers work?

Identifiers are permanent and never reused for a different subject. Forks get a new identifier and a `forked_from` link; renames keep the identifier and alias the old name; merges preserve both identifiers with a `superseded_by` pointer. Transfers are governance events with dated evidence, not field edits. [IDENTIFIERS.md](IDENTIFIERS.md) §3, [PROJECT-LIFECYCLE.md](PROJECT-LIFECYCLE.md) §1.

### 22. What stays visible if my project is private or commercial?

`private_commercial` is a participation mode. What is visible is what you declare, plus the record state. Nothing requires a repository, an open licence, or software. [PARTICIPATION.md](PARTICIPATION.md).

### 23. Can I be listed without asking to be?

There is a state for it — `observed`, built from public evidence and **never** presented as your participation — and it is deliberately not being used. Publishing an analysis of a project that cannot answer back is exactly the harm the right-of-reply process exists to prevent, so observed records wait until that process is mature.

**If you ask that no record exist in your name, that is honoured.** [CHARTER.md](CHARTER.md) §10, [PROJECT-LIFECYCLE.md](PROJECT-LIFECYCLE.md) §3.

### 24. How do you separate what I say from what someone else says about me?

They are different objects with different owners. Your declaration is yours. Claims carry their own evidence states, never the project's. Analyses are separate records requiring analyst disclosure. Relationships need counterparty sign-off to become mutual. [EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §1.

---

## The skeptical questions

### 25. The same person wrote the registry and the vocabulary. Isn't this just KTP marketing?

It is the most reasonable objection to make, and the answer is a test rather than a promise.

[CALIBRATION.md](CALIBRATION.md) maps three systems that predate KTP entirely — Bitcoin, TCP congestion control, Spanning Tree — and asks whether the vocabulary can describe them without implying they are deficient. It has produced three published findings where the vocabulary **failed**, including that it cannot express why anyone complies with a rule, and that it records authority but never how it was acquired.

The standing rule: *if a proposed change to the vocabulary would make any calibration case look deficient, the change is wrong.* Separately, KTP is registered under the same rules as everyone else and holds **zero** independently-tested claims.

### 26. Why would I be the second project in a registry with one?

You might reasonably decide not to be. What is on offer is not an audience — it is a shared vocabulary, an evidence model that refuses to inflate, and a record you control and can leave with.

The counter-question worth asking: what would the tenth project get that the second doesn't? Mostly other projects to be compared against. If that is the value, someone has to be second.

What protects you from that being a bad bet is the exit, not the promise: your entry is plain YAML you can take with you, and [PREMORTEM.md](PREMORTEM.md) publishes the conditions under which this project stops — written before they were needed rather than after.

### 27. What stops this becoming another dead directory?

Published kill criteria, written before they were needed. Twelve months after the first public release: fewer than 3 external registrations, no independent implementation, no evidence anyone uses the data to decide anything, unmanageable legal burden. **Any two means narrow the scope. Three or more means stop**, archive everything permanently, and say plainly it did not work. [PREMORTEM.md](PREMORTEM.md) §2.

### 28. Who governs the schema? Can it change under me?

Changes to the vocabulary or the rules run a public 45–90 day clock with an impact analysis ([GOVERNANCE.md](GOVERNANCE.md) §3, §11). A breaking change cannot ship without a migration entry carrying exact steps, a verification command, and a backout path ([MIGRATIONS.md](MIGRATIONS.md)). Deprecation requires a minimum period and individual notice to every affected project ([DEPRECATION.md](DEPRECATION.md) §2).

The founder does not get to edit the model by hand — the current vocabulary revision is running that clock now.

### 29. What if this stalls, or you lose interest?

The kill criteria in [§27](#27-what-stops-this-becoming-another-dead-directory) are the planned answer. The unplanned answer is that every record is plain YAML with a documented schema, the log is JSONL with a documented canonicalisation rule, and **nothing requires an interface to read**. A clone is a complete working copy. [FEDERATION.md](FEDERATION.md) §3.

### 30. Can I verify any of this without trusting you?

That is the design goal, and it is checkable:

- **Signatures** — `.allowed_signers` ships in the repository, so `git verify-tag` works without trusting the forge
- **The log** — hash-chained, currently 37 events, verifiable from a clean clone
- **Timestamps** — two independent witnesses (see [§32](#32-what-does-the-timestamping-actually-prove))
- **The build** — deterministic; the same input produces byte-identical output, and two separately-built hosts are compared as a published integrity check

[SECURITY.md](SECURITY.md) §3 states what none of this defends against, which is the part worth reading.

---

## The detailed ones

### 31. Can I establish priority without publishing the work?

Not yet — this is an open proposal, and it exists because four people asked for it independently, from IP protection, adversarial security, architecture, and commercial confidentiality.

**OTCS-0005** would add a `sealed` claim: a one-line public summary, a hash of undisclosed material, the witness rounds covering it, and a required stated reason. Deliberately built weaker than a disclosed claim on every axis except the one thing it proves — it sits below `DOCUMENTED`, is never counted in any published view, satisfies no gate, and a later reveal that fails the hash flips it to `disputed` automatically.

**Secrecy buys a provable date. It never buys credibility.**

The dating machinery it would rely on already exists and is described in [ANCHORING.md](ANCHORING.md); the proposal itself is at [proposals/OTCS-0005/proposal.yaml](proposals/OTCS-0005/proposal.yaml), and comment on it while the clock runs carries more weight than anything written here about it.

### 32. What does the timestamping actually prove?

That a specific byte sequence existed no later than a specific time, attested by two parties with unrelated failure domains — OpenTimestamps into Bitcoin, and the Rekor transparency log.

**What it does not prove:** that the content is true, original, or workable; that no earlier version existed elsewhere; who created it; or that the record is complete. It is a floor under your copy, not a ceiling over anyone else's — and a registry entry confers nothing a court recognises. [ANCHORING.md](ANCHORING.md) §§4–6.

### 33. Is my data portable if this disappears?

Yes, and it has been tested rather than asserted. A full restore was performed onto a machine that had never held a copy: log chain verified, every record validated, both witness proofs re-confirmed, and a byte-identical rebuild — all from a clone alone.

That exercise also found a real gap on our side, which is recorded rather than quietly fixed. [INCIDENT-RESPONSE.md](INCIDENT-RESPONSE.md) §9.

### 34. Can someone else run their own instance?

That is the design intent, and it is honestly unbuilt. Identifiers are URNs rather than URLs so they survive a change of host; records are readable without any tooling; nothing in the schema assumes a single registry exists.

What does not exist yet is a second instance, or the conflict model for two instances holding different observations of the same subject — designed, not implemented. It is one of nine **sovereignty criteria** in the v1.0 gate, all currently unmet, which together decide whether *no system must surrender its identity in order to coordinate* is true or merely written down. [FEDERATION.md](FEDERATION.md).

---

**Something missing, or an answer you think is wrong?** Both are useful — open a discussion, or comment on an open proposal. This page is a summary; the documents it points at are what actually govern, and they change through a public process anyone can join.
