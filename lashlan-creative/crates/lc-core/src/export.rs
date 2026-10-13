//! Export: rendered float buffer -> a new JPEG or PNG file.
//!
//! Originals are never touched. An existing destination is refused unless the
//! caller explicitly opts in to replacing it.

use crate::imagebuf::ImageBuf;
use crate::{CoreError, Result};
use std::path::Path;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ExportFormat {
    Jpeg,
    Png,
}

impl ExportFormat {
    /// Infer from the destination extension.
    pub fn from_path(path: &Path) -> Result<Self> {
        match path
            .extension()
            .and_then(|e| e.to_str())
            .map(|e| e.to_ascii_lowercase())
            .as_deref()
        {
            Some("jpg") | Some("jpeg") => Ok(ExportFormat::Jpeg),
            Some("png") => Ok(ExportFormat::Png),
            _ => Err(CoreError::UnsupportedFormat(path.to_path_buf())),
        }
    }
}

#[derive(Debug, Clone)]
pub struct ExportOptions {
    /// JPEG quality 1..=100. Ignored for PNG, which is lossless.
    pub quality: u8,
    /// Longest edge in pixels. `None` exports at full rendered size.
    pub max_dimension: Option<u32>,
    /// Replace an existing destination file.
    pub overwrite: bool,
}

impl Default for ExportOptions {
    fn default() -> Self {
        Self {
            quality: 90,
            max_dimension: None,
            overwrite: false,
        }
    }
}

/// Fit-inside resize that keeps aspect ratio. Resampling happens in **linear
/// light**, which is why this operates on the float buffer rather than on 8-bit
/// pixels.
pub fn fit_inside(src: &ImageBuf, max_dimension: u32) -> ImageBuf {
    let longest = src.width.max(src.height);
    if max_dimension == 0 || longest <= max_dimension {
        return src.clone();
    }
    let scale = max_dimension as f64 / longest as f64;
    let w = ((src.width as f64 * scale).round() as u32).max(1);
    let h = ((src.height as f64 * scale).round() as u32).max(1);

    let mut linear: image::ImageBuffer<image::Rgb<f32>, Vec<f32>> =
        image::ImageBuffer::from_raw(src.width, src.height, src.pixels.clone())
            .expect("buffer length always matches its dimensions");
    // Lanczos3 on negative-lobe filters can undershoot below zero; clamp after.
    let resized = image::imageops::resize(&linear, w, h, image::imageops::FilterType::Lanczos3);
    linear = resized;
    let mut out = ImageBuf::new(w, h);
    for (i, v) in linear.into_raw().into_iter().enumerate() {
        out.pixels[i] = v.max(0.0);
    }
    out
}

/// What was actually written. Reported back so a caller never has to guess
/// (and never prints pre-resize dimensions by mistake).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ExportResult {
    pub bytes: u64,
    pub width: u32,
    pub height: u32,
}

