# Architecture

## Layers

```
   darkroom-cli            presentation + command layer (today: a CLI)
        |                  parses input, prints progress and errors
        v
   lc-catalog              application services + durable state
        |                  imports, edit records, undo history, relinking
        v
   lc-core                 domain + engine
                           colour, decode, recipes, render, export
```

The dependency arrows only ever point downwards. `lc-core` knows nothing about
storage or user interfaces, which is what makes it reusable by later modules
(Reality, Decoder, Tunnel). `lc-catalog` knows nothing about how anything is
presented. A desktop UI is another consumer of these two crates, not a rewrite.

## Data flow for one edit

```
file on disk ──decode──> linear f32 ImageBuf ──render(recipe)──> ImageBuf ──encode──> new file
     (read-only)                ^                                                (never the original)
                                |
                    EditRecipe (JSON, versioned)  <──  History (undo/redo)
                                ^
                                |
                        catalog.db (SQLite)
```

The source file is opened read-only and never written. Everything the user
changes lives in the recipe; the recipe lives in the catalog.

## Key decisions in one line each

- **Working space**: linear-light sRGB primaries, 32-bit float. (ADR-0002)
- **Edits**: a versioned JSON recipe, refused rather than guessed at when its
  schema version is newer than the build. (ADR-0003)
- **Storage**: one SQLite file with `PRAGMA user_version` migrations, one
  transaction per imported file. (ADR-0003)
- **Desktop shell**: deferred, not assumed. (ADR-0001)

## Where the shared platform will come from

These pieces are already written to be module-agnostic and are the seed of the
Lashlan Creative Hub:

| Piece | Lives in | Reusable as |
| --- | --- | --- |
| Colour transfer functions, luminance | `lc-core::color` | Shared colour module |
| Versioned recipe + history | `lc-core::recipe`, `::history` | Shared undo/project schema |
| Export service | `lc-core::export` | Shared export/transcode jobs |
| Asset records, relinking, migrations | `lc-catalog` | Shared asset library |

## Not yet built

Job queue with cancellation, preview cache, plugin interface, AI adapter,
logging/updater, and the UI layer. They have places reserved in this diagram and
nothing more. See `docs/STATUS.md`.
