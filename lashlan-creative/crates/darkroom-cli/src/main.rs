//! `darkroom` — the command-line surface of Lashlan's Darkroom v0.1.
//!
//! This is a real, documented interface over `lc-core` and `lc-catalog`, not a
//! demo: every user journey in docs/PRD.md can be completed with it, offline.
//! The desktop UI, when it arrives, drives exactly the same library calls.

use anyhow::{bail, Context, Result};
use clap::{Parser, Subcommand};
use lc_catalog::Catalog;
use lc_core::{Control, Crop, EditRecipe, ExportOptions, ImageBuf, Rotate};
use std::path::{Path, PathBuf};

#[derive(Parser)]
#[command(
    name = "darkroom",
    version,
    about = "Lashlan's Darkroom — non-destructive photo editing. Runs entirely offline.",
    long_about = "Lashlan's Darkroom v0.1.\n\n\
                  Reads JPEG, PNG and TIFF. RAW files are NOT supported yet and \
                  are refused on import rather than half-handled.\n\
                  Originals are opened read-only and never written to."
)]
struct Cli {
    /// Catalog file (created if missing). Accepted before or after the command.
    #[arg(long, short = 'c', default_value = "darkroom.db", global = true)]
    catalog: PathBuf,

    #[command(subcommand)]
    command: Command,
}

#[derive(Subcommand)]
enum Command {
    /// Create a catalog, or report on an existing one.
    Init {},
    /// Import a folder of photographs.
    Import {
        folder: PathBuf,
        /// Also walk subfolders.
        #[arg(long)]
        recursive: bool,
    },
    /// List catalogued photographs.
    List {
        /// Machine-readable output.
        #[arg(long)]
        json: bool,
    },
    /// Show everything known about one photograph, including its edits.
    Info { id: i64 },
    /// Change one or more adjustments. Omitted controls are left alone.
    Adjust {
        id: i64,
        /// Exposure in stops, -5..5.
        #[arg(long, allow_negative_numbers = true)]
        exposure: Option<f32>,
        #[arg(long, allow_negative_numbers = true)]
        contrast: Option<f32>,
        #[arg(long, allow_negative_numbers = true)]
        highlights: Option<f32>,
        #[arg(long, allow_negative_numbers = true)]
        shadows: Option<f32>,
        #[arg(long, allow_negative_numbers = true)]
        temperature: Option<f32>,
        #[arg(long, allow_negative_numbers = true)]
        tint: Option<f32>,
        #[arg(long, allow_negative_numbers = true)]
        saturation: Option<f32>,
        #[arg(long, allow_negative_numbers = true)]
        vibrance: Option<f32>,
        /// Crop as X,Y,WIDTHxHEIGHT in source pixels, e.g. 10,20,800x600.
        #[arg(long)]
        crop: Option<String>,
        /// Clockwise rotation: 0, 90, 180 or 270.
        #[arg(long)]
        rotate: Option<String>,
    },
    /// Reset one control, or every control.
    Reset {
        id: i64,
        /// Control name, e.g. exposure. Omit with --all.
        #[arg(long)]
        control: Option<String>,
        #[arg(long)]
        all: bool,
    },
    /// Step back one edit.
    Undo { id: i64 },
    /// Step forward one edit.
    Redo { id: i64 },
    /// Show the undo history and where you are in it.
    History { id: i64 },
    /// Render a preview to a PNG (the viewer's output, written to a file).
    Render {
        id: i64,
        #[arg(long, short = 'o')]
        out: PathBuf,
        /// Longest edge in pixels.
        #[arg(long)]
        max_dim: Option<u32>,
        /// Render the untouched original instead of the edited version.
        #[arg(long)]
        before: bool,
        #[arg(long)]
        overwrite: bool,
    },
    /// Write a before-and-after comparison image, original on the left.
    Compare {
        id: i64,
        #[arg(long, short = 'o')]
        out: PathBuf,
        #[arg(long)]
        max_dim: Option<u32>,
        #[arg(long)]
        overwrite: bool,
    },
    /// Export the edited photograph as a new JPEG or PNG.
    Export {
        id: i64,
        #[arg(long, short = 'o')]
        out: PathBuf,
        /// JPEG quality 1..100 (ignored for PNG).
        #[arg(long, default_value_t = 90)]
        quality: u8,
        #[arg(long)]
        max_dim: Option<u32>,
        #[arg(long)]
        overwrite: bool,
    },
    /// Check every catalogued file is still where it was.
    Verify {},
    /// Point a record at a file that has moved, keeping its edits.
    Relink { id: i64, path: PathBuf },
    /// Write synthetic test images into a folder (no third-party fixtures).
    DemoImages {
        folder: PathBuf,
        #[arg(long, default_value_t = 3)]
        count: u32,
        #[arg(long, default_value_t = 640)]
        width: u32,
        #[arg(long, default_value_t = 426)]
        height: u32,
    },
}

