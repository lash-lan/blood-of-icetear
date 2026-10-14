# Art for the War Table pieces

The board at `/arena/war-table` is **nine squares by nine**, so each banner
fields **seven kinds of piece**: King, Queen, Champion, Rook, Bishop, Knight
and Pawn. It already slides pieces between squares and makes a sound when
they land, and it draws them as glyphs until a picture exists.

**The three single pieces are specific people out of the archive.** The King,
the Queen and the Champion are one each, so each one is a portrait of someone
who actually exists in the world. The Rook, Bishop, Knight and Pawn come two,
two, two and nine to a side, so those are ranks rather than people.

## Who each piece is

| | King | Queen | Champion | Rook | Bishop | Knight | Pawn |
|---|---|---|---|---|---|---|---|
| **Red Rangers** | **Solenyra Gravespine**, High Warden | **Hannarial Icetear**, Captain | **Anthurian Icetear**, Vice Captain | Winterguard | Moon Warrior | Tracker | Ranger |
| **Grey Knights** | **Tyberius Greyhide**, first Knight King | **Landervale Hemarc**, Dragon Core | **the Grey King** | Wallwarden | Light Councillor | Black Raider | Squire |
| **The Dark Host** | **Anthurian Bloodwing**, first Dark Lord | **Helena**, the Dark Angel | **Anubis the Lycan**, second Dark Lord | Lycan | Night Witch | Drake | Freedman |
| **The Beast Lords** | **Ligarr**, Beast Lord King of the Leonar | **Tyranor**, the Goddess Behemoth | **Lycanor** | Behemoth | Moon Sprite | Garuda | Beastling |
| **The Sacred Order** | **Arch-Saint Lady Shallon** | **Amelia**, the Saint Paragon | **Salomei**, Holy Knight Captain | Bastion Knight | Knight Sister | Night Sister | Novice |

**Start with the Red Rangers' seven, below.** If the look is right I will write
the other twenty eight and wire all thirty five up. If it is wrong we have only
burned seven.

## What I need technically

- **Square**, 1024 x 1024. Not portrait. Each piece lives in a square cell.
- **Transparent background.** If the tool will not do it, use **flat pure
  magenta `#FF00FF`** and I will cut it out exactly. Not a dark background,
  because half the banners are dark and the edges will smear.
- **The whole piece inside the frame**, with a little air round it.
- **Seen from the side, straight on**, like a piece standing on a table. Not a
  character portrait, not a three quarter view. All seven must share one
  camera and one light or they will not look like a set.
- **It has to read at 55 pixels.** That is how big it really is on a phone,
  now that there are nine across. **Silhouette beats detail**, every time.
- **Keep the classic chess outline.** A player must know instantly which piece
  it is. Dress the shape in the character rather than replacing it.

## File names

Save into `public/images/chess/` as `rangers-k.png`, `rangers-q.png`,
`rangers-c.png`, `rangers-r.png`, `rangers-b.png`, `rangers-n.png`,
`rangers-p.png`.

---

## The Red Rangers

Women only, out of a hidden fortress in Hollanheart Forest. Crimson dyed
leather in strapped panels with the joints left open, because they put
mobility before protection. The gaps close as a Ranger rises, so **the Pawn
shows the most skin and the King the least**, and real metal only appears at
the top of the order.

### Solenyra Gravespine, the King

```
A single carved chess piece on a transparent background, square image, seen from the side straight on like a piece standing on a table. This is the King of a crimson elven order of women, and she is Solenyra Gravespine, High Warden of the Red Rangers and the last of her House. Carve her as a tall still figure in crimson leather with blackened steel plates strapped over it at the shoulder, forearm and thigh, a high collar, and a long cloak falling to the base. Her head is bare and her hair is cut blunt at the jaw. Her left eye glows a cold sapphire blue and a faint blue light sits on that cheek, because her dead brother's soul is held in a stone behind it. One hand rests on a sheathed sword, the other is open at her side. Her face is composed and unreadable. Crimson, blackened steel, one point of sapphire blue. Painted, not photographic, visible brushwork, one strong light from the upper left. A strong simple silhouette that reads at fifty five pixels. Transparent background, no shadow on the ground. No text, no letters, no numbers, no watermark, no border.
```

### Hannarial Icetear, the Queen

