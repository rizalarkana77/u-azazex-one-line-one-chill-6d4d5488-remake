// One Frame Closer — make.fun remake entry for "One Line, One Chill".
//
// Writes a single sentence of horror (156 characters, under the 200-character
// limit) to $MAKEFUN_OUTPUT_DIR/entry.txt, then verifies the written file
// byte-for-byte and logs its SHA-256 hash.
//
// Node.js standard library only. Deterministic: the same input always
// produces the same bytes. Remake entry: a different line from the original
// submission, written after the original ranked outside the top 10.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I deleted the security camera footage of my empty hallway, but the file keeps coming back one frame longer, with me standing closer to the camera each time.";

// The competition gate: UTF-8 text, 1-200 characters, not whitespace-only,
// exactly one sentence in one breath.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  console.error(`line is ${chars} characters; must be 1-200`);
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("line must not be whitespace-only");
  process.exit(1);
}
if (!LINE.endsWith(".")) {
  console.error("line must be exactly one sentence ending in a period");
  process.exit(1);
}
const extraTerminators = LINE.slice(0, -1).match(/[.!?]/g);
if (extraTerminators) {
  console.error("line must be exactly one sentence");
  process.exit(1);
}
console.log(`line OK: ${chars} characters, one sentence`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
const payload = LINE + "\n";
writeFileSync(outPath, payload, "utf8");

const bytes = readFileSync(outPath);
const expected = Buffer.from(payload, "utf8");
if (!bytes.equals(expected)) {
  console.error("verification failed: written bytes differ from payload");
  process.exit(1);
}
const hash = createHash("sha256").update(bytes).digest("hex");
console.log(`wrote ${outPath} (${bytes.length} bytes, sha256 ${hash})`);
console.log("verified: read-back bytes match payload exactly");
