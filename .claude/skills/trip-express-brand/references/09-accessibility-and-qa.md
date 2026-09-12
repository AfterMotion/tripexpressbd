# 09 — Accessibility & QA

Target: **WCAG 2.2 Level AA**.

---

## 1. Contrast — the pre-computed safe list

**Approved text pairings (light theme)**

| Foreground | Background | Ratio | Sizes |
|---|---|---|---|
| `#1B2330` n-900 | `#FFFFFF` | 15.79 | all |
| `#3F4A5A` n-700 | `#FFFFFF` | 8.98 | all |
| `#556274` n-600 | `#FFFFFF` | 6.20 | all — **this is the muted-text token** |
| `#6F7D90` n-500 | `#FFFFFF` | 4.19 | large only (≥24px, or ≥19px bold) — never for captions, routes or prices |
| `#A45826` orange-700 | `#FFFFFF` | 5.25 | all |
| `#316896` blue-700 | `#FFFFFF` | 5.91 | all |
| `#25517B` deep-700 | `#FFFFFF` | 8.26 | all |
| `#111823` n-950 | `#ED7C30` orange-500 | 5.66 | all |
| `#FFFFFF` | `#25517B` deep-700 | 8.26 | all |
| `#FFFFFF` | `#3171AE` deep-500 | 5.12 | all |
| `#15784F` | `#E7F7F0` | 5.13 | all |
| `#B02E2E` | `#FDECEC` | 5.83 | all |

**Approved text pairings (dark theme, on `#132436`)**

| Foreground | Ratio | Sizes |
|---|---|---|
| `#FFFFFF` | 15.75 | all |
| `#C6CFDA` n-300 | 10.00 | all |
| `#ACD0ED` blue-300 | 9.75 | all |
| `#F2A16A` orange-400 | 7.56 | all |
| `#ED7C30` orange-500 | 5.65 | all |
| `#8FA3B8` | 6.14 | all |

**Banned pairings**

| Foreground | Background | Ratio | Why |
|---|---|---|---|
| `#FFFFFF` | `#ED7C30` | 2.79 | Fails AA at every size |
| `#FFFFFF` | `#C96A2B` orange-600 | 3.76 | Large text only, and still avoid |
| `#FFFFFF` | `#4394D5` blue-500 | 3.26 | Fails AA for body |
| `#ED7C30` | `#FFFFFF` | 2.79 | Orange text on white |
| `#9AA6B6` n-400 | `#FFFFFF` | 2.47 | Placeholder-only, never content |
| `#A45826` orange-700 | `#132436` | 3.51 | Dark-theme text |

Non-text contrast (borders, icons, focus rings, chart strokes) needs **3:1**.
`#C6CFDA` n-300 on white is 1.57 — acceptable as a decorative hairline, **not** as
the only indicator of an input boundary. Input borders use `#C6CFDA` plus a visible
label; a focused or errored state raises the border to a 3:1 colour.

---

## 2. Focus

- Every interactive element has a visible `:focus-visible` state.
- Ring: `outline: 3px solid #3171AE; outline-offset: 2px;`
- On `deep-950` surfaces: `outline-color: #ACD0ED`.
- On `orange-500` surfaces: `outline-color: #111823`.
- Never `outline: none` without an equivalent replacement.
- Focus must not be clipped — parents of focusable items avoid `overflow: hidden`
  on the axis where the ring extends, or use `outline-offset: -3px` inset rings.
- A visible skip link ("Skip to content") is the first focusable element,
  positioned off-screen until focused, then pinned top-left with an `orange-500`
  background and `n-950` ink.

---

## 3. Motion safety

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Additionally, under reduced motion:

- Hero video does not autoplay; the poster frame shows with a play control
- Count-up statistics render at their final value immediately
- Scroll-triggered "depart" reveals render at full opacity with no transform
- Carousels do not auto-advance

