# 04 — Logo

Master file: `../assets/logo-primary.jpg` (2048 × 2048, JPEG, white background).

## 1. Measured geometry

| Property | Value |
|---|---|
| Canvas | 2048 × 2048 |
| Full mark bounding box | x 80–1944, y 244–1812 (1864 × 1568) |
| Disc diameter | 1568 px = **76.6% of canvas height** |
| Disc centre | approx. (1060, 1028) — slightly right of and above centre |
| Aircraft streak | left tip (80, 1430) → right tip (1944, 859) |
| **Flight Angle** | **17°** rising left → right |
| Sun/sea seam inside disc | 11°–17° (the aircraft body widens it) |

The streak **overhangs the disc on both sides**. That overhang is part of the mark —
never crop it to make a tidy circle.

## 2. Logo variants to produce

| Variant | Contents | Use |
|---|---|---|
| **Primary mark** | Full disc + streak, transparent background | Default, ≥40px |
| **Disc-only** | Disc clipped at its circle, streak trimmed at the edge | Avatars, favicons ≥32px, app icon, social profile |
| **Monogram** | White aircraft silhouette on `orange-500` disc | Favicon 16–32px, notification badge |
| **Horizontal lockup** | Mark left, `Trip Express BD` right | Site header, letterhead, email |
| **Stacked lockup** | Mark above, wordmark centred below | Hero, print, square social |
| **Reverse** | Mark unchanged, wordmark in `#FFFFFF` | Dark sections, footer, photo overlay |
| **Single-colour** | Whole mark in `deep-950` or `#FFFFFF` | Fax-grade print, embroidery, watermark |

Produce SVG for every variant. The current JPEG is a raster stand-in — **vectorise
it before launch**; do not ship the JPEG in the header.

## 3. Wordmark

- Family: **Plus Jakarta Sans ExtraBold (800)**
- Tracking: `-0.02em`
- Case: `Trip Express BD` — Title Case, "BD" uppercase
- Colour: `deep-950` `#132436` on light, `#FFFFFF` on dark
- Optional split-colour treatment: `Trip` in `orange-500`, `Express BD` in
  `deep-950`. Use this **only** in the stacked lockup, never in the header.

### Horizontal lockup construction
```
[ mark, height H ] [ gap = 0.32 × H ] [ wordmark, cap-height = 0.40 × H ]
```
Wordmark baseline aligns to the **disc centre line**, not to the streak.

### Stacked lockup construction
```
[ mark, height H ]
[ gap = 0.22 × H ]
[ wordmark, cap-height = 0.26 × H, centred on the disc centre x ]
```

## 4. Clear space

Minimum clear space on all four sides = **25% of the disc diameter**.

```
clear = 0.25 × disc_height
```
At a 64px-tall mark that is 16px of untouched space. Nothing enters it — no text,
no rule, no photo edge, no button.

## 5. Minimum sizes

| Context | Minimum |
|---|---|
| Primary mark, screen | 40px tall |
| Disc-only, screen | 32px |
| Monogram, screen | 16px |
| Horizontal lockup, screen | 120px wide |
| Primary mark, print | 15mm tall |
| Lockup, print | 35mm wide |

Below 32px the palms, bus and kayak become noise — switch to the monogram.

## 6. Backgrounds

| Background | Logo treatment |
|---|---|
| White / `n-50` | Primary mark, full colour |
| `orange-50` / `blue-50` | Primary mark, full colour |
| `deep-950` / `deep-900` | Primary mark unchanged + white wordmark |
| `orange-500` | **Single-colour white version only** |
| Photography | Reverse lockup on a `--te-scrim`, or inside a white disc chip |
| Busy photography | White disc chip: mark centred in a `#FFFFFF` circle at 1.5× mark width |

## 7. Do not

1. Recolour any part of the mark.
2. Rotate, mirror, or change the Flight Angle.
3. Add drop shadows, glows, bevels, strokes or outlines.
4. Stretch non-uniformly or skew.
5. Place inside another shape that clips the streak overhang.
6. Set the wordmark in any family other than Plus Jakarta Sans.
7. Use the mark as a repeating background pattern (use the Flight Streak pattern
   from `07-imagery-and-texture.md` instead).
8. Reconstruct it with emoji or icon-font parts.
9. Add a tagline inside the clear-space zone.
10. Ship the JPEG where an SVG is possible.

## 8. Favicon & app icons

| Size | Asset |
|---|---|
| 16×16, 32×32 | Monogram — white aircraft on `orange-500`, no disc split |
| 48×48, 64×64 | Disc-only, simplified (drop palms + kayak) |
| 180×180 (apple-touch) | Disc-only on white, 12% padding |
| 192/512 (PWA maskable) | Disc-only centred on `#FFFFFF`, 20% safe padding |
| `theme-color` | `#ED7C30` |
| Social OG image | Stacked lockup on `--te-grad-horizon`, 1200×630 |

## 9. Attribution and partner lockups

When paired with a partner (for example **তাঁবু নিবাসী**):
```
[ Trip Express BD lockup ]  [ 1px n-300 vertical rule, height = disc height ]  [ partner mark ]
```
Gap either side of the rule = clear-space value. Trip Express BD always sits left.
