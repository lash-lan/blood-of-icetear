const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, ImageRun,
  TableOfContents, LevelFormat, PositionalTab, PositionalTabAlignment,
  PositionalTabLeader, Footer, PageNumber,
} = require("docx");

const DIA = "/home/user/work/dia";
const GOLD = "9A7F45", INK = "1A1714", MUTED = "5F5A52", RULE = "D8D2C6";
const BODY = 22, SMALL = 19;          // half-points
const CONTENT_DXA = 9026;

// ---------------------------------------------------------------- helpers
const P = (text, o = {}) => new Paragraph({
  spacing: { after: o.after ?? 140, line: o.line ?? 290 },
  alignment: o.align,
  indent: o.indent,
  border: o.border,
  children: [new TextRun({
    text, size: o.size ?? BODY, bold: o.bold, italics: o.italics,
    color: o.color ?? INK, font: o.font ?? "Calibri", allCaps: o.caps,
    characterSpacing: o.track,
  })],
});

const RUNS = (parts, o = {}) => new Paragraph({
  spacing: { after: o.after ?? 140, line: 290 },
  children: parts.map(p => new TextRun({
    text: p.t, size: p.size ?? BODY, bold: p.b, italics: p.i,
    color: p.c ?? INK, font: "Calibri",
  })),
});

const H1 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 420, after: 200 },
  children: [new TextRun({ text: t, size: 34, bold: true, color: INK, font: "Georgia" })],
});
const H2 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 140 },
  children: [new TextRun({ text: t, size: 26, bold: true, color: INK, font: "Georgia" })],
});
const H3 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_3, spacing: { before: 220, after: 110 },
  children: [new TextRun({ text: t, size: 23, bold: true, color: GOLD, font: "Calibri" })],
});

const EYEBROW = (t) => new Paragraph({
  spacing: { before: 200, after: 90 },
  children: [new TextRun({ text: t.toUpperCase(), size: 17, bold: true,
    color: GOLD, font: "Calibri", characterSpacing: 36 })],
});

const BULLETS = (items) => items.map(t => new Paragraph({
  numbering: { reference: "dots", level: 0 },
  spacing: { after: 90, line: 280 },
  children: [new TextRun({ text: t, size: BODY, color: INK, font: "Calibri" })],
}));

let numInstance = 0;
const NUMBERS = (items) => { const inst = ++numInstance; return items.map(t => new Paragraph({
  numbering: { reference: "nums", level: 0, instance: inst },
  spacing: { after: 90, line: 280 },
  children: [new TextRun({ text: t, size: BODY, color: INK, font: "Calibri" })],
})); };

const RULE_P = () => new Paragraph({
  spacing: { before: 60, after: 180 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE } },
  children: [new TextRun({ text: "", size: 2 })],
});

// A figure: full-width image plus a caption.
function FIG(file, h, caption) {
  const w = 600, ht = Math.round(w * h / 1600);
  return [
    new Paragraph({
      spacing: { before: 220, after: 80 }, alignment: AlignmentType.CENTER,
      children: [new ImageRun({
        type: "png", data: fs.readFileSync(`${DIA}/${file}`),
        transformation: { width: w, height: ht },
      })],
    }),
    new Paragraph({
      spacing: { after: 260 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: caption, size: SMALL, italics: true, color: MUTED, font: "Calibri" })],
    }),
  ];
}

// A table. cols = array of widths in DXA summing to CONTENT_DXA.
function TBL(header, rows, cols) {
  const cell = (text, { b = false, head = false, c } = {}, i = 0) => new TableCell({
    width: { size: cols[i], type: WidthType.DXA },
    shading: head ? { type: ShadingType.CLEAR, fill: "F3EFE7", color: "auto" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
    },
    children: [new Paragraph({
      spacing: { after: 0, line: 260 },
      children: [new TextRun({ text, size: SMALL, bold: b || head,
        color: c ?? (head ? GOLD : INK), font: "Calibri" })],
    })],
  });
  return new Table({
    columnWidths: cols,
    width: { size: CONTENT_DXA, type: WidthType.DXA },
    rows: [
      new TableRow({ tableHeader: true,
        children: header.map((t, i) => cell(t, { head: true }, i)) }),
      ...rows.map(r => new TableRow({
        children: r.map((t, i) => cell(String(t), { b: i === 0 && r.bold }, i)) })),
    ],
  });
}
const GAP = () => new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "", size: 2 })] });
const BREAK = () => new Paragraph({ children: [new PageBreak()] });

// ---------------------------------------------------------------- content
const body = [];
const add = (...xs) => xs.flat().forEach(x => body.push(x));

// ---- cover
add(new Paragraph({ spacing: { before: 2200, after: 120 },
  children: [new TextRun({ text: "THE CHRONICLE COMPANY", size: 20, bold: true, color: GOLD, font: "Calibri", characterSpacing: 60 })] }));
add(new Paragraph({ spacing: { after: 160 },
  children: [new TextRun({ text: "Business Proposal and Plan", size: 56, color: INK, font: "Georgia" })] }));
add(new Paragraph({ spacing: { after: 420 },
  children: [new TextRun({ text: "Commissioned private biographies, delivered as living web archives", size: 25, italics: true, color: MUTED, font: "Georgia" })] }));
add(RULE_P());
add(RUNS([{ t: "Prepared for  ", c: MUTED, size: SMALL }, { t: "Lashlan Hemachandra", b: true, size: SMALL }], { after: 70 }));
add(RUNS([{ t: "Date  ", c: MUTED, size: SMALL }, { t: "22 October 2026", size: SMALL }], { after: 70 }));
add(RUNS([{ t: "Status  ", c: MUTED, size: SMALL }, { t: "Draft for external review", size: SMALL }], { after: 70 }));
add(RUNS([{ t: "Evidence  ", c: MUTED, size: SMALL }, { t: "One live reference build, market research dated 17 October 2026, and a full audit of the working code", size: SMALL }], { after: 70 }));
add(BREAK());

