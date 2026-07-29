!!! info "Generated page"
    Compiled from `registry/ + interfaces/` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Interfaces

Ten interface domains. A project declares which it **provides** and which it **consumes**.
Nothing is tested; a declaration is a statement of intent in a shared vocabulary.

| Domain | Provided by | Consumed by |
|---|---|---|
| `identity` | — | — |
| `authority` | — | — |
| `context` | — | — |
| `environment` | `abt`, `ex-watchtower`, `ktp-demo` | — |
| `policy` | — | — |
| `decision` | `ktp-demo` | `ex-gatekeeper` |
| `receipt` | `ex-gatekeeper`, `ex-ledgerline`, `ktp-demo` | — |
| `repair` | `ex-mendwell` | — |
| `observer` | `ex-watchtower` | — |
| `provenance` | `ex-ledgerline` | — |
