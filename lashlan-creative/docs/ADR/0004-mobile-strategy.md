# ADR-0004: the browser is the mobile strategy

- **Status**: accepted (2026-10-13) for the engine; the application shell
  remains open, as ADR-0001 left it.

## Context

The question put to the project was whether Darkroom could work on a phone,
and whether that is a place it could beat an incumbent whose mobile editor is
mature, free for basic use, and backed by a very large engineering team.

Copying that product on its own ground is not a strategy. The one thing it
structurally cannot offer is the thing this project already promises:
**no account, no upload, nothing leaving the device.** A mobile business built
on photographs living on somebody else's servers cannot credibly offer the
opposite.

## Decision

Compile the existing engine to WebAssembly and run it in the browser, on phone
and desktop alike, as the route to mobile. Do not start a native iOS or Android
application.

Reasons:

- The browser's own photograph decoders are faster than anything we would
  ship, and cost nothing to download.
- WebAssembly cannot reach the network or the filesystem unless the page hands
  it the capability, and this module asks for none. "Your photographs never
  leave the device" becomes a property of the architecture rather than a
  promise.
- One engine serves every platform. The maths that renders a photograph on a
  phone is the identical code the desktop build and the automated tests use.
- No app store sits between the work and the user, and no store takes a cut.

## What was built and measured

`crates/lc-wasm` exposes the engine through five plain C-style functions, so
there is no binding generator, no JavaScript build step and nothing to go
stale. The compiled module is **31 KB**.

Measured in a browser (`scripts/bench-wasm.sh`, page `web/bench.html`),
milliseconds for one full adjustment pass:

| Workload | This machine | Slowed 4x (phone estimate) |
| --- | --- | --- |
| 0.3 MP preview, one slider | 15 ms | 62 ms |
| 0.3 MP preview, every slider | 27 ms | 116 ms |
| 1 MP preview, every slider | 90 ms | 454 ms |
| 12 MP photograph, every slider | 1.1 s | 5.1 s |
| 24 MP photograph, every slider | 2.3 s | 9.7 s |

The slowed figures are an **estimate** produced by throttling the processor
four times, not a measurement on a handset. Nothing has run on a real phone.

Two optimisations were made along the way and are in the engine now: the sRGB
transfer functions became table lookups (exact for 8-bit samples) rather than
repeated `powf` calls, and the WebAssembly build enables `simd128`. Together
they made the engine about **seven times faster**, and every golden-image test
still passes, so the pictures themselves did not change.

## Consequences, stated plainly

A phone can run this engine today. It cannot yet run it *smoothly*: a slider
drag wants thirty passes a second, and the estimate above gives eight to
sixteen at preview size. The gap is real and the ways to close it are known:

1. Hand-written SIMD in the pixel loop, rather than relying on the compiler.
2. One fused pass over the pixels instead of a sequence of stages.
3. Rendering only the part of the picture actually on screen.
4. A smaller preview while a slider is moving, full preview when it is let go.
   This is what every serious editor does.

None of these are research. All of them are work. Until they are done, no
claim about smoothness may be made.

## What this does not decide

The desktop shell question from ADR-0001 stands. A browser-based application
could also serve the desktop, which would collapse two problems into one, but
that is a separate decision and needs its own measurement: a desktop editor
must handle folders of thousands of photographs, which a browser makes harder,
not easier.
