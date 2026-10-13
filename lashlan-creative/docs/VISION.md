# Vision

## The problem

Creative software has drifted away from the people using it: subscription locks
on tools users already learned, project files that only one vendor can open,
uploads that happen without being asked for, and prices that assume a studio
budget.

## The principles

1. **Local-first.** Projects, catalogs and caches live on the user's disk. The
   software is fully usable with the network cable pulled out.
2. **Non-destructive by default.** Source files are opened read-only. An edit is
   a small, readable instruction document, never baked pixels.
3. **Portable formats.** Exports go to open formats. The project format is
   documented and versioned so other software — and future us — can read it.
4. **Honest licensing.** Core editing does not quietly become subscription-only.
5. **Privacy by default.** No telemetry, no hidden uploads. Any network call is
   opt-in, documented, and visible while it happens.
6. **Optional AI.** Manual workflows stay first-class. Generative features are
   clearly separated from deterministic editing and never enabled behind the
   user's back.
7. **Honest errors.** When something cannot be done, the software says so and
   says why. A control that cannot be implemented correctly is marked
   unavailable rather than faked.
8. **Accessible and fast enough.** Keyboard navigation, focus indicators,
   high-DPI, and measured performance budgets — not adjectives.

## Module roadmap (provisional)

Darkroom first. Nothing else starts until Darkroom's platform pieces have proven
themselves by being reused.

| Module | Area | State |
| --- | --- | --- |
| Darkroom | Photo catalog and non-destructive editing | **in progress** |
| Reality | Raster painting, retouching, compositing | not started |
| Scribe | Vector illustration and typography | not started |
| Finale | Nonlinear video editing | not started |
| Silence | Audio recording, restoration, mixing | not started |
| OutDesign | Multi-page layout and publishing | not started |
| Decoder | Transcoding and export jobs | not started |
| Tunnel | Digital asset management | not started |
| Darkfire | Optional generative AI, local inference where practical | not started |
| Straightline | PDF reading, annotation, later editing | not started |
| Others (Original, Reality Weaver, Stillness, Puppeteer, Drybrush, Essence, Matter, Sculptor, Stagebreaker, Deliberate, Before Causes) | see directive | not started |

The second module will be proposed only once the shared platform (catalog,
colour, job queue, preview cache, export service) has been genuinely factored
out and reused — not before.
