# Card art, the last 86

Every card in the set that still has no picture. **86 of 186.**

**Each card below is complete on its own.** The house style and the anti-over-rendering rules are already inside the prompt, so there is nothing to set up first and nothing to remember.

## How to use this

**One block per card, and the negative prompt is inside it.**

1. Copy the whole block.
2. **In Automatic1111 or Forge:** paste it into the positive prompt box and press the blue arrow under Generate. It reads the `Negative prompt:` line and fills both boxes for you.
3. **In ComfyUI, or anywhere without that button:** paste the whole thing into the positive box, then cut everything from `Negative prompt:` onwards into the negative box.
4. **In ChatGPT, Gemini or Midjourney:** paste the whole block as it is. They read the negative line as instructions and it still helps.
5. Save the picture into `public/images/cards/` under the filename given above the block.
6. Tell me when a batch is done and I will wire them up.

**Do the groups in order**, so cards that should look related get made near each other.

### If the pictures come out over-rendered

The wording below fights it, but on Stable Diffusion and Flux the settings cause most of it and no wording fully wins. If you still see speckle, glitter, or cloth that looks like chainmail:

- **Lower the CFG.** Above 7 on SDXL causes it on its own. Try 4 to 5.5, or guidance 2.5 to 3.5 on Flux.
- **Turn off any detail LoRA**, or drop it to about 0.3. Anything called add detail, detail tweaker or more details produces exactly the glitter layer.
- **Lower the denoise on any upscale pass.** Above about 0.35 the upscaler invents texture on every surface, which is what turns wool into mail.

---

## 1. The Red Rangers (8)

Women only. Assassins, scouts and hunters out of the hidden fortress of **Crimson Veil** in Hollanheart Forest. **Recruitment tripled after Ashwinter burned**, so the order is full of widows, orphans and survivors, and every new Ranger learns one name: Baron Garod Khan.

**Two rules the prompts below enforce.** First, **no two Rangers are the same elf**: each one below has her own hair colour, hair style, colouring, face and marks, written into her prompt. Second, **their kit is a rank system.** A Ranger's armour starts deliberately loose and open at every joint, the thigh, the outer leg, the upper arm, the shoulder and the midriff, because mobility beats protection when you are the one choosing the fight. As she rises, **the gaps close**, because her skill comes to make up for the speed she gives away. By leader level there is real metal strapped over the leather, and it never matches, because it was added a piece at a time.

### Red Ranger

Card `N0.01.BOI.001`, save as `red-ranger.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a rank-and-file Red Ranger of the elven corps, a young high elf woman. HER OWN LOOK: dark auburn hair in one tight braid pulled back hard off the face, freckles across a broad nose, grey eyes, and a healed split through one eyebrow. A short recurve bow across her back and two long knives at the hip. She has the steady, unimpressed look of someone who has already buried friends. Behind her, a deep forest of enormous trees with crimson banners hanging between the trunks and the light coming down in shafts. An ordinary soldier of her order, no grandeur at all. RED RANGER KIT, follow exactly: their armour is deliberately loose, mobility before protection. Soft crimson-dyed leather in separate strapped panels rather than a fitted cuirass, cut away at every joint so nothing binds: open at the outer thigh, open down the outside of the leg, open at the upper arm and the shoulder, and open across the midriff, so bare skin shows in those gaps. Everything is held by straps and buckles, not by plates. At this rank there is no metal on her at all beyond buckles and a knife.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Red Rangers Scout

Card `N0.01.BOI.108`, save as `red-rangers-scout.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Red Rangers scout, a high elf woman. HER OWN LOOK: ash-blonde hair cropped close at the sides with a longer swept top, a narrow sharp-boned face, pale green eyes, and a small dark tattoo at one temple. Her kit is the lightest in the corps: no mail at all, a wrapped grey-green cloak for the forest over the crimson leather, one knife, and a pouch of chalk and cord for marking trails. She is half-turned and listening rather than posing, head tilted toward something off to the side. Dense forest behind her, mist between the trunks, early morning light. An ordinary soldier of her order. RED RANGER KIT, follow exactly: their armour is deliberately loose, mobility before protection. Soft crimson-dyed leather in separate strapped panels rather than a fitted cuirass, cut away at every joint so nothing binds: open at the outer thigh, open down the outside of the leg, open at the upper arm and the shoulder, and open across the midriff, so bare skin shows in those gaps. Everything is held by straps and buckles, not by plates. At this rank there is no metal on her at all beyond buckles and a knife.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Moon Warrior

Card `N0.01.LAH.17`, save as `moon-warrior.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Moon Warrior, a high elf woman trained in the Night Forest of the Moon Elves and now serving with the Red Rangers. HER OWN LOOK: silver-white hair worn loose to the shoulder blades, high cheekbones, very dark eyes, and skin that carries a faint lunar radiance as though it is holding light rather than reflecting it. Her one piece of metal is a slim silvered gorget at the throat. Silver-grey silk shows under the crimson leather panels. A curved moonblade held low. Her movement reads as silent and graceful rather than forceful. Behind her, a moonlit forest shore, silver water, a huge low moon. An ordinary soldier of her order, but the light on her is not ordinary. RED RANGER KIT, follow exactly: their armour is deliberately loose, mobility before protection. Soft crimson-dyed leather in separate strapped panels rather than a fitted cuirass, cut away at the joints: open at the outer thigh, the outside of the leg, the upper arm and the shoulder, and across the midriff, so bare skin shows in those gaps. Rank shows as the gaps slowly close, because experience makes up for the lost speed, so at this rank she has earned her first metal: one piece only, and it is scuffed.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Red Rangers Archer

Card `N0.01.LAH.05`, save as `red-rangers-archer.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Red Rangers archer, a high elf woman at full draw. HER OWN LOOK: black hair shaved close on one side with the rest in a long tight braid over the opposite shoulder, warm brown skin, amber eyes, and a long old scar running down the inside of one forearm. Her one piece of metal is a battered steel bracer on the bow arm, which is the piece an archer earns first. A tall elven longbow of yew heartwood with faesilver reinforcement, string at her cheek, arrow nocked, her eye down the shaft and straight out of the frame. Utter stillness in her face. Behind her, deep forest and crimson banners, the light coming down in shafts. An ordinary soldier of her order. RED RANGER KIT, follow exactly: their armour is deliberately loose, mobility before protection. Soft crimson-dyed leather in separate strapped panels rather than a fitted cuirass, cut away at the joints: open at the outer thigh, the outside of the leg, the upper arm and the shoulder, and across the midriff, so bare skin shows in those gaps. Rank shows as the gaps slowly close, because experience makes up for the lost speed, so at this rank she has earned her first metal: one piece only, and it is scuffed.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Red Rangers Warrior