// ---- note to reviewer
add(H1("Note to the reviewer"));
add(P("This document is deliberately self-contained, so it can be criticised without any other file."));
add(P("Please be adversarial. The author has one built site, no paying client, no testimonial and no reusable template. Specific questions are listed in Section 16. Attack the pricing, the capacity assumptions and the legal exposure hardest, because those are where the author's confidence most exceeds the author's evidence."));
add(P("Two writing conventions are used throughout and are deliberate: no em dashes, and no semicolons."));
add(GAP());
add(H2("Contents"));
const CONTENTS = [
  ["1.", "Executive summary"], ["2.", "The product"], ["3.", "Market analysis"],
  ["4.", "Positioning and brand"], ["5.", "Pricing and packages"], ["6.", "Unit economics"],
  ["7.", "Financial plan, year one"], ["8.", "Delivery process"],
  ["9.", "Technical infrastructure, per client"], ["10.", "Go to market"],
  ["11.", "Operating model"], ["12.", "SWOT analysis"], ["13.", "Risk register"],
  ["14.", "Ninety day plan"], ["15.", "What does not yet exist"],
  ["16.", "Questions for the reviewer"], ["17.", "Sources"],
];
CONTENTS.forEach(([n, t]) => add(RUNS([
  { t: n + "  ", c: GOLD, b: true }, { t: t },
], { after: 80 })));
add(GAP());
add(RUNS([{ t: "Six diagrams are set through the document, at Sections 1, 3, 8 and 9.", i: true, c: MUTED, size: SMALL }]));
add(BREAK());

// ---- 1 exec summary
add(H1("1. Executive summary"));
add(H3("The business"));
add(P("Commissioned private biographies, delivered as living web archives rather than printed books. Each one is called a Chronicle: one person's life, researched, written, illustrated with their own photographs, narrated aloud in a real voice, published at a permanent web address, and editable by the family forever afterwards."));
add(FIG("fig2.png", 790, "Figure 1. Three makers, one finished Chronicle."));
add(H3("The insight"));
add(P("There are two markets for this, priced roughly a hundred times apart."));
add(P("Memorial websites are a commodity: 49 to 99 US dollars one-off, or 4 to 12 pounds a month, for a fill-in-the-blanks template. Some free tiers display advertising beside a dead person's photograph."));
add(P("Commissioned life stories are a luxury: 3,250 to 50,000 US dollars for a ghostwritten memoir or a researched family history. Every single one of those is a printed book. None has audio, none has motion, none has a live address, and none can be added to after it ships."));
add(P("The Chronicle has the second market's depth and the first market's delivery cost. It is positioned, priced and sold as the second."));
add(H3("The offer"));
add(TBL(["Tier", "Export price (USD)", "Local price (MYR)"], [
  ["The Chronicle", "5,500 to 9,000", "14,000 to 22,000"],
  ["Add a cloned voice, per person", "1,800 to 3,000", "4,000 to 7,000"],
  ["The Family Archive, several Chronicles", "15,000 and up", "35,000 and up"],
  ["The Founder Chronicle, corporate", "8,000 to 25,000", "priced in USD"],
  ["Custody and care, annual", "400 to 800 a year", "1,200 to 2,400 a year"],
], [3800, 2700, 2526]));
add(GAP());
add(H3("The economics"));
add(P("Infrastructure cost per client site is about 15 US dollars a year. Gross margin on a Chronicle is above 95 percent before the author's own time. The recurring care fee is the real business: thirty sites under care is 12,000 to 24,000 US dollars a year for a few hours of monthly work."));
add(FIG("fig6.png", 620, "Figure 2. The gap between these three numbers is the business."));
add(H3("The ask of this plan"));
add(P("Validate or destroy three assumptions: that families will pay biography prices for a web deliverable, that one person can deliver eight to twelve Chronicles a year, and that the consent framework is sufficient to publish living people's faces, letters and cloned voices commercially."));
add(BREAK());

// ---- 2 product
add(H1("2. The product"));
add(H2("2.1 What a Chronicle is"));
add(P("A single long page telling one person's life in a fixed emotional order: the name, the journey, the man or woman, the spouse, the children, the wider family, the friends and the mentored, what they built, what they believe, the legacy, the occasion, the future."));
add(P("A visitor should arrive impressed by an accomplished person and leave feeling they know a human being."));
add(H2("2.2 The five things a competitor cannot copy quickly"));
add(H3("1. Nothing is invented"));
add(P("Not one quotation, memory, date, award or relationship. Where a fact is not known, the page shows a quiet, marked gap that renders as nothing until the family fills it. Every fact has a source recorded in a private file the reader never sees. An unsourceable fact does not ship at all, because there is no hedging sentence left to carry it."));
add(P("This is the central promise. It is also the main cost, and the main defence against AI-generated competitors, who will cheerfully produce a beautiful invented paragraph about a stranger's father."));
add(H3("2. It reads itself aloud"));
add(P("A narrator's voice reads the whole page, highlighting each line and scrolling the page to follow, over a music bed that ducks under the words. An eighty-year-old relative presses one button."));
add(H3("3. It opens with a film"));
add(P("The family's own photographs, directed by the visitor's scroll. Scroll is the clock, so scrolling back rewinds it exactly. It never hijacks the scroll and it never performs. It reveals."));
add(H3("4. The family edits it themselves"));
add(P("All the writing lives in one plain text file with a plain-English guide. Adding a grandchild's letter or fifty archive photographs never requires a developer again."));
add(H3("5. Total visitor privacy"));
add(P("No tracking script, no cookie, no third-party anything on any page. The owner still gets reader numbers, because they are read from the hosting provider's own aggregated traffic data rather than collected from visitors."));
add(H2("2.3 What it is not"));
add(P("Not a memorial site. The reference build is for a living man, as a birthday tribute, and nothing on it reads like a memorial. The product serves living subjects first. That is both a differentiator and an ethical boundary: a living person can consent, record their own voice and correct the record. A dead one cannot."));
add(BREAK());

