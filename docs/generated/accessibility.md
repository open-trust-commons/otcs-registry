!!! info "Generated page"
    Compiled from `ACCESSIBILITY.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Accessibility

*Version 0.1 · Status: EXPERIMENTAL · **A release requirement, not a nice-to-have.** Target: WCAG 2.2 AA*

---

## 1. Every public page

- Keyboard navigation for every interactive element
- **Semantic HTML** — real headings, lists and tables, not styled divs
- Screen-reader labels on non-text controls
- Sufficient contrast in **both** themes
- **Evidence states never conveyed by colour alone**
- A text alternative for every diagram
- Tables that scroll rather than overflowing the page
- Reduced-motion support
- An accessible dark mode
- A plain-language summary at the top of dense pages

## 2. The one that bites this project specifically

Evidence-status badges distinguish `SELF_ASSERTED` / `REPRODUCIBLE` / `INDEPENDENTLY_TESTED` / `DISPUTED` / `RETRACTED` partly by grey, blue, green, amber and red.

**Colour alone is not sufficient.** The state name is already rendered as text inside every badge, which satisfies the requirement — **and any future badge design has to keep the text.**

> A badge reduced to a coloured dot would make the evidence model unreadable to a colourblind reader. **That is a correctness failure, not a styling one.**

The same rule covers the capability ladder: rungs are named in text, never a coloured check mark. That happens to align with the existing ban on bare check marks ([ANALYSIS-MODEL.md](analysis-model.md) §6), arrived at for an entirely different reason.

## 3. Diagrams

The process diagrams are deterministic HTML and CSS rather than images — semantic markup, selectable text, reflowing on narrow screens, inheriting the reader's theme.

That was chosen for portability. **It happens to be the accessible answer too.**

> Any future diagram has to be readable as a document with styling switched off.

## 4. Verification before a release

| | |
|---|---|
| **Automated** | Markup validity · contrast ratios · the link-walk test |
| **Manual** | A keyboard-only pass over each page type · a screen-reader pass over one page of each type · a styling-disabled read-through |

**Failures block the release** ([RELEASE-GOVERNANCE.md](release-governance.md) §1).

---

**See also:** [HOSTING-AND-MIRRORS.md](hosting-and-mirrors.md) §3 — the deterministic build these pages come from · [BADGE-AND-CLAIMS-POLICY.md](badge-and-claims-policy.md) — why there is no badge to make accessible · [RELEASE-PROCESS.md](release-process.md) — where verification sits in a release