Card `N0.01.LAH.14`, save as `red-rangers-warrior.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Red Rangers warrior, a high elf woman built for the front of a line rather than the edge of it. HER OWN LOOK: copper-red hair in two thick braids wound round her head like a crown, a heavy brow and a square jaw, a nose broken and badly reset, hazel eyes. Her one piece of metal is a single scuffed shoulder plate strapped over the leather on her sword side, reforged out of two broken ones. A short sword in one hand and a buckler in the other. Fresh blood on her sleeve, not hers. She is mid-breath between strikes, not posed. Behind her, fighting in the forest: smoke between enormous trunks, figures indistinct. An ordinary soldier of her order, hard-used gear. RED RANGER KIT, follow exactly: their armour is deliberately loose, mobility before protection. Soft crimson-dyed leather in separate strapped panels rather than a fitted cuirass, cut away at the joints: open at the outer thigh, the outside of the leg, the upper arm and the shoulder, and across the midriff, so bare skin shows in those gaps. Rank shows as the gaps slowly close, because experience makes up for the lost speed, so at this rank she has earned her first metal: one piece only, and it is scuffed.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Red Rangers Tracker

Card `N0.01.BOI.122`, save as `red-rangers-tracker.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Red Rangers tracker, a high elf woman crouched low with two fingers pressed into moss, reading the ground. HER OWN LOOK: mousey light-brown hair in a messy knot with loose strands fallen out of it, a wide mouth, dark freckles across the nose, deep-set brown eyes, and one ear notched through the upper edge. Her one piece of metal is a plain iron ring-collar at the throat. A hunting horn and a coil of cord at the belt, no shield and no bow in hand. She is looking up and away from her own hand toward whatever made the mark, with the flat attention of someone who already knows the answer and does not like it. Dense forest floor behind her, fern and root, thin grey light. An ordinary soldier of her order. RED RANGER KIT, follow exactly: their armour is deliberately loose, mobility before protection. Soft crimson-dyed leather in separate strapped panels rather than a fitted cuirass, cut away at the joints: open at the outer thigh, the outside of the leg, the upper arm and the shoulder, and across the midriff, so bare skin shows in those gaps. Rank shows as the gaps slowly close, because experience makes up for the lost speed, so at this rank she has earned her first metal: one piece only, and it is scuffed.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Red Rangers Squad Leader

Card `N0.01.LAH.03`, save as `red-rangers-squad-leader.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Red Rangers squad leader, a high elf woman of rank and note but no legend. HER OWN LOOK: iron-grey hair pulled back hard into a short tail, weathered olive skin, steel-blue eyes, and a vertical scar through her upper lip. HER METAL: a dark steel gorget, a plate on each shoulder, forearm bracers, and two thigh plates strapped over the leather, none of them matching. A dark officer's sash and a horn at the belt. Her sword is already drawn and held across her body while her other hand is raised flat, signalling the squad behind her to hold. She is looking past the viewer, giving an order without speaking. Behind her, two or three indistinct crimson-clad figures among the trees, deep forest, shafts of light. Someone of rank, not a legend. RED RANGER KIT, follow exactly: their armour starts out deliberately loose and opens up at every joint, and it closes as a Ranger rises, because skill comes to make up for the lost mobility. At this rank she is the most covered Ranger in the forest: the crimson leather panels are still strapped rather than fitted, and still show a little bare skin at the outer thigh and the midriff, but real metal has been added over them, dark and unpolished and clearly fitted by hand at different times.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Amvala Nyxthorn

Card `N0.01.LAH.15`, save as `amvala-nyxthorn.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Amvala Nyxthorn, a high elf woman of House Nyxthorn serving among the Red Rangers. HER OWN LOOK: blue-black hair cut blunt at the jaw, very pale skin, violet-grey eyes, a thin silver chain through one ear. HER METAL: blackened steel rather than the corps' bare steel, a high collar, shoulder and forearm plates and a segmented panel over the midriff, all of it matt and swallowing light. Nyxthorn craft is shadow, and the oldest rule of her house is that darkness is simply where sight fails and the moral weight belongs to the hand, so the dark around her is doing something: it pools at her shoulders and along her blade edge and does not sit the way shadow should. A long thin dagger reversed in her grip. Violet light caught in the leaves behind her, a dark wood at night. Someone of real standing, better armed and better dressed than most, and entirely calm. RED RANGER KIT, follow exactly: their armour starts out deliberately loose and opens up at every joint, and it closes as a Ranger rises, because skill comes to make up for the lost mobility. At this rank she is the most covered Ranger in the forest: the crimson leather panels are still strapped rather than fitted, and still show a little bare skin at the outer thigh and the midriff, but real metal has been added over them, dark and unpolished and clearly fitted by hand at different times.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 2. House Icetear (4)

The first of the eleven elven houses of the Ice Kingdom of **Azaelion**, named when **Hansenel Icetear** killed a serpent lord's beast by driving his sword up through the roof of its mouth. Pale blue, white and old silver, and frost that blooms into small flowers rather than simply freezing.

### Icetear Squire

Card `N0.01.BOI.097`, save as `icetear-squire.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a young Icetear squire, a high elf barely out of boyhood, holding a far-too-large frost-rimed longsword upright in both hands for someone else to take. He is dressed in pale blue house livery over mail that does not quite fit him, and he is trying very hard to look equal to the room. Frost blooms in small flowers across the carved stone pillar beside him. A hall of pale blue ice, cold winter light. An ordinary servant of his house, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Icetear Winterguard

Card `N0.01.BOI.123`, save as `icetear-winterguard.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an Icetear winterguard, a high elf woman planted and immovable, the soldier enemies have to get through first. Heavy pale-blue lacquered plate over white fur, a tall tower shield braced in front of her with its lower edge already iced to the floor, a short spear over the rim. Her breath is visible. Her face says she has no intention of stepping aside. A hall of pale blue ice, frost spreading from her shield across the carved stone. An ordinary soldier, heavy practical gear.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Ascena Icetear

Card `N0.01.BOI.004`, save as `ascena-icetear.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Ascena Icetear, a high elf noblewoman of the Council of the Winter Wights and mother of Seneal, Anthurian and Khairal. Pale hair, winter-blue eyes, a composed and quietly formidable face. She wears the deep blue and silver of a councillor rather than armour, with a single human-made brooch at her throat that does not match the rest, because she married a human and refuses to hide it. She is a woman doing arithmetic about her own children's survival and not letting it show. A hall of pale blue ice behind her. Someone of rank and note, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Frostbind

Card `N0.01.BOI.142`, save as `frostbind.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
A moment, not a portrait. Frostbind: an enemy is seized by Icetear ice and cannot move or strike. A warrior in dark mail caught mid-stride and already half-taken, ice climbing him from the floor up: it has locked his boots, closed over the knee, reached the sword hand and frozen the blade to the gauntlet. Small blue flowers of frost are blooming across the stone around his feet, which is how Icetear magic always announces itself. His face is the only part still free and it is pure alarm. A hall of pale blue ice, cold hard light. No lettering anywhere in the image. Leave the top fifth and the bottom quarter uncluttered.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 3. The Elu, the elven branches (6)

Each branch exists because one named elf was convinced of something. **Elu means elves. Hsal means soul. Chandra means moon. Dra means dragon.**

### Elu Primus Initiate

Card `N0.01.BOI.098`, save as `elu-primus-initiate.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an initiate of the Elu Primus, the High Elves, a young elf in their first formal robes. White and pale gold, immaculate, clearly new, which in this world marks them as untested rather than important. They hold a slim ceremonial blade they have not yet earned the right to use. Their expression is earnest and slightly overwhelmed. An ancient elven grove behind them, white bark and gold leaf, warm filtered light. An ordinary member of their people, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Moon Elf Tidecaller

Card `N0.01.BOI.115`, save as `moon-elf-tidecaller.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Moon Elf tidecaller of the Elu-Chandra, a woman whose people were born where elves devoted to Selene bonded with lunar elementals. Her skin carries the hush of night water, holding a faint radiance of its own. She stands in the shallows with one arm raised and the other low, and the sea is answering: a standing wall of water is rising behind her shoulder, lit from inside by moonlight. Silver-grey robes soaked to the thigh. A moonlit shore, silver water, a huge low moon. An ordinary member of her people, plain dress, but the water is not ordinary.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Soul Elf Acolyte

