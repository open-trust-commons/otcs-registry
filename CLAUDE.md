# otcs-registry

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `open-trust-commons/otcs-registry`, via the `gh` CLI. External PRs are **not** treated as a request surface. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles, each label string equal to its name: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` and `docs/adr/` at the repo root. Neither exists yet; both are created lazily when a term or decision actually gets resolved, so their absence is not a gap to fill. See `docs/agents/domain.md`.

## Work tracking — this repo is `ws-otcs`

Work on this repository is tracked in the worklog at
`~/Vscode Projects/worklog/` under the slug **`ws-otcs`**. Read
`worklog/CLAUDE.md` for the full process; three rules bind here.

**Every graph proposal carries the slug.** Work returns to the Physics of
Intelligence graph through `physics-of-intelligence/graph-queue/inbox/`, and the
proposal must carry:

```json
"submitted_by": "ws-otcs"
```

That single field is the join between work and graph. A proposal without it
still lands in the graph — it just returns to nobody, and the board reports an
arc that produced nothing. Never hand-write `returns` in the workstream file;
it is derived from the ledger. `returns_manual` is for pre-worklog history only.

**Update the workstream on outcomes, not on activity.** `worklog/workstreams/ws-otcs.md`
carries Vision · State · Outcomes · Next, and nothing else. A file that changes
every session is a log, and logs don't get read. Ship something, decide
something, or hit something — then write.

**Reference, don't mirror.** Gate numbers, ledger height, proposal phases and
ticket state live here and are computed (`npm run roadmap:status`,
`npm run ledger:verify`, the wayfinder map). Collaborator detail lives in
memory and gitignored drafts. The workstream points at those; it does not
restate them, because any fact stored twice will drift and then neither copy is
trustworthy.
