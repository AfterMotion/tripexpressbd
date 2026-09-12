# 03 - Typography

The audience mixes Bangla and English **inside the same sentence**. The type system
is bilingual by construction, not by fallback.

---

## 1. Families

| Role | Family | Why | Weights loaded |
|---|---|---|---|
| Display / headings (Latin) | **Plus Jakarta Sans** | Geometric-humanist; its circular bowls echo the logo disc, its slight warmth avoids corporate coldness | 700, 800 |
| Body / UI (Latin) | **Inter** | Highest legibility at small sizes on low-DPI Android, excellent tabular figures | 400, 500, 600 |
| All Bangla | **Hind Siliguri** | Correct conjunct rendering, designed for Bangla UI, matches Inter's x-height closely | 400, 500, 600, 700 |
| Prices, dates, counters | Inter + `tabular-nums` | Digits must not jitter in cards or countdowns | 600, 700 |

### Stacks

```css
--te-font-display: 'Plus Jakarta Sans', 'Hind Siliguri', 'Segoe UI',
                   system-ui, -apple-system, sans-serif;
--te-font-body:    'Inter', 'Hind Siliguri', 'Segoe UI',
                   system-ui, -apple-system, sans-serif;
--te-font-bangla:  'Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi',
                   'Segoe UI', sans-serif;
--te-font-num:     'Inter', system-ui, sans-serif;
```

Note the Latin stacks list `Hind Siliguri` **second**. That is deliberate: if a
Bangla glyph appears in a Latin-tagged run, it still resolves to the right face
instead of a system fallback.

### Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Use `display=swap`. Subset Latin + Bengali only. Never load more than these
four families.

---

## 2. Bangla rules (mandatory)

1. Bangla text gets `font-family: var(--te-font-bangla)` explicitly - set it via a
   `.bn` utility class or `:lang(bn)`.
2. **Bangla runs ~8% smaller optically at the same px.** Bump Bangla one step:
   if the Latin body is `16px`, Bangla body is `17px`.
3. Bangla needs more leading. Latin body `line-height: 1.6`; Bangla body `1.85`.
4. Never set Bangla below `15px`. Conjuncts collapse.
5. Never apply `letter-spacing` to Bangla - it breaks ligatures. Latin tracking
   rules below do **not** apply to Bangla.
6. Never uppercase-transform Bangla. `text-transform` must be scoped to Latin.
7. Bangla headings max weight 700 (Hind Siliguri has no 800).
8. Bengali numerals (`৫৮,৫০০`) are fine inside Bangla prose; **prices in cards,
   tables and filters use Western digits with `৳`** so sorting and scanning work.

```css
:lang(bn), .bn { font-family: var(--te-font-bangla); line-height: 1.85; letter-spacing: 0; }
:lang(bn) h1, .bn h1 { font-weight: 700; }
```

---

## 3. Type scale (fluid, 1.25 major third)

| Token | Clamp | Family | Weight | LH | Tracking | Use |
|---|---|---|---|---|---|---|
| `display-xl` | `clamp(2.75rem, 1.6rem + 4.6vw, 4.5rem)` | Display | 800 | 1.04 | `-0.03em` | Hero headline only |
| `display-lg` | `clamp(2.25rem, 1.5rem + 3.2vw, 3.5rem)` | Display | 800 | 1.08 | `-0.025em` | Page titles |
| `h1` | `clamp(1.875rem, 1.35rem + 2.2vw, 2.75rem)` | Display | 700 | 1.15 | `-0.02em` | Section headline |
| `h2` | `clamp(1.5rem, 1.2rem + 1.3vw, 2.125rem)` | Display | 700 | 1.2 | `-0.015em` | Sub-section |
| `h3` | `clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)` | Display | 700 | 1.3 | `-0.01em` | Card title |
| `h4` | `1.125rem` | Body | 600 | 1.4 | `0` | Small card title |
| `body-lg` | `1.125rem` | Body | 400 | 1.65 | `0` | Lead paragraph |
| `body` | `1rem` | Body | 400 | 1.6 | `0` | Default |
| `body-sm` | `0.9375rem` | Body | 400 | 1.55 | `0` | Dense lists |
| `caption` | `0.875rem` | Body | 500 | 1.45 | `0.005em` | Meta, image captions |
| `overline` | `0.8125rem` | Body | 700 | 1.3 | `0.09em` | Eyebrow labels, UPPERCASE, Latin only |
| `price-lg` | `clamp(1.5rem,1.2rem+1.2vw,2rem)` | Num | 700 | 1.1 | `-0.01em` | Package price |
| `price-sm` | `1.125rem` | Num | 600 | 1.2 | `0` | Card price |