Card `N0.01.BOI.116`, save as `soul-elf-acolyte.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a young acolyte of the Elu-Hsal, the Soul Elves, who guide Fae souls toward the Eternal Fae Realm. The work changes them: his skin is pale beyond elven pallor and a small sacred crown of horns has begun to grow through his hair, which he is too young to have earned. Grey funerary robes. He holds one hand out, palm up and open, waiting rather than reaching, because their law is that a soul is given and never taken. A pale soul-light hovers above the palm, behaving like a held breath. Grey ghost-light over broken funerary stones, thin mist at knee height. An ordinary acolyte, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Dragon Elf Outrider

Card `N0.01.BOI.124`, save as `dragon-elf-outrider.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an Elu-Dragar outrider, a dragon elf whose people were built out of children ashamed of their own faces by the first queen who had the same scales. Small gold-red scales run along his cheekbones and down the throat, a short pair of horns curves back from his temples like a crown, and his eyes glow faintly molten. Light scaled riding harness, a short lance across the saddle bow, wind pulling his hair sideways. Storm-wracked mountain peaks above the cloud line, dragons circling far off. An ordinary soldier of his people, and not hiding anything.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Mayra Padukindel

Card `N0.01.BOI.008`, save as `mayra-padukindel.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Mayra Padukindel, a high elf noblewoman of the southern elven lines, whose house name belongs to the Silvankari of the Great South Jungle. Her features and colouring are southern, warm brown skin and black hair bound in a formal southern style, and her robes are deep green and gold rather than the white of the northern courts. She holds an open book of pressed leaves and pigment, one finger keeping a page. The scholar's calm of someone who remembers what everyone in the room said last time. An ancient grove of enormous southern trees, heavy green light. Someone of rank and note, not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Avalon, Queen of Elu-Hsal

Card `N0.01.BOI.017`, save as `avalon-queen-of-elu-hsal.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Avalon, Queen of the Elu-Hsal, the Soul Elves. She is the full flowering of what the acolytes only begin: skin white as grave-marble, a towering sacred crown of black horns grown through and above her hair, and great feathered wings held half-open behind her. Her robes are the grey of ash and deep funerary violet, heavy with soul-bells that are not ringing. Both hands are open and lifted, and a slow procession of pale soul-lights is rising past her toward something above the frame, each one moving willingly. Her face is compassionate and entirely final. Grey ghost-light over broken funerary stones, endless pillars disappearing upward into darkness. Unmistakably one of the great powers of the world, the whole composition built around her, and absolutely no menace in it.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 4. Humanity, the Citadel and the Sacred Order (8)

Humanity was given everything and then traded it away in fear, so their civilisation is built on walls and discipline rather than gifts. Grey stone, banked watchfires, repaired kit.

### Enclave Farmer

Card `N0.01.BOI.093`, save as `enclave-farmer.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a human enclave farmer, a middle-aged man who has been handed a spear and told to stand on his own wall. He is in working wool and a leather apron with one piece of mismatched mail borrowed from a dead soldier, and he holds a pruning bill rather than a weapon. His hands are a farmer's hands. He is frightened and he is standing there anyway, which in this world is the whole of courage. The fortified stone kingdom of Adamas behind him, watchfires burning on the walls, fields beyond. An ordinary person of no rank whatsoever.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Spearman of Adamas

Card `N0.01.BOI.106`, save as `spearman-of-adamas.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a spearman of Adamas, a human soldier of the first kingdom. Plain iron helm with a broad nasal bar, a mail shirt over padded linen, a tall spear held upright and a round shield bearing a sunburst worn almost smooth. He is unremarkable and completely reliable. The light catches one side of his face, which is young, tired and clean-shaven. The fortified stone kingdom of Adamas, watchfires on the walls. An ordinary soldier, plain gear, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Half Elf Levy

Card `N0.01.BOI.094`, save as `half-elf-levy.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a half-elf levy, an Elu-Dues conscript claimed fully by neither of the peoples who made him. Slightly pointed ears that he has not covered, a mismatched kit of elven leather and human mail that belongs to two different armies, a cheap short sword. He is looking directly at the viewer with the specific weariness of someone who has had to explain himself at every post he has ever walked through. A sunlit citadel of pale stone and blue banners behind him, slightly out of focus, as though he is not really of it. An ordinary conscript, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Knight

Card `N0.01.BOI.034`, save as `knight.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a rank-and-file human knight of the citadels. Full functional plate, dented and field-repaired with bright new rivets, a closed visor pushed up to show an ordinary unshaven face, a longsword resting on the shoulder. Over the plate a surcoat in faded grey, stained dark at the hem. He looks like a man at the end of a long watch rather than the start of a charge. The walls of a great citadel behind him, banners snapping in the wind. An ordinary soldier, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Kingdom Militia

Card `N0.01.BOI.109`, save as `kingdom-militia.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a human kingdom militiaman, better than a levy and well short of a knight. A kettle helm, a padded gambeson with sewn-on iron plates, a long axe and a hide-covered shield. He has a healed cut through one eyebrow and the look of a man who has survived exactly enough to be useful. The fortified stone kingdom of Adamas behind him, watchfires on the walls, smoke low across the sky. An ordinary soldier of his people, plain gear.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Squire of the Citadel

Card `N0.01.BOI.099`, save as `squire-of-the-citadel.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a squire of the citadel, a human boy of perhaps fifteen carrying his knight's helm in the crook of one arm and a lance he can barely balance in the other. No armour, only a padded coat and a grey tabard. His face is lit with the kind of belief the order will spend years grinding out of him. The walls of a great citadel behind him, banners snapping, a column of knights indistinct in the background. An ordinary servant of the order, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Citadel Captain

Card `N0.01.BOI.035`, save as `citadel-captain.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a citadel captain, the human officer enemies have to get through before they reach the walls. Heavy plate with a grey officer's sash and a cloak of grey wool pinned at one shoulder, bareheaded, iron-grey hair cropped short, a long warhammer planted head-down in front of him with both hands on the haft. A deep old scar crosses his jaw. He is not shouting. He is simply standing in the way, and his whole posture says this is where it stops. The walls of a great citadel, beacon fires burning behind him. Someone of rank and note, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Oath of the Sacred Order

Card `N0.01.BOI.149`, save as `oath-of-the-sacred-order.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
A moment, not a portrait. The Oath of the Sacred Order: every friendly fighter is strengthened at once. A ring of knights of the Sacred Order kneeling in the snow with swords driven point-first into the frozen ground and both hands on the hilts, heads bowed, seen from inside the circle and slightly below. A low warm light is rising out of the ground along every blade, climbing the steel and reaching their gauntlets, and the falling snow is going upward near the blades. Beyond the ring, the grey bastion of the order and a hard white southern sky. No lettering anywhere in the image. Leave the top fifth and the bottom quarter uncluttered.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 5. The Knight Sisterhood of the Moon (3)

Not maidens and not priests. **Hunters dressed in white and crimson**, whose eyes constantly read exits and shadows. They treat monsters as symptoms rather than enemies, and corruption recoils from their blessed tools like living things afraid of sunlight.

### Novice of the Moon

Card `N0.01.BOI.100`, save as `novice-of-the-moon.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a novice of the Knight Sisterhood of the Moon, a young human woman in white with a single crimson sash, not yet in armour. She carries a wooden case of silver needles and small glass vials in both arms like something precious. Her head is turning toward a sound and she has caught herself doing it, which is the first thing the order teaches. A moonlit cloister of pale stone, the moon framed in an arch behind her. An ordinary novice, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Sister of the Moon

Card `N0.01.BOI.081`, save as `sister-of-the-moon.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Sister of the Moon, a human woman who is a hunter in white and crimson rather than anything gentler. White surcoat over light mail, crimson sash, a slim blessed blade in one hand and a long silver needle held between two fingers of the other like a second weapon. Dried crimson flowers and a pouch of silver ash at her belt. She is scanning past the viewer, reading the dark, not posing in it. A moonlit cloister of pale stone, the moon framed in an arch. An ordinary soldier of her order, and genuinely unsettling.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Matron of the Moon

