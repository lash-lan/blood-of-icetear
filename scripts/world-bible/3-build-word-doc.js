// Build the Word edition of the world bible.
//
// The markdown in the repo is the single source for the written half, so this
// parses that file rather than keeping a second copy of the lore. The plate
// catalogue comes from the manifest the image builder writes. Change the
// markdown, run this, and the Word file follows.

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, PageBreak,
  Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType,
  LevelFormat, ShadingType,
} = require("docx");

const MD = String.raw`C:\Users\lashl\Projects\personal-website\docs\world-bible.md`;
const BIBLE = String.raw`C:\Users\lashl\AppData\Local\Temp\tl\bible`;
const OUT = String.raw`C:\Users\lashl\AppData\Local\Temp\tl\Blood of Icetear - World Bible.docx`;

const INK = "1f1b17", DIM = "6b6155", EMBER = "9c3b36", RULE = "cfc6b8";

// ── a small markdown reader, covering only what the source file uses ───────
// Headings, paragraphs, bullets, numbered lists, pipe tables, rules and bold.
function inline(text) {
  const runs = [];
  const re = /\*\*(.+?)\*\*|`(.+?)`/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) runs.push(new TextRun({ text: text.slice(last, m.index), color: INK }));
    if (m[1]) runs.push(new TextRun({ text: m[1], bold: true, color: INK }));
    else runs.push(new TextRun({ text: m[2], font: "Consolas", size: 19, color: DIM }));
    last = re.lastIndex;
  }
  if (last < text.length) runs.push(new TextRun({ text: text.slice(last), color: INK }));
  return runs.length ? runs : [new TextRun({ text: "", color: INK })];
}

const cell = (text, head, width) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: head ? { type: ShadingType.CLEAR, fill: "F2EEE6" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      spacing: { before: 0, after: 0 },
      children: head
        ? [new TextRun({ text: text.replace(/\*\*/g, ""), bold: true, size: 18, color: DIM, allCaps: true })]
        : inline(text),
    })],
  });

function parseMarkdown(src) {
  const lines = src.split(/\r?\n/);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) { i++; continue; }
    if (/^---+\s*$/.test(line)) {                       // horizontal rule
      out.push(new Paragraph({
        spacing: { before: 200, after: 200 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE } },
      }));
      i++; continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = [HeadingLevel.TITLE, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3][h[1].length - 1];
      out.push(new Paragraph({
        heading: level,
        spacing: { before: h[1].length <= 2 ? 360 : 240, after: 140 },
        children: inline(h[2]),
      }));
      i++; continue;
    }
    if (/^>\s?/.test(line)) {                            // blockquote
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      out.push(new Paragraph({
        spacing: { before: 120, after: 160 },
        indent: { left: 360 },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: EMBER, space: 12 } },
        children: inline(buf.join(" ")),
      }));
      continue;
    }
    if (/^\s*\|/.test(line)) {                           // pipe table
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = rows
        .filter((r) => !/^\s*\|[\s:|-]+\|\s*$/.test(r))
        .map((r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
      const cols = Math.max(...cells.map((c) => c.length));
      const total = 9000, w = Math.floor(total / cols);
      out.push(new Table({
        width: { size: total, type: WidthType.DXA },
        columnWidths: Array(cols).fill(w),
        borders: {
          top:    { style: BorderStyle.SINGLE, size: 2, color: RULE },
          bottom: { style: BorderStyle.SINGLE, size: 2, color: RULE },
          left:   { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: RULE },
          insideVertical:   { style: BorderStyle.NONE },
        },
        rows: cells.map((row, ri) => new TableRow({
          tableHeader: ri === 0,
          children: Array.from({ length: cols }, (_, ci) => cell(row[ci] ?? "", ri === 0, w)),
        })),
      }));
      out.push(new Paragraph({ spacing: { after: 160 }, children: [] }));
      continue;
    }
    const b = line.match(/^(\s*)[-*]\s+(.*)$/);
    if (b) {
      out.push(new Paragraph({
        numbering: { reference: "bullets", level: Math.min(1, Math.floor(b[1].length / 2)) },
        spacing: { before: 40, after: 40 },
        children: inline(b[2]),
      }));
      i++; continue;
    }
    const n = line.match(/^\s*\d+\.\s+(.*)$/);
    if (n) {
      out.push(new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        spacing: { before: 40, after: 40 },
        children: inline(n[1]),
      }));
      i++; continue;
    }
    // plain paragraph, joined until a blank line
    const buf = [line];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4}\s|>\s|\s*\||\s*[-*]\s|\s*\d+\.\s|---+\s*$)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    out.push(new Paragraph({ spacing: { before: 80, after: 120 }, children: inline(buf.join(" ")) }));
  }
  return out;
}

