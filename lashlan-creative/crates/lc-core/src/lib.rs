//! `lc-core` — the Lashlan Creative imaging core.
//!
//! Scope of this crate: colour, decoding, non-destructive edit recipes, the
//! render pipeline, undo/redo, and export. It knows nothing about catalogs,
//! user interfaces, or storage, so other Lashlan Creative modules can reuse it.
//!
//! Guarantees it upholds:
//! * source files are opened read-only and never written;
//! * all adjustment maths happens in linear-light 32-bit float;
//! * an edit is a serialisable, versioned recipe, never baked pixels;
//! * an unsupported format or unreadable colour profile is reported, not faked.

pub mod color;
pub mod error;
#[cfg(feature = "files")]
pub mod export;
pub mod fastmath;
pub mod history;
#[cfg(feature = "files")]
pub mod icc;
pub mod imagebuf;
pub mod pipeline;
pub mod recipe;

pub use error::{CoreError, Result};
#[cfg(feature = "files")]
pub use export::{export, ExportFormat, ExportOptions, ExportResult};
pub use history::History;
pub use imagebuf::ImageBuf;
#[cfg(feature = "files")]
pub use imagebuf::{decode, ImageMeta, Orientation};
pub use pipeline::render;
pub use recipe::{Adjustments, Control, Crop, EditRecipe, Rotate, RECIPE_SCHEMA_VERSION};

/// Version of this build, from Cargo.
pub const VERSION: &str = env!("CARGO_PKG_VERSION");
