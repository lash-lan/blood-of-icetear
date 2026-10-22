# Builds the business plan's diagrams as SVG, in the Chronicle palette.
import os, html

OUT = os.path.dirname(os.path.abspath(__file__))

PAPER, RAISED = "#0a0908", "#16140f"
GOLD, GOLD_DEEP = "#c8a96a", "#9a7f45"
IVORY, SOFT, DIM, FAINT = "#f2ece1", "#ddd4c5", "#a89e8f", "#6f6759"
LINE, GREY = "#2a241a", "#4a443a"
SANS = "Inter, 'Liberation Sans', sans-serif"

def esc(s): return html.escape(str(s))

def svg(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}">'
            f'<rect width="{w}" height="{h}" fill="{PAPER}"/>{body}</svg>')

def txt(x, y, s, size=22, fill=IVORY, anchor="start", weight="400", track=0, family=SANS):
    ls = f' letter-spacing="{track}"' if track else ""
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{family}" font-size="{size}" '
            f'font-weight="{weight}" text-anchor="{anchor}"{ls}>{esc(s)}</text>')

def eyebrow(x, y, s):
    return txt(x, y, s.upper(), 17, GOLD_DEEP, weight="500", track=4)

def box(x, y, w, h, fill=RAISED, stroke=LINE, sw=2):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def arrow(x1, y, x2, colour=GOLD_DEEP):
    head = (f'<path d="M {x2} {y} L {x2-14} {y-7} L {x2-14} {y+7} Z" fill="{colour}"/>')
    return f'<line x1="{x1}" y1="{y}" x2="{x2-12}" y2="{y}" stroke="{colour}" stroke-width="2"/>{head}'

def arrow_down(x, y1, y2, colour=GOLD_DEEP):
    head = (f'<path d="M {x} {y2} L {x-7} {y2-14} L {x+7} {y2-14} Z" fill="{colour}"/>')
    return f'<line x1="{x}" y1="{y1}" x2="{x}" y2="{y2-12}" stroke="{colour}" stroke-width="2"/>{head}'

def wrap(s, n):
    words, lines, cur = s.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if len(t) > n and cur: lines.append(cur); cur = w
        else: cur = t
    if cur: lines.append(cur)
    return lines

def title(w, t, sub=None):
    o = eyebrow(60, 58, "the chronicle company")
    o += txt(60, 108, t, 38, IVORY, weight="500")
    if sub: o += txt(60, 146, sub, 21, DIM)
    o += f'<line x1="60" y1="170" x2="{w-60}" y2="170" stroke="{LINE}" stroke-width="2"/>'
    return o

# ---------------------------------------------------------------- 1. the journey
def d1():
    W, H = 1600, 760
    o = title(W, "How a Chronicle reaches the family",
              "Four steps. Only the first one involves you.")
    steps = [
        ("1", "You and Claude", "The writing, the photos\nand the site are made.", "Your laptop"),
        ("2", "GitHub", "Every page, photo and\nrecording is filed here.", "The filing cabinet"),
        ("3", "Cloudflare", "Shown from the nearest\nof about 300 cities.", "The shop window"),
        ("4", "The family", "They open a link. It\nreads itself aloud.", "Anywhere"),
    ]
    bw, gap, y, bh = 315, 80, 250, 300
    x = 50
    for n, name, body, foot in steps:
        o += box(x, y, bw, bh)
        o += f'<line x1="{x}" y1="{y}" x2="{x+bw}" y2="{y}" stroke="{GOLD}" stroke-width="3"/>'
        o += txt(x+28, y+58, n, 30, GOLD, weight="600")
        o += txt(x+28, y+104, name, 27, IVORY, weight="500")
        ly = y+152
        for ln in body.split("\n"):
            o += txt(x+28, ly, ln, 19, SOFT); ly += 28
        o += eyebrow(x+28, y+bh-28, foot)
        if x + bw < W - 120:
            o += arrow(x+bw+22, y+bh/2, x+bw+gap-22)
        x += bw + gap
    o += txt(60, 640, "The filing cabinet is also your backup: every older version is kept forever.", 21, SOFT)
    o += txt(60, 676, "Change anything and the shop window rebuilds itself in about five minutes.", 21, SOFT)
    o += txt(60, 712, "Nothing is ever uploaded by hand.", 21, GOLD)
    return W, H, o

