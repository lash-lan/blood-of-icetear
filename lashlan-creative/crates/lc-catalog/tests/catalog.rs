//! Integration tests for the catalog: real files on disk, a real SQLite file,
//! reopened between steps so persistence is genuinely exercised.

use lc_catalog::{Catalog, ImportOutcome};
use lc_core::{EditRecipe, ExportOptions, ImageBuf};
use std::path::{Path, PathBuf};

/// A unique scratch directory per test, cleaned up on the way out.
struct Scratch(PathBuf);

impl Scratch {
    fn new(tag: &str) -> Self {
        let dir = std::env::temp_dir().join(format!(
            "lc-test-{}-{}-{:?}",
            tag,
            std::process::id(),
            std::thread::current().id()
        ));
        let _ = std::fs::remove_dir_all(&dir);
        std::fs::create_dir_all(&dir).unwrap();
        Scratch(dir)
    }
    fn p(&self, name: &str) -> PathBuf {
        self.0.join(name)
    }
}

impl Drop for Scratch {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.0);
    }
}

/// Write a synthetic test image. No third-party fixtures, no licence worries.
fn write_gradient(path: &Path, w: u32, h: u32) {
    let mut buf = ImageBuf::new(w, h);
    for y in 0..h {
        for x in 0..w {
            let fx = x as f32 / (w.max(2) - 1) as f32;
            let fy = y as f32 / (h.max(2) - 1) as f32;
            buf.set(x, y, [fx, fy, 0.5 * (fx + fy)]);
        }
    }
    lc_core::export(
        &buf,
        path,
        &ExportOptions {
            overwrite: true,
            ..Default::default()
        },
    )
    .unwrap();
}

#[test]
fn a_new_catalog_is_created_at_the_current_schema() {
    let s = Scratch::new("schema");
    let db = s.p("catalog.db");
    let cat = Catalog::open(&db).unwrap();
    assert_eq!(cat.schema_version().unwrap(), lc_catalog::SCHEMA_VERSION);
    assert_eq!(cat.count().unwrap(), 0);
    assert!(db.exists(), "the catalog file is really on disk");
}

#[test]
fn reopening_an_existing_catalog_does_not_lose_or_duplicate_anything() {
    let s = Scratch::new("reopen");
    let db = s.p("catalog.db");
    write_gradient(&s.p("a.png"), 16, 12);
    {
        let mut cat = Catalog::open(&db).unwrap();
        cat.add_image(&s.p("a.png")).unwrap();
        assert_eq!(cat.count().unwrap(), 1);
    }
    let mut cat = Catalog::open(&db).unwrap();
    assert_eq!(cat.count().unwrap(), 1);
    // Importing the same file twice must not create a second record.
    assert!(matches!(
        cat.add_image(&s.p("a.png")).unwrap(),
        ImportOutcome::AlreadyPresent { .. }
    ));
    assert_eq!(cat.count().unwrap(), 1);
}

#[test]
fn import_records_real_dimensions_and_rejects_what_it_cannot_read() {
    let s = Scratch::new("import");
    write_gradient(&s.p("photo.png"), 24, 10);
    std::fs::write(s.p("notes.txt"), b"not an image").unwrap();
    std::fs::write(s.p("broken.png"), b"\x89PNG\r\n\x1a\nTRUNCATED").unwrap();
    std::fs::write(s.p("raw.cr2"), b"pretend raw").unwrap();

    // The catalog file lives outside the imported folder, so it is not itself
    // a candidate for import.
    let mut cat = Catalog::open(&s.p("db/catalog.db")).unwrap();
    let mut seen = Vec::new();
    let report = lc_catalog::import::import_folder(&mut cat, &s.0, false, |i, n, p| {
        seen.push((i, n, p.to_path_buf()))
    })
    .unwrap();

    assert_eq!(report.added.len(), 1, "{report:?}");
    assert_eq!(report.unsupported.len(), 2, "txt and cr2: {report:?}");
    assert_eq!(report.failed.len(), 1, "the truncated png: {report:?}");
    assert_eq!(seen.len(), report.considered());
    assert!(seen.iter().all(|(i, n, _)| *i >= 1 && i <= n));

    let rec = &cat.list().unwrap()[0];
    assert_eq!((rec.width, rec.height), (24, 10));
    assert_eq!(rec.format, "PNG");
    assert!(rec.bytes > 0);
    assert!(!rec.missing);
    assert!(rec.icc.contains("sRGB"), "icc was {:?}", rec.icc);
}

