# 05 - Layout, Space, Shape & Motion

## 1. Grid

| Breakpoint | Name | Columns | Gutter | Page margin | Container |
|---|---|---|---|---|---|
| `<640px` | mobile | 4 | 16px | 20px | fluid |
| `640–1023` | tablet | 8 | 20px | 32px | fluid |
| `1024–1279` | laptop | 12 | 24px | 40px | 1120px |
| `≥1280` | desktop | 12 | 24px | 48px | **1240px** |
| `≥1536` | wide | 12 | 32px | 64px | 1280px max |

```css
--te-container: 1240px;
--te-container-narrow: 800px;   /* article / itinerary body */
--te-container-wide: 1440px;    /* gallery, full-bleed media */
```

Mobile-first is mandatory - the audience is overwhelmingly on Android phones.
Design the 360px view first, then scale up.

## 2. Spacing scale (4px base)

```
--te-space-0:  0
--te-space-1:  4px
--te-space-2:  8px
--te-space-3:  12px
--te-space-4:  16px
--te-space-5:  20px
--te-space-6:  24px
--te-space-8:  32px
--te-space-10: 40px
--te-space-12: 48px
--te-space-16: 64px
--te-space-20: 80px
--te-space-24: 96px
--te-space-32: 128px
```

**Section rhythm**
- Mobile: `64px` top and bottom
- Tablet: `80px`
- Desktop: `112px` (use `--te-space-24` minus 16, i.e. `clamp(64px, 8vw, 112px)`)

```css
--te-section-y: clamp(4rem, 8vw, 7rem);
```

Inside a section: header block → `40px` → content grid → `48px` → section CTA.

## 3. Radii

```
--te-r-xs:   4px    /* tags, tiny chips */
--te-r-sm:   8px    /* inputs, small buttons */
--te-r-md:   12px   /* images inside cards, nested surfaces */
--te-r-lg:   16px   /* cards, panels, modals */
--te-r-xl:   24px   /* hero media, feature blocks */
--te-r-2xl:  32px   /* full-bleed rounded sections */
--te-r-pill: 999px  /* buttons, filter chips, badges */
--te-r-disc: 50%    /* avatars, icon chips, destination bubbles */
```

Rule of thumb: **nested radius = parent radius − padding**. A 16px card with 16px
padding holds a 12px image, not another 16px.

## 4. Borders

- Default hairline: `1px solid var(--te-n-200)`
- Card border on white: `1px solid #DFE5EC`
- Emphasised card (featured package): `1.5px solid var(--te-orange-500)`
- Dark-section hairline: `1px solid #24405C`
- Never use a border thicker than 2px except the Flight Rule (below).

**Flight Rule** - the brand's decorative divider:
```css
.te-flight-rule {
  height: 3px;
  width: 72px;
  background: var(--te-grad-sunset);
  border-radius: 999px;
  transform: rotate(-17deg);      /* CSS rotate is clockwise-positive */
  transform-origin: left center;
}
```
Use once per section header, under the overline. Never more than one per section.

## 5. The 17° system

```css
--te-flight-angle: 17deg;
```

**Section divider (angled cut):**
```css
.te-cut-top    { clip-path: polygon(0 6vw, 100% 0, 100% 100%, 0 100%); }
.te-cut-bottom { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%); }
```
`6vw` at a 1200px container ≈ 72px rise over 1200px ≈ 3.4°. For a true 17° visual
read at full-bleed widths use a **rise of 0.30 × width**, capped at 160px:
```css
--te-cut-rise: min(0.30 * 100vw, 160px);
```
Cap it - an uncapped 17° cut eats the viewport on wide screens.

**Where 17° appears**
- Hero bottom edge
- The transition between a warm band and a cool band
- The Flight Rule under section overlines
- Badge / ribbon skew on "Featured" and "Seats Filling" tags
- The direction of card hover lift: `translate(2px, -6px)` - up **and** right
- Underline swash beneath a highlighted word in a headline

**Where it must not appear**: inside tables, inside form fields, on the nav bar,
on anything the user must read precisely.

## 6. Elevation ladder

| Level | Shadow | Use |
|---|---|---|
| 0 | none | Flat sections, page background |
| 1 | `--te-shadow-xs` | Inputs, chips |
| 2 | `--te-shadow-sm` | Resting cards |
| 3 | `--te-shadow-md` | Hovered cards, sticky header once scrolled |
| 4 | `--te-shadow-lg` | Dropdowns, popovers, floating WhatsApp button |
| 5 | `--te-shadow-xl` | Modals, image lightbox |
| warm | `--te-shadow-warm` | Primary CTA hover only |

Dark theme: reduce all shadow alphas by half and add a 1px `#24405C` top border
instead - shadows read poorly on `deep-950`.

## 6b. Glass surfaces

Reserved for one job: a DOM panel that sits **over the journey's 3D canvas** and
must stay honest that a scene is running behind it - the waypoint pill, the
header's `.is-over` state, and the mobile hero card. Not a general card style;
ordinary cards elsewhere stay solid (`--te-surface`).

```css
--te-glass-bg:        rgba(19, 36, 54, 0.55);   /* Night Ocean, translucent */
--te-glass-bg-strong: rgba(19, 36, 54, 0.78);   /* @supports fallback, no blur */
--te-glass-border:    rgba(255, 255, 255, 0.14);
--te-glass-blur:      18px;
```

Rules:

- Tint is always Night Ocean (`--te-deep-950`'s rgb), never white or a brand hue -
  glass here is "night air over the scene", not frosted paper.
- Pair `background: var(--te-glass-bg)` with `backdrop-filter: blur(var(--te-glass-blur))`
  and a 1px `--te-glass-border` on the edge that faces the scene. Wrap a
  `background: var(--te-glass-bg-strong)` fallback in
  `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))`.
- The mobile journey hero is the canonical example: the copy card overlaps the
  bottom of the pinned 3D stage (negative `margin-top` on `.journey__flow`)
  instead of sitting in a separate opaque block below it, so the sun/terrain
  keep reading as a backdrop for the whole scroll, not just the first screen.
  See `11-responsive-standards.md` and `.hero` in `assets/css/site.css`.
- Never stack glass on glass, and never use it over a photo card or a form -
  rule 19 (`--te-field-bg`) still governs form fields even inside a glass panel.

## 7. Z-index scale

```
--te-z-base: 0
--te-z-raised: 10
--te-z-sticky: 100     /* sticky header */
--te-z-dropdown: 200
--te-z-whatsapp: 300   /* floating CTA */
--te-z-overlay: 400
--te-z-modal: 500
--te-z-toast: 600
```

## 8. Motion

### Durations
```
--te-dur-instant: 100ms   /* colour, opacity on small elements */
--te-dur-fast:    180ms   /* hover, focus, chips */
--te-dur-base:    260ms   /* cards, dropdowns, tabs */
--te-dur-slow:    420ms   /* section reveals, modals */
--te-dur-scenic:  700ms   /* hero media, parallax settle */
```

### Easing
```
--te-ease-out:   cubic-bezier(0.16, 1, 0.30, 1);    /* default - arrivals */
--te-ease-in:    cubic-bezier(0.7, 0, 0.84, 0);     /* departures, exits */
--te-ease-inout: cubic-bezier(0.65, 0, 0.35, 1);    /* moves between two states */
--te-ease-lift:  cubic-bezier(0.34, 1.26, 0.64, 1); /* gentle overshoot, cards only */
```

### Signature motions

**Depart** - anything entering the viewport travels along the Flight Angle:
```css
@keyframes te-depart {
  from { opacity: 0; transform: translate(-14px, 10px); }
  to   { opacity: 1; transform: translate(0, 0); }
}
/* 260ms var(--te-ease-out), stagger children by 60ms, cap the stagger at 6 items */
```

**Card lift** - up and slightly right, mirroring the streak:
```css
.te-card:hover { transform: translate(2px, -6px); box-shadow: var(--te-shadow-md); }
transition: transform var(--te-dur-base) var(--te-ease-lift),
            box-shadow var(--te-dur-base) var(--te-ease-out);
```

**Image reveal** - scale 1.06 → 1.0 over `--te-dur-scenic`, `--te-ease-out`.
Photography settles, it does not pop.

**Primary CTA hover** - background `orange-500` → `orange-600`,
`--te-shadow-warm` fades in over `--te-dur-fast`. No scale change on buttons.

### Rules
- Never animate `width`, `height`, `top`, `left`. Only `transform` and `opacity`.
- Never loop an animation longer than 3 seconds in a content area.
- Scroll-triggered reveals fire **once**, at 15% visibility.
- Sticky header: compresses from 84px to 64px over `--te-dur-base`, gains
  `--te-shadow-sm` and a `rgba(255,255,255,0.92)` + `backdrop-filter: blur(12px)`
  background.
- Honour `prefers-reduced-motion` - see `09-accessibility-and-qa.md`.

---

## The 17° cut, stated as arithmetic

`tan(17°) = 0.3057`. **A cut is 17° only when its rise is 30.57% of its run.**

```css
--te-cut-rise: min(30.57vw, 170px);
.seam { height: var(--te-cut-rise); clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%); }
```

The failure mode is picking a height that "looks like a diagonal": a full-width
divider at `height: 36px` on a 412px phone is a **5°** cut carrying the brand's
name. Measure it. If a true 17° rise would swallow the artwork behind it, shorten
the **run** - a corner wedge over 330px - rather than shallowing the angle. The
angle is the brand; the size of the shape is negotiable.

Applies to: section seams, the footer cut, the OG card, hero clip-paths and the
Flight Rule under every section header.

---

## Anchor scrolling is one curve, written once

Turn native smooth scrolling **off** and animate anchor jumps in JS:

```css
html { scroll-behavior: auto; scroll-padding-top: calc(var(--te-hdr-h) + var(--te-rail-h) + 12px); }
```

Reasons, in order of how much they matter:

1. **It can be interrupted.** Native smooth scroll cannot. A visitor who starts
   scrolling mid-animation gets dragged back to where the browser was going - the
   single worst feeling on a long page. Listen for `wheel` and `touchstart` and
   stand down immediately.
2. **It is the same everywhere.** Browsers pick their own duration for native
   smooth scroll; Safari's and Chrome's do not match.
3. **Duration can follow distance.** `clamp(320 + distance * 0.32, 380, 980)`ms -
   a short hop must not take as long as a full-page flight, and nothing takes
   longer than a second.

Curve: `easeInOutQuint`. Offset: measure the header (and the rail, if it is
showing) from the DOM. Do **not** read `--te-chrome-h` with
`getComputedStyle().getPropertyValue()` - a custom property holding a `calc()`
comes back unresolved, and `parseFloat` gives `NaN`.
