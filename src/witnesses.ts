// External timestamp adapters: OpenTimestamps/Bitcoin and Rekor/Sigstore.
// They use different infrastructure. Long-term availability and independence
// are deployment assumptions, not properties certified by this adapter.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

export type WitnessState = "SUBMITTED" | "CONFIRMED" | "UNKNOWN";

export type Witness = {
  /** Stable id recorded in the index. Never reused for a different service. */
  id: string;
  /** What actually holds the record, in plain words. */
  substrate: string;
  /** Is the client present? Absence is reported, never worked around. */
  available(): boolean;
  /**
   * Submit a manifest. Returns paths of any proof artifacts to keep, or null
   * if submission failed. Throwing is also acceptable — the caller records
   * the failure rather than retrying silently.
   */
  submit(absPath: string, repoRelPath: string): { proofs: string[] } | null;
  /** Re-check a submission. CONFIRMED must mean a verifiable inclusion. */
  check(absPath: string, repoRelPath: string): { state: WitnessState; note?: string };
};

const has = (bin: string, args: string[] = ["--version"]): boolean => {
  try {
    execFileSync(bin, args, { stdio: "pipe", timeout: 5000 });
    return true;
  } catch {
    return false;
  }
};

/* ── OpenTimestamps · Bitcoin ────────────────────────────────────────────── */

export const opentimestamps: Witness = {
  id: "opentimestamps",
  substrate: "bitcoin",
  available: () => has("ots"),
  submit(absPath, repoRelPath) {
    execFileSync("ots", ["stamp", absPath], { stdio: "pipe" });
    return { proofs: [`${repoRelPath}.ots`] };
  },
  check(absPath) {
    const proof = `${absPath}.ots`;
    if (!existsSync(proof)) return { state: "UNKNOWN", note: "proof file missing" };

    // The verifier binds the proof to the adjacent manifest and checks Bitcoin.
    // Inspection output names claims; only successful verification confirms one.
    const result = spawnSync("ots", ["verify", proof], {
      encoding: "utf8", timeout: 60000, maxBuffer: 1024 * 1024,
    });
    const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
    const success = output.match(/^Success! Bitcoin block (\d+) attests existence as of .+$/m);
    if (!result.error && result.status === 0 && success) {
      return { state: "CONFIRMED", note: `Bitcoin block ${success[1]} verified by ots` };
    }
    return { state: "UNKNOWN", note: "Bitcoin proof not verified; client, node or proof may be unavailable" };
  },
};

/* ── Rekor · sigstore transparency log ───────────────────────────────────── */

/**
 * Rekor records a signature over the manifest digest. This adapter uses the
 * configured SSH signing key; the operator must bind its public key to the
 * intended maintainer identity. Verification checks the submitted artifact and
 * inclusion, under the installed client's log-key trust configuration.
 */
export const rekor: Witness = {
  id: "rekor",
  substrate: "sigstore transparency log",
  available: () => has("rekor-cli", ["version"]),
  submit(absPath, repoRelPath) {
    if (!existsSync(SIGNING_KEY)) return null;
    const sig = `${absPath}.sig`;
    execFileSync("ssh-keygen", ["-Y", "sign", "-f", SIGNING_KEY, "-n", "file", absPath], { stdio: "pipe" });
    // `rekord`, not `hashedrekord`: hashedrekord accepts x509-based PKI only and
    // refuses an SSH signature outright. rekord is the type that takes ssh.
    const out = execFileSync(
      "rekor-cli",
      ["upload", "--type", "rekord", "--artifact", absPath,
       "--signature", sig, "--pki-format", "ssh", "--public-key", `${SIGNING_KEY}.pub`],
      { stdio: "pipe" },
    ).toString();
    const index = out.match(/index (\d+)/)?.[1];
    const uuid = out.match(/entries\/([0-9a-f]+)/)?.[1];
    return {
      proofs: [
        `${repoRelPath}.sig`,
        ...(index ? [`rekor-index:${index}`] : []),
        ...(uuid ? [`rekor-uuid:${uuid}`] : []),
      ],
    };
  },
  check(absPath) {
    const signature = `${absPath}.sig`;
    const publicKey = `${SIGNING_KEY}.pub`;
    if (!existsSync(signature) || !existsSync(publicKey)) {
      return { state: "UNKNOWN", note: "signature or public key missing" };
    }
    // Delegate artifact/signature binding and inclusion verification to Rekor.
    // Trust remains that of the installed client and its configured log key.
    const result = spawnSync("rekor-cli", ["verify", "--type", "rekord", "--artifact", absPath,
      "--signature", signature, "--pki-format", "ssh", "--public-key", publicKey], {
      encoding: "utf8", timeout: 60000, maxBuffer: 1024 * 1024,
    });
    const output = result.stdout ?? "";
    const computed = output.match(/^Computed Root Hash: ([0-9a-f]{64})\s*$/m)?.[1];
    const expected = output.match(/^Expected Root Hash: ([0-9a-f]{64})\s*$/m)?.[1];
    if (!result.error && result.status === 0 && computed && computed === expected) {
      return { state: "CONFIRMED", note: "artifact and inclusion proof verified by rekor-cli" };
    }
    return { state: "UNKNOWN", note: "Rekor artifact/inclusion verification did not succeed" };
  },
};

const SIGNING_KEY = process.env.OTCS_SIGNING_KEY ?? join(homedir(), ".ssh", "otcs-signing");

/**
 * Registered witnesses, in the order a round tries them.
 *
 * Submission and confirmation are separate. The caller reports how many of the
 * registered set responded, because "witnessed by one of two" and "witnessed
 * by two of two" are different claims and collapsing them would be the
 * authority inflation ANCHORING.md refuses.
 */
export const WITNESSES: Witness[] = [opentimestamps, rekor];

export const witnessById = (id: string): Witness | undefined =>
  WITNESSES.find((w) => w.id === id);