// ---- 3 market
add(H1("3. Market analysis"));
add(FIG("fig5.png", 860, "Figure 3. What this market already pays. One bar is yours."));
add(H2("3.1 Market A: memorial website platforms"));
add(TBL(["Provider", "Price"], [
  ["Legacy.com", "49 USD first year, then 19 USD a year"],
  ["Keeper Plus", "75 to 99 USD one-off"],
  ["Online-Tribute", "95 USD one-off, or 8 USD a month"],
  ["UK monthly plans, generally", "4 to 12 GBP a month"],
  ["Free tiers", "Free, commonly with advertising"],
], [3800, 5226]));
add(GAP());
add(P("Templates, self-service, no research, no craft. This is the trap. Any client who mentally files the Chronicle here will refuse to pay for it, and the failure will be one of positioning rather than price."));
add(H2("3.2 Market B: commissioned life stories"));
add(TBL(["Provider or benchmark", "Price"], [
  ["StoryTerrace, entry package", "from 3,250 USD"],
  ["StoryTerrace, professional tier", "from 24,000 USD"],
  ["LifeBook Memoirs", "9,000 to 42,000 USD, sources disagree"],
  ["Memoir ghostwriting, Reedsy 2026 data", "18,000 to 50,000 USD"],
  ["Professional genealogy, hourly", "90 to 250 USD an hour"],
  ["Multi-generational family history, archival", "20,000 USD and up"],
  ["Legacy Tree, premium package", "48,750 USD"],
  ["Photo archive preservation packages", "1,295 to 7,500 USD and up"],
  ["Corporate founder or CEO tribute book", "10,000 to 50,000 USD"],
], [4600, 4426]));
add(GAP());
add(P("All printed books. The Chronicle delivers more, for less marginal cost, with a living artefact at the end."));
add(H2("3.3 Market C: bespoke web design, for reference"));
add(TBL(["Tier", "Price"], [
  ["Freelance single-scroll one-page site", "800 to 2,500 USD"],
  ["Agency small custom site", "3,000 to 15,000 USD"],
  ["Boutique landing page, 1 to 5 pages", "3,000 to 10,000 USD"],
  ["Premium package with bespoke motion design", "20,000 to 60,000 USD and up"],
  ["Agency hourly, US, Canada, Australia", "100 to 149 USD an hour"],
], [4600, 4426]));
add(GAP());
add(P("Two findings matter. A fully custom build costs two to four times a template-based one. And motion design is normally billed as a separate line item because it is the most labour-intensive part of a site. The Chronicle's scroll-directed film is exactly that line item, and it is already engineered."));
add(H2("3.4 The home market, and its ceiling"));
add(TBL(["Tier, Malaysian agency rates 2026", "Price"], [
  ["Template corporate package", "from RM 1,999"],
  ["Freelance business website", "RM 2,000 to 8,000"],
  ["SME corporate site, 6 to 10 pages", "RM 6,000 to 14,000"],
  ["Corporate site, 10 to 20 pages", "RM 8,000 to 20,000"],
  ["Multinational, bilingual, 20 to 30 pages", "RM 18,000 to 45,000"],
  ["Annual hosting and maintenance", "RM 1,200 to 6,000 a year"],
], [4600, 4426]));
add(GAP());
add(P("A Malaysian buyer's instinct for a website about their father anchors near RM 8,000 to 20,000, roughly 1,800 to 4,500 USD. That is the top of the local web market and below the floor of the global biography market."));
add(P("Two strategic conclusions follow."));
add(P("First, the annual maintenance line is already normalised locally at RM 1,200 to 6,000. The true cost of running a Chronicle is about RM 70 a year. The care fee is therefore expected rather than resented, and it is pure margin."));
add(P("Second, the serious money is not local. It is the diaspora."));
add(H2("3.5 The buyer"));
add(P("The buyer is not the subject. The subject is an ageing parent. The buyer is their successful adult child, typically 35 to 55, living in Singapore, London, Sydney, Dubai, Toronto or California, earning in a strong currency, carrying guilt about distance, and with a milestone approaching."));
add(P("This person already buys 5,000 dollar watches as gifts. The Chronicle competes with those, not with a website."));
add(H2("3.6 The occasion"));
add(P("Nobody wakes up wanting a heritage website. They want something for:"));
add(BULLETS([
  "a 60th, 70th, 80th or 90th birthday",
  "a retirement",
  "a 40th or 50th wedding anniversary",
  "a company founding anniversary or a founder's departure",
  "a serious diagnosis",
]));
add(P("Each of these has money already allocated, a hard deadline, and several relatives willing to split the cost. The corporate research is explicit that heritage projects should begin twelve to eighteen months before an anniversary date. Sell against the calendar, not against need."));
add(H2("3.7 Competitive landscape"));
add(TBL(["Competitor type", "Their weakness"], [
  ["Memorial platforms", "Templates, self-service, no research, advertising on free tiers"],
  ["Memoir ghostwriters", "Printed only, no audio, no visuals, cannot be added to"],
  ["Genealogy firms", "Records and charts, not narrative or design"],
  ["Web agencies", "Beautiful, but will invent copy and have no sourcing discipline"],
  ["AI memoir apps, 149 to 349 USD", "Cheap, generic, and will fabricate. The direct threat to the category's credibility, and the strongest argument for the integrity rule"],
], [3200, 5826]));
add(GAP());
add(P("The gap: nobody is selling a researched, sourced, narrated, living, family-maintainable archive. That is the whole opportunity."));
add(BREAK());