fn main() {
    if let Err(e) = run() {
        // One honest line, then the chain of causes.
        eprintln!("darkroom: {e}");
        for cause in e.chain().skip(1) {
            eprintln!("  caused by: {cause}");
        }
        std::process::exit(1);
    }
}

fn parse_crop(s: &str) -> Result<Crop> {
    let (origin, size) = s
        .rsplit_once(',')
        .with_context(|| format!("crop must look like X,Y,WIDTHxHEIGHT — got {s:?}"))?;
    let (x, y) = origin
        .split_once(',')
        .with_context(|| format!("crop must look like X,Y,WIDTHxHEIGHT — got {s:?}"))?;
    let (w, h) = size
        .split_once('x')
        .with_context(|| format!("crop size must look like WIDTHxHEIGHT — got {size:?}"))?;
    Ok(Crop {
        x: x.trim().parse().context("crop X")?,
        y: y.trim().parse().context("crop Y")?,
        width: w.trim().parse().context("crop width")?,
        height: h.trim().parse().context("crop height")?,
    })
}

fn open(path: &Path) -> Result<Catalog> {
    Catalog::open(path).with_context(|| format!("opening catalog {}", path.display()))
}

/// Decode the source for a catalogued image, with a useful message when the
/// file has gone missing rather than a raw io error.
fn decode_for(catalog: &Catalog, id: i64) -> Result<lc_core::imagebuf::Decoded> {
    let rec = catalog.get(id)?;
    if !rec.path.exists() {
        bail!(
            "{} is no longer at {} — run `darkroom relink {} <new path>` to point at it again \
             (your edits are safe)",
            rec.filename,
            rec.path.display(),
            id
        );
    }
    Ok(lc_core::decode(&rec.path)?)
}

