#[derive(Debug, thiserror::Error)]
pub enum CatalogError {
    #[error("catalog database error: {0}")]
    Sqlite(#[from] rusqlite::Error),

    #[error(
        "this catalog was written by a newer version of Darkroom \
         (schema {found}, this build understands {supported})"
    )]
    SchemaTooNew { found: u32, supported: u32 },

    #[error("no image with id {0} in this catalog")]
    NoSuchImage(i64),

    #[error(transparent)]
    Core(#[from] lc_core::CoreError),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
}

pub type Result<T> = std::result::Result<T, CatalogError>;
