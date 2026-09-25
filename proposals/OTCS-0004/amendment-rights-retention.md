# OTCS-0004: proposed separation of entry rights, operating permission and retained history

Proposed contribution by Maksim Barziankou (MxBv), 23 September 2026.
OTCS and OTCS-0004 are Chris Perkins's work. This contribution proposes additions
for consideration through the OTCS governance process. NC25OL is a separate
project; adoption of its implementation is not a condition of this proposal.

## 1. Status and scope

This filing is based on upstream registry revision
`2b889995cad18e6a6fdafa8e68c2a8259c41619b`. The comparison pins below identify
separate snapshots; they do not change the submission base.

The [implementation map](implementation-map-current.md) describes a separate
candidate whose source is not included in this PR. No public locator for that
exact candidate revision is supplied here. The map is informative contributor
analysis, not independently reproducible implementation evidence supplied by
this PR. Readiness for activation must be established separately.

This is a proposed substantive amendment for deliberation. It is not an adopted
policy, a legal opinion, a migration instruction or permission to activate new
registration or publication behaviour. Sections 2–7 state the proposed contract;
section 8 separates the exact normative package proposed for ratification from
the evidence required before each feature may be activated.

The proposal being amended is the text at registry revision
`0f1d7ed9f61427f886a11b68047293bfcc124006` in our `repairs-code` branch
submitted in PR #66. This is a comparison pin, not a claim of upstream merge or
policy adoption. The earlier
[normative repair draft](normative-repair-draft.md) describes the more detailed
architecture against upstream revision
`92e1436dce28b1aad1e719048f5c6202df5692ee`; it is retained unchanged as a historical
annex. Its examples, placeholder hashes and candidate version labels are not
operative configuration. This entry point corrects its dated inventory and
version assumptions and replaces its undifferentiated staging with section 8
below. Neither the annex nor this local draft establishes a satisfied
ratification or activation condition.

The registrant should be able to understand, before submitting: what the public
may reuse; what OTCS may do; which exact material is kept; what happens on
withdrawal; and which rights in the underlying project remain outside the entry.

## 2. Four separate declarations

The proposed manifest and acceptance record must distinguish:

1. **Entry-content rights.** The licence or reservation declared by each
   authorised contributor for identified content and rights. `CC-BY-4.0`,
   `CC0-1.0` and all rights reserved remain distinct choices. No missing value
   acquires a default licence. A reservation is not itself a licence to operate.
2. **Registry operating permission.** An explicit grant to the identified OTCS
   operator role for enumerated operations, content scopes and the selected
   storage profile. It does not silently come from a consent boolean or a
   project-wide licence label.
3. **Participation consent.** A representative's affirmative acceptance of the
   five defined processes below, bound to fixed terms and the selected storage
   profile. Being authorised to represent a project does not establish authority
   over every contributor's copyright, database rights or marks.
4. **Identification permission.** A separate record covering each exact name,
   word mark or selected logo used for identification. A logo also needs the
   authority to copy and retain its bytes. A copyright licence is not presumed
   to provide trademark permission.

A contribution sign-off certifies the contribution under the applicable
contribution terms. It does not manufacture these four declarations for a
listed project or relicense its underlying work.

Public licences keep their own terms. The narrower operating permission defines
OTCS's own conduct; it does not revoke or narrow rights that a public recipient
already holds under a licence or applicable law. All-rights-reserved material
must not be labelled CC BY merely because it appears beside OTCS-authored text.

## 3. Content and authority matrix

| Material | Required basis | Permitted role in the registry |
|---|---|---|
| Owner-authored project content | Per-contributor rights declaration and applicable operating permission | Exact authorised public statement or selected snapshot |
| Entry facts | Defined field whitelist and applicable rights or other recorded basis | Attributed factual projections and permitted registry views |
| Registry-authored text | Its author's authority and declared outbound terms | Separately identified registry explanation, correction or process record |
| Joint assertions | Each contributor's authority and the required confirmation record | A labelled assertion with its actual confirmation state |
| External material | Source terms or another documented applicable basis | Only the authorised excerpt or retained asset, with attribution and notices |
| Names, word marks and logos | Exact scoped identification permission and, for assets, byte-custody authority | Identification without endorsement or broader brand use |
| Underlying project | No rights arise from this entry | Code, designs, patents, private evidence and trade secrets are not supplied by registration |

