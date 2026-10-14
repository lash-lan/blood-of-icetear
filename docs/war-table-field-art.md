# Art for the War Table grounds

Prompts for the five places the board gets set up in.

## Why it looks weird at the moment

Nothing about the field is a picture. The sky is a colour fade, the distant
landscape is two jagged shapes I drew by hand as a list of coordinates, and
the ground under the board is a soft grey blob. It was built that way so a
field would cost nothing to load, and the cost of that is exactly what you
are looking at: it reads as abstract shapes rather than a place.

## The one thing that decides everything

**Each field needs two pictures, not one, and they are taken from completely
different angles.**

The board is a real tilted plane with a flat backdrop standing behind it. So:

- **The backdrop** is seen from eye level, standing up, looking out at the
  horizon. Sky, distant landscape, weather.
- **The ground** is seen from directly above, lying flat, like a rug. It gets
  tilted back fifty four degrees by the page and the nine by nine grid is
  drawn on top of it.

If you generate one landscape picture and we try to use it for both, the
ground comes out looking like a photograph of a hillside pasted flat on a
table, which is worse than the blob. This is the single mistake to avoid.

---

## The backdrop, in detail

- **1600 wide by 1250 tall.** Landscape, slightly wider than it is tall.
- **The horizon sits exactly halfway down**, at 625 pixels. The page puts the
  board at that line. If the horizon is higher or lower the board will look
  like it is floating or sunk.
- **Everything that matters lives in the top half.** The bottom half is
  covered by the board and its own ground, so it should be plain receding
  ground and nothing else. No rocks, no bodies, no banners, no path.
- **Nothing in the centre.** The board sits dead centre. A castle, a moon or
  a bright break in the cloud belongs off to one side, roughly a third in.
- **Dark and quiet.** This is scenery behind a game. Pieces fifty five pixels
  tall have to read against it. If it is beautiful enough to look at on its
  own it is too busy for this.
- **No foreground.** Nothing close to camera, nothing framing the shot, no
  branches across the top corners.

## The ground, in detail

- **1024 by 1024, square.**
- **Straight down from above.** A floor, not a landscape.
- **Flat even light.** No sun angle, no long shadows, no bright patch. The
  page lights it and shadows baked into it will fight the ones it draws.
- **Even all over.** No path, no clearing, no stream, no focal point. The
  grid goes on top, and anything with a direction in it will look like a
  mistake once the board is turned.
- **Low contrast, dark.** Same reason as the backdrop.
- **Texture, not objects.** Ground cover, stone, snow, leaf litter. One or
  two small things scattered sparsely is fine. A skull in the middle is not.

## File names

Into `public/images/fields/` as `hollanheart-sky.png` and
`hollanheart-ground.png`, and the same for `isdowrath`, `darkforest`,
`verdant` and `frost`. Ten files in all.

I will wire them up when they land. It is a small change and the fields data
already has a slot for each one.

---

## Hollanheart Forest

Enchanted summer woodland under the Crimson Veil. The Red Rangers' home
ground. Green, old, and watching you.

### hollanheart-sky

```
A painted fantasy backdrop, 1600 by 1250, landscape. An enchanted deep green summer forest seen from eye level across a clearing, the horizon exactly halfway down the image. Above the horizon, a wall of enormous ancient trees receding into green gloom, a dim green aurora light bleeding through the canopy from behind, a faint veil of old magic hanging in the air between the trunks. Off to the left third, one tree far larger than the rest. Below the horizon, plain dark mossy ground receding away, empty, nothing on it. Deep forest greens and near black, one soft pale green light source. Painted, visible brushwork, not photographic. Dark, quiet and low contrast, scenery meant to sit behind something else. No foreground, nothing close to camera, nothing in the centre of the image.

Negative prompt: bright, high contrast, sunlit, foreground objects, branches framing the shot, path, road, river, people, creatures, buildings, text, watermark, border, vignette, centred focal point, busy detail, lens flare
```

### hollanheart-ground