// ---- 4 positioning
add(H1("4. Positioning and brand"));
add(H2("4.1 The positioning statement"));
add(new Paragraph({
  spacing: { before: 120, after: 200 }, indent: { left: 400 },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 12 } },
  children: [new TextRun({ text: "For families with a life worth recording, a Chronicle is a commissioned private biography, delivered as a living archive the family keeps forever and adds to themselves. Unlike a memoir, it speaks aloud and never finishes. Unlike a website, nothing in it is invented.", size: 24, italics: true, color: INK, font: "Georgia" })],
}));
add(H2("4.2 Language discipline"));
add(P("The word website costs roughly eighty percent of the perceived value. Every piece of marketing says Chronicle, archive, commission or record. The deliverable is commissioned, not built. The client is a commissioning family, not a customer."));
add(H2("4.3 Proof assets needed before selling"));
add(NUMBERS([
  "The reference site, with the family's written permission to show it. This is not optional and has not yet been obtained.",
  "A one-page written case study.",
  "A 60 to 90 second screen recording with the narration playing.",
  "A redacted sample sources file, to demonstrate the integrity rule physically rather than rhetorically.",
]));
add(BREAK());

// ---- 5 pricing
add(H1("5. Pricing and packages"));
add(H2("5.1 Tier 1: The Chronicle"));
add(RUNS([{ t: "5,500 to 9,000 USD  /  RM 14,000 to 22,000", b: true, c: GOLD, size: 24 }]));
add(P("Includes: family interviews, research and a written source record, the full written narrative, photograph restoration and archiving with verification levels, the opening film, the complete site, professional-voice narration with synchronised scrolling, the private reader dashboard, the family editing handover, and twelve months of care."));
add(P("Positioned above StoryTerrace's entry tier and below LifeBook's floor, delivering more than either."));
add(H2("5.2 Tier 2: Voices"));
add(RUNS([{ t: "1,800 to 3,000 USD per voice  /  RM 4,000 to 7,000", b: true, c: GOLD, size: 24 }]));
add(P("The subject's own voice, or a named family member's, cloned from a recording they make themselves and consent to in writing, reading their own words."));
add(P("Sold per voice. Only ever for a living person who has personally consented and personally recorded. Never for the deceased. This is a commercial rule and an ethical one, and it is not negotiable for any fee."));
add(H2("5.3 Tier 3: The Family Archive"));
add(RUNS([{ t: "15,000 USD and up  /  RM 35,000 and up", b: true, c: GOLD, size: 24 }]));
add(P("Several Chronicles, the family tree joining them, a shared photograph archive, and a structure designed to be extended for generations. Scoped per family."));
add(P("Competes with the 20,000 dollar multi-generational history and the 48,750 dollar genealogy package, and beats both on being alive rather than printed."));
add(H2("5.4 The Founder Chronicle, corporate"));
add(RUNS([{ t: "8,000 to 25,000 USD", b: true, c: GOLD, size: 24 }]));
add(P("The same product, sold to a company for a founder, a retiring chief executive, or an anniversary. Corporate buyers have a budget line and no emotional hesitation about price. The market already pays 10,000 to 50,000 for the equivalent book, and companies are increasingly commissioning these instead of a retirement gift."));
add(P("Advantage over a book: it can be sent to every employee, client and shareholder as a link."));
add(H2("5.5 Custody and care"));
add(RUNS([{ t: "400 to 800 USD a year  /  RM 1,200 to 2,400 a year", b: true, c: GOLD, size: 24 }]));
add(P("Covers the web address, hosting, backups, uptime monitoring, small text and photograph changes, and maintenance of the written succession arrangement."));
add(P("True cost: about 15 USD a year. Local agencies already charge RM 1,200 to 6,000 for this exact line."));
add(H2("5.6 Payment terms"));
add(BULLETS([
  "50 percent on signature, before research begins.",
  "40 percent on approval of the still site, before narration.",
  "10 percent on going live.",
  "Care billed annually in advance, with the first year included in the build fee.",
]));
add(P("Rationale: the research stage is the largest irrecoverable cost, so it is paid for before it is incurred."));
add(BREAK());

// ---- 6 unit economics
add(H1("6. Unit economics"));
add(H2("6.1 Direct cost of one Chronicle"));
add(TBL(["Item", "Cost"], [
  ["Web address, first year", "10 to 15 USD"],
  ["Hosting, worldwide", "Nil"],
  ["Automatic republishing", "Nil"],
  ["Reader statistics", "Nil"],
  ["Code storage and backup", "Nil"],
  ["Narration, professional voice", "Under 5 USD"],
  ["Generated accent imagery, if used", "A few USD"],
  ["Total direct cost", "Under 25 USD"],
], [5000, 4026]));
add(GAP());
add(H2("6.2 Fixed monthly overhead"));
add(TBL(["Item", "Note"], [
  ["Claude Code subscription", "Confirm actual plan cost"],
  ["ChatGPT subscription", "Confirm actual plan cost"],
  ["OpenRouter credit", "Pay as used, pennies per site"],
  ["HeyGen account", "Only if selling cloned voices"],
  ["Professional indemnity insurance", "Not yet obtained. See Section 13"],
], [4200, 4826]));
add(GAP());
add(H2("6.3 Margin"));
add(P("Gross margin per Chronicle exceeds 95 percent before the author's own labour. The business is therefore entirely constrained by one person's time, not by cost. Capacity, not margin, is the planning variable."));
add(H2("6.4 Capacity, honestly estimated"));
add(P("The reference site took roughly four to six weeks of heavy, iterative work with no template and much invention. This is a sample of one, and it included building the product itself."));
add(TBL(["Stage", "Hours"], [
  ["Interviews and collection", "8 to 15"],
  ["Research and sourcing", "10 to 25"],
  ["Writing", "15 to 25"],
  ["Photographs", "5 to 10"],
  ["Build and film", "10 to 20"],
  ["Narration", "2 to 4"],
  ["Verification", "4 to 8"],
  ["Client rounds and handover", "6 to 12"],
  ["Total", "60 to 120"],
], [5600, 3426]));
add(GAP());
add(P("At twenty focused hours a week that is three to six weeks per Chronicle, giving a realistic solo capacity of eight to twelve a year including sales and admin."));
add(RUNS([{ t: "This estimate is the weakest number in the plan and should be attacked first. It is an informed guess, not a measurement.", b: true }]));
add(BREAK());

