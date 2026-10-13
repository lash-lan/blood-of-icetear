# Status

**Last verified: 2026-10-13** on Ubuntu 24.04 (x86-64, headless), Rust 1.97.0,
with a browser engine for the WebAssembly measurements.

Everything in DONE below was executed, not described. The exact commands and
their results are in "Evidence". Nothing is listed as DONE on the strength of
code that merely compiles.

## DONE

| Item | Evidence |
| --- | --- |
| Linear-light f32 render pipeline: exposure, contrast, highlights, shadows, temperature, tint, saturation, vibrance, crop, 90° rotation | `cargo test` — 49 unit tests in `lc-core`, including direction-of-effect, luminance preservation and mid-grey pivot checks |
| Golden-image regression suite over 7 fixed recipes | `cargo test -p lc-core --test golden` — 7 tests, fixtures in `crates/lc-core/tests/golden/` (generated here; no third-party images) |
| Decode JPEG/PNG/TIFF, 8- and 16-bit, with EXIF orientation applied | `lc-core` unit tests + smoke step A/B |
| Embedded ICC profiles read and classified; non-sRGB flagged as UNMANAGED, never silently assumed | `icc.rs` unit tests (sRGB, Display P3, garbage, absent) |
| Versioned edit recipes; a newer schema is refused, not guessed | `recipe.rs` unit tests |
| Undo/redo with branch discard and a capped stack | `history.rs` unit tests |
| SQLite catalog with migrations, per-file import transactions, WAL | `cargo test -p lc-catalog` — 12 integration tests against real files and a real database |
| Edits persist across quit/relaunch | smoke step F: every command is a separate process; a copied `.db` alone reproduces the state |
| Missing files flagged and relinkable without losing edits | `lc-catalog` test + smoke step H |
| Export to JPEG/PNG with quality and longest-edge resize, written atomically via a temp file + rename | `export.rs` tests + smoke step G |
| Originals never modified; exporting onto the original is refused | smoke step D (byte-for-byte checksum of the source before and after editing) and step G |
| Per-file import progress and specific, actionable error messages | smoke steps A and H |
| Runs entirely offline | smoke step I: no HTTP client in any manifest; all journeys run with no network |
| `darkroom` CLI covering every v0.1 journey | `scripts/smoke.sh` — passes end to end |
| The engine compiled to WebAssembly and running in a browser (31 KB, five functions, no build step) | `cargo test -p lc-wasm` (5 tests) plus `web/bench.html` run in a real browser engine |
| Colour maths made about 7x faster by table lookups and `simd128`, with no change to the pictures | All 7 golden-image tests still pass after the change; before and after figures in ADR-0004 |
| First measured performance figures, on this machine and with the processor slowed 4x | ADR-0004, reproducible with `./scripts/bench-wasm.sh` |
| Format, lint and test gate | `./scripts/check.sh` — rustfmt clean, clippy clean at `-D warnings`, 72 tests pass |

## IN PROGRESS

Nothing is half-finished in the tree. The next increment is named in
`docs/NEXT_SESSION.md`.

## BLOCKED

| Item | Blocker |
| --- | --- |
| Desktop graphical shell | No display, no GTK/WebKit, and not the target OS in this build environment. A GUI could be compiled but never run, which does not meet this project's definition of done. Needs Lashlan's Windows machine. See ADR-0001. |
| Its own git repository | The GitHub credentials available to this session cannot create repositories (HTTP 403). The code therefore sits in the `lashlan-creative/` folder of the `personal-website` repo, on branch `ccr-8d5e72f5-pvh2sa`, as a holding pen only. Migration instructions are in `docs/NEXT_SESSION.md`. |
| Performance budgets on real hardware | The browser figures in ADR-0004 come from this machine, and from an estimate made by slowing the processor four times. **Nothing has run on an actual phone.** No smoothness claim may be made until it has. |
| Smooth slider dragging on a phone | Measured at 8 to 16 passes a second at preview size against the 30 a second that feels smooth. The four ways to close that gap are named in ADR-0004 and none of them is research. |

## NOT STARTED

RAW decoding · ICC conversion · lens correction · histogram and clipping
warnings · batch export · presets · ratings, flags and keyword search · local
adjustment masks · healing · curves and HSL · GPU acceleration · smart previews ·
background job queue with cancellation · preview cache · plugin interface · AI
adapters · installer, updater and crash recovery · accessibility audit.

## Evidence

```
$ cargo fmt --all --check                      # clean, no output
$ cargo clippy --all-targets -- -D warnings    # clean
$ ./scripts/build-wasm.sh                      # 31 KB module
$ cargo test --all
    lc-core (lib)       53 passed; 0 failed
    lc-core (golden)     7 passed; 0 failed
    lc-catalog           12 passed; 0 failed
    darkroom-cli          4 passed; 0 failed
    lc-wasm               5 passed; 0 failed
$ ./scripts/smoke.sh
    === A. demo images + import  ... 3 added, 2 unsupported refused with reasons
    === B. library listing       ... json listing ok: [1, 2, 3]
    === C. viewer render         ... render sizes ok (480x320 and 200x133)
    === D. non-destructive       ... source checksum unchanged after editing
    === E. before/after + reset  ... before/after geometry ok
    === F. undo/redo + relaunch  ... state recovered from the catalog file alone
    === G. export                ... 85% jpeg 9.2 KB, 60% at 320px 4.6 KB, clobber refused
    === H. errors                ... missing file flagged, relinked, bad id/crop rejected
    === I. offline               ... no http client in any manifest
    ALL SMOKE CHECKS PASSED
```

Reproduce all of it with `./scripts/check.sh`.
