# ADR-001 — Site renderer: custom generator now, MkDocs at v0.6

**Status:** Accepted · **Date:** 2026-07-27 · **Amends:** PLAN.md §2 (stack determination)

## Context

The build plan chose TypeScript, YAML, JSON Schema, and a small custom generator emitting plain HTML/CSS — no framework, no second site generator, no Python. That generator now produces a deterministic 46-page site with zero external assets, zero JavaScript, light/dark theming, and a passing test suite (deterministic double-build, dangling-link walk, forbidden-copy scan, sanitization).

A proposal recommends adding **MkDocs** as the human-facing renderer, with TypeScript demoted to a data compiler that emits Markdown. The stated benefit is real: navigation, search, documentation structure, and page templating for free instead of hand-built.

Adding MkDocs is a genuine architecture change and is recorded here rather than absorbed silently.

## Decision

**Keep the custom generator through `v0.5`. Adopt MkDocs at `v0.6` (Trust Atlas Beta) if — and only if — discovery pressure is real by then.**

The `generate-docs` seam is built now regardless: registry → TypeScript → **Markdown + JSON exports** → renderer. That makes the renderer swappable and means adopting MkDocs later is a build-step change, not a rewrite.

## Why not now

1. **The problem MkDocs solves does not exist yet.** Navigation and search matter at hundreds of records. There are seven. Hand-built navigation over seven records is not a cost; maintaining two renderer ecosystems is.
2. **It costs a property already paid for.** Zero external assets is currently true site-wide — no CDN, no fonts, no runtime. Material for MkDocs loads fonts and JavaScript by default. That property is load-bearing for offline readability, air-gapped review, and the accessibility posture. Trading it before there is a benefit is a bad trade.
3. **It adds a second toolchain to a one-maintainer project.** Python plus pinned `requirements.lock` plus theme plus plugins, each with its own supply-chain surface, on a project whose security capacity is explicitly limited (PREMORTEM.md).
4. **Determinism is currently proven, not assumed.** A test asserts byte-identical double builds. Re-establishing that guarantee across a second generator is work with no user-visible payoff at this size.

## Why later, and on what trigger

Adopt when any of these is true: registry exceeds ~50 records · users report they cannot find things · the Trust Atlas needs faceted search and filters (`v0.6`'s actual scope) · authored documentation outgrows hand-maintained navigation.

At that point the custom generator's remaining job — deterministic data compilation, validation, JSON exports, graph and matrix generation — is exactly what it is good at, and rendering moves to a tool built for rendering.

## Consequences

The `docs/generated/` convention and the Markdown-emitting seam land now, so nothing has to be undone. Hosting (Vercel primary, Pages mirror), the single canonical build command, and dependency pinning apply either way and are adopted immediately — they are not MkDocs-specific.

If this decision proves wrong, the cost is one build-step swap; the registry data, schemas, and ledger are untouched by it. That asymmetry is why deferring is the cheap option.