/// Write `buf` to `dest`.
pub fn export(buf: &ImageBuf, dest: &Path, opts: &ExportOptions) -> Result<ExportResult> {
    let format = ExportFormat::from_path(dest)?;
    if dest.exists() && !opts.overwrite {
        return Err(CoreError::RefusingOverwrite(dest.to_path_buf()));
    }
    let sized = match opts.max_dimension {
        Some(m) => fit_inside(buf, m),
        None => buf.clone(),
    };
    let rgb = sized.to_rgb8();

    if let Some(parent) = dest.parent() {
        if !parent.as_os_str().is_empty() {
            std::fs::create_dir_all(parent)?;
        }
    }

    // Write to a sibling temporary file, then rename, so an interrupted export
    // cannot leave a half-written image at the destination.
    let tmp = dest.with_extension(format!(
        "{}.lc-partial",
        dest.extension().and_then(|e| e.to_str()).unwrap_or("tmp")
    ));
    {
        let file = std::fs::File::create(&tmp).map_err(|source| CoreError::Write {
            path: tmp.clone(),
            source,
        })?;
        let mut w = std::io::BufWriter::new(file);
        match format {
            ExportFormat::Jpeg => {
                let q = opts.quality.clamp(1, 100);
                let mut enc = image::codecs::jpeg::JpegEncoder::new_with_quality(&mut w, q);
                enc.encode_image(&rgb).map_err(|source| CoreError::Encode {
                    path: dest.to_path_buf(),
                    source,
                })?;
            }
            ExportFormat::Png => {
                let enc = image::codecs::png::PngEncoder::new(&mut w);
                image::ImageEncoder::write_image(
                    enc,
                    rgb.as_raw(),
                    rgb.width(),
                    rgb.height(),
                    image::ExtendedColorType::Rgb8,
                )
                .map_err(|source| CoreError::Encode {
                    path: dest.to_path_buf(),
                    source,
                })?;
            }
        }
        use std::io::Write as _;
        w.flush().map_err(|source| CoreError::Write {
            path: tmp.clone(),
            source,
        })?;
    }
    std::fs::rename(&tmp, dest).map_err(|source| CoreError::Write {
        path: dest.to_path_buf(),
        source,
    })?;
    Ok(ExportResult {
        bytes: std::fs::metadata(dest).map(|m| m.len()).unwrap_or(0),
        width: sized.width,
        height: sized.height,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn flat(w: u32, h: u32) -> ImageBuf {
        let mut b = ImageBuf::new(w, h);
        for i in 0..b.pixels.len() {
            b.pixels[i] = 0.25;
        }
        b
    }

    #[test]
    fn fit_inside_keeps_aspect_and_never_upscales() {
        let src = flat(100, 50);
        let out = fit_inside(&src, 20);
        assert_eq!((out.width, out.height), (20, 10));
        let same = fit_inside(&src, 400);
        assert_eq!((same.width, same.height), (100, 50));
    }

    #[test]
    fn format_is_inferred_and_unknown_extensions_refused() {
        assert_eq!(
            ExportFormat::from_path(Path::new("a.JPEG")).unwrap(),
            ExportFormat::Jpeg
        );
        assert_eq!(
            ExportFormat::from_path(Path::new("a.png")).unwrap(),
            ExportFormat::Png
        );
        assert!(ExportFormat::from_path(Path::new("a.webp")).is_err());
    }

    #[test]
    fn export_writes_then_refuses_to_clobber() {
        let dir = std::env::temp_dir().join(format!("lc-export-{}", std::process::id()));
        std::fs::create_dir_all(&dir).unwrap();
        let dest = dir.join("out.png");
        let _ = std::fs::remove_file(&dest);

        let written = export(&flat(8, 8), &dest, &ExportOptions::default()).unwrap();
        assert!(written.bytes > 0);
        assert_eq!((written.width, written.height), (8, 8));
        assert!(dest.exists());

        let err = export(&flat(8, 8), &dest, &ExportOptions::default()).unwrap_err();
        assert!(matches!(err, CoreError::RefusingOverwrite(_)));

        let opts = ExportOptions {
            overwrite: true,
            ..Default::default()
        };
        assert!(export(&flat(8, 8), &dest, &opts).is_ok());
        assert!(
            !dir.join("out.png.lc-partial").exists(),
            "no temp file left behind"
        );
        std::fs::remove_dir_all(&dir).ok();
    }

    #[test]
    fn a_resized_export_reports_the_size_it_actually_wrote() {
        let dir = std::env::temp_dir().join(format!("lc-resized-{}", std::process::id()));
        std::fs::create_dir_all(&dir).unwrap();
        let dest = dir.join("small.png");
        let _ = std::fs::remove_file(&dest);
        let w = export(
            &flat(100, 50),
            &dest,
            &ExportOptions {
                max_dimension: Some(20),
                overwrite: true,
                ..Default::default()
            },
        )
        .unwrap();
        assert_eq!((w.width, w.height), (20, 10));
        let decoded = crate::imagebuf::decode(&dest).unwrap();
        assert_eq!((decoded.meta.width, decoded.meta.height), (20, 10));
        std::fs::remove_dir_all(&dir).ok();
    }

    #[test]
    fn exported_png_decodes_back_to_the_same_pixels() {
        let dir = std::env::temp_dir().join(format!("lc-roundtrip-{}", std::process::id()));
        std::fs::create_dir_all(&dir).unwrap();
        let dest = dir.join("rt.png");
        let _ = std::fs::remove_file(&dest);
        let src = flat(4, 4);
        export(&src, &dest, &ExportOptions::default()).unwrap();
        let decoded = crate::imagebuf::decode(&dest).unwrap();
        assert_eq!((decoded.meta.width, decoded.meta.height), (4, 4));
        let a = src.get(0, 0)[0];
        let b = decoded.image.get(0, 0)[0];
        assert!((a - b).abs() < 0.005, "{a} vs {b}");
        std::fs::remove_dir_all(&dir).ok();
    }
}
