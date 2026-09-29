# How shared vocabularies actually get adopted

*Research note · 2026-08-03 · figures about this registry are as of that date*

**Question.** OTCS has published a coordinate vocabulary (`docs/coordinate-system.md`). What actually caused builders to adopt comparable vocabularies elsewhere — and what caused others to be ignored?

**Method.** Primary sources only: official specs, project repositories and git history, first-party announcements, standards documents, regulator publications. Every factual claim carries a URL. Where a date or fact could not be established from a primary source it is marked **not established** rather than estimated.

---

## Cross-case summary

Across every case below, **no vocabulary was adopted as a vocabulary.** In each successful case the vocabulary reached builders inside something else: a scanner's output, a package manager's warning, a search result, a CI action, a one-click export button, or a badge image. The vocabulary was the *payload*; the artifact was the *vehicle*. Where an artifact existed, adoption began within months. Where it did not, the vocabulary either sat unused for a decade (SPDX documents, 2011–2021), sat unused permanently (SWID, DOAP), or was formally de-listed by the regulator that had previously named it (SWID, 2021 → 2026).

Three distinct first-use triggers appear, and only three:

| Trigger | Mechanism | Cases |
|---|---|---|
| **A tool emitted it** | The builder never chose the vocabulary; a scanner, SDK, or plugin wrote it into their output | CVE, CWE, OpenTelemetry semconv, CycloneDX, SPDX license identifiers, SLSA provenance |
| **A consumer paid for it** | A party the builder wanted something from read the vocabulary and gave visible value back | schema.org (rich results), CII badge (green badge + CNCF graduation), SARIF (GitHub code-scanning UI) |
| **A mandate demanded it** | A regulator, customer, or foundation required the artifact | SPDX/CycloneDX post-EO-14028, XBRL, CNCF graduation criteria |

A fourth possible trigger — *"a question it answered that nothing else did"* — does not appear anywhere as a **first-use** cause. It appears repeatedly as the *authors'* motivation and as the *retrospective* justification, but in no case did it move a builder on its own. This is the single most important disconfirming finding in this note, and it is unwelcome for a project whose instrument is a vocabulary.

The clearest natural experiment is SBOM formats. In July 2021 NTIA named **three** formats — SPDX, CycloneDX, and SWID — under identical regulatory force. Five years later CISA and eighteen international partners named **two**, and the stated selection criterion was tooling, not merit: *"The two data formats currently widely used by software ecosystem stakeholders to generate and consume SBOMs are SPDX and CycloneDX."* Same mandate, same document, same authority; the format without producing and consuming tools was dropped.

The second-clearest finding is **the smallest embeddable unit wins**. SPDX-the-document had thin uptake for ten years. `SPDX-License-Identifier`, a one-line string from the same project, went into 11,139 Linux kernel files in a single commit in 2017 and into npm's validator in 2015. Dublin Core ran both experiments at once: fifteen elements made mandatory by a protocol reached 7,103 repositories, while the expressive DCMI Abstract Model reached — by its own maintainers' 2011 admission — nobody they could name.

Two more results are worth stating up front because they contradict what a standards-shaped intuition predicts.

**Standards status does not predict adoption; consumer support does.** Microdata *never reached W3C Candidate Recommendation* and was formally retired in 2021, yet it beat RDFa, a full Recommendation since 2008 — because Google chose it in 2011. The W3C wrote the rule down itself in 2012: *"To decide which to use, your first consideration has to be **which consumers will read the data** within your web pages, and which formats they support."* The same body later attributed JSON-LD's success (10–18.2% of all websites) *"largely to its adoption as a recommended format by schema.org"* — a search-engine consortium, not the Recommendation process.

**An artifact that consumes the *presence* of a declaration rather than its *truth* can kill a vocabulary.** P3P had a browser feature reading it. W3C's own obsoletion notice records what happened: administrators *"chose to copy general policies rather than encode specific policies,"* and *"no enforcement action followed when a site's policy… failed to reflect their actual privacy practices."* Under 6% support by 2018, no user agents interpreting it. This is the failure mode nearest to a self-declaration registry.

### Case index

| # | Vocabulary | Engine | Time to first outside adoption |
|---|---|---|---|
| 1 | CVE | Tool emitted it | ~15 months to 29 orgs / 43 products |
| 2 | CWE | Tool emitted it (+ the Top 25 as a derived artifact) | ~24 months to first named vendor declaration |
| 3 | schema.org | Consumer paid for it | Consumers pre-existed the vocabulary |
| 4 | SPDX + `SPDX-License-Identifier` | Mandate (documents) / tool (identifiers) | 4 years (npm), 6 years (kernel), 12 years (GitHub export) |
| 5 | **SWID** | Mandate without tools | **Never — de-listed by CISA, 2026** |
| 6 | CycloneDX | Tool emitted it — *tool predates format* | **−18 days** (external impl. before spec 1.0) |
| 7 | OpenSSF Best Practices Badge | Consumer + CNCF mandate | CNCF gate 7 months after GA |
| 8 | OpenSSF Scorecard | No adoption required at all | n/a — ~1.31M repos scanned unasked |
| 9 | **DOAP** | Neither | **One institution, 2005, for its own reasons** |
| 10 | **P3P** | Artifact consumed presence, not truth | **Died; obsoleted 2018** |
| 11 | RDF/OWL/FOAF → JSON-LD | None → schema.org | 15 years vs. immediate |
| 12 | SARIF | Free ingestion point | 11 vendors within 6 months of GitHub's endpoint |
| 13 | XBRL | Pure SEC mandate | 4 voluntary years = 125 companies |
| 14 | FHIR R4 | Mandate ratifying an existing artifact | 55% → 67% → 71% of hospitals |
| 15 | Dublin Core | Protocol mandate (thin part only) | 7,103 repositories / abstract model: none |
| 16 | OpenTelemetry semconv | SDK defaults, unavoidable | 21 months to first non-vendor emitter |
| 17 | in-toto / SLSA | CI action + registry display | in-toto: 19 months, refused CNCF incubation on traction |

---

## 1. CVE — Common Vulnerabilities and Exposures

