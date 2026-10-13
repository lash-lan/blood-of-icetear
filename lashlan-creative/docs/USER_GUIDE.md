# User guide — Darkroom v0.1

This describes what actually works today. If something is not in here, it is not
built yet.

**There is no graphical interface yet.** Darkroom is driven from a terminal.
Everything runs on your own machine, offline.

## What it reads

JPEG, PNG and TIFF. **RAW files are not supported yet** — they are refused on
import with an explanation rather than half-read.

## What it never does

Touch your original photographs. Every adjustment is stored as a small
instruction file in the catalog. The originals are opened read-only.

## Setting up

```sh
cargo build --release
```

That produces `target/release/darkroom`. The examples below assume:

```sh
D=./target/release/darkroom
```

Every command takes `--catalog <file>` (short `-c`), which defaults to
`darkroom.db` in the current folder. The catalog is created if it does not exist.

## Getting photographs in

```sh
$D --catalog ~/photos.db import ~/Pictures/holiday
$D --catalog ~/photos.db import ~/Pictures --recursive
```

Each file is reported as it is considered. At the end you get a count of what
was added, what was already there, what was unsupported, and what failed — with
the reason for each. Nothing is skipped silently.

No photographs of your own yet? Make some:

```sh
$D demo-images ~/darkroom-demo --count 3
```

## Looking at what you have

```sh
$D -c ~/photos.db list            # a table
$D -c ~/photos.db list --json     # the same, for scripts
$D -c ~/photos.db info 1          # everything about photograph #1
```

`info` shows the pixel dimensions, format, file size, bit depth, EXIF rotation
tag, colour profile, when it was imported, whether the file is still on disk,
where you are in the undo history, and the current edits.

## Adjusting

```sh
$D -c ~/photos.db adjust 1 --exposure 0.5
$D -c ~/photos.db adjust 1 --shadows 0.4 --highlights -0.3 --contrast 0.2
$D -c ~/photos.db adjust 1 --temperature 0.2 --tint -0.1
$D -c ~/photos.db adjust 1 --saturation 0.15 --vibrance 0.4
$D -c ~/photos.db adjust 1 --crop 100,50,1600x1200 --rotate 90
```

| Control | Range | What it does |
| --- | --- | --- |
| `--exposure` | -5 to 5 | Stops of light. `1` is twice as bright |
| `--contrast` | -1 to 1 | Pushes tones apart around mid grey |
| `--highlights` | -1 to 1 | Up to two stops on the brighter tones only |
| `--shadows` | -1 to 1 | Up to two stops on the darker tones only |
| `--temperature` | -1 to 1 | Warmer (positive) or cooler (negative) |
| `--tint` | -1 to 1 | Magenta (positive) or green (negative) |
| `--saturation` | -1 to 1 | All colours, evenly. `-1` is black and white |
| `--vibrance` | -1 to 1 | Mostly the muted colours; leaves strong ones alone |
| `--crop` | `X,Y,WIDTHxHEIGHT` | In original pixels, from the top-left |
| `--rotate` | `0`, `90`, `180`, `270` | Clockwise. Angles in between are not supported yet |

A note on temperature: it is a *relative* warm/cool slider, not a Kelvin value.
Real Kelvin needs information that only RAW files carry, which v0.1 does not read.

## Looking at your work

```sh
$D -c ~/photos.db render 1 -o look.png                  # the edited version
$D -c ~/photos.db render 1 -o look.png --max-dim 1200   # fit to a screen
$D -c ~/photos.db render 1 -o original.png --before     # as it came in
$D -c ~/photos.db compare 1 -o side-by-side.png         # both, original on the left
```

## Changing your mind

```sh
$D -c ~/photos.db reset 1 --control exposure   # just that one
$D -c ~/photos.db reset 1 --all                # back to as imported
$D -c ~/photos.db undo 1
$D -c ~/photos.db redo 1
$D -c ~/photos.db history 1                    # every step, and where you are
```

Your place in the history is remembered after you close the terminal. Note that
a reset is itself a step, so it can be undone too.

## Getting finished pictures out

```sh
$D -c ~/photos.db export 1 -o ~/Desktop/final.jpg --quality 90
$D -c ~/photos.db export 1 -o ~/Desktop/web.jpg --quality 80 --max-dim 2048
$D -c ~/photos.db export 1 -o ~/Desktop/print.png
```

`--max-dim` is the longest edge in pixels; the shape is kept. Exporting onto an
existing file is refused unless you add `--overwrite`, and exporting on top of
one of your originals is refused outright.

**Exports contain no metadata at all.** Nothing is carried across — not the
camera, not the date, not location data. That is private by default, but it also
means you lose information you may want. Metadata options are a later milestone.

## When photographs move

```sh
$D -c ~/photos.db verify                       # check everything is where it was
$D -c ~/photos.db relink 2 ~/Pictures/new/place.jpg
```

If you move or rename a photograph, Darkroom marks it missing and **keeps your
edits**. Relinking points the record at the new location and your work comes
back.

## If something goes wrong

Every failure prints one plain line saying what happened, and the command exits
with an error code so scripts notice. Common ones:

- `no image with id 7 in this catalog` — check `list`.
- `... is no longer at ... run darkroom relink ...` — the file moved.
- `crop 10x10+9999+0 falls outside the 480x320 image` — the crop is off the edge.
- `refusing to overwrite an existing file` — add `--overwrite` if you mean it.
- `warning: UNMANAGED: Display P3 ...` — the photograph uses a colour profile
  v0.1 cannot convert from. It will still open, but the colours may be off.
  Proper handling is coming in v0.2.