#[test]
fn recursive_import_reaches_subfolders_and_flat_import_does_not() {
    let s = Scratch::new("recurse");
    std::fs::create_dir_all(s.p("sub")).unwrap();
    write_gradient(&s.p("top.png"), 8, 8);
    write_gradient(&s.p("sub/deep.png"), 8, 8);

    let mut flat = Catalog::open_in_memory().unwrap();
    let r = lc_catalog::import::import_folder(&mut flat, &s.0, false, |_, _, _| {}).unwrap();
    assert_eq!(r.added.len(), 1);

    let mut deep = Catalog::open_in_memory().unwrap();
    let r = lc_catalog::import::import_folder(&mut deep, &s.0, true, |_, _, _| {}).unwrap();
    assert_eq!(r.added.len(), 2);
}

#[test]
fn importing_a_folder_that_does_not_exist_is_an_error_not_a_silent_success() {
    let mut cat = Catalog::open_in_memory().unwrap();
    let err =
        lc_catalog::import::import_folder(&mut cat, Path::new("/no/such/dir"), true, |_, _, _| {});
    assert!(err.is_err());
}

#[test]
fn edits_survive_a_quit_and_relaunch() {
    let s = Scratch::new("persist");
    let db = s.p("catalog.db");
    write_gradient(&s.p("a.png"), 16, 16);

    let id = {
        let mut cat = Catalog::open(&db).unwrap();
        let id = match cat.add_image(&s.p("a.png")).unwrap() {
            ImportOutcome::Added { id, .. } => id,
            other => panic!("{other:?}"),
        };
        let mut r = EditRecipe::default();
        r.adjustments.exposure_ev = 1.25;
        r.adjustments.saturation = -0.5;
        cat.set_recipe(id, r, "exposure, saturation").unwrap();
        id
    };

    // A fresh process would do exactly this.
    let cat = Catalog::open(&db).unwrap();
    let back = cat.recipe(id).unwrap();
    assert_eq!(back.adjustments.exposure_ev, 1.25);
    assert_eq!(back.adjustments.saturation, -0.5);
    assert_eq!(
        cat.history(id).unwrap().current_label(),
        "exposure, saturation"
    );
}

#[test]
fn undo_and_redo_persist_across_reopen() {
    let s = Scratch::new("undo");
    let db = s.p("catalog.db");
    write_gradient(&s.p("a.png"), 8, 8);

    let mut cat = Catalog::open(&db).unwrap();
    let id = match cat.add_image(&s.p("a.png")).unwrap() {
        ImportOutcome::Added { id, .. } => id,
        other => panic!("{other:?}"),
    };
    for ev in [0.5f32, 1.0, 1.5] {
        let mut r = cat.recipe(id).unwrap();
        r.adjustments.exposure_ev = ev;
        cat.set_recipe(id, r, &format!("exposure {ev}")).unwrap();
    }
    assert_eq!(cat.recipe(id).unwrap().adjustments.exposure_ev, 1.5);
    assert_eq!(cat.undo(id).unwrap().as_deref(), Some("exposure 1.5"));
    drop(cat);

    let mut cat = Catalog::open(&db).unwrap();
    assert_eq!(cat.recipe(id).unwrap().adjustments.exposure_ev, 1.0);
    assert_eq!(cat.redo(id).unwrap().as_deref(), Some("exposure 1.5"));
    assert_eq!(cat.recipe(id).unwrap().adjustments.exposure_ev, 1.5);

    // Walk all the way back to the imported state and no further.
    while cat.undo(id).unwrap().is_some() {}
    assert!(cat.recipe(id).unwrap().is_neutral());
    assert_eq!(cat.undo(id).unwrap(), None);
}

