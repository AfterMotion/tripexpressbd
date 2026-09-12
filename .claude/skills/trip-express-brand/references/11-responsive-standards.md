# 11 — Responsive Standards (Mobile vs Desktop)

Mobile and desktop are **two designed experiences**, not one layout that shrinks.
This file gives each its own specification so that responsiveness, readability and
performance are decided here rather than discovered in production.

**Reference devices**

| Role | Device | Why |
|---|---|---|
| **Primary** | Mid-range Android, 360×800 CSS px, DPR 2–3, 4G | The actual majority of this audience |
| Secondary | iPhone 13/14, 390×844 | Second-largest share |
| Tablet | iPad, 768×1024 and 1024×768 | Both orientations |
| **Desktop baseline** | 1440×900 laptop | Design desktop at 1440, not 1920 |
| Wide | 1920×1080 | Must not look empty or stretched |

Design the **360px view first**, then 1440. Everything between is interpolation.

---

## 1. Breakpoints

```
xs    0–479      small phones           single column, 4-col grid
sm    480–639    large phones           single column, slightly larger type
md    640–1023   tablet / phone landscape   8-col grid, 2-up cards
lg    1024–1279  small laptop           12-col grid, 3-up cards
xl    1280–1535  desktop (baseline)     12-col, container 1200
2xl   1536+      wide                   12-col, container 1280 max, larger gutters
```

The **primary design break is `1024px`** — below it is "mobile behaviour", above it
is "desktop behaviour". `640px` and `1280px` are refinement breaks.

Rules:

- Never write a max-width-only media query as the primary strategy. Mobile-first
  `min-width` queries only, so the base styles are the mobile styles.
- Breakpoints are **layout** decisions. Capability decisions use
  `(pointer: coarse)`, `(hover: hover)`, `prefers-reduced-motion`, and the 3D tier —
  never viewport width.
- A 1024px tablet in landscape is *not* a desktop. Gate hover-dependent behaviour on
  `(hover: hover) and (pointer: fine)`.

---

## 2. Layout and spacing per breakpoint

| Token | xs / sm | md | lg | xl | 2xl |
|---|---|---|---|---|---|
| Columns | 4 | 8 | 12 | 12 | 12 |
| Gutter | 16px | 20px | 24px | 24px | 32px |
| Page margin | 20px | 32px | 40px | 48px | 64px |
| Container | fluid | fluid | 1120px | **1200px** | 1280px |
| Section padding Y | 64px | 80px | 96px | 112px | 112px |
| Card grid columns | 1 | 2 | 3 | 3 | 3 (4 for compact tiles) |
| Card gap | 16px | 20px | 24px | 24px | 24px |
| Stack gap (in-card) | 12px | 12px | 16px | 16px | 16px |

```css
--te-section-y: clamp(4rem, 8vw, 7rem);   /* 64px -> 112px */
--te-gutter: clamp(1rem, 2vw, 1.5rem);
--te-page-x: clamp(1.25rem, 4vw, 3rem);
```

**Mobile-specific**

- Minimum side margin is **20px**. Never less — content touching the screen edge
  reads as broken on Android.
- Never nest more than two levels of horizontal padding. Padding compounds and eats
  the 360px viewport fast.
- Full-bleed media escapes the container with a negative margin equal to the page
  margin, never with `100vw` (which triggers horizontal scroll when a scrollbar
  exists).
- Use `100dvh`, never `100vh`. `100vh` is wrong on mobile browsers with collapsing
  URL bars and causes the well-known jump.
- Respect safe areas on notched devices:
  `padding-bottom: max(20px, env(safe-area-inset-bottom))` on any fixed bottom
  element, including the floating WhatsApp button.

**Desktop-specific**

- Content never exceeds `1280px`; at 1920 the extra space becomes margin, not
  wider columns.
- Body copy never exceeds `68ch` even when the container is wide.
- Two-column editorial layouts split `7 / 5` or `8 / 4`, never `6 / 6` — an even
  split has no hierarchy.

---

## 3. Typography per breakpoint

The fluid `clamp()` scale in `03-typography.md` handles interpolation. These are
the resolved endpoints to verify against.

| Style | 360px | 768px | 1440px |
|---|---|---|---|
| `display-xl` | 44px | 56px | 72px |
| `display-lg` | 36px | 46px | 56px |
| `h1` | 30px | 38px | 44px |
| `h2` | 24px | 29px | 34px |
| `h3` | 20px | 23px | 26px |
| `h4` | 18px | 18px | 18px |
| `body-lg` | 18px | 18px | 18px |
| `body` | 16px | 16px | 16px |
| `body-sm` | 15px | 15px | 15px |
| `caption` | 14px | 14px | 14px |
| `overline` | 12px | 12px | 12px |
| `price-lg` | 24px | 28px | 32px |

