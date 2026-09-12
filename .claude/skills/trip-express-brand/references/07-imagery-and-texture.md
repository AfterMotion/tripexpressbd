# 07 - Imagery, Texture & Pattern

The portfolio is the product. Trip Express BD sells trust, and trust here is
photographic. Treat imagery as a first-class system, not decoration.

---

## 1. Photography principles

1. **Own photos beat stock, always.** The brand has a deep archive of real tour
   photography from Nepal, Kashmir, Meghalaya, Maldives, Sri Lanka and Kolkata. Use
   it. Stock is a last resort and must be labelled internally so it can be replaced.
2. **People in frame.** A landscape with the group in it outperforms an empty
   landscape. This is a group-tour brand - show the group.
3. **Golden hour first.** The logo is a sunset. Prefer warm low-angle light; it
   colour-matches the palette without any filter.
4. **Water and mountains are the two hero subjects.** They mirror the two halves
   of the mark.
5. **Candid over posed.** Real faces, real reactions. No hands-on-hips hero poses.
6. **Include the transport.** Buses, jeeps, boats, planes - the logo names them.
7. **No heavy filters, no HDR crunch, no vignettes.** Colour grading is limited to
   the correction rules below.

### Grading rules

- White balance: warm side, +100 to +250K, never cool
- Saturation: +5 maximum; never push blues past the logo's `#4394D5`
- Contrast: gentle S-curve, keep shadows open (lifted blacks read as haze, avoid)
- No black-and-white treatments anywhere except a single archival "since" band
- Faces must remain naturally skin-toned - never orange-cast them to match the brand

### Do not use

- Empty beaches with no people
- Airport-window wing shots
- Passport-and-map flat-lays
- Suitcase-on-a-bed compositions
- Any photograph that could belong to any agency

---

## 2. Crops and aspect ratios

| Placement | Ratio | Min resolution |
|---|---|---|
| Hero, full-bleed | `21:9` desktop / `4:5` mobile | 2400×1030 / 1200×1500 |
| Package card | `16:10` | 1200×750 |
| Destination disc | `1:1` | 600×600 |
| Gallery masonry | native, min side 1200 | - |
| Trip-report header | `3:2` | 1800×1200 |
| Testimonial avatar | `1:1` | 200×200 |
| OG / social share | `1.91:1` | 1200×630 |

Always ship `webp` with a `jpg` fallback, plus `srcset` at 1×/2×.
`loading="lazy"` on everything below the fold, `fetchpriority="high"` on the hero.

---

## 3. Portfolio / gallery system

The portfolio is organised as **Trips**, not as loose images.

**Trip archive card**
```
[ cover photo 3:2 ]
overline   COMPLETED · NOV 2025
h3         Explore Nepal
caption    Kathmandu · Nagarkot · Pokhara · 7 travellers
[ 4 thumbnail discs ] +18
```

- Grid: 3 columns desktop, 2 tablet, 1 mobile, 24px gap
- Cover photo radius `--te-r-lg`, `--te-shadow-sm`
- A `COMPLETED` badge sits top-right over the cover
- The thumbnail row uses 32px discs with a `-8px` overlap and a 2px white ring,
  with a `+N` counter disc in `n-100` / `n-600`

**Lightbox**

- Backdrop `rgba(19,36,54,0.92)`
- Image max 92vh, radius `--te-r-md`
- Caption bar below: trip name (`body-sm` 600 white) plus date (`caption` `n-300`)
- Controls: 44px discs, `rgba(255,255,255,0.12)` background, white glyph
- Keyboard: arrows to move, `Esc` to close, focus trapped, focus returned on close
- Counter `3 / 24` top-right in `caption` `n-300`

**Masonry gallery inside a trip**

- CSS columns: 3 desktop / 2 tablet / 1 mobile, `gap: 16px`
- Each item radius `--te-r-md`, hover scale 1.03 with `--te-shadow-md`
- Never crop a group photo to a square in masonry - respect native ratio

---

## 4. Text over photography

Never place text directly on an unmodified photo.

Required treatments, in order of preference:

1. **Scrim gradient** - `--te-scrim` from the bottom, minimum 45% height
2. **Solid panel** - a `#FFFFFF` or `deep-950` card floating over the image,
   `--te-r-lg`, `--te-shadow-lg`
3. **Duotone block** - `deep-950` at 72% opacity across the full image, text on top

Minimum contrast after treatment is 4.5:1 for body, 3:1 for display sizes.
Verify with the real image, not with an average colour.

---

## 5. The texture system

The brand has **four** textures. Nothing else.

### 5.1 Horizon Split - the signature

The logo's own construction, scaled up to a section.

```css
.te-horizon-split {
  background: var(--te-grad-horizon);
}
/* or, as a two-block section: warm block above, cool block below,
   separated by a 17deg cut with a 4px white seam */
```

Use once or twice per page maximum - typically the hero and one mid-page band.
The white seam between the warm and cool halves is mandatory; it is the aircraft.

### 5.2 Flight Streak - repeating pattern

Thin 17° lines, evenly spaced, very low contrast. Use as a background wash behind
stat bands, testimonial sections or empty states.

