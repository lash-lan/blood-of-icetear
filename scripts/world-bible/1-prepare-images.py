# Resize the Fantasy World reference art for the web, and build a manifest.
#
# 319 originals at 757 MB cannot go on a page. An Artifact version allows 255
# files and 64 MB, and the page itself must stay under 16 MB, so the pictures
# ship as separate files rather than data URIs and every one of them is cut
# down to something a phone will actually load.
#
# Names come from the filenames, which are already good: "Ra.webp" and
# "Aetheris - Father of the Skys.png" both carry the name and, where there is
# one, the title. The folder gives the category.

from PIL import Image
from pathlib import Path
import json, re, shutil

SRC = Path(r"C:\Users\lashl\OneDrive\Desktop\Fantasy World IP\Fantasy World Vision")
OUT = Path(r"C:\Users\lashl\AppData\Local\Temp\tl\bible")
IMG = OUT / "img"
LONG_EDGE = 760
QUALITY = 76
LIMIT = 251          # leave headroom under the 255 file cap for the page itself
# Humans is the largest folder and the least load-bearing for the cosmology,
# so it yields slots to the Elven Culture plates rather than crowding them out.
CAP = {"Humans": 16}

# Category order and labels, by the folder the picture sits in.
AREAS = [
    ("Cosmology/Priomodial Entities",            "Primordial Entities", 1),
    ("Cosmology/Titans - Gen 1 (Primordial Titans)", "Primordial Titans", 2),
    ("Cosmology/Titans - Gen 2 (Universal Titans)",  "Universal Titans", 3),
    ("Cosmology/Titans - Gen 3 (World Titans)",      "World Titans", 4),
    ("Cosmology/The Gods - Gen 2 - Prime Gods",      "Prime Gods", 5),
    ("Character References/The Dragon Gods",     "The Dragon Gods", 6),
    ("Character References/Black Sea Angels",    "Black Sea Angels", 7),
    ("Character References/Dragons",             "Dragons", 8),
    ("Character References/Ancient Beings",      "Ancient Beings", 9),
    ("Character References/Beast Kings",         "Beast Kings", 10),
    ("Character References/Elu",                 "Elu", 11),
    ("Character References/Divine",              "Divine", 12),
    ("Character References/God's Blood",         "God's Blood", 13),
    ("Character References/Devils",              "Devils", 14),
    ("Character References/Demons",              "Demons", 15),
    ("Character References/Vampires",            "Vampires", 16),
    ("Character References/Humans",              "Humans", 17),
    ("Elven(Elu) Culture",                       "Elven Culture", 18),
]

def tidy(stem: str) -> str:
    """Filenames already carry the name. Clean them, do not rewrite them."""
    s = stem.replace("_", " ").strip()
    s = re.sub(r"\s*\(\d+\)$", "", s)          # trailing "(2)"
    s = re.sub(r"[-\s]*\d+$", "", s) if re.search(r"[-\s]\d$", s) else s
    s = re.sub(r"\s{2,}", " ", s)
    return s.strip()

def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:70]

if OUT.exists():
    shutil.rmtree(OUT)
IMG.mkdir(parents=True)

entries, seen, skipped = [], set(), 0
for rel, label, order in AREAS:
    folder = SRC / rel
    if not folder.exists():
        continue
    files = sorted(
        [p for p in folder.rglob("*") if p.suffix.lower() in (".png", ".webp", ".jpg", ".jpeg")],
        key=lambda p: p.name.lower(),
    )
    taken = 0
    for p in files:
        if len(entries) >= LIMIT or taken >= CAP.get(label, 10**6):
            skipped += 1
            continue
        name = tidy(p.stem)
        key = (label, name.lower())
        if key in seen:                        # same name twice in a folder
            skipped += 1
            continue
        seen.add(key)
        taken += 1
        out_name = f"{slug(label)}--{slug(name)}.webp"
        try:
            im = Image.open(p).convert("RGB")
        except Exception:
            skipped += 1
            continue
        w, h = im.size
        scale = LONG_EDGE / max(w, h)
        if scale < 1:
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        im.save(IMG / out_name, "WEBP", quality=QUALITY, method=5)
        entries.append({
            "name": name,
            "area": label,
            "order": order,
            "file": f"img/{out_name}",
            "w": im.width,
            "h": im.height,
        })

(OUT / "manifest.json").write_text(json.dumps(entries, indent=1), encoding="utf-8")
total = sum(f.stat().st_size for f in IMG.iterdir())
by_area = {}
for e in entries:
    by_area[e["area"]] = by_area.get(e["area"], 0) + 1
print(f"{len(entries)} images, {total/1e6:.1f} MB, {skipped} skipped")
for a, n in by_area.items():
    print(f"   {a:24} {n}")
