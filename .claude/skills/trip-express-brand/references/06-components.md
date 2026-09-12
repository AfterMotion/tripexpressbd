# 06 - Component Specifications

All values reference tokens from `../assets/tokens.css`.

---

## 1. Buttons

| Variant | Background | Ink | Border | Hover | Use |
|---|---|---|---|---|---|
| **Primary** | `orange-500` `#ED7C30` | `n-950` `#111823` | none | bg `orange-600`, `--te-shadow-warm` | Book / Enquire - one per view |
| **Secondary** | `deep-700` `#25517B` | `#FFFFFF` | none | bg `deep-800` | View itinerary, See packages |
| **Outline** | transparent | `deep-700` | `1.5px deep-300` | bg `deep-50`, border `deep-500` | Tertiary actions |
| **Ghost** | transparent | `n-700` | none | bg `n-100` | Toolbar, card overflow |
| **WhatsApp** | `#25D366` | `#0B3D22` | none | bg `#1FBE5A` | Direct chat CTA |
| **Danger** | `#B02E2E` | `#FFFFFF` | none | `#8F2424` | Cancel booking |
| **On-dark primary** | `orange-500` | `n-950` | none | `orange-400` | Same everywhere - do not invert |

**Never** `#FFFFFF` ink on `orange-500`. Ratio 2.79:1.

### Sizes

| Size | Height | Padding X | Font | Radius | Icon |
|---|---|---|---|---|---|
| sm | 36px | 16px | `0.875rem` / 600 | pill | 16px |
| md | 44px | 24px | `1rem` / 600 | pill | 18px |
| lg | 52px | 32px | `1.0625rem` / 700 | pill | 20px |
| xl | 60px | 40px | `1.125rem` / 700 | pill | 22px |

Minimum tap target 44×44 everywhere. The `sm` size is a **visual** height: when it is
interactive on touch it must still reach a 44px hit area via `min-height` or a
pseudo-element, and a primary conversion action (any WhatsApp or booking CTA) uses
`md` or larger, never `sm`. Icon sits left of the label at `gap: 8px`, except the
trailing arrow on "departure" actions which sits right and translates `+3px, -1px`
on hover.

```css
.te-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border-radius: var(--te-r-pill);
  font-family: var(--te-font-body); font-weight: 600;
  transition: background-color var(--te-dur-fast) var(--te-ease-out),
              box-shadow var(--te-dur-fast) var(--te-ease-out),
              transform var(--te-dur-fast) var(--te-ease-out);
}
.te-btn:active { transform: translateY(1px); }
.te-btn:focus-visible { outline: 3px solid var(--te-deep-500); outline-offset: 2px; }
```

---

## 2. Package card - the most important component

```
+--------------------------------------+
| [ 16:10 photo, radius 12px        ]  |  <- image inset 16px
|   [ badge: FEATURED (skew -6deg) ]   |  <- absolute, top-left of image, 12px in
|   [ chip: 5D / 4N ]                  |  <- absolute, bottom-right, glass
+--------------------------------------+
| overline   NEPAL                     |  <- orange-700, uppercase, 0.12em
| h3         Explore Nepal             |  <- n-900
| caption    Kathmandu - Nagarkot -    |  <- n-600, middot separators
|            Pokhara                   |
|                                      |
| -- icon row ----------------------   |  <- 3 max: dates, group size, transport
|  [cal] 11-15 Nov  [users] 12 seats   |
|                                      |
| +- price block ----+- action ------+ |
| | caption   From   | [Primary md]  | |
| | price-lg  BDT 58,500             | |
| | caption   per person             | |
| +------------------+---------------+ |
+--------------------------------------+
```

**Spec**

- Surface `#FFFFFF`, radius `--te-r-lg` 16px, border `1px #DFE5EC`, shadow `--te-shadow-sm`
- Padding 16px; image inset 16px on all sides at top, radius 12px
- Image aspect `16:10`, `object-fit: cover`, reveal scale 1.06 → 1.0
- Hover: `translate(2px, -6px)`, shadow → `--te-shadow-md`, image scale 1.04
- Featured variant: border `1.5px orange-500`, plus a `--te-grad-sunset` 3px strip along the card top edge
- Price always `tabular-nums`, always prefixed with the taka symbol
- The whole card is one link; use a stretched-link pattern, never nested anchors

**Badges** (absolute over the image, `--te-r-pill`, `0.75rem` / 700, 6px × 12px):

