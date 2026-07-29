import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { buildAll, graphHtml } from "../src/generate.js";
import { gamma, overlap } from "../src/complementarity.js";
import { loadRegistry, ROOT, type Doc } from "../src/registry-load.js";

beforeAll(() => { process.env.OTCS_BUILD_TIME = "2026-07-25T00:00:00Z"; });

describe("golden-file reproduction (deterministic generation)", () => {
  it("reproduces committed computed/ outputs exactly", () => {
    const { graph, matrix, comp } = buildAll();
    for (const [name, obj] of [["graph.json", graph], ["matrix.json", matrix], ["complementarity.json", comp]] as const) {
      const committed = JSON.parse(readFileSync(join(ROOT, "computed", name), "utf8"));
      expect(obj, name).toEqual(committed);
    }
    const html = readFileSync(join(ROOT, "computed", "graph.html"), "utf8");
    expect(graphHtml(graph) + "\n").toBe(html);
  });
});

describe("record-state discipline", () => {
  it("excludes example records from real counts", () => {
    const { matrix } = buildAll();
    expect(matrix.summary.registered).toBe(3);
    expect(matrix.summary.example).toBe(4);
    const exampleIds = matrix.rows.filter((r) => r.record_state === "example").map((r) => r.id);
    expect(exampleIds).toEqual(["ex-gatekeeper", "ex-ledgerline", "ex-mendwell", "ex-watchtower"]);
  });
  it("every computed artifact carries a full stamp", () => {
    const { graph, matrix, comp } = buildAll();
    for (const art of [graph, matrix, comp]) {
      expect(art.stamp.algorithm_version).toBeTruthy();
      expect(art.stamp.inputs.length).toBeGreaterThan(0);
      expect(art.stamp.inputs[0].sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(art.stamp.generated_at).toBe("2026-07-25T00:00:00Z");
      expect(art.stamp.note).toMatch(/not an authoritative/);
    }
  });
  it("matrix uses ladder rungs, never booleans, and names its unreachable rungs", () => {
    const { matrix } = buildAll();
    expect(matrix.unpopulated_rungs).toContain("CONFORMANCE_TESTED");
    for (const row of matrix.rows)
      for (const rung of Object.values(row.provides)) expect(typeof rung).toBe("string");
  });
});

describe("complementarity semantics", () => {
  const mk = (id: string, over: Partial<Doc> = {}): Doc => ({
    project: { id, name: id, record_state: "example", status: "concept", license: "Apache-2.0" },
    coordinates: {
      authority: ["mandate"], verbs: ["execute"],
      environment: ["system_health", "uncertainty"],
      functions: { decide: 0.9, interpret: 0.8 }, time: ["during_action"],
    },
    evidence: { specification: 2, implementation: 1, independent_validation: 0 },
    ...over,
  });

  it("a decoy pair (same words, same shape) scores below a genuine complement pair", () => {
    // Decoy: two doctrine projects with identical coordinates — high overlap, no complementarity.
    const decoyA = mk("decoy-a"), decoyB = mk("decoy-b");
    const decoy = gamma(decoyA, decoyB, []);
    expect(overlap(decoyA, decoyB)).toBeGreaterThan(0.9); // they really do use the same words
    // Genuine: a sensor and an enforcer wired provides→consumes.
    const sensor = mk("gen-sensor", { interfaces: { provides: ["environment"] } });
    sensor.coordinates = { ...sensor.coordinates, functions: { sense: 0.9, record: 0.5 } };
    const gate = mk("gen-gate", { interfaces: { consumes: ["environment"] } });
    gate.coordinates = { ...gate.coordinates, functions: { enforce: 0.9 } };
    const genuine = gamma(sensor, gate, []);
    expect(genuine.gamma).toBeGreaterThan(decoy.gamma);
    expect(decoy.D).toBeLessThan(0.05); // identical functions = no difference to compose
  });
});

describe("malformed manifest rejected", () => {
  it("schema rejects a collapsed-maturity manifest", () => {
    const ajv = new Ajv2020({ strict: true, strictRequired: false, allowUnionTypes: true });
    addFormats(ajv);
    const schema = JSON.parse(readFileSync(join(ROOT, "schemas/project-manifest.schema.json"), "utf8"));
    const validate = ajv.compile(schema);
    const bad = loadRegistry().projects[0] ? { ...loadRegistry().projects[0], evidence: 3 } : {};
    expect(validate(bad)).toBe(false);
  });
});
