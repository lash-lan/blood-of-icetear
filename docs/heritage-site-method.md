# How to build a family heritage website for someone else

The formal method, taken from what was actually built for Hemachandra Legacy
(https://hemachandralegacy.com) and turned into something repeatable.

Two parts. **Part A** is the method in plain language: what you sell, and the
order you do it in. **Part B** is the technical detail, and it covers only the
handful of moments where Lash personally has to log in, pay for something, or
type a password. Everything else can be done without him.

House rules carried over: no em dashes, no semicolons in anything a visitor
reads, and always say **locally** or **live**.

---

# PART A: THE METHOD

## A1. What the client is actually buying

Not "a website". A **Chronicle**: one person's life, told as a story, on a
permanent web address, that the family can keep adding to for decades without
hiring anyone again.

Five things make it worth paying for, and they are the things a cheap
competitor cannot copy:

1. **Nothing is invented.** Not one quotation, memory, date or achievement. Where
   something is not known, the page shows a quiet, tasteful gap. This is the
   promise, and it is also the reason a family trusts you with their father.
2. **It reads aloud**, in a real narrator's voice, scrolling itself as it goes,
   so an elderly relative can simply press play.
3. **It opens with a short film** made from the family's own photographs,
   directed by the visitor's scroll.
4. **The family can edit it themselves** afterwards, in one plain text file,
   with no developer.
5. **The family's privacy is total.** No tracking script, no cookie, no
   third-party anything. The owner still sees how many people read it.

## A2. The nine stages, in order

### Stage 1: The conversation, and the paperwork
Before any work. Establish who the Chronicle is about, whether they are alive
(it changes everything about the tone), who else appears, and what must never be
published.

**Get written consent from every living person who appears**, covering three
separate things: their image, their written words, and their voice. Agree a
takedown route in writing: anything contested comes down first and is discussed
afterwards. Agree who owns the finished site, and who hosts it after handover.

This is the only stage that can sink the business, so it comes first.

### Stage 2: Collect
Interview the family against a checklist. Gather photographs, documents,
letters, and the professional record.

**Every fact needs a source the family can point at.** Build the source record
as you go. Nothing goes on the site that is not in it. The reader never sees a
citation, but the file exists.

Include an identity warning for the subject: there is more than one person with
most names, and one wrong fact from the internet poisons the whole promise.

### Stage 3: Write the content into one file
All the writing goes into a single data file. Every unknown is left as a
bracketed gap. Every photograph gets a record carrying its caption, who is in
it, who owns it, where it came from, and how certain that is: **confirmed**,
**approximate**, or **unknown**.

Only name people the family has named. Everyone else stays unnamed.

### Stage 4: Prepare the photographs
Each photograph is turned into three web sizes automatically, so a phone
downloads a small one and a laptop a large one. Blurred backdrop versions are
made for the opening film.

### Stage 5: Build the still site
Every chapter, on the shared design, readable and finished, with **no animation
at all**. This version must work with scripts switched off entirely. It is the
floor, and everything else is built on top of it.

### Stage 6: Build the film
The opening sequence. Scroll is the clock, so scrolling back rewinds it
exactly. It never hijacks the scroll and it never performs. It reveals.

### Stage 7: Narrate
Only once the words are final. The script is generated from the page's own
content, so the voice can never read something the page no longer says, and the
Listen button hides itself automatically if the words change afterwards.

### Stage 8: Verify, then show the family
Check on a laptop and a phone, with motion on and off, with scripts on and off.
Then show them. **Publish only when they say so.** Then check the real web
address, not a preview.

### Stage 9: Hand over
Give them: how to edit their own file, the dashboard password, where everything
lives, and a written succession note naming who inherits the domain and the
account. A heritage site whose hosting dies with one person's login is not
heritage.

## A3. The five rules that never bend

1. **Never invent anything about a real person.** An honest gap beats a
   beautiful invention.
2. **An unsourced fact does not ship.** There is no hedging sentence to hide
   behind.
3. **Animation reveals, it never performs.** The visitor always controls the
   scroll.
4. **No tracker on any page, ever.** The owner's curiosity never costs a
   visitor their privacy.
5. **The family must be able to edit it without you.** If they need you, you
   sold them a dependency, not an archive.

---

# PART B: THE TECHNICAL SIDE

## B1. The parts, and who does them

| Job | Done by | Lash involved? |
|---|---|---|
| Write all the code | Claude Code | No |
| Create the client's private code repository | **GitHub MCP** | No |
| Put all the files into it | **GitHub MCP** | No |
| Generate or enhance images | **OpenRouter MCP**, or ChatGPT by hand | No |
| Make the narration audio | **OpenRouter MCP** | No |
| Turn files into web pages | Astro | No |
| Shrink the photographs | Python script | No |
| Serve the site worldwide | Cloudflare Workers | No, after setup |
| Count the readers privately | Cloudflare's own analytics | No, after setup |
| **Buy the web address** | Cloudflare Registrar | **YES** |
| **Connect Cloudflare to the new repository** | Cloudflare dashboard | **YES**, once |
| **Set the two dashboard passwords** | A terminal command | **YES**, once |
| **Collect signed consent** | Lash and the family | **YES** |

That is the whole list. **Four moments.** Everything else runs without him.

## B2. The four moments Lash has to be present for

### Moment 1: Buy the web address
Cloudflare dashboard, Domain Registration, Register Domains. Search the family
name, buy it. Card details, so it has to be him.

About 10 to 15 US dollars a year depending on the ending. **This is the only
unavoidable running cost of a site.**

Buy it inside the **same Cloudflare account** that will host the site. Doing
that removes an entire category of setup problem: no nameservers, no waiting,
no DNS records to paste anywhere.

### Moment 2: Connect Cloudflare to the new repository
Once per site, in the Cloudflare dashboard: Workers and Pages, Create, then
Connect to Git, choose the new repository, and set:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Preview builds: off

From then on, every change pushed to GitHub rebuilds and republishes the site by
itself, in about five minutes. Nothing is ever uploaded by hand again.

This needs a logged-in Cloudflare session, which the tools here cannot have, so
it has to be him. It is roughly six clicks and four boxes.

### Moment 3: Set the two secrets
Only needed if the client wants the private visitor dashboard. Two commands, in
a terminal, in the project folder:

```
npx wrangler secret put STATS_PASS
npx wrangler secret put CF_API_TOKEN
```

Each asks for the value and hides it while typing. `STATS_PASS` is a password he
invents. `CF_API_TOKEN` is made in the Cloudflare dashboard under My Profile,
API Tokens, Create Custom Token, with **Zone Read** and **Analytics Read** for
that one domain only.

**Never typed by anyone but Lash.** They never go in the code, never in a chat,
and never in a file that is committed. Until they are set, the dashboard page
politely explains how to set them rather than breaking.

### Moment 4: Consent
Not technical at all, and the most important one. Signed consent per living
person for image, words and voice, plus the takedown route and who owns the
result. No tool can do this, and no site should launch without it.

## B3. What the MCPs can now do that used to need him

An MCP is a tool connected directly to this session, already signed in, so it
acts without anyone logging in again. Three matter here.

**GitHub MCP.** Can create the client's private repository and push every file
into it. No manual setup, no uploads.

**OpenRouter MCP, image generation.** Can generate artwork directly. For a
heritage site most pictures are the family's real photographs, so this is for
accents and backdrops rather than for faces.

**OpenRouter MCP, speech generation.** This is the significant one. **The
narration can be made entirely through this session, with no PC, no Python, and
no voice server.** It bills the existing OpenRouter account.

**Cloudflare MCP.** Can read what Workers exist, and can create databases and
storage. It **cannot** register a domain, connect a repository, or set secrets,
which is exactly why B2 exists.

## B4. The voice decision, which is the real choice per client

Checked live against the current OpenRouter catalogue.

**Option 1: a professional preset voice.** Recommended as the default.

Ready now, through this session, nothing to install. Strong current options:

| Model | Why | Rough cost |
|---|---|---|
| `google/gemini-3.8-flash-tts` | Ranked first for text-to-speech quality, and the cheapest of the good ones | about 9 US dollars per million output tokens |
| `microsoft/mai-voice-2` | Ranked first for sounding like a real human recording | about 22 US dollars per million tokens |
| `elevenlabs/eleven-multilingual-v2` | Built for long, consistent narration such as audiobooks | about 40 US dollars per million tokens |

A whole Chronicle is a few thousand words, so narration cost per site is
**pennies to a few dollars**, not a line item worth discussing with a client.

**Option 2: clone a real family member's voice.** The premium feature, and what
made Yali's letter land on the Hemachandra site.

Through the MCPs, the only route is `heygen/heygen-voice-1`, and it requires
**Lash's own HeyGen account and key** to use clones from it. That is a fifth
moment of involvement, so only take it on when a client is paying for it.

The current setup, Qwen 3 TTS on the home PC, also does this, and costs nothing,
but it only exists on one machine and cannot be handed to anyone.

**The standard:** every Chronicle is narrated in a preset voice. Cloning is an
upsell, sold per person, and only ever with that person's written consent and
their own recording. **Never clone the voice of someone who has died, or someone
who has not personally agreed.** That is both the ethical line and the legal
one.

## B5. The running cost of one client site

| Item | Cost |
|---|---|
| Web address | 10 to 15 US dollars a year |
| Hosting, worldwide | Free at this size |
| Automatic republishing | Free at this size |
| Reader statistics | Free |
| Code storage and backup | Free |
| Narration | Pennies to a few dollars, once |
| Images, if generated | Pennies each |

**Total ongoing: roughly 15 US dollars a year per site.** Everything else is
one-off effort. Price the work, not the infrastructure.

## B6. What has to be built before site number two

Four things, and only the first is urgent:

1. **A starter template.** A skeleton repository with the design, the film, the
   read-aloud, the house-style check and the visitor dashboard, with all of one
   family's content stripped out. Today a second site means hand-copying files
   out of a repository full of the Hemachandra family's private letters.
2. **The consent and takedown pack.** The forms from Stage 1 and Moment 4.
3. **A scope and price document.** What is included, what the family must
   supply, how many rounds of changes, who owns it, who hosts it afterwards.
4. **A check that runs before publishing**, so a mistake is caught before it
   reaches a client's live site rather than after.
