# ADR-0002: Linear-light 32-bit float working space, with honest ICC limits

- **Status**: accepted (2026-10-13)

## Decision

1. Decode to **linear-light, sRGB primaries, 32-bit float**. All adjustments run
   there, except contrast, which is defined on display-encoded values because
   that is where the control means what a human expects.
2. Keep values **unclamped** through the pipeline; clamp only when encoding.
3. **Do not** convert from arbitrary ICC profiles in v0.1. Read the embedded
   profile, identify it, and tell the user when it is not sRGB.

## Why

- Exposure is a multiplication in linear light and nothing else; doing it in
  gamma space produces the muddy results amateur editors are known for.
- Float plus no intermediate clamping is what makes `+2 EV` then `-2 EV` return
  the original image (there is a test for exactly this).
- Resizing happens in linear light too, which is why `fit_inside` operates on
  the float buffer rather than on 8-bit pixels.
- Faking a colour transform is worse than refusing one. A Display-P3 file
  rendered as if it were sRGB looks plausible and is wrong; the user would never
  know. So it is reported as `UNMANAGED` with a warning on render and export.

## Consequences

- Wide-gamut files are usable but flagged. Proper conversion (LittleCMS via
  `lcms2`, or `moxcms`, both already in the dependency graph's reach) is a v0.2
  milestone with its own ADR.
- 16-bit input is decoded without truncation; the float buffer is the limit, not
  the source.
- Memory cost is 12 bytes per pixel (a 24MP image is ~290 MB). Tiling and a
  preview cache are required before large catalogs are comfortable — tracked in
  `docs/RISKS.md`.

## Measured behaviour (tests, not claims)

- sRGB encode/decode round-trips to within 1e-5 across all 256 8-bit values.
- White balance gains preserve the luminance of a neutral grey to within 1e-4.
- Saturation preserves luminance to within 1e-4.
- Mid-grey does not move under any contrast setting.
