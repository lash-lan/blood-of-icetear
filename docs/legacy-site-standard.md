# The Legacy Site Standard

How a personal or family legacy website gets built, from nothing to live.

The reference build is **Hemachandra Legacy**
(https://hemachandralegacy.com, repository `lash-lan/hemachandra-legacy`).
That is the product. **Blood of Icetear** (`lash-lan/personal-website`) and
**lashlan.com** are the laboratory: the film mechanics and the read-aloud idea
were proven there and carried across.

Written for Lash, who is not a developer. Every technical word is defined once.

Two house rules, enforced by the build itself on the legacy site: **no em
dashes and no semicolons** in anything a visitor reads. And always say
**locally** or **live**, never "done".

---

## 0. Corrections to the previous version of this document

The first draft was written from the Blood of Icetear repository alone, before
the Hemachandra repository was read. Three things in it were wrong about the
product, and the record is corrected here rather than quietly edited.

1. **Qwen 3 TTS is real and it is the narration engine for the legacy site.**
   Lash was right and the first draft was wrong. `CLAUDE.md` in the legacy
   repository names the exact command:
   `C:\Users\lashl\.conda\envs\qwen3tts\python.exe` running
   `narrate_hemachandra.py`. Kokoro on GitHub Actions is the Blood of Icetear
   pipeline only. The two sites narrate by completely different means.
2. **Analytics is already built, live and better than PostHog would be here.**
   There is a private dashboard at `/visitors`. The first draft said there was
   no analytics, which was true of Blood of Icetear and false of the product.
3. **Sharing previews and search metadata are already done** on the legacy
   site: canonical links, Open Graph, Twitter cards and JSON-LD structured
   data all ship from `Base.astro`. What is genuinely still missing is narrower:
   a sitemap and a robots file.

---

## 1. The stack, as the legacy site actually is

### 1.1 Framework: Astro 6, fully static, nothing else

No adapter. No React, no Vue, no UI library, no client-side router. The
dependency list is one line: `astro`. Wrangler is a development tool only.

The entire Chronicle is **one page plus a 404**. Every chapter is an Astro
component rendered at build time into flat HTML.

```
src/data/content.ts        Chronicle I's text. The family edits this file.
src/data/people.ts         Every family member, relationships, Chronicle status.
src/data/photos.ts         One record per photograph.
src/data/narration.ts      The read-aloud script.
src/data/image-sizes.json  Generated. Which WebP widths exist for each photo.
src/components/            One file per chapter, in the order of the story.
src/layouts/Base.astro     Masthead, progress line, mobile menu, grain, meta tags.
src/styles/global.css      The design system. Colours and type live here only.
src/scripts/site.js        All behaviour, in small named functions.
src/scripts/film.js        The opening film's director.
src/worker/                The only server code: the private visitor dashboard.
narration/                 Generated input for the voice machine.
docs/sources.md            Where every professional fact came from.
```

### 1.2 Hosting: Cloudflare Workers serving static assets

`wrangler.jsonc` points `assets.directory` at `dist/`. Cloudflare serves a file
directly whenever the path matches one, so the Chronicle, all 311 images and
the narration audio **never touch any code**. Only `/visitors`, `/stats`,
`/api/stats` and paths matching no file reach the Worker, and that last case is
handed straight back to the asset server so the 404 page still works.

`not_found_handling: "404-page"`. Custom domains are declared in the config, so
the first successful deploy claims both `hemachandralegacy.com` and the `www`
form. The domain is registered at Cloudflare, so there is no nameserver step.

`workers_dev: true` keeps a `*.workers.dev` address alive as a test address
that is not the live site.

### 1.3 Publishing: Cloudflare Workers Builds watching `main`

Push to `main` and it builds and deploys. Build command `npm run build`, deploy
command `npx wrangler deploy`, root directory `/`, preview builds off. About
five minutes. Same arrangement as bloodoficetear.com and dharmalogist.com.

**The build is a gate, not just a build.** `npm run build` is
`astro build && node scripts/check-copy.mjs`. That second script reads the
built HTML, strips scripts, styles and tags, decodes entities, and **fails the
build** if any visible line contains an em dash or a semicolon. A house-style
slip cannot reach the live site. This is the single best idea in the whole
repository and every future site gets it.

### 1.4 The visitor dashboard, which is the analytics answer

`/visitors` (and `/stats`, kept because it came first and may be cached as a
404 on early devices). Served by `src/worker/index.ts`, never built into
`dist/`, so it is not in the public site and not in any search engine.

- **Where the numbers come from:** Cloudflare's own **GraphQL analytics API**,
  already aggregated at their edge. Requests a day, unique visitors, bytes
  sent, the twelve most visited pages, the twelve top countries.
- **Nothing personal is stored.** No log, no database, no visitor cookie, no
  third-party script on any public page. There is no tracker to disclose and no
  consent banner to write. For a family archive this is the right answer and
  PostHog would be a step backwards.
- **Signing in is a form, not the browser's password box.** The first version
  used HTTP Basic authentication. An in-app browser, the kind inside WhatsApp,
  often refuses to show that dialog, swallows the 401, and shows its own error
  page. **Every answer from this Worker is a 200**, with any trouble written in
  the body. Never reintroduce a 401.
- The password is compared in constant time and never written down. A device
  that passes gets an HMAC ticket cookie for thirty days.
- Two secrets, both typed by Lash: `STATS_PASS` and `CF_API_TOKEN` (Zone Read
  and Analytics Read). Set with `npx wrangler secret put NAME`. **Until they
  exist the page explains in plain words how to set them** instead of failing.
- The zone id is looked up by domain name at runtime, so there is nothing else
  to paste.
- Answers cached ten minutes, well inside Cloudflare's 300 queries per five
  minutes.
- **Each part of the query is asked for separately**, so a field one plan does
  not offer cannot empty the whole page. Whatever failed prints under the
  charts. Unique visitors in particular is not available on every plan.
- One series, one hue, every chart with a table underneath it.

### 1.5 Narration: Qwen 3 TTS, voice-cloned, per-speaker

This is the most valuable and the most fragile thing in the product.

The pipeline:

```
src/data/narration.ts          the script, built FROM content.ts
  -> scripts/export-narration.ts   writes lines/targets/moods/voices/pauses .json
    -> narrate_hemachandra.py      Qwen 3 TTS on Lash's PC, in a conda env
      -> public/audio/listen.opus  voice plus music bed, mixed by ffmpeg
      -> src/data/listen.json      timings, duration, and the exact lines used
```

What makes it good:

- **The script is generated from the page's own content**, not typed out
  twice. The letters and notes are read from `content.ts`, so the voice can
  never drift from the words on screen.
- **`Listen.astro` shows the button only when the recording matches the current
  script**, line for line. Change a word and the button hides itself, with a
  `[listen]` warning at build time, until the audio is made again. The voice
  can never read something the page no longer says.
- **Expression comes from the sampling, not a style prompt.** The server clones
  a voice, so there is no emotion switch. It accepts temperature, top_p and
  repetition_penalty, and an earlier script passed only the first, which is why
  everything read flat. Each line now carries a mood: `warm`
  (1.02 / 0.96 / 1.08) for anything anyone wrote to him and for the narration
  itself, `plain` (0.72 / 0.90 / 1.05) for the two lines dense with titles,
  countries and dates where a freer read risks mangling a name.
- **Lines are cached by their text and their settings**, so changing one mood
  re-speaks only what it affects.
- **Different people are read in different voices.** Yali's letter is read in
  **Yali's own cloned voice**, from a recording she made herself on 28
  September 2026 and chose between two takes. Amma and Chammi have their own.
  A man's voice reading a wife's letter to her husband is the wrong
  instrument, and the repository says so in a comment.
- **A pause is a line.** Silences carry their own entry, so the camera still
  has somewhere to be. That is how a wall of photographs is crossed slowly
  with nothing said over it.
- The music bed is Lash's own (`audio-source/warm-legacy.mp3`), laid under the
  voice by ffmpeg, ducking automatically out of the way of the words.

### 1.6 The read-aloud camera

The rule that makes it work: **the voice never animates anything.** It only
chooses a scroll position, and the film reacts to scroll exactly as it does for
a visitor.

```
narration line -> scroll position -> film progress -> what you see
```

Each line names the element to highlight and, for a line inside the opening
film, where in the film (0 to 1) it belongs. The player glides between them, so
the photographs arrive with the words. `hold` keeps the page still for a short
block read all at once. `through` plays part of a scene during a line.

**The hard-won lesson:** a stop must sit where the *page* puts a thing, not
where the *script* puts it. Stops on the photographs beside Yali's letter were
written after the letter, because on a phone they sit under it. On a desktop
they sit beside it, so the camera went two thousand pixels back up the page
while the voice carried on, and it looked frozen. Anything that moves in the
layout gets no stop of its own. Check by reading every line's target position
in headless Chrome and looking for a drop from one line to the next.

### 1.7 The opening film

`Prologue.astro` holds the layers, `src/scripts/film.js` directs. Same
mechanics as lashlan.com and Blood of Icetear. Full method in
`docs/cinematic-scroll-playbook.md` in the personal-website repository.

The stage pins for 520svh, 440svh on phones. Scroll is the clock, every layer
is a pure function of progress, so scrolling back rewinds exactly. The shown
moment eases toward the scrolled one (`shown += (target - shown) * 0.12`).

Six scenes: the title, where he began, two lives, a family grows, the years
between, today. Photographs are always shown **whole** over a blurred copy of
themselves, generated by `python scripts/build-film.py`.

`window.__film(0.5)` jumps to any moment. `?motion` forces motion on in a
browser reporting reduced motion.

### 1.8 Images

`npm run images` runs `scripts/build-images.py` (Python and Pillow). It writes
WebP copies at 480, 960 and 1600 wide beside each JPEG and records them in
`src/data/image-sizes.json`. **Cloudflare does not run Python, so the generated
files are committed.** 35 MB of public assets, 311 image and audio files.

Photographs are always shown through `Img.astro` or `Figure.astro`, never a
bare `<img>`, so the responsive sizes and the fallback behaviour come for free.
The hero image is preloaded from the generated size record.

---

## 2. The parts that are the actual product

A competitor can copy the dark palette in an afternoon. These are what they
cannot copy quickly, and what a client is really buying.

### 2.1 The content integrity rule

> **Never invent anything about a real person.** Not a quotation, a childhood
> story, a family memory, an award, a qualification, a date, a belief, a
> relationship, or a number. Not even a plausible one, and not even as a
> placeholder to be edited later.

Where something is not known the site shows a marked, tasteful gap. Every
bracketed string in `content.ts` is one of those gaps, and **a bracketed
placeholder renders nothing on the page**: no empty frame, no prompt list, no
unanswered question. The data stays so the family can see what is missing, and
each gap reappears as finished prose the moment it is filled.

This is the thing to sell. Anyone can generate a beautiful page about someone's
father. Only a disciplined build refuses to make up a single warm sentence
about him.

### 2.2 Sourcing that the reader never sees

Lash asked twice for the Chronicle to read as storytelling rather than as a
record citing itself. Every sentence naming where a fact came from was removed
from the site.

**The rule behind them did not change.** A fact still needs a source Lash can
point at, and that source still goes in `docs/sources.md`, which is in the
repository and not on the website. What changed is that the reader no longer
sees the footnote. And because there is no longer a hedging sentence to carry a
weak fact, an unsourceable fact simply does not go on the site.

`docs/sources.md` ranks sources as the family asked: family documents first,
then Chandima himself, then annual reports, official company sites,
institutional records, government records, reputable news, professional
profiles, and secondary databases last. People-search sites are never a sole
source.

It also carries an **identity warning**: there is more than one Chandima
Hemachandra online, and one of them is an academic at Monash. Check identity
before adding anything found online. Every future Chronicle needs that same
warning for its own subject.

### 2.3 The photograph record

`src/data/photos.ts`, one entry per photograph, carrying alt text, caption,
era, approximate and exact year, location, event, the people in it,
photographer, source, owner, `visibility` of public or private, and a
`verification` of:

- `confirmed` the family has confirmed who and what it shows
- `approximate` the people are known, the date or occasion is not
- `unknown` the family has not yet identified it

**Only name people the family has named. Everyone else stays unnamed.** The
repository records what is still unknown: who the baby is in one photograph,
who the older woman in the purple sari is, where the lantern evening was. A
blue-sari occasion was once captioned "The wedding reception" by mistake and is
now "a formal gathering" until the family says otherwise.

A newspaper photograph showing Chandima is deliberately **not** on the site: it
is the paper's copyright and shows other living people.

### 2.4 The family can edit it without a developer

`README.md` is written for the family, not for an engineer. It explains the
brackets, how to add a photograph, how to add a child (copy one block, paste
it, the chapter builds itself), how to fill the archive. It ends with the one
rule: nothing may be made up, and an honest gap is better than a beautiful
invention.

`docs/family-interview-checklist.md` is everything still to collect.

That is the difference between a website and an archive: an archive can be fed
by the family for twenty years without anyone being hired again.

### 2.5 He is alive

The site is a birthday tribute to a man with a career still running. **Nothing
on it may read like a memorial.** The emotional argument runs in a fixed order:

> the name, the journey, the man, the husband, the father, the family, the
> friends and the mentored, what he built, what he believes, the legacy, the
> birthday, the future.

A visitor should arrive impressed by a senior technology leader and leave
feeling they know a person.

And: never call the subject the founder of the family or the first of the name.
He is the first person whose Chronicle is preserved here.

### 2.6 Design discipline

- Near-black paper, warm ivory type, **champagne gold used only as punctuation**
  on dates, hairlines and small capitals. **If a screen looks gold, something is
  wrong.**
- Cormorant Garamond for headings and anything emotional, Inter for body.
- Photography dominates. Generous negative space. No rounded cards, no
  glassmorphism, no gradients as decoration, no floating panels.
- **One light surface only.** Yalindrani's letter is the single ivory paper
  surface on the whole site, and that is what makes it land. Do not add a second.
- **Animation only ever reveals. It never performs.** No confetti, no balloons,
  no particles, no autoplay audio, no scroll hijacking. The visitor always
  controls the scroll.
- **`prefers-reduced-motion` is respected.** Note that this is the **opposite**
  of Blood of Icetear, which deliberately ignores it by Lash's choice. The
  legacy product respects it, because an eighty-year-old relative will open it.
- Motion is chosen by the kind of photograph: ordinary photos develop from a
  pale sepia print, archival prints surface on a paper mount, the family
  portrait widens with scroll, candid photos sit slightly askew on a table and
  straighten on hover, the career thread fills as you read.

---

## 3. Traps that have already cost time

Every one of these is paid for. Do not rediscover them.

- **`hidden` loses to a `display` rule on the same element.** This broke every
  click on the site twice. The lightbox and mobile menu are both
  `position: fixed; inset: 0` with `display: flex`, and both ship with
  `hidden`. A class selector beats the browser's `[hidden]` rule, so each
  stayed laid out as an invisible sheet over everything, swallowing every real
  click. A scripted `.click()` still worked, which is why it survived so much
  testing. `global.css` now carries `[hidden] { display: none !important }`
  permanently. To check: `document.elementFromPoint` over a control and see
  what comes back.
- **`aspect-ratio` plus `min-height` sets a minimum width.** A placeholder with
  `aspect-ratio: 4/5` and `min-height: 12rem` insisted on 341px inside a 279px
  phone column and overflowed the whole page sideways.
- **`1fr` means `minmax(auto, 1fr)`**, so one wide child pushes a grid track
  off the screen. Write `minmax(0, 1fr)`.
- **Never put `overflow-x: hidden` on `body`.** With `html` set to
  `overflow-x: clip` it turns body into its own scroll container and every
  `position: sticky` silently stops sticking, with no error.
- **The Google Fonts stylesheet must not block rendering.** When it did, a slow
  font response held back every script on the page and the film did not start
  for over six seconds. It is loaded with `media="print"` and swapped in on
  load.
- **A missing photograph must never show a broken image icon.** Two mechanisms
  cover it: an empty `src` renders a reserved slot at build time, and
  `initPhotoFallback` converts a named-but-missing file into the same thing in
  the browser. Keep both.
- **Astro's dev server can serve a stale stylesheet** after large component
  edits. Restart the preview before debugging anything else.
- **Lash's laptop has Windows animation effects off**, so every browser on it
  reports reduced motion and shows the still version. Say this before he
  reports that nothing moves.
- **The Claude preview browser reports reduced motion and pauses animation
  frames.** Use headless Chrome for anything that moves.
- **`curl` lies.** Script-made redirects still return 200 and JavaScript text is
  not in the HTML.
- Git Bash mangles backslashes in heredocs. Use the Write tool. Python cannot
  open the long scratchpad path. Work in a short folder.

Verification, every release: 24-point scroll sweeps in headless Chrome with
motion on, at 1440x900 and 390x844. `document.documentElement.scrollWidth`
must equal `clientWidth` at 375px and 1440px. Reduced motion and no
JavaScript both complete and readable. Listen following, pausing on hand
scroll, resuming, stopping. Then the same against the live address.

---

## 4. What is still missing

The site is finished and good. The **business** is not. Ranked by what stops a
second sale.

### 4.1 Blocking the product

1. **The narration cannot be made on anyone's machine but Lash's.**
   `narrate_hemachandra.py` lives in a different project
   (`icetear-forge/voice/`), needs a conda environment called `qwen3tts`, a
   voice server started by a `.bat` file, and the cloned voice samples. None of
   that is in this repository, nothing versions it, and no client could ever be
   handed it. **This is the number one blocker on selling the product**, and it
   is the same class of problem as Blood of Icetear's unreproducible Squire
   audio. Either package the voice step properly, or move the narration to a
   hosted API and accept paying for it.
2. **There is no starter template.** A second site today means copying files by
   hand out of a repository full of one real family's content. The Worker even
   has `const ZONE = "hemachandralegacy.com"` hard-coded. Needed: a skeleton
   repository carrying the layout, the design system, the film, Listen,
   `check-copy.mjs`, the visitor dashboard with the zone read from config, the
   photograph record, the family-facing README, and this document, with the
   content emptied to brackets.
3. **No consent record, and that includes voices.** The photograph record
   tracks ownership and verification, which is more than most would do. What is
   missing is a written record of **who agreed to appear at all**. The site
   publishes the names, faces and private letters of living people, and it
   publishes **cloned voices** of three living women. Yali chose between two
   takes, which is consent in practice, and it is written nowhere in a form
   anyone could rely on. For Lash's own family that is fine. For a paying
   client it is the whole risk of the business. Needed: a consent record per
   living person covering image, words and voice, and a stated takedown route.
4. **No contract, no delivery checklist, no price.** There is no written scope
   of what a Chronicle includes, what the family must supply, how many rounds
   of changes, who owns the result, who hosts it after handover, or what it
   costs. Roughly, today, the running cost is a domain at about 10 USD a year
   and Cloudflare free. That is the number to build a price on, and it has
   never been written down.

### 4.2 Blocking technically

5. **No check before a push reaches `main`.** `check-copy.mjs` does gate the
   deploy, which is genuinely good: a bad build fails and the live site stays
   as it was. But nothing checks a change *before* it is pushed, so a broken
   push means a failed deploy to go and investigate rather than a caught
   mistake. One GitHub Actions workflow running `npm run build` on a pull
   request closes it.
6. **No sitemap and no robots file.** `site` is set in the Astro config and the
   canonical links are correct, so adding `@astrojs/sitemap` is close to free.
   `/visitors` must stay out of it, which it does automatically by not being a
   built file.
7. **`CLAUDE.md` is now wrong about the narration.** It says the sons' letters
   and the friends' notes are deliberately not narrated. `narration.ts` says
   plainly that everything is narrated, all three sons' letters and both
   friends' notes included, read paragraph by paragraph, with Amma and Chammi
   in their own cloned voices. The code is the truth and the notes are stale.
   Fix the notes, because they are what the next build is driven from.
8. **No succession plan.** A *legacy* site whose domain, hosting, repository
   and secrets all sit in one personal Cloudflare account dies with access to
   that account. A written handover naming where everything lives, and who
   inherits it, belongs in the repository.
9. **No uptime check.** If the site breaks, the way anyone finds out is by
   looking.
10. **No link or image check.** Nothing verifies that every `src` in
    `content.ts` has a file behind it. The fallbacks are good enough that a
    missing photograph looks intentional, which means it can go unnoticed for
    months.

### 4.3 Worth doing, not blocking

11. **No art and audio provenance record.** For a family archive meant to
    outlive everyone, descendants will want to know which photographs were
    retouched, which were cut from collages, and which voices were cloned
    rather than recorded.
12. **No export.** The whole point is permanence, and there is no one-click way
    to get a PDF or a printed book out of a Chronicle. That is also the obvious
    upsell.
13. **Unique visitors is not available on every Cloudflare plan**, and the
    dashboard handles that gracefully. Worth knowing before promising a client
    visitor numbers.

---

## 5. The build sequence for a new Chronicle

1. **The conversation first.** Who is this for. Who is in it. Who is alive. What
   must never be published. Who consents to their image, their words and their
   voice. Get it in writing. Section 4.1 point 3 is why.
2. **Interview and collect** against `docs/family-interview-checklist.md`. Build
   `docs/sources.md` as you go, with the identity warning for this subject.
3. **Content into `content.ts`**, with every unknown left as a bracket. Fill
   `people.ts` and `photos.ts` with verification levels honestly set.
4. **Photographs in, `npm run images`, commit the generated files.**
5. **Skeleton pages** on the shared layout: readable, calm, finished, with no
   film at all. This version must survive with JavaScript switched off.
6. **The film**, over the skeleton, never instead of it.
7. **Narrate**, once the words are final. The Listen button hides itself if
   they change afterwards, which is the safety net, not the plan.
8. **Verify locally**, properly, per section 3.
9. **Show the family. Wait. Publish only on their word.** Then verify the real
   address.
10. **Hand over**: the dashboard password, where the secrets live, how to edit
    `content.ts`, and the succession document.

---

## 6. The one-page version

**Astro 6, fully static, no adapter, no framework.** One page per Chronicle.
**Cloudflare Workers** serves the files and the domain, with **one small Worker**
for a private, cookieless visitor dashboard built on **Cloudflare's own GraphQL
analytics**. **Cloudflare Workers Builds** watches `main` and deploys on push,
and the build **fails** on an em dash or a semicolon. **GitHub** holds the code.
**ChatGPT** makes and enhances the images and sharpens the script. **Qwen 3 TTS**
on Lash's PC clones voices and reads the Chronicle aloud, per-speaker, with the
mood set per line. The voice only chooses a scroll position, and the film reacts
to scroll like any visitor.

Content lives in `src/data/`, and the family can edit it without a developer.
Nothing about a real person is ever invented: an unknown is a tasteful gap that
renders as nothing until it is filled. Every fact has a source in `docs/`, and
the reader never sees the footnote. Secrets live in Cloudflare and Lash types
them himself. Nothing publishes without the family's word, and nothing is
called done until the real address has been checked.

**The four things to build next, in order:** package the narration so it runs
somewhere other than Lash's bedroom; cut the starter template; write the
consent, voice and takedown record; write the scope, the price and the handover.
