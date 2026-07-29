!!! info "Generated page"
    Compiled from `registry/edges/ + src/generate.ts` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Relationship graph

Relationships are **declared**, and a declaration by one side is not agreement by the other.
Each edge carries its own status; nothing is inferred from co-occurrence.

| Source | Relationship | Target | Status |
|---|---|---|---|
| `abt` | SUPPLIES_SIGNAL_TO | `ktp` | self_asserted |
| `ex-ledgerline` | RECORDS_FOR | `ex-gatekeeper` | self_asserted |
| `ex-mendwell` | INTEGRATES_WITH | `ex-watchtower` | self_asserted |
| `ex-watchtower` | SUPPLIES_SIGNAL_TO | `ex-gatekeeper` | self_asserted |
| `ktp-demo` | IMPLEMENTS | `ktp` | self_asserted |

## What this graph is not

It is not a dependency graph, not a compatibility guarantee, and not a map of who works with whom.
Two projects appearing near each other means someone declared an edge and said what kind.