```
A painted texture seen from directly overhead, 1024 by 1024, square, looking straight down at an enchanted forest floor. Deep moss in several greens, scattered fallen leaves, a few old roots crossing the ground, small pale green glowing spores caught in the moss. Flat even light with no sun direction and no cast shadows. Even all over with no path, no clearing and no focal point, the same density of detail in every corner. Dark, low contrast, deep greens and browns and near black. Painted, visible brushwork, not photographic. Seamless ground cover, texture rather than objects.

Negative prompt: perspective, horizon, sky, three quarter view, angled view, sunlight, cast shadows, bright patch, path, trail, clearing, stream, centred object, skull, people, creatures, text, watermark, border, vignette, high contrast
```

---

## Isdowrath

The southernmost Grey Citadel, the last fortress before the Darklands. The
grey cloud never lifts and the south is still dark at noon.

### isdowrath-sky

```
A painted fantasy backdrop, 1600 by 1250, landscape. A bleak grey northern fortress plain seen from eye level, the horizon exactly halfway down the image. Above the horizon, a low unbroken ceiling of grey cloud that never lifts, jagged bare mountains on the skyline, and off to the right third the dark silhouette of a vast square fortress with a few small lit windows. The far left of the sky is noticeably darker, as though night is standing there at midday. Thin snow drifting. Below the horizon, plain frozen grey ground receding away, empty, nothing on it. Cold greys, slate blue and near black, no warm colour anywhere except the tiny fortress windows. Painted, visible brushwork, not photographic. Dark, quiet and low contrast, scenery meant to sit behind something else. No foreground, nothing close to camera, nothing in the centre of the image.

Negative prompt: bright, high contrast, blue sky, sunlight, warm colour, foreground objects, branches framing the shot, path, road, people, armies, text, watermark, border, vignette, centred focal point, busy detail, lens flare
```

### isdowrath-ground

```
A painted texture seen from directly overhead, 1024 by 1024, square, looking straight down at frozen trampled ground outside a fortress. Hard grey mud frozen into ridges, patches of old grey snow, scattered broken flagstones half sunk into it, a thin crust of ice in the hollows. Flat even light with no sun direction and no cast shadows. Even all over with no path, no clearing and no focal point, the same density of detail in every corner. Dark, low contrast, cold greys and slate blue and near black. Painted, visible brushwork, not photographic. Seamless ground cover, texture rather than objects.

Negative prompt: perspective, horizon, sky, three quarter view, angled view, sunlight, cast shadows, bright patch, path, trail, wheel ruts, footprints in a line, centred object, bodies, weapons, text, watermark, border, vignette, high contrast
```

---

## The Great Dark Forest

The heart of the Continent of Darkness, with the Soul Gate at its deepest
point. Never follow a voice that calls your name here.

### darkforest-sky

```
A painted fantasy backdrop, 1600 by 1250, landscape. A corrupted black forest seen from eye level, the horizon exactly halfway down the image. Above the horizon, impossibly tall dead black trees with no leaves, crowded close and vanishing upward out of frame, a sick violet glow deep between them coming from something far away and below. Off to the right third the glow is stronger, as though a gate stands there. Faint orange embers drifting upward through the trunks. Below the horizon, plain black ground receding away, empty, nothing on it. Violet, deep purple and black, with a few small embers of dull orange. Painted, visible brushwork, not photographic. Dark, quiet and low contrast, scenery meant to sit behind something else. No foreground, nothing close to camera, nothing in the centre of the image.

Negative prompt: bright, high contrast, sunlight, green foliage, leaves, foreground objects, branches framing the shot, path, road, faces in the trees, people, creatures, text, watermark, border, vignette, centred focal point, busy detail, lens flare
```

### darkforest-ground

```
A painted texture seen from directly overhead, 1024 by 1024, square, looking straight down at the floor of a corrupted black forest. Black wet earth, pale bone coloured roots breaking the surface, scattered small clusters of dull violet fungus glowing faintly, a thin film of dark mist lying over it. Flat even light with no sun direction and no cast shadows. Even all over with no path, no clearing and no focal point, the same density of detail in every corner. Very dark, low contrast, black and deep violet with a little bone white. Painted, visible brushwork, not photographic. Seamless ground cover, texture rather than objects.

Negative prompt: perspective, horizon, sky, three quarter view, angled view, sunlight, cast shadows, bright patch, path, trail, clearing, centred object, skull, bones arranged, faces, people, creatures, text, watermark, border, vignette, high contrast
```