fn run() -> Result<()> {
    let cli = Cli::parse();
    let catalog = cli.catalog.clone();
    match cli.command {
        Command::Init {} => {
            let c = open(&catalog)?;
            println!(
                "catalog: {}\nschema version: {}\nphotographs: {}",
                c.path().display(),
                c.schema_version()?,
                c.count()?
            );
        }

        Command::Import { folder, recursive } => {
            let mut c = open(&catalog)?;
            let report =
                lc_catalog::import::import_folder(&mut c, &folder, recursive, |i, n, p| {
                    println!(
                        "[{i}/{n}] {}",
                        p.file_name()
                            .map(|f| f.to_string_lossy().to_string())
                            .unwrap_or_default()
                    );
                })?;
            println!("\n{}", report.summary());
            for (id, path) in &report.added {
                println!("  added #{id} {}", path.display());
            }
            for (path, why) in &report.unsupported {
                println!("  skipped {} — {why}", path.display());
            }
            for (path, why) in &report.failed {
                println!("  FAILED  {} — {why}", path.display());
            }
            if report.considered() == 0 {
                println!("  (nothing in that folder)");
            }
        }

        Command::List { json } => {
            let c = open(&catalog)?;
            let rows = c.list()?;
            if json {
                let arr: Vec<_> = rows
                    .iter()
                    .map(|r| {
                        serde_json::json!({
                            "id": r.id, "path": r.path, "filename": r.filename,
                            "width": r.width, "height": r.height, "format": r.format,
                            "bytes": r.bytes, "orientation": r.orientation,
                            "icc": r.icc, "bit_depth": r.bit_depth,
                            "imported_at": r.imported_at, "missing": r.missing,
                        })
                    })
                    .collect();
                println!("{}", serde_json::to_string_pretty(&arr)?);
            } else if rows.is_empty() {
                println!("the catalog is empty — try `darkroom import <folder>`");
            } else {
                println!(
                    "{:>4}  {:<28} {:>11} {:<6} {:>9}  state",
                    "id", "file", "pixels", "fmt", "size"
                );
                for r in rows {
                    println!(
                        "{:>4}  {:<28} {:>11} {:<6} {:>9}  {}",
                        r.id,
                        truncate(&r.filename, 28),
                        format!("{}x{}", r.width, r.height),
                        r.format,
                        human_bytes(r.bytes),
                        if r.missing { "MISSING" } else { "ok" }
                    );
                }
            }
        }

        Command::Info { id } => {
            let c = open(&catalog)?;
            let r = c.get(id)?;
            let recipe = c.recipe(id)?;
            let h = c.history(id)?;
            println!("#{}  {}", r.id, r.filename);
            println!("path          {}", r.path.display());
            println!("pixels        {}x{} ({})", r.width, r.height, r.format);
            println!("file size     {}", human_bytes(r.bytes));
            println!("bit depth     {} bits per channel", r.bit_depth);
            println!("exif rotate   orientation tag {}", r.orientation);
            println!("colour        {}", r.icc);
            println!("imported      {}", r.imported_at);
            println!(
                "on disk       {}",
                if r.missing { "MISSING" } else { "present" }
            );
            println!(
                "history       {} state(s), at #{} ({})",
                h.len(),
                h.cursor(),
                h.current_label()
            );
            println!(
                "edits         {}",
                if recipe.is_neutral() {
                    "none (as imported)"
                } else {
                    ""
                }
            );
            if !recipe.is_neutral() {
                println!("{}", recipe.to_json());
            }
        }

        Command::Adjust {
            id,
            exposure,
            contrast,
            highlights,
            shadows,
            temperature,
            tint,
            saturation,
            vibrance,
            crop,
            rotate,
        } => {
            let mut c = open(&catalog)?;
            let mut r = c.recipe(id)?;
            let mut changed: Vec<String> = Vec::new();
            macro_rules! set {
                ($opt:expr, $field:ident, $name:literal) => {
                    if let Some(v) = $opt {
                        r.adjustments.$field = v;
                        changed.push(format!("{}={}", $name, v));
                    }
                };
            }
            set!(exposure, exposure_ev, "exposure");
            set!(contrast, contrast, "contrast");
            set!(highlights, highlights, "highlights");
            set!(shadows, shadows, "shadows");
            set!(temperature, temperature, "temperature");
            set!(tint, tint, "tint");
            set!(saturation, saturation, "saturation");
            set!(vibrance, vibrance, "vibrance");
            if let Some(spec) = crop {
                let crop = parse_crop(&spec)?;
                // Validate against the real image before storing it.
                let decoded = decode_for(&c, id)?;
                lc_core::pipeline::apply_crop(&decoded.image, crop)?;
                r.crop = Some(crop);
                changed.push(format!("crop={}", spec));
            }
            if let Some(spec) = rotate {
                let rot = Rotate::parse(&spec)
                    .with_context(|| format!("rotate must be 0, 90, 180 or 270 — got {spec:?}"))?;
                r.rotate = rot;
                changed.push(format!("rotate={}", rot.degrees()));
            }
            if changed.is_empty() {
                bail!("no adjustments given — see `darkroom adjust --help`");
            }
            let label = changed.join(", ");
            c.set_recipe(id, r, &label)?;
            println!("#{id}: {label}");
        }

        Command::Reset { id, control, all } => {
            let mut c = open(&catalog)?;
            let mut r = c.recipe(id)?;
            let label = if all {
                r.reset_all();
                "reset everything".to_string()
            } else {
                let name = control.context(
                    "say which control to reset, e.g. --control exposure, or pass --all",
                )?;
                let ctl = Control::parse(&name).with_context(|| {
                    format!(
                        "unknown control {name:?} — one of: {}",
                        Control::ALL
                            .iter()
                            .map(|c| c.name())
                            .collect::<Vec<_>>()
                            .join(", ")
                    )
                })?;
                r.reset(ctl);
                format!("reset {}", ctl.name())
            };
            c.set_recipe(id, r, &label)?;
            println!("#{id}: {label}");
        }

        Command::Undo { id } => {
            let mut c = open(&catalog)?;
            match c.undo(id)? {
                Some(label) => println!(
                    "#{id}: undid \"{label}\" — now at \"{}\"",
                    c.history(id)?.current_label()
                ),
                None => println!("#{id}: nothing left to undo"),
            }
        }

        Command::Redo { id } => {
            let mut c = open(&catalog)?;
            match c.redo(id)? {
                Some(label) => println!("#{id}: redid \"{label}\""),
                None => println!("#{id}: nothing to redo"),
            }
        }

        Command::History { id } => {
            let c = open(&catalog)?;
            let h = c.history(id)?;
            for (i, label) in h.labels().iter().enumerate() {
                println!(
                    "{} {i:>3}  {label}",
                    if i == h.cursor() { "->" } else { "  " }
                );
            }
            println!(
                "\nundo available: {}    redo available: {}",
                h.can_undo(),
                h.can_redo()
            );
        }

        Command::Render {
            id,
            out,
            max_dim,
            before,
            overwrite,
        } => {
            let c = open(&catalog)?;
            let decoded = decode_for(&c, id)?;
            let recipe = if before {
                EditRecipe::default()
            } else {
                c.recipe(id)?
            };
            let rendered = lc_core::render(&decoded.image, &recipe)?;
            let written = lc_core::export(
                &rendered,
                &out,
                &ExportOptions {
                    quality: 100,
                    max_dimension: max_dim,
                    overwrite,
                },
            )?;
            println!(
                "wrote {} ({}x{}, {}){}",
                out.display(),
                written.width,
                written.height,
                human_bytes(written.bytes),
                if before {
                    " — original, unedited"
                } else {
                    ""
                }
            );
            warn_if_unmanaged(&decoded.meta);
        }

        Command::Compare {
            id,
            out,
            max_dim,
            overwrite,
        } => {
            let c = open(&catalog)?;
            let decoded = decode_for(&c, id)?;
            let before = lc_core::render(&decoded.image, &EditRecipe::default())?;
            let after = lc_core::render(&decoded.image, &c.recipe(id)?)?;
            let joined = side_by_side(&before, &after);
            let written = lc_core::export(
                &joined,
                &out,
                &ExportOptions {
                    quality: 100,
                    max_dimension: max_dim,
                    overwrite,
                },
            )?;
            println!(
                "wrote {} — original left, edited right ({}x{}, {})",
                out.display(),
                written.width,
                written.height,
                human_bytes(written.bytes)
            );
        }

        Command::Export {
            id,
            out,
            quality,
            max_dim,
            overwrite,
        } => {
            let c = open(&catalog)?;
            let rec = c.get(id)?;
            let decoded = decode_for(&c, id)?;
            if same_file(&rec.path, &out) {
                bail!(
                    "that would overwrite the original ({}). Export somewhere else.",
                    rec.path.display()
                );
            }
            let rendered = lc_core::render(&decoded.image, &c.recipe(id)?)?;
            let written = lc_core::export(
                &rendered,
                &out,
                &ExportOptions {
                    quality,
                    max_dimension: max_dim,
                    overwrite,
                },
            )?;
            println!(
                "exported {} ({}x{}, {})",
                out.display(),
                written.width,
                written.height,
                human_bytes(written.bytes)
            );
            println!("note: v0.1 writes no EXIF metadata into exports — nothing is carried over, including location data.");
            warn_if_unmanaged(&decoded.meta);
        }

        Command::Verify {} => {
            let mut c = open(&catalog)?;
            let gone = c.verify()?;
            if gone.is_empty() {
                println!(
                    "all {} file(s) are where the catalog expects them",
                    c.count()?
                );
            } else {
                println!("{} file(s) are missing:", gone.len());
                for r in gone {
                    println!("  #{} {} (was {})", r.id, r.filename, r.path.display());
                }
                println!("\nedits are kept. use `darkroom relink <id> <new path>` for each.");
            }
        }

        Command::Relink { id, path } => {
            let mut c = open(&catalog)?;
            c.relink(id, &path)?;
            let r = c.get(id)?;
            println!(
                "#{id} now points at {} ({}x{})",
                r.path.display(),
                r.width,
                r.height
            );
        }

        Command::DemoImages {
            folder,
            count,
            width,
            height,
        } => {
            std::fs::create_dir_all(&folder)?;
            for n in 0..count {
                let path = folder.join(format!("demo-{:02}.png", n + 1));
                let img = synthetic(width, height, n);
                lc_core::export(
                    &img,
                    &path,
                    &ExportOptions {
                        overwrite: true,
                        ..Default::default()
                    },
                )?;
                println!("wrote {}", path.display());
            }
            println!("\n{count} synthetic image(s) — generated here, so they carry no licence strings attached.");
        }
    }
    Ok(())
}

