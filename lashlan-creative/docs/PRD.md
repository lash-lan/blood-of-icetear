# Darkroom v0.1 — product requirements

## Who it is for

One photographer with a folder of photographs who wants to adjust them without
damaging the originals, and who does not want to rent their editor.

## In scope for v0.1

Reading **JPEG, PNG and TIFF**. RAW is explicitly out of scope and is refused on
import with a reason — it is a v0.2 milestone and must not be advertised sooner.

## User journeys and their acceptance tests

Each journey is exercised end to end by `scripts/smoke.sh`; the letters match
the `=== X.` steps printed by that script.

| # | Journey | Accepted when |
| --- | --- | --- |
| A | Choose and import a folder of photographs | Supported files are catalogued; unreadable and unsupported files are reported individually with a reason; nothing silently vanishes |
| B | Browse the library with file, dimensions, format, metadata | `list` (human and `--json`) shows real decoded dimensions, format, size, colour profile and missing state |
| C | View a photograph, fit-to-screen and full size | `render` writes the full-size image and a fit-to-screen version at the requested longest edge |
| D | Adjust exposure, contrast, highlights, shadows, temperature, tint, saturation, vibrance, crop, rotate | Each control changes the render in the documented direction; the source file's bytes are unchanged afterwards |
| E | Compare before and after; reset one control or all | `compare` writes a side-by-side; `reset --control X` changes only X |
| F | Undo/redo; quit, relaunch, recover the same state | Every command is a separate process; edit state is reconstructed from the catalog file alone |
| G | Export JPEG or PNG with size and quality | Export writes a new file; smaller/lower-quality exports really are smaller; an existing file is not clobbered without `--overwrite`; exporting onto the original is refused outright |
| H | Progress and meaningful errors | Import prints per-file progress; missing files are flagged and relinkable; bad ids, impossible crops and corrupt files produce a specific message and a non-zero exit code |
| I | Run entirely offline | No HTTP client in any manifest; every journey above runs with no network access |

## Explicit non-goals for v0.1

- RAW decoding, lens correction, histograms, clipping warnings (v0.2)
- Local/masked adjustments, healing, curves, HSL (v0.3)
- GPU acceleration, smart previews, plugins (v0.4)
- A graphical interface — v0.1's surface is the documented CLI and library API
- Writing EXIF into exports (exports currently carry no metadata at all, which
  is privacy-safe but also means orientation/date are not carried over)
- Arbitrary-angle straightening (only 90° steps)
- Converting from non-sRGB ICC profiles — those files are flagged, not guessed at
