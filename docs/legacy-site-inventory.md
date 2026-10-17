# What the Hemachandra Legacy site is actually made of

Every system, platform, model, piece of infrastructure and repository used to
build and run https://hemachandralegacy.com, explained in plain language.

For each one: what it is, what it does on this site, who pays for it, and what
breaks if it disappears.

---

## Part 1: The brains. Things that make the content

### Claude Code
**What it is:** an AI that reads and writes the actual code of the site, running
in a terminal window.

**What it does here:** everything structural. It built all nineteen page
sections, the design system, the opening film, the read-aloud machinery, the
visitor dashboard, the build checks and the helper scripts. It also set up the
hosting and the domain routing once given permission.

**Who pays:** a Claude subscription.

**If it disappears:** nothing breaks. The site is finished, plain files. You
would just need another way to make changes.

### ChatGPT
**What it is:** OpenAI's chatbot, used here for pictures and for words.

**What it does here:** two separate jobs. It generates and enhances images from
prompts that Claude writes. And it sharpens the written script of each page
before it goes in.

**Who pays:** a ChatGPT subscription.

**If it disappears:** nothing breaks. The images are already files sitting in
the repository.

### Qwen 3 TTS
**What it is:** an open text-to-speech model. "Text to speech" means it turns
written words into spoken audio. This one can also **clone a voice**: give it a
recording of someone and it reads new words in that person's voice.

**What it does here:** it is the narrator. It reads the whole Chronicle aloud.
It also reads Yalindrani's letter in **Yali's own cloned voice**, from a
recording she made herself on 28 September 2026 and chose between two takes, and
Amma's and Chammi's notes in theirs.

**Where it runs:** on your own Windows PC, in a Python environment called
`qwen3tts`, driven by a script called `narrate_hemachandra.py`.

**Who pays:** nobody. It runs on hardware you already own.

**If it disappears:** the existing audio keeps working forever, because it is a
finished file in the repository. But **you could never make new narration
again**, and neither could anyone else. See Part 5.

### ffmpeg
**What it is:** a free command-line tool for cutting and mixing audio and video.
It is the plumbing underneath almost every media tool in the world.

**What it does here:** it lays your own music track underneath the narrator's
voice and automatically ducks the music out of the way whenever words are
spoken.

**Who pays:** nobody, it is free.

### Python with Pillow
**What it is:** a programming language and its image-editing library.

**What it does here:** two scripts. `build-images.py` takes each photograph and
makes smaller web-friendly copies at three sizes, so a phone downloads a small
one and a laptop downloads a big one. `build-film.py` makes the blurred
backdrop versions used behind each photograph in the opening film.

**Important:** Cloudflare cannot run Python, so the results are saved into the
repository rather than made fresh each time the site is published.

**Who pays:** nobody, both are free.

---

## Part 2: The places. Where the site lives

### GitHub
**What it is:** a website that stores code, keeps every version of it forever,
and lets you see exactly what changed and when.

**What it does here:** it holds the complete site: every page, every photograph,
the narration audio, the written content, and the whole history of changes. It
is also, in practice, your **backup**. All 35 megabytes of photographs and audio
are stored there, permanently, with every earlier version.

**Who pays:** free for this.

**If it disappears:** you still have a copy on your laptop, but you lose the
automatic publishing described next.

### Cloudflare Workers
**What it is:** Cloudflare runs computers in roughly three hundred cities. When
someone opens your site, the files come from the city nearest to them rather
than from one machine somewhere far away. "Workers" is their name for this
service.

**What it does here:** it serves the entire site. Every page, photograph and
audio file. It is deliberately set up so that **almost nothing runs any code**:
when a visitor asks for a file that exists, Cloudflare just hands it over.
That is why the site is fast and why there is almost nothing that can break.

**Who pays:** free at this size.

### Cloudflare Workers Builds
**What it is:** a service that watches your GitHub repository and rebuilds the
site automatically whenever you change something.

**What it does here:** you push a change to GitHub and about five minutes later
it is live. Nothing is ever uploaded by hand. **And the build is a gate:** if
the site contains an em dash or a semicolon anywhere a visitor can read it, the
build fails and the live site stays exactly as it was. A house-style mistake
physically cannot reach the public.

**Who pays:** free at this size.

### Cloudflare Registrar
**What it is:** where the domain name `hemachandralegacy.com` is registered.

**What it does here:** owns the name and points it at the site. Because the
domain and the hosting are at the same company, there is no separate setup step
connecting them. Both `hemachandralegacy.com` and `www.hemachandralegacy.com`
are claimed automatically on the first successful publish.

**Who pays:** you. Roughly 10 US dollars a year. **This is the only running
cost of the entire site.**

### Cloudflare GraphQL Analytics API
**What it is:** Cloudflare already counts every request to your site for its own
purposes. This is the door that lets you read those counts.

**What it does here:** it supplies all the numbers on your private `/visitors`
page: requests per day, unique visitors, data sent, the twelve most visited
pages, the twelve top countries.

**Why this matters:** the counting happens at Cloudflare's end, from traffic
they already see. **There is no tracking script on your site, no cookie on any
visitor, and nothing about any individual person is ever stored.** You get the
numbers and your visitors get complete privacy. There is nothing to disclose and
no cookie banner to write.

**Who pays:** free. Note that unique visitor counts are not offered on every
Cloudflare plan, and the dashboard is built to cope if that one number is
missing.

### Cloudflare secret storage
**What it is:** a safe at Cloudflare for passwords and keys, so they never go
into the code.