A scope must name the content it covers. An entry-wide grant from one submitter
must not be read as authority from every contributor. Calling prose a fact does
not remove the permissions attached to it. Where a required basis cannot be
established, that operation must not proceed.

The operator and its current appointment must be identifiable. Processors act
only within recorded functions and compatible disclosed terms. A successor may
continue only the preservation scope expressly granted to a validly appointed
successor; the role change does not invent authority for new uses.

## 4. Explicit storage choice

Neither storage profile is selected by default, inferred from the public licence,
or inferred from an existing record.

| Profile | What may be kept and displayed | What it does not authorise |
|---|---|---|
| `reference_only` | The typed source locator and exact-byte identity, permitted facts and receipts, separately authorised registry content, and one explicitly scoped Public Entry Statement | Retention or republication of the remaining source prose or source bytes, and general external-asset retention or republication except for the separately authorised identification display specified below |
| `full_snapshot` | The exact accepted source and every authorised child named in an immutable manifest, with their rights, identity and custody evidence | Unlisted assets, broader public reuse or later additions disguised as the old snapshot |

A reference-only historical page may separately display selected identification
marks under their accepted, effective permissions. Logo display requires matching
supplied bytes and separately authorised byte operations; missing or mismatching
bytes suppress the logo. This exception does not authorise fetching a logo URL
or expand the canonical retained record.

The Public Entry Statement is project content, not a fact. Its fixed field set
contains bounded attributable claims and non-claims, connection claims, the
public/private evidence boundary, controller, licensing/commercial status and
challenge route. Reference-only display needs an explicit narrow display grant.
It is not an automatic input to analytical views.

Reference-only validation may use a transient source copy, but the deployment
must also account for logs, caches, exports, mirrors, backups and processors.
Removing one working buffer is insufficient evidence of non-retention.
The exact public field set must govern storage and rendering together.

Before acceptance, the registrant must receive the actual hosting and retention
disclosure. Uploading material to a public forge may involve separate platform
permissions; a reference-only label does not undo an upload or those terms.
A deployment unable to honour the selected profile must decline that path.

## 5. Defined consent

Each consent is independent, affirmatively recorded and bound to the fixed text,
its version and digest, the representative, effective time and storage profile.
Absence or an unchecked value is not assent. For live registered records all five
consent fields are required and must be true. An absent or false value causes refusal. Fixtures and observed records
must not fabricate registrant consent.

| Field | Proposed scope |
|---|---|
| `publication` | Publicly display only the accepted object's authorised fields and assets on declared OTCS surfaces, with their attribution and rights notices |
| `metadata_use` | Process and display only the specified factual and registry metadata; this does not convert project prose or private evidence into public metadata |
| `history_preservation` | Preserve and reproduce only the accepted historical object and declared audit evidence within the selected profile and its separately granted preservation scope |
| `mapping_and_analysis` | Use enumerated eligible inputs in registered, versioned registry transforms; this is not general derivative-work or training permission |
| `public_correction_process` | Publish attributable challenges, responses and registry corrections with separate provenance; this does not permit silently rewriting the owner's accepted statement |

Consent to the platform disclosure is recorded separately. A changed disclosure,
expanded operation or broader field set requires the applicable new authority
before use. Previously accepted consent must not be rewritten to look current.

## 6. Withdrawal, redaction and historical views

Withdrawal ends active participation, active-index inclusion and future source
synchronisation. An active project page is removed from active service. A
separate, visibly historical record may remain only within the accepted profile,
applicable preservation permission and current redaction state.

Project withdrawal, removal of particular content for privacy/security/rights
reasons, and inability to retrieve a source are different events. A source
becoming unavailable does not erase an accepted receipt. A withdrawal does not
by itself justify retaining material the selected profile forbade. An object
redaction must prevent further serving of the affected object and trigger the
specified reconciliation of controlled copies; an immutable event record must
not retain the prohibited body merely to describe its removal.

