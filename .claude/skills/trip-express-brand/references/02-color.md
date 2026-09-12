# 02 - Colour System

Every value here was sampled from `../assets/logo-primary.jpg` or generated from
those samples by a fixed tint/shade formula. Contrast ratios are computed, not
estimated.

---

## 1. Sampled truth (raw pixels from the logo)

| Sample point | Hex | Share of mark | Name |
|---|---|---|---|
| Sun disc / mountains | `#ED7C30` | 14.7% | **Sunset Orange** |
| Mountain highlight | `#F2A15F` | 1.1% | **Sand Orange** |
| Sea disc | `#4394D5` | 10.3% | **Sky Blue** |
| Aircraft underwing | `#3171AE` | 3.3% | **Deep Ocean** |
| Sea shadow wave | `#397AB4` | - | Sea Shadow |
| Negative space | `#FFFFFF` | 54.9% | **Horizon White** |

**Read the share column.** White is more than half the mark. The brand is
*mostly white space* with confident colour blocks. Do not build dense, saturated
pages - the logo does not.

Working ratio for any page: **60% white/near-white · 25% orange family ·
12% blue family · 3% ink & accents.**

---

## 2. Ramps

### Orange - primary
| Token | Hex | On white | On `#111823` |
|---|---|---|---|
| `orange-50`  | `#FEF8F5` | 1.05 | 17.53 |
| `orange-100` | `#FDEFE6` | 1.13 | 16.39 |
| `orange-200` | `#FADDC9` | 1.29 | 14.27 |
| `orange-300` | `#F7C5A4` | 1.56 | 11.83 |
| `orange-400` | `#F2A16A` | 2.08 | 8.85 |
| **`orange-500`** | **`#ED7C30`** | **2.79** | **6.61** |
| `orange-600` | `#C96A2B` | 3.76 | 4.90 |
| `orange-700` | `#A45826` | **5.25 ✓AA** | 3.51 |
| `orange-800` | `#804621` | 7.46 | 2.47 |
| `orange-900` | `#60371C` | 10.19 | 1.81 |
| `orange-950` | `#402718` | 13.80 | 1.34 |

### Sky Blue - secondary
| Token | Hex | On white | On `#111823` |
|---|---|---|---|
| `blue-50`  | `#F6FAFD` | 1.05 | 17.57 |
| `blue-100` | `#E8F2FA` | 1.13 | 16.26 |
| `blue-200` | `#CEE3F4` | 1.32 | 13.98 |
| `blue-300` | `#ACD0ED` | 1.62 | 11.41 |
| `blue-400` | `#78B2E1` | 2.27 | 8.13 |
| **`blue-500`** | **`#4394D5`** | 3.26 | 5.65 |
| `blue-600` | `#3A7EB5` | 4.35 | 4.24 |
| `blue-700` | `#316896` | **5.91 ✓AA** | 3.12 |
| `blue-800` | `#285376` | 8.11 | 2.27 |
| `blue-900` | `#20405B` | 10.79 | 1.71 |
| `blue-950` | `#182D3F` | 14.13 | 1.30 |

### Deep Ocean - anchor
| Token | Hex | On white |
|---|---|---|
| `deep-50`  | `#F5F8FB` | 1.07 |
| `deep-100` | `#E6EEF5` | 1.17 |
| `deep-200` | `#C9DAEA` | 1.43 |
| `deep-300` | `#A4C1DB` | 1.87 |
| `deep-400` | `#6B99C5` | 3.01 |
| **`deep-500`** | **`#3171AE`** | **5.12 ✓AA** |
| `deep-600` | `#2B6195` | 6.47 |
| `deep-700` | `#25517B` | 8.26 |
| `deep-800` | `#1E4162` | 10.57 |
| `deep-900` | `#19324C` | 13.11 |
| **`deep-950`** | **`#132436`** | **15.75** |