# ------------------------------------------------------------- 2. who makes what
def d2():
    W, H = 1600, 790
    o = title(W, "Who makes what", "Three makers. One finished Chronicle.")
    makers = [
        ("Claude Code", "Writes the website itself:\nevery page, the opening film,\nthe read-aloud machinery."),
        ("ChatGPT", "Makes and improves pictures.\nSharpens the writing before\nit goes on the page."),
        ("Text to speech", "Reads the whole Chronicle\naloud in a real voice. Under\nfive dollars a site."),
    ]
    bw, gap, y, bh = 440, 70, 230, 232
    x = 60
    centres = []
    for name, body in makers:
        o += box(x, y, bw, bh)
        o += f'<line x1="{x}" y1="{y}" x2="{x+bw}" y2="{y}" stroke="{GOLD}" stroke-width="3"/>'
        o += txt(x+30, y+62, name, 27, IVORY, weight="500")
        ly = y+106
        for ln in body.split("\n"):
            o += txt(x+30, ly, ln, 19, SOFT); ly += 28
        centres.append(x + bw/2)
        x += bw + gap
    for c in centres:
        o += arrow_down(c, y+bh+16, 600)
    o += box(60, 600, W-120, 130, RAISED, GOLD, 3)
    o += txt(W/2, 664, "THE CHRONICLE", 36, GOLD, anchor="middle", weight="600", track=8)
    o += txt(W/2, 702, "One life, researched, written, illustrated, narrated and published", 20, SOFT, anchor="middle")
    return W, H, o

# ------------------------------------------------------- 3. one client, one stack
def d3():
    W, H = 1600, 980
    o = title(W, "Every client is kept completely separate",
              "Nothing is shared between families. One leak reaches nothing else.")
    rows = [
        ("Their private store", "All their writing, photographs and audio"),
        ("Their own hosting", "Serves only their site"),
        ("Their own web address", "Bought in their name"),
        ("Their two passwords", "Only ever typed by you"),
    ]
    cw, gap, top = 460, 50, 230
    names = ["The Perera family", "The Lim family", "A company founder"]
    for i, nm in enumerate(names):
        x = 60 + i*(cw+gap)
        o += eyebrow(x, top-16, nm)
        y = top
        for label, note in rows:
            o += box(x, y, cw, 118)
            o += txt(x+26, y+46, label, 22, IVORY, weight="500")
            o += txt(x+26, y+80, note, 17, DIM)
            y += 132
    o += f'<line x1="60" y1="838" x2="{W-60}" y2="838" stroke="{LINE}" stroke-width="2"/>'
    o += eyebrow(60, 812, "shared, and belongs to your business, never to a client")
    o += txt(60, 886, "The template  ·  The consent pack  ·  The contract  ·  Claude  ·  ChatGPT  ·  The narration account",
             22, GOLD)
    o += txt(60, 926, "A client's material can never appear on another client's site.", 20, SOFT)
    return W, H, o

# ------------------------------------------------------------------- 4. the nine
def d4():
    W, H = 1600, 1190
    o = title(W, "The nine stages of a commission",
              "In order. The first one is never skipped, for any fee.")
    phases = [
        ("Agree", [("1", "Commission and consent", "Signed permission from every living person: their picture, their words, their voice."),
                   ("2", "Collect", "Interviews, photographs, documents. Every fact gets a source you can point at."),
                   ("3", "Write", "All the writing into one file. Every unknown left as a marked gap.")]),
        ("Make", [("4", "Photographs", "Three web sizes of each, made automatically."),
                  ("5", "The still site", "Finished and readable, with no animation at all. This is the floor."),
                  ("6", "The film", "Built on top of the floor, never instead of it."),
                  ("7", "Narration", "Only once the words are final.")]),
        ("Deliver", [("8", "Verify, then show them", "Phone and laptop. Publish only on their word."),
                     ("9", "Hand over", "Their editing guide, their password, and who inherits it all.")]),
    ]
    y = 230
    for phase, items in phases:
        o += eyebrow(60, y, phase)
        y += 26
        for n, name, body in items:
            o += f'<circle cx="86" cy="{y+26}" r="24" fill="none" stroke="{GOLD}" stroke-width="2"/>'
            o += txt(86, y+34, n, 22, GOLD, anchor="middle", weight="600")
            o += txt(134, y+20, name, 25, IVORY, weight="500")
            o += txt(134, y+52, body, 19, SOFT)
            y += 84
        y += 22
    return W, H, o

