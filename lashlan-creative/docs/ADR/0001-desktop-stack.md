# ADR-0001: Rust core now, desktop shell deferred

- **Status**: accepted (2026-10-13), shell decision deliberately deferred
- **Context**: the directive proposes Rust + Tauri 2 + TypeScript/React as a
  baseline to *investigate*, not to force.

## Decision

Build the engine, catalog and a real command-line application in Rust now.
**Do not** pick the GUI toolkit yet.

## Why the core is Rust

- Memory safety matters more than usual here: every input (image, ICC profile,
  EXIF block, catalog file) is untrusted data fed to a parser.
- `image`, `kamadak-exif` and `rusqlite` are maintained, permissively licensed,
  and build with no system libraries beyond a C compiler.
- One codebase serves the CLI today and any shell later.

## Why the shell is deferred

The build environment for this session is a headless Linux container: no
display, no GTK/WebKit, no Windows. A GUI written here could be *compiled* at
best and never *run*, which fails this project's definition of done. Choosing a
toolkit we cannot execute would be a guess dressed as a decision.

## Alternatives considered

| Option | Why not (yet) |
| --- | --- |
| Tauri 2 + React | Still the leading candidate: small binaries, one web frontend, Rust backend already written. Needs a machine where it can actually be launched and profiled — particularly for zoom/pan responsiveness on large images, which is the real risk. |
| Qt/C++ | Strong imaging ergonomics, but a second language, a heavier build, and LGPL obligations that need legal review before commercial distribution. |
| egui / iced (pure Rust) | No webview dependency and trivially cross-platform, but weaker text input, accessibility and high-DPI story today. |
| Electron | Rejected: resource cost contradicts "performs on realistic consumer hardware". |

## Consequences

- v0.1 ships a documented CLI and library API as its surface, honestly labelled.
- The GUI decision is a gate, not a default: it gets its own ADR after a
  measured prototype (zoom/pan at 24MP, startup time, memory) on the target
  Windows machine.
- Nothing in `lc-core`/`lc-catalog` assumes a UI, so no work is wasted either way.