### Neutral - blue-tinted slate (never pure grey, never pure black)
| Token | Hex | On white |
|---|---|---|
| `n-0`   | `#FFFFFF` | 1.00 |
| `n-50`  | `#F7F9FB` | 1.06 |
| `n-100` | `#EFF3F7` | 1.12 |
| `n-200` | `#DFE5EC` | 1.27 |
| `n-300` | `#C6CFDA` | 1.57 |
| `n-400` | `#9AA6B6` | 2.47 |
| `n-500` | `#6F7D90` | 4.19 |
| `n-600` | `#556274` | **6.20 ✓AA** |
| `n-700` | `#3F4A5A` | 8.98 |
| `n-800` | `#2B3442` | 12.56 |
| `n-900` | `#1B2330` | 15.79 |
| `n-950` | `#111823` | 17.82 |

---

## 3. Semantic colours

| Role | Base | Text-safe on white | Surface | Border |
|---|---|---|---|---|
| Success / confirmed | `#1E9E6A` | `#15784F` (5.48 ✓) | `#E7F7F0` | `#A7E3CB` |
| Warning / limited seats | `#E0A000` | `#8A6100` | `#FFF6E0` | `#F5DB9B` |
| Error / sold out | `#D64545` | `#B02E2E` (6.41 ✓) | `#FDECEC` | `#F3B9B9` |
| Info / visa notice | `#3171AE` | `#25517B` | `#E6EEF5` | `#A4C1DB` |

Semantic colours are for **status only**. They never become decoration.
"Seats filling fast" uses Warning; "Booking open" uses Success; "Departed" uses
Neutral; "Sold out" uses Error.

---

## 4. Role mapping (light theme)

```
Page background        n-0        #FFFFFF
Subtle section bg      n-50       #F7F9FB
Warm section bg        orange-50  #FEF8F5
Cool section bg        blue-50    #F6FAFD
Card surface           n-0        #FFFFFF
Card border            n-200      #DFE5EC
Hairline / divider     n-200      #DFE5EC
Body text              n-700      #3F4A5A
Heading text           n-900      #1B2330
Muted / meta text      n-600      #556274   (n-500 only at >=24px)
Link                   deep-600   #2B6195
Link hover             orange-700 #A45826
Primary action bg      orange-500 #ED7C30
Primary action ink     n-950      #111823
Secondary action bg    deep-700   #25517B
Secondary action ink   n-0        #FFFFFF
Focus ring             deep-500   #3171AE
Dark section bg        deep-950   #132436
Footer bg              deep-950   #132436
```

## 5. Role mapping (dark theme)

Dark mode is **Night Ocean**, not neutral black. It reads as the sea half of the logo.

```
Page background        deep-950   #132436
Elevated surface       deep-900   #19324C
Card surface           #17293C  (deep-950 lifted 4%)
Card border            #24405C
Body text              n-300      #C6CFDA   (10.0 ✓ on deep-950)
Heading text           n-0        #FFFFFF   (15.75 ✓)
Muted text             #8FA3B8
Link                   blue-300   #ACD0ED   (9.75 ✓)
Primary action bg      orange-500 #ED7C30
Primary action ink     n-950      #111823   (5.66 ✓ - unchanged)
Secondary action       transparent + 1px blue-300 border, blue-300 ink
Accent text            orange-400 #F2A16A   (7.56 ✓)
```

**Never** use `orange-700`/`blue-700` as text in dark mode - they fall below 3:1.

---

## 6. Gradients

Only these four. Anything else is off-brand.

