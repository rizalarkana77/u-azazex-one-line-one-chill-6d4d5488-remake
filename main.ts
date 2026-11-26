// One Frame Closer — remake entry for the make.fun competition
// "One Line, One Chill" (slug u-azazex-one-line-one-chill-6d4d5488).
//
// What this program does, in order:
//   1. Holds one sentence of horror as a constant (156 characters).
//   2. Validates that sentence against the competition gate itself:
//      UTF-8 text, 1 to 200 characters, not whitespace-only, and
//      exactly one sentence that ends in a single period.
//   3. Writes the sentence plus one trailing newline to
//      $MAKEFUN_OUTPUT_DIR/entry.txt.
//   4. Reads the file back and compares it byte-for-byte with the
//      payload it meant to write, then prints the SHA-256 hash.
//
// Why a remake: the original entry ("The New Owners Keep Calling")
// ranked 1111 of 2844 in round 2, outside the top 10 that take
// prizes. This line is different in every way that matters to the
// judge: a deleted security-camera file that keeps coming back one
// frame longer, with the narrator himself standing closer to the
// camera each time. No mirrors, no dolls, no basements.
//
// Runtime notes: Node.js standard library only, no dependencies,
// no network, no randomness, no clock reads. Every run writes the
// exact same bytes, so the entry is deterministic across machines.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself. One sentence, one breath, 156 characters.
const LINE =
  "I deleted the security camera footage of my empty hallway, but the file keeps coming back one frame longer, with me standing closer to the camera each time.";

// Fail loudly instead of writing an invalid entry.
function fail(message: string): never {
  console.error(`entry invalid: ${message}`);
  process.exit(1);
}

// Count characters the way a reader counts them (code points),
// not UTF-16 code units, so the 200-character gate is honest.
function countCharacters(text: string): number {
  return [...text].length;
}

// A single sentence has exactly one terminator: the final period.
// Any earlier period, exclamation mark, or question mark would
// mean a second sentence, which the competition forbids.
function assertSingleSentence(text: string): void {
  if (!text.endsWith(".")) {
    fail("the line must end in a period");
  }
  const body = text.slice(0, -1);
  const stray = body.match(/[.!?]/g);
  if (stray !== null) {
    fail(`the line must be exactly one sentence (found ${stray.length} extra terminator(s))`);
  }
}

// Validate the gate before touching the filesystem.
const total = countCharacters(LINE);
if (total < 1 || total > 200) {
  fail(`the line is ${total} characters; it must be between 1 and 200`);
}
if (LINE.trim().length === 0) {
  fail("the line must not be whitespace-only");
}
assertSingleSentence(LINE);
console.log(`line OK: ${total} characters, exactly one sentence`);

// The grader sets MAKEFUN_OUTPUT_DIR to a fresh writable directory.
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (outDir === undefined || outDir === "") {
  fail("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
const payload = LINE + "\n";
writeFileSync(outPath, payload, "utf8");

// Read back and verify: the file on disk must equal the payload.
const written = readFileSync(outPath);
const expected = Buffer.from(payload, "utf8");
if (!written.equals(expected)) {
  fail("read-back bytes differ from the payload");
}

const digest = createHash("sha256").update(written).digest("hex");
console.log(`wrote ${outPath} (${written.length} bytes)`);
console.log(`sha256 ${digest}`);
console.log("verified: read-back bytes match the payload exactly");
console.log("deterministic: identical bytes on every run");