---

## The Verdant Wilds

Dense jungle, enormous ferns, heavy wet air. Proof that nature endured
whatever else did not.

### verdant-sky

```
A painted fantasy backdrop, 1600 by 1250, landscape. Dense primeval jungle seen from eye level across a small break in the growth, the horizon exactly halfway down the image. Above the horizon, a towering wall of jungle, enormous ferns and broad leaves layered deep, hanging vines, thick wet haze hanging between the layers, a diffuse pale green light coming down from a canopy far above and out of frame. Off to the left third one colossal buttressed tree trunk. Below the horizon, plain dark wet ground receding away, empty, nothing on it. Deep saturated greens, wet black, one soft pale green light. Painted, visible brushwork, not photographic. Dark, quiet and low contrast, scenery meant to sit behind something else. No foreground, nothing close to camera, nothing in the centre of the image.

Negative prompt: bright, high contrast, blue sky, direct sunlight, sun shafts, foreground objects, leaves framing the shot, path, road, river, animals, birds, people, ruins, text, watermark, border, vignette, centred focal point, busy detail, lens flare
```

### verdant-ground

```
A painted texture seen from directly overhead, 1024 by 1024, square, looking straight down at a wet jungle floor. Thick wet leaf litter in deep greens and browns, broad fallen leaves overlapping, low creeping ground ferns, dark standing water in the hollows, everything slick and wet. Flat even light with no sun direction and no cast shadows. Even all over with no path, no clearing and no focal point, the same density of detail in every corner. Dark, low contrast, deep green and wet black. Painted, visible brushwork, not photographic. Seamless ground cover, texture rather than objects.

Negative prompt: perspective, horizon, sky, three quarter view, angled view, sunlight, dappled light, cast shadows, bright patch, path, trail, stream, centred object, flowers, animals, insects, people, text, watermark, border, vignette, high contrast
```

---

## The Bastion of Frost

The northern citadel of the Sacred Order, watching the endless wasteland
where the Thirteen Lich Lords fight their own civil war.

### frost-sky

```
A painted fantasy backdrop, 1600 by 1250, landscape. An endless frozen northern wasteland seen from eye level, the horizon exactly halfway down the image. Above the horizon, a vast empty pale blue winter sky with a cold aurora low across it, a long flat line of ice cliffs on the skyline, and off to the right third the pale silhouette of a high walled citadel of white stone. Heavy snow drifting across. Below the horizon, plain wind scoured snow receding away, empty, nothing on it. Cold pale blues, white and deep blue shadow, no warm colour anywhere. Painted, visible brushwork, not photographic. Dark, quiet and low contrast, scenery meant to sit behind something else. No foreground, nothing close to camera, nothing in the centre of the image.

Negative prompt: bright, blown out white, high contrast, sunlight, warm colour, sunset, foreground objects, rocks framing the shot, path, road, tracks, people, armies, trees, text, watermark, border, vignette, centred focal point, busy detail, lens flare
```

### frost-ground

```
A painted texture seen from directly overhead, 1024 by 1024, square, looking straight down at wind scoured northern snow. Packed snow in low wind carved ridges, dark blue ice showing through in patches where the snow has been stripped away, fine drifting spindrift caught in the ridges. Flat even light with no sun direction and no cast shadows. Even all over with no path, no clearing and no focal point, the same density of detail in every corner. Low contrast and dimmer than real snow, cold blues and grey white rather than pure white. Painted, visible brushwork, not photographic. Seamless ground cover, texture rather than objects.

Negative prompt: perspective, horizon, sky, three quarter view, angled view, sunlight, sparkle, glitter, cast shadows, bright white, blown out, footprints, tracks, path, centred object, rocks, people, text, watermark, border, vignette, high contrast
```

---

## If the grounds come out too bright

They will. Snow and moss both generate far lighter than they need to be, and
the pieces have to read against them. Send them anyway. Darkening a texture
is one line at my end and does not need regenerating, so do not spend
attempts on it.
