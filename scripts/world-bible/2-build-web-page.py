# Build the world bible page: the written lore, plus an identifier gallery for
# 247 reference images, 72 of which have never been named.
#
# The naming is the point. An unnamed plate is a picture nobody can cite, so the
# gallery lets Lash type a name against one and keeps it in the artifact's own
# store, where it can be read back and used to rename the real files on disk.

import json, html
from pathlib import Path

OUT = Path(r"C:\Users\lashl\AppData\Local\Temp\tl\bible")
entries = json.loads((OUT / "manifest.json").read_text(encoding="utf-8"))

UNNAMED_PREFIXES = ("chatgpt image", "gemini_", "generated", "image ", "img", "download", "unnamed")
for e in entries:
    e["unnamed"] = e["name"].lower().startswith(UNNAMED_PREFIXES)
    e["id"] = e["file"].split("/")[-1].rsplit(".", 1)[0]

areas = []
for e in entries:
    if e["area"] not in [a["name"] for a in areas]:
        areas.append({"name": e["area"], "order": e["order"]})
areas.sort(key=lambda a: a["order"])

n_un = sum(1 for e in entries if e["unnamed"])
data = json.dumps(
    [{"i": e["id"], "n": e["name"], "a": e["area"], "f": e["file"], "u": e["unnamed"]} for e in entries],
    separators=(",", ":"),
)

