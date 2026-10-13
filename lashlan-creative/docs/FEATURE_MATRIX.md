# Feature matrix

**Tested** means an automated test or `scripts/smoke.sh` exercises it and would
fail if it broke. A feature that is implemented but untested is not finished.

## Darkroom v0.1

| Feature | Planned | Implemented | Tested | Notes |
| --- | --- | --- | --- | --- |
| Import a folder | v0.1 | yes | yes | flat and recursive; symlinks are not followed |
| Library listing with metadata | v0.1 | yes | yes | human and `--json` |
| Open/view with fit-to-screen and 100% | v0.1 | yes (as rendered files) | yes | zoom/pan is a UI concern; the engine renders at any longest edge |
| Exposure | v0.1 | yes | yes | stops, linear gain |
| Contrast | v0.1 | yes | yes | pivots on mid grey |
| Highlights | v0.1 | yes | yes | ±2 stops through a tonal mask |
| Shadows | v0.1 | yes | yes | ±2 stops through a tonal mask |
| Temperature | v0.1 | yes | yes | **relative**, not absolute Kelvin (needs RAW metadata) |
| Tint | v0.1 | yes | yes | relative |
| Saturation | v0.1 | yes | yes | luminance-preserving |
| Vibrance | v0.1 | yes | yes | weighted towards muted colours |
| Crop | v0.1 | yes | yes | source pixel rectangle, validated against the image |
| Rotate | v0.1 | yes (90° steps) | yes | arbitrary-angle straightening is **not** implemented |
| Before/after comparison | v0.1 | yes | yes | side-by-side image |
| Reset one control / all | v0.1 | yes | yes | |
| Undo / redo | v0.1 | yes | yes | persists across restarts |
| Edits survive quit and relaunch | v0.1 | yes | yes | |
| Export JPEG/PNG with size and quality | v0.1 | yes | yes | atomic write; refuses to clobber |
| Originals never modified | v0.1 | yes | yes | checksum-verified in the smoke test |
| Progress and meaningful errors | v0.1 | yes | yes | |
| Offline operation | v0.1 | yes | yes | |
| EXIF orientation respected | v0.1 | yes | yes (unit) | no orientation-tagged JPEG fixture yet — see TEST_PLAN |
| EXIF preserved in exports | v0.1 | **no** | — | exports carry no metadata at all; stated in the CLI output |
| ICC profile detection | v0.1 | yes | yes | |
| ICC conversion from non-sRGB | v0.2 | **no** | — | flagged as UNMANAGED with a warning, never guessed |
| RAW decoding | v0.2 | **no** | — | refused on import with a reason |
| Graphical interface | — | **no** | — | see ADR-0001 |
| Histogram, clipping warnings | v0.2 | no | — | |
| Batch export, presets, ratings, search | v0.2 | no | — | |
| Masks, healing, curves, HSL | v0.3 | no | — | |
| GPU acceleration, smart previews, plugins | v0.4 | no | — | |
| Installer, updater, crash recovery | v1.0 | no | — | |

## Shared platform

| Piece | Implemented | Tested | Notes |
| --- | --- | --- | --- |
| Colour module | yes | yes | reusable by any module |
| Versioned project/recipe schema | yes | yes | |
| Undo/history | yes | yes | |
| Export service | yes | yes | |
| Asset catalog with migrations and relinking | yes | yes | |
| Job queue with cancellation | no | — | needed before large imports feel good |
| Preview cache | no | — | |
| Plugin interface | no | — | |
| AI adapter | no | — | design only, in VISION |
| Logging, updater, crash reporting | no | — | |