Never trigger a parallax effect stronger than 20px of travel. Never use a flashing
element faster than 3Hz.

---

## 4. Semantics and structure

- One `<h1>` per page, and it matches the page title intent.
- Heading levels never skip.
- The itinerary accordion uses `<button aria-expanded>` plus a region, not a div.
- The gallery lightbox is a `role="dialog" aria-modal="true"` with a focus trap and
  focus returned to the triggering thumbnail on close.
- Decorative textures carry `aria-hidden="true"` and `pointer-events: none`.
- Icon-only buttons carry an `aria-label`; the floating WhatsApp button reads
  "Chat with Trip Express BD on WhatsApp".
- Package cards use a stretched-link pattern so the card is one accessible link,
  not a link nested inside a link.
- Prices in tables use `<td>` with `tabular-nums`, and column headers are `<th scope>`.

---

## 5. Language attributes

- `<html lang="en">` when the page is primarily English, `lang="bn"` when Bangla.
- **Every** Bangla run inside an otherwise-English page is wrapped with `lang="bn"`.
  This drives both the font stack and screen-reader pronunciation.
- Phone numbers in links use the full international form so voice control works.

---

## 6. Mobile and touch

- Minimum tap target 44×44 CSS px, with at least 8px between adjacent targets.
- Body text never below 16px (Bangla never below 17px).
- No horizontal scroll at 320px width.
- `user-scalable=no` is forbidden. Pinch-zoom stays available.
- Sticky elements must not consume more than 20% of viewport height on mobile —
  the header at 64px plus the WhatsApp disc is the budget; nothing else sticks.
- Form inputs use the correct `inputmode` and `autocomplete` so Android keyboards
  behave.

---

## 7. Performance budget

Slow Android on a mobile network is the target device.

| Metric | Budget |
|---|---|
| LCP | < 2.5s on 4G |
| CLS | < 0.05 |
| INP | < 200ms |
| Hero image | < 200KB webp |
| Total fonts | < 180KB (4 families, subset Latin + Bengali) |
| JS on the landing page | < 120KB gzipped |

Rules:

- Preload the hero image and the two display-font files only.
- Every image has explicit `width`/`height` or an `aspect-ratio` to prevent CLS.
- `font-display: swap`, with the metric-compatible fallback stacks from
  `03-typography.md` to limit layout shift on swap.
- Do not ship the logo as a 2048px JPEG. SVG in the header, sized icons elsewhere.

---

## 8. Pre-ship QA checklist

**Brand**

- [ ] No white text on `#ED7C30` anywhere
- [ ] No `#000000` and no untinted grey
- [ ] Logo clear space respected; no effects applied to the mark
- [ ] Section dividers use 17°, not 45° or 0°
- [ ] Maximum two textures on the page
- [ ] White/near-white occupies roughly 60% of the visual field
- [ ] Every price carries the taka symbol and tabular numerals
- [ ] Overline plus flight rule present on each section header
- [ ] Only the four approved gradients used

**Typography**

- [ ] Bangla renders in Hind Siliguri at every size
- [ ] Bangla line-height is 1.85, no letter-spacing, no uppercase transform
- [ ] Measure is 68ch or less for Latin body, 62ch for Bangla
- [ ] No justified text, no italics

**Accessibility**

- [ ] All text pairings are on the approved list
- [ ] Visible focus on every interactive element
- [ ] `prefers-reduced-motion` honoured
- [ ] Heading order valid, one `h1`
- [ ] All Bangla runs tagged `lang="bn"`
- [ ] Lightbox traps and restores focus
- [ ] Tap targets 44px with 8px separation
- [ ] Keyboard-only pass completes every primary flow

**Content**

- [ ] Package pages carry all ten required blocks
- [ ] Inclusions and exclusions both present
- [ ] Booking deadline and payment terms present
- [ ] Every image has a descriptive `alt`
- [ ] All three phone numbers plus WhatsApp reachable from every page
- [ ] No invented statistics