**What it does here:** holds two values, both typed in by you and seen by nobody
else: `STATS_PASS`, the password for your visitor dashboard, and
`CF_API_TOKEN`, the key that lets the site read those Cloudflare numbers.

**Who pays:** free.

---

## Part 3: The framework. What the site is built with

### Astro 6
**What it is:** a tool that turns organised source files into finished web
pages, once, in advance. "Static" means the pages are made before anyone visits,
rather than being assembled while a visitor waits.

**What it does here:** it builds the whole site into plain files. The complete
dependency list is **one item**: Astro itself. No React, no Vue, no design
library, nothing else. That is why it is fast, and why there is very little that
can rot or need updating.

**Who pays:** free and open source.

### Node.js 22
**What it is:** the program that lets JavaScript run on a computer rather than
only inside a web browser.

**What it does here:** it runs Astro and the helper scripts. It is a tool, not
part of the finished site.

**Who pays:** free.

### Cormorant Garamond and Inter, from Google Fonts
**What they are:** two typefaces. Cormorant Garamond is the elegant serif used
for headings and anything emotional. Inter is the clean one used for body text.

**What they do here:** they are the entire typography of the site. They load
from Google in a deliberately non-blocking way, because when they blocked the
page the opening film took over six seconds to start.

**Who pays:** free.

---

## Part 4: The repositories. Where each piece of code lives

You have five on GitHub, and one critical folder that is **not** on GitHub.

| Repository | Private? | What it is |
|---|---|---|
| `lash-lan/hemachandra-legacy` | Private | **The legacy site.** The product. |
| `lash-lan/personal-website` | **Public** | Blood of Icetear, bloodoficetear.com. The laboratory where the film mechanics and read-aloud were invented. Also holds the cinematic scroll playbook and the standards documents. |
| `lash-lan/lashlan-com` | Private | lashlan.com. The original proving ground for the scroll film and the Listen button. |
| `lash-lan/dharmalogist` | Private | The Dharmalogist project. Not part of the legacy site, but set up the same way, and several hard-won lessons came from it. |
| `lash-lan/the-dark-lords-council` | Private | Used as a strange and clever database: the Council chat room on Blood of Icetear is literally the comment thread of a draft pull request in this repository. Nothing to do with the legacy site. |
| `C:\Users\lashl\Projects\icetear-forge` | **NOT ON GITHUB** | The voice pipeline. See the warning below. |

### Inside the legacy repository, what each part is for

| Folder or file | What it holds |
|---|---|
| `src/data/content.ts` | **The writing.** All of the Chronicle's text. This is the file the family edits. |
| `src/data/people.ts` | Every family member, how they are related, and which Chronicles are open. The family tree is drawn from this. |
| `src/data/photos.ts` | One record per photograph: caption, alt text, who is in it, era, owner, source, and how certain it is. |
| `src/data/narration.ts` | The read-aloud script, built automatically from `content.ts` so the voice can never read words the page no longer says. |
| `src/components/` | One file per chapter of the story, in order. |
| `src/layouts/Base.astro` | The frame around every page: masthead, menu, progress line, and all the sharing and search tags. |
| `src/styles/global.css` | The design system. Every colour, size and spacing value is defined here and nowhere else. |
| `src/scripts/film.js` | The director of the opening film. |
| `src/scripts/site.js` | All the page behaviour, in small named pieces. |
| `src/worker/` | The only code that runs on a server: your private visitor dashboard. |
| `public/images/` and `public/audio/` | The photographs and the narration, served exactly as they are. 311 files, 35 megabytes. |
| `docs/sources.md` | Where every professional fact came from. Private, in the repository, never on the website. |
| `docs/family-interview-checklist.md` | Everything still to collect from the family. |
| `README.md` | Written for the family, not for an engineer. How to fill in the brackets, add a photograph, add a child. |
| `CLAUDE.md` | The instruction manual for whoever or whatever works on the site next. |

---

## Part 5: The one thing that is not safe

Everything above is either free, replaceable, or sitting permanently in GitHub.
One piece is not.

**The voice pipeline exists in exactly one place: a folder on your Windows PC
called `icetear-forge`, which is not on GitHub.**

To make narration today you need all of this at once:

1. That folder, with `narrate_hemachandra.py` inside it.
2. A Python environment called `qwen3tts` installed on that machine.
3. A voice server started by a `.bat` file in that folder.
4. The voice recordings that Yali, Amma and Chammi's cloned voices were made
   from.

None of it is versioned. None of it is backed up anywhere this document can
point at. It cannot be handed to anyone. If that laptop dies, **the finished
audio survives** (it is a file in GitHub) but the ability to make any new
narration, for this site or any future one, dies with the machine.

This is the single biggest risk in the whole operation, and the single biggest
obstacle to selling this as a product.

---

## Part 6: The whole thing in one paragraph

**Claude Code** writes the code. **ChatGPT** makes the pictures and sharpens the
words. **Qwen 3 TTS** on your own PC clones real voices and reads the Chronicle
aloud, with **ffmpeg** mixing your music underneath. **Python** shrinks the
photographs. **Astro** turns it all into plain finished web pages. **GitHub**
stores everything forever and is your backup. **Cloudflare** serves the site
worldwide, owns the domain, rebuilds automatically on every change, refuses to
publish a house-style mistake, holds your two passwords, and quietly counts your
readers without placing a single tracker on anyone.

Total running cost: about **10 US dollars a year** for the domain. Everything
else is free at this size.
