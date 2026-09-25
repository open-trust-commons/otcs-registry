import { beforeEach, describe, expect, it, vi } from "vitest";
const h = vi.hoisted(() => ({ result: {} as any, present: true, command: vi.fn() }));
vi.mock("node:child_process", () => ({
  execFileSync: vi.fn(() => Buffer.from("installed")),
  spawnSync: (...args: any[]) => { h.command(...args); return h.result; },
}));
vi.mock("node:fs", () => ({ existsSync: () => h.present }));
import { opentimestamps, rekor } from "../src/witnesses.js";
const hash = "a".repeat(64);
const otsSuccess = "Success! Bitcoin block 358391 attests existence as of 2015-05-28 CEST\n";
const rekorSuccess = `Computed Root Hash: ${hash}\nExpected Root Hash: ${hash}\n`;
beforeEach(() => {
  h.present = true; h.command.mockClear();
  h.result = { status: 0, error: undefined, stdout: "", stderr: "" };
});
describe("witness verification contract", () => {
  it("does not confirm a named Bitcoin attestation without verification", () => {
    h.result.stdout = "BitcoinBlockHeaderAttestation(358391)";
    expect(opentimestamps.check("manifest", "manifest").state).toBe("UNKNOWN");
    expect(h.command.mock.calls[0][1]).toEqual(["verify", "manifest.ots"]);
  });
  it("accepts successful Bitcoin verification on stderr", () => {
    h.result.stderr = otsSuccess;
    expect(opentimestamps.check("manifest", "manifest").state).toBe("CONFIRMED");
  });
  it.each([1, null])("does not confirm Bitcoin on exit %s despite success text", (status) => {
    h.result = { status, stdout: otsSuccess, stderr: "" };
    expect(opentimestamps.check("manifest", "manifest").state).toBe("UNKNOWN");
  });
  it("does not confirm a Rekor search hit without inclusion verification", () => {
    h.result.stdout = hash;
    expect(rekor.check("manifest", "manifest").state).toBe("UNKNOWN");
    expect(h.command.mock.calls[0][1]).toEqual(expect.arrayContaining(["verify", "--artifact", "manifest", "--signature", "manifest.sig", "--public-key"]));
    expect(h.command.mock.calls[0][1]).not.toContain("search");
  });
  it("accepts successful Rekor verification", () => {
    h.result.stdout = rekorSuccess;
    expect(rekor.check("manifest", "manifest").state).toBe("CONFIRMED");
  });
  it.each([1, null])("does not confirm Rekor on exit %s despite matching roots", (status) => {
    h.result = { status, stdout: rekorSuccess, stderr: "" };
    expect(rekor.check("manifest", "manifest").state).toBe("UNKNOWN");
  });
  it("refuses unequal Rekor roots", () => {
    h.result.stdout = rekorSuccess.replace(`Expected Root Hash: ${hash}`, `Expected Root Hash: ${"b".repeat(64)}`);
    expect(rekor.check("manifest", "manifest").state).toBe("UNKNOWN");
  });
  it.each([opentimestamps, rekor])("$id refuses missing local proof inputs", (witness) => {
    h.present = false;
    expect(witness.check("manifest", "manifest").state).toBe("UNKNOWN");
    expect(h.command).not.toHaveBeenCalled();
  });
  it.each([opentimestamps, rekor])("$id refuses process errors with misleading output", (witness) => {
    h.result = { status: 0, error: new Error("timeout"), stdout: rekorSuccess + otsSuccess, stderr: otsSuccess };
    expect(witness.check("manifest", "manifest").state).toBe("UNKNOWN");
  });
});