**Mobile typography rules**

1. Body is **16px minimum**, always. 14px body is a readability and iOS-zoom bug.
2. Bangla body is **17px minimum** on mobile and never below 15px anywhere.
3. Headline tracking loosens as size drops: `display-xl` uses `-0.03em` at 72px but
   `-0.02em` at 44px. Tight tracking on small text hurts legibility.
4. Headlines wrap to a **maximum of 3 lines** at 360px. If a headline needs 4, the
   copy is too long — rewrite it, do not shrink the type.
5. Line length target is **32–40 characters** for mobile body; Bangla 28–34.
6. Never rely on `text-overflow: ellipsis` for a package title. Clamp to 2 lines with
   `-webkit-line-clamp` and make sure the full title is on the detail page.
7. Form inputs use **16px** font on mobile — anything smaller triggers iOS
   auto-zoom on focus.
8. `overline` labels stay 12px everywhere, but on mobile reduce tracking from
   `0.12em` to `0.10em` so the label does not wrap.

**Desktop typography rules**

- `display-xl` is reserved for the homepage hero only. One per site.
- Measure caps at `68ch` (Latin) / `62ch` (Bangla) regardless of container width.
- Multi-column text is banned — it breaks on every mixed-script paragraph.

---

## 4. Component behaviour: mobile vs desktop

| Component | Mobile (< 1024px) | Desktop (≥ 1024px) |
|---|---|---|
| **Header** | 64px, logo disc + wordmark (if ≥ 380px), WhatsApp icon, hamburger | 84px → 64px on scroll, full lockup, nav links, phone, Book Now button |
| **Nav** | Right-slide drawer, 88% width, full-size tap rows (56px), Bangla labels included | Inline links with 3px orange active underline; hover dropdowns |
| **Hero** | 4:5 media, text below media, single CTA, 3D simplified or static | 21:9 media, text overlaid left, two CTAs, full 3D scene |
| **Package cards** | 1 column, full-width, image 16:10, price and CTA stacked | 3 columns, hover lift `translate(2px,-6px)`, price and CTA side by side |
| **Destination tiles** | Horizontal scroll-snap rail, 96px discs, 16px gap, edge-peek next item | 4–6 disc grid, 128px, hover ring turns orange |
| **Itinerary** | Accordion, one day open, chips above route text | Accordion with a left timeline rail, first day open, sticky day index |
| **Gallery** | 1 column masonry (or 2 at ≥ 480px), tap opens lightbox | 3 column masonry, hover scale 1.03, click opens lightbox |
| **Lightbox** | Full screen, swipe left/right, 44px close disc top-right | Centred, max 92vh, arrow keys, click-outside to close |
| **Inclusions** | Stacked single column | Two columns |
| **Stats** | 2×2 grid | 4 across with vertical rules |
| **Footer** | Accordion sections, contact block always expanded | 4 columns, all expanded |
| **Filters** | Bottom sheet, "Apply" button, sticky result count | Inline sidebar or top filter bar, applies instantly |
| **Forms** | Single column, full-width inputs, 48px height, sticky submit on long forms | Two-column where fields are short (name/phone), 48px height |
| **WhatsApp CTA** | Floating 56px disc, bottom-right, above safe-area inset | Floating 56px disc, plus inline buttons in cards |
| **Tables (price/compare)** | Card-per-row transformation, never a scrolling table | Real table, sticky header row |

**Touch-specific rules**

- **Hover does not exist.** Every hover affordance needs a touch equivalent:
  card lift → active-press state; hover reveal → always visible; tooltip → tap
  disclosure. Wrap hover styles in `@media (hover: hover) and (pointer: fine)`.
- Tap targets 44×44 minimum with 8px separation. On horizontal rails, the first item
  starts at the page margin and the rail scrolls edge-to-edge.
- Avoid gestures that conflict with browser navigation: no horizontal swipe at the
  left screen edge, no pull-down gesture at scroll-top.
- Provide a visible pressed state (`:active`) on every button — Android users rely
  on it because there is no hover feedback.
- Scroll rails use `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`,
  and hide the scrollbar without removing keyboard scrollability.

---

## 5. Image treatment per breakpoint

Art direction is required — the same crop does not work at 21:9 and 4:5.

| Placement | Mobile crop | Desktop crop | Mobile max weight |
|---|---|---|---|
| Hero | `4:5` (portrait, subject centred) | `21:9` | 120KB |
| Package card | `16:10` | `16:10` | 60KB |
| Destination disc | `1:1` | `1:1` | 20KB |
| Trip header | `4:3` | `3:2` | 90KB |
| Gallery item | native, max 1200px long edge | native, max 1600px | 70KB |

