# compiled/

Generated, disposable, non-authoritative. Rebuilt from `registry/` on every build.

`registry.json` · `graph.json` · `claims.json` · `interfaces.json` · `atlas.json`

`atlas.json` is what the site's **exploratory** comparison reads in the browser — no server, no database. Exploratory views carry a permanent banner stating they are not reviewed OTCS analyses (ANALYSIS-MODEL.md §8).

Every artifact carries its algorithm id, version, input record versions, weights, timestamp, and `non_authoritative: true`.
