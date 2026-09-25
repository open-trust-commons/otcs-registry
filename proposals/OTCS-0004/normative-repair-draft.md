# OTCS-0004 — Normative Repair Package

**Status:** discussion draft for Chris Perkins and the OTCS maintainers  
**Recommended decision:** preserve the direction of OTCS-0004, revise the fixed text before ratification  
**Source snapshot:** [`92e1436dce28b1aad1e719048f5c6202df5692ee`](https://github.com/open-trust-commons/otcs-registry/commit/92e1436dce28b1aad1e719048f5c6202df5692ee)  
**Scope:** rights architecture, manifest semantics, lifecycle, migration, and mechanical acceptance criteria  
**Boundary:** technical and governance analysis, not legal advice or legal certification

## 1. Message to Chris

Chris,

I have now reviewed OTCS-0004 together with the repository documents that have to make it real: the DCO, the root licence, `LICENSE-SPECS`, participation and registration terms, lifecycle and sync policy, governance, the manifest schema, and the current registry records.

I support the proposal's direction. A project's own licence and the rights attached to its registry entry are different objects, and `all-rights-reserved` must be a real option rather than a label contradicted by the publication machinery.

My recommendation on the current fixed text is nevertheless **NEEDS REVISION**. The issue is not that an experimental commons must promise universal legal certainty. The issue is narrower and architectural: the current text does not yet specify one implementation that satisfies all of its own claims without the maintainers making new policy after the vote.

The central type error is that `entry_license` is asked to perform two jobs:

1. state what rights the public receives in project-supplied entry content;
2. grant OTCS the operational permissions needed to validate, store, publish, mirror, archive, and derive registry views.

Those are different rights surfaces. Under CC BY 4.0 or CC0 1.0, public recipients receive rights broader than the proposal's operating minimum. Under all-rights-reserved, OTCS needs a separate, narrow operating grant and a defined path through its operator, host, mirrors, archives, and successor operators. One field cannot express both relations without contradicting one of them.

This document proposes a bounded redesign rather than another layer of caveats. It preserves the purpose and provenance of OTCS-0004. It does not attempt to replace its authorship, shorten its governance clock, or turn a technical contribution into legal advice.

## 2. What OTCS-0004 should preserve

The following decisions are sound and should remain:

- the underlying project's code, schemas, patents, trade secrets, and other assets are outside the registry-entry grant;
- project licence and entry-content rights are separate declarations;
- all-rights-reserved is available as a first-class rights regime;
- OTCS receives only the permissions it actually needs to operate the registry;
- accepted history cannot disappear merely because a record becomes inconvenient;
- the project is candid about lacking a legal entity, counsel, and jurisdiction-by-jurisdiction analysis;
- no substantive governance clock should be shortened for convenience.

The repair is therefore not a reversal. It is a separation of objects that the current draft has placed in one field.

## 3. Findings that require a normative change

### 3.1 The current state is ambiguous, not demonstrably CC BY by default

The proposal and `REGISTERING.md` say that a project's registry entry currently falls into CC BY 4.0 by default. The repository documents do establish an ambiguity, but not that single certain result:

- [`LICENSE-SPECS`](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/LICENSE-SPECS) assigns CC BY 4.0 to enumerated specifications and documents, but does not name registry YAML;
- the root [`LICENSE`](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/LICENSE) is Apache-2.0, whose contribution clause applies unless a contributor explicitly states otherwise;
- [`DCO.md`](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/DCO.md) has only the two broad categories that created the gap.

The proposal should therefore say:

> The current treatment of project-supplied registry entries is ambiguous across the DCO, `LICENSE-SPECS`, and the repository-level contribution default. OTCS-0004 replaces that ambiguity with an explicit per-entry rights declaration and a separate registry operating grant.

This wording strengthens the case for OTCS-0004 without claiming that one disputed interpretation is already settled.

### 3.2 A public rights instrument is not an operating grant

The sentence "Whatever `entry_license` says, registration grants the registry exactly this" cannot be true across all three proposed values.

- CC BY 4.0 permits public sharing and adaptation, including commercial use, subject to its conditions.
- CC0 1.0 is intended to remove or waive copyright restrictions to the greatest available extent, with a fallback licence.
- All-rights-reserved supplies no public copyright licence by itself.

The draft then says that registration does not grant commercial reuse of entry prose outside the registry. That may describe the intended narrow operating grant for an ARR entry, but it cannot limit rights already granted to the public under CC BY or CC0.

The normative text must distinguish the two surfaces and state:

> The entry-content rights declaration governs permissions granted to public recipients. The registry operating grant is a separate grant to the OTCS Operator and its Authorised Processors. The operating grant neither narrows nor replaces permissions already supplied by the declared public rights instrument.

### 3.3 "The registry" is not a defined rights-bearing actor

The operating minimum is granted to "the registry", while the proposal also says that the project has no legal entity. The surrounding system nevertheless requires several actors to exercise the grant:

- current maintainers;
- repository and site hosts;
- authorised mirrors and archives;
- a successor operator after a governance transition.

An absolute no-sublicensing sentence leaves those actors without a stated path to perform the operations the proposal promises.

OTCS should define both a governance role and the natural person, persons, or legal entity currently occupying it, while making clear that this does not itself resolve every jurisdiction's legal-person question:

> **OTCS Operator** means the maintainer or maintainers authorised to operate the registry under `GOVERNANCE.md`, including a successor appointed through the same governance process. **Authorised Processor** means a repository, hosting, archival, or mirror provider acting only on the Operator's instructions and only for the operations enumerated in the applicable Registry Operating Grant.

The grant can then prohibit general sublicensing while allowing narrowly bounded processors and governance-designated succession.

The public operator record should identify at least the operator's stable ID, legal or personal name, contact, governance-authority reference, and effective date. Each processor record should identify the provider, its functions, and the platform-terms version or date reviewed for that function.

### 3.4 One file can contain material from several rights holders

[`SYNC-POLICY.md`](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/SYNC-POLICY.md) already separates:

- project-controlled fields;
- registry-controlled fields;
- jointly controlled relationships.

A single entry-wide licence silently treats the project as licensor of all three. That is not a safe assumption. Registry-authored evidence classifications, dispute records, corrections, and process observations do not become project-authored content merely because they are stored in the same YAML file. External excerpts and linked reports retain their own provenance.

The rights model must follow field origin:

- **Project Content:** project-supplied expressive fields covered by the entry-content rights declaration;
- **Registry Content:** OTCS-authored classifications, process records, corrections, and annotations covered by OTCS's own outbound terms;
- **Joint Assertions:** relationship claims published only through the confirmation process defined by OTCS;
- **External Material:** citations, excerpts, and reports whose source terms remain controlling;
- **Entry Facts:** identifiers, dates, hashes, coordinates, and other non-expressive or expressly consented factual values that may feed registry views;
- **Identification Marks:** submitted project names, word marks, and logos, whose trademark treatment is separate from copyright in entry prose;
- **Underlying Project:** code, schemas, patents, trade secrets, and other project assets, always outside the entry grant.

### 3.5 Consent is promised but not yet specified or enforced

The proposal promises one-paragraph definitions for five consent booleans after ratification. Those definitions are substantive policy, not editorial cleanup. They decide what a registrant authorises.

The current schema also permits all of the following:

- no `consent` object;
- some or all consent fields omitted;
- consent fields set to `false`;
- a consent date with no version or hash of the terms accepted.

Existing consent dates predate the proposed definitions. They cannot be treated as assent to words that did not yet exist.

The exact consent scopes, version identifier, terms hash, authority declaration, and state-dependent schema requirements must be inside the fixed ratification artefact.

### 3.6 Withdrawal currently names incompatible outcomes

The fixed source set currently names three different public outcomes. `PROJECT-LIFECYCLE.md` says the page stays up with withdrawal visible; `SYNC-POLICY.md` says the last accepted snapshot keeps publishing; `GOVERNANCE.md` and `REGISTERING.md` say, in the compact governance formulation, "The page goes; the history stays".

Those are not equivalent. Serving an active project page, including a project in the active index, exposing an immutable archive object, rebuilding a historical view, mirroring retained bytes, and preserving an audit receipt are separate future acts. A single phrase cannot govern them.

The fixed text should choose one surface model and propagate it everywhere. The model proposed below treats the governance formulation as controlling: the active project page and active index entry go away, while a distinct historical record survives according to the accepted storage profile. Withdrawal must also distinguish OTCS's future behaviour from the public's rights: it cannot revoke rights already granted under CC BY, CC0, another instrument, or applicable law.

### 3.7 The proposal defers part of the decision until after the vote

The fixed proposal does not yet contain:

- the five consent definitions;
- the exact schema change;
- requiredness and default rules;
- the new schema version;
- the values and authority path for existing records;
- a complete migration inventory.

Those decisions materially affect rights and implementation. Ratifying a promise to draft them later would leave the maintainers, rather than the vote, to determine the operative policy.

### 3.8 Open registration creates a retroactive transition case

`REGISTERING.md` leaves registration open while warning that a submission will be governed by whatever OTCS-0004 later decides. The proposal's impact discussion, however, assumes a population of three founder-controlled registered records.

A third party can therefore enter before ratification and fall outside the approved migration account. Binding that submission to later, unwritten terms would reproduce the retroactivity concern that motivated the proposal.

Registration should either pause until the new fixed version is adopted, or every interim submission should remain pinned to the terms version accepted at submission and require affirmative migration later.

### 3.9 Identification requires a trademark rule

The proposal excludes trademark use, while a registry page necessarily identifies the project by name and may later display a submitted logo. Those acts should not be left implicit.

The fixed text should require the pinned `OTCS-MARKS-1.0` permission before OTCS renders any submitted name, word mark, or logo as an Identification Mark. Names and word marks may be permitted solely for identification and attribution; each logo requires a separate explicit selection. An observed record without that permission must use a neutral registry identifier, canonical URL, and cited facts rather than render the project's Identification Mark. The permission must not imply endorsement, merchandising, or broader brand use.

## 4. Proposed rights architecture

### 4.1 Defined actors

| Actor | Meaning | Source of authority |
|---|---|---|
| **Entry Licensor** | A person with recorded authority for the particular right being exercised: copyright in Project Content, an applicable database right, or an Identification Mark. One person is not presumed to control every surface | A typed authority declaration tied to the accepted version and naming the covered right |
| **OTCS Operator** | Maintainer role authorised under `GOVERNANCE.md` to operate the registry | Current public governance record |
| **Authorised Processor** | Repository, host, archive, or mirror acting only for the Operator | Narrow processor authority in the Registry Operating Grant |
| **Successor Operator** | A party that becomes the OTCS Operator through the defined governance transition | Succession record plus the role-continuing accepted-version preservation grant; an expressly continuing or freshly issued bounded grant for every non-preservation operation |
| **Public Recipient** | Any person receiving publicly available material | The entry-content rights instrument, OTCS outbound terms, source terms, and any independent platform terms |

The public operator record should identify the operator's stable ID, legal or personal name, contact, governance-authority reference, and an exclusive `operator_appointment_epoch` containing predecessor, start, optional end, and appointment-receipt reference. Exactly one epoch is current at an event time. Each grant distinguishes the stable grantee role (`otcs_operator`) from the current `operator_id` and epoch: the accepted-version preservation subset follows only a successor validly appointed to the same role, while queued or delayed non-preservation work cannot cross an epoch boundary. Each grant maps one licensor to exact covered rights, a typed operating field set, selected storage profiles, a pinned operation profile, and a pinned preservation scope. Each processor record identifies the provider and functions, binds one operator epoch, and carries a typed processor-terms receipt naming the reviewed terms/configuration, retention categories and durations, log/cache/artefact/backup treatment, reuse or training status, deletion controls, reviewer, compatibility decision, and decision time.

### 4.2 Defined content and output classes

| Content or output class | Controller or author | Applicable rights surface | May survive withdrawal? |
|---|---|---|---|
| Project Content | Copyright holder or authorised representative | Entry-Content Rights Declaration plus Registry Operating Grant | Only the accepted object authorised by the selected storage profile |
| Entry Facts | Project, registry, or both | Owner consent, or for an observed record the recorded observation basis and another documented lawful basis; in either branch, factual-whitelist rules and any applicable database-right authority | Yes, for historical integrity and defined views |
| Registry Content | OTCS Operator or contributor | OTCS outbound terms | Yes |
| Joint Assertions | Project plus counterparty or registry | Confirmation protocol plus each contributor's authority | Yes as a visibly frozen historical assertion |
| External Material | External rights holder | Source licence or another documented lawful basis | Only to the extent already permitted |
| Identification Marks | Mark owner or authorised representative | Pinned `OTCS-MARKS-1.0` identification permission; each logo requires its own scope | Only as needed to identify an authorised historical record |
| Underlying Project | Project rights holders | Never supplied by the entry grant | Not copied merely because an entry exists |
| Derived Registry View | OTCS-generated output | Its registered view definition plus the rights surfaces of its permitted inputs | Only as an exact re-render from the frozen definition and inputs |

A **Public Entry Statement** is a bounded owner-authored subobject of Project Content required for a registered public listing. Its frozen field set contains only attributable claims, non-claims, connection claims, the public/private evidence boundary, the identified controller, licensing and commercial status, and the challenge route required by the Charter and participation mode D. It is not an Entry Fact or Registry Content. Under `reference_only`, OTCS may retain and display only its canonical projection under an explicit narrow display grant; every other item of Project Content remains outside the public retained set.

A **Derived Registry View** is a versioned OTCS-generated index, graph, table, or search output whose registered definition names its input classes and paths, transform ID and version, output fields, provenance format, post-withdrawal rule, and frozen `output_rights_profile`. Its inputs are restricted to enumerated Entry Facts and Registry Content unless an independent recorded basis covers additional material. A definition may not convert Project Content into a "fact", and the Public Entry Statement is not an input without separate authority. Every materialised instance receipt binds an ordered `governing_inputs[]` manifest. Each item records `(project_id, governing_object_kind, governing_digest, input_class, field_set_id, projection_sha256, origin_receipt_ref_or_final_envelope_sha256)` so Registry Content and other post-source projections cannot change invisibly. The receipt also binds the RFC 8785 input-set digest, definition and transform versions, view-registry digest, output digest, creation time, and an output-rights profile naming issuer, instrument and hash, covered output fields, attribution, compatibility rule, and input-derived restrictions. Per-object ledger links are reverse indexes only. Historical re-rendering uses this complete receipt, and incompatible input/output rights fail before distribution.

### 4.3 Two storage profiles

#### `full_snapshot`

The accepted OTCS object is a content-addressed snapshot package. Its required source member is the exact source bytes accepted by the validator. Any separately fetched logo or other admitted asset is a typed child member with kind, exact-octet SHA-256, byte length, media type, immutable locator, and the receipts authorising its custody and use. A canonical snapshot manifest binds the ordered member set; an asset not named by that manifest is not part of `full_snapshot`.

- It is the natural fit for CC BY 4.0 and CC0 1.0 entries, although an explicit selection is still required.
- It is permissible for all-rights-reserved content only when the operating grant expressly covers public repository storage, serving, mirroring, archival preservation, and the disclosed platform path.
- The typed source carrier, exact-byte hash, byte length, media type, ratified hash-profile ID and hash, snapshot-manifest digest, every retained-asset receipt, attested authority-projection hash, storage profile, every applicable grant receipt, consent receipt, any mark-permission receipt, and every materialised view-instance receipt are recorded together in the append-only version ledger.

#### `reference_only`

For an owner-submitted `reference_only` record, the public registry retains exactly the fields in the ratified `otcs-reference-only-public-record-v0.2` set:

- typed accepted-source carrier and its carrier-specific locator, including the canonical URL for `http_response_body`;
- `accepted_version_sha256`, byte length, and media type for the exact source octets accepted by the validator;
- ratified hash-profile ID and hash;
- schema version plus parser and validator identifiers and versions resolved through the pinned toolchain registry;
- validation time, canonical `envelope_core_sha256`, and content-addressed validation and authority-attestation `ReceiptRef` objects; the post-hash `version_accepted_receipt_ref` remains in the ledger rather than inside this envelope;
- RFC 8785 authority- and rights-declaration-projection hashes over fixed owner-source pointer sets, together with the content-addressed receipt for the frozen rights-declaration projection;
- project ID, underlying-project licence status, and other fields admitted by `entry-facts-v0.2`;
- a project name only when an effective `OTCS-MARKS-1.0` receipt authorises that exact value; otherwise the record uses the neutral project ID and canonical locator;
- factual-whitelist ID and hash plus canonical fact-projection hash;
- the canonical Public Entry Statement projection, its field-set ID and hash, and its projection hash;
- immutable receipts for materialised Derived Registry Views, each carrying its complete input-set digest;
- registry-authored evidence, dispute, correction, and process metadata.

The Public Entry Statement is the sole Project Content exception in this profile. Its narrow display grant authorises retention and public display of the exact canonical projection but does not turn it into an Entry Fact, license it for analytical reuse, or extend to any other Project Content. Project prose outside that field set and the accepted source bytes are not retained in the public repository, mirror, archive, or derived view. A transient validation copy is discarded after the receipt chain is produced. One canonical field-set definition therefore controls storage, rendering, withdrawal, and tests; shorter paraphrases elsewhere do not define a competing retained set.

Receipt construction is acyclic. The registry first retrieves and hashes the source, validates it, and computes authority, rights-declaration, fact, and Public Entry Statement projections. It next canonicalises an `envelope_core` that excludes every receipt reference and both the final-envelope and acceptance-event digests. Separate validation and authority-attestation `ReceiptRef` objects bind that core digest and their distinct facts. The final envelope includes only those prerequisite receipt references and is hashed as `registry_envelope_sha256`; the ledger then stores a post-hash `version_accepted_receipt_ref` binding the final digest, prerequisite receipt digests, and effective time. The envelope schema never requires that external acceptance receipt.

Every `ReceiptRef` is content-addressed, not a mutable path fragment. It resolves an immutable object carrying receipt type, payload digest, issuer, operator epoch, key ID, signature suite and signature, signing time, log root, and inclusion proof. A URL or JSONL anchor may be a locator but is never the receipt identity. Append-only key-rotation and revocation events preserve verification under the key epoch valid at signing; mutation, reordering, key-expiry, or locator replacement cannot silently alter an accepted receipt.

An `observed + reference_only` record does not reuse the owner-source chain or Public Entry Statement. It carries a content-addressed observation receipt referenced by `observation_receipt_ref` over `observation_basis.public_sources[]`: every source item records its URL or repository locator, typed carrier, exact-octet SHA-256, byte length, media type, and retrieval time. `observation_source_set_sha256` is computed over RFC 8785 canonical JSON of the ordered source-item records. The receipt also pins the observation-policy hash and the RFC 8785 hash of the OTCS-authored `observation_basis`; the receipt itself is outside that hashed object, so no self-hash is created. A single `canonical_manifest_url` must not be invented when no owner manifest exists.

For an owner-submitted record under either storage profile, the registry computes `accepted_version_sha256` over the exact owner-source octets retrieved through a typed `accepted_source_carrier`, before decoding, newline conversion, or semantic normalisation. For `http_response_body`, those are the response-body octets and the registry envelope records the canonical URL and retrieval metadata. For `git_blob`, those are the Git object-content bytes and the envelope records repository, commit, path, and blob OID; checked-out working-tree bytes are not substituted for the blob. The storage profile is orthogonal to this carrier type. Byte length and media type travel with the digest so it names one measurable object. The envelope and every receipt record the same ratified hash-profile ID and exact hash, so neither a validator nor a later verifier can silently change a digest domain.

The owner-source octets never contain their own exact-octet digest, any reducer-derived state, or any post-validation receipt. `0.2` therefore uses a two-stage schema family: `project-source-0.2.schema.json` validates the immutable owner-authored source; `registry-record-envelope-0.2.schema.json` validates the registry-generated envelope created through the staged construction above. The final envelope records the source identity, projection identities, core digest, receipt references, canonical public field set, and ledger-derived state. A conformance case must name which object and stage it tests.

An observed record has no `accepted_version_sha256`; its per-source, observation-source-set, and observation-record digests name the distinct objects described above. The factual projection is separately serialised as RFC 8785 canonical JSON and separately hashed; source, observation-source-set, observation-record, authority, core-envelope, final-envelope, statement, and fact-projection digests are never substituted for one another.

`reference_only` should be the recommended profile for all-rights-reserved content, with the final selection still explicit. It preserves the bounded public self-description required for a listing while preventing the remainder of the source and Project Content from becoming a public snapshot.

### 4.4 Four separate instruments

1. **Entry-Content Rights Declaration** — what public recipients may do with Project Content.
2. **Registry Operating Grant** — what the OTCS Operator and Authorised Processors may do to operate an owner-submitted record.
3. **Consent Record** — which registry processes the registrant affirmatively accepts, against which exact version and hash, including the platform-disclosure acknowledgement.
4. **Identification-Marks Permission** — which submitted name, word mark, or logo may be used, by whom, for what OTCS purpose, and under whose authority.

None of these instruments should be silently inferred from another.

## 5. Proposed manifest model

The exact naming is open to the maintainers, but the type separation should be normative. This is a concrete registry-generated `registry-record-envelope-0.2` for a `registered + reference_only + all_rights_reserved` owner source, not a schematic union. It carries admitted owner-controlled fields copied from the separately validated source together with post-validation metadata and reducer-derived state. `project.record_state`, `record.surface_state`, `record.publication_state`, and `record.fixture_status` in this envelope are registry-controlled projections; none is copied from or permitted in the owner source:

```yaml
otcs_version: "0.2"
source_schema_version: project-source-0.2
record_schema_version: registry-record-envelope-0.2

project:
  id: example-project
  name: Example Project
  license: Apache-2.0
  record_state: registered

record:
  record_version: "2"
  fixture_status: live
  participation_mode: github_native
  source_mode: project_hosted
  accepted_source_carrier:
    type: http_response_body
    canonical_url: "https://project.example/.well-known/otcs.yaml"
  accepted_version_sha256: "<sha256-of-exact-accepted-source-octets>"
  accepted_source_byte_length: 12345
  accepted_source_media_type: "application/yaml"
  hash_profile:
    id: OTCS-HASH-PROFILE-0.2
    sha256: "<sha256-of-frozen-hash-profile>"
  surface_state: active
  publication_state: published

  entry_content_rights:
    - licensor_id: "<copyright holder or authorised representative>"
      covered_right: copyright
      regime: all_rights_reserved
      instrument: null
      instrument_sha256: null
      rights_declaration_field_set: project-supplied-v0.2
      authority_receipt_ref: "receipt:sha256:<authority-receipt-digest>"
      effective_at: "2026-09-15T12:00:00Z"

  storage_profile: reference_only

  registry_grants:
    - instrument: OTCS-REGISTRY-OPERATING-GRANT
      version: "1.0"
      terms_sha256: "<sha256-of-fixed-terms>"
      grantee_profile: otcs-operator-v1
      grantee_role: otcs_operator
      operator_id: "<public-operator-record-id>"
      operator_epoch_id: "<exclusive-appointment-epoch-id>"
      covered_rights:
        - copyright
        - database_right
      covered_content_scope:
        content_classes:
          - Project Content
          - Entry Facts
        operating_grant_field_set: otcs-public-entry-statement-display-v0.2
      operation_profile:
        id: otcs-reference-only-operations-v1
        sha256: "<sha256-of-frozen-operation-profile>"
      storage_profiles:
        - reference_only
      preservation_scope:
        id: otcs-role-continuing-preservation-v1
        sha256: "<sha256-of-frozen-preservation-scope>"
        continuity: governance_successor
      licensor:
        name: "<rights holder or authorised representative>"
        rights_authority:
          authority_scopes:
            - copyright
            - database_right
          authority_basis: rights_holder
          authority_evidence:
            - "<signature, verified account, or reviewable authority record>"
      effective_at: "2026-09-15T12:00:00Z"

  reference:
    source_schema_version: "project-source-0.2"
    parser_version: "<pinned-parser-id-and-version>"
    validator_version: "otcs-admission-validator-0.2"
    public_record_storage_shape: otcs-reference-only-public-record-v0.2
    public_record_storage_shape_sha256: "<sha256-of-frozen-public-record-storage-shape>"
    fact_whitelist: entry-facts-v0.2
    fact_whitelist_sha256: "<sha256-of-frozen-whitelist>"
    fact_projection_sha256: "<sha256-of-rfc8785-canonical-fact-projection>"
    rights_declarations_projection_sha256: "<sha256-of-rfc8785-canonical-rights-projection>"
    rights_declarations_receipt_ref: "receipt:sha256:<rights-projection-receipt-digest>"
    public_entry_statement_sha256: "<sha256-of-rfc8785-canonical-statement-projection>"
    validated_at: "2026-09-15T12:00:00Z"
    authority_projection_sha256: "<sha256-of-rfc8785-canonical-authority-projection>"
    envelope_core_sha256: "<sha256-of-receipt-free-canonical-envelope-core>"
    validation_receipt_ref: "receipt:sha256:<validation-receipt-digest>"
    authority_attestation_receipt_ref: "receipt:sha256:<authority-attestation-digest>"

  public_entry_statement:
    display_scope: otcs-public-entry-statement-display-v0.2
    claims:
      - "<bounded attributable project claim>"
    non_claims:
      - "<what this entry does not claim>"
    connection_claims: []
    evidence_boundary: "<what is public and what remains private>"
    controller: "<identified project controller>"
    licensing_and_commercial_status: "<declared status>"
    challenge_route: "<public correction or challenge URL>"

  identification_marks:
    instrument: OTCS-MARKS-1.0
    version: "1.0"
    terms_sha256: "<sha256-of-fixed-marks-permission>"
    word_marks:
      - mark_type: word_mark
        value: Example Project
        rights_holder: "<mark owner or authorised representative>"
        authority_scope: word_mark
        authority_basis: rights_holder
        permission_scope: otcs_identification_only
        survival_rule: historical_identification_only
        authority_evidence:
          - "<signature or reviewable mark-authority record>"
        effective_at: "2026-09-15T12:00:00Z"
    logos: []

consent:
  terms_version: "1.0"
  terms_sha256: "<sha256-of-fixed-consent-text>"
  platform_disclosure_version: "1.0"
  platform_disclosure_sha256: "<sha256-of-fixed-disclosure>"
  platform_disclosure_acknowledged: true
  platform_disclosure_acknowledged_at: "2026-09-15T12:00:00Z"
  platform_disclosure_acknowledging_principal: "<project representative>"
  publication: true
  metadata_use: true
  history_preservation: true
  mapping_and_analysis: true
  public_correction_process: true
  consenting_principal: "<project representative>"
  authority_scope: registry_participation
  authority_basis: project_representative
  authority_evidence:
    - "<signature, verified account, or reviewable authority record>"
  consented_at: "2026-09-15T12:00:00Z"
```

For an HTTP owner-source, `record.accepted_source_carrier.canonical_url` is the single canonical locator in the registry envelope. The owner-source bytes do not contain that locator as self-describing acceptance metadata, and the `reference` receipt does not duplicate it in a second `canonical_manifest_url` field.

Registry Content and Joint Assertions never originate merely because an owner placed a value in the source. The source schema rejects Registry Content paths and all registry-controlled fields. Each Registry Content or Joint Assertion added to the envelope records its `origin_class`, principal or principals, authority scope, and authority receipt; a Joint Assertion requires a receipt from every contributor named by its confirmation protocol. Classification and a rendered provenance label do not substitute for those receipts.

The public `project` block unconditionally contains only `project.id`, underlying-project licence status, and other fields admitted by `entry-facts-v0.2`. `project.name` appears only under the exact-value mark permission below. Four field-set kinds are disjoint and schema-typed: `rights_declaration_field_set` scopes a public-rights declaration; `operating_grant_field_set` scopes operator acts; `public_entry_statement.display_scope` names the sole retained Project Content projection; and `public_record_storage_shape` names the complete mixed-origin envelope shape. Cross-kind substitution fails. The statement display scope must be contained in both the operating scope and storage shape, but widening a rights declaration can never widen `reference_only` retention.

### 5.1 Why `entry_content_rights`, not `entry_license`

All-rights-reserved is not itself a public copyright licence. An enum that mixes two standard public instruments with a no-licence rights status hides that type difference.

A valid concrete declaration looks like this:

```yaml
entry_content_rights:
  - licensor_id: "<copyright holder>"
    covered_right: copyright
    regime: all_rights_reserved
    instrument: null
    instrument_sha256: null
    rights_declaration_field_set: project-supplied-v0.2
    authority_receipt_ref: "receipt:sha256:<authority-receipt-digest>"
    effective_at: "2026-09-15T12:00:00Z"
```

Each declaration covers one licensor, one right, and an exact field or value set. The allowed regime/instrument pairs remain `open_licence + CC-BY-4.0`, `public_domain_dedication + CC0-1.0`, and `all_rights_reserved + null`; standard instruments also carry their frozen hash. The schema and governance verifier require complete coverage of every Project Content path that OTCS acts upon, reject incompatible overlapping declarations, and never infer that one licensor controls another field. This rights scope is independent of the narrower display and storage scopes.

The ratification bundle should freeze nine companion texts:

- `OTCS-RIGHTS-MATRIX-0.2.md` — the normative actor, right, content-class, storage-profile, operation, project-lifecycle, governing-object, fixture, and survival matrix;
- `OTCS-RG-1.0.md` — exact operating grant, operator profile, processors, permitted operations, exclusions, and succession rule;
- `OTCS-CONSENT-1.0.md` — exact meanings of the five consent scopes;
- `OTCS-MARKS-1.0.md` — exact identification-mark permission scopes, exclusions, authority fields, and post-withdrawal survival rules;
- `OTCS-OBSERVED-0.2.md` — the fixed observation basis, moderation gate, non-claims, documented-publication-basis vocabulary, right-of-reply process, decline effect, and allowed public outputs;
- `OTCS-PLATFORM-DISCLOSURE-1.0.md` — the platform path and the acknowledgement shown before selection;
- `OTCS-FIELD-SCOPE-0.2.md` — the seven content classes, JSON paths, Public Entry Statement boundary, canonical public-record field set, and factual-whitelist semantics;
- `OTCS-VIEW-DEFINITIONS-0.2.md` — allowed inputs, transforms, outputs, provenance, and withdrawal behaviour for every Derived Registry View;
- `OTCS-HASH-PROFILE-0.2.md` — every digest domain, domain separator, exact input object, canonicalisation and exclusion rule, member ordering, algorithm, empty/error behaviour, and media/Unicode/newline treatment for source octets, retained assets, snapshot manifests, observation source sets, observation records, authority and fact projections, Public Entry Statements, envelope cores, final envelopes, lifecycle events, receipts, view input sets, view registries, outputs, and the ratification manifest.

The nine companion artefacts should themselves be stored as LF-normalised UTF-8. Machine-readable operative registries are separate ratification members: `OTCS-OPERATION-PROFILES-0.2.json`, `OTCS-PRESERVATION-SCOPES-0.2.json`, and `OTCS-FIELD-SETS-0.2.json`. The last contains type-tagged subresources for rights-declaration scopes, operating-grant scopes, `entry-facts-v0.2`, `otcs-public-entry-statement-display-v0.2`, and `otcs-reference-only-public-record-v0.2`. Each manifest binding records either a whole-file member or an exact `{member_path, json_pointer, canonicalisation, sha256}` subresource descriptor. A plausible-looking local hash is never authority for an unlisted profile or ambiguous slice.

A canonical machine-readable `OTCS-RATIFICATION-0.2.json` should enumerate the proposal, all nine companion artefacts, both schemas, every operative registry and subresource binding, the pinned toolchain registry, receipt and lifecycle schemas, reducer specification, migration inventory, cutoff rule, and exact digests of every operative Phase 1 policy document named in §8. A document not bound there must declare itself a non-normative generated mirror of a bound rule. CI recomputes every member and subresource, rejects a missing or stale policy mirror, runs fixed cross-implementation hash vectors, and mutation-tests every manifest member; changing a policy document cannot leave the ratification root green.

### 5.2 Required conformance conditions

The `0.2` contract should enforce at least these rules through the named enforcement layer:

1. `project.license` remains required and continues to describe the Underlying Project, not the entry.
2. `record` and explicit `record.storage_profile` are required for every non-legacy `0.2` object. Owner source contains none of `project.record_state`, `record.surface_state`, `record.publication_state`, or `record.fixture_status`; the envelope uses the single canonical path `record.fixture_status` for that registry classification.
3. A registered owner source requires non-empty `record.entry_content_rights[]` and `record.registry_grants[]`. Each rights declaration binds one licensor, right, exact typed field set, instrument/hash, authority receipt, and effective time; declarations completely cover exercised Project Content without incompatible overlap. The Public Entry Statement and its distinct narrow display scope are required for a listing.
4. No rights regime or storage profile has an implicit default.
5. `consent` and all five consent fields are required for live `registered` records and constrained to `true`; an OTCS fixture never fabricates registrant consent.
6. Consent version, consent terms hash, consenting principal, `registry_participation` authority scope, authority basis, authority evidence, date, platform-disclosure version and hash, acknowledgement boolean, acknowledgement principal, and acknowledgement timestamp are required. Participation authority is verified independently of every Entry Licensor's copyright, database-right, or mark authority. Consent and platform acknowledgement must be verified and effective no later than the authoritative `version_accepted.effective_time`.
7. Every grant records current operator and exclusive appointment epoch, one licensor, covered rights, typed operating field set, operation and preservation profile IDs/hashes, storage profiles, authority `ReceiptRef`, and effective time. Profiles and scope IDs resolve through exact ratification bindings; cross-kind, split-brain-epoch, expired-epoch, or locally reserialised values fail. The generated envelope requires the source identity and staged receipt chain. An observed envelope instead requires `observation_receipt_ref` and its observation-record hash.
8. `all_rights_reserved + full_snapshot` requires an explicit full-snapshot operation profile, the role-continuing preservation subset, and complete platform-disclosure acknowledgement, all verified and effective before the `version_accepted` event. A full snapshot containing separately fetched logo bytes additionally requires a mark permission, a right-scoped byte-operation grant, a retained-asset receipt, and inclusion in the canonical snapshot manifest.
9. Every `reference_only` profile permits exactly its typed public-record storage shape. The Public Entry Statement display scope is its sole Project Content exception; widening a rights or operating scope never widens storage. Every materialised view receipt binds typed consumed projections and origin receipts, its full input-set digest, definition/transform/registry/output identities, and compatible output-rights profile.
10. `observed` requires `record`, `reference_only`, a content-addressed `observation_receipt_ref` binding every item in `observation_basis.public_sources[]`, and a complete observation basis with a verifiable frozen publication-basis type. It prohibits owner consent, owner grants, a subject-attributed Public Entry Statement, participation claims, and unpermissioned Identification Marks.
11. Fixture classification is orthogonal to lifecycle state. Every example and lifecycle fixture has a registry-issued fixture marker, `record`, and explicit storage profile; the marker forces `fixture_only` public surface behaviour without rewriting `record_state`, and no fixture can be mistaken for live consent or participation.
12. A withdrawn record resolves every retained historical object and retained asset through the append-only version ledger; no current grant, consent, asset, or profile terms are silently substituted.
13. A `reference_only` envelope schema requires its typed storage shape, source/hash/tool identities, validation time, `envelope_core_sha256`, prerequisite `ReceiptRef` values, and authority, rights, fact and statement projection identities. After that envelope is hashed, admission/governance/CI—not the envelope schema—requires the ledger `version_accepted_receipt_ref` binding its final digest. The observed sibling uses its distinct observation topology.
14. A `registered` owner source rejects withdrawal metadata. A project withdrawal is appended only after a governance-verified `record_withdrawn` request names `project_id`, `scope: project`, and the then-current head typed pair. That pair is an append-time freshness precondition, not the continuing scope: once accepted, the project withdrawal is monotone over every existing and later safe-replacement object, none of which becomes active implicitly. A version-local retirement uses `version_withdrawn`.
15. Unknown `otcs_version` values fail closed, historical `0.1` objects route only through the frozen legacy decoder, and a new `0.1` submission with authoritative `received_at >= legacy_submission_cutoff_utc` from `OTCS-RATIFICATION-0.2.json` is rejected. The timestamp source and inclusive boundary are fixed by that manifest.
16. Every mark operation is rejected unless the pinned `OTCS-MARKS-1.0` authority is complete and effective. `project.name` is not an unconditional Entry Fact: absent an exact-value mark permission the public record uses only the neutral ID and canonical locator. Identification use and operational custody of mark bytes remain separate scopes, and every retained logo asset must also resolve through the snapshot manifest.
17. `ProjectLifecycleState`, `GoverningObjectState`, `SourceResolutionState`, and `record.fixture_status` are distinct registry-controlled reductions/classifications. `SourceResolutionState` is `verified_current`, `drift_detected`, `unreachable`, or `superseded`; drift or unreachable state pauses refresh and new views, shows a warning, and never invalidates an earlier receipt. Registry Content and Joint Assertions carry immutable projection and origin receipts. Owner-supplied state, scope mixing, or mismatches fail.
18. Every Authorised Processor has a typed processor-terms receipt. For `reference_only`, compatibility requires that source bytes and all Project Content outside the Public Entry Statement are excluded from provider reuse or training and from retained logs, caches, artefacts, and backups beyond the documented transient processing interval, and that controlled copies have effective deletion or suppression controls; an absent, stale, unverifiable, or incompatible receipt fails admission. A controlled-surface reconciler requires verified deletion or suppression acknowledgements before redaction is complete.
19. `version_accepted.effective_time` is the authoritative acceptance and publication cutover on the trusted event clock. Admission appends no `version_accepted` event until every applicable grant, consent, platform acknowledgement, mark permission, profile binding, and retained-asset receipt is verified and effective. Future-dated or incomparable prerequisites do not authorise an operation.

These conditions do not all belong to JSON Schema:

| Acceptance label | Enforcement layer | Responsibilities |
|---|---|---|
| `schema` | Source and envelope JSON Schemas | Shape, required fields, enums, branch exclusions, stage separation, fixture markers, explicit profiles, owner-source state exclusions, and cross-field conditions expressible within the owner source or registry envelope |
| `admission` | Admission validator | Object-stage routing, cutoff comparison, trusted event-time ordering, owner authentication, canonical-source retrieval, exact-byte and retained-asset hashing, staged envelope construction, source-schema validation, ratified profile/toolchain binding, authority evidence, append-time withdrawal freshness, owner injection of registry-controlled fields, observed-capability gate, and legacy-route selection |
| `build` | Repository and build scanner | Exact `reference_only` public field-set enforcement, no Project Content beyond the Public Entry Statement in public outputs or controlled residue, split-scope state projections, provenance rendering, no fixture masquerading as a live record, complete view input sets, asset identity, and no redacted object returning through generated outputs |
| `governance verifier` | Governance and authority verifier | Ratification root, operator and successor appointments, every grant, independent participation consent, mark-permission, content-origin, processor-terms, withdrawal, and other lifecycle receipts; processor compatibility; relevant-right authority; observed publication basis; and right-of-reply state |
| `controlled-surface reconciler` | Deployment, mirror, and archive reconciler | Inventory of every OTCS-controlled public copy, deletion or suppression action, provider acknowledgement, retry state, and fail-closed redaction status across already-deployed surfaces |
| `legacy decoder` | Frozen legacy decoder | Interpretation of historical `0.1` objects only; it is not an admission path for a new submission |
| `CI` | Ratification-binding CI | Byte-for-byte binding of `OTCS-RATIFICATION-0.2.json` and every listed member, schema and registry constants, declared identifiers and hashes, all-object routing, current-carrier digest reproduction, historical receipt routing, and non-retention checks for OTCS-controlled validation surfaces |

A slash-separated acceptance label requires every named layer to enforce its part of the test.

| Reducer-derived `project.record_state` | Required `0.2` rights behaviour |
|---|---|
| `registered` | Require record, scoped rights declarations, storage profile, every applicable licensor and operating grant, independently authorised consent, and no withdrawal metadata |
| `withdrawn` | Preserve exact version-ledger references; require inactive participation, removal from active surfaces, and profile-specific historical state |
| `observed` | Require `reference_only`, observation basis and receipt, public-evidence provenance, publication basis, non-claims, right of reply, no owner consent/grants, and no unpermissioned mark rendering |

| `record.fixture_status` | Required behaviour |
|---|---|
| `live` | Apply the reducer-derived project lifecycle normally |
| `fixture` | Require an OTCS-authored fixture declaration and explicit profile; force `fixture_only` presentation without changing the underlying lifecycle state or representing registrant consent |

An `observed` record should use a distinct non-consent object and one canonical observed-receipt vocabulary:

```yaml
observation_basis:
  policy: OTCS-OBSERVED-0.2
  policy_sha256: "<sha256-of-fixed-observation-policy>"
  public_sources:
    - source_carrier:
        type: http_response_body
        canonical_url: "https://project.example/public-source"
      source_sha256: "<sha256-of-exact-source-octets>"
      source_byte_length: 6789
      source_media_type: "text/html"
      retrieved_at: "2026-09-15T12:00:00Z"
  publication_basis:
    basis_type: applicable_law
    basis_reference: "governance-log/events.jsonl#basis-review-id"
  non_claims:
    - not_project_controlled
    - not_participation
  right_of_reply_url: "https://otcs.example/respond/example-project"
  observed_at: "2026-09-15T12:00:00Z"

observation_receipt:
  hash_profile:
    id: OTCS-HASH-PROFILE-0.2
    sha256: "<sha256-of-frozen-hash-profile>"
  observation_source_set_sha256: "<sha256-of-rfc8785-canonical-ordered-source-items>"
  observation_record_sha256: "<sha256-of-rfc8785-canonical-observation-basis>"
  observation_receipt_ref: "receipt:sha256:<observation-receipt-digest>"
```

This branch records OTCS's own source-grounded observation and its documented publication basis. `basis_type` is a closed enum defined by `OTCS-OBSERVED-0.2`; unknown values fail admission. It does not manufacture owner permission. Schema support must not activate observed publication before the existing moderation and right-of-reply gate is formally satisfied. If the subject declines an observed page, the page comes down and the decline is logged, as the current lifecycle policy promises.

`legacy_unmigrated` is not a new owner-authored `project.record_state`. It is a registry-controlled admission state for a historical `0.1` record that has not supplied fresh `0.2` authority:

```yaml
admission:
  state: legacy_unmigrated
  manifest_version: "0.1"
  active_listing: false
```

It is decoded only for historical interpretation; it cannot sync, accept `0.2` owner updates, appear as active participation, or generate a new view. It may expose only the historical object authorised under earlier terms, or a receipt and tombstone when authority is unclear. Its legacy matrix is evaluated before the split `ProjectLifecycleState`, `GoverningObjectState`, and `SourceResolutionState` reducers; no `0.2` state can make a legacy object active. A verified `security_redacted` event with `target_kind: legacy_manifest` monotonically reduces any otherwise servable legacy material to a tombstone and non-sensitive receipts and triggers controlled-surface suppression. Migration requires fresh `0.2` rights authority, every applicable Registry Operating Grant, any required mark permission, platform acknowledgement, and consent.

### 5.3 Version transition and the authoritative ledger

Changing the rights model while retaining `otcs_version: "0.1"` would make old and new validators disagree about the meaning of the same version. OTCS-0004 should therefore introduce `0.2` or another immutable schema revision identifier.

Freeze the current schema as `project-manifest-0.1.schema.json`; add distinct `project-source-0.2.schema.json` and `registry-record-envelope-0.2.schema.json` files whose object stage and version fields are constants; and dispatch first on object stage and then on the exact declared version. Unknown stages or versions fail closed. Historical `0.1` snapshots remain interpretable only by the legacy decoder. `OTCS-RATIFICATION-0.2.json` fixes `legacy_submission_cutoff_utc`, the authoritative receipt-time source, and the inclusive rule that a new `0.1` submission received at or after that instant is rejected.

The owner-authored manifest describes one current submitted version. It must not contain an authoritative `versions[]` history. OTCS should instead maintain a registry-controlled, append-only ledger keyed by `(project_id, governing_object_kind, governing_digest)`. For an owner-submitted record, the governing object is `accepted_source` and the digest is `accepted_version_sha256`; its ledger entry additionally binds any `full_snapshot` package and child assets through `snapshot_manifest_sha256`. For an observed record the governing object is `observation_record` and the digest is `observation_record_sha256`:

```yaml
version_ledger_entry:
  project_id: example-project
  ledger_event_id: "<immutable-event-id>"
  idempotency_key: "<project-scoped-idempotency-key>"
  project_sequence: 42
  previous_event_sha256: "<sha256-of-previous-project-event>"
  expected_head: "accepted_source:<previous-head-digest>"
  governing_object_kind: accepted_source
  accepted_source_carrier:
    type: http_response_body
    canonical_url: "https://project.example/.well-known/otcs.yaml"
  accepted_version_sha256: "<sha256-of-exact-accepted-source-octets>"
  hash_profile:
    id: OTCS-HASH-PROFILE-0.2
    sha256: "<sha256-of-frozen-hash-profile>"
  record_state_at_acceptance: registered
  rights_declaration_ref: "accepted_source#/record/entry_content_rights"
  authority_projection_sha256: "<sha256-of-rfc8785-canonical-authority-projection>"
  envelope_core_sha256: "<sha256-of-receipt-free-canonical-envelope-core>"
  validation_receipt_ref: "receipt:sha256:<validation-receipt-digest>"
  authority_attestation_receipt_ref: "receipt:sha256:<authority-attestation-digest>"
  registry_envelope_sha256: "<sha256-of-final-registry-envelope>"
  rights_declaration_field_set: project-supplied-v0.2
  storage_profile: reference_only
  snapshot_manifest_sha256: null
  retained_asset_receipts: []
  rights_declarations_projection_sha256: "<sha256-of-canonical-rights-projection>"
  rights_declarations_receipt_ref: "receipt:sha256:<rights-projection-receipt-digest>"
  registry_grant_receipt_refs:
    - "receipt:sha256:<registry-grant-receipt-digest>"
  consent_receipt_ref: "receipt:sha256:<consent-receipt-digest>"
  platform_disclosure_receipt_ref: "receipt:sha256:<disclosure-receipt-digest>"
  marks_permission_receipt_ref: "receipt:sha256:<marks-receipt-digest>"
  registry_content_receipt_refs: []
  joint_assertion_receipt_refs: []
  fact_whitelist_sha256: "<sha256-of-frozen-whitelist>"
  fact_projection_sha256: "<sha256-of-canonical-projection>"
  view_instance_receipts: []
  publication_state: published
  accepted_at: "2026-09-15T12:00:00Z"
  version_accepted_receipt_ref: "receipt:sha256:<version-accepted-receipt-digest>"
  supersedes: null
```

`rights_declaration_ref` is provenance, not the retained authority object: the ledger also stores the canonical plural rights-declaration projection, its digest, and `ReceiptRef`, so a discarded or changed mutable source cannot rewrite the historical rights regime. Admission follows the acyclic sequence defined in §4.3: validate source and compute projections; hash the receipt-free `envelope_core`; issue distinct validation and authority-attestation receipts over that core; assemble and hash the final envelope; then append the external `version_accepted` receipt over the final digest and prerequisite receipt digests. The authority attestation binds the governing `accepted_version_sha256`, ratified hash profile, pinned source schema and parser, fixed pointers, projection digest, and `envelope_core_sha256`, never a self-containing final envelope. Current or immutable carriers may be re-resolved against their bytes; a superseded mutable HTTP record verifies the retained projection and signed receipts without pretending that discarded bytes remain retrievable.

For a current `http_response_body` source, admission may re-fetch the canonical URL and compare octets with the governing digest. A match reduces `SourceResolutionState` to `verified_current`; a mismatch records `source_drift_detected` and reduces it to `drift_detected`; retrieval failure yields `unreachable`; a replaced head yields `superseded`. Drift or unreachability pauses refresh, new derived views, and any claim of current verification, renders a dated warning, and does not invalidate the earlier receipt or silently remove its profile-bounded historical record. A superseded historical `reference_only` entry is verified from its signed receipt, hash-profile identity, authority attestation, and digest metadata. Historical byte reproduction is required only when the ledger recorded an immutable version locator; a mutable URL is never treated as a retriever for discarded historical bytes.

For a later version, the ledger appends another entry and, when non-null, `supersedes` points to the earlier typed pair `(governing_object_kind, governing_digest)` rather than to an untyped digest. The typed lifecycle-event vocabulary contains at least `version_accepted`, `source_drift_detected`, `record_withdrawn`, `version_withdrawn`, `observed_published`, `observed_declined`, `fixture_classified`, and `security_redacted`. Every event carries an immutable `event_id`, project-scoped idempotency key, strictly increasing project sequence, previous-event digest, `expected_head`, event type, authority `ReceiptRef`, trusted `effective_time`, target fields, and event-specific data. Append is an atomic compare-and-swap: replay of the same idempotency key returns the original result, while a competing head, duplicate ID with different bytes, sequence gap, equal-sequence event, or broken previous digest fails without creating a fork. Event time never resolves a sequence tie. An event never overwrites earlier rights, grants, consent, storage, assets, or receipts. `version_accepted.effective_time` is appended only after every prerequisite is verified and effective. `record_withdrawn` is project-scoped: its current-head typed pair is checked only as an append-time freshness condition. Once accepted, the event establishes a monotone project-level withdrawal epoch covering every existing and later safe-replacement governing object; `0.2` defines no implicit reactivation path. A request aimed only at a superseded head is rejected before append, and any version-local retirement uses `version_withdrawn`.

The reducer has two typed outputs rather than one mixed product. `ProjectLifecycleState(project_id)` contains reducer-derived `record_state` and `surface_state`; `GoverningObjectState(kind, digest)` contains `publication_state` and ledger-bound `storage_profile`; `SourceResolutionState(kind, digest)` contains carrier freshness and reachability. `security_redacted` is monotone only for its targeted governing object, while project withdrawal reduces the project surface without falsely redacting unaffected sibling objects. A view whose ordered input set contains a redacted object cannot re-render from that input. `fixture_status` is a third, orthogonal registry classification: a verified fixture event forces the public surface to `fixture_only` for any lifecycle state while preserving the underlying lifecycle history. Owner sources omit all four reducer/classification projections; rendered envelopes must equal these typed reductions.

The current schema globally requires narrative-bearing sections such as `declaration`, `coordinates`, and `evidence`. A real `reference_only` profile therefore needs the separate registry-envelope schema defined above so protected prose required in the private owner source is not forced into the public record.

### 5.4 Current schema incompatibilities

This is a genuine `0.2` migration, not an additive `0.1` property:

- `otcs_version` currently accepts only `0.1`;
- `record.additionalProperties: false` rejects the proposed rights and storage fields;
- `record` itself is optional;
- `consent` is optional, none of its fields is required, and none of its booleans is constrained to `true`;
- consent has no scope version, terms hash, or platform acknowledgement fact;
- no conditional connects `record_state` to rights, consent, observation, or withdrawal;
- a withdrawn record need not contain a withdrawal receipt, while a registered record is not prevented from carrying contradictory withdrawal metadata;
- `canonical_manifest_url` may be `null` and is not strong enough to anchor `reference_only`;
- the current schema does not encode the field-control split promised by `SYNC-POLICY.md`;
- the current model has no authoritative per-version ledger, typed retained-asset package, acyclic envelope-core receipt topology, split project/object state, orthogonal fixture classification, mark-permission object, observation basis, ratified field/profile bindings, factual-whitelist hash, or complete view input-set reference.

JSON Schema should enforce syntactic conditions. The other enforcement layers must establish that hashes name ratified bytes, authentication occurred, a source was actually fetched, a renderer excluded protected fields, and a person holds the asserted right. Calling all of those "schema validation" would merely move unresolved policy into undocumented validator code.

## 6. Normative operating grant

This is architectural wording for counsel or the maintainers to refine, not a claim that bespoke text is legally sufficient in every jurisdiction.

### 6.1 Core grant

> For Project Content and any applicable database right in the accepted version identified by its recorded hash, each relevant Entry Licensor grants the OTCS Operator a non-exclusive, royalty-free permission to perform only the operations authorised by that grant's pinned operation profile and selected storage profile, and only for the covered rights and content scope that licensor controls. The Operator may use Authorised Processors solely to perform those operations on the Operator's behalf. Identification or trademark use of an Identification Mark is governed only by the separate Identification-Marks Permission. Operational custody, reproduction, serving, mirroring, or archival treatment of exact mark bytes requires a right-scoped Registry Operating Grant covering those bytes and operations as well as the mark permission; that custody grant does not itself authorise trademark use. No other sublicense or transfer is granted.

For the promise that accepted history remains available to be true, the fixed grant must state that its accepted-version preservation subset is granted to the `otcs_operator` role, follows only a successor validly appointed through the published governance process, and is irrevocable after acceptance and publication, subject only to the separately governed security-redaction path. For this purpose, preservation includes byte-identical historical exposure under the selected profile and deterministic re-rendering of an accepted historical view solely from its receipt-bound ordered governing-input manifest, per-input projection digests, input-set digest, frozen definition, transform, view registry, output identity, and output-rights profile; changing any of them is a non-preservation operation. The current `operator_id` is an occupancy pointer, not a second grantee. Consent must surface that survival rule before acceptance. The ledger must retain every applicable grant receipt attached to each accepted hash. Every non-preservation operation remains limited to the identified operator and any expressly continuing or freshly issued bounded grant.

### 6.2 `full_snapshot` operations

> For `full_snapshot`, authorised operations are: validate; retain the exact accepted source member and each separately admitted asset named by the canonical snapshot manifest; reproduce and publish only those verified members as the accepted OTCS object; render them in registry interfaces under their distinct rights and mark scopes; mirror and archive the content-addressed package; reproduce enumerated Entry Facts in a registered Derived Registry View; and distribute that view as an OTCS output. Any missing or mismatching child asset makes the claimed package unavailable rather than silently incomplete. Any excerpt, adaptation, or unregistered transform requires an independent right.

### 6.3 `reference_only` operations

> For an owner-submitted `reference_only` record, authorised operations are: retrieve and transiently process the accepted-source carrier for validation; retain and publish exactly `otcs-reference-only-public-record-v0.2`, including its staged receipts, permitted Entry Facts, Registry Content, and the canonical Public Entry Statement projection under its narrow display grant; and use only separately registered factual inputs in a Derived Registry View. The accepted source bytes and all other Project Content are discarded after the receipt chain is produced and are absent from public repositories, mirrors, archives, views, logs, caches, and uploaded artefacts.

This non-retention boundary includes OTCS-controlled admission and CI runners, workspaces, caches, logs, and uploaded artefacts used by the Operator or an Authorised Processor. Carrier verification must stream bytes without body logging, remove transient copies after hashing, and test that no source bytes or Project Content outside the Public Entry Statement remain on those controlled surfaces. Provider-internal handling outside OTCS's direct deletion control is admissible only under a current processor-terms receipt whose recorded terms and configuration establish §5.2(18). A platform is incompatible if it permits reuse or training, retains prohibited content beyond the documented transient interval, or lacks effective deletion or suppression controls.

The surviving object for this profile is the one canonical public-record set: receipts, digest metadata, permitted facts, the bounded Public Entry Statement, Registry Content, and registered historical-view receipts. It is not an accepted source snapshot. Every lifecycle rule resolves this same field-set ID rather than restating a shorter local list.

### 6.4 Observed records are not admitted under the owner grant

> An `observed` record carries no owner consent and no owner-issued Registry Operating Grant. OTCS may publish only its own Registry Content, citations, source hashes, and Entry Facts supported by the recorded `observation_basis` and another documented lawful basis. It may not copy Project Content, imply participation, or claim authority from the subject's silence. Without a complete `OTCS-MARKS-1.0` permission record, the page must identify the subject only by a neutral registry identifier, canonical URL, and cited facts and must not render a project name, word mark, or logo as an Identification Mark.

Observed publication remains disabled until the existing moderation and right-of-reply gate is satisfied. A subject can claim, correct, respond to, or decline the observed page under the fixed policy. A decline removes the page and active index entry while preserving the fact and receipt of the decline.

### 6.5 Public-rights non-interference

> The Registry Operating Grant does not narrow, revoke, or replace permissions independently granted to Public Recipients under CC BY 4.0, CC0 1.0, another source instrument, platform terms, or applicable law.

### 6.6 Platform disclosure

> OTCS operates through public repository and hosting services whose terms may grant those services and public users permissions independent of this Registry Operating Grant. Before selecting `full_snapshot`, the registrant is shown the fixed platform disclosure, its version, and its hash, and affirmatively acknowledges it as the recorded principal at the recorded time. OTCS does not describe all-rights-reserved as protection from permissions created by a platform agreement the registrant has accepted.

For all-rights-reserved content, `reference_only` is the registration tool's safe recommendation but must still be selected explicitly. `all_rights_reserved + full_snapshot` fails admission unless the pinned grant covers the public-hosting path and `platform_disclosure_acknowledged`, its principal, and its timestamp are complete. If a platform's operative terms are incompatible with the promised profile, that platform must not hold the full snapshot.

### 6.7 Succession

> A Successor Operator receives no broader rights than its predecessor. After appointment and acceptance of operator obligations, it may exercise only the role-continuing preservation subset attached at admission to each governing object. That subset authorises profile-bounded historical exposure of the exact content-addressed snapshot package or canonical reference-only public record, and re-render of a historical view solely from the frozen complete input set and transform. It does not authorise new ingestion, a changed asset, input, field set, or transform, active presentation, or another non-preservation operation. Those operations require express continuity or fresh grants and any fresh consent or platform acknowledgement. Every historical object and child asset remains governed by its version-bound rights, receipts, storage profile, and mark permissions.

### 6.8 External material

> A submitting representative asserts authority only for the rights and content classes expressly named in its authority record. Every copied item of External Material records its source and rights basis. Without that record, OTCS is limited to a citation, URL, hash, and Registry Content; it does not relicense the external material through the entry's rights declaration.

### 6.9 Identification marks

> Each submitted project name, word mark, or logo has a typed permission record tied to the fixed `OTCS-MARKS-1.0` instrument, version, and hash and naming authority, permitted use, effective time, and survival rule. `project.name` is never an unconditional factual-whitelist path: a name or word mark may render only when the exact value is covered for identification and attribution; otherwise OTCS uses the neutral ID and canonical locator. A logo requires exact-octet SHA-256, byte length, media type, explicit `logo_mark` authority, and an optional external URL used only as a locator. Under `reference_only`, unavailable or mismatching bytes are suppressed. Under `full_snapshot`, separately fetched logo bytes must additionally appear as a typed child in the canonical snapshot manifest with an immutable locator and retained-asset receipt; the mark permission authorises identification, while a right-scoped grant separately covers every custody and byte operation. Either missing key rejects the package. A word-mark permission never covers a logo, and a factual or external-material basis never substitutes for mark permission.

### 6.10 Applicable database rights

> To the extent a recorded Entry Licensor controls an applicable database right in the submitted compilation, the Registry Operating Grant includes only the extraction and reutilisation needed for the enumerated Entry Facts and registered Derived Registry Views. The `database_right` authority scope and its evidence are required before relying on that grant. No broader database reuse is inferred. Rights independently supplied by CC BY 4.0, CC0 1.0, another instrument, or applicable law remain unaffected.

## 7. Lifecycle operation matrix

Project lifecycle, fixture classification, and per-object publication safety are distinct typed scopes. One rendered live record shows their join:

```yaml
project_lifecycle_state:
  project_id: example-project
  record_state: registered
  surface_state: active

governing_object_state:
  governing_object_kind: accepted_source
  governing_digest: "<accepted-version-hash>"
  publication_state: published
  storage_profile: reference_only

record:
  fixture_status: live

source_resolution_state: verified_current
```

`ProjectLifecycleState` admits `registered × active`, `withdrawn × historical_only`, `observed × active`, and `observed × receipt_only` after verified decline. `GoverningObjectState` admits `published` or `security_redacted` with an explicit storage profile. `SourceResolutionState` independently records current-carrier verification. A verified `record.fixture_status: fixture` overrides the public surface to `fixture_only` for any valid underlying lifecycle state, including a withdrawn demonstration; `example` is not a project lifecycle state. Operations consume one project state and the particular object state or ordered input set they touch; there is no single four-axis tuple pretending that all objects share one publication state. Redaction suppresses only the targeted object and outputs whose receipt includes it, while project withdrawal suppresses the project surface and remains monotone across later objects. The separate `legacy_unmigrated` matrix is evaluated first.

The important repair is to define each public operation. Rows compose conjunctively: project lifecycle controls project-wide acts; object publication state and source resolution can only restrict, never expand, those acts; a targeted redaction affects only operations whose inputs include that object, not an unaffected sibling:

| Operation | Active project + published object | Withdrawn project + published object | Any project + targeted redacted object |
|---|---:|---:|---:|
| Accept a new project version | Yes, through review and a new ledger receipt | No, except an append-only factual or security correction | A safe replacement is possible only when project lifecycle separately permits it; it never reactivates a withdrawn project |
| Fetch or sync the canonical source | Yes, under policy | Stop routine fetching and sync | Do not fetch or republish the unsafe payload |
| Serve an active canonical project page | Yes | No; return a minimal tombstone or `410`, not the former project page | No |
| Include the project in active indexes and participation counts | Yes | No | No |
| Serve the retained historical object | According to profile | Through a distinct, visibly historical archive endpoint and only according to profile | No unsafe object; serve a safe surrogate or tombstone |
| Mirror or archive the retained historical object | According to profile and processor scope | Preserve only the historical operations already granted | Remove or suppress controlled public copies; restricted retention only under security policy |
| Re-render an existing historical view | From the complete receipt-bound ordered input manifest | Yes, solely from that complete frozen input set, definition, transform, registry, and output-rights profile | No re-render whose input set includes the targeted object; unaffected siblings remain eligible |
| Create a new analytical derivative from Project Content | Only with the applicable rights, consent, and registered transform | No | No |
| Maintain registry-authored disputes, corrections, and provenance | Yes | Yes, visibly dated after withdrawal | Yes, without restoring removed material |
| Present the project as actively participating | Yes | No | No |
| Preserve hashes, decision history, and audit receipts | Yes | Yes | Yes, without preserving an unsafe public payload |
| Recall public forks or uncontrolled archives | No promise of recall | No promise of recall | Best-effort notices only; controlled copies must be addressed |

The remaining published base combinations are closed as follows:

| Combination | Allowed public behaviour | Forbidden public behaviour |
|---|---|---|
| (`observed`, `active`, `published`, `reference_only`) | Observation-labelled page, citations, receipt, permitted facts, right-of-reply route, and reviewed source refresh under the observed policy | Participation claim, owner sync, Project Content, unpermissioned Identification Marks, or owner-grant inference |
| (`observed`, `receipt_only`, `published`, `reference_only`) | Decline receipt and non-content audit history only | Subject page, active index entry, source refresh, derived view, or participation claim |
| (`record.fixture_status: fixture`, `surface override: fixture_only`, published object, explicit profile) | Validator, build, and CI fixture surfaces clearly marked as non-live while preserving the underlying lifecycle state, including `withdrawn` | Live or historical project page, active index entry, participation count, or registrant-consent claim |

For `full_snapshot`, the retained historical object is the canonical snapshot manifest plus the exact source and retained-asset members whose identities and receipts it binds. For `reference_only`, it is exactly `otcs-reference-only-public-record-v0.2`, including receipts, digest metadata, permitted facts, the Public Entry Statement, Registry Content, and registered historical-view receipts. The latter profile has no source snapshot that OTCS can serve or mirror.

The withdrawal clause should read:

> The active project page goes, the project leaves active indexes and participation counts, routine ingestion and sync stop, and OTCS creates no new analytical derivative from Project Content. A distinct historical record survives only under the permissions, object receipts, and storage profile attached to each accepted hash. For `full_snapshot`, that may include the immutable content-addressed package; for `reference_only`, it is the canonical public-record field set, including the bounded historical Public Entry Statement and existing registered-view receipts. Withdrawal does not revoke rights previously granted to public recipients under CC BY, CC0, another instrument, platform terms, or applicable law.

Only a governance-verified project-scoped `record_withdrawn` event may drive this transition. It names `project_id`, `scope: project`, and the current head typed pair. Authentication, authority, head match, freshness, and receipt integrity are append-time checks; a stale or superseded-head request never enters the ledger. After append, the withdrawal epoch is project-wide and monotone: it reduces every current and later safe-replacement surface without rewriting version-bound rights, receipts, assets, or object publication states. A later `version_accepted` or security-safe replacement cannot reactivate the project under `0.2`.

An `observed` record is not participation. If the existing publication gate is later opened, it uses only `reference_only`, a complete `observation_basis` with a documented publication basis, an explicit right-of-reply route, and an observation-labelled page outside active participation counts. A verified `observed_declined` event leaves `record_state: observed`, reduces `surface_state` to `receipt_only`, removes the page and active index entry, and leaves only the decline receipt and non-content audit history.

`legacy_unmigrated` is a registry admission state, not an owner value. Its matrix is evaluated before the split project-lifecycle, governing-object, and source-resolution reducers and remains subject to monotone security redaction:

| Operation | `legacy_unmigrated` |
|---|---:|
| Decode the historical `0.1` object | Yes, through the frozen legacy decoder |
| Accept sync or an owner update under `0.2` | No |
| Appear as active participation | No |
| Create or recompute a Derived Registry View | No |
| Serve historical material | Only the exact object already authorised under earlier terms; otherwise receipt and tombstone only |
| Apply a security correction | Yes, append-only and without upgrading authority; `security_redacted` leaves tombstone and non-sensitive receipts only and triggers controlled-surface suppression |
| Migrate | Only after fresh `0.2` rights authority, every applicable grant, any required mark permission, platform acknowledgement, and consent |

Security redaction remains separate:

> Security redaction removes or replaces material whose continued publication would create a documented security, privacy, or legal risk. The public record retains a tombstone, the affected hashes, the authority for the redaction, and the non-sensitive decision history. Security redaction is not ordinary withdrawal and must not become an unlogged deletion path.

The repository and build scanner proves only that generated outputs no longer contain the payload. The controlled-surface reconciler separately inventories every OTCS-controlled deployment, mirror, and archive, issues deletion or suppression actions, records provider acknowledgements, and leaves the redaction incomplete and fail-closed for any controlled public surface without a verified acknowledgement. Uncontrolled public forks remain limited to best-effort notice.

## 8. Migration plan

### Phase 0 — freeze the policy surface

- Either pause third-party registration until the `0.2` terms are fixed, or pin every interim submission to the exact terms version accepted at submission.
- Do not state that future, unwritten terms automatically govern an earlier submission.
- Publish `OTCS-RATIFICATION-0.2.json` as the canonical ratification manifest. It lists exact digests for the proposal, all nine companion artefacts, both `0.2` schemas, every operation, preservation, field-set and hash-domain registry or subresource binding, pinned toolchain registry, lifecycle-event and split-scope reducer specification, migration inventory, cutoff, receipt-time source, and inclusive boundary. The governance decision identifies the manifest digest.

### Phase 1 — repair the repository licence and lifecycle mapping

- Amend the DCO to distinguish Project Content, Registry Content, and the separate Registry Operating Grant.
- Amend the root outbound-licence mapping or add an explicit entry-rights notice so a per-entry declaration is not contradicted by the repository-level default.
- Clarify the already named scope of `LICENSE-SPECS` and state where registry entries are governed instead.
- Amend `CHARTER.md` §§1, 8, 10, 12, and 13 and participation mode D together: preserve the public attributable claim through the bounded Public Entry Statement, while "everything stays available" and "records ... openly licensed" apply only to the forkable registry substrate—formats, tooling, Registry Content, receipts, and permitted facts—without relabelling the statement or other Project Content or overriding security redaction.
- Update `CONTRIBUTING.md`, `PARTICIPATION.md`, `REGISTERING.md`, `GOVERNANCE.md`, `PROJECT-LIFECYCLE.md`, `SYNC-POLICY.md`, `REGISTRY-POLICY.md`, `PRIVACY.md`, and `OWNER-RESPONSE-POLICY.md` to use the same actors, content classes, active-page rule, observed gate, and historical-object terminology.

### Phase 2 — ship the `0.2` contract and conformance suite

- Add plural licensor-scoped rights declarations, typed operating/display/storage scopes, right-scoped grants, independent consent authority, mark permission, storage and source-resolution states, content-addressed `ReceiptRef` objects, platform acknowledgement, observation basis, and view definition/output-rights fields.
- Add state-dependent requiredness and cross-field conditions to the separate owner-source and registry-envelope JSON Schemas.
- Add the admission validator, staged receipt builder, retained-asset registry, toolchain and scope/profile registries, output scanner, governance verifier, observation and authority receipts, operator/key epochs, view input/output-rights receipts, controlled-surface reconciler, and an atomic replay-safe event chain with split project/object/source reducers.
- Add a frozen decoder for historical `0.1` objects.
- Reject a new `0.1` submission when its authoritative receipt time is at or after `legacy_submission_cutoff_utc` from the ratification manifest.

### Phase 3 — migrate every current manifest class

The migration inventory must cover the whole validating corpus, not only the three records whose state is `registered`:

- `registry/projects/abt/otcs.yaml`;
- `registry/projects/ktp/otcs.yaml`;
- `registry/projects/ktp-demo/otcs.yaml`;
- the four `ex-*` example manifests;
- `registry/projects/lifecycle-fixture/otcs.yaml`.

For the three registered records:

- obtain an owner-authenticated content-rights selection;
- obtain fresh consent and platform acknowledgement against the new hashes;
- attach every applicable Registry Operating Grant receipt, any mark-permission receipt, and relevant-right authority to the exact accepted hash;
- record the storage profile, canonical public-record and Public Entry Statement field sets, factual whitelist, projection hashes, staged envelope receipts, any snapshot-package assets, and version-ledger receipts;
- do not reuse an old consent date as assent to new definitions.

For examples and the lifecycle fixture:

- mark them mechanically as fixtures through the orthogonal `fixture_status` path while retaining the lifecycle fixture's `withdrawn` history;
- require `record` and an explicit storage profile for each non-legacy fixture envelope;
- give examples an explicit OTCS-authored rights declaration, preferably CC0 1.0 with `full_snapshot`, and identify the actual OTCS author or rights holder;
- do not fabricate registrant consent for an example;
- force `fixture_only` public behaviour so no fixture renders as a live or historical project-rights claim.

Do not infer that the lifecycle fixture's earlier consent covered the new grant text. If fresh authority cannot be obtained, keep it visibly on the `0.1` legacy validation path rather than manufacturing a `0.2` receipt.

If a live owner does not re-consent, assign the registry-side `legacy_unmigrated` admission state defined in §7. Do not select a licence or write a new owner source on the owner's behalf. Remove the record from active participation surfaces, stop sync and new analysis, and preserve only the historical object or receipt that the earlier terms actually authorised.

No current `observed` project record exists. Do not use migration as a back door to activate that capability: activation remains contingent on the existing moderation and right-of-reply gate.

### Phase 4 — activate only after validation

- Run the complete conformance suite over every owner source, registry envelope, fixture, ledger entry, output, and lifecycle branch. Current carriers take the live reproduction route; superseded `reference_only` HTTP entries take the receipt-backed canonical public-record route unless they record an immutable version locator.
- Render every project-lifecycle × fixture-status × governing-object × source-resolution × storage-profile combination.
- Verify that active and historical notices show, as applicable, the content-rights instrument and every applicable owner-grant receipt or the observation-policy and content-addressed observation receipt; the governing-object kind and digest; storage profile; project lifecycle, fixture, object-publication, and source-resolution states; and provenance without implying broader authority.
- Reopen registration only when the fixed terms, validators, ledger, and rendered outputs agree.

## 9. Acceptance tests

These tests form a conformance suite, not a claim that JSON Schema can observe authentication, time, renderer output, or governance. Each test names the component that must enforce it.

### 9.1 Manifest-structure tests

1. **[schema]** A `registered` record without `record` fails.
2. **[schema]** A `withdrawn` record or lifecycle fixture without `record` or an explicit `storage_profile` fails.
3. **[schema]** An `observed` record without `record` or an explicit `storage_profile` fails.
4. **[schema]** A registered record without a non-empty `entry_content_rights[]` collection fails.
5. **[schema/governance verifier]** A rights declaration without licensor, covered right, exact `rights_declaration_field_set`, regime/instrument pair, authority receipt, or effective time fails; incomplete coverage or incompatible overlap also fails.
6. **[schema]** A registered record without `storage_profile` fails.
7. **[schema/admission/CI]** A registered owner source without a non-empty `registry_grants[]` collection fails; each item also fails without covered rights, covered field set, selected storage profiles, or operation/preservation profile IDs and hashes that resolve through exact ratification-manifest bindings.
8. **[schema]** A rights declaration without an explicit `regime` fails; no default is inserted.
9. **[schema]** A registered record missing any of the five consent scopes, or setting one to `false`, fails.
10. **[schema/admission/governance verifier]** A consent record without terms version, terms hash, principal, `registry_participation` authority scope, authority basis, authority evidence, consent time, platform-disclosure version and hash, acknowledgement boolean, acknowledgement principal, or acknowledgement timestamp fails; an asserted project representative without verifiable participation authority is rejected independently of Entry Licensor status, and a future-dated consent or acknowledgement cannot precede `version_accepted`.
11. **[schema/admission/governance verifier]** A registered source missing scoped rights, storage, statement, consent, or grants fails. The envelope schema requires source identity, typed storage shape, core digest, prerequisite receipt refs, and frozen rights/authority/fact/statement projections; only post-hash ledger validation requires `version_accepted_receipt_ref` and its final-envelope binding.
12. **[schema]** Any `entry_content_rights[]` item using `open_licence` without frozen `CC-BY-4.0` instrument identity fails.
13. **[schema]** Any rights item using `public_domain_dedication` without frozen `CC0-1.0` identity fails.
14. **[schema]** Any rights item using `all_rights_reserved` with a public licence instrument fails.
15. **[schema/admission/governance verifier]** `all_rights_reserved + full_snapshot` without every applicable full-snapshot operation profile, role-continuing preservation scope, and complete platform-disclosure acknowledgement boolean, principal, and timestamp fails schema; a structurally complete record for which any necessary grant does not cover the declared public-hosting path, selected byte operations, or effective-time boundary fails admission.
16. **[schema/build]** A `reference_only` public record whose fields differ from `otcs-reference-only-public-record-v0.2`, or that contains Project Content outside the exact canonical Public Entry Statement projection, fails regardless of rights regime; `project.name` also fails without an exact-value effective mark permission.
17. **[schema/admission/CI]** A `reference_only` envelope missing source, hash/tool, typed storage shape, authority, frozen rights, fact, statement, core, or prerequisite receipt identity fails. A mutable current carrier missing `SourceResolutionState` fails. Owner-supplied reducer or fixture state and any cross-kind scope ID fail. Final-envelope acceptance is checked only in the ledger stage.
18. **[schema]** An `observed` record that asserts owner consent or an owner-issued Registry Operating Grant fails.
19. **[schema/admission/governance verifier]** An `observed` record without hash-profile ID and hash, observation policy hash, per-source typed carrier, locator, exact-octet hash, byte length, media type and retrieval time, `observation_receipt_ref`, observation-record hash, publication-basis type and reference, non-claims, right-of-reply URL, or observation time fails; a publication-basis type outside the frozen `OTCS-OBSERVED-0.2` vocabulary fails, and a structurally valid but unverified source or publication-basis reference is rejected.
20. **[schema/admission]** A fixture without canonical `record.fixture_status: fixture`, `record`, explicit storage profile, and OTCS fixture declaration, or one with fabricated consent, fails. A withdrawn fixture stays `withdrawn` and reduces to `fixture_only`; any `example` value in `record_state` is invalid.
21. **[schema/admission/governance verifier/build]** An owner source carrying withdrawal metadata, Registry Content, Joint Assertions, `record_state`, `surface_state`, `publication_state`, or `fixture_status` fails; an envelope with unreceipted controlled content or any project, object, or fixture projection differing from its typed reduction fails.
22. **[schema/admission/governance verifier]** A withdrawal request lacking project scope, expected head, immutable event/idempotency IDs, sequence, previous digest, or authority `ReceiptRef` fails. Atomic CAS rejects stale, concurrent-fork, replay-with-different-bytes, duplicate-ID, equal-sequence, and broken-chain cases; an accepted withdrawal remains monotone over safe replacements.
23. **[schema/admission/governance verifier]** An incomplete or future-dated mark record fails; `project.name` is suppressed unless its exact value resolves through the effective word-mark scope. A logo additionally requires exact-octet identity and, for `full_snapshot`, a snapshot-manifest child and retained-asset receipt; an observed record cannot bypass either branch.
24. **[schema/admission/governance verifier]** Any operation lacking every relevant typed authority fails. A mark-bearing `full_snapshot` additionally requires mark permission, right-scoped byte grant, retained-asset receipt, and snapshot-manifest membership; any missing key fails.

### 9.2 Version-route and admission tests

25. **[admission]** An unknown `otcs_version` fails closed.
26. **[admission/CI]** Before/at/after fixtures use the authoritative receipt-time source and the cutoff in `OTCS-RATIFICATION-0.2.json`: a new submission using `otcs_version: "0.1"` is eligible only when `received_at < legacy_submission_cutoff_utc` and fails at or after the cutoff.
27. **[legacy decoder]** A frozen historical `0.1` fixture still decodes through the frozen `0.1` route and is not reinterpreted as `0.2`.
28. **[admission]** A registered submission whose owner authentication or representative chain cannot be established is rejected even when its YAML is structurally valid.
29. **[admission/governance verifier]** The governance verifier establishes the recorded state of the moderation and right-of-reply activation gate, and admission rejects an observed page while that gate is closed.
30. **[admission/governance verifier/build]** A verified subject decline appends an authorised `observed_declined` event, reduces the observed record to `surface_state: receipt_only`, removes the page and active index entry, records the decline, and never creates a participation record; an unauthorised or unverifiable decline event is rejected.
31. **[admission/governance verifier/build/controlled-surface reconciler]** `legacy_unmigrated` is evaluated before the split project/object/source reducers and cannot sync, accept a `0.2` update, appear active, or create a view; redaction leaves only tombstone and non-sensitive receipts and is irreversible by a legacy event; migration requires fresh complete authority.
32. **[admission/governance verifier]** Admission rejects a missing preservation subset or operator epoch. Exactly one appointment epoch is current; predecessor/successor overlap, a delayed processor job bound to the old epoch, or non-preservation work without fresh continuity fails.

### 9.3 Lifecycle and output tests

33. **[admission/governance verifier/build]** A valid project withdrawal checks the current head only at append, then monotonically disables sync, owner updates, active page, and indexes across the whole project. In A accepted → withdrawal(A) → safe replacement B, B remains non-active and historical-only; a stale request aimed at superseded A never enters the ledger.
34. **[governance verifier/build]** A withdrawn `full_snapshot` may serve only the verified snapshot package named by `snapshot_manifest_sha256`; every source or asset member must match kind, digest, length, media type, immutable locator, and receipts, and a missing child makes the package unavailable.
35. **[governance verifier/build]** A withdrawn `reference_only` record serves exactly the canonical public-record set, including the bounded Public Entry Statement and registered historical-view receipts; no source snapshot or other Project Content is served or mirrored.
36. **[admission/build]** Withdrawal does not create a new analytical derivative from Project Content.
37. **[governance verifier/build]** A historical view re-renders only from its receipt-bound ordered typed inputs, consumed projection and origin-receipt identities, input-set digest, definition, transform, registry, output identity, and output-rights profile. Missing, redacted, drifted, or rights-incompatible inputs block it.
38. **[build/controlled-surface reconciler]** Build scanning prevents removed material from returning through generated pages, indexes, exports, or historical-view re-renders. The controlled-surface reconciler inventories every OTCS-controlled deployment, mirror, and archive, verifies deletion or suppression acknowledgements, and fails closed while any controlled public copy remains unacknowledged, for both storage profiles and including a withdrawn record.
39. **[governance verifier/build/controlled-surface reconciler]** The suite crosses every `ProjectLifecycleState`, orthogonal fixture status, and applicable `GoverningObjectState`. Object redaction suppresses only its target and dependent view inputs; project withdrawal suppresses the project surface; neither scope can restore the other, and controlled copies of affected objects remain suppressed.
40. **[build]** Every OTCS-generated page, notice, export, and machine-readable rights label treats the Registry Operating Grant as operator-scoped and does not present it as restricting Public Recipients or public forks; any statement of public rights points to the applicable content instrument, platform terms, and law.

### 9.4 Provenance, marks, and view tests

41. **[admission/governance verifier/build]** Owner injection of Registry Content or Joint Assertions is rejected; every Registry Content value resolves one authenticated origin receipt and every Joint Assertion resolves every named contributor confirmation. Project Content, Entry Facts, Registry Content, Joint Assertions, External Material, Identification Marks, and the explicit exclusion of the Underlying Project then render with distinct provenance and rights notices.
42. **[build]** Registry-authored correction text is not labelled as project-licensed merely because it appears beside Project Content.
43. **[build]** An External Material excerpt cannot enter an output without source attribution and a documented rights basis.
44. **[admission/governance verifier/build]** `project.id` renders as an Entry Fact, but `project.name` renders only under an effective exact-value `OTCS-MARKS-1.0` scope. A `reference_only` logo is suppressed on missing authority or identity mismatch. A `full_snapshot` logo additionally requires byte-operation grant, typed retained-asset receipt, snapshot-manifest membership, and retrievable matching bytes; suppression cannot fake package completeness.
45. **[governance verifier/build]** A view fails for an unregistered input/transform, incomplete typed consumed projection or origin receipt, input-set mismatch, missing frozen output-rights profile, redacted input, Project Content treated as fact, missing database basis, or incompatible outbound rights.

### 9.5 Ratification-binding CI tests

46. **[governance verifier/CI]** CI recomputes the ratification root over all companions, schemas, registries, event/receipt/reducer specs, migration inventory, cutoff, and every operative Phase 1 policy document; an unbound document must be a generated non-normative mirror. Mutation, omission, ambiguous slice, or stale mirror fails.
47. **[CI]** The recorded operating-grant hash equals the SHA-256 digest computed over the exact frozen grant-artefact bytes.
48. **[CI]** The recorded platform-disclosure hash equals the SHA-256 digest computed over the exact frozen disclosure-artefact bytes.
49. **[CI]** Every type-tagged rights, operating, statement-display, fact, and storage-shape ID resolves one exact binding. Cross-kind substitution fails; display scope is contained in operating scope and storage shape; widening rights scope cannot widen retention; name is absent from unconditional facts.
50. **[governance verifier/build/CI]** Every view resolves a frozen definition/registry and output-rights profile; its receipt binds ordered typed consumed projections, origin receipts or final-envelope digests, input-set digest, definition/transform/registry versions, output digest, and rights labels.
51. **[admission/governance verifier/CI]** Governance establishes participation authority, complete per-licensor rights coverage, operator epoch, and every exercised copyright/database/mark scope. Admission verifies content-addressed receipts under the signing key epoch and inclusion proof before operation; CI routes all eight current objects through their declared stage.
52. **[admission/governance verifier/build/CI]** Every digest resolves a ratified domain. Independent vectors cover source/assets, snapshots, observations, authority/rights/fact/statement projections, envelope stages, event chains and ReceiptRefs, typed view inputs/rights/outputs, and ratification. Self-reference, cross-domain substitution, receipt mutation/reordering, wrong key epoch, broken inclusion proof, replay, or event fork fails; prohibited residue is absent.
53. **[CI]** The recorded observation-policy hash equals the SHA-256 digest computed over the exact frozen `OTCS-OBSERVED-0.2` bytes, and the schema, validator, and rendered notice resolve the same version and hash.
54. **[CI]** The recorded mark-permission identifier and frozen hash reproduce; every rendered name resolves the exact authorised value and scope, every logo matches exact-octet identity, and every full-snapshot logo also resolves snapshot-manifest membership and retained-asset receipt. Alternate-basis, identity-mismatch, missing-asset, or future-dated branches fail.

## 10. Ratification gates

OTCS-0004 should return to decision only when all of the following are true:

- the proposal contains the exact operative wording rather than a promise of post-ratification drafting;
- the governance decision identifies one ratification manifest binding companions, schemas, type-tagged scopes/profiles, toolchain, receipt/event chain, operator/key epochs, split reducers, cutoff, migration inventory, and exact bytes of every operative Phase 1 policy document or its declared generated mirror;
- the DCO, outbound licence mapping, `CHARTER.md` §§1, 8, 10, and 12–13, participation mode D, `CONTRIBUTING.md`, `REGISTERING.md`, `GOVERNANCE.md`, `PROJECT-LIFECYCLE.md`, `SYNC-POLICY.md`, `REGISTRY-POLICY.md`, `PRIVACY.md`, `OWNER-RESPONSE-POLICY.md`, and both schemas use the same actors, Public Entry Statement, content classes, withdrawal surfaces, and observed-record gate;
- both new schema versions, every companion and operative-registry hash, every exact subresource binding, every digest-domain vector, and the ratification-manifest hash are fixed and recomputed by CI;
- every current manifest, fixture, historical `0.1` object, and non-consenting migration outcome has an explicit treatment;
- observed publication remains disabled unless its existing moderation and right-of-reply prerequisites are formally satisfied;
- the complete conformance suite passes in the enforcement layer named by each case;
- any material change restarts or extends the governance clock according to the existing process;
- the public text continues to state that the architecture is not a substitute for jurisdiction-specific legal advice.

Independent legal review is advisable before relying on a bespoke operating grant. It is not a substitute for fixing the architectural contradictions first: counsel should be asked to review one coherent rights model, not choose among several unstated implementations.

## 11. Concrete contribution offered

If this direction is useful, I can contribute the repair as three reviewable artefact sets under Chris's and the maintainers' governance:

1. a one-page rights, authority, storage, and lifecycle matrix;
2. exact proposal, companion-text, schema-family, ledger, and renderer diffs;
3. validator and build fixtures covering the fifty-four cases above.

The contribution can enter the public deliberation record as an exhibit or patch. OTCS-0004 remains Chris's proposal; the maintainers decide what to adopt; the existing governance clock remains controlling.

My position is therefore direct but supportive: **the proposal identifies the right defect, but its present field model cannot yet carry the remedy. Split the rights surfaces, type the actors and relevant-right authority, define the retained object for each storage profile, bind consent to fixed terms, make withdrawal operational across every public surface, and vote on the actual patch.**

## Source set

- [OTCS-0004 proposal](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/proposals/OTCS-0004/proposal.md)
- [OTCS-0004 proposal metadata](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/proposals/OTCS-0004/proposal.yaml)
- [DCO](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/DCO.md)
- [Root Apache-2.0 licence](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/LICENSE)
- [`LICENSE-SPECS`](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/LICENSE-SPECS)
- [Charter](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/CHARTER.md)
- [Contribution guide](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/CONTRIBUTING.md)
- [Participation terms](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/PARTICIPATION.md)
- [Registration guide](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/REGISTERING.md)
- [ABT manifest](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/registry/projects/abt/otcs.yaml)
- [KTP manifest](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/registry/projects/ktp/otcs.yaml)
- [KTP demo manifest](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/registry/projects/ktp-demo/otcs.yaml)
- Example manifests: [gatekeeper](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/registry/projects/ex-gatekeeper/otcs.yaml), [ledgerline](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/registry/projects/ex-ledgerline/otcs.yaml), [mendwell](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/registry/projects/ex-mendwell/otcs.yaml), and [watchtower](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/registry/projects/ex-watchtower/otcs.yaml)
- [Lifecycle fixture manifest](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/registry/projects/lifecycle-fixture/otcs.yaml)
- [Registry policy](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/REGISTRY-POLICY.md)
- [Project lifecycle](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/PROJECT-LIFECYCLE.md)
- [Sync policy](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/SYNC-POLICY.md)
- [Privacy policy](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/PRIVACY.md)
- [Owner-response policy](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/OWNER-RESPONSE-POLICY.md)
- [Governance](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/GOVERNANCE.md)
- [Manifest schema](https://github.com/open-trust-commons/otcs-registry/blob/92e1436dce28b1aad1e719048f5c6202df5692ee/schemas/project-manifest.schema.json)
