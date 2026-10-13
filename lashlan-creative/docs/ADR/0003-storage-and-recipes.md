# ADR-0003: SQLite catalog, versioned JSON recipes

- **Status**: accepted (2026-10-13)

## Decision

- One **SQLite** file per catalog, with schema version in `PRAGMA user_version`,
  WAL journaling and `synchronous=FULL`.
- Edits stored as a **versioned JSON recipe**; undo history stored as whole
  recipes, not diffs.
- One transaction per imported file.
- A file that disappears is marked `missing`; its record and edits are kept and
  can be relinked.

## Why

- SQLite is public domain, bundled (no system dependency), transactional, and
  readable by any tool the user already owns — which matters for "you own your
  data" being true rather than slogan.
- JSON recipes are human-readable and diffable. A user can read what the
  software did to their photograph, and so can a future importer.
- Whole-recipe history cannot desynchronise after a crash the way a diff chain
  can; recipes are tiny, so the cost is irrelevant.
- One transaction per file means an interrupted import loses at most the file in
  flight, never the catalog.
- Deleting a record when its file goes missing would destroy work the user did.
  Flagging preserves it. There is a test that edits survive a disappearance and
  a relink.

## Refusing, not guessing

A catalog whose `user_version` is newer than this build is **refused** with a
clear message; a recipe whose `schema_version` is newer is likewise refused.
Opening and half-understanding a newer file is how editors silently corrupt
people's work.

## Consequences

- Migrations must be written forward-only, one numbered step at a time, each
  with a test that an older catalog opens and keeps its data.
- The catalog file is the single thing to back up. Backup/restore tooling is a
  v0.4 milestone.
- Recipes are portable between catalogs by design; preset sharing in v0.2 is
  then just a file copy.