```
A single carved chess piece on a transparent background, square image, seen from the side straight on, matching a set of crimson elven pieces. This is the Queen, and she is Hannarial Icetear, Captain of the Red Rangers, who lost her family the night Ashwinter burned and learned one name from it. Carve her slightly taller and narrower than the King: a standing elven woman in crimson leather with pale blue Icetear frostwork on the strapped plates, a tall open crown of thin iron points, and a long elven bow held upright in one hand with the string against her shoulder so the outline stays narrow. Her hair is pale and bound back hard. Her face is set and furious and controlled. Crimson and pale frost blue, one small point of white. Painted, not photographic, visible brushwork, one strong light from the upper left. A strong simple silhouette that reads at fifty five pixels. Transparent background, no shadow on the ground. No text, no letters, no numbers, no watermark, no border.
```

### Anthurian Icetear, the Champion

```
A single carved chess piece on a transparent background, square image, seen from the side straight on, matching a set of crimson elven pieces. This is the Champion, the one fighter sent out ahead of the host, and she is Anthurian Icetear, Vice Captain of the Red Rangers, who was away on a mission the night her family was taken and has never put that down. Carve her mid stride rather than standing, leaning forward with weight on the front foot, in crimson leather cut away at the thigh, shoulder and midriff with only a single scuffed steel bracer, a long knife reversed in each hand held low and back. Raven hair streaming behind her. Her face is hard and young and entirely committed. Crimson and dull steel, nothing ornamental. She must look faster than everything else in the set. Painted, not photographic, visible brushwork, one strong light from the upper left. A strong simple silhouette that reads at fifty five pixels. Transparent background, no shadow on the ground. No text, no letters, no numbers, no watermark, no border.
```

### Winterguard, the Rook

```
A single carved chess piece on a transparent background, square image, seen from the side straight on, matching a set of crimson elven pieces. This is the Rook, an Icetear Winterguard who holds the line and does not step aside. Keep the rook's broad squat tower outline, but build it out of the soldier: a planted elven woman behind a tall crimson tower shield that fills almost the whole silhouette, its lower edge already iced to the ground with frost blooming in small flowers across it, a short spear over the rim, pale blue lacquered plate above crimson leather. The widest and heaviest piece in the set. Painted, not photographic, visible brushwork, one strong light from the upper left. A strong simple silhouette that reads at fifty five pixels. Transparent background, no shadow on the ground. No text, no letters, no numbers, no watermark, no border.
```

### Moon Warrior, the Bishop

```
A single carved chess piece on a transparent background, square image, seen from the side straight on, matching a set of crimson elven pieces. This is the Bishop, a Moon Warrior trained in the Night Forest and serving with the Red Rangers. Keep the bishop's tall tapered outline with its one notch: a hooded standing elven woman in a long silver grey silk mantle over crimson leather, head slightly bowed, a curved moonblade held low and close against the body. Her skin carries a faint lunar sheen, as though it is holding light rather than reflecting it. Silver grey and crimson, no metal. Painted, not photographic, visible brushwork, one strong light from the upper left. A strong simple silhouette that reads at fifty five pixels. Transparent background, no shadow on the ground. No text, no letters, no numbers, no watermark, no border.
```

### Tracker, the Knight

```
A single carved chess piece on a transparent background, square image, seen from the side straight on, matching a set of crimson elven pieces. This is the Knight. Keep the chess knight's classic shape, a head and neck rising from a round base, but instead of a horse make it a great grey forest wolf in profile facing left, head low and ears flat, with a crimson Ranger's cord and a single hunting horn bound at its neck. Rough grey pelt, one crimson accent, nothing else. It must still read instantly as the knight from its outline alone. Painted, not photographic, visible brushwork, one strong light from the upper left. A strong simple silhouette that reads at fifty five pixels. Transparent background, no shadow on the ground. No text, no letters, no numbers, no watermark, no border.
```

### Ranger, the Pawn

```
A single carved chess piece on a transparent background, square image, seen from the side straight on, matching a set of crimson elven pieces. This is the Pawn, a rank and file Red Ranger, and the smallest and plainest thing in the set. A short round topped figure of a young elven woman in crimson dyed leather in loose strapped panels, cut away at the shoulder, upper arm and thigh so bare skin shows at the joints, no metal on her at all, a short recurve bow held upright against the body so the outline stays narrow and simple. One tight braid. Nothing ornamental, nothing heavy. It must read at fifty five pixels as unmistakably the smallest piece on the board. Painted, not photographic, visible brushwork, one strong light from the upper left. Transparent background, no shadow on the ground. No text, no letters, no numbers, no watermark, no border.
```
