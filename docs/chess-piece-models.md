# Models for the War Table pieces

Prompts for Astra, and what I need back from it.

## Read this first, because it decides everything else

**I do not need the model at runtime.** The board is CSS, not WebGL, and
putting a 3D engine on the site is a much bigger change than it sounds. What I
need is **eight pictures of each piece, taken every 45 degrees around it.**
The board already knows which way the camera is pointing, so it picks the
matching one, and the piece turns as you orbit exactly as a real object
would. No library, no download weight, no rewrite.

So there are two ways to hand this over, and the first is better.

**Give me the model files** (`.glb` preferred, `.fbx` or `.obj` fine). Then
the turntables can be rendered properly, with one camera and one light for
the whole set, which is the only way seven pieces end up looking like seven
pieces of the same set. **Open Blender and I do that part myself**, and you
never touch a render setting. This is tested, not a hope: I have driven
Blender from here, rendered a full eight view turntable off a model already
in the file, and put every setting back afterwards without saving over
anything.

**Or give me the renders**, to the spec below. Works fine, just leaves the
consistency on you.

### The render spec, if you are doing it

- **Eight views per piece**, turning the piece and not the camera: yaw 0, 45,
  90, 135, 180, 225, 270, 315 degrees.
- **Camera 35 degrees above the ground**, pointing at the middle of the piece.
  That is the angle the board actually sits at, so anything else will look
  like it is leaning.
- **Orthographic, or a long lens.** A wide lens bends the piece and it shows
  badly at this size.
- **Transparent background.** No ground shadow baked in, the board draws its
  own.
- **One camera distance and one framing for the whole set.** Do not fit each
  piece to the frame, or the Pawn comes out as tall as the King.
- **PNG, about 512 wide by 1024 tall.**
- Name them `rangers-k-0.png` through `rangers-k-7.png`, where the number is
  the yaw divided by 45.

## If the model is being built from pictures, it needs more than one

This is the thing that actually went wrong on the first attempt, so it is
worth stating plainly.

A model built from a single front on picture only has a front. The tool
wraps that one image onto the shape it guesses, so everything the camera
could see comes out right and everything it could not see comes out blank.
I checked this on the model already built: the texture is 528 by 1021, which
is the front picture and nothing else, and the back of the head is plain
white. It looks correct until you turn it about 60 degrees, and then it is
ruined. For a chess piece you walk around, that is fatal.

**So each character needs three pictures, not one**, all of the same figure
in the same pose, same clothes, same lighting, same distance:

- **Front**, which is the A pose reference already drawn.
- **Back**, straight behind, same height and framing.
- **Side**, from her left, same height and framing.

The A pose itself is right and should not change. Arms out is awkward for a
chess piece but correct for building a model, because nothing overlaps
anything else, and the arms can be brought down afterwards. The rig on the
existing model has 58 bones with ordinary names, and I can set them from
here, so the standing pose is mine to fix. The texture is not.

### The two missing views, ready to paste

Give these to the same generator that made the A poses, with the A pose
attached as the reference image, one at a time.

**Solenyra Gravespine, back view**

```
The exact same character from the attached reference, seen from directly behind, standing in the same A pose with arms out from the body. Full figure, head to feet, same height in frame, same distance, same flat even lighting, plain light grey background. A tall elven woman in blackened steel plate over crimson leather fitted close, small sapphire points set into the plates, deep crimson cloak hanging straight down her back. Long black hair falling down her back. Nothing cropped, feet included, arms not overlapping the body. Identical colours and materials to the reference.

Negative prompt: three quarter view, turned head, front view, different pose, arms down, cropped, close up, dramatic lighting, cast shadow, busy background, different armour, different hair colour
```

**Solenyra Gravespine, side view**

```
The exact same character from the attached reference, seen from her left side in exact profile, standing in the same A pose with arms out from the body. Full figure, head to feet, same height in frame, same distance, same flat even lighting, plain light grey background. A tall elven woman in blackened steel plate over crimson leather fitted close, small sapphire points set into the plates, deep crimson cloak. Long black hair. The small pale star on her forehead visible in profile. Nothing cropped, feet included. Identical colours and materials to the reference.

Negative prompt: three quarter view, front view, back view, turned head, different pose, arms down, cropped, close up, dramatic lighting, cast shadow, busy background, different armour, different hair colour
```

**Hannarial Icetear, back view**

```
The exact same character from the attached reference, seen from directly behind, standing in the same A pose with arms out from the body. Full figure, head to feet, same height in frame, same distance, same flat even lighting, plain light grey background. A tall elven woman in crimson leather in strapped panels under gold edged plate at the shoulders, forearms and thighs. Long blonde hair bound back tight to the head. Nothing cropped, feet included, arms not overlapping the body. Identical colours and materials to the reference.

Negative prompt: three quarter view, turned head, front view, different pose, arms down, cropped, close up, dramatic lighting, cast shadow, busy background, different armour, different hair colour
```

**Hannarial Icetear, side view**

```
The exact same character from the attached reference, seen from her left side in exact profile, standing in the same A pose with arms out from the body. Full figure, head to feet, same height in frame, same distance, same flat even lighting, plain light grey background. A tall elven woman in crimson leather in strapped panels under gold edged plate at the shoulders, forearms and thighs. Long blonde hair bound back tight to the head. Nothing cropped, feet included. Identical colours and materials to the reference.

Negative prompt: three quarter view, front view, back view, turned head, different pose, arms down, cropped, close up, dramatic lighting, cast shadow, busy background, different armour, different hair colour
```