Card `N0.01.BOI.087`, save as `matron-of-the-moon.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Matron of the Moon, the senior woman the whole sisterhood takes its steadiness from. Older, grey at the temples, in heavier white and crimson with a high collar and a moon-sigil clasp worn to a blur. She holds a censer of incense low in one hand, letting the smoke rise across the frame, and a blessed blade loose in the other. Her face is kind and completely implacable. She looks at the viewer as though already deciding what can be saved. A moonlit cloister, the moon in an arch, incense catching the light. Someone of real standing, better dressed and better armed than most.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 6. The Sun-Night Inquisitorium (3)

They exist because the Black Sea cults **poison kingdoms from within rather than conquering them**, which makes information their sharpest weapon. Chains, writ, candlelight, sealed boxes, a sun sigil on one shoulder and a night sigil on the other.

### Inquisition Warden

Card `N0.01.BOI.117`, save as `inquisition-warden.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an Inquisition warden, a human man whose job is to stop magic working in the room he is standing in. Black and dull gold coat over mail, a heavy warding chain wrapped twice around one forearm and hanging from the fist, a sealed iron lockbox under the other arm. A sun sigil on one shoulder and a night sigil on the other. He is watching the viewer's hands rather than their face. A candlelit stone chamber hung with chains and written writ. An ordinary officer of his order, plain hard gear.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Inquisitor

Card `N0.01.BOI.084`, save as `inquisitor.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an Inquisitor, a human officer of the Sun-Night Inquisitorium whose real weapon is what he has written down. Black and gold robes over a mail shirt, a sun sigil and a night sigil at the shoulders, a leather case of files chained to his belt. He holds a half-burned page in one hand and a candle in the other, close enough to it that he is clearly deciding whether to destroy it. His face is intelligent, tired and not cruel, which makes him worse. A candlelit stone chamber, chains and writ hanging in the arches. Someone of rank and note, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### High Inquisitor

Card `N0.01.BOI.088`, save as `high-inquisitor.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a High Inquisitor, the man who decides what the world is allowed to remember. Heavy black and dull gold vestments with a mail collar, a sun sigil on one shoulder and a night sigil on the other, both worn almost smooth. He is holding a brazier at chest height in both gloved hands and burning records in it, and the ash is going up past his face. He is looking straight at the viewer while he does it, perfectly calm. A candlelit stone chamber, chains in the arches, a wall of shelved files behind him going back into the dark. Someone of real standing, better dressed than most, entirely untroubled.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 7. The Slayers (3)

Monster hunters by trade, and the name later belongs to something far larger: **the Five Slayers who went to the Cliffs of Endless Dusk**, four of whom came back as Slayer Angels carrying both sacred light and conquered darkness. These three are the mortal order those five came out of.

### Slayer Apprentice

Card `N0.01.BOI.110`, save as `slayer-apprentice.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Slayer apprentice, a young human on their first real hunt. Mismatched boiled leather over wool, a heavy cleaver-bladed falchion too big for them, a coil of chain and two iron hooks on the belt. One forearm is freshly bandaged through the leather. They are kneeling beside something enormous and dead, only a dark flank and a ribcage of it in frame, and they are looking up and out with an expression caught between terror and exhilaration. A cold hillside, low grey light, breath visible. An ordinary apprentice, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Slayer

Card `N0.01.BOI.085`, save as `slayer.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Slayer, a human monster hunter at full competence. Layered boiled leather and plate at the shoulders and forearms, a long beast-cleaver resting across one shoulder, chain and hooks at the belt, and a necklace of teeth from several different animals that should not all exist. Blood dried black up to the elbow. Her face is weathered, flat and unimpressed. Behind her, a cold hillside beside the carcass of something enormous, ribs rising out of the grass like a ruined building. Someone of rank and note, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Slayer Captain

Card `N0.01.BOI.086`, save as `slayer-captain.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Slayer captain, the human who decides which beast the company goes after and how many of them will not come back. Heavy scarred plate and leather with a cloak of some enormous grey hide clasped at the throat by a single curved tooth the length of a hand. A long two-handed beast-cleaver held point-down in front of him. One eye is gone and the socket is not covered. He is looking off to the side at something still alive. A cold hillside, an enormous carcass behind him, hunters indistinct in the mist. Someone of real standing, better armed and better dressed than most.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 8. The Gods Blood (1)

Descendants of divine avatars, **mortal in flesh yet touched by divinity in potential.** Their power is **the correction of pattern**, which from the inside does not feel like power at all, only like irritation at a room that is wrong.

### Gods Blood Initiate

Card `N0.01.BOI.127`, save as `gods-blood-initiate.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Gods Blood initiate, a young man of divine descent in white and gold ceremonial armour that is too fine for anyone who has fought in it. He has one hand half-raised, fingers slightly spread, and the air immediately around that hand has gone wrong in a very specific way: the dust, the smoke and the falling light near his palm have all settled into unnatural order, lines too straight, everything precisely where it belongs. His face is young, certain, and entirely untroubled by what that means. Behind him, Heaven's Throat: a mountain empire carved in white and gold, colossal weathered statues of demigods standing along the walls. An ordinary member of his caste, which is still frightening.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 9. The Sinodess (3)

**Sinbad-Sinodess** was one of the first humans, took the fearful and the free-spirited to the coasts, declared himself **King of the Seas**, and built the first flintlock pistol in the Second Age and killed a Horseman of the Apocalypse with it. Canvas, brass, salt and rope, and **early firearms are theirs and nobody else's.**

### Sinodess Deckhand

Card `N0.01.BOI.101`, save as `sinodess-deckhand.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Sinodess deckhand, a young human sailor in a sleeveless canvas jerkin with rope-burned forearms and a knife on a lanyard. He is hauling on a line that runs up out of the top of the frame, leaning his whole weight back into it, and squinting against spray. Brass rings and a cheap compass on a cord at his neck. The deck of a ship at sea behind him, rigging and salt spray, a hard bright sky. An ordinary sailor, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Sinodess Corsair

Card `N0.01.BOI.118`, save as `sinodess-corsair.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Sinodess corsair, a human woman who boards other ships for a living. A long coat of oiled canvas over a mail vest, a cutlass in one hand and an early single-shot flintlock pistol in the other, held up and ready, its brasswork scratched and its stock repaired with wire. A bandolier of paper cartridges across her chest. She is already moving, one foot up on something off frame. The deck of a ship at sea, rigging, spray, a hard bright sky. An ordinary soldier of her people, and clearly enjoying it.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Sinodess Fleetmaster

Card `N0.01.BOI.042`, save as `sinodess-fleetmaster.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Sinodess fleetmaster, the human officer who moves whole fleets and remembers every debt in the harbour. A heavy coat of deep sea-blue canvas with brass buttons and worn gold at the cuff, a brass spyglass in one hand and a folded chart under the other arm. Grey at the temples, a shrewd and good-humoured face, the look of a man doing sums about you. Behind him, the quarterdeck of a large ship and the masts of others beyond it, hard bright light, spray in the air. Someone of rank and note, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 10. The Archmagi (5)

The hard part of magic in this world is not power, it is **calculation**: forming the correct vibrational structure in the mind. So an Archmagi's room is full of instruments, not of glowing effects.

### Magi Apprentice

Card `N0.01.BOI.113`, save as `magi-apprentice.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a magi apprentice, a young human with ink to the knuckles and chalk dust on one cheek. Plain scholar's robes with a scorched sleeve. She is holding a slate of half-finished geometry in one hand and tracing a line of it in the air with the other, and the air is holding the line: a thin figure of light hangs where she drew it, slightly wrong, about to collapse. Her expression is pure concentration with a seam of panic in it. A high tower room of brass instruments and drifting dust in slanted light. An ordinary apprentice, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Archmagi Vault