```css
.te-flight-streak {
  background-image: repeating-linear-gradient(
    107deg,                       /* 90 + 17 */
    rgba(237,124,48,0.07) 0px,
    rgba(237,124,48,0.07) 2px,
    transparent 2px,
    transparent 18px
  );
}
```

Opacity never exceeds `0.10` on light surfaces, `0.14` on `deep-950`.

### 5.3 Contour Ridge - topographic line work

Derived from the logo's mountain silhouette. Thin stroked contour lines in
`orange-200` (light) or `#24405C` (dark), used as an oversized background
illustration behind headings and in empty states.

- Stroke 1.5px, no fill
- Maximum 6 nested contours
- Always bleeds off at least one edge - never a complete closed shape
- Opacity 0.5 on light, 0.6 on dark

### 5.4 Wave Shelf - the water half

Two or three stacked flat wave bands echoing the sea shadows in the mark.

- Colours: `blue-500`, `blue-600`, `deep-500` - flat fills, no gradients
- Each band offset vertically by 12–20px
- Used as the top edge of a blue section, or the base of a page
- Wave crest amplitude never exceeds 10% of the band height - the logo's waves are
  shallow and calm

### Texture rules

- Maximum **two** textures per page.
- Never overlay a texture on photography.
- Never put a texture behind body copy at more than `0.06` opacity.
- Textures are decorative: `aria-hidden="true"`, `pointer-events: none`.

---

## 6. Illustration style

If illustration is needed (empty states, 404, process diagrams):

- **Flat vector, no gradients inside shapes, no outlines.** Match the logo exactly.
- Palette restricted to: `orange-500`, `orange-400`, `blue-500`, `deep-500`,
  `#FFFFFF`. Five colours, no more.
- Shapes are geometric: circles, triangles, hard-angled silhouettes.
- One light source implied from the upper right - the sun sits upper-right in the
  disc.
- Shadows are a flat darker tint of the same hue, never grey, never soft.
- Figures are simplified silhouettes without facial features.
- Reuse the logo's object vocabulary: plane, minibus, kayak, palm, mountain, sun, wave.

---

## 7. Video

- Hero video: muted, loop, `playsinline`, max 8 seconds, under 2MB, poster frame
  required, `prefers-reduced-motion` disables autoplay and shows the poster.
- Never autoplay with sound.
- Trip recap videos sit inside the portfolio, `--te-r-lg`, with a custom play
  button: 64px disc, `orange-500` background, `n-950` triangle.

---

## 8. Maps

- Style: light, desaturated base; roads in `n-200`; water in `blue-100`;
  land in `n-50`
- Route line: 3px `orange-500`, rounded caps, with a subtle dashed continuation for
  flight legs
- Markers: `--te-r-disc` pins, `orange-500` fill with a white glyph
- Never use the default Google Maps colour scheme on a brand page

---

# The social share card (OG image)

1200×630, JPEG, under 200KB. Shipped at `assets/img/og/og-share.jpg` and declared
in `og:image`, `og:image:width/height/alt`, `twitter:image` **and** the
`TravelAgency` JSON-LD `image`. A missing OG image is not a neutral default -
Facebook and WhatsApp will pick an arbitrary photograph from the page, usually
cropped through somebody's face.

## Layout

```
┌──────────────────────────────────────────────┐
│ [mark] Trip Express BD          ╱ contrail   │  logo lockup, 72px in
│                                              │
│  ╱ flight rule                               │
│  CHATTOGRAM · TRAVEL SERVICE                 │  13-19px, Sand Orange
│  Guided group tours                          │  PJS ExtraBold, white
│  across South Asia                           │  PJS ExtraBold, Sand
│  Kashmir · Meghalaya · Nepal · Sikkim        │  Inter Medium, mist
│  (Fixed dates)(Published prices)(Real photos)│  proof pills
└──────────────────────────────────────────────┘   sunset baseline + 17° wedge
```

## Rules

- **A real departure photograph**, cropped so faces sit in the clear right half.
  Brand rule 4 applies here more than anywhere - this is the first thing anyone
  sees of the company.
- Calm the photograph before type goes near it: colour ×0.86, brightness ×0.92.
- The left scrim is **opaque to 34% of the width**, then releases to zero by 78%.
  It has to hold 4.5:1 against the brightest thing the photograph can contain, not
  against the frame you happen to be looking at.
- One contrail at exactly 17°, in clear sky, **not across anyone's face**, with the
  aircraft tick kept inside the frame.
- The mark is the real `logo-mark.svg`, composited with transparency. Never a crop
  from a previous render - it carries that render's background as a visible box.
- Bottom edge: a 9px Sunset Orange baseline plus a 17° corner wedge. A full-width
  17° band would rise 367px; shallowing it to fit would stop being 17°.

## Building it

Plus Jakarta Sans is not a system font. Either fetch the TTFs
(`tokotype/PlusJakartaSans`) and compose with Pillow, or render the card in a
browser where the webfont is already loaded. Do not substitute a system face -
the wordmark is the one place a near-miss is obvious.