#[test]
fn a_vanished_file_is_flagged_missing_and_its_edits_survive_relinking() {
    let s = Scratch::new("relink");
    let db = s.p("catalog.db");
    write_gradient(&s.p("a.png"), 10, 10);

    let mut cat = Catalog::open(&db).unwrap();
    let id = match cat.add_image(&s.p("a.png")).unwrap() {
        ImportOutcome::Added { id, .. } => id,
        other => panic!("{other:?}"),
    };
    let mut r = EditRecipe::default();
    r.adjustments.contrast = 0.3;
    cat.set_recipe(id, r, "contrast").unwrap();

    // The user moves the photo.
    std::fs::create_dir_all(s.p("moved")).unwrap();
    std::fs::rename(s.p("a.png"), s.p("moved/a.png")).unwrap();

    let gone = cat.verify().unwrap();
    assert_eq!(gone.len(), 1);
    assert!(cat.get(id).unwrap().missing);
    assert_eq!(
        cat.recipe(id).unwrap().adjustments.contrast,
        0.3,
        "edits must not be discarded when a file goes missing"
    );

    cat.relink(id, &s.p("moved/a.png")).unwrap();
    assert!(!cat.get(id).unwrap().missing);
    assert_eq!(cat.recipe(id).unwrap().adjustments.contrast, 0.3);
    assert!(cat.verify().unwrap().is_empty());
}

#[test]
fn relinking_to_a_nonexistent_file_is_refused() {
    let s = Scratch::new("relink-bad");
    write_gradient(&s.p("a.png"), 8, 8);
    let mut cat = Catalog::open_in_memory().unwrap();
    let id = match cat.add_image(&s.p("a.png")).unwrap() {
        ImportOutcome::Added { id, .. } => id,
        other => panic!("{other:?}"),
    };
    assert!(cat.relink(id, &s.p("ghost.png")).is_err());
}

#[test]
fn asking_about_an_unknown_id_is_a_clear_error() {
    let cat = Catalog::open_in_memory().unwrap();
    assert!(cat.get(99).is_err());
    assert!(cat.recipe(99).is_err());
    assert!(cat.history(99).is_err());
}

#[test]
fn a_catalog_from_a_newer_build_is_refused_rather_than_mangled() {
    let s = Scratch::new("too-new");
    let db = s.p("catalog.db");
    {
        let cat = Catalog::open(&db).unwrap();
        assert_eq!(cat.schema_version().unwrap(), 1);
    }
    let conn = rusqlite::Connection::open(&db).unwrap();
    conn.pragma_update(None, "user_version", 99i64).unwrap();
    drop(conn);
    match Catalog::open(&db) {
        Err(lc_catalog::CatalogError::SchemaTooNew { found: 99, .. }) => {}
        Err(other) => panic!("wrong error: {other:?}"),
        Ok(_) => panic!("a newer schema was opened instead of refused"),
    }
}

#[test]
fn the_original_file_is_never_modified_by_editing_or_exporting() {
    let s = Scratch::new("immutable");
    let src = s.p("a.png");
    write_gradient(&src, 12, 12);
    let before = std::fs::read(&src).unwrap();

    let mut cat = Catalog::open_in_memory().unwrap();
    let id = match cat.add_image(&src).unwrap() {
        ImportOutcome::Added { id, .. } => id,
        other => panic!("{other:?}"),
    };
    let mut r = EditRecipe::default();
    r.adjustments.exposure_ev = 2.0;
    cat.set_recipe(id, r.clone(), "exposure").unwrap();

    let decoded = lc_core::decode(&src).unwrap();
    let rendered = lc_core::render(&decoded.image, &cat.recipe(id).unwrap()).unwrap();
    lc_core::export(&rendered, &s.p("out.jpg"), &ExportOptions::default()).unwrap();

    assert_eq!(
        before,
        std::fs::read(&src).unwrap(),
        "the source file changed — that is a data-loss bug"
    );
    assert!(s.p("out.jpg").exists());
}