| Badge | Background | Ink |
|---|---|---|
| FEATURED | `--te-grad-sunset` | `#111823` |
| SEATS FILLING | `#FFF6E0` | `#8A6100` |
| BOOKING OPEN | `#E7F7F0` | `#15784F` |
| SOLD OUT | `#FDECEC` | `#B02E2E` |
| COMPLETED | `rgba(255,255,255,0.92)` | `#3F4A5A` |

Featured and Seats Filling badges carry `transform: skewX(-6deg)`; the label inside
counter-skews `+6deg`. A full 17° skew is unreadable at 12px - 6° reads as the same
family.

**Glass chip** (duration, over photo):

```css
background: rgba(19, 36, 54, 0.55);
backdrop-filter: blur(8px);
color: #FFFFFF;
border-radius: 999px;
padding: 4px 10px;
font-size: 0.75rem;
font-weight: 600;
```

---

## 3. Destination tile (circular)

The disc is the brand shape - use it for destination entry points.

- `--te-r-disc`, size 96px mobile / 128px desktop
- Photo inside, plus a `--te-scrim` bottom overlay
- 3px `#FFFFFF` ring, plus `--te-shadow-sm`
- Label below the disc, `h4`, `n-800`, centred
- Hover: ring becomes `orange-500`, disc scales 1.04, `--te-ease-lift`
- Horizontal scroll rail on mobile with 16px gap and scroll-snap

---

## 4. Navigation

**Header (desktop)**

- Height 84px, compresses to 64px on scroll
- Background `#FFFFFF`; scrolled → `rgba(255,255,255,0.92)` + `blur(12px)` + `--te-shadow-sm`
- Logo: horizontal lockup, mark 40px tall
- Links: `body` 500, `n-700`; hover `orange-700`
- Active link: `n-900` 600 plus a 3px `orange-500` pill underline, 20px wide, centred, offset 6px below the text
- Right cluster: phone number (`caption` 600, `deep-700`, with a phone icon) plus Primary button "Book Now"
- Dropdowns: `--te-r-lg`, `--te-shadow-lg`, 8px padding, item radius 8px, hover `orange-50`

**Header (mobile)**

- Height 64px. Logo mark-only (disc) 36px, plus wordmark if width ≥ 380px
- Right: WhatsApp icon button plus hamburger
- Drawer slides from the right, 88% width, `--te-dur-base`, `--te-ease-out`; backdrop `rgba(19,36,54,0.55)`

**Floating WhatsApp button** - present on every page

- 56px disc, bottom-right, 20px inset, `z-index: var(--te-z-whatsapp)`
- `#25D366` background, white glyph, `--te-shadow-lg`
- On scroll past the hero it expands once to a pill with a Bangla label, then collapses after 4s

---

## 5. Forms

- Label: `caption` 600, `n-700`, 6px below-gap
- Input height 48px, radius `--te-r-sm` 8px, border `1px #C6CFDA`, background `#FFFFFF`, padding 12px 14px, font `body`
- Placeholder `n-400`
- Focus: border `deep-500`, ring `0 0 0 3px rgba(49,113,174,0.18)`, no outline jump
- Error: border `#D64545`, message `caption` in `#B02E2E`, 6px below
- Success: border `#1E9E6A`
- Helper text: `caption`, `n-600`
- Select uses a custom chevron in `n-500`; never the OS default arrow
- Phone field defaults to `+880`, `inputmode="tel"`
- Date fields show `DD Mon YYYY` (`11 Nov 2025`), never `11/11/25`
- Required marker: `*` in `orange-700` after the label
- Submit: Primary lg, full width on mobile

**Enquiry form is 5 fields maximum**: Name, Phone, Destination, Travel month,
Message. Anything longer loses this audience.

---

## 6. Section header block

```html
<div class="te-section-head">
  <p class="te-overline">Destinations</p>
  <span class="te-flight-rule"></span>
  <h2>Where we take you</h2>
  <p class="te-lead">One supporting line, 56 characters or fewer.</p>
</div>
```

- `overline` `orange-700` (dark sections: `orange-400`)
- Flight rule 72×3px, `--te-grad-sunset`, `rotate(-17deg)`
- `h2` `n-900` (dark: `#FFFFFF`)
- lead `body-lg` `n-600` (dark: `n-300`), `max-width: 56ch`
- Centre-aligned for full-width sections, left-aligned when paired with media

---

## 7. Itinerary accordion

Mirrors the brand's published itinerary format - keep it recognisable.

