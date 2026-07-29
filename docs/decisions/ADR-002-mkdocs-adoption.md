# ADR-002 — MkDocs adopted at v0.1.0

**Status:** Accepted · **Date:** 2026-07-27 · **Supersedes:** ADR-001 · **Decided by:** Chris Perkins (project owner)

## Context

ADR-001 (mine, same day) deferred MkDocs to v0.6 on the grounds that navigation and search do not matter at seven records, and that the site's zero-external-assets property was worth keeping. The project owner has decided otherwise: **MkDocs ships with the site at v0.1.0**, matching the architecture in the original design note — TypeScript as the data compiler, MkDocs as the human-facing renderer.

That is a legitimate call to make, and it is his to make. This ADR records it as a decision rather than letting it happen as drift.

## Decision

```text
registry YAML
      ↓
TypeScript   validate · normalize · build graph · compute
      ↓
TypeScript   generate Markdown + JSON exports → docs/generated/
      ↓
MkDocs       build one static site
      ↓
dist/        → Vercel (primary) · GitHub Pages (mirror)
```

**One canonical build command**, run identically by both hosts:

```bash
npm ci
npm run validate
npm test
npm run generate:docs
python -m pip install -r requirements.lock
mkdocs build --strict --site-dir dist
npm run test:site
```

Pinned: Node version (`.nvmrc`), Python version, npm dependencies (`package-lock.json`), MkDocs version, theme, and plugins (`requirements.lock`).

## What this costs, recorded honestly

1. **Python enters a pure-TypeScript toolchain** — a second dependency ecosystem and a second supply-chain surface on a one-maintainer project.
2. **Zero-external-assets is spent.** The Material theme loads fonts and JavaScript. Offline readability and air-gapped review degrade. **Mitigation:** configure the theme to self-host fonts and disable optional analytics/telemetry features; verify with a network-blocked load before release. If self-hosting cannot be made to work, that is a finding worth recording rather than papering over.
3. **Determinism must be re-proven** across the new generator. The existing test asserts byte-identical double builds; it is extended to cover the MkDocs output, and `--strict` makes warnings fatal so broken references fail the build.

## What this buys

Navigation, search, and documentation structure without hand-maintenance · a conventional contribution surface (contributors know MkDocs) · authored content and generated content composing in one site · room for the Learn and Participate sections without bespoke templating.

## Consequences

The custom generator is **not deleted.** It becomes the data compiler — validation, JSON exports, graph and matrix generation, Markdown emission — which is what it was always best at. `src/sitegen.ts` and its template remain available and tested, so reverting is a build-step change if the theme proves unworkable.

`ACCESSIBILITY.md` still governs: WCAG 2.2 AA, evidence states never conveyed by color alone, diagrams readable with styling disabled. A theme does not relax those; if the theme fights them, the theme loses.