## What makes a model that survives this

These matter more than the art direction, because they are what breaks.

- **A chess piece, not a character.** One connected shape standing on a solid
  round plinth.
- **Arms in, against the body.** Anything thin sticking out generates badly
  and snaps off at small sizes.
- **Weapons held upright against the body**, never extended outward.
- **No spread cloaks.** A cape wrapped close is good, a cape thrown wide is a
  thin sheet that generates as a mess and ruins the silhouette.
- **No loose hair strands, no fine chains, no lace.** They come out as noise.
- **Still, not mid-action.** A statue of the moment before, not during.
- **Narrow.** Roughly twice as tall as it is wide, including the plinth.
- **Height is meaningful.** Keep the plinth the same size on every piece and
  let the figure's height do the ranking: Pawn shortest, then Knight, Bishop,
  Rook, Champion, Queen, King tallest. Build that in. I cannot add it later.

---

## The Red Rangers

Do these seven first. If they come out well I will write the other
twenty eight. Crimson dyed leather in strapped panels with the joints left
open, dark steel, and the gaps close as a Ranger rises, so **the Pawn shows
the most skin and the King the least.**

### rangers-k, Solenyra Gravespine, the King

```
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape. A tall elven woman standing perfectly still, both hands resting on the pommel of a sword planted point down in front of her. She wears blackened steel plate over crimson leather, fitted close, with small sapphire points set into the plates, and a deep crimson cloak wrapped around her body and falling straight to the plinth. Long black hair. Her left eye is a glowing sapphire set in her face, and a small pale star sits on her forehead. Narrow upright silhouette, roughly twice as tall as wide. Arms held in against the body, nothing protruding, no loose cloth, no fine chains. Tallest piece in the set.
```

### rangers-q, Hannarial Icetear, the Queen

```
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape, matching a set of crimson elven pieces. A tall elven woman standing still, a longbow held upright against her body in one hand with the string against her shoulder, the other hand closed at her side. Crimson leather in strapped panels under gold edged plate at the shoulders, forearms and thighs, a tall narrow open crown of thin gold points. Long blonde hair bound back tight to the head. Cloak wrapped close, falling straight to the plinth. Narrow upright silhouette. Arms in, nothing protruding, no loose strands. Slightly shorter than the King.
```

### rangers-c, Anthurian Icetear, the Champion

```
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape, matching a set of crimson elven pieces. A lean elven woman standing in a forward-weighted stance, a long knife held reversed against each forearm so both arms stay tight to the body. Crimson leather cut away at the thigh, shoulder and midriff, a single scuffed steel bracer, no cloak at all. Raven hair bound back in one tail. She should read as the fastest thing in the set: narrow, low, nothing loose on her. Narrow upright silhouette. Third tallest.
```

### rangers-r, the Winterguard, the Rook

```
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape, matching a set of crimson elven pieces. An elven woman planted square behind a tall tower shield that covers her from shin to shoulder, a short spear held upright behind it. Pale blue lacquered plate over crimson leather, frost spreading in small flower shapes across the face of the shield, the shield's lower edge iced to the plinth. The broadest and heaviest piece in the set, but still upright and narrow in profile. Nothing protruding past the shield.
```

### rangers-b, the Moon Warrior, the Bishop

```
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape, matching a set of crimson elven pieces. A hooded elven woman standing still, head slightly bowed, a curved moonblade held low and flat against the front of her body in both hands. A long silver grey mantle over crimson leather, wrapped close and falling straight to the plinth. The hood gives a tall tapered head with one notch at the back. No metal, no ornament, no loose cloth. Narrow upright silhouette.
```

### rangers-n, the Tracker, the Knight

```
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape. The head, neck and shoulders of a great forest wolf rising from the plinth in the manner of a chess knight, facing forward, head low, ears flat back. Rough grey pelt. A single crimson Ranger's cord bound at the neck with a small hunting horn hanging against the chest. No legs, no body below the shoulders, the mass runs straight down into the plinth. Narrow upright silhouette, nothing protruding.
```

### rangers-p, the Ranger, the Pawn

```
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape, matching a set of crimson elven pieces. A young elven woman standing still, a short recurve bow held upright against her body in one hand. Crimson dyed leather in loose strapped panels cut away at the shoulder, upper arm and thigh, no armour plate anywhere, no cloak. One tight braid down the back. The plainest and by a clear margin the shortest piece in the set, about two thirds the height of the King. Narrow upright silhouette, arms in, nothing loose.
```

---

## The other four banners, once these work

Same seven shapes and the same plinth, redressed. The three named pieces per
banner are in `docs/chess-piece-art.md`.

| Banner | Material | The one detail |
|---|---|---|
| **Grey Knights** | weathered grey steel and dark stone, no gold | a single deep red enamel mark at the collar |
| **The Dark Host** | blackened iron and violet enamel | one aging white feather |
| **The Beast Lords** | horn, hide and green bronze | the pieces are beasts rather than people |
| **The Sacred Order** | white stone and old gold, the only banner allowed gold | a frost rimed edge |
