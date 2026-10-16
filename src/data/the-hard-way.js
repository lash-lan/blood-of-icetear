// ─────────────────────────────────────────────────────────────
//  THE HARD WAY — Lessons from Working Life
//
//  This is the only file you need to touch to publish an article.
//  Add a new object to the TOP of the ARTICLES list and it appears
//  on /the-hard-way immediately, numbered automatically.
//
//  Each article takes:
//    slug       the web address: /the-hard-way/<slug>. Lowercase, hyphens.
//    title      the headline.
//    standfirst one sentence under the title. What the reader is about to get.
//    date       'YYYY-MM-DD'. Shown as the month and year.
//    cost       the one-line answer to "what did this lesson cost you?".
//               It prints under the title as the article's epigraph.
//    body       the article itself, as a list of blocks (see below).
//
//  The blocks you can use in `body`:
//    { t: 'p',     text: '...' }   an ordinary paragraph
//    { t: 'h',     text: '...' }   a section heading
//    { t: 'quote', text: '...' }   a pulled-out line, set large
//    { t: 'rule' }                 a divider, when the subject turns
//
//  Nothing here is rendered as HTML, so apostrophes, quotes and dashes
//  are safe to type normally.
// ─────────────────────────────────────────────────────────────

export const ARTICLES = [
  {
    slug: 'you-do-not-have-to-be-the-craftsman',
    title: 'You Do Not Have to Be the Craftsman to Command the Craft',
    standfirst:
      'I built and shipped a real website without learning to write code. What that taught me about every skill I have ever refused to delegate.',
    date: '2026-10-16',
    cost: 'Years of treating "I cannot do that" as the end of a sentence.',
    body: [
      {
        t: 'p',
        text: 'For most of my working life I believed that the person who could not do the work had no business directing it. It felt like integrity. If I could not build the thing with my own hands, who was I to have opinions about how it was built? So I waited. I read introductions to things. I collected the first three chapters of competence in half a dozen disciplines and finished none of them, and in the meantime I built nothing at all.',
      },
      {
        t: 'p',
        text: 'The site you are reading this on is the first thing that broke that belief. I do not write code. I have no intention of learning to. I described what I wanted in ordinary words — the halls, the colours, the way a page should feel when it opens — and the work came back built. Then I looked at it, said what was wrong, and it came back better. The site is live. It is real. People can read it. And the part of the process I supplied was not technical skill. It was taste, and the willingness to keep saying "no, not like that."',
      },
      { t: 'rule' },
      { t: 'h', text: 'The skill I was missing was not the skill I thought' },
      {
        t: 'p',
        text: 'Here is what actually turned out to be hard, and it was none of the things I had been afraid of.',
      },
      {
        t: 'p',
        text: 'Knowing what I wanted was hard. Not in a vague way — specifically. "Make it look good" produces nothing. "Near-black stone, cold silver, and red held back for the moments that deserve it" produces a site. The difference between those two sentences is not technical vocabulary. It is the work of having actually decided something. Most of the time when I could not get what I wanted out of other people, it was because I had not yet done the work of knowing.',
      },
      {
        t: 'p',
        text: 'Judging the result honestly was hard. There is a powerful temptation, when something comes back nearly right, to accept it because you are tired and because asking again feels ungrateful. Nearly right, accepted enough times, is how things end up mediocre. Nobody else is going to hold the standard for you. If you are the one who knows what it was supposed to be, you are the only one who can.',
      },
      {
        t: 'p',
        text: 'And saying the same correction three times without softening it was hard. The third time you point out the same flaw you start to wonder if you are the problem. Occasionally you are. Usually you are simply the only person in the room who has not gotten used to it.',
      },
      {
        t: 'quote',
        text: 'The bottleneck was never that I could not build it. The bottleneck was that I had not decided what it was.',
      },
      { t: 'rule' },
      { t: 'h', text: 'What I had actually been protecting' },
      {
        t: 'p',
        text: 'I want to be honest about the real reason I waited so long, because the respectable version — "I did not want to direct work I did not understand" — is not the true one.',
      },
      {
        t: 'p',
        text: 'If I never started, I never had to find out whether my taste was any good. Learning-the-fundamentals-first is an excellent hiding place. It looks like diligence. It feels like diligence. And it postpones indefinitely the only test that matters, which is putting the thing in front of someone and watching their face. Incompetence at the craft was never what I was afraid of. I was afraid of being competent at the craft and still making something nobody cared about.',
      },
      {
        t: 'p',
        text: 'The hard way to learn this is the way I learned it: by spending years acquiring the first three chapters of everything, and then discovering in a single week of actually building that the chapters were never the obstacle.',
      },
      { t: 'rule' },
      { t: 'h', text: 'What I would tell myself five years earlier' },
      {
        t: 'p',
        text: 'Separate two questions that feel like one question. "Can I execute this?" and "Do I know what good looks like here?" are completely different, and only the second one is non-delegable. You can hire execution. You can buy execution. You can now, increasingly, simply ask for execution. Judgement is the thing that has to be yours, and judgement is built by shipping and being wrong in public, not by reading.',
      },
      {
        t: 'p',
        text: 'Then be specific, and be relentless, and do not mistake either of those for being unkind. The most generous thing you can do for anyone building something on your behalf is to know exactly what you want and to tell them plainly when they have not got there yet. Vagueness is not politeness. Vagueness is just making your problem into their problem.',
      },
      {
        t: 'p',
        text: 'I have one site live and a lot of ground still to cover. But I no longer believe the sentence I believed for most of my adult life, which is that I had to become the craftsman before I was allowed to want anything. I did not. I had to want something precisely enough to be worth building.',
      },
    ],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────
// Articles are numbered by publication order, oldest = № 001, so the
// numbers never change when you add a new one at the top of the list.
const oldestFirst = [...ARTICLES].reverse();

export const articleNumber = (slug) =>
  String(oldestFirst.findIndex((a) => a.slug === slug) + 1).padStart(3, '0');

export const articleHref = (a) => `/the-hard-way/${a.slug}`;

// Roughly 220 words a minute, rounded up, never less than one.
export const readingMinutes = (a) => {
  const words = a.body
    .filter((b) => b.text)
    .reduce((n, b) => n + b.text.trim().split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 220));
};

// 'October 2026' — month and year only. A lesson is not news; the day
// it was written down does not matter.
export const articleDate = (a) =>
  new Date(`${a.date}T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