Card `N0.01.BOI.043`, save as `archmagi-vault.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Archmagi Vault, a human archmage and the one who makes everything cheaper for everyone else. He is surrounded, not by spell effects, but by apparatus: a dozen brass armatures, rings and counterweights hang in the air around his head and shoulders in slow motion, each turning at its own rate, and he is adjusting one of them with two fingers without looking at it. Severe dark robes, close-cropped grey hair, sleeves pinned back for work. The face of a man mid-calculation who has been interrupted and does not mind. A high tower room of instruments and drifting light. Unmistakably one of the great powers of the world, the whole composition built around him.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Archmagi Geof

Card `N0.01.BOI.044`, save as `archmagi-geof.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Archmagi Geof, a dwarf archmage, broad and barrel-chested with a forked iron-grey beard bound in rings. Dwarven magic is forge magic: his robes are leather and wool under a smith's apron of blackened plate, his staff is a hammer-headed rod of dark immortal ore, and the light in the room comes mostly from a crucible of molten metal hanging at his elbow, lighting his face orange from below. He is pointing the rod at something off frame and giving it more strength, which is what he does. A high tower room that is half workshop, brass instruments and a stone forge. Unmistakably one of the great powers of the world.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Archmagi Treantan

Card `N0.01.BOI.045`, save as `archmagi-treantan.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Archmagi Treantan, a treant archmage: a being of ancient living wood in the rough shape of a robed scholar, bark skin cracked into plates, a face formed of knot and grain with two deep-set green lights for eyes, moss and small ferns growing in the hollows of his shoulders. He is slow and he is getting stronger the longer he stands there, so show new growth happening: pale green shoots are unfurling from his forearms and along his staff of living wood. A high tower room whose instruments have been overgrown, roots through the floor, drifting green light. Unmistakably one of the great powers of the world.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Archmagi Serra

Card `N0.01.BOI.046`, save as `archmagi-serra.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Archmagi Serra, a high elf archmage, tall and severe with white hair bound close and a face of absolute composure. Her discipline is retrieval: spells she has already cast come back to her. So the air around her holds the faint after-images of three or four figures of light she has used before, half-faded, drifting toward her open hand as though being recalled. Deep blue and silver robes, no ornament. A high tower room of brass instruments and drifting light, tall windows, cold daylight. Unmistakably one of the great powers of the world, the whole composition built around her.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 11. The witches (1)

The old druidic rites do not consume mana, they consume life, which is why a hedge witch looks older than she is.

### Hedge Witch

Card `N0.01.BOI.121`, save as `hedge-witch.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a hedge witch, a human woman who practises the old rites that take years off the body rather than mana. She looks fifteen years older than she is: lines around the eyes, grey coming through dark hair in streaks. Layered homespun wool, a herb bag, a ritual knife at the belt with a worn handle. She is holding a tallow candle whose flame is burning the wrong colour and leaning toward the viewer against the draught. Her face is tired and entirely unashamed. A black wood under a huge moon, candles burning in the branches behind her. An ordinary village practitioner, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 12. The Five Gypsy Tribes (3)

Caused by the ascension of **Kalbeliya**, with the **Five Dancing Gods** and five tribes: Forest, Moon, Fire, Sand and Blade. Brightly robed, flame-eyed, skin tattooed with protective and storytelling sigils. Most kingdoms believe they are merely wandering entertainers, which is the point.

### Kalbeliya Outrider

Card `N0.01.BOI.107`, save as `kalbeliya-outrider.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Kalbeliya outrider of the Sand tribe, a young rider in layered bright robes of saffron and dusty red with a wind-scarf pulled down off the face. Protective sigils are tattooed up the forearms and across the cheekbones, and the eyes carry a faint flame-light. A short curved blade across the saddle bow, brass bells on the harness. He is turned in the saddle looking back the way he came. A night camp in the desert heat, firelight on painted wagons behind him. An ordinary rider, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Kalbeliya Dancer

Card `N0.01.BOI.082`, save as `kalbeliya-dancer.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Kalbeliya dancer of the Sand tribe, whose art stops an enemy where he stands. A woman mid-turn in brilliant layered robes, coin jewellery and brass bells, her arms carried high and her head tilted, eyes carrying a clear flame-light and storytelling sigils tattooed from wrist to shoulder. The movement has disturbed the air, so sparks and dust are spiralling with her hands. Her expression is amused and entirely in control, because she knows exactly what the watching men have stopped doing. A night camp, firelight, painted wagons. An ordinary member of her tribe, and completely arresting.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Kalbeliya Seer

Card `N0.01.BOI.083`, save as `kalbeliya-seer.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Kalbeliya seer of the Moon tribe, an older woman who sees what is coming next and reorders it. Deep indigo and silver robes over bright underlayers, heavy coin and bone jewellery, both eyes solid with flame-light and no pupil at all. Storytelling sigils cover her face and throat. She is dealing painted bone tiles onto a cloth in front of her and already moving one of them back into a different place, and she is looking up at the viewer rather than at her own hands. A night camp under a huge moon, firelight on painted wagons. Someone of rank and note in her people, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 13. The Exodas (2)

Mortals carrying the blood of a mortal race together with **Fae and Blackguard blood**, exiled by the Fae centuries ago for tainting the bloodline. **The journey after the exile was so harrowing that it gave them their name.**

### Exodan Scout

Card `N0.01.BOI.102`, save as `exodan-scout.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an Exodan scout, a lean figure in travel-worn wraps of dust-coloured cloth, hood thrown back. The fiend blood shows at the edges rather than the centre: the eyes are the wrong colour with a faint inner light, the fingernails are dark and too long, and a thin haze of something that is not quite heat sits along the shoulders. A single light blade and no armour at all. He is crouched, mid-movement, looking back over one shoulder. The Shattered Lowlands behind him, broken farmland and ruined walls to the horizon. An ordinary scout, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Exodan Wanderer

Card `N0.01.BOI.089`, save as `exodan-wanderer.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an Exodan wanderer, an older figure alone on the road in layered dust-coloured wraps and a long patched coat, everything carried on the body because there is nowhere to leave it. Unnatural eyes with a faint inner light, dark nails, a faint haze along the shoulders where the half-manifested power sits. A worn staff and a single bedroll. His face is weathered and self-contained and not asking anything of anyone. The Shattered Lowlands, broken farmland and ruined walls to the horizon, long evening light. An ordinary traveller, and entirely alone in the frame.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 14. The Norgods (3)

**Dwarf-like in build but colossal in size. Stone-blooded and iron-veined.** Northern sea-raiders of the storm cultures that trace back to **Wulfnir, first King of the Vikings**, whose people were blessed with knowledge and foresight, and behind him the forge Titan **Atlor the Mountain Forger.**

### Norgod Oarsman

Card `N0.01.BOI.120`, save as `norgod-oarsman.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Norgod oarsman. Dwarf-like in proportion but enormous, twice the mass of a man, with grey stone-toned skin and dark iron-coloured veins visible at the forearms and temple. A thick braided beard rimed with ice, furs over a scaled iron harness, and a huge oar-shaft held across the body like a weapon, which it is. He is shouting at someone off frame. A freezing northern cliff above a grey sea, spray breaking far below. An ordinary raider, plain gear.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Norgod Reaver

Card `N0.01.BOI.091`, save as `norgod-reaver.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Norgod reaver, colossal and dwarf-proportioned, grey stone-toned skin shot through with dark iron veins. Heavy furs over riveted iron plate, a great bearded axe in one hand and a shield of iron-bound planks in the other, both notched to ruin. Ice in the beard, a fresh cut across the brow, and an expression that gets better the worse the odds become. A freezing northern cliff above a grey sea, longships drawn up in the surf behind him, sleet coming in sideways. Someone of real standing, better armed than most.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Norgod Jarl