// ---- 7 financials
add(H1("7. Financial plan, year one"));
add(P("All figures USD. Capacity-constrained, not demand-constrained."));
add(H2("Conservative"));
add(TBL(["Line", "Amount"], [
  ["3 Chronicles at 5,500", "16,500"],
  ["1 voice add-on", "2,000"],
  ["Care, 4 sites, first year included in build fee", "0"],
  ["Revenue", "18,500"],
  ["Direct costs", "Under 150"],
  ["Gross profit", "About 18,350"],
], [5600, 3426]));
add(GAP());
add(H2("Base"));
add(TBL(["Line", "Amount"], [
  ["6 Chronicles at 7,000 average", "42,000"],
  ["3 voice add-ons at 2,200", "6,600"],
  ["1 Founder Chronicle", "12,000"],
  ["Revenue", "60,600"],
  ["Gross profit", "About 60,300"],
], [5600, 3426]));
add(GAP());
add(H2("Stretch"));
add(TBL(["Line", "Amount"], [
  ["9 Chronicles at 8,000 average", "72,000"],
  ["6 voice add-ons", "13,200"],
  ["2 Founder Chronicles at 15,000", "30,000"],
  ["1 Family Archive", "18,000"],
  ["Revenue", "133,200"],
], [5600, 3426]));
add(GAP());
add(H2("Year two recurring"));
add(P("Care on year-one clients begins paying: ten sites at 600 USD is 6,000 USD a year for a few hours of monthly work. By year five at a base-case pace that is 30,000 to 40,000 a year of recurring income before a single new build."));
add(RUNS([{ t: "The recurring line is the enterprise value. The builds are how it is acquired.", b: true }]));
add(BREAK());

// ---- 8 delivery
add(H1("8. Delivery process"));
add(P("Nine stages. Stage 1 is never skipped, for any fee."));
add(FIG("fig4.png", 1190, "Figure 4. The nine stages of a commission."));
add(H2("The five rules that never bend"));
add(NUMBERS([
  "Never invent anything about a real person.",
  "An unsourced fact does not ship.",
  "Animation reveals, it never performs. The visitor always controls the scroll.",
  "No tracker on any page, ever.",
  "The family must be able to edit it without us.",
]));
add(BREAK());

// ---- 9 technical
add(H1("9. Technical infrastructure, per client"));
add(H2("9.1 How it all fits together"));
add(P("Four steps carry a Chronicle from the desk to the family. Only the first involves any person."));
add(FIG("fig1.png", 760, "Figure 5. How a Chronicle reaches the family."));
add(H2("9.2 Every client is kept completely separate"));
add(P("Each client gets a fully isolated stack. Nothing is shared between client sites: not the code store, not the hosting, not the web address, not the passwords, not the data. One client's material can never appear in another's site, and a breach of one reaches nothing else."));
add(FIG("fig3.png", 980, "Figure 6. Per-client isolation, and what belongs to the business."));
add(H2("9.3 What is created for each client"));
add(TBL(["Component", "Service", "Isolation"], [
  ["Private code store holding all content, photographs and audio", "GitHub, private", "One per client"],
  ["Static site generator", "Astro 6, static output, no adapter", "Per store"],
  ["Hosting, serving the built files worldwide", "Cloudflare Workers", "One per client"],
  ["Web address", "Cloudflare Registrar", "One per client"],
  ["Test address", "A workers.dev address, kept alive", "One per client"],
  ["Automatic publishing on change", "Cloudflare Workers Builds, watching the main branch", "One per client"],
  ["Private reader dashboard", "A small protected route", "One per client"],
  ["Dashboard password", "Cloudflare secret", "One per client"],
  ["Analytics key, scoped to that one domain only", "Cloudflare secret, read-only", "One per client"],
  ["Reader statistics source", "Cloudflare's own aggregated traffic data", "Per domain"],
  ["Backup", "The code store itself, with full version history", "Per client"],
], [3600, 3400, 2026]));
add(GAP());
add(H2("9.4 What is shared, and belongs to the business"));
add(TBL(["Component", "Purpose"], [
  ["The starter template", "The skeleton every Chronicle is cut from. Does not yet exist. See Section 15"],
  ["The consent and takedown pack", "Stage 1 paperwork"],
  ["The scope and price document", "Commercial terms"],
  ["Claude Code subscription", "Builds every site"],
  ["ChatGPT subscription", "Image generation and script polish"],
  ["OpenRouter account", "Narration audio and generated imagery"],
  ["HeyGen account", "Voice cloning, only when sold"],
], [3200, 5826]));
add(GAP());
add(H2("9.5 The technology, and why each piece"));
add(H3("Astro 6, static output"));
add(P("Turns organised source files into finished pages in advance. The entire dependency list is one item: Astro itself. No framework, no interface library, no client-side router. Consequence: a site that loads fast, has almost no attack surface, and will still work in a decade without maintenance. For a product sold on permanence, this is a feature and not a shortcut."));
add(H3("Cloudflare Workers with static assets"));
add(P("When a visitor requests a file that exists, it is served directly from the nearest of roughly three hundred cities and never touches any code. Only the private dashboard routes execute anything. Consequence: almost nothing can break, and hosting is free at this scale."));
add(H3("Cloudflare Workers Builds"));
add(P("Watches the main branch. A change pushed is live in about five minutes. Nothing is ever uploaded by hand, which removes the single most common cause of a site being accidentally broken."));
add(H3("A build that refuses to publish a mistake"));
add(P("The build runs a house-style check against the finished pages and fails the build if a banned character reaches anything a visitor can read. A failed build leaves the live site exactly as it was. This gate is a real engineering asset and should be extended to cover missing photographs and broken links."));
add(H3("Cloudflare's own analytics, read through its data interface"));
add(P("The counting happens at the hosting provider's edge, from traffic they already see. No script on the page, no cookie on the visitor, no personal data stored anywhere. The owner sees requests per day, unique visitors, top pages and top countries. Consequence: nothing to disclose to visitors, no consent banner, and a genuine privacy claim rather than a marketing one."));
add(H3("The dashboard sign-in is a form, never the browser's password box"));
add(P("Learned the hard way: in-app browsers, the kind inside messaging apps, often refuse to display the browser's own password dialog and substitute their own error page. Every response from the dashboard is a normal successful page with any problem written in the body, so no browser can substitute anything. This matters commercially, because a client's first attempt to view their numbers will usually be from a link in a message."));
add(H3("Narration by hosted text to speech"));
add(P("Generated through a single connected interface, with no local machine involved. Current options, checked 17 October 2026:"));
add(TBL(["Model", "Why", "Rough cost"], [
  ["Google Gemini 3.8 Flash TTS", "Currently ranked first for text-to-speech quality, cheapest of the good ones", "About 9 USD per million output tokens"],
  ["Microsoft MAI-Voice-2", "Currently ranked first for sounding like a genuine human recording", "About 22 USD per million tokens"],
  ["ElevenLabs Multilingual v2", "Built for long, consistent narration", "About 40 USD per million tokens"],
], [2800, 3600, 2626]));
add(GAP());
add(P("A whole Chronicle is a few thousand words, so narration costs under five dollars per site."));
add(H3("Voice cloning, when sold"));
add(P("Requires a HeyGen account and key. This is the only part of the stack with a per-seat commercial dependency, and it is only engaged when a client has paid for it."));
add(H2("9.6 The domain ownership question, unresolved"));
add(P("Two options, and the plan does not yet choose."));
add(RUNS([{ t: "Option A: the business holds the domain and account. ", b: true }, { t: "Simpler, makes the care fee natural, and lets everything be fixed without the client. But the client's heritage then depends on the business continuing to exist, which directly contradicts the product's own promise of permanence." }]));
add(RUNS([{ t: "Option B: the client owns the domain in their own account, access delegated. ", b: true }, { t: "Honest, matches the promise, and survives the business failing. But setup is harder, every change may need the client, and the care fee is harder to justify." }]));
add(RUNS([{ t: "Recommendation: ", b: true, c: GOLD }, { t: "Option A during build and the first care year, with a written and tested transfer path and a documented dead-man clause naming who inherits. A heritage business whose clients' heritage dies with it has an unacceptable contradiction at its centre. This must be resolved before the first contract is signed, and the reviewer's opinion is specifically requested." }]));
add(H2("9.7 Security and data handling"));
add(BULLETS([
  "Client code stores are private. Content includes private family letters and photographs of living people.",
  "No client secret is ever in a code store, in a chat, or in any saved file. Secrets are typed directly into the hosting provider's secret store by the operator alone.",
  "Each analytics key is scoped to that one client's domain, read-only. A leaked key exposes one site's traffic counts and nothing else.",
  "Each dashboard password protects one client's reader numbers only.",
  "Voice recordings used for cloning are personal, biometric-adjacent data and require their own storage, retention and deletion policy. This does not yet exist.",
]));
add(BREAK());

