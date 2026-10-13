# Licensing

## This project

The crates declare `MIT OR Apache-2.0`. **The LICENSE files themselves are not
yet written** — that is an outstanding task, and the declaration is provisional
until Lashlan decides the commercial model. Do not publish before it is settled.

## Dependencies

`docs/SBOM.tsv` is the full bill of materials, regenerated from the real
dependency graph with `./scripts/sbom.sh`.

As of 2026-10-13: **77 third-party crates, and not one copyleft licence among
them.** The breakdown:

| Licence | Crates |
| --- | --- |
| MIT OR Apache-2.0 (and equivalent spellings) | 55 |
| MIT only | 8 |
| BSD-2-Clause / BSD-3-Clause (with permissive alternatives) | 6 |
| Unlicense OR MIT | 2 |
| Zlib, or Zlib among alternatives | 6 |
| (MIT OR Apache-2.0) AND Unicode-3.0 | 1 |

No GPL, LGPL or AGPL dependency is present. That is deliberate and worth
defending: a single LGPL image library linked statically would change the
distribution terms of the whole product.

SQLite itself is bundled through `rusqlite` and is public domain.

## Things to watch

- **FFmpeg** (future video/audio modules) is LGPL or GPL depending on build
  flags, and carries patent exposure on some codecs. It must not be linked
  before a specific legal review. That review belongs to its own ADR.
- **libraw** (planned for RAW decoding in v0.2) is LGPL-2.1 **or** CDDL — usable,
  but the linking model has to be chosen deliberately. `rawler`/`rawloader`
  (Rust, LGPL-2.1) and `rawspeed` (LGPL-2.1) have the same consideration.
  This is the first real licence decision the project will face.
- **Trademarks.** "Darkroom" and the other module names are unregistered and
  uncleared. A search is required before any public use. No Adobe trademark,
  icon, or trade dress appears anywhere in this codebase, and none may.
- **Attribution.** A NOTICE file listing dependency attributions must ship with
  any binary release. It does not exist yet because there is no release yet.

Nothing here is legal advice, and no qualified review has happened.