# ------------------------------------------------- 5. the two markets (emphasis)
def d5():
    W, H = 1600, 860
    o = title(W, "What this market already pays",
              "One bar is yours. The rest are what families pay today.")
    data = [
        ("Memorial website template", 99, "49 to 99 dollars", False),
        ("Cheap AI memoir app", 349, "149 to 349 dollars", False),
        ("Freelance one page website", 2500, "800 to 2,500 dollars", False),
        ("StoryTerrace, entry memoir", 3250, "from 3,250 dollars", False),
        ("YOUR CHRONICLE", 9000, "5,500 to 9,000 dollars", True),
        ("LifeBook Memoirs", 42000, "9,000 to 42,000 dollars", False),
        ("Memoir ghostwriting", 50000, "18,000 to 50,000 dollars", False),
    ]
    mx = 50000
    lx, bx = 60, 560
    bw_max = W - bx - 420
    y = 236
    for label, val, note, mine in data:
        colour = GOLD if mine else GREY
        ink = IVORY if mine else SOFT
        w = max(4, round(bw_max * val / mx))
        o += txt(lx, y+30, label, 23, ink, weight="600" if mine else "400")
        o += f'<rect x="{bx}" y="{y+8}" width="{w}" height="30" fill="{colour}" rx="4"/>'
        o += txt(bx + w + 20, y+31, note, 21, GOLD if mine else DIM, weight="500" if mine else "400")
        y += 66
    o += f'<line x1="{lx}" y1="{y+10}" x2="{W-60}" y2="{y+10}" stroke="{LINE}" stroke-width="2"/>'
    o += txt(lx, y+60, "The two longest bars are printed books. No audio, no film, no live", 22, SOFT)
    o += txt(lx, y+92, "address, and finished the day they print.", 22, SOFT)
    o += txt(lx, y+136, "Never let a family compare you to the bar at the top of this picture.", 22, GOLD)
    return W, H, o

# ------------------------------------------------------- 6. cost against price
def d6():
    W, H = 1600, 620
    o = title(W, "What it costs you, and what it is worth",
              "The gap between these three numbers is the business.")
    tiles = [
        ("Costs you to run a site", "15", "US dollars a year", "The web address. Everything else is free."),
        ("You charge to build it", "5,500 to 9,000", "US dollars, once", "A commissioned biography, not a website."),
        ("You charge to look after it", "400 to 800", "US dollars a year", "Thirty families is 12,000 to 24,000 a year."),
    ]
    tw, gap, y, th = 460, 50, 240, 290
    x = 60
    for label, big, unit, note in tiles:
        o += box(x, y, tw, th)
        o += f'<line x1="{x}" y1="{y}" x2="{x+tw}" y2="{y}" stroke="{GOLD}" stroke-width="3"/>'
        o += eyebrow(x+28, y+48, label)
        size = 64 if len(big) <= 4 else 40
        o += txt(x+28, y+134, big, size, GOLD, weight="600")
        o += txt(x+28, y+174, unit, 21, SOFT)
        ly = y+226
        for ln in wrap(note, 34):
            o += txt(x+28, ly, ln, 18, DIM); ly += 26
        x += tw + gap
    return W, H, o

for i, fn in enumerate([d1, d2, d3, d4, d5, d6], 1):
    w, h, body = fn()
    p = os.path.join(OUT, f"fig{i}.svg")
    open(p, "w", encoding="utf-8").write(svg(w, h, body))
    print("wrote", p, w, "x", h)
