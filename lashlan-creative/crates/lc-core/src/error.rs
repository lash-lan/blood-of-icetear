use std::path::PathBuf;

#[derive(Debug, thiserror::Error)]
pub enum CoreError {
    #[error("file not found: {0}")]
    NotFound(PathBuf),

    #[error("unsupported or unrecognised image format: {0}")]
    UnsupportedFormat(PathBuf),

    #[error("the file is corrupted or truncated ({path}): {source}")]
    Decode {
        path: PathBuf,
        #[source]
        source: image::ImageError,
    },

    #[error("failed to write {path}: {source}")]
    Write {
        path: PathBuf,
        #[source]
        source: std::io::Error,
    },

    #[error("failed to encode {path}: {source}")]
    Encode {
        path: PathBuf,
        #[source]
        source: image::ImageError,
    },

    #[error("refusing to overwrite an existing file: {0}")]
    RefusingOverwrite(PathBuf),

    #[error("invalid crop: {0}")]
    InvalidCrop(String),

    #[error("unsupported edit recipe schema version {found} (this build understands {supported})")]
    RecipeVersion { found: u32, supported: u32 },

    #[error("malformed edit recipe: {0}")]
    RecipeMalformed(#[from] serde_json::Error),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
}

pub type Result<T> = std::result::Result<T, CoreError>;
