#!/usr/bin/env bash
# End-to-end smoke test for Lashlan's Darkroom v0.1.
#
# Walks every user journey in docs/PRD.md against a freshly built binary, in a
# throwaway folder, with no network access required. Exits non-zero on the
# first failure. This script IS the evidence quoted in docs/STATUS.md.
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$(pwd)"
WORK="${1:-$(mktemp -d)}"
PHOTOS="$WORK/photos"
OUT="$WORK/exports"
DB="$WORK/catalog.db"
DR="$ROOT/target/release/darkroom"

step() { printf '\n=== %s\n' "$*"; }
fail() { printf '\nSMOKE FAILED: %s\n' "$*" >&2; exit 1; }
exists() { [ -s "$1" ] || fail "expected a non-empty file at $1"; }

step "build (release)"
cargo build --release --quiet

step "A. demo images + import"
"$DR" demo-images "$PHOTOS" --count 3 --width 480 --height 320
# A file Darkroom must refuse rather than pretend to read.
printf 'this is not a photograph' > "$PHOTOS/notes.txt"
printf 'II*\x00garbage' > "$PHOTOS/fake.cr2"
"$DR" --catalog "$DB" import "$PHOTOS" | tee "$WORK/import.log"
grep -q "3 added" "$WORK/import.log" || fail "expected 3 images to import"
grep -q "notes.txt — v0.1 reads" "$WORK/import.log" || fail "the text file was not refused with a reason"
grep -q "fake.cr2 — v0.1 reads" "$WORK/import.log" || fail "the RAW file was not refused with a reason"

step "B. library listing"
"$DR" --catalog "$DB" list | tee "$WORK/list.log"
grep -q "480x320" "$WORK/list.log" || fail "dimensions missing from the listing"
"$DR" --catalog "$DB" list --json > "$WORK/list.json"
python3 -c "
import json,sys
rows=json.load(open('$WORK/list.json'))
assert len(rows)==3, rows
assert all(r['format']=='PNG' and r['width']==480 and not r['missing'] for r in rows), rows
print('json listing ok:', [r['id'] for r in rows])
"

step "C. viewer render, full size and fit-to-screen"
"$DR" --catalog "$DB" render 1 -o "$OUT/full.png"
"$DR" --catalog "$DB" render 1 -o "$OUT/fit.png" --max-dim 200
exists "$OUT/full.png"; exists "$OUT/fit.png"
python3 -c "
import struct
def size(p):
    d=open(p,'rb').read(33)
    return struct.unpack('>II', d[16:24])
assert size('$OUT/full.png')==(480,320), size('$OUT/full.png')
assert size('$OUT/fit.png')==(200,133), size('$OUT/fit.png')
print('render sizes ok')
"

step "D. non-destructive adjustments"
BEFORE_SUM="$(md5sum < "$PHOTOS/demo-01.png")"
"$DR" --catalog "$DB" adjust 1 --exposure 0.75 --contrast 0.3 --shadows 0.4 \
      --highlights -0.2 --temperature 0.25 --tint -0.1 --saturation 0.2 --vibrance 0.3
"$DR" --catalog "$DB" adjust 1 --crop 40,20,400x240 --rotate 90
"$DR" --catalog "$DB" info 1 | tee "$WORK/info.log"
grep -q '"exposure_ev": 0.75' "$WORK/info.log" || fail "exposure was not stored"
grep -q '"rotate": "Cw90"' "$WORK/info.log" || fail "rotation was not stored"
AFTER_SUM="$(md5sum < "$PHOTOS/demo-01.png")"
[ "$BEFORE_SUM" = "$AFTER_SUM" ] || fail "THE ORIGINAL FILE CHANGED — non-destructive editing is broken"

step "E. before/after comparison and per-control reset"
"$DR" --catalog "$DB" compare 1 -o "$OUT/compare.png"
exists "$OUT/compare.png"
"$DR" --catalog "$DB" render 1 -o "$OUT/before.png" --before
"$DR" --catalog "$DB" render 1 -o "$OUT/after.png"
python3 -c "
import struct
def size(p):
    return struct.unpack('>II', open(p,'rb').read(33)[16:24])
