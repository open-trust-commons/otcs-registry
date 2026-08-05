# Identifiers, and turning records into bytes

*Version 0.1 · Status: EXPERIMENTAL*

**Hashing a record is meaningless until "the same record" has an exact definition.** Without this document the log proves byte consistency while staying ambiguous about identity.

---

## 1. The problem

YAML permits key reordering, alternate quoting, whitespace variation, anchors and several scalar styles.

- **Two files that mean the same thing can hash differently**
- **Two different meanings can be edited into the same bytes**

A hash chain over uncanonicalised input proves considerably less than it appears to.

## 2. Stable identifiers

Every major object carries a permanent identifier:

```text
urn:otcs:project:ktp
urn:otcs:claim:ktp:zeroth-law:1
urn:otcs:relationship:tameautonomy-builds-on-ktp:1
urn:otcs:proposal:0002
urn:otcs:decision:0002:1
urn:otcs:object:ex-ledgerline-scope:1
```

Once a domain exists these resolve as `https://<domain>/id/project/ktp`.

**They are URNs, not URLs, on purpose.** An identifier has to survive a change of host ([FEDERATION.md](FEDERATION.md) §3).

## 3. The rules

| Situation | Rule |
|---|---|
| **Permanence** | An identifier, once issued, is **never reused for a different subject. Ever** |
| **Rename** | The identifier persists, the label changes, the old label becomes an alias |
| **Merge** | Both identifiers persist. One gains a `superseded_by` pointer. **Neither is deleted** |
| **Fork** | A new identifier, with a `forked_from` relationship |
| **Recycled name** | Refused. The name may be reused only with a new identifier and a disambiguating record |
| **Withdrawal** | The identifier persists; the record's state becomes `withdrawn` |

## 4. Canonical form, before hashing

1. Convert YAML to JSON
2. Sort object keys lexicographically by Unicode code point, recursively
3. No insignificant whitespace · UTF-8 · `\n` line endings
4. **Unicode NFC normalisation on every string** — which also blocks a class of homoglyph impersonation
5. Numbers in their shortest round-tripping form; no leading `+`, no trailing zeros
6. Timestamps in RFC 3339 UTC with an explicit `Z`
7. **Arrays keep the order they were written in** — order is meaning in phase histories and lifecycles

The log already canonicalises by sorted-key JSON. This document generalises that rule to every hashed object and states it as a requirement rather than an implementation habit.

## 5. Changing hash algorithm

Currently SHA-256. A migration would:

- Publish **both algorithms in parallel for one full release cycle**
- Record the transition in the log
- **Preserve prior hashes rather than recomputing history**

Old hashes stay valid for what they signed. Recomputing them would silently rewrite what past signatures meant.

---

**See also:** [FEDERATION.md](FEDERATION.md) — why identifiers must not name a host · [PROJECT-LIFECYCLE.md](PROJECT-LIFECYCLE.md) §5 — name collisions and forks in practice · [SECURITY.md](SECURITY.md) §2 — what the hash chain does and does not establish
