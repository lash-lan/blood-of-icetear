# The release gate and the permissions register

No Chronicle is published without passing this. One page, signed, per project.

---

## The permissions register

One row per asset. Kept Confidential. This is the document that answers "who
said you could" two years later.

| Field | Meaning |
|---|---|
| Asset ID | The photograph, letter, recording or story |
| Supplied by | Who gave it to us |
| People in it | Everyone identifiable, living or dead |
| Rights owner | Who owns it, which is often not who supplied it |
| Authorised by | Who signed, and which form |
| Authorisation covers | Archive only, family-only, or public |
| Restrictions | Anything excluded, time-limited or conditional |
| Verification | Confirmed, approximate, or unknown |
| Status | Cleared, pending, withheld, or disputed |

**A row at pending, withheld or disputed cannot be published.** The gate below
checks this mechanically.

*The existing `photos.ts` already carries people, owner, source, visibility and
verification. The register extends it with the authorisation columns rather than
replacing it.*

---

## The release gate

### Section 1: People

- [ ] Every living person named, pictured or quoted is listed.
- [ ] Each has signed Form A or Form C.
- [ ] Every child has a signed Form D, and the default of family-only visibility
      was applied unless the guardian chose otherwise.
- [ ] Where the subject has died, the authority record in file 02 is complete.
- [ ] No third party appears whose permission was assumed from the client's.

### Section 2: Facts

- [ ] Every fact has a source in the record.
- [ ] A human has checked every date, name, quotation and claim against it.
- [ ] Verified facts, recollections, disputed accounts and reconstructions are
      distinguished on the page.
- [ ] An identity check was made on the subject, confirming no other person of
      the same name has been conflated with them.
- [ ] No unsourced sentence remains.

### Section 3: Rights

- [ ] Photographer rights considered for any professionally made photograph.
- [ ] Music licensed for use.
- [ ] Letters, diaries, articles and published material cleared.
- [ ] Fonts, illustrations and stock assets licensed.
- [ ] Commercial rights confirmed for every AI-generated element.
- [ ] Ownership of the deliverable is stated in the client agreement.

### Section 4: AI and disclosure

- [ ] Every generated or altered asset is listed with its original, its tool and
      its approver.
- [ ] Narration is labelled as a licensed synthetic voice, or as a disclosed
      recreation.
- [ ] Reconstructed scenes are labelled as reconstructions.
- [ ] No AI-generated image is presented as evidence of the event it shows.
- [ ] No interactive persona is present.

### Section 5: Voice, where used

- [ ] Form B signed by the person themselves.
- [ ] They recorded the source themselves and approved a sample.
- [ ] They approved the exact script.
- [ ] Identity verified, and the method recorded.
- [ ] Disclosure is on the page.
- [ ] Source recording and model are in Confidential storage.
- [ ] No deceased person's voice has been recreated.

### Section 6: Data and access

- [ ] Every asset classified Public, Restricted or Confidential.
- [ ] No Confidential material is reachable from the published site.
- [ ] Restricted areas use server-side authorisation, not hidden links.
- [ ] The indexing decision was taken deliberately and matches Form A.
- [ ] Retention periods are set and recorded.
- [ ] The client has been told plainly that anyone who can see a page can copy it.

### Section 7: Security and continuity

- [ ] Secrets are in the secret store, not in the repository.
- [ ] The analytics key is read-only and scoped to this one address.
- [ ] Backups exist and a restore has been tested.
- [ ] The client has a complete export of their archive.
- [ ] The succession clause is signed and names who inherits.

### Section 8: Build quality

- [ ] The house-style gate passes.
- [ ] Every photograph referenced actually exists.
- [ ] Checked on a phone and a laptop, with motion on and off, and with scripts
      disabled.
- [ ] Narration follows, pauses on a hand scroll, resumes and stops.
- [ ] The family has seen it and said yes, in writing.
- [ ] The live address was checked after publishing, not a preview.

---

## Sign-off

| | |
|---|---|
| Chronicle | |
| Subject, and whether living | |
| People featured | |
| AI tools used | |
| Generated content published | |
| Audience: public, family-only, private | |
| Unresolved risks, and why they are acceptable | |
| **Approved by** | |
| **Date** | |

**Any unticked box is a stop.** A stop is not overridden by a deadline, a
birthday, or a client's impatience. The milestone is real, and so is the risk.