**1. What made a builder use it the first time?** A tool they already owned emitted it. CVE was designed from the outset as an interoperability layer *between vulnerability scanners*, not as a vocabulary for humans. The founding paper states the problem as: *"When we receive vulnerability information from multiple assessment and/or IDS tools, we need to know if they have identified the same vulnerability or not,"* and *"there is no common naming convention and no common enumeration of the vulnerabilities in these disparate databases."* The proposed payoff is explicitly tool-comparison: a common enumeration *"reduces the number of mappings between databases from O(n²) to O(n),"* letting a buyer determine *"which one can identify the most vulnerabilities."* ([Mann & Christey, *Towards a Common Enumeration of Vulnerabilities*, January 8, 1999, presented at Purdue January 21–22, 1999](https://www.cve.org/Resources/Media/Archives/OldWebsite/docs/docs-2000/cerias.html))

The *builder* — the security engineer — did not adopt CVE. Their scanner vendor did, and CVE IDs then appeared in their reports.

**2. Vocabulary alone, or an artifact?** Artifact, and the maintainers institutionalised this. The CVE Compatibility Program did not certify that a vendor understood CVE; it certified two mechanical properties of the vendor's *product*: **"CVE Output: Yes"** and **"CVE Searchable: Yes"** — the product emits CVE IDs in its reports and accepts them as a search key. ([CVE Compatibility archive](https://www.cve.org/Resources/Media/Archives/OldWebsite/compatible/compatible.html)) That is an artifact-conformance program wearing a vocabulary-conformance costume.

**3. Time to first outside adoption.** CVE List launched publicly **September 1999** with 321 entries. By **December 2000** — roughly 15 months — there were *"29 organizations participating with declarations of compatibility for 43 products."* ([CVE History](https://www.cve.org/Resources/Media/Archives/OldWebsite/about/history.html)) The program eventually reached **153 products and services across 84 organizations** before being discontinued. ([CVE Compatibility archive](https://www.cve.org/Resources/Media/Archives/OldWebsite/compatible/compatible.html))

**4. Concrete year-one acts.** (a) Convened a working group that became the **19-member CVE Editorial Board**; (b) published the list publicly and without distribution restrictions — the paper explicitly required the enumeration be *"publicly 'open' and shareable without distribution restrictions"* and maintained *"by a consortium of parties or by some commercially neutral party"*; (c) stood up the compatibility declaration process with a questionnaire and a usable logo. ([CVE History](https://www.cve.org/Resources/Media/Archives/OldWebsite/about/history.html); [founding paper](https://www.cve.org/Resources/Media/Archives/OldWebsite/docs/docs-2000/cerias.html))

**5. Named reason for delay/failure.** No failure, but note the sequence: the mandate came *after* tool adoption, not before. NIST SP 800-51, *Use of the Common Vulnerabilities and Exposures (CVE) Vulnerability Naming Scheme*, was published **September 2002** — three years after launch — stating *"Federal departments and agencies should use this standard for computer vulnerability related activities."* ([NIST SP 800-51](https://csrc.nist.gov/pubs/sp/800/51/final)) DISA issued a task order requiring products using CVE identifiers in **June 2004**. ([CVE History](https://www.cve.org/Resources/Media/Archives/OldWebsite/about/history.html)) The mandate ratified an existing tool ecosystem; it did not create one.

---

## 2. CWE — Common Weakness Enumeration

**1. What made a builder use it the first time?** A static-analysis tool emitted it. CWE's vendor uptake began **before the list was finished** — Checkmarx declared CxSuite CWE-compatible on **March 26, 2008**, Security-Database on **May 7, 2008**, Cenzic on **September 9, 2008**, SecurityReason and Japan's IPA on **October 14, 2008** — all in the year the list reached 1.0. ([CWE 2008 news archive](https://cwe.mitre.org/news/archives/news2008.html))

**2. Vocabulary alone, or an artifact?** Artifact, twice over. First the scanner (CWE IDs in findings). Second — and this is a distinct mechanism worth noting for OTCS — a **curated derived list**: the CWE/SANS *Top 25 Most Dangerous Programming Errors*, launched **January 12, 2009** with SANS, MITRE and 40+ experts, drew coverage across 60+ outlets including USA Today, BBC News and Forbes. ([CWE 2009 news archive](https://cwe.mitre.org/news/archives/news2009.html)) A 1,000-entry taxonomy is not adoptable; a ranked 25 is.

**3. Time to first outside adoption.** First public draft posted **March 15, 2006** on the CVE website; four further drafts through **December 15, 2006**. ([CWE 2006 news archive](https://cwe.mitre.org/news/archives/news2006.html)) The compatibility section of the site — the mechanism for outside declaration — went up **December 29, 2006**, roughly nine months after the first draft. ([ibid.](https://cwe.mitre.org/news/archives/news2006.html)) First *named external vendor declaration* established here: **March 26, 2008** (Checkmarx), ~24 months after first draft. Earlier declarations may exist; **not established** from the 2006–2007 archives read.

**4. Concrete year-one acts (2006).** Five public drafts in nine months (Mar 15, May 1, Jul 19, Sep 28, Dec 15); building CWE on top of **PLOVER**, an existing corpus of *"over 1,500 diverse, real-world examples of vulnerabilities"* organised into ~290 weakness types under the NIST SAMATE project — i.e. the taxonomy was derived from observed data, not designed a priori; and standing up the compatibility registry in December. ([CWE history](https://cwe.mitre.org/about/history.html); [CWE 2006 news](https://cwe.mitre.org/news/archives/news2006.html))

**5. Named reason for delay/failure.** Not established as a stated reason. Observed: CWE inherited its distribution channel wholesale from CVE — it was first published *on the CVE website* — which is the single largest confound in reading CWE as an independent adoption case.

---

## 3. schema.org

**1. What made a builder use it the first time?** The consumer paid for it, and the consumer already existed. Bing's launch post is explicit that markup consumption predated the vocabulary: Bing *"accepts a wide variety of markup formats today (Open Graph, microformat, etc.)"* and would continue to; the three engines' stated purpose was to *"simplify the markup choices for webmasters and amplify the value they receive in return."* The promised return was concrete and visible: publishers could *"improve how their sites appear in search results."* ([Bing, *Introducing Schema.org*, June 2, 2011](https://blogs.bing.com/search/June-2011/Introducing-Schema-org-Bing,-Google-and-Yahoo-Uni))

This is the cleanest case in the set of a vocabulary published **by the consumers rather than the producers**, with the payoff rendered as a change in a page the builder already cared about.

**2. Vocabulary alone, or an artifact?** The artifact is the search result itself — a rich snippet is a visible, per-page reward. Note that schema.org shipped *no producing tool* at launch and did not need one, because the reward loop was tight enough that CMS ecosystems built the producers.

**3. Time to first outside adoption.** Launched **June 2, 2011** by Google, Microsoft (Bing) and Yahoo; Yandex's involvement dates from **2011** as well. ([schema.org About](https://schema.org/docs/about.html); [Bing announcement](https://blogs.bing.com/search/June-2011/Introducing-Schema-org-Bing,-Google-and-Yahoo-Uni)) Because the authoring group *was* the consumer set, "first adoption outside the authoring group" is the first webmaster, which is **not established** as a dated event. The best primary measurement is Google's own: by **December 17, 2015**, *"31.3% of pages have schema.org markup, up from 22% one year ago,"* on a sample of 10 billion pages. ([Google Research, *Four years of Schema.org*](https://research.google/blog/four-years-of-schemaorg-recent-progress-and-looking-forward/))

**4. Concrete year-one acts.** Publishing a vocabulary covering *"over 100 categories, such as movies, music, TV shows, places, products, and organizations"* on day one — coverage first, precision later ([Bing announcement](https://blogs.bing.com/search/June-2011/Introducing-Schema-org-Bing,-Google-and-Yahoo-Uni)). Governance was formalised only much later: the **W3C Schema.org Community Group** became *"the main forum for schema collaboration"* in **April 2015**, four years after launch, over a small Steering Group that handles release approval. ([schema.org About](https://schema.org/docs/about.html)) Formal governance was a lagging indicator of adoption, not a precondition for it.

**5. Named reason for delay/failure — the syntax war.** schema.org launched microdata-first and added **JSON-LD to its recommended formats on June 3, 2013**, saying *"JSON-LD is a useful contribution to structured data sharing in the Web"* and citing that data is often exchanged *"in pure JSON or as JSON within HTML."* ([schema.org blog, June 3, 2013](https://blog.schema.org/2013/06/03/schema-org-and-json-ld/)) The vocabulary was stable across all three syntaxes; what changed was which syntax the *consumers* would read. The lesson: **the syntax that consuming tools read is the syntax that gets written**, regardless of the vocabulary's own preference.

---

## 4. SPDX — and the license-identifier split

SPDX is the most instructive case in the set because the same project shipped two things of very different sizes, and only the small one was adopted on its own merits.

**1. What made a builder use it the first time?** For the *document* format: a customer in the supply chain asked for one. The launch release frames the problem as compliance paperwork: *"it has become cumbersome and time consuming for each organization to prepare the license information for these components in the multiple distinct formats prescribed by others in their supply chain."* ([Linux Foundation, August 17, 2011](https://www.linuxfoundation.org/press/press-release/spdx-workgroup-releases-software-package-data-exchange-standard-to-widespread-industry-support))

For the *license identifier*: a tool emitted it. When the Linux kernel adopted `SPDX-License-Identifier`, the identifiers were not chosen by developers — they were produced by **two independent license scanners (ScanCode and Windriver) emitting SPDX tag:value files**, cross-checked against a third (FOSSology), with the results reconciled in a spreadsheet. ([kernel commit b244131, Greg Kroah-Hartman, 2017-11-01](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=b24413180f5600bcb3bb70fbed5cf186b60864bd)) The commit added the identifier to **11,139 files** in one go. The kernel's own rule states the rationale in tooling terms: boilerplate license text is *"hard to validate for tools which are used in the context of license compliance,"* whereas SPDX identifiers are *"machine parsable and precise shorthands."* ([Linux kernel license rules](https://docs.kernel.org/process/license-rules.html))

**2. Vocabulary alone, or an artifact?** Artifact, decisively, and the artifact that mattered most was **someone else's validator**. npm 2.10.0, released **May 8, 2015**, integrated Kyle Mitchell's `spdx.js` expression parser and began to *"warn you if the `package.json` for your project is either missing a `"license"` field, or if the value of that field isn't a valid SPDX expression"*; interactive `npm init` *"demands that you use a valid SPDX expression."* ([npm v2.10.0 release notes](https://github.com/npm/npm/releases/tag/v2.10.0)) A warning in a tool every JavaScript developer runs did more for SPDX identifier adoption than the specification did.

For the document format, the decisive artifact arrived twelve years after 1.0: **GitHub's one-click SBOM export, March 28, 2023**, producing SPDX 2.3 JSON, *"free for all cloud repositories on GitHub, and can be performed by anyone with read access to a repository."* ([GitHub Changelog, 2023-03-28](https://github.blog/changelog/2023-03-28-generate-an-sbom-from-the-dependency-graph/))

**3. Time to first outside adoption.** Work began **February 2010** in a FOSSBazaar workgroup under the Linux Foundation, originally called "Package Facts"; **SPDX 1.0 released August 17, 2011** at LinuxCon. ([SPDX Overview](https://spdx.dev/about/overview/); [LF press release](https://www.linuxfoundation.org/press/press-release/spdx-workgroup-releases-software-package-data-exchange-standard-to-widespread-industry-support)) "Outside the authoring group" is hard to define here because the authoring group *was* the tool industry — Black Duck, Palamida, Protecode, nexB, OpenLogic, Antelink, Source Auditor all participated in drafting. That is itself the finding: **SPDX was written by the people who would have to emit it.** Datable outside-adoption milestones: npm **2015-05-08**, Linux kernel **2017-11-01**, GitHub export **2023-03-28**.

**4. Concrete year-one acts.** Shipping *"open source tools to convert SPDX files to and from spreadsheet formats"* alongside the 1.0 spec — i.e. the very first artifact was a converter to the format the compliance staff actually worked in ([LF press release](https://www.linuxfoundation.org/press/press-release/spdx-workgroup-releases-software-package-data-exchange-standard-to-widespread-industry-support)); and recruiting fourteen named industry participants into the drafting itself.

**5. Named reason for the ten-year gap.** The project's own version history shows the spec iterating steadily while adoption did not — and two entries are tells. SPDX 2.1 (2016/08) *"added … using SPDX License identifiers in files"*: the spec followed the field practice rather than leading it. SPDX 2.2 (2020/05) *"Includes SPDX-lite, satisfying NTIA minimum SBOM element requirements"* — the spec was cut down to fit a regulatory minimum, and since 2.2 predates NTIA's July 2021 publication this was alignment to the in-progress NTIA multistakeholder process. ISO/IEC 5962 followed in **2021/08**. ([SPDX version history](https://spdx.dev/about/overview/))

No maintainer statement naming the cause of the earlier gap appears in the primary sources read, so a stated reason is **not established**. The observable sequence is: spec 2011 → a decade of thin document uptake → regulatory demand 2020–2021 → one-click tooling 2023 → ubiquity. Meanwhile the sub-vocabulary that needed no new file — the license identifier — was in npm's validator by 2015 and in 11,139 kernel files by 2017.

---

## 5. SWID tags — the control case

This is the case that isolates the variable, because SWID received the *same regulatory endorsement* as SPDX and CycloneDX and still failed.

- **April 2016**: NIST publishes NISTIR 8060, *Guidelines for the Creation of Interoperable Software Identification (SWID) Tags*, stating SWID tags *"support numerous applications for software asset management and information security management."* Notably, the document *"does not explicitly specify who is expected to create SWID tags."* ([NISTIR 8060](https://csrc.nist.gov/pubs/ir/8060/final))
- **July 12, 2021**: NTIA's *Minimum Elements For a Software Bill of Materials*, issued pursuant to EO 14028, names **three** formats: *"The data formats that are being used to generate and consume SBOMs are: Software Package Data eXchange (SPDX), CycloneDX, Software Identification (SWID) tags."* It adds an explicit removal clause: *"if a broad-based determination is made that a data format is no longer cross compatible, or is not under active maintenance and supporting the SBOM use cases, that data format should be removed from the automation requirement."* ([NTIA, July 12, 2021, p. 11](https://www.ntia.gov/sites/default/files/publications/sbom_minimum_elements_report_0.pdf))
- **July 29, 2026**: CISA, NSA, FBI and eighteen international partners publish *2026 Minimum Elements for a Software Bill of Materials (SBOM)*, which *"updates and replaces"* the NTIA document. It names **two**: *"The two data formats currently widely used by software ecosystem stakeholders to generate and consume SBOMs are SPDX and CycloneDX."* (p. 14) ([CISA et al., 2026 Minimum Elements](https://www.cisa.gov/sites/default/files/2026-07/2026_cisa_sbom_minimum_elements_508c.pdf))

**Named reason — stated verbatim by the regulator.** Appendix B, *Summary of Minimum Elements Changes From 2021*, p. 20:

> **Automation Support (Major Update)**
> **Changes:** Remove Software Identification (SWID) Tags from list of data formats. Replace Automation Support element with Machine-Processable Data element. …
> **Explanation:** **SWID tags are not a widely used SBOM data format for which multiple tools exist.**

That is a government agency, jointly with eighteen international counterparts, killing a vocabulary on the record for the sole stated reason that not enough tools implement it. The vocabulary itself was never faulted. Note also NISTIR 8060's silence on *who is expected to create SWID tags* — the exact mirror image of CVE's compatibility program, which specified precisely which product behaviours counted.

A mandate does not confer adoption on a vocabulary. It confers it on whichever vocabulary already had producing and consuming tools when the mandate landed.

---

## 6. CycloneDX

The most important case in this note, because the causal order is documented in git and runs backwards from what a vocabulary project would expect.

**1. What made a builder produce one the first time?** *A consumer that already existed asked for an input format.* CycloneDX did not begin as a specification. It began as a feature request against a tool:

| Date | Event |
|---|---|
| 2013-07-16 | `DependencyTrack/dependency-track` repository created |
| 2015-02-19 | Dependency-Track 1.0.0 |
| **2017-03-16** | **Issue #52, "Add ability to import dependencies," filed by a user** |
| 2017-05-29 | `CycloneDX/specification` repository created |
| 2018-01-12 | "Completed CycloneDX support…" — issue #52 closed |
| 2018-03-26 | Spec tag `1.0` |
| **2018-03-27** | **Dependency-Track 3.0.0 released — roughly four hours later** |

The originating request is not a request for a vocabulary: *"It would be a really useful feature to be able to import dependencies via an XML file. These could be XML files generated by OWASP Dependency Check as well as some other generic format."* ([Dependency-Track issue #52](https://github.com/DependencyTrack/dependency-track/issues/52)) CycloneDX's own announcement confirms the lineage: *"CycloneDX is a security-focused SBOM specification created in 2017 that can trace its origins back to issue #52 of OWASP Dependency-Track."* ([cyclonedx.org, June 2021](https://cyclonedx.org/news/cyclonedx-joins-owasp_foundation/))

The consumer shipped in lockstep with the format — same day. **Nobody ever produced a CycloneDX SBOM speculatively.**

Worth noting for OTCS specifically: the project's current [history page](https://cyclonedx.org/about/history/) begins at "March 2018, v1.0" and does not mention Dependency-Track. The tool-first origin survives only in git and in the 2021 announcement. Projects tend to narrate themselves as specifications after the fact.

**2. Vocabulary alone, or an artifact?** Artifact, and the mechanism is unusually stark: **the format's author personally wrote the first commit of the emitter for eight package ecosystems.** `cyclonedx-maven-plugin` and `cyclonedx-node-module` (both 2017-06-04), `cyclonedx-ruby-gem` (2018-05-21), `cyclonedx-gradle-plugin` and `cyclonedx-core-java` (2018-05-30), `cyclonedx-nuget` (2018-08-03), `cyclonedx-dotnet` (2018-10-03), `cyclonedx-python` (2018-11-15) — first commit author on every one is Steve Springett. ([CycloneDX repositories](https://github.com/orgs/CycloneDX/repositories))

He then pushed them to the registries where builders actually acquire things, so that emitting a BOM cost one line in a build file: Maven Central **2018-05-02**, npm **2018-05-22**, NuGet **2018-10-03**, PyPI **2018-11-17**. ([Maven Central](https://search.maven.org/solrsearch/select?q=g:org.cyclonedx), [npm](https://registry.npmjs.org/@cyclonedx/bom), [NuGet](https://api.nuget.org/v3/registration5-gz-semver2/cyclonedx/index.json), [PyPI](https://pypi.org/pypi/cyclonedx-bom/json))

**3. Time to first outside adoption. Negative — by 18 days.** The working Node.js producer was written by **Erlend Oftedal** (author of Retire.js, unaffiliated with Dependency-Track) and merged as PR #1 on **2018-03-13**; spec 1.0 was tagged **2018-03-26**. ([cyclonedx-node-module history](https://github.com/CycloneDX/cyclonedx-node-module/commits/master)) The first external *spec* input came earlier still: Philippe Ombredanne (ScanCode) filed [issue #1](https://github.com/CycloneDX/specification/issues/1) and [issue #2](https://github.com/CycloneDX/specification/issues/2) on **2017-11-21** proposing SPDX license expressions and purl; purl was adopted **2017-12-01**.

External *organisations*, by contrast, took years: cdxgen/AppThreat **2019-12-31** (21 months), Syft/Anchore **2020-08-24** (29 months), Trivy/Aqua **2022-02-23** (47 months). ([syft commits](https://github.com/anchore/syft/commits/main), [trivy commits](https://github.com/aquasecurity/trivy/commits/main)) The first non-Springett commit to the specification repo itself was **2019-09-02**.

**4. Concrete year-one acts (2018-03 → 2019-03).** Every one is a shipped artifact, not a document: eight ecosystem emitters written and published to four package registries; `cyclonedx-core-java` as the shared model/validation library (**2018-06-07**); the cyclonedx.org site repo for schema hosting (**2018-07-20**); conformance tooling — `SchemaVerificationTest.java` plus Travis integration (**2019-03-01**); spec 1.1 (**2019-03-03**). Standardisation came much later and did not drive adoption: Ecma TC54 established December 2023, **ECMA-424 1st edition approved 2024-06-26** ([Ecma](https://ecma-international.org/news/ecma-international-approves-new-standards-9/)), 2nd edition **2025-12-10**.

**5. Named reason for a failure — and it is governance, not technology.** Dependency-Track read *both* CycloneDX and SPDX from 2018-01-12. Thirteen days after EO 14028 was signed, on **2021-05-25**, Springett filed [issue #1053, "Remove support for SPDX"](https://github.com/DependencyTrack/dependency-track/issues/1053):

> In a recent draft response to NIST regarding the Executive Order, OpenSSF (Linux Foundation) had an initial statement from David Wheeler that they would pay to write SPDX plugins. SPDX is over ten years old, has fewer tools that other SBOM standards and LF has entertained the idea of paying others to support it. […] **This type of forced standard does not align to the values of the Dependency-Track project.** […] **Support for SPDX will be removed from a future version.**

Removal merged **2021-05-29**. The reference consumer for one format deliberately dropped the ability to read the competing format, for reasons stated as political, in the month the mandate landed. Interoperability between two vocabularies that a regulator had just declared equivalent was broken by a maintainer, on the record, over governance. (Conversion still exists but flows one way: `cyclonedx-cli` added CycloneDX→SPDX output on 2020-11-04.)

**A second named-failure finding: CycloneDX 1.0 could not have satisfied the mandate that later blessed it.** The 1.0 schema had `name`, `version`, `purl`/`cpe` — and none of Supplier, Dependency Relationship, SBOM Author, or Timestamp. Those four arrived in **1.2 (2020-05-26)**, fourteen months *before* NTIA published. Anything emitted by a 1.0/1.1 toolchain between March 2018 and May 2020 was structurally non-compliant with the elements later required.

**6. And the mandate itself was weaker than its reputation — then withdrawn.** This matters for anyone planning to be adopted *via* a mandate:

- **EO 14028 §4(e)** (signed 2021-05-12, 86 FR 26633) binds *NIST*, not vendors: *"the Secretary of Commerce acting through the Director of NIST … shall issue guidance."* The SBOM clause, §4(e)(vii), is one line: *"providing a purchaser a Software Bill of Materials (SBOM) for each product directly or by publishing it on a public website."* Reaching a vendor requires a four-link chain through §4(k) OMB → §4(n) DHS → §4(o) FAR Council. ([Federal Register](https://www.federalregister.gov/documents/2021/05/17/2021-10460/improving-the-nations-cybersecurity))
- **OMB M-22-18** (2022-09-14) made the SBOM **discretionary**: *"A Software Bill of Materials (SBOMs) may be required by the agency in solicitation requirements … or as determined by the agency."* Only the self-attestation was compulsory, and the attestation form contains no SBOM requirement. ([M-22-18](https://bidenwhitehouse.archives.gov/wp-content/uploads/2022/09/M-22-18.pdf))
- **OMB M-23-16** (2023-06-09) *"extends the timelines"* and re-anchored fixed dates to PRA approval of the CISA common form (released 2024-03-11), slipping the deadlines by roughly a year. ([M-23-16](https://bidenwhitehouse.archives.gov/wp-content/uploads/2023/06/M-23-16-Update-to-M-22-18-Enhancing-Software-Security.pdf))
- **OMB M-26-05** (2026-01-23) rescinded both: M-22-18 *"imposed unproven and burdensome software accounting processes that prioritized compliance over genuine security investments. … M-22-18 and M-23-16 … are hereby rescinded."* Agencies *"may choose"* to require an SBOM. ([M-26-05](https://www.whitehouse.gov/wp-content/uploads/2026/01/M-26-05-Adopting-a-Risk-based-Approach-to-Software-and-Hardware-Security.pdf))

That rescission language is the closest thing in the primary record to an official statement of the "artifacts produced but never consumed" failure mode — the US government's own reason for withdrawing its mandate.

The one mandate that actually bites is **FDA's**, via FD&C Act §524B (PL 117-328, enacted 2022-12-29, effective 2023-03-29, screening from 2023-10-01), requiring a device sponsor *"provide to the Secretary a software bill of materials."* ([PL 117-328](https://www.govinfo.gov/content/pkg/PLAW-117publ328/html/PLAW-117publ328.htm)) It is **format-agnostic** — the current premarket guidance contains zero occurrences of "CycloneDX," "SPDX" or "SWID," saying only *"Industry-accepted formats of SBOMs are encouraged."* Even the effective mandate delegated the vocabulary choice to whatever the tools already produced.

---

## 7. OpenSSF Best Practices Badge — the closest structural analogue to OTCS

A criteria vocabulary plus a self-attestation registry for open-source projects. This is the nearest thing in the field to what OTCS is, and its numbers are the most directly transferable in this note.

**1. What made a project fill it in the first time?** Two things, and neither is the criteria. First, a **live-computed badge image** the project could paste into its README — the maintainer frames this as a design feature: *"Can easily embed current badge image — `<img src="https://bestpractices.coreinfrastructure.org/projects/PROJECT_NUMBER/badge">` — Easily shows current state on GitHub, etc."* ([Wheeler, 2019 deck](https://events19.linuxfoundation.org/wp-content/uploads/2018/07/cii-bp-badge-2019-03.pdf)) Second and decisively, a **foundation gate**.

**2. Vocabulary alone, or an artifact?** Artifact plus mandate. The CNCF requirement was present in the **very first commit** of the graduation criteria file — commit `9037c28`, **2016-12-07**, "Add graduation criteria," creating `process/graduation_criteria.adoc`: *"Have achieved and maintained a Core Infrastructure Initiative Best Practices Badge."* ([cncf/toc](https://github.com/cncf/toc)) That is roughly seven months after the badge's GA, when the registry held a few hundred entries. It was later pushed *down* to incubation (commit `6e58b31`, **2024-02-29**); current text: *"Achieve the Open Source Security Foundation (OpenSSF) Best Practices passing badge."* ([incubation template](https://github.com/cncf/toc/blob/main/.github/ISSUE_TEMPLATE/template-incubation-application.md))

Note where the mandate stops. Graduation requires *passing*; silver/gold are explicitly *"Suggested — not required for graduation."* The mandate stops precisely at the badge's own completion cliff.

**3. Time to first outside adoption.** Repo created **2015-07-22** (first commit by Dan Kohn); draft criteria checked in **2015-08-06** (David A. Wheeler); Linux Foundation call for community input **2015-08-18** ([LF press release](https://www.linuxfoundation.org/press/press-release/linux-foundations-core-infrastructure-initiative-seeks-community-input-on-new-security-focused-badge-program)); alpha with end-to-end functionality **2015-10-15**; **GA May 2016** (exact day **not established** from a primary source — Wheeler's [NIST SSCA deck](https://csrc.nist.gov/csrc/media/projects/supply-chain-risk-management/documents/ssca/2016-fall/tue_am_1_the_cii_badge_program_for_oss_david_wheeler.pdf) says only "May 2016"). First row of the site's own stats series: **2016-05-24, 83 projects**. Year-one outcome: **280 entries, 35 passing (12.5%) as of 2016-09-14**, including Node.js, the Linux kernel, curl, GitLab, OpenSSL, Zephyr.

**4. Concrete year-one acts.** (a) Criteria before software — draft criteria 2015-08-06, Rails app 2015-08-26. (b) **Ran the badge on themselves**: commit 2015-11-27, *"Update self.json. We now show that we meet our own criteria."* (c) **Built autofill "detectives"** using the GitHub API to pre-populate answers and cut form friction (Octokit added 2015-11-30). (d) Invented a **"future criteria" mechanism** (v0.7.0, 2016-04-11) so criteria could tighten *"without making everyone lose their badge"* — the schema-evolution problem that kills most self-declaration registries, solved in year one. (e) Published an **impacts wiki** recording concrete behaviour changes attributable to the criteria (OWASP ZAP added automated testing; CommonMark added TLS and a vulnerability reporting process; OPNFV replaced obsolete crypto). (f) Shipped a **REST API, CORS, and a full database download** so third parties could build on the data. ([CHANGELOG](https://github.com/coreinfrastructure/best-practices-badge/blob/main/CHANGELOG.md); [2016 deck](https://csrc.nist.gov/csrc/media/projects/supply-chain-risk-management/documents/ssca/2016-fall/tue_am_1_the_cii_badge_program_for_oss_david_wheeler.pdf))

**5. The named reason for the entry-to-passing gap.** Read from the project's own published stats on **2026-08-02**: ([project_stats.json](https://www.bestpractices.dev/project_stats.json); field semantics from [project_stat.rb](https://github.com/coreinfrastructure/best-practices-badge/blob/main/app/models/project_stat.rb))

| | Count | Share of entries |
|---|---|---|
| Entries | 11,472 | — |
| ≥90% toward passing | 3,880 | 33.8% |
| **Passing** | **3,096** | **27.0%** |
| Silver | 267 | 2.3% |
| Gold | 86 | 0.75% |
| Active in last 30 days | 533 | 4.6% |

After a decade and a CNCF mandate, **73% of entries never reach passing.** The maintainers name the cause specifically — not motivation, but a stable short list of criteria requiring *organisational* work rather than a form field. Of the 265 projects sitting at ≥90% in March 2019: `vulnerability_report_process` missing in 21%, `tests_are_added` 17%, `vulnerability_report_private` 15%, `know_secure_design` 13%, `vulnerabilities_fixed_60_days` 13%, `test_policy` 13%. Wheeler's own annotation: *"Mostly same challenges as 2017-09-06."* Two years, same blockers.

And on the upper tiers: *"Silver & gold level badges intentionally harder to get… For now we've focused on getting projects participating & passing, not silver/gold… Non-passing projects appear to be in especially bad shape — focus on the bigger problem!"*

**The transferable warning for OTCS:** evidence-maturity tiers above the entry level are not where participation happens. The badge's own maintainers stopped pushing them.

---

## 8. OpenSSF Scorecard — the case that skips consent entirely

The instructive counterpart to the badge, from the same foundation.

**1. What made a builder use it?** Nothing — the builder is not involved. Scorecard computes a score on public repositories whether or not the maintainer participates. From the project README: *"We run a weekly Scorecard scan of the 1 million most critical open source projects judged by their direct dependencies and publish the results in a BigQuery public dataset… The list of projects that are checked is available in `cron/internal/data/projects.csv`. **If you would like us to track more, please feel free to send a Pull Request with others.**"* ([ossf/scorecard README](https://github.com/ossf/scorecard/blob/main/README.md#public-data)) Third parties add repositories to the scan list; the maintainer is never consulted.

The opt-in that does exist is scoped to the *vanity* surfaces only: `publish_results: true` in the GitHub Action governs the REST API listing and the badge. The cron scan → BigQuery → public viewer path requires no opt-in at all.

**2. Dates.** Repo created **2020-10-09** (first commit, Dan Lorenc); cron scan infrastructure **2020-11-10/12**, *before* v1.0.0; **v1.0.0 2020-12-08**; public BigQuery dataset and deps.dev integration **2021-07-01** ([Google Security Blog](https://security.googleblog.com/2021/07/measuring-security-risks-in-open-source.html)); GitHub Action v1.0.0 **2022-01-13**; REST API and badge **2022-09-08**, at which point *"1,600+ repositories"* had adopted the Action ([OpenSSF blog](https://openssf.org/blog/2022/09/08/show-off-your-security-score-announcing-scorecards-badges/)); deps.dev API exposing the corpus **2023-04-11** ([blog.deps.dev](https://blog.deps.dev/api/)).

**3. The scale comparison, read 2026-08-03.** `cron/internal/data/projects.csv` = **1,310,424 lines**. Against the badge's 11,472 entries and 3,096 passing:

> **~114× the coverage, zero adoption friction, and a strictly weaker claim per record.**

**4. The badge maintainers' own statement of the trade-off**, which is the single most useful sentence in this note for OTCS. From `docs/badge-vs-scorecards.md`: ([source](https://github.com/coreinfrastructure/best-practices-badge/blob/main/docs/badge-vs-scorecards.md))

> "Scorecards — This is *entirely* automated. Pros: You can evaluate *any* OSS project with it, immediately. Cons: It focuses on what can be automatically measured (not necessarily what's important…)
> Best practices badge — this requires projects to fill in a form. Pros: It tries to focus on what's important (not what's easily automated)… Cons: **It requires projects to work with it (instead of just happening automatically) so you won't get results for many OSS projects.**"

That is the axis OTCS is sitting on, stated by people who built both sides of it.

---

## 9. DOAP — the null case, and the closest one to OTCS's current position

DOAP is an RDF vocabulary for describing *software projects* — the same object OTCS describes. It is the control for "publish a good vocabulary for describing projects and see what happens."

**1. What made a builder use it?** Almost nothing did. Original publication: Edd Dumbill, *"Describe Open Source Projects with XML,"* IBM developerWorks, **February 2004**, named as the introduction by DOAP's own homepage ([archived 2004-05-14](http://web.archive.org/web/20040514232458/http://www.usefulinc.com:80/doap)); earliest schema ChangeLog entry **2004-07-22** ([schema/ChangeLog](https://github.com/ewilderj/doap/blob/master/schema/ChangeLog)). Its stated goals are strikingly close to OTCS's: *"Internationalizable description of a software project and its associated resources… Basic tools to enable the easy creation and consumption of such descriptions… Easy importing of projects into software directories; Data exchange between software directories."*

**2. Vocabulary alone, or an artifact?** **No artifact at all.** No badge, no scanner, no emitter, no directory outside one institution.

**3. Adoption — exactly one institution, for its own reasons.** The Apache Software Foundation adopted DOAP in **2005**, and its stated rationale is worth reading closely because it contains no benefit to the project filling the file in: *"The result of the discussion was a consensus to use DOAP… The decision was taken for the following reasons: use of an existing format was felt to be important, it was becoming more commonly used and therefore had a growing base of support; being designed to be extensible, it could be easily adjusted to ASF needs."* ([ASF Community Development wiki](https://cwiki.apache.org/confluence/display/COMDEV/Apache+Projects+Directory))

Note that even there it is **not a requirement** — enforcement is exclusion from a directory: *"If a project hasn't provided a link to their DOAP file, it won't appear on this site."* ([projects.apache.org/doap.html](https://projects.apache.org/doap.html)) And the system routes around absence: *"When no DOAP file is provided by PMC, a virtual project (without DOAP) is associated based on PMC RDF data."*

**4. Named reason for non-adoption: not established.** No primary source — not the 2004 homepage, not the current README, not the ChangeLog, not any ASF page — states a reason. What is established is the shape of the corpse: the schema has effectively three changes in nineteen years (2017, 2018, 2020) against a dense 2004–2007 cadence.

**The comparison that matters:**

| | Best Practices Badge | Scorecard | **DOAP** |
|---|---|---|---|
| Requires the project to act? | Yes — fill in a form | **No** — scanned regardless | Yes — write and host a file |
| Visible artifact | Live badge, from GA | Badge (opt-in), 2022 | **None** |
| Institutional gate | **CNCF, 2016-12-07** | None | ASF directory listing only |
| Coverage | 11,472 / 3,096 passing | **~1,310,424** | Not established |

The three separate cleanly on one variable: **who pays the cost of the first record.** The badge made the project pay and bought participation with a mandate plus a live artifact. Scorecard made nobody pay and got 114× the coverage for a weaker claim. DOAP made the project pay and offered neither a mandate nor an artifact.

**OTCS is currently in DOAP's position.** That is the finding this note exists to deliver.

---

## 10. P3P — a vocabulary killed by an artifact that consumed presence instead of truth

**Dates.** P3P 1.0 W3C Recommendation **2002-04-16**; P3P 1.1 published as a Working Group **Note**, never a Recommendation, **2006-11-13**; the P3P Specification Working Group **closed 2006-11-21**; P3P 1.0 formally **obsoleted 2018-08-30**. ([REC-P3P-20020416](https://www.w3.org/TR/2002/REC-P3P-20020416/); [NOTE-P3P11-20061113](https://www.w3.org/TR/2006/NOTE-P3P11-20061113/); [W3C P3P WG](https://www.w3.org/groups/wg/p3p/); [OBSL-P3P-20180830](https://www.w3.org/TR/2018/OBSL-P3P-20180830/))

**5. Named reason — the W3C's own words, twice.** From the P3P overview page, under the header "Status: P3P Work suspended":

> "The P3P Specification Working Group took this step as there was **insufficient support from current Browser implementers** for the implementation of P3P 1.1." ([w3.org/P3P/Overview.html](https://www.w3.org/P3P/Overview.html))

And in the 1.1 Note's own Status section: *"The P3P Specification Working Group is **lacking the necessary support from implementers** to carry on through the Recommendation Process."*

**But the deeper finding is in the 2018 obsoletion**, and it is the one an OTCS reader should sit with. P3P *did* have an artifact — Internet Explorer's third-party-cookie gate — and the artifact destroyed the vocabulary rather than carrying it:

> "**When Microsoft Internet Explorer was updated to use the presence of a compact P3P policy as a broad gate for deciding on the user's behalf to allow or reject third-party cookies, web site administrators chose to copy general policies rather than encode specific policies that reflected their sites' own privacy practices. In addition, no enforcement action followed when a site's policy expressed in P3P failed to reflect their actual privacy practices.**"
>
> "In 2018, according to BuiltWith metrics, fewer than 6% of the 10,000 most frequently visited websites support P3P… **No current (2018) user agents are known to provide interpretation of or implement decisions based upon P3P policies**… W3C concludes that P3P itself has not seen sufficient ecosystem uptake." ([OBSL-P3P-20180830](https://www.w3.org/TR/2018/OBSL-P3P-20180830/))

Independent measurement: Leon, Cranor, McDonald & McGuire, *"Token Attempt: The Misrepresentation of Website Privacy Policies through the Misuse of P3P Compact Policy Tokens,"* CMU CyLab TR CMU-CyLab-10-014 / ACM WPES 2010 — compact policies from 33,139 sites, **errors in 11,176**, including 134 TRUSTe-certified sites and 21 of the top 100. ([ACM DL](https://dl.acm.org/doi/10.1145/1866919.1866932))

**The transferable lesson, and it bears directly on OTCS's self-declaration model:** an artifact that consumes *the presence of a declaration* rather than *the truth of it*, with no enforcement when the declaration is false, converts the vocabulary into a compliance token within a few years. OTCS's `EVIDENCE-MODEL.md` and the maturity/evidence-state contradiction rejection in `docs/coordinate-system.md` §3.3 are the only structural defence against exactly this, and P3P is the reason they matter more than they look.

---

## 11. RDF / OWL / FOAF → JSON-LD — the same data model, twice

**1. What made a builder use RDF the first time?** For fifteen years, mostly nothing. RDF Model and Syntax became a W3C Recommendation **1999-02-22**; RDF Concepts and OWL **2004-02-10**; SPARQL **2008-01-15**; OWL 2 **2009-10-27**. Its only normative serialisation for **fifteen years and three days** was RDF/XML — Turtle, the readable syntax, did not reach Recommendation until **2014-02-25**. FOAF was never a W3C standard at all (v0.99, 2014-01-14, self-described as run *"more in the style of an Open Source or Free Software project than as an industry standardarisation effort"*). ([W3C TR index, dates as linked above](https://www.w3.org/TR/2014/REC-turtle-20140225/); [FOAF spec](http://xmlns.com/foaf/spec/))

**5. Named reason — W3C's own workshop reports.** The 2010 RDF Next Steps Workshop report: *"the complications in RDF/XML syntax have created some difficulties in practice as well as in **the acceptance of RDF by a larger Web community**."* ([report](https://www.w3.org/2009/12/rdf-ws/report.html)) The 2019 Berlin graph-data workshop report is blunter: *"RDF suffers from lack of easy entry point… **RDF is currently like using assembly language.** There is no central starting point website for RDF."* ([report](https://www.w3.org/Data/events/data-ws-2019/report.html)) Structurally, the Semantic Web Activity was *"subsumed, in December 2013, by the W3C Data Activity."* ([w3.org/2001/sw](https://www.w3.org/2001/sw/))

No W3C document states outright that RDF adoption failed — that claim is **not established**.

**And then the same data model was adopted, at scale, once it was carried.** JSON-LD 1.0 Recommendation **2014-01-16**, whose stated design goals are a repudiation of the previous fifteen years: *"**Simplicity** — No extra processors or software libraries are necessary… Developers only need to know JSON and two keywords (`@context` and `@id`)"*; *"**Zero Edits, most of the time** — not disruptive to their day-to-day operations"*; *"JSON-LD is designed to be usable directly as JSON, **with no knowledge of RDF**."* ([REC-json-ld-20140116](https://www.w3.org/TR/2014/REC-json-ld-20140116/))

**The strongest single causal claim in this entire note** comes from the W3C's own JSON-LD Working Group charter (2018-06-15):

> "JSON-LD 1.0 has become an essential format for describing structured data on the World Wide Web. It is estimated to be used by between 10% and 18.2% of all websites. **This is due largely to its adoption as a recommended format by schema.org.**" ([JSON-LD WG Charter](https://www.w3.org/2018/03/jsonld-wg-charter.html))

The W3C attributing its own format's success to a search-engine consortium rather than to its own Recommendation process. Same data model, same standards body, two orders of magnitude difference in uptake — the variable was who would read it.

**The syntax war, resolved by the consumer.** Google's 2009 rich-snippets launch read *"microformats and RDFa"*; microdata support was added **2010-03-12**; then on **2011-06-02** Google stated the decision outright: *"**Schema.org uses microdata.** Historically, we've supported three different standards… We've decided to focus on just one format for schema.org to create a simpler story for webmasters and to improve consistency across search engines relying on the data."* ([Google, 2011-06-02](https://developers.google.com/search/blog/2011/06/introducing-schemaorg-search-engines))

Microdata **never reached W3C Candidate Recommendation** and was retired as a W3C spec on **2021-01-28** ([W3C microdata history](https://www.w3.org/standards/history/microdata/)) — while RDFa, a full Recommendation since **2008-10-14**, lost. Microformats held *"94% of Rich Snippets"* across two billion pages in July 2010 ([microformats.org](https://microformats.org/2010/07/08/microformats-org-at-5-hcards-rich-snippets)) and is today **not listed at all** in Google's supported formats, which read *"JSON-LD (recommended), Microdata, RDFa."* ([Google structured data docs](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data))

W3C stated the governing rule itself in 2012, and it is the one-sentence summary of this entire research note:

> "**To decide which to use, your first consideration has to be which consumers will read the data within your web pages, and which formats they support.**" ([W3C HTML Data Guide, 2012-03-08](https://www.w3.org/TR/html-data-guide/))

---

## 12. SARIF — a vocabulary rescued by a free ingestion point

**1. What made a builder emit SARIF the first time?** A free, high-volume place to send it that did something visible with it.

**2/3. The artifact and the timing.** SARIF v2.1.0 was approved as an **OASIS Standard on 2020-03-27** (*"17 affirmative consents and no objections"*) ([OASIS](https://www.oasis-open.org/2020/03/30/static-analysis-results-interchange-format-sarif-v2-1-0-is-approved-as-an-oasis-s/)). GitHub shipped **SARIF upload on 2020-09-09** ([changelog](https://github.blog/changelog/2020-09-09-code-scanning-api/)); code scanning went GA **2020-09-30**, *"free for public repositories"* ([github.blog](https://github.blog/news-insights/product-news/code-scanning-is-now-available/)); and on **2020-10-05** — under six months after the standard, under one month after the endpoint — **eleven third-party vendors** were shipping SARIF. GitHub named the mechanism explicitly:

> "**What makes this possible is GitHub code scanning's API endpoint that can ingest scan results from third-party tools using the open standard Static Analysis Results Interchange Format (SARIF).**" ([github.blog, 2020-10-05](https://github.blog/2020-10-05-announcing-third-party-code-scanning-tools-static-analysis-and-developer-security-training/))

The ingestion point also pins the exact revision, which is how a consumer enforces a version: *"Code scanning only supports SARIF version `2.1.0`."* ([docs.github.com](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning))

**5. Adoption before the ingestion point.** Both spec editors were Microsoft; the OASIS Standard announcement and landing page name **no implementers and no statements of use**; one of the two TC chairs at approval was from Semmle, acquired by GitHub six months earlier. That is suggestive but **a primary-source number for SARIF-producing tools before September 2020 is not established** — do not state "adoption was near zero" as sourced.

**The transferable point:** the interval between "OASIS Standard" and "eleven vendors emitting it" was six months, and the thing that happened in between was not standardisation. It was a free API endpoint attached to a UI.

---

## 13. XBRL — pure mandate, and what four voluntary years actually bought

**1. What made a filer produce XBRL?** The SEC required it. Nothing else did.

**3. The measured before/after.** The SEC ran a **voluntary** XBRL program from February 2005. Its own final rule reports the result verbatim:

> "Over 100 companies have participated in the voluntary program" … "**As of January 2, 2009, 125 companies had submitted over 540 interactive data reports.**" ([*Interactive Data to Improve Financial Reporting*, 74 FR 6776, published 2009-02-10](https://govinfo.gov/content/pkg/FR-2009-02-10/html/E9-2334.htm))

Roughly four years of free, well-supported, voluntary participation produced **125 companies**. The mandate then phased in every filer: >$5B-float large accelerated filers for periods ending on or after **2009-06-15**, remaining large accelerated filers **2010-06-15**, all remaining filers **2011-06-15**.

**4/5.** The SEC's own stated rationale is a network-effect argument that concedes the vocabulary could not bootstrap itself: *"**mandatory adoption is expected to foster a network effect and encourage development of cost reducing and improved analytical products.**"* The regulator is saying, on the record, that the tools would follow the mandate — the inverse of the SBOM case, where the mandate followed the tools.

---

## 14. HL7 FHIR — the only case with a measured population crossing a known deadline

**1/2.** FHIR R4 (v4.0.1) published **2018-12-27**; HL7's own history calls it *"First Normative content."* ([hl7.org history](https://hl7.org/fhir/history.html)) The ONC 21st Century Cures Act final rule, **85 FR 25642, published 2020-05-01**, adopts it by name at 45 CFR §170.215(a)(1): *"Standard. HL7® Fast Healthcare Interoperability Resources (FHIR®) Release 4.0.1"* — incorporated by reference down to *"Technical Correction #1, November 1, 2019."* ([Federal Register](https://www.federalregister.gov/documents/2020/05/01/2020-07419/21st-century-cures-act-interoperability-information-blocking-and-the-onc-health-it-certification))

**ONC's stated reason for picking R4 is the study's thesis in the regulator's voice:** *"**Commenters noted that FHIR Release 4 is the first FHIR release with normative FHIR resources.**"* The mandate followed stability, which followed implementation.

The §170.315(g)(10) certification deadline of **2022-12-31** did *not* come from the May 2020 rule (originally 24 months, → 2022-05-02); it came from the COVID extension interim final rule, **85 FR 70064, published 2020-11-04**.

**3. The measurement.** ONC Data Brief No. 68 (September 2023), from the AHA Annual Survey IT Supplement — hospitals enabling patient access via a **FHIR** API: **55% (2021) → 67% (2022)**, against non-FHIR APIs 15% → 17%; then **71% in 2024**. ([Data Brief 68](https://healthit.gov/wp-content/uploads/2025/07/DB68-Hospital-Use-of-APIs-to-Enable-Data-Sharing_508.pdf); [Data Brief 81](https://healthit.gov/data/data-briefs/hospital-use-of-apis-to-enable-data-sharing-between-ehrs-and-third-party-technology/))

**5.** Two cautions. First, this is *not* a pure-mandate case: **SMART App Launch IG 1.0.0 shipped 2018-11-13**, roughly eighteen months before the rule, and the rule then **absorbed** it as §170.215(a)(3) rather than replacing it. The mandate ratified a working artifact. Second, the widely-repeated claim that *"HL7 built FHIR because v3 was too complex"* is **not established** — it appears nowhere in HL7's own wording. The strongest HL7-voice material available is softer: v3 *"has not achieved the market penetration of HL7 v2"*; CDA R2.1 *"did not achieve industry adoption."* ([hl7.org/fhir/comparison-v3.html](https://www.hl7.org/fhir/comparison-v3.html))

---

## 15. Dublin Core — a split verdict inside one vocabulary

The most useful case for a project deciding how much vocabulary to ship, because Dublin Core ran both experiments at once.

**The thin part rode a protocol mandate.** OAI-PMH v1.0 (**2001-01-21**) made unqualified Dublin Core compulsory for every conforming repository: *"**At a minimum, repositories must be able to return records with metadata expressed in the Dublin Core format, without any qualification.**"* v2.0 (2002-06-14) restates it and reserves the `oai_dc` prefix. ([OAI-PMH v1.0](https://www.openarchives.org/OAI/1.0/openarchivesprotocol.htm); [v2.0](https://www.openarchives.org/OAI/openarchivesprotocol.html)) The OAI registry records **7,103 base URLs**, each spec-obliged to serve unqualified DC. ([ListFriends, 2025-10-08](https://www.openarchives.org/pmh/registry/ListFriends_HISTORICAL_2025-10-08.xml)) Registration was voluntary, so treat that as a floor.

**The rich part got specs and an autopsy.** DCMI's own retrospective on the DCMI Abstract Model:

> "**as of 2010, DCMI was not aware that any of the DCAM-related specifications, with the possible exception of specific syntax guidelines, had been widely implemented**"
> "the Abstract Model appeared to have **fallen between two stools** — its use of the 'description set' abstraction perplexing to users more accustomed to… concrete syntax, and its added layer of Dublin-Core-specific terminology confusing to users already comfortable with the RDF model." ([DCMI, 2011-05-13](https://www.dublincore.org/blog/2011/dcmi_abstract_model/))

Fifteen elements carried by a protocol reached 7,000+ repositories. The expressive abstract model, published by the same organisation to the same audience, reached nobody its own maintainers could name. That is the strongest available argument for shipping the *thinnest* version of a coordinate vocabulary first.

Verified peripherals: [RFC 2413](https://www.rfc-editor.org/rfc/rfc2413.txt) (Informational, September 1998); ANSI/NISO Z39.85-2012 *"Approved February 20, 2013 by the American National Standards Institute"* ([NISO](https://groups.niso.org/higherlogic/ws/public/download/10258/Z39-85-2012_dublin_core.pdf)); [ISO 15836:2009 announced 2009-03-31](https://www.dublincore.org/news/2009/03-31-revised-version-of-international-standard-iso-15836-published/). Day-level dates for ISO 15836:2003 / 15836-1:2017 / 15836-2:2019 and the ANSI/NISO Z39.85-**2001** approval date are **not established** (iso.org is not fetchable from here).

---

## 16. OpenTelemetry semantic conventions

The case an OTCS reader will find most tempting to model on, and the one with the most cautionary detail. Semconv is a large, actively-governed attribute vocabulary maintained by a graduated CNCF project — and it was never adopted *as a vocabulary* by anyone.

**1. What made a builder use it the first time?** They did not choose to. Three artifacts installed it, and mostly could not be turned off:

- **The SDK emits it whether you ask or not.** Spec PR #1269 (merged **2020-12-14**) made `service.name` mandatory with a synthesised default, and the normative text still reads: *"If the value was not specified, SDKs **MUST** fallback to `unknown_service:` concatenated with the process executable name."* ([spec #1269](https://github.com/open-telemetry/opentelemetry-specification/pull/1269); [current text](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/registry/attributes/service.md)) Install an OTel SDK, write zero configuration, and you are already emitting semconv resource attributes.
- **The Collector shipped it as a Go constants package** — PR #438, *"Define constants for semantic conventions attribute names,"* merged **2019-12-03**. Anyone writing a Collector component consumed the vocabulary as a compile-time import, not a document. ([collector #438](https://github.com/open-telemetry/opentelemetry-collector/pull/438))
- **The conventions became generated code.** The YAML model landed **2020-08-27**; `build-tools` cut v0.1.0 **2020-10-01**; `opentelemetry-java` merged *"Automatically generate Semantic Convention attributes"* **2020-10-23**. ([java #1846](https://github.com/open-telemetry/opentelemetry-java/pull/1846))

The one genuine "question nothing else answered" is a *vendor's* question, not a builder's: how do I map arbitrary telemetry into my product's schema without a per-customer mapping? Microsoft's Azure Monitor exporter hard-coded semconv attribute names on **2019-12-03** — hours before the Collector defined its own constants file. ([contrib #39](https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/39))

**No mandate is established.** No first-party document requires any external party to adopt semconv.

**2. Vocabulary alone, or an artifact?** Entirely artifact-borne. Note that OTLP is a *container*, not a schema — it has no field named `http.method`. Its only semconv coupling is the `schema_url` string added **2021-05-12** ([proto #298](https://github.com/open-telemetry/opentelemetry-proto/pull/298)).

**3. Publication → first outside adoption, in four honest layers.** Baseline: **2019-07-24**, commit `734005c6`, the first standalone OTel semconv document.

| Layer | First instance | Date | Gap |
|---|---|---|---|
| Vendor exporter inside the OTel org | Microsoft Azure Monitor | 2019-12-03 | 4 mo |
| Outside project's own repository | Jaeger reads `AttributeServiceName` | 2020-07-01 | 11 mo |
| Non-vendor infrastructure emitting natively | **etcd** (`semconv.ServiceNameKey` in `server/embed`), shipped v3.5.0 | 2021-04-30 | **21 mo** |
| Mainstream runtime shipping semconv names as its own public surface | .NET 8 metrics, GA 2023-11-14 | 2023-08 | **~4 yr 4 mo** |

([contrib #39](https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/39); [jaeger #2295](https://github.com/jaegertracing/jaeger/pull/2295); [etcd #12919](https://github.com/etcd-io/etcd/pull/12919); [aspnetcore #49743](https://github.com/dotnet/aspnetcore/pull/49743)) Prometheus did not merge an OTLP receiver with `service.name`→job mapping until **2023-07-28**, four years and one month after publication.

Note the confounder that OTCS should read carefully: "outside the authoring group" nearly collapses here, because Microsoft, Google, Dynatrace, Lightstep, Splunk and Elastic employees *were* the authoring group. The vendor exporters are not independent adoption; they are the authors shipping their own vocabulary in their own products. The first genuinely independent emitter is **etcd at 21 months**.

**4. Concrete year-one acts (2019-05 → 2020-05) — and what was *not* done.** Year one was almost entirely document surgery: merging the OpenCensus and OpenTracing specs (PR #17, **2019-05-21**); creating the first standalone semconv file (**2019-07-24**); splitting it up (**2019-10-31**); removing the inherited `component` attribute (**2020-02-11**); reorganising into per-signal directories (**2020-04-06**).

Everything a vocabulary project would assume is foundational came *years* later:

| Item | Date | Lag from repo creation |
|---|---|---|
| Codegen (`build-tools` v0.1.0) | 2020-10-01 | 17 mo |
| Versioning & stability OTEP 0143 | 2020-12-16 | 19 mo |
| Schema URLs (OTEP 0152) | 2021-04-26 | 24 mo |
| **Stability guarantees for semconv itself** (spec #2180) | **2022-04-08** | **35 mo** |
| Separate `semantic-conventions` repo | 2023-05-09 | 48 mo |
| `OTEL_SEMCONV_STABILITY_OPT_IN` | 2023-05-08 | 48 mo |
| **HTTP conventions declared stable** (v1.23.0) | **2023-11-03** | **54 mo** |
| Weaver (still pre-1.0 in 2026) | 2024-04-24 | 57 mo |

**5. Named failures — three, and all three matter to OTCS.**

**(a) The one migration that required humans to act took 4 years 3 months and needed an escape hatch.** HTTP conventions landed 2019-07-24 and were declared stable 2023-11-03. Semconv v1.21.0 alone carries **five entries labelled `BREAKING`** in a single release ([v1.21.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.21.0)): `http.method`→`http.request.method`, `http.url`→`url.full`, `http.target` split three ways, `net.*`→`network.*`, duration ms→s. The migration only survived by shipping an environment variable with a dual-emission mode and a six-month maintenance floor:

> `http/dup` — emit both the old and the stable HTTP and networking conventions, allowing for a phased rollout… Need to maintain (security patching at a minimum) their existing major version for **at least six months** after it starts emitting both sets of conventions. ([opentelemetry.io, 2023-11-06](https://opentelemetry.io/blog/2023/http-conventions-declared-stable/))

**(b) The automatic migration mechanism was built, shipped into the wire format, and then formally declared unreliable.** OTEP 0152's schema-transformation file (merged 2021-04-26) existed precisely so backends could translate old attribute names to new ones mechanically. On **2023-04-13** the project merged spec PR #3380, *"Add moratorium on relying on schema transformations for telemetry stability."* ([spec #3380](https://github.com/open-telemetry/opentelemetry-specification/pull/3380)) Three weeks later they shipped the manual env-var instead.

For a project whose `MIGRATIONS.md` and `VERSIONING.md` promise orderly vocabulary evolution, this is the most important precedent in the note: **the best-resourced vocabulary project in the field built the automatic migration mechanism and then abandoned it.**

**(c) Seven years in, 9.3% of the registry is stable.** Counting every `stability:` declaration under `model/` on `main` (read 2026-08-03): 2,262 `development`, **257 `stable`**, 221 `release_candidate`, 14 `experimental`, 5 `alpha` — 2,759 total. Messaging is **0 of 140 stable, 4 years 9 months after its roadmap OTEP**. GenAI 0/189, System 0/116, Hardware 0/108. Database is 20/225 (9%) after six years. Every cloud-vendor namespace is zero percent stable: `aws` 0/73, `azure` 0/37, `gcp` 0/67.

And the naming rules formally surrendered. From `docs/general/naming.md` — a document whose own status is **Stable**:

> **Known exceptions**
> - Operational system and process-related attributes and metrics follow a pattern of `system.{os}` and `process.{os}`. `<!-- TODO: document why -->`
> - **RPC and messaging semantic conventions don't follow the system-specific naming guidance yet, and will be updated one-by-one.** ([naming.md](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/general/naming.md))

A stable governing document carrying a `TODO: document why` is as clean an admission as the primary record offers that the vocabulary outran its own rules.

**What this means for OTCS's coordinate system specifically.** `docs/coordinate-system.md` currently defines closed vocabularies for seven coordinates — `Actor` (7 values), `Authority` (11), `Action` (15), `Environment` (14), `Function` (7), `Time` (9) — and §3.2 says *"Unknown coordinate values fail validation."* OpenTelemetry, with vastly more resources, took 54 months to stabilise **one** domain and has 9.3% of its registry stable after seven. A closed, validator-enforced vocabulary declared v0.1 EXPERIMENTAL is the right call; the transferable warning is that the migration machinery in `MIGRATIONS.md` will be load-bearing much sooner than expected, and that the field's most-resourced attempt at automated migration was withdrawn.

---

## 17. in-toto and SLSA

Two vocabularies for the same domain, six years apart, with opposite adoption curves — and a rare on-the-record refusal that names the reason.

### in-toto (2016–)

**1/3. What made a builder use it, and when.** in-toto was called "toto" for its first six months (commit *"Refactor toto to in-toto,"* **2016-12-02**); its first release is **`0.1.1`, 2017-11-09** — there is no `v0.1.0`. The first production deployment outside the authoring group is **Datadog, 2019-06-03**: *"Our implementation of TUF and in-toto is now generally available from **Datadog Agent 6.10** onward."* ([Datadog engineering](https://www.datadoghq.com/blog/engineering/secure-publication-of-datadog-agent-integrations-with-tuf-and-in-toto/)) That is roughly **19 months** from first release, and it came with a co-author of the framework inside the adopting company.

CNCF timeline: accepted **2019-08-14**, incubating **2022-03-10**, graduated **2025-02-10**. ([CNCF](https://www.cncf.io/projects/in-toto/)) Nine years from first release to graduation.

**5. Named reason for slow adoption — on the record, in a CNCF pull request.** in-toto applied to CNCF at the **incubation** level in June 2019 and was refused on traction grounds. All from [cncf/toc#252](https://github.com/cncf/toc/pull/252):

> **Matt Klein (CNCF TOC), 2019-07-09:** "My personal opinion is that this project should start as sandbox. **I don't obviously see the traction that IMO would qualify it for incubation.**"
>
> **Justin Cappos (co-creator), 2019-07-13:** "Some of our adopters have clients that are banks and other organizations that will not allow us to publicly post their names… **We've been through a long slog on the security assessment side and haven't been as focused on providing clear information about other topics the TOC looks at as we should have been.**"
>
> **Andrew Martin (ControlPlane), 2019-07-14:** "One concern I foresee with holding 'security tooling' to the same adoption standards as 'devops tooling' is the asymmetry of expected installations, users, contributors… **there will always be fewer users for something like in-toto.**"

The CNCF SIG-Security assessment (May 2019) quantified the entire adopter base: *"**1 public company case study**: Datadog Agent full pipeline. Multiple integrations: Debian apt get (**3 Debian contributors**), Jenkins plug-in (**+1 contributor**), K8s admission controller (**+1 contributor**)."* Recommendation: *"**Resiliency would benefit from additional participants.**"* ([assessment](https://github.com/cncf/tag-security/blob/main/community/assessments/projects/in-toto/README.md))

**And the maintainers themselves named the blocker — it is a UX problem, not a vocabulary problem.** From the project's 2021 CNCF annual review:

> "One of our primary aims is to increase in-toto's visibility and adoption… Some specific usability items we could use help with: **Improved in-toto layout creation user experience**." ([2021-in-toto-annual.md](https://github.com/cncf/toc/blob/main/reviews/2021-in-toto-annual.md))

Six years in, the thing standing between in-toto and adoption was that writing the *layout* — the declaration a project makes about its own supply chain — was too hard. That is precisely the part later adopters skipped: GitHub and the npm registry adopted only the **attestation format**, never the layout model.

Corroborating the point negatively: `apt-transport-in-toto`, the Debian integration cited in the 2019 assessment and described as live in the USENIX paper, reached a Debian release only in **bullseye (2021-02-07)**, was **removed from testing 2025-01-16** and **removed from unstable 2026-04-13**. ([tracker.debian.org](https://tracker.debian.org/pkg/apt-transport-in-toto))

### SLSA (2021–)

**1/2. What made a builder use it?** A CI action that produced the attestation for them, and a registry that displayed it. SLSA was introduced by Google on **2021-06-16** ([Google Security Blog](https://security.googleblog.com/2021/06/introducing-slsa-end-to-end-framework.html)); **v1.0 shipped 2023-04-19** ([slsa.dev](https://slsa.dev/blog/2023/04/slsa-v1-final)).

The decisive artifact landed on the *same day* as v1.0: **npm provenance public beta, 2023-04-19** — `npm publish --provenance` from a GitHub Actions workflow, signed via Sigstore's Fulcio, logged to Rekor, verified by the registry, and rendered on the package page. ([GitHub changelog](https://github.blog/changelog/2023-04-19-npm-provenance-public-beta/); [GitHub blog](https://github.blog/security/supply-chain-security/introducing-npm-package-provenance/)) GitHub Artifact Attestations later generalised the same mechanism, emitting the **in-toto attestation format** including SPDX and CycloneDX predicates. ([GitHub docs](https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations))

Note what a publisher actually does to adopt SLSA: adds one flag to a command they already run. They need not read the specification, know what a level is, or write a layout.

**5. Named reason — the maintainers rescoped the vocabulary because it was too hard to adopt, and said so.** SLSA v1.0's own "What's new" page:

> "Overall, SLSA v1.0 is **more stable and better defined than v0.1, but less ambitious.** It corresponds roughly to the build and provenance requirements of the prior version's SLSA Levels 1 through 3, **deferring SLSA Level 4 and the source and common requirements to a future version.**"
>
> "Previously, each SLSA level encompassed requirements across multiple software supply chain aspects: there were source, build, provenance, and common requirements. To reach a particular level, adopters needed to meet all requirements in each of the four areas. **Organizing the specification in that way made adoption cumbersome, since requirements were split across unrelated domains—improvements in one area were not recognized until improvements were made in all areas.**"
>
> "The deferred concepts—source requirements, hermetic builds (SLSA L4), and common requirements—were at significant risk of breaking changes… **We believed it was more valuable to release a small but stable base now while we work towards solidifying those concepts in a future version.**" ([slsa.dev/spec/v1.0/whats-new](https://slsa.dev/spec/v1.0/whats-new))

**This is the most directly transferable passage in the entire note for OTCS.** SLSA's stated diagnosis is that a *composite* level — one that requires a project to satisfy requirements across several unrelated dimensions simultaneously — is not adoptable, because partial progress earns nothing. Their fix was to split the scale into independent **tracks**, ship one, and defer the rest.

OTCS's coordinate vector `C(p) = ⟨Actor, Authority, Action, Environment, Function, Time, Maturity⟩` is exactly the composite shape SLSA abandoned: seven dimensions, all required, with evidence maturity scored separately per claim area on top. The mitigating design is already present — coordinates are *sets or weighted vectors*, absence is honest, and `M` is split rather than collapsed — so partial progress is at least *representable*. But the thing SLSA found fatal was not representability, it was that **nothing rewarded progress on one axis alone.** That is a question about what the registry surfaces and pays for, not about the schema.

**Sequencing footnote worth noting:** the in-toto Attestation Framework v1.0 shipped **2023-03-22**; ITE-6, the enhancement proposal that governs it, was formally accepted **2023-04-04** — after the artifact. The process ratified the shipped thing. ([ITE index](https://github.com/in-toto/ITE/blob/master/README.md))

**Not established:** first-party npm provenance adoption *numbers*; a dated first external project claiming a SLSA level.

---
## Closing: what this implies for a project whose instrument is a vocabulary

### The finding OTCS did not ask for

The question this note set out to answer was *"what did the successful ones do that this project is not doing?"* The honest answer from the primary record is one sentence: **they shipped something that wrote the vocabulary into a file or a screen the builder already had, and in most cases the vocabulary's own authors wrote that thing themselves.**

Not one vocabulary in this set was adopted because it was correct, complete, or well-governed. Those properties are present in the failures as much as the successes. SWID was an ISO standard with NIST guidance and a federal mandate naming it by name. P3P was a W3C Recommendation with a browser feature reading it. DOAP was a clean vocabulary for describing exactly the objects OTCS describes. RDF had fifteen years, four Recommendations, and a research field. What the survivors had that these lacked is a producing tool and a consuming tool — ideally written by the same people, ideally shipping the same week.

The W3C stated the rule itself in 2012 and it has held in every case since: *"your first consideration has to be **which consumers will read the data**… and which formats they support."*

### The three engines, and the one that does not exist

| Engine | Cases | What the builder actually did |
|---|---|---|
| **A tool emitted it** | CVE, CWE, OpenTelemetry semconv, CycloneDX, SPDX license identifiers, SLSA/npm provenance, SPDX via GitHub export | Nothing. Installed an SDK, ran a scanner, clicked a button, added `--provenance` |
| **A consumer paid for it** | schema.org (rich results), SARIF (GitHub code scanning, free on public repos), CII badge (README image), JSON-LD (schema.org) | Wrote a declaration because a party they wanted something from would read it |
| **A mandate demanded it** | XBRL, FHIR R4, Dublin Core via OAI-PMH, CII badge via CNCF graduation | Complied |

The fourth candidate — *"a question it answered that nothing else did"* — appears in every one of these projects as the authors' motivation and as the retrospective justification. It appears in **no case** as the thing that moved the first outside builder. That is the disconfirming finding, and it is unwelcome for a project whose instrument is a vocabulary.

### Two secondary patterns, both actionable

**The smallest embeddable unit wins.** Dublin Core ran both experiments simultaneously: fifteen elements made mandatory by a protocol reached 7,103 repositories, while the expressive DCMI Abstract Model reached, by its own maintainers' admission, nobody they could name. SPDX repeats it: the document format sat thin for a decade while `SPDX-License-Identifier` — one line, inside a file the developer already had — went into 11,139 kernel files in a single commit. SLSA repeats it deliberately, splitting a composite level into tracks and shipping one. **The part of a vocabulary that fits inside somebody else's file gets adopted; the part that needs a file of its own does not.**

**Governance is a lagging indicator.** schema.org ran four years before the W3C Community Group became its main forum. CycloneDX reached Ecma six years after 1.0. OpenTelemetry did not have stability guarantees for its own conventions until month 35. Every one of these was already adopted by then. CVE's Editorial Board is the one genuine year-one governance act in the set — and it accompanied, rather than replaced, the compatibility program that certified *product behaviour*.

### Where OTCS actually stands against the pattern

The repository is not short of machinery: `schemas/project-manifest.schema.json`, three wire schemas (`decision`, `receipt`, `signal`), a validator running 104 checks across 13 schemas, a coherence gate, a registry loader, a site generator, an anchoring ledger. That is more than SPDX 1.0 shipped with in 2011.

What it does not have is the thing every success in this note had: **a path by which the vocabulary arrives in a builder's output without the builder first deciding to adopt a vocabulary.** The registry currently holds 3 registered projects and 0 observed. Every OTCS record in existence was hand-written by someone who had already been persuaded.

That is DOAP's position, precisely. It is also, less charitably, P3P's: a self-declaration schema whose truth nothing checks. P3P's obsoletion notice is worth re-reading as a prediction rather than a history — *"web site administrators chose to copy general policies rather than encode specific policies that reflected their sites' own privacy practices. In addition, **no enforcement action followed** when a site's policy… failed to reflect their actual privacy practices."*

The kill criteria in `FAQ.md` §27 — *"fewer than 3 external registrations, no independent implementation, no evidence anyone uses the data to decide anything"* — are, read against these cases, three restatements of a single question: **does anything emit this, and does anything read it?** All three pass together or fail together, because in every case studied here external registrations followed the emitter and never preceded it.

### What the record says to do, in descending order of evidential weight

1. **Write the emitter yourself, for the ecosystem nearest to hand.** This is the strongest signal in the set and it is not close. Springett personally authored the first commit of eight CycloneDX ecosystem emitters in twelve months; that, not the schema, is why CycloneDX is one of the two formats CISA now names. The narrow, answerable version of the question: *what does a KTP-adjacent or ABT-adjacent project already run in CI, and what would it cost for that run to emit an `otcs.yaml` fragment?*

2. **Find the smallest embeddable unit and ship only that first.** Not the seven-coordinate vector. Candidates the evidence supports: the four decision outcomes (`ALLOW`/`SHAPE`/`DEAUTOMATE`/`VETO`) as a string another system can log, or the single `decide`-vs-`enforce` distinction, which is the one claim in `coordinate-system.md` §2.8 that a builder can answer about their own system in ten seconds and that nobody else in the field makes them answer. The right question is *what must exist for a builder to state where their thing stops?* This note's answer: **one field, in a file they already have.**

3. **Become a consumer before asking anyone to be a producer.** schema.org's whole mechanism was that the vocabulary's publishers were also the parties who read it and paid visibly for it. SARIF's was a free API endpoint attached to a UI: OASIS Standard 2020-03-27, GitHub ingestion 2020-09-09, eleven vendors by 2020-10-05. The `analysis/`, `computed/` and `complementarity.ts` surfaces are the beginning of a consumer, and by this note's evidence they are the most strategically valuable code in the repository — but only if what they compute is something an *outside* project wants back badly enough to write a record for.

4. **Make conformance a property of an artifact, not of an understanding.** CVE's compatibility program certified two mechanical facts about a *product* — **CVE Output: Yes**, **CVE Searchable: Yes**. It never certified that anyone agreed with the taxonomy. The OTCS analogue is not a maturity score; it is: *does your system emit an OTCS decision record, and can it accept one?*

5. **Do not plan on a mandate.** The SBOM record cuts against mandate strategy twice over. EO 14028 bound only NIST; OMB made SBOMs discretionary, slipped the attestation deadlines by a year, and rescinded the whole chain in January 2026 as *"unproven and burdensome."* The one mandate that bites — FDA §524B — is deliberately format-agnostic. And when a regulator did pick winners, it picked on tooling: *"SWID tags are not a widely used SBOM data format for which multiple tools exist."* XBRL shows what a mandate can do (125 voluntary companies in four years → every filer), but it also shows what it costs: a securities regulator with subpoena power.

6. **Expect the migration machinery to be load-bearing sooner than expected, and expect the automated version to fail.** OpenTelemetry built schema transformations (2021), shipped them into the wire format, then formally declared a *moratorium on relying on them for stability* (2023-04-13) and fell back to a human-set environment variable with a six-month dual-emission window. Seven years in, 9.3% of its registry is stable. `MIGRATIONS.md` and `VERSIONING.md` are more important than they currently look.

7. **Do not push the upper evidence tiers yet.** The badge's own numbers: 11,472 entries, 3,096 passing (27%), 267 silver (2.3%), 86 gold (0.75%) — after ten years *and* a CNCF gate. Wheeler's own instruction: *"Non-passing projects appear to be in especially bad shape — focus on the bigger problem!"* OTCS's `M ∈ {0..5}` maturity scale should expect the same distribution and should not be where participation is sought.

### The one place the pattern might not bind

Every case here is a vocabulary describing *artifacts that already exist and are already being scanned* — packages, vulnerabilities, HTTP spans, build steps, financial statements. OTCS's coordinates describe something closer to a design posture: which conditions a project observes, at what evidence maturity, with what enforcement point. No scanner derives `Environment: repair_capacity 0.4` from a repository, and it is not obvious one could.

That is a genuine disanalogy and it should be stated rather than argued away. But it narrows the options rather than escaping them. If nothing can *derive* the coordinates, the only mechanisms left in the observed record are the schema.org one (a consumer that pays visibly for a hand-written declaration) and the badge one (a visible token a foundation or customer requires). Both are consumer-side. Neither is "publish the vocabulary and wait."

There is a third possibility the record hints at but does not confirm: the **Scorecard** move — compute what *can* be derived about a project without asking, publish it, and let the coordinates a scanner cannot reach be the thin optional layer a project adds to correct the record. Scorecard covers ~1.31 million repositories with zero maintainer action against the badge's 11,472 entries — 114× the coverage for a strictly weaker claim. `analysis/` and `computed/` are already shaped like this. Whether an OTCS coordinate is derivable at all from public artifacts is an empirical question this note cannot answer and someone should test on ten real projects.

### Cases where a stated reason could not be established

Recorded so the gaps are visible rather than papered over:

- No SPDX maintainer statement naming the cause of the 2011–2021 document-format gap.
- No dated "first webmaster" adoption event for schema.org — the authoring group was the consumer set, so the boundary is ill-defined.
- No CWE-vendor compatibility declaration earlier than 2008-03-26 established from the 2006–2007 archives read.
- No primary-source *number* for SARIF-producing tools before GitHub's ingestion endpoint. Do not state "adoption was near zero" as sourced.
- No primary source states a reason for DOAP's non-adoption. The evidence is circumstantial: three schema changes in nineteen years.
- No W3C document states outright that RDF adoption failed; the workshop reports are the strongest available.
- No first-party npm provenance adoption numbers; no dated first external SLSA-level claim.
- Ecma TC54's exact formation day; any ISO/IEC JTC1 submission for ECMA-424.
- The claim "HL7 built FHIR because v3 was too complex" appears nowhere in HL7's own wording.
- Day-level dates for ISO 15836:2003 / 15836-1:2017 / 15836-2:2019 (iso.org unreachable).
