# Domain profiles

*Version 0.1 · Status: EXPERIMENTAL*

**A domain profile tests whether the shared vocabulary survives contact with one real industry.**

Everything else in this repository is general. General vocabularies pass every test until somebody tries to say something specific in one, which is what a profile is for.

---

## 1. What a profile is

A crosswalk from one industry's own words into the coordinate system, plus **the words it could not carry.**

```text
profiles/<domain>/
    crosswalk.yaml    the mapping — validates against schemas/domain-profile.schema.json
    profile.md        what the exercise found
```

## 2. The rule that makes it worth doing

> **A profile must publish what the vocabulary could not express.**

The `unmapped` list is not an appendix. It is the output. A profile with an empty `unmapped` list has almost certainly not been tested against the field — **no general vocabulary survives a real domain intact**, and one claiming to has usually been written by someone reading about the domain rather than working in it.

The schema enforces this: an empty `unmapped` array requires a written justification, so an untested profile cannot quietly look like a passed test.

Every mapped term also states **what the mapping loses**. `loses: nothing` is permitted, rare, and worth suspecting.

## 3. What a profile is not

- **Not a fork of the vocabulary.** It maps into the existing coordinates; it does not add values
- **Not a list of projects.** Profiles describe control archetypes, never named third-party products — which keeps consent out of the question entirely ([CHARTER.md](../CHARTER.md) §10)
- **Not an endorsement of any regulator.** Regulators are named only to explain why the domain's vocabulary is shaped as it is
- **Not a certification of anything in that domain**

## 4. Current profiles

| Domain | Status | Reviewed by a practitioner? |
|---|---|---|
| [`financial-crime`](financial-crime/profile.md) | experimental | **No** — see the caveat in that profile |

---

**See also:** [CALIBRATION.md](../CALIBRATION.md) — the other standing test the vocabulary can fail · [LAYERS.md](../LAYERS.md) — the vocabulary being tested · [GOVERNANCE.md](../GOVERNANCE.md) §11 — how findings become changes
