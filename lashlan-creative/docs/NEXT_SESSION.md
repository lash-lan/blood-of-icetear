# Handoff — next session

Read `docs/STATUS.md` first. Then run `./scripts/check.sh`; if it is not green,
fix that before anything else.

## Where the code lives, and why that is wrong

It is in `lashlan-creative/` inside the **personal-website** repository, on
branch `ccr-8d5e72f5-pvh2sa`. That is a holding pen, not a home. The session
that wrote it could not create a repository: the GitHub credentials available
returned `403 Resource not accessible by integration`.

It sits there safely — nothing in it is read by the Astro website build, and the
branch is not the one Cloudflare deploys — but it must be moved.

**Task 1 (Lashlan, five minutes).** Create an empty private repository on GitHub
called `lashlan-creative`, then:

```sh
git clone <the new empty repo> lashlan-creative-new
cd lashlan-creative-new
# copy the lashlan-creative/ folder contents from the website repo branch in here
git add -A && git commit -m "Import Darkroom v0.1 engine, catalog and CLI"
git push
```

Then delete the `lashlan-creative/` folder from the website branch so the two
projects stop sharing a repository.

## Run the benchmark on your actual phone first

Five minutes, and it changes what gets built next. On the Windows laptop, in
the `lashlan-creative` folder:

```sh
./scripts/build-wasm.sh
./scripts/bench-wasm.sh
```

It prints an address. Open that address on your phone, on the same wifi, and
send back the numbers. Everything written about mobile so far rests on an
estimate made by slowing a desktop processor four times. One real handset
replaces all of it with fact.

## The next implementation step, in order of value

**1. Decide the shell (ADR-0001).** This is the gate. Build a throwaway Tauri 2
prototype on the Windows machine that does one thing: open a 24-megapixel JPEG
and let you zoom and pan it smoothly. Measure startup time, memory, and frame
pacing while panning. If it is comfortable, write ADR-0004 accepting Tauri and
start the real shell on top of `lc-core`/`lc-catalog`, which are ready for it.
If it is not, the ADR records why and the next candidate is tried. Do not start
the real UI before this measurement exists.

**2. Tiled rendering and a preview cache.** Risk #1 in the register. The current
pipeline renders whole images into one float buffer: 290 MB for a 24MP
photograph. Interactive editing needs a downscaled preview to adjust against and
a full render only on export. This is the single biggest thing standing between
the engine and feeling like an editor.

**3. Background jobs with cancellation.** Import and export must stop blocking
the caller before any UI exists, or the UI will be built around a blocking API
and have to be unpicked.

Only after those three: ICC conversion, then RAW (v0.2), which needs its own
licence decision first — see `docs/LICENSING.md`.

## Rules that must not quietly lapse

- Nothing is DONE in `docs/STATUS.md` without a command whose output proves it.
- `./scripts/check.sh` passes before every commit.
- A control that cannot be implemented correctly is marked unavailable, not faked.
- Golden fixtures are re-blessed only after reading the diff.
- No performance adjective ships without a benchmark behind it.

## Open questions for Lashlan

1. **Licence and commercial model.** The crates say `MIT OR Apache-2.0` but no
   LICENSE file exists. This has to be settled before any public release, and it
   constrains what can be linked (see `docs/LICENSING.md`).
2. **First-class operating system.** The directive says ship and validate one
   OS first. The Windows laptop is the obvious choice; confirm it.
3. **RAW scope for v0.2.** "RAW support" is not a feature, it is a decade.
   Which cameras, specifically, and can you supply test files for them?