// ---- 10 gtm
add(H1("10. Go to market"));
add(H2("10.1 Channels, in order of expected efficiency"));
add(NUMBERS([
  "Warm diaspora referral. The first five clients will come from people who have seen the reference site and know the family. Highest conversion, zero cost, and the only channel available before proof exists.",
  "Occasion intermediaries. The people who already know a milestone is approaching: private wealth managers, family office advisers, estate planning lawyers, luxury concierge services and high-end event planners. Referral commission is appropriate.",
  "Corporate direct. Company secretaries, heads of communications and chief-of-staff roles at firms approaching a founding anniversary. Found from public records. Approached twelve to eighteen months ahead.",
  "Content. A small number of essays on why AI-generated family history is a forgery, and what honest family recording requires. Slow, but it compounds and attracts exactly the right buyer.",
]));
add(RUNS([{ t: "Explicitly not pursued: ", b: true }, { t: "paid advertising, marketplaces, and anything competing on price. Every one of them drags the product into Market A." }]));
add(H2("10.2 The sales conversation"));
add(H3("Anchor high and elsewhere"));
add(P("A commissioned memoir runs from three thousand to over forty thousand dollars, and it is a book that is finished the day it prints."));
add(H3("Demonstrate the integrity rule physically"));
add(P("Show the sources file and the marked gaps. Say plainly: anything we cannot verify does not go on the site, and you will see every gap we could not fill. This is what separates us from a chatbot that will invent a lovely story about your father."));
add(H3("Name the deadline, never manufacture it"));
add(P("The milestone date is real. The subject's ability to record their own voice is genuinely time-limited. Say it once, calmly, and never say it to a grieving family."));
add(BREAK());

// ---- 11 operating
add(H1("11. Operating model"));
add(H2("11.1 The one-person shape, year one"));
add(P("The author does everything. Capacity is eight to twelve Chronicles. The bottleneck is writing and research, not building."));
add(H2("11.2 First hire, when capacity binds"));
add(P("A researcher and interviewer, not a developer. The building is already automated and the writing is the constraint. Contracted per project, paid per Chronicle, trained on the integrity rule, and never permitted to write an unsourced sentence."));
add(H2("11.3 What must never be delegated"));
add(P("Stage 1 consent. The final read of every sentence against its source. Any decision about a cloned voice."));
add(BREAK());