LORE = [
    ("Before the world", """Primordial Titans and their children forged the universe, the stars and the worlds. They made the <b>World Titans</b> to cultivate the worlds given into their charge, and governed from their own parallel dimensions: heaven, hell, the ghost realm.
<p>The <b>Eternal Fae Realm</b> was made by the Great Primordial Titans for one purpose: to generate and enrich immortal souls. Souls were sent out to inhabit mortal bodies on each planet the realm was connected to, and those bodies were elves, Tylons, fairies and the rest. <b>No Titan dwells there.</b> Chosen ones are permitted transit when necessary.</p>
<ul>
<li><b>Primordial Entities</b> &ndash; before anything. Light, Darkness.</li>
<li><b>Primordial Titans</b> &ndash; forces, not beings. Chaos, Conflict, Death, Dream, Entropy, Envy, <b>Fear</b>, Imbalance, Life, Loss, Magic, Memory, Order, Pain, Silence, Time, Will.</li>
<li><b>Universal Titans</b> &ndash; cosmic scale. Aetheris, Apophis, Drahz, Eris, Inru, Lyessa, Myrr-Lune, Ouroboros, Plu'thon, Sarthol, Solaar, Tessuriel, Umagundurr, Vehl, Volun-Taar.</li>
<li><b>World Titans</b> &ndash; walked Archavalon. <b>Ra</b>, <b>Hyperion</b>, <b>Lucifial</b>, <b>Typhon</b>, <b>Akidna</b>, Hades, Persephone, Selene, Oceanus, Nyx, Seth, Tartaras, Cerci, Freyva, Glorion, Hecate, Mara, M&oacute;r-R&iacute;oghain, Nephthys, Aionia, Pale, Strix.</li>
<li><b>Prime Gods</b> &ndash; born from the primordial energies of the planet itself, and they gave life to its beasts and animals. The Storm God, the Wind Valkyrie, the five Savannah gods, the jungle gods, Icetear, Tyberius.</li>
<li><b>Elder Gods</b> and <b>Demi Gods</b> &ndash; <span class="open">open</span></li>
</ul>
<p class="pull">The Titan of Fear is first generation. The Black Sea Angels were made by a Primordial Titan, two whole tiers above Ra, who is a World Titan.</p>
<p>So Bahamut did not beat a monster. A third-generation Titan's son went alone against the last work of a first-generation Titan, and won. His siblings dismissed the warning because nothing in their experience prepared them to take it seriously. They were not lazy. They were provincial. It also means the Angels were never the threat. They were the arrows. The archer has never been accounted for.</p>"""),

    ("The three inheritances", """Your own framework states it outright: the Prime Gods are not Black Sea beings. The Prime Gods arise from the world itself, while the things of the Black Sea are something fundamentally separate, and that distinction is part of the core cosmology.
<table>
<tr><th></th><th>Titan-born</th><th>Prime-blessed</th><th>Black Sea</th></tr>
<tr><td>Source</td><td>the World Titans, from outside</td><td>the planet itself</td><td>the Titan of Fear, out in the void</td></tr>
<tr><td>Passes by</td><td>bloodline</td><td>relationship</td><td>infection, through a wound</td></tr>
<tr><td>Shows as</td><td>scale, feather, horn, wing</td><td>light, only when called</td><td>black veining that moves</td></tr>
<tr><td>Can be lost</td><td>never</td><td>yes, withdrawn</td><td>no, and not yours to lose</td></tr>
<tr><td>At rest</td><td>still visible</td><td><b>completely absent</b></td><td>still spreading</td></tr>
</table>
<p>The middle column's last row is the one that matters. A storm-blessed northerner at rest looks like nobody. The god is not in them, it is with them, and it can leave. That is a more frightening inheritance than scales.</p>
<p><b>The Law of Divine Distance.</b> Hyperion decreed that any divine being of God rank or above faces immediate consequence for acting directly in this world. Anyone of divine blood carries strict limiters, unless they follow one specific and strict path: <b>the Path of Vaen</b>.</p>"""),

    ("Lorevolution and the Faelorn", """The Eternal Fae Realm is saturated with the lingering essence of the Primordial Titans. It intertwines with Fae magic into a force that does not create life but <b>perfects</b> it. Every creature born in the realm carries a spark. Most never wake it.
<p>When a being meets overwhelming emotion, unwavering conviction, unbearable loss, absolute trust, or performs a deed worthy of legend, the spark answers. Mind, body and spirit erupt as Titan essence fuses with their existence. This is <b>Lorevolution</b>, and the reborn are <b>Faelorn</b>.</p>
<p>A Faelorn is not merely bigger. It becomes the truest reflection of its own soul. Gentle creatures become guardians, proud hunters become champions, and those consumed by hatred become predators whose presence darkens the land. No two are alike, so scholars say a Faelorn's shape reveals what its owner cannot hide.</p>
<table>
<tr><th>Base</th><th>First Lorevolution</th><th>Second</th></tr>
<tr><td>Tylon, the sea steed</td><td>Sea Centaur (light)</td><td>Sea Sovereign, avatar of the ocean</td></tr>
<tr><td>Tylon, the sea steed</td><td>Deep-Sea Steed Dragonoid (dark)</td><td>Tylon Leviathan</td></tr>
</table>
<p class="pull">Rarely, a Faelorn and its companion resonate so completely that a further Lorevolution transforms both.</p>
<p>Some Faelorn become divine weapons, some become living armour, and a precious few dissolve into primordial essence and merge with their companion's soul. The union lasts moments, and in those moments the pair have challenged dragons, ancient demons and the servants of forgotten gods. Almost none prove worthy of one.</p>"""),

    ("The Five Children of Ra", """Forged by Ra, Father of Skies. From them came every dragon and phoenix.
<ul>
<li><b>Osiris, the Phoenix-Dragon.</b> Rebirth, Sacred Fire. Father of the Feathered Dragons and the High Phoenixes. His dragons burn red, his phoenixes burn blue. <span class="open">Territory open</span></li>
<li><b>Tiamatra, the Dragon Queen.</b> Sovereignty, Legacy. Mother of the Western Dragons. Western Continent. She stayed.</li>
<li><b>Bahamut, the Black.</b> Strength, Judgment. Guardian of Sacred Earth. Wings that covered the sun, now bone stumps. Progenitor of the Earth Wyrms. Sealed. <span class="open">Location open</span></li>
<li><b>Ryujin, the Wise.</b> Water, Wisdom. Eastern Dragons: long, serpentine, no wings, flies regardless. Eastern Continent.</li>
<li><b>Delphyne, the Wyvern Queen.</b> Freedom, Prophecy. The greatest wingspan of the five. <span class="open">Territory open</span></li>
</ul>
<p><b>The Law of Divine Departure.</b> After the World Titans withdrew, Ra's children chose: return to the pocket realms at full power, or remain and lose ninety percent of their divinity. Only Tiamatra is recorded as staying, to hold Bahamut's prison shut and to face him if he wakes.</p>
<p><b>Bahamut, in full.</b> During the Cataclysm of the Father of Monsters a small scout party led by a Black Sea Angel crashed from space into the Southern Sea and began corrupting the south-centre of the Central Continent. Typhon and Akidna were walking the north-west at the time, so the world was looking the other way. Bahamut warned his siblings, was ignored, went alone, met the fleet as it moved on the East and destroyed it single handed. The invaders got in through his open wounds, and he swallowed the Angel whole.</p>
<p>He arrived last at the gathering on the Law of Divine Departure, twisted and veined, his wings reduced to mutilated bone stumps. He tried to persuade his siblings to accept the Black Sea's power as he and his Earth Dragon descendants had. They refused. A battle broke out. He was sealed deep in the earth in enchanted slumber, and Tiamatra remained to keep the enchantment going.</p>
<p class="pull">He chased the fleet and left the crash site. He saved the East and never burned the landing ground.</p>"""),

    ("The Black Sea is space", """The Black Sea is not water. It is the void Archavalon hangs in, the ocean between stars, where the Universal Titans are and where the Titan of Fear worked. So corruption from it is not disease. It is contamination by something that was never meant to have a shape here.
<p><b>It cannot be cured, only contained.</b> Bahamut swallowed a piece of the outside and it is still in him. That is why the answer was a seal and a jailer rather than a physician.</p>
<p><b>The Earth Wyrms are the void unmaking form.</b> His descendants lost their wings, and later lines lost their limbs. Things from the Black Sea do not have bodies the way this world has bodies, and his line is being corrected toward that.</p>
<p><b>It arrives twice.</b> The scout, in the Foundation Age: one Angel and a small party, crashed in the Southern Sea, destroyed by Bahamut at the cost of himself. Then the Descent, at the end of the Age of Lords: <b>thirteen</b> Black Sea Angels come down, and this is the invasion proper. It defines the Age of Darkness and only ends when all thirteen are slain and the corruption is isolated at the southern end of the world.</p>
<p>Named so far: <b>Nara</b>, Angel of Lust, Pleasure and Excess, against whom a Slayer force is sent near the end of the Fourth Age, where the Five Slayers fall.</p>"""),

    ("The six continents", """<figure class="map"><img src="map-web.jpg" alt="The world as it stands" width="1700" height="1180" loading="lazy"><figcaption>The world as it stands. Relationship map, not survey.</figcaption></figure>
<ul>
<li><b>Western.</b> Elves and Humans dominant, with minorities of beast-lords and mountainkin. Medieval aesthetic with high elven elegance. Birthplace of the Elu-Dragar. Tiamatra's, and almost certainly Bahamut's prison beneath it. <b>It dies in the Age of Darkness.</b></li>
<li><b>Central.</b> The contested middle. Storm peoples in the north-east. The <b>Savannah</b> warrior kingdoms in the east-central lands, allied to the Beast Lords. The south-centre is where the Black Sea first came ashore, and the whole southern edge falls in the Third and Fourth Age.</li>
<li><b>Eastern.</b> Chinese, Japanese and Korean myth for its human cultures. Overseen by Ra's children, but not physically any more: a land governed in the name of gods who left. The <b>Great Jungle</b> runs south-east to south-centre, held by elves of Hindu and Sri Lankan myth. The <b>Exodus to the East</b> happens in the Age of Darkness, which makes this the continent where humanity survives.</li>
<li><b>Northern.</b> Arcs over all three and touches each, shattered. The only land bridge, and a maddening mist that behaves like an entity keeps every mortal off it.</li>
<li><b>Southern.</b> The Beast Lord races, across the Southern Sea from the savannah.</li>
<li><b>South-Western, the Continent of Darkness.</b> The Dark races. <span class="open">Almost entirely open</span></li>
</ul>
<p><b>Walls and citadels.</b> The Great Southern Wall, founded alongside the Grey Knights at the end of the Age of Mortal Rebellion. The Great Northern Wall of the Fae, built in the Age of Lords against a foretold evil, and it falls later in the same age. The Great Grey Wall, guarded by thirteen Grey Citadels, with <b>Isdowrath</b> furthest south against the Darklands.</p>
<p><b>Three buried things.</b> Akidna beneath the northern seas, held by imprisonment. Bahamut in deep western earth, held by Tiamatra's enchantment. The Black Sea in the southern sea, held by nothing. The third has no jailer, and that is the difference.</p>"""),

    ("The Ages", """Your structure document and the live website disagree on the third age. The site says Age of Kingdoms. Your document says <b>Age of Lords</b>. One of them is wrong and the site is the public one.
<ul>
<li><b>I. Foundation Age.</b> Titans, Gods and Fae Lords shape the world. Prime Gods born of the planet give life to its beasts. Titans give life to dragons, phoenixes, giants, dwarves. The Fae Realm introduces the Fae races. All lived in harmony. Then the first Elu-Dragar, the Great Serpent Wars, the Cataclysm of the Father of Monsters, and the first humans. Ended by Hyperion giving life to humanity and declaring the Law of Divine Distance.</li>
<li><b>II. Age of Mortal Rebellion.</b> The First Human Murder. Exile from the Fae Garden. Adamas against Lucifial's Avatar. The First Kingdom of Humanity. The rise of the Gods' Blood. Lazarud defeated. Adamas dies. The Knights Citadel of the East. The Tournament of Dominion. The War of Demons. The death of Queen Tiamel. Arthurian's betrayal. The Grey Knights and the Great Southern Wall founded.</li>
<li><b>III. Age of Lords.</b> The White Dragon Sages' prophecy. Arthur and Morgana born. Telluce, Alonus and Acropolis founded. The Northern Wall of the Fae built. Alice the Black Witch born. The War of Humans and Elves. The elimination campaign against the Icetears. Seneal meets the ancient white dragon. The Red Rangers founded. The Bombing of Ashwinter. The Northern Wall falls. Seneal's revenge and her ascension as Witch Queen of the North. Ended by the Descent of the Thirteen.</li>
<li><b>IV. Age of Darkness I.</b> Birth of Anna, Landervale, Amelia. Telluce falls. The City of Light founded. The first fall of the Grey Knights. Seneal resurrected. The human empire falls. Morgana retreats south. <b>The death of the Western Continent.</b> The Fae retreat. The Exodus to the East. The last stand in the City of Light. Divine intervention. The first Angel is slain and the tide turns.</li>
<li><b>V&ndash;IX.</b> Age of Light, Age of Freedom, Age of Fractured Ideals, Age of Darkness II, the Great Ice Age. <span class="open">Open</span></li>
</ul>"""),

    ("Orders, peoples and bloodlines", """<ul>
<li><b>The Grey Knights.</b> Race-neutral, founded to protect civilisation from demons, monsters and the Black Sea. They hold the Great Grey Wall and its thirteen citadels. Isdowrath, the southernmost, is being eaten from outside and within at once: dwindling numbers, patrols vanishing, criminals recruited to fill the ranks, Gore-Crawlers in the dark, internal corruption, and the Sisterhood of Light arriving covertly.</li>
<li><b>The Seven Knights of Determination.</b> Formed by King Arthur Penfyre after Uther's death and Morgana's betrayal. Arthur as Alpha, Lancel Goldheir Beta, Gwain Gondal Delta, Galahad Silverwise Omega, Percival Copperog Gamma, Landervale Hemarc Sigma, Salomei Zeta. Behind the order is the ancient white dragon Nilrealm, working through Merlin to undo Uther's anti-magic legacy.</li>
<li><b>The Saint Knights and the City of Light.</b> Shallon leads refugees during the first Black Sea invasion and becomes the Arch Saint. Alexandria, Helen and Amelia become Saint Knights bound to sapphire, emerald and ruby relics. Nalhsal becomes Death's Assassin and carries the six-armed Divinicus transformation.</li>
<li><b>The Red Rangers.</b> Elite all-female elven assassins of the Verdant Gate, camped at the Crimson Veil in Hollanheart Forest. Captain Hannah Icetear commands, Anthurian Icetear is her vice-captain. The human squire Lash is placed with them under the peace treaty. There are also Blue Rangers and Emerald Rangers.</li>
<li><b>House Icetear.</b> An ancient line known for cryomancy, precision and discipline, symbolised by a silver tear on red. Nearly destroyed in the elimination campaign and at Ashwinter. On record: Hannah, Anthurian, Seneal, Kairal, Caira, and in the northern plot Azikeal and Erzakial.</li>
<li><b>The Hemarc family.</b> Landervale, who joins the Grey Knights at Dragon's Den beneath Heaven's Throat and serves eight years as a squire. Nadring, the ambitious younger brother. Dheivan, the eldest, spoiled and dependent.</li>
<li><b>The White Kingdom plot.</b> Nilrealm wakes in the frozen North, sends visions to a company, preserves them in marble, and waits for the golden-haired child Arthur White of Elderfen.</li>
<li><b>Hansall</b>, the First Elf King.</li>
</ul>"""),

    ("Conflicts to settle", """<ol>
<li><b>Age of Lords or Age of Kingdoms.</b> Your structure document against the live website. The site is public and one of them is wrong.</li>
<li><b>Anthurian, alive or dead.</b> One document has her alive as vice-captain of the Red Rangers. Another has her disappearing on a mission at twenty-two, presumed dead. There is also a document titled <i>Red Rangers Hunt For Anthuriuns Killers</i>, another titled <i>Anthurian the First Dark Lord</i>, an <i>Arthurian Bloodwing</i>, and an "Arthurian betrayal" in the Second Age. These may be one person, two, or four.</li>
<li><b>Osiris's and Delphyne's territories</b>, and what all three departing children chose. Two fifths of the divine map is blank.</li>
<li><b>Is House Icetear elven or half-elven.</b> One document calls it an ancient elven bloodline. Another gives Seneal a human noble father and an elven mother in a human kingdom.</li>
<li><b>Where Bahamut's prison is.</b> He defended the East. Tiamatra guards him and she is in the West. So he was carried, and who carried him is one of the great untold scenes.</li>
<li><b>Tiamel's parentage.</b> The older manuscript names Osiris and Galatrel. The newer line places her in Tiamatra's Western descent.</li>
<li><b>Who shaped the Beast Lords.</b> The site says they were shaped to cull corruption and never asked whether they wished to be. The newer lore calls them sovereign equals. Somebody made them and the lore does not say who.</li>
<li><b>The Elder Gods and the Demi Gods.</b> Two empty tiers in a cosmology that is otherwise full.</li>
<li><b>The Fantasy World Stories folder is a different setting.</b> Gothica, Victorlash Von Hyoscine, Marie Belmont, the Knight Sisterhood of the Moon, Red Minotaurs, a revival-penalty game system. It shares a few names but ranks Nyx as a Prime God where your cosmology has her a World Titan. Nothing from it is used here. Confirm whether it is a separate project.</li>
</ol>
<p><b>Still unread:</b> roughly fifty documents, including the big age manuscripts (Foundation Age at 227 MB, Age of Mortal Rebellion, Late 2nd Age, The Grey Citadel: Fall of Isdowrath, The Squire, The Battle Against Nara), the timeline spreadsheets, and around thirty character files.</p>"""),
]