A historical view may be reproduced only from its frozen definition, complete
ordered inputs, output-rights profile and original evidence. Withdrawal cannot
be used to silently add a project to a new analysis. Redacted inputs block the
corresponding reproduction path. Withdrawal stops new analytical derivatives
from Project Content. New authority or a safe replacement does not by itself
reactivate the project; this proposal defines no reactivation route.

The registry must identify which copies it controls and record what it changed.
It must not promise erasure of independent copies or revocation of public rights
already granted. Historical identification remains bounded by the actual mark
permission; absence of permission requires a neutral identifier and locator.

## 7. Acceptance and transition

Owner-supplied source and registry-generated acceptance evidence are separate
objects. Source identity concerns the exact bytes accepted before decoding or
normalisation. Source, projections, snapshot, final record and acceptance event
must have distinct, non-circular identities. A valid signature authenticates a
statement; it does not independently establish legal title or governance power.

Acceptance requires all applicable scoped authority, consent, source, retention,
lifecycle and publication checks under one pinned policy version. Component
success must not be promoted into complete admission or publication permission.
The implementation must address concurrent lifecycle changes between validation
and publication; a final read alone is not an atomic publication transaction.

Existing entries remain subject to their recorded terms. They do not gain new
consent, licences or participation status by migration. Every live record,
example and withdrawn fixture must have an explicit treatment. Non-consenting
records remain historical and must not be treated as newly admitted entries.
Interim registrations require fixed terms and an affirmative later transition.

Observed records must remain distinct from owner registration. They cannot imply
owner participation, borrow owner consent or display protected material without
its applicable basis. Observation evidence alone does not open publication:
moderation, owner response, notices and removal requirements remain prerequisites.

## 8. Decisions and evidence still required

**Revision compatibility.** The compared upstream schema accepts `0.1` and `0.2`;
`0.2` is already used by the OTCS-0003 trial. The rights candidate's `0.2` labels
are historical identifiers. The normative ratification package must specify
maintainer-approved compatible version, dispatch and transition semantics. Their
implementation and the actual migration require separate activation evidence.
This amendment assigns no replacement ID or transition decision.

**Current inventory.** The separate candidate contains eight pinned manifests.
The compared registry additionally contains `otcs-ai-use`, making nine:
`abt`, `ktp`, `ktp-demo`, `otcs-ai-use`, `ex-gatekeeper`, `ex-ledgerline`,
`ex-mendwell`, `ex-watchtower`, `lifecycle-fixture`. Re-enumeration and exact-byte
binding are required at migration; this list grants nothing to any record.

**Normative ratification package.** Before a ratification vote, the proposed
rules must form one exact, versioned, reviewable package. It must identify the
operations and storage profiles within the scope of the vote and those expressly
deferred. For that scope it must freeze the grant, all five consent scopes,
marks and platform terms; field sets; storage, operation and preservation
profiles; lifecycle and receipt/event specifications; normative schemas;
transition inventory and treatment; and corresponding policy-document edits.
Version compatibility, classification, the exact pin and the applicable clock
must be recorded through the maintainer process. This paragraph proposes a
sequencing rule; it does not itself decide those matters or open a ballot.

Every permission put to the vote must have a fixed scope and fixed terms.
Observation-specific terms and transform definitions must be included if their
authority is part of that vote. Otherwise those operations must be expressly
deferred, with no authority to run them inferred from their mention here or in
the historical annex. Their missing normative terms require the applicable
OTCS governance decision before activation. Deferring a transform does not
remove or relax the five mandatory consent fields in section 5, or turn its
process consent into an unspecified operating grant.

The vote concerns this fixed normative package. It does not require a working
implementation or passing composed tests for every expressly deferred feature.
Ratification alone authorises no activation; implementation components and
synthetic fixtures supply neither real consent nor real principal authority.

