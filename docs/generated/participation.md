!!! info "Generated page"
    Compiled from `PARTICIPATION.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Where your project can live

*Version 0.1 · Status: EXPERIMENTAL*

**Your project does not have to be here to be listed here.**

This registry runs on GitHub. Your project does not have to. It does not have to be open source. It does not have to contain any software at all.

| | Must be |
|---|---|
| **Your entry in this registry** | Public, structured, attributable, versioned |
| **The project itself** | Anywhere. Open or closed. Code or doctrine |

What you do need is a public entry and a verified person or organisation who maintains it.

---

## Four ways to take part

| | Mode | Who it fits |
|---|---|---|
| **A** | `github_native` | Public GitHub repository, with your entry file in it |
| **B** | `other_git` | GitLab, Bitbucket, Codeberg, Azure DevOps, self-hosted |
| **C** | `no_repository` | Doctrine, research, standards proposals, books, academic work, policy projects |
| **D** | `private_commercial` | Closed or commercial products |

### A — GitHub-native

Your `otcs.yaml` lives in your public repository. Easiest path. We store the location, a validated snapshot, its hash, and when we fetched it.

### B — Another Git platform

Publish the equivalent file at a stable URL. GitHub is where this registry is coordinated, **not where every project has to live.**

### C — No code repository at all

For work that has no repository because it is not software: theoretical frameworks, governance doctrines, standards proposals, books and essay programmes, academic research, consulting methodologies, policy projects, community initiatives.

Point at a documentation site, a DOI, a Zenodo or OSF record, a publication index, a project website, or a versioned PDF. If the project has no natural home of its own, the entry can live in this repository.

### D — Private or commercial

**You can be listed without publishing your source or your architecture.**

What you must still make public is a bounded record: what the project claims, what it does **not** claim, which connection points it says it supports, what evidence is public, what stays private, who controls it, its licensing and commercial status, and how someone can challenge a claim.

An honest closed-source entry reads like this:

```text
Implementation claimed:          yes
Public implementation evidence:  limited
Independent evaluation:          none
Source available:                no
```

> **Commercially confidential never becomes verified.** Keeping something private is fine. Having it counted as evidence because it is private is not.

---

## What every listed project provides

- **Who is responsible** — an owner, at least one public maintainer, a contact route, and evidence they hold that authority ([OWNER-VERIFICATION.md](owner-verification.md))
- **A canonical public location** — a repository, specification, DOI, or documentation site. **A social media profile is not one**
- **What kind of project it is** — one or more of: doctrine · research programme · specification · standard proposal · open-source implementation · commercial product · service · dataset · benchmark · evidence system · meta-governance · community. Mark one as primary
- **Its lifecycle state** — self-declared, and publicly challengeable
- **The problem it addresses**, and what it contributes
- **What it does not claim** — see below
- **A proposed self-mapping** onto the shared vocabulary
- **Each claim stated separately**, with its own evidence level
- **Licensing and patent status**
- **Conflicts and relationships**
- **Explicit consent** to being listed

### The one people skip

`non_claims` is not politeness. **It is the field that makes everything else in your entry readable.**

```yaml
non_claims:
  - Does not provide an identity provider.
  - Does not certify regulatory compliance.
  - Does not independently enforce runtime decisions.
  - Has not undergone independent security evaluation.
```

An entry with no stated limits reads as marketing, and gets read as marketing.

---

## What is never required

Not now, not later, not as a condition of anything:

- Hosting on GitHub
- Open-sourcing anything
- Disclosing trade secrets
- **Using KTP internally**
- **Agreeing with how we mapped you**
- Joining an alliance
- Transferring any governance
- Assigning copyright
- Licensing patents to us in order to be listed
- Accepting a combined score
- Implementing any connection point
- Agreeing with any other listed project

This registry is open to projects that implement KTP, projects that complement it, **projects that disagree with it**, and projects being compared against it.

**A map containing informed disagreement is more credible than one that does not.**

---

## Your rights

**You may:**

- Control your official description
- Update your version and roadmap
- **Dispute how we mapped your project**
- Reject a proposed connection to another project
- Correct factual errors
- Publish a response to evidence submitted about you
- Withdraw from active participation
- Transfer maintainership
- Archive the project
- Contest someone else's claim to your identity
- Decline to implement anything

**You may not:**

- Erase historical records that someone else can independently verify
- Remove another person's dispute because it is uncomfortable
- Relabel your own testing as independent validation
- Present being listed as an endorsement
- Unilaterally edit the other side of a connection record
- Silently rewrite past versions of your entry

---

**You control the project. You do not control every fact about the project.**

Withdrawal removes your participation. It does not remove the history.