### Measure
- Body copy: **60–75 characters** (`max-width: 68ch`).
- Bangla body: **50–62 characters** - Bangla words are wider.
- Headings: max `20ch` for display, `28ch` for h1/h2.

---

## 4. Hierarchy patterns

**Standard section header** (use everywhere):
```
[overline]   DESTINATIONS           ← orange-700, uppercase, 0.09em
[h1]         Where we take you      ← n-900
[body-lg]    One line of support    ← n-600, max 56ch
```
The overline is the brand's tell. It is always `orange-700` in light sections and
`orange-400` in dark sections.

**Price block:**
```
[caption]  জনপ্রতি মাত্র          ← n-500
[price-lg] ৳58,500                ← n-900, tabular-nums
[caption]  5 Days / 4 Nights      ← n-500
```

## 5. Text styling rules

- `font-feature-settings: 'ss01', 'cv05'` off - keep Inter default; do not enable
  stylistic alternates.
- `font-variant-numeric: tabular-nums` on every price, date, counter and table cell.
- Links in prose: `deep-600`, `text-decoration: underline`,
  `text-underline-offset: 3px`, `text-decoration-thickness: 1.5px`;
  hover → `orange-700`.
- Emphasis inside body copy uses **weight 600**, never italic - neither Hind
  Siliguri nor the brand voice supports italic well.
- Never justify text. Bangla justification produces rivers.
- Never use `text-transform: uppercase` on anything but `overline` labels, and
  never on Bangla.
- Headings never carry a gradient fill. Colour only.

## 6. Emoji

The brand's own social voice uses emoji heavily (✈️ 📍 🗓 💰 ✅ ❌ 📞).
On the website:
- **Allowed** in itinerary lists, inclusion/exclusion lists, and social embeds -
  they mirror the real published format and aid scanning.
- **Not allowed** in headings, nav, buttons, or as a substitute for an icon in UI
  chrome. Use the icon set there.
- Cap at one emoji per list item.

---

## Two floors nothing may cross

Measured on a 360px Android during the landing-page build. These are floors, not
suggestions, and they are in `tokens.css` as `--te-fs-bn-min` and `--te-fs-micro`.

| | Floor | Token | Why |
|---|---|---|---|
| **Bangla running text** | 17px | `--te-fs-bn-min` | Bangla conjuncts stack vertically. At the same nominal size as Latin, Bangla reads a full size smaller - matching the numbers is what made bilingual inclusion lists unreadable. |
| **Any Latin UI text** | 13px | `--te-fs-micro` | Below 13px, uppercase tracking closes up and labels stop being scannable. Applies to overlines, badges, chips, captions, field hints and footer meta. |

Bangla chips, badges and single-word labels may drop one step to **16px**
(`--te-fs-bn-ui-min`, class `.bn-ui`) and no lower.

Bangla running text also carries `font-weight: 500`, not 400: on Night Ocean the
400 cut of Hind Siliguri loses its thin strokes.

### The overline was too small

`0.75rem` at `0.12em` failed first in testing. The label now sits at **13px /
0.09em**: bigger type, *less* tracking. Wider tracking on small type does not add
clarity, it adds distance between letters that were already too small to group.
On viewports under 640px the tracking relaxes further, to `0.07em`.

---

## Load variable ranges, not static cuts

```html
<!-- right -->
family=Plus+Jakarta+Sans:wght@700..800&family=Inter:wght@400..700&family=Hind+Siliguri:wght@400;500;600

<!-- wrong: 550 and 650 silently round to the nearest cut -->
family=Inter:wght@400;500;600;700
```

The component specs use `550` and `650` deliberately - they are the weights that
keep dense UI text from looking either flimsy or shouty. Those weights only exist
if the browser gets a **variable** font. Both Latin families have variable builds;
ask for ranges.

Hind Siliguri has **no** variable build, so Bengali ships exactly three static
weights (400, 500, 600). A Bengali cut is roughly six times the payload of a Latin
one - a fourth weight costs more than everything else on the page put together.