**Per-feature activation evidence.** Before enabling any operation, the operator
must bind its deployment and composed evidence to the applicable ratified
package and feature scope. Each enabled path must meet all of its obligations;
checks for a disabled, unrelated feature are not substitutes or prerequisites
for those checks.

| Path to be enabled | Required evidence in addition to the applicable fixed normative terms |
|---|---|
| Any registration, storage, display or publication path, including a basic reference-only path | Identified operator and current appointment; authenticated scoped principal, rights and all required consent evidence; exact accepted source and field identities; actual hosting disclosure and storage enforcement across logs, caches, exports, mirrors, backups and processors; lifecycle checks, controlled-copy reconciliation, and atomic admission/publication wherever that path admits or publishes. Tests must exercise the composed path, including concurrent lifecycle changes, refusal and prohibited retained residue. |
| Full-snapshot storage or selected asset/mark display | For snapshots, complete immutable membership and exact bytes; for any selected asset or mark, its applicable custody and identification permissions and effective times. Required snapshot members and optional reference selections retain their distinct refusal/suppression rules. |
| Historical display or reproduction | The accepted preservation scope and storage profile, current redaction state, original evidence and exact retained object; frozen definitions and complete ordered inputs wherever a historical view is reproduced. Serving and controlled-copy reconciliation must enforce withdrawal and redaction together. |
| Mapping or analysis | Registered versioned transforms, enumerated eligible inputs and provenance, output-rights profiles and applicable rights decisions, complete receipts, and enforcement of the ban on new Project Content analytical derivatives after withdrawal. |
| Observed publication | Its own fixed basis and policy, authenticated observation evidence, rendered notices, moderation, owner response, removal and controlled-copy workflows, and atomic publication. Owner participation or consent must never be inferred. |
| Migration or cutover | Fresh exact-byte inventory of every affected live record, example and withdrawn fixture; explicit treatment under recorded terms; compatible dispatch, authoritative receipt time and enforced cutoffs; no fabricated consent, licence or participation status. |

A feature remains disabled until all applicable normative decisions and composed
enforcement evidence for that feature are complete. Deferral cannot suspend
preservation, withdrawal, redaction or controlled-copy duties already incurred
by an enabled path. Component success is not complete admission or publication
permission. The historical annex's 54 cases remain requirements to be mapped to
the paths that exercise them, not a count of completed features or a demand to
activate every path together. No component is removed or activated by this split.

**Clock.** The compared calendar records the existing window minimum and the
founder's undertaking for OTCS-0004. OTCS-0013 is itself under deliberation and
says it does not apply to 0004 by its own force. The proposed author classification
for this amendment is substantive. The maintainer must record the applicable
classification, pin and clock consequence for these exact changes before merge.
No clock, phase, ballot or governance event is changed by this packet.

**Implementation evidence.** The separate source candidate is pinned at
`9c6c812ef9f19ce535d0920f048a7da5be1ad1d9`; see the
[current implementation map](implementation-map-current.md). The
[older map](implementation-map.md) describes `c76c6a8` and is retained only as
history. PR #66 is a separate registry-code repair; it does not submit or adopt
this amendment and does not contain the full candidate implementation.

## 9. Reference points

- [OTCS governance](https://github.com/open-trust-commons/otcs-registry/blob/main/GOVERNANCE.md), [OTCS-0004](https://github.com/open-trust-commons/otcs-registry/tree/main/proposals/OTCS-0004), [calendar](https://github.com/open-trust-commons/otcs-registry/blob/main/proposals/CALENDAR.md) and [OTCS-0013](https://github.com/open-trust-commons/otcs-registry/tree/main/proposals/OTCS-0013). The exact compared source revision is stated in section 1; moving main may differ.
- [CC BY 4.0 legal code](https://creativecommons.org/licenses/by/4.0/legalcode.en), especially sections 2, 3 and 4: public permissions and conditions remain distinct from this proposed operator policy.
- [GitHub terms of service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service), section D: the hosting path must be disclosed and assessed on its own terms.

The requested result is an explicit, implementable registration contract.
Registrants retain control over their projects; OTCS receives only the authority
needed for the identified registry operations and accepted historical record.
