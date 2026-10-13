//! `lc-catalog` — durable, local-first storage for Lashlan Creative.
//!
//! One SQLite file holds every record: the images a user has imported, the
//! edit recipe in force for each, and its undo history. Nothing about an image
//! is ever written back into the image itself.
//!
//! Durability rules this crate upholds:
//! * the schema is versioned and migrated forward, never guessed at;
//! * an interrupted import leaves the catalog consistent (one transaction per
//!   file, so a crash costs at most the file in flight);
//! * a file that disappears from disk is marked `missing`, never deleted,
//!   so its edits survive and can be relinked.

use lc_core::{EditRecipe, History};
use rusqlite::{params, Connection, OptionalExtension};
use std::path::{Path, PathBuf};

mod error;
pub mod import;

pub use error::{CatalogError, Result};
pub use import::{ImportOutcome, ImportReport};

/// Schema version written by this build.
pub const SCHEMA_VERSION: u32 = 1;

#[derive(Debug, Clone)]
pub struct ImageRecord {
    pub id: i64,
    pub path: PathBuf,
    pub filename: String,
    pub width: u32,
    pub height: u32,
    pub format: String,
    pub bytes: u64,
    pub orientation: u16,
    pub icc: String,
    pub bit_depth: u16,
    pub imported_at: String,
    pub missing: bool,
}

pub struct Catalog {
    conn: Connection,
    path: PathBuf,
}

impl Catalog {
    /// Open (or create) a catalog, running any outstanding migrations.
    pub fn open(path: &Path) -> Result<Self> {
        if let Some(parent) = path.parent() {
            if !parent.as_os_str().is_empty() {
                std::fs::create_dir_all(parent)?;
            }
        }
        let conn = Connection::open(path)?;
        conn.pragma_update(None, "journal_mode", "WAL")?;
        conn.pragma_update(None, "foreign_keys", "ON")?;
        conn.pragma_update(None, "synchronous", "FULL")?;
        let mut catalog = Self {
            conn,
            path: path.to_path_buf(),
        };
        catalog.migrate()?;
        Ok(catalog)
    }

    /// In-memory catalog, used by tests.
    pub fn open_in_memory() -> Result<Self> {
        let conn = Connection::open_in_memory()?;
        conn.pragma_update(None, "foreign_keys", "ON")?;
        let mut catalog = Self {
            conn,
            path: PathBuf::from(":memory:"),
        };
        catalog.migrate()?;
        Ok(catalog)
    }

    pub fn path(&self) -> &Path {
        &self.path
    }

    pub fn schema_version(&self) -> Result<u32> {
        let v: i64 = self
            .conn
            .query_row("PRAGMA user_version", [], |r| r.get(0))?;
        Ok(v as u32)
    }

