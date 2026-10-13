# Security

## Threat model

Everything the software reads is **untrusted input**, including files the user
chose themselves: images, EXIF blocks, ICC profiles, catalog files and (later)
plugins and project archives. A malicious photograph is a realistic attack: it
arrives by email, it is opened by a parser written in C somewhere in the stack,
and it only has to be opened once.

| Asset | Threat | Mitigation today |
| --- | --- | --- |
| The user's original photographs | Overwritten or corrupted by the editor | Sources are opened read-only; editing is recipe-only; export refuses to write onto the original or to clobber any existing file without `--overwrite`; verified by checksum in the smoke test |
| The catalog | Corrupted by a crash mid-import | One transaction per file, WAL journaling, `synchronous=FULL`; a newer schema is refused rather than half-migrated |
| Partial exports | A crash leaves a truncated image that looks real | Exports are written to a temporary file and renamed into place |
| Memory safety while parsing | A crafted image causing memory corruption | Rust throughout; the ICC parser does bounds-checked slicing only and returns `Unreadable` rather than panicking on garbage (tested) |
| Path handling | An import wandering outside the chosen folder | Symlinks are not followed during import; paths are canonicalised before storage |
| Privacy | Hidden uploads or telemetry | No HTTP client exists in any manifest; the smoke test fails if one appears. Exports currently carry **no** metadata at all, so location data cannot leak through them |

## Not yet addressed

- Fuzzing of the image and ICC parsers (`cargo-fuzz`) before any public release.
- Sandboxing: there are no plugins or subprocesses yet. When there are, they get
  their own threat model and an ADR before a line is written.
- `image`'s own decoders are third-party code; a vulnerability review and a
  dependency-advisory check (`cargo-audit`) must run in CI once CI exists.
- No security review has been performed by anyone qualified. Nothing here is a
  certification.

## Reporting

There is no public release and no reporting address yet. Until there is, raise
problems directly with Lashlan.
