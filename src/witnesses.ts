// External timestamp witnesses.
//
// The requirement is NOT Bitcoin. It is a party this project cannot influence,
// keeping a public record, durable for decades, at no ongoing cost. Bitcoin via
// OpenTimestamps satisfies that. So do other things, and the layer is built to
// hold more than one — because a single witness is a single point of dependence,
// which is the shape of problem this whole registry exists to make visible.
//
// Two are implemented, and they fail differently on purpose:
//
//   opentimestamps  proof-of-work chain, no operator, hours to confirm
//   rekor           operated append-only Merkle log, immediate inclusion proof
//
// If Bitcoin's calendars vanish, Rekor is unaffected. If sigstore's operator
// stops, Bitcoin is unaffected. Neither shares a failure domain with the other
// or with this project. That is the property being bought, not the technology.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

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
    execFileSync(bin, args, { stdio: "pipe" });
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

    // `ots info` reads the proof itself. It needs no node and no network, and
    // it names the block any attestation points at.
    //
    // `ots verify` is NOT used to decide this. It writes to stderr rather than
    // stdout — so a stdout-only capture silently never matched, and CONFIRMED
    // was unreachable for months of wall-clock — and it requires a local
    // Bitcoin node to check the block header, which no CI runner has. Making
    // confirmation depend on running a full node would mean this project could
    // never report its own anchors as confirmed.
    let info = "";
    try {
      info = execFileSync("ots", ["info", proof], { stdio: ["pipe", "pipe", "pipe"] }).toString();
    } catch (e) {
      info = ((e as { stdout?: Buffer }).stdout ?? Buffer.from("")).toString();
    }

    const blocks = [...info.matchAll(/BitcoinBlockHeaderAttestation\((\d+)\)/g)].map((m) => m[1]);
    if (blocks.length) {
      // The proof is complete: it commits to named blocks, and anyone can check
      // those block headers themselves. That independence is the whole point,
      // so it does not become weaker because we lack a node to check it here.
      // Sorted, not insertion-ordered: this string is written into the index,
      // which is committed. An unsorted list would churn the file between runs
      // for no reason, and determinism is a requirement here, not a preference.
      const seen = [...new Set(blocks)].sort((a, b) => Number(a) - Number(b));
      return {
        state: "CONFIRMED",
        note: `bitcoin ${seen.length > 1 ? "blocks" : "block"} ${seen.join(", ")} — verify independently with a node`,
      };
    }
    if (/PendingAttestation/.test(info)) {
      return { state: "SUBMITTED", note: "calendars hold it; no block commits it yet — run ots upgrade" };
    }
    return { state: "UNKNOWN", note: "proof contains neither a pending nor a block attestation" };
  },
};

/* ── Rekor · sigstore transparency log ───────────────────────────────────── */

/**
 * Rekor records a signature over the manifest, not the manifest itself, so the
 * log entry says *who* submitted *what digest* and *when the log saw it*. The
 * signature uses the same key published in MAINTAINERS.md §1, which is why
 * .allowed_signers permits the `file` namespace as well as `git`.
 *
 * Inclusion is immediate rather than eventual — the opposite trade from
 * Bitcoin, and the reason having both says more than having either twice.
 */
export const rekor: Witness = {
  id: "rekor",
  substrate: "sigstore transparency log",
  available: () => has("rekor-cli", ["version"]) && existsSync(SIGNING_KEY),
  submit(absPath, repoRelPath) {
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
    try {
      const out = execFileSync(
        "rekor-cli", ["search", "--artifact", absPath], { stdio: "pipe" },
      ).toString();
      if (/[0-9a-f]{64,}/.test(out)) return { state: "CONFIRMED", note: "present in the log" };
      return { state: "UNKNOWN", note: "not found in the log" };
    } catch {
      return { state: "UNKNOWN", note: "search failed, or no network" };
    }
  },
};

const SIGNING_KEY = process.env.OTCS_SIGNING_KEY ?? join(process.env.HOME ?? "", ".ssh", "otcs-signing");

/**
 * Registered witnesses, in the order a round tries them.
 *
 * A round succeeds if ANY witness accepts. It reports how many of the
 * registered set responded, because "witnessed by one of two" and "witnessed
 * by two of two" are different claims and collapsing them would be the
 * authority inflation ANCHORING.md refuses.
 */
export const WITNESSES: Witness[] = [opentimestamps, rekor];

export const witnessById = (id: string): Witness | undefined =>
  WITNESSES.find((w) => w.id === id);