```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-wide.webp 1600w, hero-wide@2x.webp 2400w" sizes="100vw">
  <source media="(max-width: 1023px)" srcset="hero-tall.webp 720w, hero-tall@2x.webp 1080w" sizes="100vw">
  <img src="hero-wide.jpg" width="1600" height="686" alt="…" fetchpriority="high" decoding="async">
</picture>
```

Rules:

- Every `<img>` carries explicit `width`/`height` or `aspect-ratio`. CLS budget is
  `0.05` and unsized images are the usual cause.
- `loading="lazy"` everywhere below the fold; `fetchpriority="high"` on the hero only.
- WebP with a JPEG fallback; AVIF optional where the build supports it.
- Never serve a 2400px image to a 360px viewport. `sizes` must be accurate.
- **Faces must survive the crop.** For any group photo, define a focal point and use
  `object-position` per breakpoint rather than letting `cover` centre-crop heads off.
- Text over images uses `--te-scrim`; on mobile the scrim height increases to **60%**
  because the text block is proportionally larger.
- Background-attachment fixed / parallax backgrounds are **banned on mobile** —
  they stutter on Android and break on iOS.

---

## 6. 3D per breakpoint

This is the highest-risk area. Specify it explicitly, per screen.

| Aspect | Mobile (< 1024px, or `pointer: coarse`) | Desktop (≥ 1024px, `pointer: fine`) |
|---|---|---|
| Default behaviour | **Simplified scene or static fallback** | Full scene |
| WebGL contexts | 1, and only for the hero | 1 shared |
| Camera FOV | 45° | 35° |
| Canvas height | ≤ 55dvh; never full-screen | up to 100dvh for the hero |
| DPR cap | 1.5 | 2.0 |
| Triangles | ≤ 80k | ≤ 350k |
| Draw calls | ≤ 45 | ≤ 120 |
| Lights | 2 + ambient | 3 + ambient |
| Shadows | 0 (baked contact shadow plane) | 1 shadow map |
| Post-processing | **none** | ≤ 3 passes |
| Pointer parallax | **disabled** | ≤ 2.5° rotation, ±12px |
| Gyroscope input | **banned** | n/a |
| Orbit controls | Drag only, zoom disabled, clamped polar angle | Drag + wheel zoom, clamped |
| Scroll-driven camera | Simplified: 2 keyframes maximum | Full path along the Flight Angle |
| 3D payload | ≤ 1.2MB | ≤ 3.5MB |
| Target frame time | ≤ 16ms | ≤ 8ms |
| Fallback trigger | FPS < 40 for 2s, `deviceMemory < 4`, `saveData`, or context loss | FPS < 45 for 2s, or context loss |

**Mobile 3D rules**

1. The 3D canvas never occupies the full viewport on a phone. The user must see DOM
   content and be able to scroll past without fighting the canvas.
2. `touch-action` on the canvas must allow vertical page scroll. A 3D canvas that
   swallows a scroll gesture is a shipping blocker. Use
   `touch-action: pan-y` and only capture horizontal drag.
3. Components 10.2 (Globe), 10.4 (Photo Prism) and 10.5 (Terrain Card) from
   `10-3d-and-threejs.md` are **replaced by their DOM equivalents on mobile**, not
   shrunk.
4. Never initialise WebGL on `navigator.connection.saveData === true`.
5. The 3D bundle is dynamically imported after first interaction on mobile, never
   during initial load.
6. Battery and thermals: pause the loop off-screen and on tab hide; cap the frame
   rate at 30fps on mobile if the scene is ambient rather than interactive.

**Desktop 3D rules**

- Hero 3D may be full-viewport, but DOM text sits above it with a scrim or panel and
  must meet contrast at every camera position.
- Wheel events over the canvas still scroll the page unless the user is inside an
  explicit orbit viewer.
- At `2xl`, do not scale the scene up indefinitely — cap camera distance so the
  composition stays as designed at 1440.

---

## 7. Motion per breakpoint

| Aspect | Mobile | Desktop |
|---|---|---|
| Entrance reveals | Fade + 8px rise only | Full `te-depart` (−14px, +10px) |
| Stagger | 40ms, capped at 4 items | 60ms, capped at 6 items |
| Card hover | none (use `:active` press, `scale(0.98)`) | `translate(2px, -6px)` + shadow |
| Image reveal | opacity only | scale 1.06 → 1.0 |
| Parallax | **banned** | ≤ 20px travel |
| Scroll smoothing (Lenis) | **off** | on, off under reduced motion |
| Sticky header | compress only, no blur if FPS is marginal | compress + blur + shadow |
| Count-up stats | run once, 1.2s | run once, 1.6s |
| Page transitions | cross-fade 180ms | cross-fade 260ms |