- Each day is a row: a `Day 01` chip (`orange-100` background, `orange-800` ink, `--te-r-sm`) plus a route line (`h4`) plus a chevron
- Expanded body: bulleted activities with a 6px `orange-400` disc marker, `body-sm`, line-height 1.6 (Bangla 1.85)
- The overnight-stay line is pinned at the bottom of each day in `caption` `deep-700`
- Left rail: 2px `n-200` vertical line connecting the day chips; the active day's segment turns `orange-500`
- First day open by default; animate with the `grid-template-rows: 0fr → 1fr` technique, never `height: auto`

---

## 8. Inclusion / exclusion lists

Two columns on desktop, stacked on mobile.

- Included: check glyph in `#1E9E6A`, text `n-700`
- Excluded: cross glyph in `#D64545`, text `n-600`
- Row padding 10px 0, hairline `n-200` between rows
- Surface: `n-50` panel, `--te-r-lg`, 24px padding

---

## 9. Testimonial / trip-report card

- Surface `#FFFFFF`, `--te-r-lg`, border `1px #DFE5EC`
- A `--te-grad-sunset` 3px strip along the **left** edge, full height
- Quote `body-lg` `n-800`, no italics, no decorative quote marks larger than 32px
- Author row: 40px disc avatar plus name (`body-sm` 600 `n-900`) plus trip name (`caption` `n-500`)
- Max 3 lines visible, then a "Read more" ghost button

---

## 10. Stat / counter block

Dark band (`--te-grad-night`), 4 columns desktop / 2 mobile.

- Number: `display-lg`, `#FFFFFF`, `tabular-nums`, count-up on first view
- Label: `caption` 600, `n-300`, uppercase Latin only
- Divider: 1px `#24405C` vertical rules between columns, desktop only
- Only real figures: trips completed, travellers hosted, destinations, years running

---

## 11. Footer

- Background `deep-950` `#132436`
- Top edge: 17° angled cut rising to the right (`--te-cut-rise`, capped 160px)
- 4 columns: Brand and about, Destinations, Company, Contact
- Reverse lockup, mark 48px
- Body text `n-300`; links `n-300`, hover `orange-400`
- Contact block lists the office address, all three phone numbers, email, WhatsApp
- Social row: 40px discs, `#1E4162` background, hover `orange-500`
- Bottom bar: 1px `#24405C` top border, `caption` `#8FA3B8`, `© <year> Trip Express BD`

---

## 12. Icons

- Set: **Lucide** - 2px stroke, 24px grid, round caps, geometric. It matches the logo's flat-vector construction.
- Sizes: 16 / 18 / 20 / 24 / 32. Stroke stays 2px; do not scale stroke.
- Colour: inherit `currentColor`. Accent icons `orange-500`, structural icons `n-500`.
- Icon chips: `--te-r-disc`, 40px, background `orange-50` with an `orange-600` glyph, or `blue-50` with a `deep-600` glyph.
- Travel vocabulary maps to the logo's own objects wherever possible: `plane` (air), `bus` (overland), `sailboat` (water), `mountain` (hill stations), `palmtree` (beach), `sun` (season).
- Never mix icon families. Never use filled and stroked variants in one row.

---

# Iconography - the system, not the drawings

Geometry is Lucide on a 24×24 grid, round caps and joins. What follows is what
makes a set of Lucide paths look like *one* set instead of thirty imports.

## Stroke width belongs to the page, not the sprite

`stroke-width` is an **inherited** SVG property. Set it once per size on the host
element and let it inherit through the `<use>` shadow tree:

```css
.ic      { width: 20px; height: 20px; stroke-width: 1.85; }
.ic--sm  { width: 16px; height: 16px; stroke-width: 2.15; }
.ic--md  { width: 22px; height: 22px; stroke-width: 1.75; }
.ic--lg  { width: 26px; height: 26px; stroke-width: 1.55; }
.ic--xl  { width: 32px; height: 32px; stroke-width: 1.35; }
```

**Never write `stroke-width` into the sprite.** One number on a 24-unit grid does
not render at one weight: a 2px stroke drawn into a 16px box is a third heavier
than the same stroke drawn into a 24px box. That unevenness is what "the icons
don't feel premium" actually is. Target a **rendered** stroke of ~1.5px at every
size and back the numbers out from there.

## Two ways an external sprite renders nothing at all

Both of these produce **no icons, no error, no console output**:

1. **Styling symbols from a `<style>` block.** A `<style>` inside `<defs>` is not
   cloned into the `<use>` shadow tree of an *external* sprite. Presentation
   attributes (`fill`, `stroke`, `stroke-linecap`, `stroke-linejoin`) go on each
   `<symbol>` element, where they *are* cloned. Only `stroke-width` is left off,
   to inherit.
