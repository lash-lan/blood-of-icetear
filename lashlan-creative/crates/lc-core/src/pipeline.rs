//! The render pipeline: edit recipe + decoded source -> rendered buffer.
//!
//! Fixed order, documented so results are reproducible:
//!   1. crop  2. rotate  3. white balance  4. exposure
//!   5. highlights/shadows  6. contrast  7. saturation  8. vibrance
//!
//! Stages 3-8 run on linear-light f32. Only stage 6 (contrast) is defined on
//! display-encoded values, because that is where "contrast" means what a human
//! expects; it encodes, adjusts, and decodes internally.

// The per-channel loops index a fixed `[f32; 3]`; indexing keeps the channel
// order explicit and matches the maths being implemented.
#![allow(clippy::needless_range_loop)]

use crate::color::{clamp01, luminance, smoothstep};
use crate::fastmath;
use crate::imagebuf::ImageBuf;
use crate::recipe::{Adjustments, Crop, EditRecipe, Rotate};
use crate::{CoreError, Result};

/// Stops of gain applied by `highlights`/`shadows` at full deflection.
pub const HS_STOPS: f32 = 2.0;

/// Render `src` through `recipe`. `src` is never mutated.
pub fn render(src: &ImageBuf, recipe: &EditRecipe) -> Result<ImageBuf> {
    let mut buf = match recipe.crop {
        Some(c) => apply_crop(src, c)?,
        None => src.clone(),
    };
    buf = apply_rotate(&buf, recipe.rotate);
    apply_adjustments(&mut buf, &recipe.adjustments);
    Ok(buf)
}

pub fn apply_crop(src: &ImageBuf, c: Crop) -> Result<ImageBuf> {
    if c.width == 0 || c.height == 0 {
        return Err(CoreError::InvalidCrop(
            "width and height must be > 0".into(),
        ));
    }
    if c.x.saturating_add(c.width) > src.width || c.y.saturating_add(c.height) > src.height {
        return Err(CoreError::InvalidCrop(format!(
            "crop {}x{}+{}+{} falls outside the {}x{} image",
            c.width, c.height, c.x, c.y, src.width, src.height
        )));
    }
    let mut out = ImageBuf::new(c.width, c.height);
    for y in 0..c.height {
        for x in 0..c.width {
            out.set(x, y, src.get(c.x + x, c.y + y));
        }
    }
    Ok(out)
}

pub fn apply_rotate(src: &ImageBuf, r: Rotate) -> ImageBuf {
    let (w, h) = (src.width, src.height);
    match r {
        Rotate::None => src.clone(),
        Rotate::Cw180 => {
            let mut out = ImageBuf::new(w, h);
            for y in 0..h {
                for x in 0..w {
                    out.set(w - 1 - x, h - 1 - y, src.get(x, y));
                }
            }
            out
        }
        Rotate::Cw90 => {
            let mut out = ImageBuf::new(h, w);
            for y in 0..h {
                for x in 0..w {
                    out.set(h - 1 - y, x, src.get(x, y));
                }
            }
            out
        }
        Rotate::Cw270 => {
            let mut out = ImageBuf::new(h, w);
            for y in 0..h {
                for x in 0..w {
                    out.set(y, w - 1 - x, src.get(x, y));
                }
            }
            out
        }
    }
}

/// Luminance-preserving channel gains for the relative temperature/tint
/// controls. Returned as linear multipliers.
pub fn white_balance_gains(temperature: f32, tint: f32) -> [f32; 3] {
    let t = temperature.clamp(-1.0, 1.0);
    let g = tint.clamp(-1.0, 1.0);
    // Warm (+t) lifts red and drops blue; magenta (+g) drops green.
    let mut gains = [
        1.0 + 0.30 * t + 0.10 * g,
        1.0 - 0.25 * g,
        1.0 - 0.30 * t + 0.10 * g,
    ];
    // Normalise so a neutral grey keeps its luminance.
    let l = luminance(gains[0], gains[1], gains[2]);
    if l > 1e-6 {
        for v in &mut gains {
            *v /= l;
        }
    }
    gains
}

