//! The Darkroom adjustment engine, compiled for a browser.
//!
//! This is the same `lc-core` pipeline the desktop build uses: identical
//! maths, identical linear-light working space. The browser decodes the
//! photograph (its own decoders are faster than anything we could ship) and
//! hands us the pixels; we adjust them and hand them back.
//!
//! Deliberately a plain C-style interface rather than a binding generator, so
//! the module has no JavaScript glue, no build-tool dependency and nothing to
//! go stale. The whole surface is five functions.
//!
//! Nothing here can reach the network or the filesystem: WebAssembly has no
//! such capability unless the page grants it, and this module asks for none.
//! A photograph adjusted here cannot leave the device.

use lc_core::imagebuf::ImageBuf;
use lc_core::recipe::Adjustments;

/// Reserve `len` bytes for the page to write pixels into.
///
/// # Safety
/// The caller must eventually pass the same pointer and length to [`dealloc`].
#[no_mangle]
pub extern "C" fn alloc(len: usize) -> *mut u8 {
    let mut buf = Vec::<u8>::with_capacity(len);
    let ptr = buf.as_mut_ptr();
    std::mem::forget(buf);
    ptr
}

/// Give back memory handed out by [`alloc`].
///
/// # Safety
/// `ptr` and `len` must be exactly what [`alloc`] returned and was given.
#[no_mangle]
pub unsafe extern "C" fn dealloc(ptr: *mut u8, len: usize) {
    if !ptr.is_null() && len > 0 {
        drop(Vec::from_raw_parts(ptr, len, len));
    }
}

/// Apply the adjustments to an RGBA buffer, in place.
///
/// `ptr` points at `width * height * 4` bytes of 8-bit sRGB RGBA, exactly as
/// a browser canvas provides. Alpha is carried through untouched.
///
/// # Safety
/// `ptr` must point at `width * height * 4` readable, writable bytes.
#[no_mangle]
#[allow(clippy::too_many_arguments)]
pub unsafe extern "C" fn render_rgba(
    ptr: *mut u8,
    width: u32,
    height: u32,
    exposure_ev: f32,
    contrast: f32,
    highlights: f32,
    shadows: f32,
    temperature: f32,
    tint: f32,
    saturation: f32,
    vibrance: f32,
) {
    let count = (width as usize) * (height as usize);
    if ptr.is_null() || count == 0 {
        return;
    }
    let rgba = std::slice::from_raw_parts_mut(ptr, count * 4);

    let adjustments = Adjustments {
        exposure_ev,
        contrast,
        highlights,
        shadows,
        temperature,
        tint,
        saturation,
        vibrance,
    };

    // Straight through the shared pipeline: decode the transfer function,
    // adjust in linear light, encode again.
    let mut buf = ImageBuf::new(width, height);
    for i in 0..count {
        let s = i * 4;
        let d = i * 3;
        buf.pixels[d] = lc_core::fastmath::from_u8(rgba[s]);
        buf.pixels[d + 1] = lc_core::fastmath::from_u8(rgba[s + 1]);
        buf.pixels[d + 2] = lc_core::fastmath::from_u8(rgba[s + 2]);
    }

    lc_core::pipeline::apply_adjustments(&mut buf, &adjustments);

    for i in 0..count {
        let s = i * 4;
        let d = i * 3;
        for c in 0..3 {
            rgba[s + c] = lc_core::fastmath::to_u8(buf.pixels[d + c]);
        }
        // rgba[s + 3] (alpha) is left exactly as it arrived.
    }
}

/// The engine version, so a page can tell which build it loaded.
#[no_mangle]
pub extern "C" fn engine_version() -> u32 {
    1
}

#[cfg(test)]
mod tests {
    use super::*;

    fn pixel(rgba: [u8; 4], a: Adjustments) -> [u8; 4] {
        let mut buf = rgba;
        unsafe {
            render_rgba(
                buf.as_mut_ptr(),
                1,
                1,
                a.exposure_ev,
                a.contrast,
                a.highlights,
                a.shadows,
                a.temperature,
                a.tint,
                a.saturation,
                a.vibrance,
            );
        }
        buf
    }

    #[test]
    fn neutral_adjustments_leave_a_pixel_alone() {
        let out = pixel([128, 64, 32, 200], Adjustments::default());
        assert_eq!(out, [128, 64, 32, 200]);
    }

    #[test]
    fn alpha_is_never_touched() {
        let mut a = Adjustments::default();
        a.exposure_ev = 2.0;
        a.saturation = -1.0;
        assert_eq!(pixel([10, 200, 90, 77], a)[3], 77);
    }

    #[test]
    fn one_stop_of_exposure_brightens() {
        let mut a = Adjustments::default();
        a.exposure_ev = 1.0;
        let out = pixel([100, 100, 100, 255], a);
        assert!(out[0] > 130, "got {out:?}");
    }

    #[test]
    fn full_desaturation_gives_a_grey_pixel() {
        let mut a = Adjustments::default();
        a.saturation = -1.0;
        let out = pixel([200, 50, 25, 255], a);
        assert!(
            out[0].abs_diff(out[1]) <= 1 && out[1].abs_diff(out[2]) <= 1,
            "got {out:?}"
        );
    }

    #[test]
    fn an_empty_buffer_is_handled_rather_than_crashing() {
        unsafe {
            render_rgba(
                std::ptr::null_mut(),
                0,
                0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
            )
        };
    }
}
