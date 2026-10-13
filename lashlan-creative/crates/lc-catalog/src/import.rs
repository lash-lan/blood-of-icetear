//! Folder import: walk, decode, record. Reports every file it could not take,
//! rather than quietly skipping it.

use crate::{Catalog, Result};
use std::path::{Path, PathBuf};

#[derive(Debug, Clone)]
pub enum ImportOutcome {
    Added { id: i64, path: PathBuf },
    AlreadyPresent { id: i64 },
    Unsupported { path: PathBuf, reason: String },
    Failed { path: PathBuf, reason: String },
}

#[derive(Debug, Default, Clone)]
pub struct ImportReport {
    pub added: Vec<(i64, PathBuf)>,
    pub already_present: usize,
    pub unsupported: Vec<(PathBuf, String)>,
    pub failed: Vec<(PathBuf, String)>,
}

impl ImportReport {
    pub fn considered(&self) -> usize {
        self.added.len() + self.already_present + self.unsupported.len() + self.failed.len()
    }

    pub fn summary(&self) -> String {
        format!(
            "{} added, {} already in catalog, {} unsupported, {} failed",
            self.added.len(),
            self.already_present,
            self.unsupported.len(),
            self.failed.len()
        )
    }
}

/// Collect candidate files, sorted so an import is reproducible.
pub fn collect_files(root: &Path, recursive: bool) -> Result<Vec<PathBuf>> {
    let mut out = Vec::new();
    let mut stack = vec![root.to_path_buf()];
    while let Some(dir) = stack.pop() {
        let entries = match std::fs::read_dir(&dir) {
            Ok(e) => e,
            Err(_) => continue,
        };
        for entry in entries.flatten() {
            let path = entry.path();
            // A symlink is not followed: an import must not wander out of the
            // folder the user chose.
            let meta = match entry.metadata() {
                Ok(m) => m,
                Err(_) => continue,
            };
            if meta.is_symlink() {
                continue;
            }
            if meta.is_dir() {
                if recursive {
                    stack.push(path);
                }
            } else if meta.is_file() {
                out.push(path);
            }
        }
    }
    out.sort();
    Ok(out)
}

/// Import one folder. `progress` is called with (index, total, path) before
/// each file, so a UI can show real progress instead of a fake spinner.
pub fn import_folder(
    catalog: &mut Catalog,
    root: &Path,
    recursive: bool,
    mut progress: impl FnMut(usize, usize, &Path),
) -> Result<ImportReport> {
    if !root.is_dir() {
        return Err(crate::CatalogError::Core(lc_core::CoreError::NotFound(
            root.to_path_buf(),
        )));
    }
    let files = collect_files(root, recursive)?;
    let total = files.len();
    let mut report = ImportReport::default();
    for (i, file) in files.iter().enumerate() {
        progress(i + 1, total, file);
        match catalog.add_image(file)? {
            ImportOutcome::Added { id, path } => report.added.push((id, path)),
            ImportOutcome::AlreadyPresent { .. } => report.already_present += 1,
            ImportOutcome::Unsupported { path, reason } => report.unsupported.push((path, reason)),
            ImportOutcome::Failed { path, reason } => report.failed.push((path, reason)),
        }
    }
    Ok(report)
}
