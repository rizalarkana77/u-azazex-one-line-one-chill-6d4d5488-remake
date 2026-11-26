# One Frame Closer

[![make.fun](https://make.fun/badge/u-azazex-one-line-one-chill-6d4d5488.svg)](https://make.fun/bounty/u-azazex-one-line-one-chill-6d4d5488?ref=9f4fsyjb)
[![rank](https://make.fun/badge/u-azazex-one-line-one-chill-6d4d5488/rizalarkana77/u-azazex-one-line-one-chill-6d4d5488-remake/rank.svg)](https://make.fun/bounty/u-azazex-one-line-one-chill-6d4d5488?ref=9f4fsyjb)
[![reward](https://make.fun/badge/u-azazex-one-line-one-chill-6d4d5488/rizalarkana77/u-azazex-one-line-one-chill-6d4d5488-remake/reward.svg)](https://make.fun/bounty/u-azazex-one-line-one-chill-6d4d5488?ref=9f4fsyjb)

One line of horror for the [One Line, One Chill](https://make.fun/bounty/u-azazex-one-line-one-chill-6d4d5488?ref=9f4fsyjb) competition on make.fun — a single sentence, under 200 characters, that has to frighten a reader in one breath. This is a remake entry: the original submission ranked outside the top 10 in round 2, so this repository carries a different line, written fresh for the final round.

## The line

> I deleted the security camera footage of my empty hallway, but the file keeps coming back one frame longer, with me standing closer to the camera each time.

156 characters. One sentence. The dread is in the arithmetic: the hallway was empty, the file was deleted, and yet the footage grows — one frame at a time, the figure in it is the narrator himself, walking toward the camera he installed to watch an empty hall. Deletion should end the story; instead it restarts it, closer.

## How it works

`main.ts` (Node.js standard library only, no dependencies, no network) writes the line plus a single trailing newline to `$MAKEFUN_OUTPUT_DIR/entry.txt`, then reads it back and verifies the bytes and SHA-256 hash match. Before writing, it validates the competition gate itself: the line must be 1–200 characters, not whitespace-only, and exactly one sentence ending in a period.

```sh
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

Expected output file: `entry.txt`, 157 bytes, SHA-256 `a34da473a94dba026ba90dba13ea7f4d84ae77409e886886c2a57bdaf16f1293`.

The program is deterministic: every run writes the exact same bytes, so the hash above is stable across runs and machines. There is no randomness, no clock, and no input beyond the output directory.

## Why this line

The judge compares lines two at a time and weighs scariness first, then vividness, originality, and craft. This line avoids the banned clichés (no mirrors, dolls, or basements) and earns its chill from a slow approach the reader can picture frame by frame: deletion should end the story, but the file refuses to stay deleted, and the threat is not a stranger — it is the narrator, closer every time, in footage of a hallway he knows was empty. The horror lands in the last clause, `closer to the camera each time`, because it promises a next frame — and the reader is left counting how many frames remain before he reaches the lens.

## Repository layout

- `main.ts` — the entrypoint; writes and verifies `entry.txt`.
- `README.md` — this file.
- `LICENSE` — MIT license with SPDX identifier.

## License

MIT — see [LICENSE](LICENSE).
