# OPERATING-PERMISSION.md — version 1 (draft)

*This is the draft of the instrument OTCS-0004 §3 requires. It is published with the proposal so it can be deliberated with it. It takes effect only if OTCS-0004 is ratified, on the date recorded at ratification.*

## 1. Holder

**Chris Perkins, as an individual.** No organization holds this permission.

The permission is personal. It does not pass by will, inheritance or operation of law.

## 2. Scope

The scope is fixed by OTCS-0004 §3 and is not restated here. Nothing in this instrument adds to it.

## 3. Term and renewal

The permission runs for 12 months from the date it takes effect.

Before the term ends, the holder records a renewal in the governance ledger. The renewal names the holder, the unchanged scope and the new end date, and carries the readiness statement in §9. Anyone may object to a renewal on the record. A renewal adds no authority.

The permission ends in any of three ways: the term ends without renewal, the operator changes, or the holder is absent (§5).

## 4. Presence

**Holder activity** is any governance ledger event whose actor is the holder.

The holder may record a **planned absence** as a ledger event, stating its end date. A planned absence pauses the count in §5 for up to 60 days. A longer absence needs a new planned-absence event, and each one is on the public record.

**What presence does not prove.** A ledger event shows that the holder's account acted. It does not show that the holder is alive, well or in control of the account. A compromised account or an automated event would reset the count. The defense is not this section: it is the annual renewal, the readiness statement, and the people watching a public record.

## 5. When the holder is absent

The count runs from the holder's last activity, or from the end of a planned absence.

| Day | What happens |
|---|---|
| **30** | A public notice is posted on the tracker. Nothing else changes. |
| **90** | **Emergency period.** No new entries and no new derived views. The published record stays readable. Caretaker claims may be made (§6). |
| **97** | The permission **lapses**. The caretaker state begins (OTCS-0004 §6). |

Any holder activity before day 97 ends the count and restores normal operation.

**The count is computed, not announced.** Anyone can compute it from a clone of the repository and its ledger, for any date. The day-30 notice is a courtesy posted by the registry's scheduled tooling, which can stop running when a repository is inactive. A missing notice does not stop the count.

A named designee cannot shorten the count. The holder may pre-authorize a shorter count in this instrument, naming who may start it and on what evidence.

After a lapse, the former holder has no more authority than anyone else. Resuming operation needs a new operating permission (§7), on the same terms as anyone.

## 6. Caretakers

**Who may claim.** During the emergency period, or at any time after a lapse, a caretaker claim may be made by any participant who meets the published participation bar (`src/participation.ts`), or by a named designee (§8), who needs no bar.

**How.** A claim is a public statement in the claimant's own words under their own account. The statement is the claim. A ledger record of it is added by whoever still has write access to the ledger; the claim does not wait for one.

**What a caretaker may do.** Only preservation: keep the published record readable, mirror it, archive it, and keep the export and reclaim path open for registrants. A caretaker may not accept new entries, build new derived views, or use any entry beyond what the registry had already published.

**More than one caretaker.** Preservation is not exclusive. Every valid claim takes effect at day 97, or on being made after a lapse. More copies make the record safer, not contested.

**Copies that disagree.** Where copies differ, the ledger's hash chain and its anchored witnesses (`ANCHORING.md`) decide which copy is faithful. No caretaker's copy is authoritative because of who holds it.

**No caretaker.** If no one claims, the record stays readable through whatever mirrors exist, and no one operates it.

## 7. Forward operation after a lapse

No one inherits the operating permission. A caretaker is not a successor.

**The registrants are the authority designated in advance.** Anyone who wants to operate a registry of these entries — a caretaker, a former holder, or anyone else — publishes their own operating permission instrument and asks each registrant for new consent.

- **Each registrant decides for their own entry.** An entry is operated only by an operator its registrant has consented to.
- A registrant who does not consent to anyone stays preserved, not operated.
- **If two or more operators ask, each registrant chooses.** The shared history is the same for all of them; only future operation divides. No vote is needed and no one adjudicates.

**Not settled here: the name.** Several operators may preserve and operate the same history. They cannot all be the Open Trust Commons. Who may use the name after a lapse belongs to `TRADEMARKS.md`, which does not yet address it.

## 8. Named designees — the door

A named designee is a person who has **publicly accepted**, in their own words under their own account, the role of caretaker under §6.

- At version 1 there are **no named designees.**
- A person becomes one only by their own acceptance on the public record. No one is named on their behalf.
- An acceptance takes effect when it is made. Each renewal lists the designees, and a designee confirms in public at each renewal. One who does not confirm drops off the list.
- A designee may withdraw at any time by a public statement.
- A named designee may claim caretaking without meeting the participation bar. The role grants nothing else, and gives no authority while the holder is present.

## 9. Phases

Succession grows with the number of people who have taken a role. The phase is counted from public acceptances, not declared. **It goes down as well as up:** when designees drop off, the phase drops with them.

### Phase 1 — one person (version 1)

The holder is the only person with a role. Everything depends on leaving the registry so that a stranger could pick it up. At each renewal the holder:

1. **keeps a handover kit current** — a public `handover/` directory stating where everything lives, how to rebuild the registry from a clone, and how to compute the count in §5. It holds no secrets;
2. **names the mirrors** of the record that exist outside the holder's control. That such mirrors are needed is settled. How many, and how they are checked, is open for discussion as more people use OTCS;
3. **publishes the readiness statement** below.

The holder may make private arrangements for someone to receive technical access, so they can preserve the record. Such arrangements carry no operating permission and grant no role under this instrument.

A registrant is told at the point of consent: one person operates this registry, no one is designated, and §5 to §7 say what happens if that person goes quiet.

**Readiness statement**, carried by every renewal:

- current phase;
- named designees;
- mirrors outside the holder's control;
- whether the handover kit is current;
- known gaps.

### Phase 2 — the holder and one or two designees

- A designee has no authority while the holder is present.
- Each designee keeps a mirror of the record as a standing duty.
- Presence works both ways: a designee who does not confirm at renewal drops off (§8).

### Phase 3 — three or more designees

Principles only; the detail is written at the renewal where this phase becomes reachable.

- After a lapse, a majority of designees may publicly endorse an operator seeking consent under §7. **An endorsement is a signal, not a grant.** Its purpose is to help registrants tell operators with a public record from impersonators. Registrants still decide for their own entries.
- Designees disclose conflicts of interest as `CHARTER.md` §6 requires.
- Designee terms are staggered.

### Phase 4 — the commons

Principles only; the detail is written when this phase becomes reachable.

- The permission may move from a person to a body: a nonprofit, a decentralized organization, a foundation, or a form no one has proposed yet. The long-term holder is left open by OTCS-0004 §3.
- Registrants and participants choose under `VOTING.md`.
- This move needs a constitutional-class proposal. It is the only phase change a renewal cannot make.

## 10. What this instrument does not cover

**Governance succession.** This instrument covers operating the registry. It does not cover governing the rules: who merges changes, records decisions, administers the repository's organization, or acts in a security emergency when the holder is absent. `CHARTER.md` §7 sets out how governance passes on, through its stages. Until a later stage is reached, a holder's absence leaves governance without anyone able to act, and this instrument does not change that.

## 11. Changing this instrument

This instrument changes only at a renewal or through a proposal. Any change is recorded in the governance ledger and open to objection. No change may widen the scope in OTCS-0004 §3.