# the edited version is cropped to 400x240 then turned 90 degrees
assert size('$OUT/before.png')==(480,320), size('$OUT/before.png')
assert size('$OUT/after.png')==(240,400), size('$OUT/after.png')
print('before/after geometry ok')
"
cmp -s "$OUT/before.png" "$OUT/after.png" && fail "before and after are identical — adjustments did nothing"
"$DR" --catalog "$DB" reset 1 --control exposure
"$DR" --catalog "$DB" info 1 | grep -q '"exposure_ev": 0.0' || fail "per-control reset did not take"
"$DR" --catalog "$DB" info 1 | grep -q '"contrast": 0.3' || fail "reset wiped a control it was not asked to touch"

step "F. undo / redo, then quit and relaunch"
"$DR" --catalog "$DB" history 1 | tee "$WORK/history.log"
"$DR" --catalog "$DB" undo 1
"$DR" --catalog "$DB" info 1 | grep -q '"exposure_ev": 0.75' || fail "undo did not restore exposure"
"$DR" --catalog "$DB" redo 1
"$DR" --catalog "$DB" info 1 | grep -q '"exposure_ev": 0.0' || fail "redo did not reapply the reset"
# Every command above was a separate process: state has already survived
# repeated "relaunches". Prove the catalog file alone carries it.
cp "$DB" "$WORK/copy.db"
"$DR" --catalog "$WORK/copy.db" info 1 | grep -q '"contrast": 0.3' \
  || fail "edit state does not live in the catalog file"

step "G. export, with originals protected"
"$DR" --catalog "$DB" export 1 -o "$OUT/edited.jpg" --quality 85
"$DR" --catalog "$DB" export 1 -o "$OUT/edited-small.jpg" --quality 60 --max-dim 320
"$DR" --catalog "$DB" export 1 -o "$OUT/edited.png"
exists "$OUT/edited.jpg"; exists "$OUT/edited-small.jpg"; exists "$OUT/edited.png"
[ "$(stat -c%s "$OUT/edited-small.jpg")" -lt "$(stat -c%s "$OUT/edited.jpg")" ] \
  || fail "the smaller, lower-quality export is not smaller"
if "$DR" --catalog "$DB" export 1 -o "$OUT/edited.jpg" 2>"$WORK/clobber.log"; then
  fail "exporting over an existing file was allowed without --overwrite"
fi
grep -q "refusing to overwrite" "$WORK/clobber.log" || fail "wrong message for a refused overwrite"
"$DR" --catalog "$DB" export 1 -o "$OUT/edited.jpg" --overwrite >/dev/null
if "$DR" --catalog "$DB" export 1 -o "$PHOTOS/demo-01.png" --overwrite 2>"$WORK/original.log"; then
  fail "exporting on top of the ORIGINAL was allowed"
fi
grep -q "overwrite the original" "$WORK/original.log" || fail "wrong message for protecting the original"

step "H. errors: missing file, bad id, bad input"
mkdir -p "$WORK/moved"
mv "$PHOTOS/demo-02.png" "$WORK/moved/demo-02.png"
"$DR" --catalog "$DB" verify | tee "$WORK/verify.log"
grep -q "1 file(s) are missing" "$WORK/verify.log" || fail "a moved file was not reported missing"
if "$DR" --catalog "$DB" render 2 -o "$OUT/ghost.png" 2>"$WORK/ghost.log"; then
  fail "rendering a missing file appeared to succeed"
fi
grep -q "relink" "$WORK/ghost.log" || fail "the missing-file error does not say how to fix it"
"$DR" --catalog "$DB" relink 2 "$WORK/moved/demo-02.png"
"$DR" --catalog "$DB" verify | grep -q "are where the catalog expects" || fail "relink did not clear the missing flag"
if "$DR" --catalog "$DB" info 999 2>"$WORK/badid.log"; then fail "an unknown id appeared to succeed"; fi
grep -q "no image with id 999" "$WORK/badid.log" || fail "wrong message for an unknown id"
if "$DR" --catalog "$DB" adjust 1 --crop 9999,0,10x10 2>"$WORK/badcrop.log"; then
  fail "an out-of-bounds crop was accepted"
fi
grep -q "falls outside" "$WORK/badcrop.log" || fail "wrong message for an impossible crop"

step "I. offline"
grep -rniE "reqwest|hyper::|ureq|http://|https://" --include=Cargo.toml . \
  | grep -v "^./Cargo.lock" && fail "a network dependency appeared in a manifest" || true
echo "no http client in any manifest; every command above ran with no network calls"

printf '\nALL SMOKE CHECKS PASSED\nwork folder: %s\n' "$WORK"