// ---- 12 SWOT
add(H1("12. SWOT analysis"));
add(H2("Strengths"));
add(BULLETS([
  "A genuinely differentiated product with no visible direct competitor. The nearest rivals are printed books or fill-in templates.",
  "The integrity rule is a real moat. As AI-generated family history floods the market, verifiable non-invention becomes more valuable, not less. It is also hard to retrofit, because it is a discipline rather than a feature.",
  "Near-zero marginal infrastructure cost. Under 25 dollars to deliver, 15 dollars a year to run, against a 5,500 to 9,000 dollar price.",
  "A finished, live, emotionally effective reference build. Not a mockup. It works, it is published, and it makes people cry.",
  "Real engineering assets already paid for: the scroll-directed film, the narration-driven auto-scroll, privacy-preserving analytics, and a build that refuses to publish a house-style error. Market research shows motion design alone is billed as a separate premium line item.",
  "Recurring revenue built into the product. The care fee is normal in the local market, trivially cheap to deliver, and compounds with every delivery.",
  "A permanent emotional driver. Ageing parents and milestone birthdays are not a trend. The demand is structural and the deadlines are real.",
]));
add(H2("Weaknesses"));
add(BULLETS([
  "No commercial proof whatsoever. One site, for the author's own father, with no paying client, no testimonial and no portfolio.",
  "Nothing is reusable yet. No template exists. A second site currently means hand-copying files out of a store full of the author's own family's private letters. Until this is fixed, every build costs full effort and the margin is theoretical.",
  "The capacity estimate is a guess, extrapolated from a single build that included inventing the product. If the true figure is two hundred hours, the base case collapses.",
  "One person is the entire company. Sales, research, writing, building, support and custody. Illness or distraction removes all capacity at once.",
  "No legal infrastructure. No contract, no consent forms, no takedown policy, no privacy notice, no professional indemnity insurance, no voice-recording retention policy.",
  "The author is not a developer and depends on AI assistance for every technical change. Capable with it, blocked without it.",
  "No published pricing and no sales experience in a category where the author has never sold anything.",
  "The home market anchors too low, so the primary market must be export, which is harder to reach from a standing start.",
]));
add(H2("Opportunities"));
add(BULLETS([
  "The corporate segment is larger, easier and less emotional. Founder tribute books already sell for 10,000 to 50,000 dollars, companies are commissioning them instead of retirement gifts, and a link beats a book nobody opens.",
  "Intermediary channels are untapped. Wealth managers and estate planners are repeatedly asked for exactly this and have nothing good to recommend.",
  "Voice cloning is a high-margin, genuinely unique and genuinely urgent upsell, and no competitor offers it.",
  "A printed companion volume is an obvious second product, reaching the buyer who still wants a book, at near-zero incremental research cost.",
  "Licensing the method to funeral homes, genealogy firms or private banks is a plausible later path once the template and process are proven.",
  "AI-generated competitors will damage trust in the category, which makes a documented integrity rule more saleable over time rather than less.",
  "Adjacent markets exist: institutions, schools, temples, clubs and family businesses all have founders and anniversaries.",
]));
add(H2("Threats"));
add(BULLETS([
  "Consent failure is existential. The product publishes living people's faces, private letters and cloned voices. One family dispute without signed consent can end the venture and damage the author's name permanently. This is the single largest risk, it is currently unmitigated, and it is not a formality.",
  "Voice cloning carries specific and evolving legal exposure. Biometric and likeness law is tightening across jurisdictions. Written consent is necessary and may not be sufficient everywhere.",
  "Cheap AI memoir products at 149 to 349 dollars will train buyers to expect low prices and will degrade trust in anything AI-assisted, including honest work.",
  "A single platform holds hosting, domain, publishing and analytics. Excellent while free, and highly concentrated. A pricing or policy change affects every client site at once.",
  "Client dependency on the business contradicts the product's promise. Unresolved, as set out in Section 9.6.",
  "A hostile outcome is possible even with perfect delivery. Families contain conflict, and a Chronicle can become the object of an inheritance dispute.",
  "Fact error risk. A single wrong published fact about a real and prominent person is reputationally far more expensive than the fee. More than one person shares most names, which is exactly how this happens.",
  "Long sales cycles tied to milestones mean revenue arrives lumpy and unpredictably, which is hard to survive without other income.",
  "The founder is the product. The craft, taste and judgment are not yet documented or transferable, so the business cannot currently be sold or scaled.",
]));
add(BREAK());

// ---- 13 risk
add(H1("13. Risk register"));
add(TBL(["Risk", "Severity", "Mitigation", "Status"], [
  ["Consent dispute over a living person's image, words or voice", "Existential", "Signed per-person consent covering image, words and voice separately, plus a written takedown route honoured first and discussed after", "Not started"],
  ["Voice cloning legal exposure", "High", "Living, consenting, self-recorded subjects only. Never the deceased. Written retention and deletion policy. Legal review in each selling jurisdiction", "Not started"],
  ["Published factual error about a real person", "High", "Source record for every fact, identity warning per subject, no unsourced sentence ships, family sign-off before publishing", "Working, not yet a contract term"],
  ["Capacity estimate wrong by twice", "High", "Measure the next build hour by hour. Do not sign a third client until the second is measured", "Not started"],
  ["Single-platform concentration", "Medium", "The code store is a full backup. Document and rehearse a migration path to another host", "Partially mitigated"],
  ["Client stranded if the business fails", "Medium", "Written succession and transfer clause in every contract, tested once", "Not started"],
  ["No insurance", "Medium", "Obtain professional indemnity cover before the first paid commission", "Not started"],
  ["Author unavailable", "Medium", "Document the method. Establish the contract researcher relationship early", "Partially started"],
  ["Price anchoring to the local web market", "Medium", "Export-first positioning, language discipline, never quote against a web brief", "Addressed in this plan"],
], [2800, 1300, 3400, 1526]));
add(GAP());
add(RUNS([{ t: "Four items above must be complete before the first money is accepted: the consent pack, the contract with its succession clause, the voice policy, and insurance.", b: true }]));
add(BREAK());