// ── the plate catalogue ────────────────────────────────────────────────────
const UNNAMED = /^(chatgpt image|gemini_|generated|image |img|download|unnamed)/i;
const COLS = 3, TOTAL = 9000, CW = Math.floor(TOTAL / COLS);

function plateCell(e) {
  const kids = [];
  if (e) {
    const buf = fs.readFileSync(path.join(BIBLE, e.jpg));
    const w = 150, h = Math.round((e.jh / e.jw) * w);
    kids.push(new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [new ImageRun({ data: buf, type: "jpg", transformation: { width: w, height: h } })],
    }));
    const unnamed = UNNAMED.test(e.name);
    kids.push(new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [new TextRun({
        text: unnamed ? "Unnamed" : e.name,
        size: 17, bold: !unnamed,
        italics: unnamed, color: unnamed ? EMBER : INK,
      })],
    }));
  } else {
    kids.push(new Paragraph({ children: [] }));
  }
  return new TableCell({
    width: { size: CW, type: WidthType.DXA },
    margins: { top: 100, bottom: 160, left: 100, right: 100 },
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
    },
    children: kids,
  });
}

function buildPlates(manifest) {
  const out = [];
  const areas = [];
  for (const e of manifest) if (!areas.includes(e.area)) areas.push(e.area);
  const nUn = manifest.filter((e) => UNNAMED.test(e.name)).length;

  out.push(new Paragraph({ children: [new PageBreak()] }));
  out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 140 },
    children: inline("The plates") }));
  out.push(new Paragraph({ spacing: { after: 240 }, children: inline(
    `${manifest.length} reference images from the archive. **${nUn}** have never been named and are marked. ` +
    `Names given in the web edition are read back and applied here.`) }));

  for (const area of areas) {
    const items = manifest.filter((e) => e.area === area);
    const un = items.filter((e) => UNNAMED.test(e.name)).length;
    out.push(new Paragraph({
      heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 120 },
      children: [
        new TextRun({ text: area, bold: true, color: INK }),
        ...(un ? [new TextRun({ text: `   ${un} unnamed`, size: 17, color: EMBER })] : []),
      ],
    }));
    const rows = [];
    for (let i = 0; i < items.length; i += COLS) {
      rows.push(new TableRow({
        children: Array.from({ length: COLS }, (_, c) => plateCell(items[i + c])),
      }));
    }
    out.push(new Table({
      width: { size: TOTAL, type: WidthType.DXA },
      columnWidths: Array(COLS).fill(CW),
      borders: {
        top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
      },
      rows,
    }));
  }
  return out;
}

// ── assemble ───────────────────────────────────────────────────────────────
const md = fs.readFileSync(MD, "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(BIBLE, "manifest.json"), "utf8"));

const doc = new Document({
  creator: "Lash",
  title: "Blood of Icetear — World Bible",
  description: "The cosmology, the five children of Ra, the six continents, and the reference plates.",
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 420, hanging: 220 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 780, hanging: 220 } } } },
      ] },
      { reference: "numbers", levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 420, hanging: 220 } } } },
      ] },
    ],
  },
  styles: {
    default: {
      document: { run: { font: "Georgia", size: 21, color: INK }, paragraph: { spacing: { line: 300 } } },
      title:     { run: { font: "Georgia", size: 48, bold: true, color: INK } },
      heading1:  { run: { font: "Georgia", size: 30, bold: true, color: INK } },
      heading2:  { run: { font: "Georgia", size: 24, bold: true, color: INK } },
      heading3:  { run: { font: "Georgia", size: 21, bold: true, color: DIM } },
    },
  },
  sections: [{
    properties: { page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    children: [...parseMarkdown(md), ...buildPlates(manifest)],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log(`wrote ${path.basename(OUT)}  ${(buf.length / 1e6).toFixed(1)} MB  (${manifest.length} plates)`);
});