lore_html = "\n".join(
    f'<section class="lore" id="lore-{i}"><h2>{html.escape(t)}</h2>{b}</section>'
    for i, (t, b) in enumerate(LORE)
)

page = f"""<title>Archavalon World Bible</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cormorant+SC:wght@400&display=swap" rel="stylesheet">
<style>
  /* Layout: a reading column for the lore, then a dense plate gallery.
     Single dark look on purpose, matching bloodoficetear.com. */
  :root {{
    color-scheme: dark;
    --ground:  #0b0a0c;
    --raised:  #141318;
    --line:    #2a2730;
    --ink:     #cfc8bd;
    --bright:  #f2ece2;
    --dim:     #8b8378;
    --ember:   #b4453f;
    --frost:   #7fb3d5;
    --display: 'Cinzel', Georgia, serif;
    --body:    'EB Garamond', Georgia, serif;
    --label:   'Cormorant SC', Georgia, serif;
  }}
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; background: var(--ground); color: var(--ink);
         font-family: var(--body); font-size: 17px; line-height: 1.7; }}
  .wrap {{ max-width: 62rem; margin: 0 auto; padding-inline: 20px; padding-block: 0; }}

  header.top {{ border-bottom: 1px solid var(--line); background: var(--ground); }}
  .masthead {{ padding-block: 3.2rem 2rem; }}
  .eyebrow {{ font-family: var(--label); font-size: .7rem; letter-spacing: .34em;
              text-transform: uppercase; color: var(--ember); display: block; }}
  h1 {{ font-family: var(--display); font-weight: 600; font-size: clamp(1.9rem,6vw,3rem);
        margin: .5rem 0 .6rem; color: var(--bright); text-wrap: balance; letter-spacing: .01em; }}
  .sub {{ color: var(--dim); max-width: 44rem; margin: 0; }}

  nav.jump {{ display: flex; flex-wrap: wrap; gap: .4rem; padding-block: 1.4rem 1.8rem; }}
  nav.jump a {{ font-family: var(--label); font-size: .64rem; letter-spacing: .18em;
                text-transform: uppercase; color: var(--ink); text-decoration: none;
                border: 1px solid var(--line); border-radius: 999px; padding: .45rem .9rem; }}
  nav.jump a:hover, nav.jump a:focus-visible {{ color: var(--bright); border-color: var(--ember); outline: none; }}

  section.lore {{ padding-block: 2.4rem; border-top: 1px solid var(--line); max-width: 44rem; }}
  section.lore:first-of-type {{ border-top: 0; }}
  h2 {{ font-family: var(--display); font-weight: 500; font-size: 1.35rem; color: var(--bright);
        margin: 0 0 1rem; text-wrap: balance; }}
  .lore p {{ margin: 0 0 1rem; }}
  .lore ul, .lore ol {{ margin: 0 0 1rem; padding-left: 1.2rem; display: grid; gap: .5rem; }}
  .lore b {{ color: var(--bright); font-weight: 500; }}
  .pull {{ font-family: var(--display); font-size: 1.1rem; line-height: 1.5;
           color: var(--bright); border-left: 2px solid var(--ember);
           padding: .3rem 0 .3rem 1rem; margin: 1.4rem 0; }}
  .open {{ font-family: var(--label); font-size: .6rem; letter-spacing: .16em;
           text-transform: uppercase; color: var(--ember); border: 1px solid var(--line);
           border-radius: 999px; padding: .12rem .5rem; white-space: nowrap; }}
  .lore table {{ width: 100%; border-collapse: collapse; margin: 0 0 1rem; font-size: .92rem; }}
  .lore th, .lore td {{ text-align: left; padding: .5rem .6rem; border-bottom: 1px solid var(--line); vertical-align: top; }}
  .lore th {{ font-family: var(--label); font-size: .62rem; letter-spacing: .16em;
              text-transform: uppercase; color: var(--dim); font-weight: 400; }}
  .tablewrap {{ overflow-x: auto; }}

  /* ── the gallery ── */
  .gallery-head {{ border-top: 1px solid var(--line); padding-block: 2.4rem 1rem; }}
  .controls {{ position: sticky; top: env(safe-area-inset-top, 0px); z-index: 20;
               background: var(--ground); border-bottom: 1px solid var(--line);
               padding-block: .8rem; display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }}
  .controls input[type=search] {{ flex: 1; min-width: 11rem; background: var(--raised);
      border: 1px solid var(--line); color: var(--ink); border-radius: 8px;
      padding: .55rem .8rem; font-family: var(--body); font-size: .95rem; }}
  .seg {{ display: flex; gap: .3rem; }}
  .seg button {{ font-family: var(--label); font-size: .62rem; letter-spacing: .16em;
                 text-transform: uppercase; background: var(--raised); color: var(--dim);
                 border: 1px solid var(--line); border-radius: 999px; padding: .5rem .85rem;
                 cursor: pointer; }}
  .seg button[aria-pressed="true"] {{ color: var(--bright); border-color: var(--ember); }}
  .count {{ font-family: var(--label); font-size: .62rem; letter-spacing: .16em;
            text-transform: uppercase; color: var(--dim); }}

  .area {{ padding-block: 1.6rem .4rem; }}
  .area h3 {{ font-family: var(--label); font-size: .68rem; letter-spacing: .28em;
              text-transform: uppercase; color: var(--dim); font-weight: 400; margin: 0 0 .8rem;
              display: flex; align-items: baseline; gap: .6rem; }}
  .area h3 i {{ font-style: normal; color: var(--ember); font-size: .6rem; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: .8rem; }}
  figure.plate {{ margin: 0; min-width: 0; }}
  figure.plate button.shot {{ display: block; width: 100%; padding: 0; border: 1px solid var(--line);
      background: var(--raised); border-radius: 6px; overflow: hidden; cursor: zoom-in; }}
  figure.plate img {{ display: block; width: 100%; height: 170px; object-fit: cover; }}
  figure.plate figcaption {{ font-size: .82rem; line-height: 1.35; padding-top: .4rem; color: var(--ink);
      word-break: break-word; }}
  figure.plate.is-unnamed button.shot {{ border-color: color-mix(in srgb, var(--ember) 55%, transparent); }}
  .namebtn {{ font-family: var(--label); font-size: .58rem; letter-spacing: .16em;
      text-transform: uppercase; color: var(--ember); background: none; border: 0;
      padding: .2rem 0; cursor: pointer; }}
  .named-note {{ color: var(--frost); font-size: .72rem; font-family: var(--label);
      letter-spacing: .12em; text-transform: uppercase; }}

  dialog.lightbox {{ border: 0; padding: 0; background: transparent; max-width: 94vw; max-height: 94vh; }}
  dialog.lightbox::backdrop {{ background: rgba(0,0,0,.88); }}
  .lb-inner {{ background: var(--raised); border: 1px solid var(--line); border-radius: 8px;
               overflow: hidden; max-width: 94vw; }}
  .lb-inner img {{ display: block; max-width: 94vw; max-height: 72vh; object-fit: contain; }}
  .lb-bar {{ padding: .9rem 1rem; display: flex; flex-wrap: wrap; gap: .6rem; align-items: center;
             border-top: 1px solid var(--line); }}
  .lb-bar .nm {{ flex: 1; min-width: 10rem; color: var(--bright); font-family: var(--display); }}
  .lb-bar input {{ flex: 1; min-width: 12rem; background: var(--ground); border: 1px solid var(--line);
      color: var(--ink); border-radius: 8px; padding: .5rem .7rem; font-family: var(--body); }}
  .btn {{ font-family: var(--label); font-size: .62rem; letter-spacing: .18em; text-transform: uppercase;
         background: var(--raised); color: var(--ink); border: 1px solid var(--line);
         border-radius: 999px; padding: .5rem .95rem; cursor: pointer; }}
  .btn.primary {{ border-color: var(--ember); color: var(--bright); }}
  footer {{ border-top: 1px solid var(--line); padding-block: 2rem 3rem; color: var(--dim); font-size: .88rem; }}
  @media (prefers-reduced-motion: reduce) {{ * {{ animation: none !important; transition: none !important; }} }}
</style>

<header class="top">
  <div class="wrap masthead">
    <span class="eyebrow">World Bible</span>
    <h1>Archavalon</h1>
    <p class="sub">Archavalon: the cosmology, Lorevolution, the five children of Ra, the six continents, the nine ages, and every reference plate on record. Read out of the Drive archive, the Fantasy World Vision folders, the live codex and the sagas.</p>
    <nav class="jump">
      <a href="#lore-0">Before the world</a><a href="#lore-1">Inheritances</a><a href="#lore-2">Lorevolution</a>
      <a href="#lore-3">Children of Ra</a><a href="#lore-4">The Black Sea</a><a href="#lore-5">Continents</a>
      <a href="#lore-6">The Ages</a><a href="#lore-7">Orders</a><a href="#lore-8">Conflicts</a>
      <a href="#plates">The plates</a>
    </nav>
  </div>
</header>

<main class="wrap">
  {lore_html}

  <div class="gallery-head" id="plates">
    <h2>The plates</h2>
    <p class="sub">{len(entries)} reference images from the archive. <b id="unCount">{n_un}</b> have never been named, and show a coloured edge. Give one a name and it is saved here.</p>
  </div>

  <div class="controls">
    <input type="search" id="q" placeholder="Search names and categories" aria-label="Search plates">
    <div class="seg" role="group" aria-label="Filter">
      <button id="fAll"  aria-pressed="true">All</button>
      <button id="fUn"   aria-pressed="false">Unnamed</button>
      <button id="fNamed" aria-pressed="false">Named</button>
    </div>
    <span class="count" id="shown"></span>
  </div>

  <div id="areas"></div>
</main>

<footer class="wrap">
  Source of truth is <code>docs/world-bible.md</code> in the personal-website repository.
  Names typed here are stored with this page and can be read back to rename the original files.
</footer>

<dialog class="lightbox" id="lb">
  <div class="lb-inner">
    <img id="lbImg" alt="">
    <div class="lb-bar">
      <span class="nm" id="lbName"></span>
      <input id="lbInput" placeholder="Name this plate" aria-label="Name this plate" hidden>
      <button class="btn primary" id="lbSave" hidden>Save name</button>
      <button class="btn" id="lbRename">Rename</button>
      <button class="btn" id="lbClose">Close</button>
    </div>
  </div>
</dialog>

<script>
const PLATES = {data};
const AREAS = {json.dumps([a["name"] for a in areas])};
let overrides = {{}};          // id -> name, from the store
let filter = "all", query = "";
let db = null;

const esc = s => String(s).replace(/[&<>"]/g, c => ({{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}})[c]);
const nameOf = p => overrides[p.i] || p.n;
const isUnnamed = p => !overrides[p.i] && p.u;

function visible(p) {{
  if (filter === "unnamed" && !isUnnamed(p)) return false;
  if (filter === "named" && isUnnamed(p)) return false;
  if (!query) return true;
  return (nameOf(p) + " " + p.a).toLowerCase().includes(query);
}}

function render() {{
  const host = document.getElementById("areas");
  let shown = 0, out = "";
  for (const area of AREAS) {{
    const items = PLATES.filter(p => p.a === area && visible(p));
    if (!items.length) continue;
    shown += items.length;
    const un = items.filter(isUnnamed).length;
    out += '<section class="area"><h3>' + esc(area) +
           (un ? ' <i>' + un + ' unnamed</i>' : '') + '</h3><div class="grid">';
    for (const p of items) {{
      out += '<figure class="plate' + (isUnnamed(p) ? ' is-unnamed' : '') + '" data-id="' + esc(p.i) + '">' +
             '<button class="shot" data-id="' + esc(p.i) + '">' +
             '<img loading="lazy" decoding="async" src="' + esc(p.f) + '" alt="' + esc(nameOf(p)) + '"></button>' +
             '<figcaption>' + (isUnnamed(p)
                ? '<button class="namebtn" data-name="' + esc(p.i) + '">Name this plate</button>'
                : esc(nameOf(p))) + '</figcaption></figure>';
    }}
    out += "</div></section>";
  }}
  host.innerHTML = out || '<section class="area"><h3>Nothing matches</h3></section>';
  document.getElementById("shown").textContent = shown + " of " + PLATES.length;
  document.getElementById("unCount").textContent = PLATES.filter(isUnnamed).length;
}}

// ── lightbox ──
const lb = document.getElementById("lb"), lbImg = document.getElementById("lbImg"),
      lbName = document.getElementById("lbName"), lbInput = document.getElementById("lbInput"),
      lbSave = document.getElementById("lbSave"), lbRename = document.getElementById("lbRename");
let current = null;

function openPlate(id, startNaming) {{
  current = PLATES.find(p => p.i === id);
  if (!current) return;
  lbImg.src = current.f;
  lbImg.alt = nameOf(current);
  lbName.textContent = isUnnamed(current) ? "Unnamed plate" : nameOf(current);
  setNaming(Boolean(startNaming) || isUnnamed(current));
  if (!lb.open) lb.showModal();
}}
function setNaming(on) {{
  lbInput.hidden = !on; lbSave.hidden = !on; lbRename.hidden = on;
  if (on) {{ lbInput.value = isUnnamed(current) ? "" : nameOf(current); lbInput.focus(); }}
}}
document.addEventListener("click", e => {{
  const shot = e.target.closest("button.shot");
  if (shot) return openPlate(shot.dataset.id, false);
  const nm = e.target.closest("button.namebtn");
  if (nm) return openPlate(nm.dataset.name, true);
}});
document.getElementById("lbClose").addEventListener("click", () => lb.close());
lbRename.addEventListener("click", () => setNaming(true));
lb.addEventListener("click", e => {{ if (e.target === lb) lb.close(); }});

async function saveName() {{
  if (!current) return;
  const v = lbInput.value.trim();
  if (!v) return;
  overrides[current.i] = v;
  render();
  lbName.textContent = v;
  setNaming(false);
  if (!db) return;
  try {{ await db.doc("names/" + current.i).set({{ name: v, file: current.f, area: current.a, at: Date.now() }}); }}
  catch (err) {{ lbName.textContent = v + "  (not saved)"; }}
}}
lbSave.addEventListener("click", saveName);
lbInput.addEventListener("keydown", e => {{ if (e.key === "Enter") {{ e.preventDefault(); saveName(); }} }});

// ── filters ──
const setFilter = f => {{
  filter = f;
  for (const [id, key] of [["fAll","all"],["fUn","unnamed"],["fNamed","named"]])
    document.getElementById(id).setAttribute("aria-pressed", String(key === f));
  render();
}};
document.getElementById("fAll").addEventListener("click", () => setFilter("all"));
document.getElementById("fUn").addEventListener("click", () => setFilter("unnamed"));
document.getElementById("fNamed").addEventListener("click", () => setFilter("named"));
document.getElementById("q").addEventListener("input", e => {{ query = e.target.value.trim().toLowerCase(); render(); }});

render();

// ── the store, if this viewer can reach it ──
(async () => {{
  try {{
    db = await window.claude?.use?.("db");
    if (!db) return;
    db.collection("names").onSnapshot(docs => {{
      const next = {{}};
      for (const d of docs) if (d && d.id && d.data && d.data.name) next[d.id] = d.data.name;
      overrides = next;
      render();
    }});
  }} catch (err) {{ /* no store in this view: the page still reads */ }}
}})();
</script>
"""

(OUT / "index.html").write_text(page, encoding="utf-8")
print(f"page written: {len(page)/1024:.0f} KB, {len(entries)} plates, {n_un} unnamed")
