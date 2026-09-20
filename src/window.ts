// The deliberation window, opened by mechanism.
//
// CALENDAR.md: entering DELIBERATION "means opening a dated window on the
// public record: where objections land, when the window opened, and the
// version being deliberated." The first such window (#49, OTCS-0004) was
// opened by hand. The founder's rule since then: windows are opened when they
// need to be, by the calendar, not by a person — least of all the founder.
//
// This module generates the window issue from the record and nothing else:
// proposal.yaml, the ledger pin, and the computed clock. It does not talk to
// GitHub. .github/workflows/window.yml runs it and posts what it prints; a
// person reviewing the workflow's output sees exactly the text that was
// posted, because nothing else could have been.
//
// Fails closed: a proposal in DELIBERATION with no ledger pin is an error,
// not a window with a blank in it.
//
// CLI: tsx src/window.ts list         — proposals whose window is due (JSON)
//      tsx src/window.ts body <id>    — the issue body for one proposal
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { computeClock, clockTable, MINIMUM_DAYS, PROPOSALS, type Clock } from "./clock.js";
import { readLedger, LEDGER, type LedgerEvent } from "./ledger.js";

type Doc = Record<string, unknown>;

export type Window = {
  proposal_id: string;
  title: string;          // the issue title — stable, so an existing issue can be found by it
  body: string;
  opened: string;         // the DELIBERATION date from phase_history
  pin: { version: string; hash: string };
  earliest: string;
};

export const windowTitle = (id: string, opened: string): string => `${id} — deliberation window (opened ${opened})`;

const range = (cls: string): string => {
  const min = MINIMUM_DAYS[cls];
  const max: Record<string, number> = { typo_metadata: 3, registry_update: 7, interface_clarification: 14, new_interface: 30, breaking_change: 45, model_revision: 90, constitutional: 90 };
  return max[cls] ? `${min}–${max[cls]} days` : `${min} days`;
};

export function buildWindow(id: string, opts: { events?: LedgerEvent[]; root?: string; repo?: string } = {}): Window {
  const root = opts.root ?? PROPOSALS;
  const repo = opts.repo ?? "open-trust-commons/otcs-registry";
  const events = opts.events ?? readLedger(LEDGER);
  const y = parse(readFileSync(join(root, id, "proposal.yaml"), "utf8")) as Doc;
  const c: Clock | undefined = computeClock(id, { events, root });
  if (!c) throw new Error(`window: ${id} has no proposal.yaml`);
  const hist = (y.phase_history ?? []) as Doc[];
  const delib = hist.find((h) => String(h.phase) === "DELIBERATION");
  if (!delib) throw new Error(`window: ${id} is not in DELIBERATION (no phase_history entry)`);
  const opened = String(delib.date);
  const pin = c.pins[c.pins.length - 1];
  if (!pin || !pin.hash || !pin.version) throw new Error(`window: ${id} has no VERSION_PUBLISHED pin with an artifact_hash — refusing to open a window on an unpinned text`);

  const cls = String(y.class);
  const title = String(y.title);
  const body = `## ${id} — deliberation window

**Opened:** ${opened}
**Proposal:** [${id} — ${title}](https://github.com/${repo}/blob/main/proposals/${id}/proposal.md)
**Version under deliberation:** \`${pin.version}\`, artifact hash \`${pin.hash}\` (ledger \`VERSION_PUBLISHED\`; recompute with \`npx tsx src/clock.ts hash ${id}\`)
**Transition:** DRAFT → DELIBERATION, per \`proposals/CALENDAR.md\` § *What each transition requires*
**Earliest legal decision:** ${c.earliest} (\`clock_start\` ${c.clock_start}; \`GOVERNANCE.md\` §3 ${cls} floor, ${range(cls)}). A date arriving compels nothing.

### Where objections land

Here. This issue is the public record of deliberation on ${id}. Anyone may comment; a handle is fine (\`CALENDAR.md\`, *Deliberation with one participant*, item 1). Objections must be answered or carried into the decision record as unresolved (\`GOVERNANCE.md\` §2).

Substantive changes to the proposal text arrive as pull requests against \`proposals/${id}/\`, under the contributor's own name, with DCO sign-off (\`DCO.md\`, \`CONTRIBUTING.md\` §2). Text contributions are CC BY 4.0 and code Apache-2.0, covering what is posted here.

### What this record does and does not contain

- It records that the window is open and dated ${opened}. It does not backdate the window to \`clock_start\`.
- It contains nothing received in private correspondence. Per \`CALENDAR.md\` item 5 and \`COMMUNICATIONS.md\` §7, reactions that arrived privately are not deliberation and are not summarized here. If their authors want them to count, they enter under their own name, on this issue.
- **Participant set at opening: the author only.** That is recorded as the honest state of the record, not as consensus. It changes the moment anyone else files.

### Amendment and the clock

A merged change to the pinned text is an amendment. Its author declares it \`NON_SUBSTANTIVE\` or \`SUBSTANTIVE\` on the ledger event that records it; anyone may contest that here within 7 days. A substantive amendment re-pins the text and the date above is recomputed from the ledger (\`src/clock.ts\`). Until OTCS-0012 is decided, that recomputation follows its strictest reading.

### Follow-on

This issue was opened by the repository's window workflow from \`proposals/${id}/proposal.yaml\` and the ledger. Nothing in it was typed by a person. If the record and this text disagree, the record wins and this text is wrong.
`;
  return { proposal_id: id, title: windowTitle(id, opened), body, opened, pin: { version: pin.version, hash: pin.hash }, earliest: c.earliest };
}

/** Every proposal in DELIBERATION with a pin — the set whose windows should exist. */
export function dueWindows(opts: { events?: LedgerEvent[]; root?: string } = {}): Window[] {
  const root = opts.root ?? PROPOSALS;
  const out: Window[] = [];
  for (const c of clockTable(opts)) {
    if (c.decided) continue;
    const y = parse(readFileSync(join(root, c.proposal_id, "proposal.yaml"), "utf8")) as Doc;
    if (String(y.phase) !== "DELIBERATION") continue;
    out.push(buildWindow(c.proposal_id, opts)); // throws on an unpinned DELIBERATION — that is the point
  }
  return out;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const [cmd, arg] = process.argv.slice(2);
  if (cmd === "list") {
    console.log(JSON.stringify(dueWindows().map((w) => ({ proposal_id: w.proposal_id, title: w.title, opened: w.opened, earliest: w.earliest })), null, 2));
  } else if (cmd === "body" && arg) {
    const w = buildWindow(arg);
    process.stdout.write(w.body);
  } else {
    console.log("usage: tsx src/window.ts list | tsx src/window.ts body <OTCS-nnnn>");
    process.exit(2);
  }
}
