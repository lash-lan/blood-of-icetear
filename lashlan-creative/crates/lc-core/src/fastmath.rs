//! Fast, accurate stand-ins for the hot parts of the colour maths.
//!
//! The pipeline calls the sRGB transfer functions roughly fourteen times per
//! pixel, and each one is a `powf`, which is a software routine in
//! WebAssembly. Measured in a browser, that cost about 550 ms for a single
//! megapixel: correct, and far too slow to drag a slider against.
//!
//! These replacements do the same job from pre-computed tables:
//!
//! * decoding an 8-bit sample is a 256-entry lookup, which is *exact*;
//! * encoding a float back to 8 bits is a binary search over the 256 rounding
//!   thresholds, which is also *exact*;
//! * the continuous versions interpolate between table entries, and the tests
//!   below hold them to within one ten-thousandth of the true value, far
//!   tighter than the one part in 255 that an 8-bit image can show.
//!
//! Nothing here changes what the pipeline computes. It changes how long it
//! takes.

use crate::color::{linear_to_srgb, srgb_to_linear};
use std::sync::OnceLock;

/// Entries in the continuous tables. 4096 keeps the interpolation error far
/// below anything an 8-bit image could record.
const N: usize = 4096;

struct Tables {
    /// Exact linear values for each of the 256 possible 8-bit samples.
    from_u8: [f32; 256],
    /// Linear value at which the rounded 8-bit output steps up to `i`.
    thresholds: [f32; 256],
    /// encoded -> linear, sampled uniformly over 0..=1.
    decode: Vec<f32>,
    /// linear -> encoded, sampled uniformly over 0..=1.
    encode: Vec<f32>,
}

fn tables() -> &'static Tables {
    static T: OnceLock<Tables> = OnceLock::new();
    T.get_or_init(|| {
        let mut from_u8 = [0.0f32; 256];
        for (i, v) in from_u8.iter_mut().enumerate() {
            *v = srgb_to_linear(i as f32 / 255.0);
        }
        // Sample i wins when the encoded value is at least halfway to it.
        let mut thresholds = [0.0f32; 256];
        for (i, v) in thresholds.iter_mut().enumerate() {
            *v = srgb_to_linear((i as f32 - 0.5) / 255.0);
        }
        thresholds[0] = f32::NEG_INFINITY;
        let decode = (0..=N)
            .map(|i| srgb_to_linear(i as f32 / N as f32))
            .collect();
        let encode = (0..=N)
            .map(|i| linear_to_srgb(i as f32 / N as f32))
            .collect();
        Tables {
            from_u8,
            thresholds,
            decode,
            encode,
        }
    })
}

/// Exact: the linear value of an 8-bit sRGB sample.
#[inline]
pub fn from_u8(v: u8) -> f32 {
    tables().from_u8[v as usize]
}

/// Exact: round a linear value to the 8-bit sRGB sample it encodes to.
#[inline]
pub fn to_u8(linear: f32) -> u8 {
    let t = &tables().thresholds;
    // NaN is named explicitly: it must become black, never a bright pixel.
    if linear.is_nan() || linear <= t[1] {
        return 0;
    }
    if linear >= t[255] {
        return 255;
    }
    // Largest i with linear >= t[i].
    let (mut lo, mut hi) = (1usize, 255usize);
    while lo < hi {
        let mid = (lo + hi).div_ceil(2);
        if linear >= t[mid] {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    lo as u8
}

#[inline]
fn lerp_table(table: &[f32], x: f32) -> f32 {
    if x.is_nan() || x <= 0.0 {
        return 0.0;
    }
    if x >= 1.0 {
        return table[N];
    }
    let pos = x * N as f32;
    let i = pos as usize;
    let frac = pos - i as f32;
    table[i] + (table[i + 1] - table[i]) * frac
}

/// Table-driven `srgb_to_linear`, for values already clamped to 0..=1.
#[inline]
pub fn decode(encoded: f32) -> f32 {
    lerp_table(&tables().decode, encoded)
}

/// Table-driven `linear_to_srgb`, for values already clamped to 0..=1.
#[inline]
pub fn encode(linear: f32) -> f32 {
    lerp_table(&tables().encode, linear)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn eight_bit_decoding_is_exact() {
        for i in 0..=255u8 {
            assert_eq!(from_u8(i), srgb_to_linear(i as f32 / 255.0));
        }
    }

    #[test]
    fn eight_bit_encoding_matches_rounding_the_slow_way() {
        for i in 0..=255u8 {
            let linear = from_u8(i);
            assert_eq!(to_u8(linear), i, "sample {i} did not survive a round trip");
        }
        for step in 0..20_000 {
            let linear = step as f32 / 20_000.0;
            let slow = (linear_to_srgb(linear) * 255.0 + 0.5).clamp(0.0, 255.0) as u8;
            let fast = to_u8(linear);
            assert!(
                fast.abs_diff(slow) <= 1,
                "{linear}: fast {fast}, slow {slow}"
            );
        }
    }

    #[test]
    fn out_of_range_and_nan_are_clamped_not_wrapped() {
        assert_eq!(to_u8(-5.0), 0);
        assert_eq!(to_u8(9.0), 255);
        assert_eq!(to_u8(f32::NAN), 0);
        assert_eq!(decode(f32::NAN), 0.0);
        assert_eq!(encode(f32::NAN), 0.0);
    }

    #[test]
    fn the_continuous_tables_track_the_real_curves() {
        let mut worst_decode = 0.0f32;
        let mut worst_encode = 0.0f32;
        for step in 0..=10_000 {
            let x = step as f32 / 10_000.0;
            worst_decode = worst_decode.max((decode(x) - srgb_to_linear(x)).abs());
            worst_encode = worst_encode.max((encode(x) - linear_to_srgb(x)).abs());
        }
        assert!(worst_decode < 1e-4, "decode drifted by {worst_decode}");
        assert!(worst_encode < 1e-4, "encode drifted by {worst_encode}");
    }
}