Card `N0.01.BOI.092`, save as `norgod-jarl.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Norgod jarl, the crowned lord of a stone-blooded people and the biggest thing on this cliff. Dwarf-proportioned and colossal, grey stone-toned skin with iron veins standing out like cabling, a vast braided beard bound in dark iron rings and hung with the teeth of sea beasts. Over the furs, a mantle of some enormous grey hide and a plain circlet of black iron, the only ornament on him. He holds a great spear upright in one fist, planted, in the line of Wulfnir's gift of foresight rather than fury. He is looking out to sea rather than at the viewer, already deciding. A freezing northern cliff above a grey sea, longships below, storm light. Unmistakably one of the great powers of the world, the whole composition built around him.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 15. The Oinstans (2)

**Tall, thick-skinned humanoids with tusks, a wide jaw, and beast-shaped war paint.** Builders. Their work is stone, and stone is what the Dwarf Titan Dagonn left behind him in the world.

### Oinstan Mason

Card `N0.01.BOI.114`, save as `oinstan-mason.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an Oinstan mason. Tall and thick-skinned, slate-grey hide, two short lower tusks and a wide heavy jaw, with beast-shaped war paint in white and ochre across the brow and cheeks. Stripped to a leather work harness, dust caked into every crease of the skin. He holds a stone maul over one shoulder and a cold chisel in the other hand, and a block he has been dressing sits at the edge of frame. He is looking at the viewer with the patience of someone interrupted. A vast stone quarry under a hard white sky. An ordinary worker, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Oinstan Stonewright

Card `N0.01.BOI.090`, save as `oinstan-stonewright.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an Oinstan stonewright, a master builder whose people can take a blow that would end anyone else. Tall, enormously thick-skinned, slate-grey hide scarred pale across the shoulders, tusks longer and banded with copper, beast-shaped war paint in a more elaborate pattern across the whole face. Over the work harness, a mantle of hide and a belt of heavy iron tools. One hand rests flat against a half-carved pillar beside her, and the carving is the kind of work that takes a decade. A vast stone quarry under a hard white sky, a part-built wall rising behind. Someone of rank and note in her people, not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 16. The Orcs (2)

**Akidna's union with a wiser Prime God produced the sentient monster races**, the orcs, trolls and ogres who can be reasoned with. Which does not mean they will be.

### Orc Raider

Card `N0.01.BOI.040`, save as `orc-raider.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an orc raider, broad and heavy-browed with green-grey skin and lower tusks, one of them broken. Scavenged kit from three different armies: a human mail shirt split at the side and laced with cord, an elven bracer on the wrong arm, a cleaver beaten out of a ploughshare. He is already moving forward, mouth open, eyes narrowed, committed. A raided camp at dusk behind him, smoke rising. An ordinary raider, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Orc Skirmisher

Card `N0.01.BOI.111`, save as `orc-skirmisher.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of an orc skirmisher, leaner than a raider and faster, built for hitting first. Green-grey skin, a shaved scalp with a single bound topknot, tusks filed short. Light scavenged leather and no mail at all, a hand axe in each fist, a bandolier of throwing irons. He is crouched low and turning, caught in the half-second before he throws. A raided camp at dusk, smoke rising behind him, firelight from one side. An ordinary soldier, plain gear.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 17. The dwarves (1)

**Durrigon took the Gods Aegis and became first King of the Dwarves**, and his people were blessed with a mountain of the immortal ore **Urrock**. Dwarven work cannot be unmade by a spell.

### Dwarf Stoneguard

Card `N0.01.BOI.125`, save as `dwarf-stoneguard.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a dwarf stoneguard, broad as a door, with a plaited iron-grey beard tucked into his belt. His plate is dwarven work in dark immortal ore, plain and perfect and clearly centuries old, with a single bright repair at the shoulder. He holds a short heavy axe and a round shield of the same dark metal braced in front of him. His face is flat and immovable, the expression of something a spell will not shift. A deep mountain hall of carved stone, forge light from below and to one side. An ordinary soldier of his people, superb gear.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 18. The undead (4)

In the frozen north the **Thirteen Lich Lords** sit in their own civil war, and in the far south the Winter King's body remained after Hansall struck him down. **The soul did not.**

### Risen Levy

Card `N0.01.BOI.095`, save as `risen-levy.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a risen levy: a dead peasant conscript walking again in the clothes he died in. Homespun wool gone black with old blood, a farmer's bill hook still in one hand because nobody took it off him. The skin is grey and drawn tight, the jaw hangs slightly, and a dim green light sits far back in the eye sockets. He is not fearsome. He is pitiable, which is worse. Catacombs lit by low green flame, bone stacked in the arches behind him. An ordinary dead man, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Ghoul

Card `N0.01.BOI.047`, save as `ghoul.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a ghoul: a pale, skin-stripped humanoid with elongated arms, jagged teeth and no visible eyes at all, only smooth hollows where they should be. It crouches on its knuckles with the shoulders higher than the head, mouth slightly open, scenting rather than looking. The proportions are human enough to be upsetting. Catacombs lit by low green flame, bone stacked in the arches. An ordinary horror of its kind, and genuinely unpleasant.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Bone Picker

Card `N0.01.BOI.112`, save as `bone-picker.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a bone picker, an undead thing that goes through the dead and takes what is left. Taller and more deliberate than a ghoul, draped in a rotted scavenger's coat hung with sacks, and both hands are wrong: long thin digging fingers tipped in bone. It holds a single relic up close to its face, examining it, and the gesture is almost scholarly. Green light in the eyes. Catacombs lit by low green flame, a floor of scattered bone and spoil. An ordinary creature of the catacombs, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Goulargz

Card `N0.01.BOI.048`, save as `goulargz.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Goulargz: a massive, tusked undead humanoid with bone armour fused directly into its flesh, plates of it growing out through the shoulders and across the chest so there is no telling where the creature stops and the armour starts. Grey-green hide, a jaw of broken tusks, eyes sunk in green light. It is mid-growl, a low sound rather than a roar, and everything near it is unnerved. Catacombs lit by low green flame, bone stacked in the arches, risen figures indistinct behind it. Someone of rank and note among the dead, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 19. The sea (3)

Each of the four seas holds something. **Yorrmengund east, Cthulhu west, Akidna north, Neptune south.** The merfolk live between those things.

### Mersoldier

Card `N0.01.BOI.056`, save as `mersoldier.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a mersoldier: a pale blue humanoid with webbed limbs, barnacled armour and gills pulsing visibly on the neck. Fine scales over the shoulders, a hard ridge of bone above each eye, hair like dark weed moving on its own in the current. Armour of shell and barnacle-crusted bronze, a short broad-bladed spear held level. Deep green water, shafts of light coming down from far above, silt drifting. An ordinary soldier of his people, plain gear.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Reef Lurker

Card `N0.01.BOI.119`, save as `reef-lurker.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a reef lurker, the merfolk who cannot be hit the turn they arrive because you did not see them. Mottled coral-coloured skin that matches the rock behind it exactly, frills along the forearms and jaw breaking up the outline, webbed hands spread flat against stone. Only the eyes are unambiguous and they are fixed on the viewer. Half of its body is still against the reef and reading as reef. Deep green water, shafts of light from above, coral close behind. An ordinary creature of its kind, and almost invisible.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Mercaptain

Card `N0.01.BOI.059`, save as `mercaptain.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Mercaptain: a scaled humanoid with a trident crown and a mantle of jellyfish silk that drifts and glows faintly around the shoulders. Pale blue-green scales, gills at the throat, a cold imperious face. The crown is grown rather than forged, three prongs of pale coral and bone. One hand is raised with the fingers closing, and the water in front of it is answering: a column of current is bending around something and pulling it away. Deep green water, shafts of light from far above, a sunken colonnade behind. Someone of rank and note, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 20. Demons and the Abyss (3)

**Lucifial and Hecatre shaped serpents and insects in secret, not as demons, but as mortal creatures seeded with malice.** The demons proper came later, from Lucifial and Lilith.

### Imptizzle

Card `N0.01.BOI.054`, save as `imptizzle.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Chest-up portrait of Imptizzle, a palm-sized chattering imp, shown very close so it fills the frame: a tiny wiry creature with bat wings, glowing yellow teeth and a forked tongue far too large for its mouth, which is why it is always hanging out. Red-brown hide, enormous ears, clever appalling little eyes. It is perched on the rim of something and leaning toward the viewer mid-sentence, clearly saying something insulting. The Abyssal Realm behind it, black rock, distant fire, a sky like a bruise. An ordinary nuisance, no grandeur, and very pleased with itself.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Demon