```css
/* Sunset - hero warm blocks, primary button hover */
--te-grad-sunset: linear-gradient(17deg, #F2A16A 0%, #ED7C30 100%);

/* Ocean - cool panels, secondary surfaces */
--te-grad-ocean: linear-gradient(17deg, #4394D5 0%, #3171AE 100%);

/* Horizon - the signature. Orange to blue, through the logo's own white seam.
   The white stop is mandatory: it prevents the muddy brown midpoint. */
--te-grad-horizon: linear-gradient(
  17deg,
  #ED7C30 0%,
  #F2A16A 34%,
  #FFFFFF 50%,
  #4394D5 66%,
  #3171AE 100%
);

/* Night - dark section depth */
--te-grad-night: linear-gradient(17deg, #19324C 0%, #132436 100%);
```

**Image scrim** (for text over photography):
```css
--te-scrim: linear-gradient(
  to top,
  rgba(19,36,54,0.88) 0%,
  rgba(19,36,54,0.55) 38%,
  rgba(19,36,54,0.00) 100%
);
```

## 7. Tinted shadows

Shadows carry Deep Ocean, never neutral black.

```css
--te-shadow-xs: 0 1px 2px   rgba(19,36,54,0.06);
--te-shadow-sm: 0 2px 6px   rgba(19,36,54,0.08);
--te-shadow-md: 0 8px 20px  rgba(19,36,54,0.10);
--te-shadow-lg: 0 16px 40px rgba(19,36,54,0.14);
--te-shadow-xl: 0 28px 64px rgba(19,36,54,0.18);
/* Warm glow - primary CTA hover only */
--te-shadow-warm: 0 10px 28px rgba(237,124,48,0.32);
```

## 8. Colour do / don't

**Do**
- Let white dominate; use orange as the accent that earns attention.
- Pair orange with dark ink, blue with white.
- Use the blue family for anything informational, structural or calm.
- Use `orange-50` / `blue-50` for alternating section bands.

**Don't**
- White text on `orange-500`.
- Orange and blue at equal area in the same block - the logo is 60/40, not 50/50.
- Introduce a third hue (green, purple, teal) outside the semantic set.
- Use `#000000`, pure grey, or an untinted shadow.
- Apply the Horizon Gradient to text.

---

## Ramp steps are allowed in 3D. Seventh hues are not.

The "six hues plus white" rule holds, but a scene needs more than six *values*.
Aerial perspective requires distant ridges to wash out toward the sky and near
ridges to fall to silhouette; a sunrise requires four sky stops that move over the
scroll. Those are **tints and shades of the six hues**, and they are enumerated as
`RAMP` in `assets/three.brand.js`:

```
sand300 F7C5A4   orange600 C96A2B   orange700 A45826   orange800 804621
blue300 ACD0ED   blue400 78B2E1     blue900 20405B     blue950 182D3F
deep400 6B99C5   deep600 2B6195     deep700 25517B     deep800 1E4162
deep900 19324C   night900 101E2E
```

Every value there is a documented step on a ramp in this file. Nothing may enter a
scene that is not in `HEX` or `RAMP`.

**Fog colour is haze, not sunlight.** The fog must match what is behind the
terrain, but assigning it the *sun's* colour at full strength turned an entire
landscape into one orange mass during the build. Mix the horizon stop toward the
sky's mid stop by about 0.4 before it becomes fog.

---

## Theme parity, restated as a test

The bug this rule exists to prevent, observed on the first build: **white headings
on a cream background**, because `--te-bg-warm` was overridden in the
`[data-theme="dark"]` block but not in the `prefers-color-scheme: dark` block.
Every role token must appear in **both**.

A quick check that catches it, run in the console of any page:

```js
const a = [...document.styleSheets].flatMap(s => { try { return [...s.cssRules] } catch { return [] } })
const grab = sel => a.filter(r => r.selectorText === sel)
                     .flatMap(r => [...r.style]).filter(p => p.startsWith('--te-'))
const dark = new Set(grab('[data-theme="dark"]'))
const auto = new Set(grab(':root:not([data-theme="light"])'))
console.log('only in one block:', [...dark].filter(x => !auto.has(x)).concat([...auto].filter(x => !dark.has(x))))
```

It must print an empty array.