// ---- 14 90 day
add(H1("14. Ninety day plan"));
add(H2("Days 1 to 30: make it repeatable and lawful"));
add(NUMBERS([
  "Cut the starter template: design, film, read-aloud, build gate and dashboard, with all family content stripped out. Highest value single task, and it needs no client.",
  "Draft the consent pack: per-person image, words and voice consent, plus the takedown policy.",
  "Draft the commission contract: scope, stages, payment terms, ownership, succession and transfer.",
  "Write the voice policy: living and consenting only, with recording retention and deletion.",
  "Obtain the family's written permission to use the reference site in sales.",
  "Add a pre-publish check covering missing photographs and broken links.",
]));
add(H2("Days 31 to 60: make it sellable"));
add(NUMBERS([
  "Write the case study, record the ninety second demonstration, and build a redacted sample sources file.",
  "Build the one-page offer document with the three tiers.",
  "Get written quotes from StoryTerrace and LifeBook. Know the competitors' real numbers.",
  "Obtain professional indemnity insurance.",
  "Approach the first five warm diaspora prospects.",
]));
add(H2("Days 61 to 90: prove it"));
add(NUMBERS([
  "Sign the first paying commission, at the conservative price, explicitly as a founding client.",
  "Measure every hour. This number governs the entire financial plan.",
  "Approach three intermediaries and two corporate prospects.",
  "Rewrite Sections 6, 7 and 12 against the measured reality.",
]));
add(BREAK());

// ---- 15 missing
add(H1("15. What does not yet exist"));
add(P("Stated plainly, because the plan is otherwise optimistic."));
add(TBL(["Missing", "Consequence"], [
  ["The starter template", "Every build costs full effort. The margin in Section 6 is unproven"],
  ["Consent pack and takedown policy", "The largest risk in the SWOT is entirely unmitigated"],
  ["Commission contract", "No agreed scope, ownership or succession"],
  ["Voice policy", "A legal exposure is being sold without a framework"],
  ["Professional indemnity insurance", "Uninsured against the main risk"],
  ["Any measured delivery time", "Sections 6 and 7 rest on one extrapolated sample"],
  ["A paying client or testimonial", "No proof of willingness to pay at any price"],
  ["Permission to show the reference site", "The main sales asset may not be usable"],
  ["Pre-publish link and image check", "A missing photograph can go unnoticed for months"],
  ["A resolved domain ownership model", "A contradiction sits at the centre of the promise"],
], [3400, 5626]));
add(BREAK());

// ---- 16 questions
add(H1("16. Questions for the reviewer"));
add(P("Please answer directly, and disagree where you disagree."));
add(NUMBERS([
  "Pricing. Is 5,500 to 9,000 USD defensible for a web-delivered deliverable, or does the absence of a physical object cap willingness to pay regardless of positioning? Would a printed companion volume raise the ceiling enough to justify its cost?",
  "Capacity. Is 60 to 120 hours per Chronicle credible for a non-developer working with AI assistance? What is a more realistic number, and what does it do to Section 7?",
  "The buyer. Is the diaspora adult child the right primary target, or is the corporate Founder Chronicle the better opening wedge given faster cycles, no grief and existing budget lines?",
  "Domain ownership. Section 9.6 is unresolved. Which option, and how is the contradiction between client dependency and a promise of permanence honestly resolved?",
  "Consent. Is per-person written consent for image, words and voice sufficient to publish living people commercially, and what is missing? Specifically on cloned voices, what would you require beyond written consent and self-recording?",
  "The moat. How long before a competent competitor copies this, and is the integrity rule actually defensible or merely a marketing claim a well-funded rival can also assert?",
  "First sale. What is the fastest credible path to the first paying commission, and should the price be discounted for proof or held firm for positioning?",
  "What is missing. What important thing is not in this document at all?",
]));
add(BREAK());

// ---- 17 sources
add(H1("17. Sources"));
add(P("Market research conducted 17 October 2026."));
add(RUNS([{ t: "Caveat: ", b: true, c: GOLD }, { t: "most pricing pages in this category are published by the companies selling the service, or by affiliate comparison blogs. Figures are indicative, not audited. Where sources conflicted, both figures are shown rather than averaged." }]));
const srcs = [
  ["Memoir and biography pricing", "tellmel.ai, evermemory.ai, mainlinememoir.com, memorymurals.com, welcome.storyworth.com"],
  ["Memorial platform pricing", "everplans.com, online-tribute.com, leftthis.world, getmemorial.com"],
  ["Web design pricing", "onepagey.com, onelittleweb.com, pitchsite.io, pixelean.com, ideavire.com"],
  ["Malaysian market", "keepdesign.com.my, walkproduction.com, zenweb.my, xbtechstudio.com"],
  ["Genealogy and archiving", "heritagebridge.com, thestoryarchivist.com, legacytree.com, imagedoctor.com"],
  ["Corporate heritage", "corporatehistory.net, storiedgifts.com, brainzmagazine.com, writercosmos.com"],
  ["Narration model pricing and rankings", "The live OpenRouter model catalogue, read 17 October 2026"],
];
add(TBL(["Topic", "Sources"], srcs, [3000, 6026]));

// ---------------------------------------------------------------- document
const doc = new Document({
  creator: "The Chronicle Company",
  title: "The Chronicle Company: Business Proposal and Plan",
  description: "Commissioned private biographies delivered as living web archives",
  numbering: {
    config: [
      { reference: "dots", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 420, hanging: 240 } } } }] },
      { reference: "nums", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 460, hanging: 280 } } } }] },
    ],
  },
  styles: { default: { document: { run: { font: "Calibri", size: BODY, color: INK } } } },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ children: ["The Chronicle Company   ", PageNumber.CURRENT],
          size: 16, color: MUTED, font: "Calibri" })],
      })] }),
    },
    children: body,
  }],
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync("/home/user/work/doc/Chronicle-Business-Plan.docx", b);
  console.log("written", b.length, "bytes");
});
