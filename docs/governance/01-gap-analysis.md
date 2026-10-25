# Gap analysis: the governance framework against the site that already exists

The assessment of 25 October 2026 was written without sight of the code. This
file closes that gap. It maps the framework onto **hemachandralegacy.com**,
which is live, publicly indexed, and about living people.

Everything below was established by reading the repository on 25 October 2026.

---

## Part 1: What already exists and is genuinely good

The assessment asks for several controls that are already built. Credit where
it is earned, because it means the start is not from zero.

| Control asked for | Already in place | Where |
|---|---|---|
| Source tracking for every fact | A private source record, ranked by source quality, with an identity warning naming a different person of the same name | `docs/sources.md` |
| No invented content | The content integrity rule. Unknowns render as nothing until filled. An unsourceable fact does not ship | `CLAUDE.md`, `content.ts` |
| Asset provenance | One record per photograph with owner, source, people, era and a verification level of confirmed, approximate or unknown | `src/data/photos.ts` |
| Public and private separation | Each photograph carries a `visibility` of public or private | `src/data/photos.ts` |
| Third-party rights judgement | A newspaper photograph deliberately excluded: the paper's copyright, and it shows other living people | `CLAUDE.md` |
| Correction discipline | A photograph once mis-captioned as a wedding reception is now "a formal gathering" until the family confirms | `CLAUDE.md` |
| Naming restraint | Only people the family has named are named. Several individuals remain deliberately uncaptioned | `CLAUDE.md` |
| Human approval before publishing | Publish only on the family's word, then verify the live address | `CLAUDE.md` |
| Secrets handling | Secrets typed by the owner alone, never in the repository | `.dev.vars.example`, `CLAUDE.md` |
| A publish gate | The build fails on a house-style breach, leaving the live site untouched | `scripts/check-copy.mjs` |
| Privacy-preserving analytics | No tracker, no cookie, nothing personal stored. Counts read from the host's own aggregated traffic | `src/worker/index.ts` |

**Assessment:** the editorial and provenance discipline is already at a standard
most commercial operators never reach. The integrity rule is real, enforced in
code, and documented. This is the asset.

---

## Part 2: The urgent finding

### The cloned voices are not disclosed to visitors

**Established by reading the code, 25 October 2026.**

The site narrates Yalindrani's letter in **Yalindrani's own cloned voice**,
built from a recording she made herself on 28 September 2026 and chose between
two takes. Two further family members, recorded as Amma and Chammi, have their
notes read in their own cloned voices.

The fact that these voices are synthetic appears in exactly two places:

- `src/data/content.ts` line 549, inside a code comment.
- `src/data/narration.ts` line 52, inside a code comment.

**Both are code comments. Neither is ever rendered.** What a visitor sees is a
button marked "Listen" and a duration. Nothing on the page tells them the voice
is a recreation rather than a recording.

Why this matters, in three separate ways:

1. **It is the company's own rule.** The voice policy requires visitors to be
   told when a voice has been digitally recreated. The reference build breaks
   the rule the business intends to sell.
2. **It may be a legal obligation.** EU AI Act Article 50 has applied since
   **2 August 2026** (verified 25 October 2026). Its deployer duty covers audio
   that resembles a real person and would falsely appear authentic. The site
   carries `robots: index, follow`, so it is publicly indexed and reachable from
   the EU. **Whether a consenting person's own cloned voice reading her own
   words falls inside that definition is a real legal question and is marked as
   needing confirmation.** It is not obviously a deepfake: there is no deception
   and she consented. But the fix costs one sentence, and the argument costs a
   lawyer.
3. **It is the second principle.** Reconstruction is not reality. A listener who
   believes they are hearing a recording of a living woman, when they are
   hearing a synthesis, has been given a false impression without anyone
   intending it.

**Recommended fix, for Lash to approve, not to be made without him:** one line
beside the Listen control and one beside Yalindrani's letter, saying plainly
that the voice was digitally recreated from a recording she made and approved.
This is a change to his live family site, so it is proposed here and nothing has
been altered.

---

## Part 3: What is missing

| Missing | Severity | Note |
|---|---|---|
| **Any written consent record** | **Critical** | The repository contains no consent from any living person. The site publishes a named living man's biography, his wife's private love letter, two other women's notes, photographs of children, and three cloned voices of living women. Participation is evident. Written permission is absent |
| **Voice disclosure to visitors** | **Critical** | Part 2 above |
| **A voice recording retention and deletion policy** | High | The source recordings are personal, biometric-adjacent data. There is no rule on where they live, who may reach them, or when they are destroyed |
| **A takedown route** | High | No stated way for a relative to ask for something to come down |
| **A privacy notice** | High | None on the site |
| **Deliberate indexing decision** | High | `robots: index, follow` is the default that shipped. Nobody decided that a living family's private letters should be search-engine indexed. It may well be the right answer. It was not a decision |
| **Vendor assessment** | Medium | No record of what the narration provider stores, trains on, or deletes |
| **Third-party permissions register** | Medium | `photos.ts` tracks verification and ownership, but not who authorised publication |
| **Retention schedule** | Medium | Nothing says how long anything is kept |
| **Incident procedure** | Medium | None |
| **Continuity and succession** | Medium | Domain, hosting, repository and secrets all sit in one personal account |

---

## Part 4: Two risks the assessment could not see

**1. The narration cannot be reproduced.** The voice pipeline exists only on one
Windows laptop, in a folder that is not in any repository, needing a specific
Python environment, a voice server started by a batch file, and the original
recordings. If that machine fails, the published audio survives because it is a
committed file, but no new narration can ever be made, for this family or any
other. This is a continuity failure inside a business selling permanence.

**2. Part of the existing narration is already unreproducible in a second
project.** The same pattern appeared on the other site in this account, where
fifteen chapters of audio exist that no committed script can regenerate. The
habit is the risk, not the instance.

---

## Part 5: The honest position on the reference site

The reference build is a son's birthday gift to his living father, made with the
participation of the family, including a wife who recorded herself and chose
between two takes. Nothing about it is deceptive and nobody has been wronged.

It is also, as of the moment it becomes a sales asset, a **commercial reference
operating without the paperwork the business intends to sell.**

Two things follow, and only two.

**Do not remove the cloned voices.** They are the best thing in the product and
the family participated willingly. Removing them would destroy the asset to
solve a paperwork problem.

**Retrofit the paperwork and the disclosure.** Get the four consents signed by
the people who already participated, add the disclosure line, and decide the
indexing question deliberately. That converts the reference from an exposure
into exactly what it should be: the first properly governed Chronicle, and the
proof that the process works.
