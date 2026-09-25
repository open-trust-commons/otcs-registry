// Local CLI writers cooperate through an exclusive sidecar lock. A process
// crash leaves the lock behind: recovery is explicit, never an automatic steal.
import { closeSync, fsyncSync, mkdirSync, openSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";

export function withFileLock<T>(file: string, action: () => T): T {
  mkdirSync(dirname(file), { recursive: true });
  const lock = `${file}.lock`;
  const fd = openSync(lock, "wx", 0o600);
  try { return action(); }
  finally { closeSync(fd); unlinkSync(lock); }
}

// Readers see either complete index. This does not promise directory fsync or
// survival of every filesystem/power failure; immutable manifests stay separate.
export function replaceFile(file: string, body: string): void {
  const temporary = `${file}.${randomUUID()}.tmp`;
  const fd = openSync(temporary, "wx", 0o600);
  try {
    try { writeFileSync(fd, body, "utf8"); fsyncSync(fd); }
    finally { closeSync(fd); }
    renameSync(temporary, file);
  } catch (error) {
    try { unlinkSync(temporary); } catch { /* preserve the original write failure */ }
    throw error;
  }
}
