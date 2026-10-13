# Risk register

| # | Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| 1 | Memory: the float working buffer is 12 bytes per pixel, so a 24MP photograph is ~290 MB and a few open at once will swap | High | High | Tiled rendering and a preview cache before v0.2; measure before promising anything |
| 2 | The GUI never gets chosen, and the project stalls as "a library" | Medium | High | ADR-0001 makes it an explicit gate with a prototype, not an open question |
| 3 | RAW support turns out to be the whole project (thousands of camera models, colour science per sensor) | High | High | Scope v0.2 to a named list of camera models with test files, and say so in the UI rather than claiming "RAW support" |
| 4 | Colour management done late becomes a rewrite | Medium | High | The working space is already linear float and the profile is already read and classified; conversion slots in at decode |
| 5 | A licence surprise (libraw, FFmpeg) forces a rewrite or blocks commercialisation | Medium | High | `docs/LICENSING.md` flags both before any code depends on them |
| 6 | Trademark collision on "Darkroom" | Medium | Medium | Names are marked provisional everywhere; clearance before any public use |
| 7 | Catalog corruption destroys a user's work | Low | Critical | Per-file transactions, WAL, refuse-newer-schema, missing-file flagging instead of deletion; backup/restore in v0.4 |
| 8 | Performance claims made without measurement | Medium | Medium | Rule: no performance adjective ships without a benchmark behind it. None is currently made |
| 9 | Scope sprawl into the other twenty modules | High | High | Nothing else starts until the platform is genuinely reused; stated in VISION |
| 10 | Work lost because the code lives in a holding-pen folder of an unrelated repository | Medium | High | Migration is the first item in `docs/NEXT_SESSION.md` |