pub fn apply_adjustments(buf: &mut ImageBuf, a: &Adjustments) {
    let gains = white_balance_gains(a.temperature, a.tint);
    let wb_active = a.temperature != 0.0 || a.tint != 0.0;
    let exposure_gain = a.exposure_ev.clamp(-5.0, 5.0).exp2();
    let hi = a.highlights.clamp(-1.0, 1.0);
    let sh = a.shadows.clamp(-1.0, 1.0);
    let contrast_k = a.contrast.clamp(-1.0, 1.0).exp2();
    let sat = a.saturation.clamp(-1.0, 1.0);
    let vib = a.vibrance.clamp(-1.0, 1.0);

    for i in (0..buf.pixels.len()).step_by(3) {
        let mut p = [buf.pixels[i], buf.pixels[i + 1], buf.pixels[i + 2]];

        // 3. white balance
        if wb_active {
            for c in 0..3 {
                p[c] *= gains[c];
            }
        }

        // 4. exposure
        if exposure_gain != 1.0 {
            for c in 0..3 {
                p[c] *= exposure_gain;
            }
        }

        // 5. highlights / shadows, masked on display-referred luminance
        if hi != 0.0 || sh != 0.0 {
            let l = fastmath::encode(clamp01(luminance(p[0], p[1], p[2])));
            let mask_hi = smoothstep(0.45, 1.0, l);
            let mask_sh = 1.0 - smoothstep(0.0, 0.55, l);
            // Full deflection is two stops, applied through the tonal mask.
            let gain = (HS_STOPS * (hi * mask_hi + sh * mask_sh)).exp2();
            for c in 0..3 {
                p[c] *= gain;
            }
        }

        // 6. contrast, pivoted on mid grey in the display-encoded domain
        if contrast_k != 1.0 {
            for c in 0..3 {
                let e = fastmath::encode(clamp01(p[c]));
                p[c] = fastmath::decode(clamp01(0.5 + (e - 0.5) * contrast_k));
            }
        }

        // 7. saturation
        if sat != 0.0 {
            let l = luminance(p[0], p[1], p[2]);
            let k = 1.0 + sat;
            for c in 0..3 {
                p[c] = l + (p[c] - l) * k;
            }
        }

        // 8. vibrance: the same move, weighted towards already-muted colours
        if vib != 0.0 {
            let max = p[0].max(p[1]).max(p[2]);
            let min = p[0].min(p[1]).min(p[2]);
            let current = if max > 1e-6 { (max - min) / max } else { 0.0 };
            let weight = 1.0 - clamp01(current);
            let l = luminance(p[0], p[1], p[2]);
            let k = 1.0 + vib * weight;
            for c in 0..3 {
                p[c] = l + (p[c] - l) * k;
            }
        }

        buf.pixels[i] = p[0];
        buf.pixels[i + 1] = p[1];
        buf.pixels[i + 2] = p[2];
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::color::{linear_to_srgb, srgb_to_linear};
    use crate::recipe::Control;

    fn grey(v_srgb: f32) -> ImageBuf {
        let mut b = ImageBuf::new(1, 1);
        let l = srgb_to_linear(v_srgb);
        b.set(0, 0, [l, l, l]);
        b
    }

    fn encoded(b: &ImageBuf) -> [f32; 3] {
        let p = b.get(0, 0);
        [
            linear_to_srgb(clamp01(p[0])),
            linear_to_srgb(clamp01(p[1])),
            linear_to_srgb(clamp01(p[2])),
        ]
    }

    #[test]
    fn neutral_recipe_is_bit_identical() {
        let src = grey(0.5);
        let out = render(&src, &EditRecipe::default()).unwrap();
        assert_eq!(out.pixels, src.pixels);
    }

    #[test]
    fn one_stop_of_exposure_doubles_linear_light() {
        let src = grey(0.5);
        let mut r = EditRecipe::default();
        r.adjustments.exposure_ev = 1.0;
        let out = render(&src, &r).unwrap();
        assert!((out.get(0, 0)[0] / src.get(0, 0)[0] - 2.0).abs() < 1e-4);
    }

    #[test]
    fn exposure_is_reversible_in_float_without_clipping() {
        let src = grey(0.9);
        let mut up = EditRecipe::default();
        up.adjustments.exposure_ev = 2.0;
        let bright = render(&src, &up).unwrap();
        assert!(bright.get(0, 0)[0] > 1.0, "float headroom is kept");
        let mut down = EditRecipe::default();
        down.adjustments.exposure_ev = -2.0;
        let back = render(&bright, &down).unwrap();
        assert!((back.get(0, 0)[0] - src.get(0, 0)[0]).abs() < 1e-5);
    }

    #[test]
    fn contrast_pivots_on_mid_grey() {
        let src = grey(0.5);
        let mut r = EditRecipe::default();
        r.adjustments.contrast = 1.0;
        let out = render(&src, &r).unwrap();
        assert!(
            (encoded(&out)[0] - 0.5).abs() < 1e-4,
            "mid grey must not move"
        );

        let dark = grey(0.25);
        let out = render(&dark, &r).unwrap();
        assert!(encoded(&out)[0] < 0.25, "darks get darker");

        let light = grey(0.75);
        let out = render(&light, &r).unwrap();
        assert!(encoded(&out)[0] > 0.75, "lights get lighter");
    }

    #[test]
    fn negative_contrast_pulls_towards_mid_grey() {
        let mut r = EditRecipe::default();
        r.adjustments.contrast = -1.0;
        let out = render(&grey(0.9), &r).unwrap();
        let e = encoded(&out)[0];
        assert!(e < 0.9 && e > 0.5, "got {e}");
    }

    #[test]
    fn shadows_lift_darks_and_leave_highlights_alone() {
        let mut r = EditRecipe::default();
        r.adjustments.shadows = 1.0;
        let dark_before = encoded(&grey(0.1))[0];
        let dark_after = encoded(&render(&grey(0.1), &r).unwrap())[0];
        assert!(
            dark_after > dark_before + 0.05,
            "{dark_before} -> {dark_after}"
        );

        let bright_before = encoded(&grey(0.95))[0];
        let bright_after = encoded(&render(&grey(0.95), &r).unwrap())[0];
        assert!((bright_after - bright_before).abs() < 0.02);
    }

    #[test]
    fn highlights_pull_down_brights_and_leave_shadows_alone() {
        let mut r = EditRecipe::default();
        r.adjustments.highlights = -1.0;
        let bright_after = encoded(&render(&grey(0.95), &r).unwrap())[0];
        assert!(bright_after < 0.95 - 0.05, "got {bright_after}");

        let dark_before = encoded(&grey(0.05))[0];
        let dark_after = encoded(&render(&grey(0.05), &r).unwrap())[0];
        assert!((dark_after - dark_before).abs() < 0.02);
    }

    #[test]
    fn white_balance_preserves_grey_luminance() {
        let g = white_balance_gains(1.0, -0.5);
        assert!((luminance(g[0], g[1], g[2]) - 1.0).abs() < 1e-4);
    }

    #[test]
    fn warming_raises_red_over_blue() {
        let mut r = EditRecipe::default();
        r.adjustments.temperature = 1.0;
        let out = render(&grey(0.5), &r).unwrap();
        let p = out.get(0, 0);
        assert!(p[0] > p[2], "red {} should exceed blue {}", p[0], p[2]);
    }

    #[test]
    fn full_desaturation_yields_a_neutral_pixel() {
        let mut src = ImageBuf::new(1, 1);
        src.set(0, 0, [0.6, 0.2, 0.1]);
        let mut r = EditRecipe::default();
        r.adjustments.saturation = -1.0;
        let p = render(&src, &r).unwrap().get(0, 0);
        assert!(
            (p[0] - p[1]).abs() < 1e-5 && (p[1] - p[2]).abs() < 1e-5,
            "{p:?}"
        );
    }

    #[test]
    fn saturation_preserves_luminance() {
        let mut src = ImageBuf::new(1, 1);
        src.set(0, 0, [0.6, 0.2, 0.1]);
        let before = luminance(0.6, 0.2, 0.1);
        let mut r = EditRecipe::default();
        r.adjustments.saturation = 0.8;
        let p = render(&src, &r).unwrap().get(0, 0);
        assert!((luminance(p[0], p[1], p[2]) - before).abs() < 1e-4);
    }

    #[test]
    fn vibrance_moves_muted_colours_more_than_vivid_ones() {
        let delta = |px: [f32; 3]| {
            let mut src = ImageBuf::new(1, 1);
            src.set(0, 0, px);
            let mut r = EditRecipe::default();
            r.adjustments.vibrance = 1.0;
            let out = render(&src, &r).unwrap().get(0, 0);
            (0..3).map(|c| (out[c] - px[c]).abs()).sum::<f32>()
        };
        let muted = delta([0.50, 0.46, 0.44]);
        let vivid = delta([0.80, 0.02, 0.02]);
        assert!(
            muted > vivid,
            "muted {muted} should move more than vivid {vivid}"
        );
    }

    #[test]
    fn a_grey_pixel_is_immune_to_saturation_and_vibrance() {
        let mut r = EditRecipe::default();
        r.adjustments.saturation = 1.0;
        r.adjustments.vibrance = 1.0;
        let out = render(&grey(0.4), &r).unwrap();
        assert!((out.get(0, 0)[0] - grey(0.4).get(0, 0)[0]).abs() < 1e-6);
    }

    #[test]
    fn crop_outside_the_frame_is_refused() {
        let src = ImageBuf::new(10, 10);
        let mut r = EditRecipe::default();
        r.crop = Some(Crop {
            x: 5,
            y: 0,
            width: 10,
            height: 2,
        });
        assert!(matches!(render(&src, &r), Err(CoreError::InvalidCrop(_))));
    }

    #[test]
    fn zero_sized_crop_is_refused() {
        let src = ImageBuf::new(10, 10);
        let mut r = EditRecipe::default();
        r.crop = Some(Crop {
            x: 0,
            y: 0,
            width: 0,
            height: 5,
        });
        assert!(matches!(render(&src, &r), Err(CoreError::InvalidCrop(_))));
    }

    #[test]
    fn crop_then_rotate_gives_the_expected_geometry() {
        let mut src = ImageBuf::new(4, 2);
        for y in 0..2 {
            for x in 0..4 {
                let v = (x + 1) as f32 / 10.0;
                src.set(x, y, [v, v, v]);
            }
        }
        let mut r = EditRecipe::default();
        r.crop = Some(Crop {
            x: 1,
            y: 0,
            width: 3,
            height: 2,
        });
        r.rotate = Rotate::Cw90;
        let out = render(&src, &r).unwrap();
        assert_eq!((out.width, out.height), (2, 3));
    }

    #[test]
    fn four_quarter_turns_return_the_original() {
        let mut src = ImageBuf::new(3, 2);
        src.set(0, 0, [1.0, 0.0, 0.0]);
        let mut b = src.clone();
        for _ in 0..4 {
            b = apply_rotate(&b, Rotate::Cw90);
        }
        assert_eq!((b.width, b.height), (src.width, src.height));
        assert_eq!(b.pixels, src.pixels);
    }

    #[test]
    fn resetting_a_control_restores_the_neutral_render() {
        let src = grey(0.5);
        let mut r = EditRecipe::default();
        r.adjustments.exposure_ev = 1.5;
        assert_ne!(render(&src, &r).unwrap().pixels, src.pixels);
        r.reset(Control::Exposure);
        assert_eq!(render(&src, &r).unwrap().pixels, src.pixels);
    }
}
