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
pieces of the same set. **If you open Blender with the MCP add-on running, I
can do that part myself** and you never have to touch a render setting. I
checked just now and Blender is not running, so that is an offer rather than
a plan.

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
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape. A tall elven woman standing perfectly still, both hands resting on the pommel of a sword planted point down in front of her. She wears crimson leather in strapped panels with blackened steel plates over the shoulders, forearms and thighs, a high collar, and a heavy cloak wrapped close around her body and falling straight to the plinth. Hair cut blunt at the jaw. Her left eye is a glowing sapphire set in her face. Narrow upright silhouette, roughly twice as tall as wide. Arms held in against the body, nothing protruding, no loose cloth, no fine chains. Tallest piece in the set.
```

### rangers-q, Hannarial Icetear, the Queen

```
A dark fantasy chess piece statuette on a round stone plinth, carved as a single connected shape, matching a set of crimson elven pieces. A tall elven woman standing still, a longbow held upright against her body in one hand with the string against her shoulder, the other hand closed at her side. Crimson leather in strapped panels with pale blue frost patterning on the steel, a tall narrow open crown of thin iron points. Pale hair bound back tight to the head. Cloak wrapped close, falling straight to the plinth. Narrow upright silhouette. Arms in, nothing protruding, no loose strands. Slightly shorter than the King.
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
