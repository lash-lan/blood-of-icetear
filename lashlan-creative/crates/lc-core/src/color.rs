//! Colour primitives for the Darkroom pipeline.
//!
//! The working space is **linear-light sRGB primaries, 32-bit float**. Every
//! adjustment in `pipeline` operates in that space. Encoding to and from the
//! sRGB transfer function happens only at the boundaries (decode / encode) and
//! inside adjustments that are defined perceptually (contrast).

/// sRGB electro-optical transfer function: encoded [0,1] -> linear light.
#[inline]
pub fn srgb_to_linear(v: f32) -> f32 {
    if v <= 0.040_448_237 {
        v / 12.92
    } else {
        ((v + 0.055) / 1.055).powf(2.4)
    }
}

/// Inverse of [`srgb_to_linear`]: linear light -> encoded [0,1].
#[inline]
pub fn linear_to_srgb(v: f32) -> f32 {
    if v <= 0.003_130_8 {
        v * 12.92
    } else {
        1.055 * v.powf(1.0 / 2.4) - 0.055
    }
}

/// Rec.709 / sRGB luminance weights, applied to **linear** RGB.
pub const LUMA_R: f32 = 0.212_639;
pub const LUMA_G: f32 = 0.715_169;
pub const LUMA_B: f32 = 0.072_192;

#[inline]
pub fn luminance(r: f32, g: f32, b: f32) -> f32 {
    LUMA_R * r + LUMA_G * g + LUMA_B * b
}

/// Clamp to [0,1]. Written out rather than using `f32::clamp` so a NaN sample
/// (which compares false against everything) falls through to 0.0 instead of
/// propagating through the pipeline.
#[inline]
#[allow(clippy::manual_clamp)]
pub fn clamp01(v: f32) -> f32 {
    if v > 1.0 {
        1.0
    } else if v > 0.0 {
        v
    } else {
        // Covers v <= 0.0 and NaN.
        0.0
    }
}

/// Smooth Hermite interpolation, used to build soft tonal masks.
#[inline]
pub fn smoothstep(edge0: f32, edge1: f32, x: f32) -> f32 {
    if (edge1 - edge0).abs() < f32::EPSILON {
        return if x < edge0 { 0.0 } else { 1.0 };
    }
    let t = clamp01((x - edge0) / (edge1 - edge0));
    t * t * (3.0 - 2.0 * t)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn srgb_roundtrip_is_stable() {
        for i in 0..=255 {
            let v = i as f32 / 255.0;
            let back = linear_to_srgb(srgb_to_linear(v));
            assert!((back - v).abs() < 1e-5, "{v} -> {back}");
        }
    }

    #[test]
    fn known_srgb_anchors() {
        assert!((srgb_to_linear(0.0)).abs() < 1e-9);
        assert!((srgb_to_linear(1.0) - 1.0).abs() < 1e-6);
        // Mid grey 0.5 encoded is ~0.2140 linear.
        assert!((srgb_to_linear(0.5) - 0.214_041).abs() < 1e-4);
    }

    #[test]
    fn clamp_tames_nan_rather_than_spreading_it() {
        assert_eq!(clamp01(f32::NAN), 0.0);
        assert_eq!(clamp01(-1.0), 0.0);
        assert_eq!(clamp01(2.0), 1.0);
        assert_eq!(clamp01(0.3), 0.3);
    }

    #[test]
    fn luma_weights_sum_to_one() {
        assert!((LUMA_R + LUMA_G + LUMA_B - 1.0).abs() < 1e-5);
    }
}