Card `N0.01.BOI.077`, save as `demon.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a rank-and-file demon, a creature of chaos and war rather than a subtle manipulator. Heavy muscled frame, obsidian-dark hide with thin molten cracks showing in the creases, a low brow and short back-curving horns, teeth too many and too even. It carries a crude blade of black iron and is already moving forward. There is no cunning in the face at all, only appetite. The Abyssal Realm, black rock, distant fire, a sky like a bruise. An ordinary soldier of its kind, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Abyssal Insect

Card `N0.01.BOI.103`, save as `abyssal-insect.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Chest-up portrait of an abyssal insect, one of the things Hecatre seeded with malice: a chitinous creature the size of a hound, shown close and from slightly below so it dominates the frame. Segmented black-violet carapace with a wet sheen, too many legs folded under it, mandibles that work independently, and a cluster of small eyes that do not all point the same way. One foreleg is lifted. Behind it, the Abyssal Breach: a wound in the world, reality unstable around it, the rock going the wrong way. An ordinary creature of the swarm, and deeply wrong.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 21. Beasts and Beast Kings (12)

**Freyva and Glorion made the beasts**, and they made them to cull corruption and sustain the world: not decorative creatures, but **great engines of balance.** Behemoths that could crush swarms. Beast Kings that could cull what multiplied too quickly. Ancient beasts that remembered the Titan War in their bones.

### Beastling

Card `N0.01.BOI.057`, save as `beastling.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Chest-up portrait of a beastling, a young beast-kin fighter of no particular people: a half-grown creature with the build of a boy and the head and hind legs of something feline, short fur in dun and umber, a scruff of mane just beginning. It carries a sharpened stake in both hands and holds it wrong. Its eyes are wide and its ears are back. The Verdant Wilds behind it, dense jungle, enormous ferns, heavy wet air. An ordinary creature of the wild, no grandeur, and very young.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Wolf

Card `N0.01.BOI.058`, save as `wolf.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Chest-up portrait of a great wolf of the Verdant Wilds, shown close so the head and shoulders fill the frame. Heavy grey-black pelt matted with rain, a broad skull, scars across the muzzle, and the pale intelligent eyes of something descended from the line of the Prime God of Wolves rather than a mere animal. It is low, shoulders high, head slightly turned, holding the viewer's eye without any growl at all. Dense jungle behind it, enormous ferns, heavy wet air, one shaft of light. An ordinary beast of its kind, and not remotely tame.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Serpent Hatchling

Card `N0.01.BOI.096`, save as `serpent-hatchling.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Chest-up portrait of a serpent hatchling, descended from the serpents the Fae chose to spare rather than exterminate. A young coil-bodied thing the length of a man, slick dark green scales with a violet sheen of old corruption still in them, a wedge head with a jaw that opens too wide and small lidless eyes. It is already striking: the neck is drawn back into an S and the mouth is opening. Behind it, swampspawn country, black water and rotted root, thin mist. An ordinary creature of the swamp, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Tylon Whelp

Card `N0.01.BOI.104`, save as `tylon-whelp.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Chest-up portrait of a Tylon whelp. The Tylons woke out of the Elu-Chandra, the Moon Elves, so a Tylon is a creature of tide and moonlight rather than of the forest: a young four-limbed beast the size of a large dog with sleek pale hide that holds a faint lunar sheen, webbed feet, a frill of translucent fins along the spine and a long tapering tail. Big eyes, mostly pupil. It is bounding forward through shallow water. A moonlit tidal shore, silver water, a huge low moon behind. An ordinary young beast, no grandeur, and quick.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Treant Sapling

Card `N0.01.BOI.105`, save as `treant-sapling.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a treant sapling, a young being of living wood that is visibly still growing. Smooth green-grey bark rather than the cracked plates of an elder, two deep-set green lights for eyes in a face formed of knot and grain, and leaves still unfurling at the ends of the branch-fingers. New pale shoots are pushing out of the shoulders as it stands. Its posture is uncertain, as though it is not yet sure how to hold itself. A deep forest of enormous ferns and moss-covered root, heavy wet green light. An ordinary young treant, no grandeur.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Garudling

Card `N0.01.BOI.055`, save as `garudling.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Chest-up portrait of a garudling, shown very close so it fills the frame: a fist-sized feathery raptor with too-bright eyes and small sparks flickering off its beak. Storm-grey and white plumage ruffed up at the neck, talons gripping a rock, wings half-spread for balance. It is far too confident for its size and is screaming at something enormous off frame. Behind it, a high cliff above the Verdant Wilds, cloud and wet air, lightning distant. An ordinary creature, no grandeur, and absurdly brave.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Cliff Garuda

Card `N0.01.BOI.126`, save as `cliff-garuda.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a cliff garuda, the grown form of the garudling and a proper sky predator. A great avian beast with a hooked beak the length of a forearm, storm-grey and white plumage, a broad ruff of feathers at the throat, and eyes with a hard yellow intelligence in them. Faint sparks run along the beak and the leading edge of the wing. It is perched on a crag with the wings half-open and the head lowered toward the viewer. High cliffs above the Verdant Wilds, cloud below, distant lightning. An ordinary creature of its kind, and large enough to carry a man off.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Tylon

Card `N0.01.BOI.069`, save as `tylon.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a full-grown Tylon, a beast of tide and moonlight out of the Moon Elf shore kingdoms. Larger than a warhorse, a sleek four-limbed form of pale hide that carries a genuine lunar radiance along the back and flanks, a tall frill of translucent fins from skull to tail, webbed and clawed feet, and a long elegant head with dark intelligent eyes. Water is still running off it. It is turning toward the viewer out of the shallows at speed. A moonlit tidal shore, silver water, a huge low moon. Someone of rank and note among the beasts, but not a legend.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Stormspear

Card `N0.01.BOI.060`, save as `stormspear.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Stormspear: an avian humanoid with silver feathers and cloud-wrapped wings, carrying a staff etched with lightning runes. Tall and narrow-framed, a hawk's head with a straight hard beak and gold eyes, a mantle of silver plumage over the shoulders. The wings are not simply feathered, they have actual cloud caught in them, dragging in wisps off the trailing edge. The runes on the staff are lit from inside and the air above it is distorting with heat and charge. Storm cliffs above the cloud line, lightning behind. Someone of real standing, better armed and better dressed than most.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Fallen Lycaron

Card `N0.01.BOI.061`, save as `fallen-lycaron.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of a Fallen Lycaron: a winged, emaciated wolf-beast with crimson eyes and exposed bone joints, its wings resembling torn shadows rather than anything feathered or leathery. The ribs show, the hide is drawn tight over the skull, the elbow and shoulder joints are bare bone. It was a beast-lord creature before something got into it, and it still has the shape of nobility under the ruin, which is the horrible part. It is lifting its head toward the viewer, mouth slightly open. Dense jungle gone black and dead behind it, the ferns withered, the air wrong. Someone of real standing, utterly corrupted.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Lycanor