fn warn_if_unmanaged(meta: &lc_core::ImageMeta) {
    if !meta.icc.is_srgb_assumption_safe() {
        eprintln!(
            "warning: {} — colours may be wrong. v0.1 cannot convert from it; \
             profile conversion is planned for v0.2.",
            meta.icc.summary()
        );
    }
}

/// Join two renders left-to-right, padding the shorter one.
fn side_by_side(a: &ImageBuf, b: &ImageBuf) -> ImageBuf {
    let gap = 8u32;
    let w = a.width + gap + b.width;
    let h = a.height.max(b.height);
    let mut out = ImageBuf::new(w, h);
    for y in 0..h {
        for x in 0..w {
            out.set(x, y, [0.02, 0.02, 0.02]);
        }
    }
    for y in 0..a.height {
        for x in 0..a.width {
            out.set(x, y, a.get(x, y));
        }
    }
    for y in 0..b.height {
        for x in 0..b.width {
            out.set(a.width + gap + x, y, b.get(x, y));
        }
    }
    out
}

fn synthetic(w: u32, h: u32, seed: u32) -> ImageBuf {
    let mut buf = ImageBuf::new(w, h);
    for y in 0..h {
        for x in 0..w {
            let fx = x as f32 / (w.max(2) - 1) as f32;
            let fy = y as f32 / (h.max(2) - 1) as f32;
            // A tonal wedge crossed with colour bands, plus deliberate near-clip
            // areas so clipping behaviour is visible.
            let base = match seed % 3 {
                0 => [fx, fy, 1.0 - fx],
                1 => [fy * fy, fx, 0.5 * (fx + fy)],
                _ => [0.95 * fx, 0.95 * fy, 0.2],
            };
            buf.set(
                x,
                y,
                [
                    lc_core::color::srgb_to_linear(base[0].clamp(0.0, 1.0)),
                    lc_core::color::srgb_to_linear(base[1].clamp(0.0, 1.0)),
                    lc_core::color::srgb_to_linear(base[2].clamp(0.0, 1.0)),
                ],
            );
        }
    }
    buf
}

