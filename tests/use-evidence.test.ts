import { describe, it, expect } from "vitest";
import { computeCounts, interimTripwire, criterion3Reading, externalRegistrations } from "../src/use-evidence.js";

// Both directions throughout: instances that must count, and instances that
// must be excluded with their stated reason. The rules under test are
// OTCS-0007's qualifying rules, OTCS-0008's conservative counting, and
// OTCS-0009's coupled pair and all-dark tripwire.

const qualified = (over: Record<string, unknown> = {}) => ({
  instance_id: "UI-0001",
  line: "vocabulary_use",
  party: "some-handle",
  party_artifact_url: "https://example.invalid/their-spec",
  artifact_date: "2027-01-10",
  claim: "Their published spec binds its scope in OTCS coordinates.",
  recorded: "2027-01-11",
  ruling: { status: "QUALIFIED", by: "determination-2027-001", date: "2027-02-01" },
  ...over,
});

describe("use-evidence — conservative counting", () => {
  it("a QUALIFIED instance counts on its line and nowhere else", () => {
    const c = computeCounts([qualified()], [], []);
    expect(c.lines.vocabulary_use.qualifying).toBe(1);
    expect(c.lines.entry_use.qualifying).toBe(0);
    expect(c.lines.instrument_decisions.qualifying).toBe(0);
  });

  it("an instance never ruled on counts as not qualifying", () => {
    const c = computeCounts([qualified({ ruling: { status: "UNRULED" } })], [], []);
    expect(c.lines.vocabulary_use.qualifying).toBe(0);
    expect(c.excluded[0].why).toMatch(/never ruled/i);
  });

  it("a contested instance is excluded until ruled", () => {
    const c = computeCounts([qualified({ ruling: { status: "CONTESTED" } })], [], []);
    expect(c.lines.vocabulary_use.qualifying).toBe(0);
    expect(c.excluded[0].why).toMatch(/contested/i);
  });

  it("a contacted party's instance counts only when the contact predates the artifact", () => {
    const contacts = [{ contact_id: "UC-0001", date: "2026-12-01" }];
    const ok = computeCounts([qualified({ contact_ref: "UC-0001" })], contacts, []);
    expect(ok.lines.vocabulary_use.qualifying).toBe(1);

    const late = [{ contact_id: "UC-0001", date: "2027-03-01" }];
    const bad = computeCounts([qualified({ contact_ref: "UC-0001" })], late, []);
    expect(bad.lines.vocabulary_use.qualifying).toBe(0);
    expect(bad.excluded[0].why).toMatch(/does not predate/i);
  });

  it("an unlogged contact excludes the instance — the approach was never logged", () => {
    const c = computeCounts([qualified({ contact_ref: "UC-0009" })], [], []);
    expect(c.lines.vocabulary_use.qualifying).toBe(0);
    expect(c.excluded[0].why).toMatch(/never logged/i);
  });

  it("entry use citing a founder entry is excluded even when ruled QUALIFIED", () => {
    const inst = qualified({
      line: "entry_use", registry_entry: "ktp",
      entry_dependence_evidence: "dated statement", instance_id: "UI-0002",
    });
    const c = computeCounts([inst], [], []); // zero external registrations
    expect(c.lines.entry_use.qualifying).toBe(0);
    expect(c.excluded[0].why).toMatch(/founder entries are excluded/i);
  });

  it("entry use citing an external entry counts once external registrations exist", () => {
    const inst = qualified({
      line: "entry_use", registry_entry: "their-project",
      entry_dependence_evidence: "diff traceable to the entry", instance_id: "UI-0002",
    });
    const c = computeCounts([inst], [], ["their-project"]);
    expect(c.lines.entry_use.qualifying).toBe(1);
    expect(c.coupled_pair).toBe(false);
  });
});

describe("use-evidence — the coupled pair and the tripwire", () => {
  it("zero external registrations couples criteria 1+3", () => {
    expect(computeCounts([], [], []).coupled_pair).toBe(true);
    expect(computeCounts([], [], ["someone"]).coupled_pair).toBe(false);
  });

  it("the empty file finds the criterion met without anyone's cooperation", () => {
    const c = computeCounts([], [], []);
    expect(criterion3Reading(c)).toMatch(/criterion 3 MET \(evidence absent\)/);
  });

  it("all dark fires the interim narrow", () => {
    const t = interimTripwire(computeCounts([], [], []));
    expect(t.fires).toBe(true);
    expect(t.reading).toMatch(/narrow/i);
  });

  it("a single party-published instrument decision keeps the clock running — evidence of life, not of use", () => {
    const c = computeCounts([qualified({ line: "instrument_decision", instance_id: "UI-0003" })], [], []);
    const t = interimTripwire(c);
    expect(t.fires).toBe(false);
    // and it still has zero force toward criterion 3:
    expect(criterion3Reading(c)).toMatch(/criterion 3 MET/);
  });

  it("vocabulary use at the bar reads 'instrument works, registry unused' — never a pass", () => {
    const c = computeCounts([
      qualified(),
      qualified({ instance_id: "UI-0002", party: "another-handle" }),
    ], [], []);
    expect(criterion3Reading(c)).toMatch(/instrument works, registry unused/);
    expect(criterion3Reading(c)).toMatch(/criterion 3 MET/);
  });

  it("entry use at the two-party bar defers pairwise independence to the determination", () => {
    const mk = (id: string, party: string) => qualified({
      line: "entry_use", instance_id: id, party, registry_entry: "their-project",
      entry_dependence_evidence: "dated statement",
    });
    const c = computeCounts([mk("UI-0001", "p1"), mk("UI-0002", "p2")], [], ["their-project"]);
    expect(criterion3Reading(c)).toMatch(/DEFEATED if a determination confirms pairwise independence/);
  });

  it("two instances from ONE party do not reach the bar", () => {
    const mk = (id: string) => qualified({
      line: "entry_use", instance_id: id, party: "same-party", registry_entry: "their-project",
      entry_dependence_evidence: "dated statement",
    });
    const c = computeCounts([mk("UI-0001"), mk("UI-0002")], [], ["their-project"]);
    expect(c.lines.entry_use.distinct_parties).toBe(1);
    expect(criterion3Reading(c)).toMatch(/criterion 3 MET/);
  });
});

describe("use-evidence — external self-registration is computed, not asserted", () => {
  const proj = (id: string, owners: Array<Record<string, string>>) => ({
    project: { id, record_state: "registered" },
    ownership: { owners },
  });

  it("founder-owned records never count as external", () => {
    expect(externalRegistrations([
      proj("ktp", [{ name: "Chris Perkins (nmcitra)" }]),
      proj("abt", [{ name: "Chris Perkins" }]),
    ])).toEqual([]);
  });

  it("an outside owner's registered record counts", () => {
    expect(externalRegistrations([
      proj("ktp", [{ name: "Chris Perkins (nmcitra)" }]),
      proj("their-project", [{ name: "Someone Else", organization: "Elsewhere Ltd" }]),
    ])).toEqual(["their-project"]);
  });

  it("an ownerless record is not externally self-registered", () => {
    expect(externalRegistrations([proj("mystery", [])])).toEqual([]);
  });
});