Card `N0.01.BOI.063`, save as `lycanor.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Lycanor, a Beast King of the wolf line, made by Freyva and Glorion as an engine of balance rather than a decorative creature. A towering upright wolf-lord, deep black and iron-grey pelt over a heavy frame, a broad intelligent skull with a crown of horn growing back from the brow, and old pale scars across the chest. He wears a harness of worked hide and dark iron, not armour as a man would understand it. One hand rests on the head of a great wolf at his side. His eyes are steady and completely unimpressed. The Verdant Wilds, dense jungle, enormous ferns, heavy wet air, one shaft of light. Unmistakably one of the great powers of the world, the composition built around him.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Leonarr

Card `N0.01.BOI.064`, save as `leonarr.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Leonarr, a Beast King of the Leonar, whose line produced Ligarr and through him Sederous the King of Scraps. An enormous upright lion-lord with a full dark mane, tawny-gold hide and a heavy scarred jaw, every other beast in the wilds a little stronger for him simply being there. He wears a mantle of hide pinned with a great claw and carries a broad-bladed spear held upright. His head is high and slightly turned, the posture of something that has never once had to establish rank. The Verdant Wilds, dense jungle, enormous ferns, heavy wet air, strong light from one side. Unmistakably one of the great powers of the world, the composition built around him.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 22. One named human (1)

### Duke Lycareon Tyberious

Card `N0.01.LAH.10`, save as `duke-lycareon-tyberious.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
Waist-up portrait of Duke Lycareon Tyberious of Wolfsbane, a human lord of spies, assassins and border knights, and one of the Nine. He carries the unsettling courtesy of a man capable of killing everyone in a room while apologising for the inconvenience, so paint him pleasant: a slight civil smile, an open hand, a small polite inclination of the head. Fine dark clothing with a wolfsbane sigil at the collar, a mail shirt underneath it, and a spear whose shaft he has carved runes into himself held casually in the other hand. He kills the ones shouting orders, not the strongest men, and his eyes are already doing that arithmetic on the viewer. A dark border hall at night, candlelight, banners indistinct behind him. Someone of real standing, better armed and better dressed than most, and perfectly charming.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

---

## 23. The spells (5)

A spell is **a moment, not a portrait.** No person should dominate it, and nothing in it should read as a character card.

### Faesilver Edge

Card `N0.01.BOI.128`, save as `faesilver-edge.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
A moment, not a portrait. Faesilver Edge: a friendly fighter's weapon is sharpened beyond what steel can hold. Extreme close view of a longsword blade held diagonally across the frame, a hand in a worn leather glove at the lower edge, and a thin line of faesilver being drawn along the edge by a whetstone so that the edge itself is alight with a cold white seam while the rest of the steel stays dull and scratched. Sparks and faint silver motes coming off the stone. An elven forge behind it, out of focus, warm light against the cold edge. No lettering anywhere in the image. Leave the top fifth and the bottom quarter uncluttered.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Queen's Judgement

Card `N0.01.LAH.04`, save as `queens-judgement.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
A moment, not a portrait. The Queen's Judgement: an enemy is exiled from the world entirely and never returns. A high elven throne hall of pale stone and blue banners, seen from the floor. In the centre, a kneeling armoured figure caught mid-unmaking: the lower half of them has already gone, not burned and not dissolved but simply no longer present, the edges breaking into drifting pale motes. A queen's hand and forearm enter from the upper edge of frame, palm down, and nothing else of her is shown. Cold daylight from high windows. No lettering anywhere in the image. Leave the top fifth and the bottom quarter uncluttered.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Muster the Host

Card `N0.01.BOI.146`, save as `muster-the-host.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
A moment, not a portrait. Muster the Host: more strength arrives than you had. Seen from behind and slightly above a single standard-bearer on a rise, looking down at a muster field at dawn where column after column of indistinct troops is forming up out of the mist, more of them than can be counted, banners going back to the horizon. The nearest figures are only silhouettes. Low gold light coming in from the side, breath and dust in the air. No single face is readable. No lettering anywhere in the image. Leave the top fifth and the bottom quarter uncluttered.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Hidden Boss

Card `N0.01.LAH.19`, save as `hidden-boss.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
A moment, not a portrait. Hidden Boss: something great is pulled out of the graveyard and now fights for you. A catacomb floor of scattered bone lit by low green flame, and rising out of it an enormous armoured silhouette, deliberately kept mostly in shadow: a vast pauldron, part of a horned helm, one hand the size of a man's torso closing on the edge of a broken tomb. Only the outline and three or four lit details are legible, and two points of cold light where the eyes should be. Green flame throwing everything upward. The scale should be frightening and the identity should not be clear. No lettering anywhere in the image. Leave the top fifth and the bottom quarter uncluttered.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```

### Divine Intervention

Card `N0.01.LAH.20`, save as `divine-intervention.webp`

```
Dark fantasy trading card art for Blood of Icetear. Follow every rule below.

FORMAT: 2:3 portrait, 1024 x 1536 or larger. Never square, never landscape.

COMPOSITION: face in the upper-middle third, never at the very top edge. Clear headroom above any crown, helm, horns or halo. Nothing that matters in the bottom quarter, it gets covered by the card frame. Waist-up or chest-up, never a distant full body. Keep hands, weapons and wings inside the frame and away from the left and right edges.

STYLE: painted, not photographic. Oil and digital painting, visible brushwork, with whole areas left as simple flat blocks of paint. Dark, rich, low-key colour with one strong light source. Never a plain white, grey or empty studio background: the subject stands somewhere real, with depth and atmosphere behind them. Period-accurate armour, cloth, leather and fur, no modern clothing or modern hair. It must read instantly at thumbnail size, with a clear silhouette and a strong shape.

THIS WORLD: nothing is shiny or new, everything has been used, repaired and used again. Faces carry what the person has survived. Magic behaves like weather, water or heat, never a glowing effect bolted on. Rank shows in what someone carries and what has been mended, not in gold.

RESTRAINT, and this matters as much as everything above: do not render every surface. Most of the picture must be calm. Sharp detail belongs in three places only, the face, the one object that matters most, and one lit edge of the armour or clothing. Everything else is simplified, soft, and sitting in shadow. Big simple shapes first, small detail last and only where it earns its place. Keep the background soft and out of focus.

MATERIALS MUST NOT MATCH: cloth is matte and soft with a few large smooth folds and no fine pattern at all. Leather is dull with broad creases. Fur is soft-edged clumps. Only actual chainmail has small repeating links, and nothing else in the picture may borrow that texture. Skin is smooth. Water is smooth and glassy with a handful of sharp highlights, not foam and spray across the whole surface. Where the subject is described as worn or scuffed or repaired, that belongs to the named item only, not to everything in frame.

NEVER: no text, letters, numbers, signatures, watermarks or borders. No card frame, no interface, no nameplate. Art only, edge to edge. No all-over speckle, stipple, glitter, sparkles, floating dust motes or scattered tiny bright dots. No fine noise laid over the whole image. Not hyper-detailed, not over-rendered, not every surface busy.

SUBJECT:
A moment, not a portrait, and the single most important image in the set. Divine Intervention: every enemy is halved at once, and it may be played even after the blow has been declared. The Law of Divine Distance forbids a World Titan from intervening in mortal affairs, so this is not a god appearing. It is a god answering. Seen from the ground: a battlefield of armoured figures caught mid-strike and all of them suddenly bowed, buckling, going to one knee under a pressure coming from above. High overhead, through a break in the cloud, the light of Avalonus is coming down in a single hard column of white and gold, and the only hint of what is behind it is architecture at the very top edge of the frame, radiant cloud and white-gold stone, no face and no figure. Everything below is dark. No lettering anywhere in the image. Leave the top fifth and the bottom quarter uncluttered.

Negative prompt: oversaturated detail, hyperdetailed, overrendered, busy texture, sharp detail everywhere, high frequency noise, film grain, speckled, stippled, glitter, sparkles, bokeh dots, floating dust particles, scattered bright dots, chainmail texture on cloth, repeating pattern on skin, mesh over everything, same texture on every material, cluttered background, oversharpened, text, letters, numbers, watermark, signature, border, card frame, nameplate, ui, lowres, blurry face, extra fingers, extra limbs, deformed hands, modern clothing, studio lighting, plain white background
```
