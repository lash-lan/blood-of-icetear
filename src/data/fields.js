// Where the War Table is set up.
//
// Five real places out of the world, drawn rather than photographed: each one
// is a sky, two silhouettes on the horizon, a ground colour, and whatever is
// falling through the air. Nothing here is an image file, so a field costs
// nothing to load and can be recoloured in a line.
//
// `far` and `near` are SVG paths over a 1000 x 300 box, where y=300 is the
// horizon line. `fog` is what the mist over unseen ground is made of, which
// is why the mist is white at Isdowrath and green in the Wilds.

export const FIELDS = [
  {
    id: 'hollanheart',
    name: 'Hollanheart Forest',
    where: 'The Crimson Veil',
    blurb: 'Enchanted summer woodland, veiled by old magic. The Red Rangers keep a fortress in it that no map carries.',
    sky: ['#0d1a14', '#13281c', '#0a120d'],
    light: '#8fd6a0',
    ground: '#16251b',
    fog: 'rgba(120,180,140,.10)',
    fall: 'motes',
    far: 'M0,300 L0,196 L34,176 L58,200 L92,150 L126,198 L156,168 L188,206 L214,160 L248,200 L282,172 L316,210 L344,164 L380,202 L412,178 L448,214 L478,168 L512,204 L546,176 L580,212 L612,166 L648,200 L680,180 L716,210 L748,170 L784,206 L816,182 L852,214 L884,172 L918,202 L952,184 L1000,206 L1000,300 Z',
    near: 'M0,300 L0,250 L28,226 L52,254 L84,214 L118,252 L144,232 L178,262 L206,222 L240,256 L272,236 L306,264 L336,220 L372,258 L404,238 L440,266 L470,226 L504,260 L538,240 L572,268 L604,228 L640,258 L672,242 L708,266 L740,230 L776,260 L808,244 L844,268 L876,232 L910,260 L944,244 L1000,262 L1000,300 Z',
  },
  {
    id: 'isdowrath',
    name: 'Isdowrath',
    where: 'The southernmost Grey Citadel',
    blurb: 'The last fortress before the Darklands, where the grey cloud never lifts and the south is still dark at noon.',
    sky: ['#2a3139', '#19202a', '#0b1016'],
    light: '#cfdae4',
    ground: '#2b333c',
    fog: 'rgba(200,215,230,.13)',
    fall: 'snow',
    far: 'M0,300 L0,210 L80,138 L150,196 L226,120 L300,188 L372,146 L440,206 L512,128 L590,190 L660,152 L730,204 L806,134 L880,192 L944,160 L1000,198 L1000,300 Z',
    near: 'M0,300 L0,268 L60,266 L60,214 L96,214 L96,250 L150,250 L150,206 L196,206 L196,248 L250,248 L250,224 L300,224 L300,258 L1000,258 L1000,300 Z',
  },
  {
    id: 'darkforest',
    name: 'The Great Dark Forest',
    where: 'The Continent of Darkness',
    blurb: 'The heart of the Dark Continent, with the Soul Gate at its deepest point. Never follow a voice that calls your name here.',
    sky: ['#1b1226', '#120c1c', '#07050b'],
    light: '#b08ae0',
    ground: '#171226',
    fog: 'rgba(150,120,200,.12)',
    fall: 'embers',
    far: 'M0,300 L0,172 L30,96 L52,174 L80,88 L104,178 L136,74 L160,180 L192,100 L214,176 L248,82 L272,182 L306,96 L330,178 L364,70 L388,180 L422,102 L446,174 L480,86 L506,182 L540,94 L564,178 L598,78 L624,180 L658,98 L682,176 L716,84 L742,182 L776,92 L800,178 L836,76 L860,180 L896,100 L920,174 L956,88 L982,180 L1000,150 L1000,300 Z',
    near: 'M0,300 L0,238 L24,150 L44,242 L72,142 L94,246 L126,130 L148,248 L182,156 L204,244 L240,138 L262,250 L296,148 L318,242 L354,126 L376,248 L412,158 L434,240 L470,140 L494,250 L530,150 L552,244 L588,132 L612,248 L648,154 L670,242 L706,138 L730,250 L766,146 L790,244 L826,130 L850,248 L886,156 L910,240 L948,142 L974,248 L1000,206 L1000,300 Z',
  },
  {
    id: 'verdant',
    name: 'The Verdant Wilds',
    where: 'The untouched natural world',
    blurb: 'Dense jungle, enormous ferns, heavy wet air. Proof that nature endured whatever else did not.',
    sky: ['#13301f', '#0e2417', '#07140d'],
    light: '#9ae07a',
    ground: '#13291a',
    fog: 'rgba(130,200,120,.12)',
    fall: 'motes',
    far: 'M0,300 L0,164 C60,96 110,210 170,150 C230,90 280,206 340,142 C400,86 452,208 512,146 C572,92 622,204 684,144 C744,90 796,206 856,150 C916,96 962,196 1000,158 L1000,300 Z',
    near: 'M0,300 L0,236 C54,176 102,268 156,216 C210,166 258,274 314,222 C370,172 416,270 472,220 C528,170 576,272 632,220 C688,170 734,268 790,218 C846,170 894,266 950,222 C974,204 990,230 1000,224 L1000,300 Z',
  },
  {
    id: 'frost',
    name: 'The Bastion of Frost',
    where: 'The Sacred Order, in the north',
    blurb: 'The northern citadel, watching the endless wasteland where the Thirteen Lich Lords fight their own civil war.',
    sky: ['#0d2030', '#123048', '#071018'],
    light: '#9fd8f0',
    ground: '#1d3242',
    fog: 'rgba(170,215,245,.14)',
    fall: 'snow',
    far: 'M0,300 L0,222 L70,150 L120,204 L186,112 L250,196 L318,138 L384,210 L452,104 L524,192 L590,146 L656,206 L724,118 L796,198 L862,152 L928,208 L1000,164 L1000,300 Z',
    near: 'M0,300 L0,264 L120,254 L190,218 L204,254 L300,246 L356,196 L372,250 L470,258 L540,210 L556,254 L660,248 L724,206 L740,252 L850,256 L920,222 L936,254 L1000,250 L1000,300 Z',
  },
];

export const fieldById = Object.fromEntries(FIELDS.map((f) => [f.id, f]));

// Which ground each banner sets up on when nobody has chosen.
export const HOME_FIELD = {
  rangers: 'hollanheart',
  grey: 'isdowrath',
  dark: 'darkforest',
  beasts: 'verdant',
  order: 'frost',
};
