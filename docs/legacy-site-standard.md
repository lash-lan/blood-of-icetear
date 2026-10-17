# The Legacy Site Standard

How a personal or family legacy website gets built, from nothing to live, using
the stack proven on **Blood of Icetear** (https://bloodoficetear.com) and
**lashlan.com**.

Written for Lash, who is not a developer. Every technical word is defined once.
Read this before starting a new site. Read it again before promising anyone a
date.

Two rules of language, kept from the existing playbooks: say **locally** or
**live** every single time, and never use an em dash anywhere in this project.

---

## 0. What this document is for

Blood of Icetear was built once, by hand, in one repository. It works. But it
cannot currently be repeated, because the knowledge of how it works is spread
across eight config files, thirty scripts and two laptops, and some of it is
not written down at all.

This document is the fix. It does three things:

1. Records the stack as it **actually is**, not as remembered.
2. Corrects the four things the remembered version gets wrong.
3. Lists what is **missing** before this is a repeatable product rather than
   one good site.

---

## 1. Corrections to the remembered stack

Before the standard, the record gets set straight. These are not nitpicks.
Three of them would break a new site on day one.

### 1.1 The narration voice is Kokoro, not Qwen 3 TTS

The audio that reads the site aloud is made by **Kokoro v1.0** (an open
text-to-speech model, Apache 2.0 licence), running on the ordinary processor of
a **GitHub Actions** machine. No GPU, no account, no bill.

- Workflow: `.github/workflows/narrate.yml`, run by hand from the Actions tab.
- Script: `scripts/narrate.py`.
- Voice: `bf_isabella`, British English, chosen as the default.
- Output: `.opus` audio into `public/audio/`, timing files into
  `src/data/audio/`, committed back to the repository by the workflow itself.
- Work is split across 8 parallel machines ("shards") so a long book finishes
  inside the free time allowance.

**Qwen 3 TTS is not in this site.** What exists instead is a *separate* voice
tool, "Recast the Voice", in the private Forge. It calls a voice server
**running on Lash's home PC**, reached through a Cloudflare Tunnel at
`voice.bloodoficetear.com`. It only answers while that PC is switched on and
awake. That is a private toy, not site infrastructure, and it must never be put
in the critical path of a client site.

### 1.2 Part of the existing narration cannot be regenerated

A real problem, found by reading the files rather than trusting the summary.

`scripts/narrate.py` only knows about two content files: the Foundation Age
stories and *Last Days of Legends*. It does **not** know about **The Squire**.
But The Squire has fifteen finished audio files in `public/audio/squire/`, and
their timing files record the voice as `"Seductive Lady Strong"`, which is a
home-PC voice-server voice, not a Kokoro one.

Meaning: fifteen chapters of narration were made by hand through the PC voice
server, and **no script in this repository can reproduce them.** If those files
are ever lost, or the text is edited, that audio is gone and must be remade by
hand from memory of a process that is not written down.

**Standard going forward:** every piece of published audio must be reproducible
by a committed script from committed text. If a voice is used that the script
cannot reach, that voice does not ship.

### 1.3 PostHog is not pending integration, it is absent, and so is all web analytics

There is **no visitor analytics of any kind** on the public site. No PostHog, no
Plausible, no Google, nothing. Zero knowledge of who reads it.

The thing in the repository called `analytics.js` is **not** web analytics. It is
`src/lib/plan/analytics.js`, the scoring engine for Lash's private habit and
money tracker at `/plan`. It counts habits, not readers. Good code; wrong
subject.

`observability` is switched on in `wrangler.jsonc`. That gives server **logs**
in the Cloudflare dashboard, which is useful for finding errors and useless for
understanding readers.

### 1.4 The back end is not one thing, it is five

The remembered version says "Claude creates the analytics and back end UI". The
real site has five distinct back-end pieces, each with its own failure mode:

| Piece | What it is | Where it lives |
|---|---|---|
| Cloudflare D1 | A small SQL database, bound as `PLAN_DB` | Cloudflare, created on first deploy |
| The lock | One password, no accounts, a signed cookie ticket good for 30 days | `src/lib/session.js` |
| OpenRouter | A hosted language model for the adventure and chat pages | API key in Cloudflare |
| Runpod | A rented GPU, started on demand for video, which deletes itself after 20 idle minutes | `src/lib/forge-gpu.js` |
| GitHub as a database | The Council room is literally the comment thread of a draft pull request in a private repository | `src/lib/council.js` |

---

## 2. The stack, as it stands

### Tier 1: the people and the tools that make things

| Role | Tool | What it does |
|---|---|---|
| Builder | **Claude Code** | Writes every page, component, script and workflow. Runs the integrations once given permission. Builds the scroll animation. Wires the audio to the scroll. Verifies the work. |
| Pictures | **ChatGPT image generation** | Lash makes the art from prompts Claude writes. Free, and Lash keeps control of the look. |
| Words | **ChatGPT** | Sharpens the script of each page. |
| Voice | **Kokoro v1.0** on GitHub Actions | Reads the prose aloud, with timings. |

### Tier 2: where it lives

| Layer | Service | Notes |
|---|---|---|
| Code | **GitHub** (`lash-lan/personal-website`) | Also the compute tier for narration, and the Council's datastore. |
| Hosting | **Cloudflare Workers** via `@astrojs/cloudflare` | Watches `main`. Every push rebuilds. Nothing is ever uploaded by hand. |
| Domain | **Cloudflare Registrar** | Same account, so there is no separate nameserver step. |
| Database | **Cloudflare D1** | Private pages only. |
| Secrets | **Cloudflare, Settings, Variables and Secrets** | Lash types them in himself. Never in the repository, never in chat. |
| Models | **Hugging Face** (`lashlan1/icetear-video-models`) | Video model weights, pulled by the rented GPU. |
| Language model | **OpenRouter** | One API key, model chosen per feature. |
| GPU | **Runpod** | Rented per use, self-deleting. |

### Tier 3: the framework

**Astro 6**, static by default, with server routes only where genuinely needed.
Node 22 or newer.

```
src/pages/      one file per page, the filename becomes the web address
src/data/       the written content and structured data
src/components/ reusable furniture (header, read-aloud, atmosphere)
src/layouts/    the page shells
src/lib/        the logic behind the tools
public/         files served exactly as they are (images, audio, manifests)
scripts/        build tools and self-tests, run by hand
docs/           prompts, standards, playbooks (this file)
art/            image prompts
```

Commands: `npm run dev` for a local preview, `npm run build` for a production
build.

---

## 3. The signature features, and how each is actually built

These four are what make the site feel expensive. Each has a working reference
in this repository.

### 3.1 Scroll-directed cinema

Full method in `docs/cinematic-scroll-playbook.md`. Read it; do not improvise.

The principle: **the pictures are cinematic and the code only moves a camera
over them.** Scroll position is the clock, so every visual is a pure function of
scroll progress and scrolling back up rewinds exactly.

Image pipeline: Claude writes prompts into `art/PROMPTS.md` with one shared
style line and exact pixel sizes. Image 01 is made first and attached to every
later prompt to hold the world together. Lash generates them in ChatGPT. Claude
builds a contact sheet, matches each image to its slot, cuts out backgrounds
where transparency failed, trims, and exports WebP into `public/cine/`. The
whole lashlan.com set was about 2.5 MB.

### 3.2 Reading aloud with auto-scroll

`src/components/ReadAloud.astro`, fed by `src/data/narration.js`.

Two layers, one button:

- **If narrated audio exists**, it plays, and each line lights up as it is
  spoken using the timings recorded when the audio was made. The page scrolls
  itself to keep the spoken line centred.
- **If no audio exists yet**, it falls back to the browser's own built-in
  voice. So the button works on every page from the first day and silently
  improves as narration is added.

The timing files live under `src/` rather than `public/` for a specific reason:
the Cloudflare build machine has no filesystem access, so the pages pick them up
through Vite's `import.meta.glob` at build time. Get this wrong and the build
fails with a confusing error.

Narration is **mood-aware**. Each story names mood zones (hearth, frost, dread,
wonder, wrath, abyss, gilded) and each mood sets a speaking rate and a silence
length, so the narrator grows heavier through dread and quickens through wrath.

For a home page where the narration should drive the *cinema* as well as the
scroll, do not glide line to line. Draw a smooth curve through each line's
target scroll position against the audio clock and move the page along it every
frame. Playbook, section 6.

### 3.3 Atmosphere as standard furniture

Every page gets, from `SectionLayout.astro`: a themed colour set applied as
custom properties on `<html>`, a fixed cold haze and film grain behind
everything, twenty-four drifting dust motes on a canvas, frost that gathers
along section rules as they come into view, and content that rises out of the
dark on scroll.

This is the cheapest expensive-looking thing in the whole stack. It is about 200
lines and it applies to every page at once.

### 3.4 The private wing

`/plan`, `/atelier`, `/council` and the Forge sit behind one password. No
accounts, no user table. Get the password right once and you are handed a
cookie carrying a cryptographically signed ticket good for thirty days, so the
password is never stored and never sent again. `/plan` is also installable to a
phone home screen as its own app, with a service worker that caches the shell
but deliberately never caches a page load or anything under `/api/`.

---

## 4. The standard build sequence for a new legacy site

1. **The conversation first.** Who is this for. Who is in it. Who is still
   alive. What must never be published. See section 6, because for a family
   site this is the part that can actually hurt someone.
2. **Content before code.** Get the text into `src/data/` as structured files.
   Pages read from data; nothing is typed into a page by hand.
3. **Skeleton pages** on the shared layout. Readable, calm, finished, with no
   animation at all. This is the version that must survive with JavaScript
   switched off.
4. **Shot list, then prompts, then images.** Fewer, better scenes beat many
   thin ones. Twelve images carried seven scenes on lashlan.com.
5. **Build the cinema** over the skeleton, never instead of it.
6. **Narrate**, once the text is final. Narrating before the words settle wastes
   the run and leaves stale audio that is hard to spot.
7. **Verify locally**, properly, per section 5.
8. **Show Lash. Wait. Publish only on his word.** Then verify the real address.

---

## 5. Verification, which is not optional

Lessons that each cost real time:

- **`curl` lies.** A redirect made by the page's own scripts still returns 200,
  and text drawn by JavaScript is not in the HTML. Check in a real browser, or
  drive headless Chrome over the DevTools protocol with `docs/tools/cdp.mjs`.
- **Lash's Windows laptop has animation effects switched off**, so Chrome there
  shows the still version. Say this up front, every time, before he reports that
  nothing moves. The fix: Settings, Accessibility, Visual effects, Animation
  effects on, then refresh.
- **A hidden browser pane pauses animations**, so pages look washed out. Bring
  it to the front before judging.
- **Old preview servers keep their ports.** Stop them, or test a stale build.
- **Git Bash mangles backslashes in heredocs.** Write files with the Write or
  Edit tool.
- **Python cannot open the long scratchpad path.** Do Python work in a short
  folder such as `C:\Users\lashl\AppData\Local\Temp\tl\`.

Every release checks: a scroll sweep at 1440x900 and 390x844 with screenshots
tiled into contact sheets; no sideways scrolling on phones; the no-JavaScript
version complete and readable; Listen following, pausing on hand-scroll,
resuming, stopping. Then the same sweep against the live address.

The repository has **no test framework**. Correctness is held by hand-run
self-test scripts: `scripts/*-selftest.mjs`. Any new engine gets one. Any engine
without one is unverified, however good it looks.

---

## 6. What is missing

This is the part that matters. The site is good. The **product** is not
finished. Ranked by what hurts soonest.

### 6.1 Blocking, for a family site specifically

1. **No consent and takedown policy.** A family legacy site publishes the names,
   faces and stories of living people. There is nothing in this repository about
   who agreed, what they agreed to, or how a relative asks for something to come
   down. For a personal mythology site that gap is nothing. For a family site it
   is the whole risk. Needed: a written consent record per named living person,
   a stated takedown route, and a rule that anything contested comes down first
   and gets discussed after.
2. **No privacy notice.** Required before analytics of any kind is added, and
   doubly so if visitors are outside Malaysia.
3. **No succession plan.** A *legacy* site whose domain, hosting, database and
   secrets all live in one personal Cloudflare account dies with access to that
   account. Needed: a written handover document naming where the domain, the
   repository, the secrets and the backups are, and who gets them.

### 6.2 Blocking, technically

4. **No build check before publishing.** Cloudflare rebuilds on every push to
   `main`. There is no workflow that runs `npm run build` on a pull request, so
   a broken build reaches the live site before anyone knows. One GitHub Actions
   workflow fixes this. It is the single highest-value missing piece.
5. **No staging address.** Nothing between the local preview and the live
   public site.
6. **No backup of D1 or of the audio.** 103 MB of narration is in the repository,
   which is a backup of sorts. The database has none.
7. **No uptime check.** If the site breaks, the way anyone finds out is by
   looking.
8. **The Squire's narration is not reproducible.** See 1.2. Extend
   `narrate.py` to cover it, or accept that those files are hand-made artefacts
   and record that fact in writing.

### 6.3 Missing for reach

9. **No visitor analytics.** PostHog is the stated intent and is not installed.
   Decide it properly: PostHog is generous and powerful and sets cookies, so it
   needs the notice in 6.2. Cloudflare Web Analytics is cookieless, free,
   needs no notice, and tells you much less. For a family site, start cookieless.
10. **No SEO at all.** No `sitemap.xml`, no `robots.txt`, no canonical links, no
    `og:image`, so a shared link shows a bare grey box with no picture. For a
    site meant to be passed around a family by message, the social preview image
    matters more than the search ranking.
11. **No structured data**, so a family tree or a timeline cannot be understood
    by anything but a human reader.

### 6.4 Missing to make it repeatable

12. **No starter template.** Everything is grown inside one repository. A new
    site today means copying files by hand and hoping. Needed: a skeleton
    repository carrying the layout, the atmosphere, the ReadAloud component, the
    narration pipeline, the build check and this document, with the content
    emptied out.
13. **The README is still the default Astro starter text.** It describes a
    template nobody is using. Anyone opening the repository is misled in the
    first ten seconds.
14. **No cost model per site.** Right now: domain roughly 10 USD a year,
    Cloudflare free, GitHub Actions free for public repositories, OpenRouter and
    Runpod pay as used and only for the private tools. A client-facing version
    needs this written down before a price is quoted.
15. **No accessibility position.** This site deliberately keeps its motion
    whatever the operating system prefers, by Lash's own decision. That is a
    legitimate artistic choice for his own mythology. It is the **wrong default**
    for a site an eighty-year-old relative will open. Make it a conscious
    per-site decision and record it.
16. **No art provenance record.** The pictures are AI-generated. Nothing records
    which tool, which prompt, which date. For a family archive meant to outlive
    everyone, that is exactly the kind of thing descendants will want to know.

---

## 7. The one-page version

**Claude** builds. **ChatGPT** makes the pictures and sharpens the words.
**Kokoro on GitHub Actions** reads it aloud. **GitHub** holds the code and runs
the narration. **Cloudflare** hosts the site, the domain, the database and the
secrets. **Runpod** and **OpenRouter** and a **home PC voice server** power the
private tools only, and no public page may ever depend on them.

Content lives in `src/data/`. Pages read from data. The still version must be
finished before the cinema is built on top of it. Audio must be reproducible by
a committed script. Secrets live in Cloudflare and Lash types them himself.
Nothing publishes without his word, and nothing is called done until the real
address has been checked.

The four things to build next, in order: **the build check**, **the consent and
takedown policy**, **the social preview image and sitemap**, **the starter
template**.