Under `prefers-reduced-motion`, both columns collapse to: no transforms, no
parallax, no reveals, instant final state. See `09-accessibility-and-qa.md §3`.

---

## 8. Performance budget per breakpoint

| Metric | Mobile (4G, mid-range Android) | Desktop (broadband) |
|---|---|---|
| LCP | < 2.5s | < 1.8s |
| CLS | < 0.05 | < 0.05 |
| INP | < 200ms | < 150ms |
| TBT | < 200ms | < 150ms |
| HTML + CSS | < 60KB gzipped | < 80KB |
| JS (initial route) | < 120KB gzipped | < 180KB |
| 3D bundle (lazy) | < 220KB gzipped | < 320KB |
| Fonts | < 180KB (4 families, subset) | < 180KB |
| Hero image | < 120KB | < 220KB |
| Total initial page weight | **< 700KB** | < 1.4MB |

Enforcement:

- The 3D bundle is always a separate dynamic chunk and never counts toward initial JS.
- Fonts are subset to Latin + Bengali ranges, `font-display: swap`, preloaded for the
  two display faces only.
- Third-party scripts (analytics, chat widgets, pixels) load after `load` and are
  capped at 40KB total. A marketing pixel must never delay LCP.
- Run the mobile budget check on a throttled 4G profile with 4× CPU slowdown, not on
  a desktop simulation.

---

## 9. Orientation and edge cases

- **Phone landscape (height < 480px):** reduce section padding to 40px, collapse the
  sticky header to 52px, cap the hero at 100dvh, and suppress full-screen 3D.
- **Tablet portrait (768×1024):** uses the `md` 8-column grid with 2-up cards, not
  the desktop 3-up. Nav stays in the drawer.
- **Tablet landscape (1024×768):** desktop layout, but hover behaviour is gated on
  `(hover: hover)` so a touch tablet does not get hover-only affordances.
- **Foldables and 320px:** the layout must not break at 320px. Test it.
- **Zoom to 200%:** content must remain readable with no horizontal scroll
  (WCAG 1.4.10 reflow). This effectively means the 360px layout must work at a
  720px viewport zoomed 200%.
- **Dark mode at every breakpoint:** the dark palette from `02-color.md` applies
  identically; do not ship a light-only mobile view.
- **Slow network:** under `saveData` or `effectiveType` of `2g`/`slow-2g`, skip 3D,
  skip hero video, and serve the smallest image set.

---

## 10. Responsive QA checklist

**Layout**

- [ ] No horizontal scroll at 320px, 360px, 390px, 768px, 1024px, 1440px, 1920px
- [ ] Side margins ≥ 20px on mobile at every section
- [ ] `100dvh` used, never `100vh`
- [ ] Safe-area insets respected on fixed bottom elements
- [ ] Container capped at 1280px; body copy capped at 68ch
- [ ] Readable and scrollable at 200% browser zoom

**Typography**

- [ ] Body ≥ 16px, Bangla body ≥ 17px on mobile
- [ ] Form inputs 16px (no iOS auto-zoom)
- [ ] No headline wraps past 3 lines at 360px
- [ ] Bangla line-height 1.85 at every breakpoint
- [ ] Resolved sizes match the §3 endpoint table at 360 / 768 / 1440

**Interaction**

- [ ] Every hover affordance has a touch equivalent
- [ ] All hover styles gated on `(hover: hover) and (pointer: fine)`
- [ ] Tap targets ≥ 44px with ≥ 8px separation
- [ ] Visible `:active` state on every button
- [ ] Horizontal rails snap, peek the next item, and do not trap vertical scroll

**Imagery**

- [ ] Art-directed crops per breakpoint via `<picture>`
- [ ] Every image has width/height or aspect-ratio
- [ ] `sizes` is accurate; no oversized download on mobile
- [ ] Faces survive every crop
- [ ] No fixed-attachment backgrounds on mobile

**3D**

- [ ] Canvas ≤ 55dvh on mobile and never blocks vertical scroll
- [ ] `touch-action: pan-y` verified by scrolling through the hero on a real phone
- [ ] Mobile: 0 post passes, 0 shadow maps, DPR ≤ 1.5, ≤ 80k triangles
- [ ] Globe / Photo Prism / Terrain Card swapped for DOM equivalents on mobile
- [ ] 3D bundle dynamically imported, absent from the initial chunk
- [ ] WebGL skipped under `saveData`
- [ ] Auto-downgrade fires when FPS drops; no upgrade mid-session
- [ ] Loop pauses off-screen and on tab hide

**Performance**

- [ ] Mobile LCP < 2.5s on throttled 4G with 4× CPU slowdown
- [ ] CLS < 0.05 on both mobile and desktop
- [ ] Total initial mobile page weight < 700KB
- [ ] Tested on a real mid-range Android device, not only in a simulator
