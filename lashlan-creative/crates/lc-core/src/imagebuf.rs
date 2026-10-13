//! Decoding, orientation, and the float working buffer.

#[cfg(feature = "files")]
use crate::color::srgb_to_linear;
#[cfg(feature = "files")]
use crate::icc::{self, IccStatus};
#[cfg(feature = "files")]
use crate::{CoreError, Result};
#[cfg(feature = "files")]
use std::fs::File;
#[cfg(feature = "files")]
use std::io::BufReader;
use std::path::Path;
#[cfg(feature = "files")]
use std::path::PathBuf;

/// Linear-light sRGB-primaries RGB buffer, 32-bit float per channel.
/// Values may legitimately exceed 1.0 mid-pipeline; clipping happens on encode.
#[derive(Debug, Clone)]
pub struct ImageBuf {
    pub width: u32,
    pub height: u32,
    /// `width * height * 3` samples, row-major, RGB interleaved.
    pub pixels: Vec<f32>,
}

impl ImageBuf {
    pub fn new(width: u32, height: u32) -> Self {
        Self {
            width,
            height,
            pixels: vec![0.0; (width as usize) * (height as usize) * 3],
        }
    }

    #[inline]
    pub fn get(&self, x: u32, y: u32) -> [f32; 3] {
        let i = ((y as usize) * (self.width as usize) + x as usize) * 3;
        [self.pixels[i], self.pixels[i + 1], self.pixels[i + 2]]
    }

    #[inline]
    pub fn set(&mut self, x: u32, y: u32, px: [f32; 3]) {
        let i = ((y as usize) * (self.width as usize) + x as usize) * 3;
        self.pixels[i] = px[0];
        self.pixels[i + 1] = px[1];
        self.pixels[i + 2] = px[2];
    }

    /// Encode to 8-bit sRGB for display or export.
    #[cfg(feature = "files")]
    pub fn to_rgb8(&self) -> image::RgbImage {
        let mut out = image::RgbImage::new(self.width, self.height);
        for (i, px) in out.pixels_mut().enumerate() {
            let s = i * 3;
            for c in 0..3 {
                px[c] = crate::fastmath::to_u8(self.pixels[s + c]);
            }
        }
        out
    }
}

/// EXIF orientation, 1..=8 as defined by the EXIF specification.
#[cfg(feature = "files")]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Orientation(pub u16);

#[cfg(feature = "files")]
impl Default for Orientation {
    fn default() -> Self {
        Orientation(1)
    }
}

#[cfg(feature = "files")]
#[derive(Debug, Clone)]
pub struct ImageMeta {
    pub path: PathBuf,
    /// Dimensions **after** EXIF orientation is applied.
    pub width: u32,
    pub height: u32,
    pub format: String,
    pub bytes: u64,
    pub orientation: Orientation,
    pub icc: IccStatus,
    pub bit_depth: u16,
}

#[cfg(feature = "files")]
pub struct Decoded {
    pub image: ImageBuf,
    pub meta: ImageMeta,
}

/// Formats accepted by v0.1. RAW is **not** in this list and is not pretended.
pub const SUPPORTED_EXTENSIONS: &[&str] = &["jpg", "jpeg", "png", "tif", "tiff"];

pub fn is_supported_extension(path: &Path) -> bool {
    path.extension()
        .and_then(|e| e.to_str())
        .map(|e| SUPPORTED_EXTENSIONS.contains(&e.to_ascii_lowercase().as_str()))
        .unwrap_or(false)
}

#[cfg(feature = "files")]
/// Read EXIF orientation without decoding pixels. Any failure means "no EXIF",
/// which is a normal condition, not an error.
pub fn read_orientation(path: &Path) -> Orientation {
    let Ok(file) = File::open(path) else {
        return Orientation::default();
    };
    let mut reader = BufReader::new(file);
    let Ok(exif) = exif::Reader::new().read_from_container(&mut reader) else {
        return Orientation::default();
    };
    exif.get_field(exif::Tag::Orientation, exif::In::PRIMARY)
        .and_then(|f| f.value.get_uint(0))
        .filter(|v| (1..=8).contains(v))
        .map(|v| Orientation(v as u16))
        .unwrap_or_default()
}