    fn migrate(&mut self) -> Result<()> {
        let current = self.schema_version()?;
        if current > SCHEMA_VERSION {
            return Err(CatalogError::SchemaTooNew {
                found: current,
                supported: SCHEMA_VERSION,
            });
        }
        if current < 1 {
            let tx = self.conn.transaction()?;
            tx.execute_batch(
                "CREATE TABLE images (
                     id          INTEGER PRIMARY KEY,
                     path        TEXT    NOT NULL UNIQUE,
                     filename    TEXT    NOT NULL,
                     width       INTEGER NOT NULL,
                     height      INTEGER NOT NULL,
                     format      TEXT    NOT NULL,
                     bytes       INTEGER NOT NULL,
                     orientation INTEGER NOT NULL,
                     icc         TEXT    NOT NULL,
                     bit_depth   INTEGER NOT NULL,
                     imported_at TEXT    NOT NULL,
                     missing     INTEGER NOT NULL DEFAULT 0
                 );
                 CREATE INDEX images_filename ON images(filename);
                 CREATE TABLE edits (
                     image_id     INTEGER PRIMARY KEY
                                  REFERENCES images(id) ON DELETE CASCADE,
                     recipe_json  TEXT NOT NULL,
                     history_json TEXT NOT NULL,
                     updated_at   TEXT NOT NULL
                 );",
            )?;
            tx.pragma_update(None, "user_version", 1i64)?;
            tx.commit()?;
        }
        Ok(())
    }

    /// Add one file, or return its existing id if the path is already known.
    pub fn add_image(&mut self, path: &Path) -> Result<ImportOutcome> {
        let abs = std::fs::canonicalize(path).unwrap_or_else(|_| path.to_path_buf());
        let key = abs.to_string_lossy().to_string();

        if let Some(id) = self.id_for_path(&key)? {
            return Ok(ImportOutcome::AlreadyPresent { id });
        }
        if !lc_core::imagebuf::is_supported_extension(&abs) {
            return Ok(ImportOutcome::Unsupported {
                path: abs,
                reason: format!(
                    "v0.1 reads {} only",
                    lc_core::imagebuf::SUPPORTED_EXTENSIONS.join(", ")
                ),
            });
        }

        // Decoding is how we learn the real dimensions and profile; a file that
        // will not decode must not enter the catalog pretending to be fine.
        let decoded = match lc_core::decode(&abs) {
            Ok(d) => d,
            Err(e) => {
                return Ok(ImportOutcome::Failed {
                    path: abs,
                    reason: e.to_string(),
                })
            }
        };
        let m = &decoded.meta;

        let tx = self.conn.transaction()?;
        tx.execute(
            "INSERT INTO images
               (path, filename, width, height, format, bytes, orientation,
                icc, bit_depth, imported_at, missing)
             VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9, datetime('now'), 0)",
            params![
                key,
                abs.file_name()
                    .map(|f| f.to_string_lossy().to_string())
                    .unwrap_or_default(),
                m.width,
                m.height,
                m.format,
                m.bytes as i64,
                m.orientation.0,
                m.icc.summary(),
                m.bit_depth,
            ],
        )?;
        let id = tx.last_insert_rowid();
        tx.execute(
            "INSERT INTO edits (image_id, recipe_json, history_json, updated_at)
             VALUES (?1, ?2, ?3, datetime('now'))",
            params![
                id,
                EditRecipe::default().to_json(),
                History::new().to_json()
            ],
        )?;
        tx.commit()?;
        Ok(ImportOutcome::Added { id, path: abs })
    }

    fn id_for_path(&self, key: &str) -> Result<Option<i64>> {
        Ok(self
            .conn
            .query_row("SELECT id FROM images WHERE path = ?1", [key], |r| r.get(0))
            .optional()?)
    }

    pub fn count(&self) -> Result<u64> {
        let n: i64 = self
            .conn
            .query_row("SELECT COUNT(*) FROM images", [], |r| r.get(0))?;
        Ok(n as u64)
    }

    pub fn list(&self) -> Result<Vec<ImageRecord>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, path, filename, width, height, format, bytes,
                    orientation, icc, bit_depth, imported_at, missing
             FROM images ORDER BY filename, id",
        )?;
        let rows = stmt
            .query_map([], |r| {
                Ok(ImageRecord {
                    id: r.get(0)?,
                    path: PathBuf::from(r.get::<_, String>(1)?),
                    filename: r.get(2)?,
                    width: r.get(3)?,
                    height: r.get(4)?,
                    format: r.get(5)?,
                    bytes: r.get::<_, i64>(6)? as u64,
                    orientation: r.get(7)?,
                    icc: r.get(8)?,
                    bit_depth: r.get(9)?,
                    imported_at: r.get(10)?,
                    missing: r.get::<_, i64>(11)? != 0,
                })
            })?
            .collect::<rusqlite::Result<Vec<_>>>()?;
        Ok(rows)
    }

    pub fn get(&self, id: i64) -> Result<ImageRecord> {
        self.list()?
            .into_iter()
            .find(|r| r.id == id)
            .ok_or(CatalogError::NoSuchImage(id))
    }

    pub fn history(&self, id: i64) -> Result<History> {
        let json: String = self
            .conn
            .query_row(
                "SELECT history_json FROM edits WHERE image_id = ?1",
                [id],
                |r| r.get(0),
            )
            .optional()?
            .ok_or(CatalogError::NoSuchImage(id))?;
        Ok(History::from_json(&json)?)
    }

    pub fn recipe(&self, id: i64) -> Result<EditRecipe> {
        let json: String = self
            .conn
            .query_row(
                "SELECT recipe_json FROM edits WHERE image_id = ?1",
                [id],
                |r| r.get(0),
            )
            .optional()?
            .ok_or(CatalogError::NoSuchImage(id))?;
        Ok(EditRecipe::from_json(&json)?)
    }

    /// Store a new recipe and push it onto the undo history, atomically.
    pub fn set_recipe(&mut self, id: i64, recipe: EditRecipe, label: &str) -> Result<()> {
        let mut history = self.history(id)?;
        history.push(label, recipe.clone());
        self.write_edit(id, &recipe, &history)
    }

    fn write_edit(&mut self, id: i64, recipe: &EditRecipe, history: &History) -> Result<()> {
        let tx = self.conn.transaction()?;
        let changed = tx.execute(
            "UPDATE edits SET recipe_json = ?2, history_json = ?3,
                              updated_at = datetime('now')
             WHERE image_id = ?1",
            params![id, recipe.to_json(), history.to_json()],
        )?;
        if changed == 0 {
            return Err(CatalogError::NoSuchImage(id));
        }
        tx.commit()?;
        Ok(())
    }

    /// Step back one edit. Returns the label stepped away from, or `None` when
    /// there is nothing left to undo.
    pub fn undo(&mut self, id: i64) -> Result<Option<String>> {
        let mut history = self.history(id)?;
        let label = history.undo();
        if label.is_some() {
            let recipe = history.current().clone();
            self.write_edit(id, &recipe, &history)?;
        }
        Ok(label)
    }

    pub fn redo(&mut self, id: i64) -> Result<Option<String>> {
        let mut history = self.history(id)?;
        let label = history.redo();
        if label.is_some() {
            let recipe = history.current().clone();
            self.write_edit(id, &recipe, &history)?;
        }
        Ok(label)
    }

    /// Re-check every catalogued path and flag the ones that have gone.
    pub fn verify(&mut self) -> Result<Vec<ImageRecord>> {
        let mut gone = Vec::new();
        for rec in self.list()? {
            let missing_now = !rec.path.exists();
            if missing_now != rec.missing {
                self.conn.execute(
                    "UPDATE images SET missing = ?2 WHERE id = ?1",
                    params![rec.id, missing_now as i64],
                )?;
            }
            if missing_now {
                gone.push(rec);
            }
        }
        Ok(gone)
    }

    /// Point an existing record at a new file on disk, keeping its edits.
    pub fn relink(&mut self, id: i64, new_path: &Path) -> Result<()> {
        if !new_path.exists() {
            return Err(CatalogError::Core(lc_core::CoreError::NotFound(
                new_path.to_path_buf(),
            )));
        }
        let decoded = lc_core::decode(new_path)?;
        let abs = std::fs::canonicalize(new_path).unwrap_or_else(|_| new_path.to_path_buf());
        let changed = self.conn.execute(
            "UPDATE images SET path = ?2, filename = ?3, width = ?4, height = ?5,
                               format = ?6, bytes = ?7, orientation = ?8,
                               icc = ?9, bit_depth = ?10, missing = 0
             WHERE id = ?1",
            params![
                id,
                abs.to_string_lossy().to_string(),
                abs.file_name()
                    .map(|f| f.to_string_lossy().to_string())
                    .unwrap_or_default(),
                decoded.meta.width,
                decoded.meta.height,
                decoded.meta.format,
                decoded.meta.bytes as i64,
                decoded.meta.orientation.0,
                decoded.meta.icc.summary(),
                decoded.meta.bit_depth,
            ],
        )?;
        if changed == 0 {
            return Err(CatalogError::NoSuchImage(id));
        }
        Ok(())
    }
}