2. **Two consecutive hyphens in an XML comment.** Documenting `.ic--sm` in the
   sprite's own header comment is an XML parse error. Write class names without
   their leading dashes in sprite comments.

## Choosing the glyph

- Line icons for everything the brand does. Solid fills only for **other
  companies' marks** (WhatsApp, Facebook) - those are never redrawn as line icons.
- One icon per idea across the whole site: `i-badge-check` means "what is
  included" everywhere, `i-camera` means "portfolio" everywhere. An icon that
  means two things means nothing.
- A destination with no photograph does **not** get a generic clip-art mountain on
  a flat blue circle. It gets the brand's own **night disc** with the Flight Angle
  across the upper third and the icon in Sand Orange. (`.dest__disc--art`)

Minimum set: plane, bus, mountain, ship, palm, compass, route, globe, users,
calendar, clock, pin, bed, utensils, wallet, shield, badge-check, tag, star,
phone, mail, message, check, x, info, chevrons, arrows, menu, quote, image,
camera, layers, sun, moon, whatsapp, facebook.

---

# WhatsApp, at three sizes

WhatsApp is the brand's real conversion path, which is exactly why it must not
look bolted on. Saturated `#25D366` appears **only inside the glyph's own disc** -
never as a full-width bar, never as the page's second primary button.

| Placement | Treatment |
|---|---|
| **Package card** | A pill: `--te-wa-soft` background, `--te-wa-ink-soft` ink, `--te-wa-border`, glyph + the words "Ask us". Hover fills with `--te-whatsapp`. |
| **Floating action** | A **brand surface** card - Night Ocean, white type, `--te-shadow-lg`, 1px light border - carrying a 42px green disc and a two-line label ("Ask about a tour" / Bangla). Expands on hover, and once, briefly, when it first arrives. |
| **Contact block** | `btn--secondary` (Deep Ocean), glyph + full sentence. |

An unlabelled green circle in the corner tested as "an advert", not "the way to
ask". Below 420px the floating action may collapse to the disc; above it, it
carries its label.

---

# The journey rail (mobile wayfinding)

A sticky row of section chips under the header, `--te-rail-h` tall, horizontally
scrollable, current section filled Sunset Orange with `--te-action-ink`.

- Appears once the visitor is past 60% of the first viewport.
- Hides on an active downward scroll (`y > lastY + 6`), returns on anything else.
  Scrolling **up** is the gesture that means "I want to navigate".
- The active chip is scrolled into the centre of the rail whenever it changes.
- Hidden entirely at ≥1040px, where the nav bar does this job.
- One scroll-spy paints the nav, the rail **and** the drawer from the same state.

---

# Drawer

- `min(88%, 388px)`, rounded on the leading edge, with a 3px Sunset seam down it.
- Opens on `--te-ease-lift` over `--te-dur-slow`. A linear slide reads as a menu
  being dragged; a slight overshoot reads as a panel being thrown open.
- Items stagger in at `90ms + i × 40ms`; the footer block follows at 320ms.
- The current section is marked in the drawer too (`.is-here`), with the icon chip
  filled in the sunset gradient.
- **Drag right to close**, with a 30%-of-width threshold. Decide axis on the first
  move: if the finger is travelling more vertically than horizontally, let the
  panel scroll instead. A drawer dismissable only by a 44px X in the far corner is
  a desktop drawer wearing a phone's clothes.
- Focus is trapped, Escape closes, focus returns to the trigger.

---

# Gallery - the proof wall

- **Column masonry, not pagination.** Photographs append in batches of 6 from an
  `IntersectionObserver` sentinel 600px ahead. 1 / 2 / 3 / 4 columns at
  0 / 560 / 1040 / 1280.
- **Monochrome by default.** `filter: grayscale(1) contrast(1.04)`; colour returns
  on hover. There is no hover on a phone, so the frame nearest the middle of the
  viewport comes to colour instead (`rootMargin: '-38% 0px -38% 0px'`).
- **Counter-drift.** Odd columns travel with the scroll, even columns against it,
  capped at **20px** and desktop-only - parallax stays banned on touch. The wall
  breathes instead of sliding as one slab.
- Entrance offsets alternate ±26px by column, so the grid assembles rather than
  fading in flat.
- Each frame carries its trip name in a caption that appears with the colour.
- Every frame opens a lightbox: arrows, Escape, swipe, focus restored on close.