fn same_file(a: &Path, b: &Path) -> bool {
    match (std::fs::canonicalize(a), std::fs::canonicalize(b)) {
        (Ok(x), Ok(y)) => x == y,
        _ => false,
    }
}

fn truncate(s: &str, n: usize) -> String {
    if s.chars().count() <= n {
        s.to_string()
    } else {
        let keep: String = s.chars().take(n.saturating_sub(1)).collect();
        format!("{keep}…")
    }
}

fn human_bytes(b: u64) -> String {
    const K: f64 = 1024.0;
    let b = b as f64;
    if b < K {
        format!("{b:.0} B")
    } else if b < K * K {
        format!("{:.1} KB", b / K)
    } else {
        format!("{:.1} MB", b / (K * K))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn crop_spec_parses() {
        let c = parse_crop("10,20,800x600").unwrap();
        assert_eq!((c.x, c.y, c.width, c.height), (10, 20, 800, 600));
    }

    #[test]
    fn a_bad_crop_spec_is_rejected_with_a_readable_message() {
        for bad in ["", "10,20", "10,20,800", "a,b,cxd", "10,20,800*600"] {
            assert!(parse_crop(bad).is_err(), "{bad:?} should not parse");
        }
    }

    #[test]
    fn side_by_side_keeps_both_halves() {
        let a = ImageBuf::new(4, 3);
        let mut b = ImageBuf::new(4, 3);
        b.set(0, 0, [1.0, 1.0, 1.0]);
        let j = side_by_side(&a, &b);
        assert_eq!((j.width, j.height), (4 + 8 + 4, 3));
        // The right-hand (edited) half starts after the left half plus the gap.
        assert_eq!(j.get(4 + 8, 0), [1.0, 1.0, 1.0]);
        // The gap between them is the neutral backing colour.
        assert_eq!(j.get(5, 0), [0.02, 0.02, 0.02]);
    }

    #[test]
    fn byte_sizes_read_sensibly() {
        assert_eq!(human_bytes(512), "512 B");
        assert_eq!(human_bytes(2048), "2.0 KB");
        assert_eq!(human_bytes(5 * 1024 * 1024), "5.0 MB");
    }
}
