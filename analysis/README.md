# analysis/

Published analysis records. Every file here is a versioned OTCS object governed by ANALYSIS-MODEL.md and validated against `schemas/analysis.schema.json`.

```text
methods/       versioned method specifications — changing a method changes the record
projects/      <project-id>/<analysis-version>/     project baselines
pairs/         <a>--<b>/<analysis-version>/         pairwise reviews
collections/   <collection-id>/                     domain / standard / interface sets
ecosystem/     <otcs-release>/                      release-versioned ecosystem reports
```

Sibling `reviews/` holds the raw material: `ai-runs/` (prompts, exact model ids, run ids, raw outputs), `human-verification/`, `owner-responses/`. Sibling `compiled/` is generated and disposable.

**Nothing here is accepted because it was generated.** It is accepted when its versioned record enters the Commons through the published process.