/// Decode a file into the linear float working buffer, applying EXIF
/// orientation. The source file is opened read-only and never written.
#[cfg(feature = "files")]
pub fn decode(path: &Path) -> Result<Decoded> {
    if !path.exists() {
        return Err(CoreError::NotFound(path.to_path_buf()));
    }
    let bytes = std::fs::metadata(path).map(|m| m.len()).unwrap_or(0);

    let reader = image::ImageReader::open(path)?
        .with_guessed_format()
        .map_err(|_| CoreError::UnsupportedFormat(path.to_path_buf()))?;
    let format = reader
        .format()
        .ok_or_else(|| CoreError::UnsupportedFormat(path.to_path_buf()))?;
    let format_name = format!("{format:?}").to_ascii_uppercase();

    let mut decoder = reader.into_decoder().map_err(|source| CoreError::Decode {
        path: path.to_path_buf(),
        source,
    })?;
    let icc_bytes = image::ImageDecoder::icc_profile(&mut decoder).unwrap_or(None);
    let icc = icc::inspect(icc_bytes.as_deref());
    let color_type = image::ImageDecoder::color_type(&decoder);
    let bit_depth = match color_type {
        image::ColorType::Rgb16
        | image::ColorType::Rgba16
        | image::ColorType::L16
        | image::ColorType::La16 => 16,
        image::ColorType::Rgb32F | image::ColorType::Rgba32F => 32,
        _ => 8,
    };

    let dynamic =
        image::DynamicImage::from_decoder(decoder).map_err(|source| CoreError::Decode {
            path: path.to_path_buf(),
            source,
        })?;

    let rgb = dynamic.to_rgb32f();
    let (w, h) = (rgb.width(), rgb.height());
    let mut buf = ImageBuf::new(w, h);
    for (i, px) in rgb.pixels().enumerate() {
        let s = i * 3;
        // `to_rgb32f` rescales sample values to 0..1 without a transfer
        // function, so the data is still sRGB-encoded here.
        buf.pixels[s] = srgb_to_linear(px[0]);
        buf.pixels[s + 1] = srgb_to_linear(px[1]);
        buf.pixels[s + 2] = srgb_to_linear(px[2]);
    }

    let orientation = read_orientation(path);
    let buf = apply_orientation(&buf, orientation);

    Ok(Decoded {
        meta: ImageMeta {
            path: path.to_path_buf(),
            width: buf.width,
            height: buf.height,
            format: format_name,
            bytes,
            orientation,
            icc,
            bit_depth,
        },
        image: buf,
    })
}

/// Apply one of the eight EXIF orientations, producing an upright image.
#[cfg(feature = "files")]
pub fn apply_orientation(src: &ImageBuf, o: Orientation) -> ImageBuf {
    if o.0 == 1 {
        return src.clone();
    }
    let (w, h) = (src.width, src.height);
    let transposed = matches!(o.0, 5..=8);
    let (ow, oh) = if transposed { (h, w) } else { (w, h) };
    let mut out = ImageBuf::new(ow, oh);
    for y in 0..h {
        for x in 0..w {
            let px = src.get(x, y);
            let (nx, ny) = match o.0 {
                2 => (w - 1 - x, y),
                3 => (w - 1 - x, h - 1 - y),
                4 => (x, h - 1 - y),
                5 => (y, x),
                6 => (h - 1 - y, x),
                7 => (h - 1 - y, w - 1 - x),
                8 => (y, w - 1 - x),
                _ => (x, y),
            };
            out.set(nx, ny, px);
        }
    }
    out
}

#[cfg(all(test, feature = "files"))]
mod tests {
    use super::*;

    fn ramp(w: u32, h: u32) -> ImageBuf {
        let mut b = ImageBuf::new(w, h);
        for y in 0..h {
            for x in 0..w {
                let v = (x + y * w) as f32;
                b.set(x, y, [v, v, v]);
            }
        }
        b
    }

    #[test]
    fn orientation_1_is_identity() {
        let b = ramp(3, 2);
        let o = apply_orientation(&b, Orientation(1));
        assert_eq!(o.pixels, b.pixels);
    }

    #[test]
    fn orientation_6_transposes_dimensions() {
        let b = ramp(3, 2);
        let o = apply_orientation(&b, Orientation(6));
        assert_eq!((o.width, o.height), (2, 3));
    }

    #[test]
    fn orientation_3_is_a_180_turn() {
        let b = ramp(3, 2);
        let o = apply_orientation(&b, Orientation(3));
        assert_eq!(o.get(0, 0), b.get(2, 1));
        assert_eq!(o.get(2, 1), b.get(0, 0));
    }

    #[test]
    fn every_orientation_preserves_the_pixel_count() {
        let b = ramp(4, 3);
        for o in 1..=8u16 {
            let out = apply_orientation(&b, Orientation(o));
            assert_eq!(out.pixels.len(), b.pixels.len(), "orientation {o}");
            assert_eq!(out.width * out.height, b.width * b.height);
        }
    }

    #[test]
    fn extension_gate_rejects_raw_rather_than_pretending() {
        assert!(is_supported_extension(Path::new("a.JPG")));
        assert!(is_supported_extension(Path::new("a.tiff")));
        assert!(!is_supported_extension(Path::new("a.cr2")));
        assert!(!is_supported_extension(Path::new("a.arw")));
        assert!(!is_supported_extension(Path::new("noext")));
    }

    #[test]
    fn encode_clamps_without_wrapping() {
        let mut b = ImageBuf::new(1, 1);
        b.set(0, 0, [-5.0, 0.5, 9.0]);
        let px = b.to_rgb8().get_pixel(0, 0).0;
        assert_eq!(px[0], 0);
        assert_eq!(px[2], 255);
    }
}
