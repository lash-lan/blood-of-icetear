# Data classification, minimisation and retention

---

## 1. Before collecting anything

Six questions, answered in writing, for every category of material:

1. Do we need this?
2. Why?
3. Who will see it?
4. Which AI providers will receive it?
5. How long is it kept?
6. Can the same result be reached with less sensitive material?

A worked example: a timeline needs a **year of birth**. It does not need a
national identity number. Identity documents are collected only where an
identity genuinely has to be verified, and are never published.

## 2. The three classifications

| Class | Examples | Who may reach it |
|---|---|---|
| **Public** | The approved biography, selected photographs, the narration | Website visitors |
| **Restricted** | Family-only stories, private galleries, unpublished material | Named, authenticated invitees |
| **Confidential** | Identity documents, original voice recordings, voice models, signed consent forms, the source record | Named administrators only |

**Rules that follow from the classes:**

- A client's source archive is never reachable from the published site, and is
  never indexed.
- Confidential material never enters the website repository.
- Confidential material is never pasted into a general AI tool.
- A secret web address is not access control. Restricted material is protected
  by server-side authorisation, not by an unlisted link.
- Protection covers originals, thumbnails, downloads, backups and any data
  route. Hiding a navigation link is not protection.

## 3. The three site types

| Type | Controls |
|---|---|
| **Public Chronicle** | Publication consent on file, a review of what is searchable, a working takedown route |
| **Family-only Chronicle** | Authentication, invitation management, restricted galleries, no indexing |
| **Private archive** | Strong authentication, encryption, no indexing, access logging |

**Said plainly to every client:** anyone who can see a page can copy it. An
invitation-only Chronicle limits who gets in. It cannot stop someone who is
already inside from taking a screenshot.

## 4. Indexing is a decision, not a default

Every Chronicle makes an explicit choice, recorded on Form A, whether search
engines may find it. The technical default for a new Chronicle is **not
indexed**. Indexing is switched on only where the subject has ticked that line.

*This reverses the behaviour of the existing reference build, which shipped with
indexing on because that was the framework's default rather than anyone's
decision. See file 01.*

## 5. Retention schedule

Working positions. **Needs legal confirmation** against Malaysian requirements
before the first paying commission.

| Material | Kept for | Then |
|---|---|---|
| Signed consent forms | Life of the Chronicle, plus 7 years | Securely destroyed |
| Source archive supplied by the family | Life of the Chronicle, unless they ask earlier | Returned as an export, then destroyed |
| Original voice recordings | Life of the authorisation | Destroyed on withdrawal or at the end |
| Voice models | Life of the authorisation | Destroyed on withdrawal or at the end |
| Temporary AI processing files | The working session | Deleted immediately |
| Published assets | Life of the Chronicle | Exported to the family, then removed |
| Backups | 90 days rolling | Overwritten |
| Generated but unused output | 30 days | Deleted |
| Source and fact record | Life of the Chronicle, plus 7 years | Retained with the consents |

**Deletion requests** are acted on within [N] working days. Where a dispute or a
legal hold applies, material is preserved and not published, and the requester
is told that it has been withheld rather than destroyed.

**On business closure**, file 09 governs: every client receives a complete
export before anything is destroyed.

## 6. Legal context

**Verified 25 October 2026.** Malaysia's Personal Data Protection (Amendment)
Act 2024 (Act A1727) received Royal Assent on 9 October 2024 and commenced in
stages across 1 January, 1 April and 1 June 2025. It introduces a data
protection officer requirement and a breach notification duty. Secondary
guidance widely reports a **72-hour** notification window to the Commissioner
where the criteria are met, with triggers described as significant harm or
significant scale.

**Needs legal confirmation.** The specific numeric thresholds for appointing a
data protection officer could not be verified from the Commissioner's own
guidance during this assessment. Figures circulating in commentary, such as
20,000 individuals or 10,000 for sensitive data, must be checked against the
Commissioner's published guidance before being relied on. Reported penalty
figures also conflict across sources.

**Policy regardless of threshold:** one named person is accountable for privacy
and information security from today.

**Monitor, do not assume:** Malaysian regulatory work on AI and personal data is
developing. Treat announcements as developments to watch, not as obligations
already in force.
