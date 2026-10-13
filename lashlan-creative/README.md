# Lashlan Creative

A local-first creative software ecosystem. Your files stay yours, on your
machine, in formats you can open with something else tomorrow.

The first module is **Lashlan's Darkroom** — non-destructive photo editing.

> **Provisional names.** "Darkroom" and the other module names in
> `docs/VISION.md` have not been trademark-cleared. Treat them as working
> titles until they have.

## What exists today

A verified imaging engine, a durable catalog, and a working command-line
application. There is **no graphical interface yet** — see `docs/STATUS.md` for
exactly what is built, what is tested, and what is not.

```
crates/lc-core      colour, decoding, edit recipes, render pipeline, export
crates/lc-catalog   SQLite catalog: imports, edits, undo history, relinking
crates/darkroom-cli the `darkroom` command — the current user-facing surface
```

## Setup

You need Rust (1.80 or newer). Install it from <https://rustup.rs>.

```sh
cargo build --release          # builds target/release/darkroom
./scripts/check.sh             # fmt + clippy + every test + end-to-end smoke test
```

## Try it in two minutes

```sh
D=./target/release/darkroom
$D demo-images ~/darkroom-demo --count 3      # synthetic photos, no downloads
$D --catalog ~/darkroom.db import ~/darkroom-demo
$D --catalog ~/darkroom.db list
$D --catalog ~/darkroom.db adjust 1 --exposure 0.5 --shadows 0.4 --vibrance 0.3
$D --catalog ~/darkroom.db compare 1 -o ~/before-after.png
$D --catalog ~/darkroom.db export 1 -o ~/edited.jpg --quality 90
```

Your originals are never written to. Everything above runs offline.

See `docs/USER_GUIDE.md` for the full set of commands.

## Documentation

| File | What it is |
| --- | --- |
| `docs/VISION.md` | Principles and the module roadmap |
| `docs/PRD.md` | What Darkroom v0.1 must do, and its acceptance tests |
| `docs/ARCHITECTURE.md` | Components and how data moves between them |
| `docs/ADR/` | Decisions, with the alternatives that were rejected |
| `docs/STATUS.md` | Verified progress, with the evidence |
| `docs/FEATURE_MATRIX.md` | Planned vs implemented vs tested |
| `docs/TEST_PLAN.md` | Test strategy and acceptance criteria |
| `docs/SECURITY.md` | Threat model and reporting |
| `docs/LICENSING.md` | Dependency licences and distribution |
| `docs/RISKS.md` | Risk register |
| `docs/NEXT_SESSION.md` | Handoff for the next work session |
