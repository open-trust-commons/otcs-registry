# Who gets listed, and who decides

*Version 0.1 · Status: EXPERIMENTAL*

The rules for getting on the list, staying on it, changing your entry, and leaving.

The short version: **your entry is yours.** You put it there, you can correct it, and you can take it down. What you cannot do is delete an inconvenient fact somebody else can check.

---

## Being listed requires consent

A `registered` entry is created or approved by **the project's own maintainers.** That is the normal path, and the only path to `registered`.

Nobody gets added to this list as a favour, a surprise, or a marketing exercise.

## The three kinds of entry

| Kind | What it means | Counted? |
|---|---|---|
| `registered` | The project put it there, and we confirmed they are who they say | Yes |
| `observed` | Built from public information. **Not** project-controlled, and **never** shown as participation | Yes, separately |
| `example` | Invented, for demonstration. Not a real project | **No** — excluded from every count |

`observed` entries are held back deliberately until the correction and right-of-reply processes are mature. Describing someone who has not agreed to it is exactly the situation those protections exist for.

## You can say no

**A project may refuse to appear at all.** *"Do not create a page in our name"* is honoured ([CHARTER.md](CHARTER.md) §10).

The refusal is logged as a bare event with **no page created**. The record shows a decision was made and respected; it does not become a stub entry about a project that wanted nothing to do with this.

## Proving an entry is really yours

Before an entry becomes `registered`, someone has to show they speak for the project. Any of these works:

| Method | What it shows |
|---|---|
| `repository_control_confirmed` | You control the code repository |
| `domain_control_confirmed` | You control the project's domain |
| `organization_email_confirmed` | You have an address at the organisation |
| `signed_statement` | A cryptographically signed statement |
| `platform_account_confirmed` | You control the project's official account |
| `documentation_naming` | The project's own docs name you |

Two others appear in records and are **not** proof of control:

- `transcribed_by_otcs` — we wrote it from public sources. It is not a `registered` entry
- `unverified` — nobody has checked yet

## Changing or leaving

| Action | What happens |
|---|---|
| `DECLINE` | Refused before any entry exists. Logged, no page |
| `UNLIST` | You withdraw. The page goes; the history stays |
| `ARCHIVE` | Kept readable, marked inactive |
| `REVOKE_VERIFICATION` | Something previously verified failed re-examination. **Both states stay visible** |
| `DISPUTE_RECORD` | You contest an outside claim about your project |
| `TRANSFER_MAINTAINERSHIP` | Both parties sign off, or it goes to the dispute process |
| `REFUSE` | We decline or suspend a listing — see the next section |

Full definitions: [GOVERNANCE.md](GOVERNANCE.md) §12.

**Four things are settled and not up for negotiation:**

- A project can **always** remove its own `registered` entry
- Leaving does not erase the history. The record that it existed survives
- Two groups claiming the same identity go to the dispute process, decided on **dated evidence**
- Suspension preserves history. Nothing is silently deleted

## When we can refuse — and this list is exhaustive

| Ground | |
|---|---|
| **Impersonation** | Claiming to be a project you are not |
| **Bad-faith name collision** | Deliberately taking a name to cause confusion |
| **Malicious content** | A submission designed to attack the registry or its readers |
| **Conduct violations** | Breaching the code of conduct |

Every refusal carries **stated grounds on the public record**, and every refusal is appealable.

**Refusal is never available because we disagree with a project's viewpoint, or because it competes with something already listed.** If that ever happens, this document is the thing to hold us to.

## Names, abandonment, and false claims

**Duplicate names.** Registering first is *recorded, not owned.* Being here first gets you a dated entry, not a trademark. Collisions go to the dispute process and are settled on dated evidence.

**Abandonment.** Objective inactivity criteria move an entry to unmaintained. **It stays readable.** A registry that quietly drops dead projects hides how the field actually moves.

**False claims.** An entry contradicted by evidence is marked disputed while the question is open, and may reach `REVOKE_VERIFICATION`.

It is **never** silently deleted. The disagreement stays in the record, with both sides.

## Connections between projects

**Nobody registers a connection on another project's behalf** at any status above `self_asserted`.

Saying "we integrate with X" records *your* claim about X. It never records X's agreement. Moving it to `mutually_confirmed` requires **X signing off** on that change.

This is what stops the list becoming a map of relationships that only one side believes in.
