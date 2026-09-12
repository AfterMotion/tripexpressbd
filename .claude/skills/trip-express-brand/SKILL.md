---
name: trip-express-brand
description: Complete brand, design, 3D and responsive system for Trip Express BD (Chattogram travel agency, tripexpressbd). Use whenever building, restyling, reviewing, or generating ANY Trip Express BD web page, section, component, landing page, package card, portfolio/gallery, Three.js/WebGL scene, animation, responsive layout, email, social graphic, or asset. Supplies the exact logo-derived palette, bilingual Bangla/English typography, the 17-degree Flight Angle system, textures, motion, component specs, imagery direction, voice, accessibility rules, Three.js colour/light/material/performance standards, and separate mobile vs desktop specifications. Trigger on "Trip Express", "tripexpressbd", "trip express bd", travel agency site work in this repo, or any request mentioning brand colors, brand guidelines, the logo, 3D/Three.js/WebGL for this site, or responsive behaviour for this site.
---

# Trip Express BD — Brand & Design System

Single source of truth for every visual and verbal decision on the Trip Express BD
website and its portfolio. **Do not invent colors, fonts, radii, or spacing.** If a
value is not in this skill, derive it from the rules here and then record it.

Everything below was measured from `assets/logo-primary.jpg` (2048×2048) and from the
brand's own published content. Nothing is guessed.

---

## 0. How to use this skill

1. Read this file first — it carries the non-negotiable core.
2. Load the reference file for the job at hand:

| Task | Read |
|---|---|
| Brand story, positioning, facts, destinations | `references/01-brand-foundation.md` |
| Any color decision, dark mode, gradients | `references/02-color.md` |
| Fonts, scale, Bangla typography, numerals | `references/03-typography.md` |
| Logo placement, clear space, lockups, favicon | `references/04-logo.md` |
| Grid, spacing, radii, elevation, motion | `references/05-layout-and-motion.md` |
| Buttons, cards, nav, forms, package cards | `references/06-components.md` |
| Photos, portfolio/gallery, textures, patterns | `references/07-imagery-and-texture.md` |
| Copy, headlines, bilingual rules, CTAs | `references/08-voice-and-content.md` |
| Contrast, focus, motion safety, QA checklist | `references/09-accessibility-and-qa.md` |
| **Three.js, WebGL, 3D scenes, shaders, perf tiers** | `references/10-3d-and-threejs.md` |
| **Mobile vs desktop specs, breakpoints, responsive QA** | `references/11-responsive-standards.md` |

3. Import tokens rather than hardcoding: `assets/tokens.css`,
   `assets/tailwind.tokens.js`, `assets/brand.tokens.json`.
   For any 3D work, import `assets/three.brand.js` — never hardcode a colour,
   light, camera or budget into a scene.

---

## 1. Brand in one line

> **Trip Express BD** — a Chattogram-based, community-run travel agency that takes
> Bangladeshi travellers on group tours across South Asia and beyond, and comes back
> with the photographs to prove it.

Personality: **warm, trustworthy, energetic, local, proof-driven.**
Not: corporate, luxury-aloof, discount-shouty, stock-photo generic.

---

## 2. The logo, decoded

The mark is a **split disc**: a warm land/sunset hemisphere above, a cool water
hemisphere below, cut by a white aircraft streaking upward to the right.

| Element | Meaning | Colour |
|---|---|---|
| Upper disc | Sun / sunset / land | Sunset Orange |
| Mountains | Kashmir, Meghalaya, Himalaya | Sand Orange (tint) |
| Palms + minibus | Overland & domestic tours | White |
| Aircraft (white body, blue underwing) | Air packages, the "Express" | White + Deep Ocean |
| Lower disc | Sea, lakes, rivers | Sky Blue |
| Kayak + waves | Water experiences | White + Sea Shadow |

**The three ideas the whole site must repeat: the split, the disc, the flight angle.**

---

## 3. Core palette — measured from the logo

These six are the brand. Full 50→950 ramps and dark mode live in
`references/02-color.md`.

| Token | Hex | Role |
|---|---|---|
| `--te-orange-500` **Sunset Orange** | `#ED7C30` | Primary brand colour. CTAs, highlights, the warm half. |
| `--te-orange-400` **Sand Orange** | `#F2A16A` | Logo mountain tint. Gradients, dark-mode text accent. |
| `--te-blue-500` **Sky Blue** | `#4394D5` | Secondary. Water, links, informational accents. |
| `--te-deep-500` **Deep Ocean** | `#3171AE` | Anchor blue. Headers, footers, secondary buttons. |
| `--te-deep-950` **Night Ocean** | `#132436` | Darkest surface. Dark sections, footer, overlays. |
| `--te-white` **Horizon White** | `#FFFFFF` | The logo's negative space. Never off-white for the mark. |

### The one contrast rule you must not break

`#FFFFFF` on `#ED7C30` is **2.79:1 — it fails WCAG AA.**

- **Primary button = Sunset Orange background + `#111823` ink text** (5.66:1 ✓)
- Orange text on white must be `--te-orange-700` `#A45826` (5.25:1 ✓)
- White text on blue must be `--te-deep-700` `#25517B` (8.26:1 ✓) or darker

---

## 4. The Flight Angle — the signature device

Measured from the logo's aircraft streak: **17°**, rising left → right.

```css
--te-flight-angle: 17deg;
--te-flight-angle-neg: -17deg;
```

Use it for: section dividers, the sunset/sea gradient direction, hero clip-paths,
underline swashes, badge skews, card hover lift direction, and the motion path of
anything that "departs".

Never use 45°, never use a horizontal-only divider on a hero. The site should feel
like it is always climbing slightly to the right.

The mark's disc is **76.6% of its canvas**, centre slightly right and above middle —
respect that when cropping (see `references/04-logo.md`).

---

## 5. Typography — non-negotiable

The audience reads **Bangla and English in the same paragraph**. The type system is
bilingual by default.

| Role | Family | Weights |
|---|---|---|
| Display / headings (Latin) | **Plus Jakarta Sans** | 700, 800 |
| Body / UI (Latin) | **Inter** | 400, 500, 600 |
| All Bangla (display + body) | **Hind Siliguri** | 400, 500, 600, 700 |
| Numerals, prices, dates | Inter, `font-variant-numeric: tabular-nums` | 600 |

Never set Bangla in a Latin-only face — it falls back and breaks conjuncts.
Full stacks, fluid scale, and line-height rules: `references/03-typography.md`.

---

## 6. Shape language

- **Disc**: perfect circles for avatars, icon chips, destination bubbles, badges.
- **Hard angles**: the logo has no soft corners on its vehicles — keep radii modest.
- Radii: `--te-r-sm 8px`, `--te-r-md 12px`, `--te-r-lg 16px`, `--te-r-xl 24px`,
  `--te-r-pill 999px`, `--te-r-disc 50%`.
- Buttons are **pill**. Cards are **16px**. Images in cards are **12px**.
- Shadows are **tinted with Deep Ocean**, never neutral black.

---

## 7. 3D in one page

The site is 3D-heavy by design. The 3D world is **the logo extruded into space**:
warm sun above, cool water below, a white flight path climbing at 17°.

| Decision | Standard |
|---|---|
| Colour pipeline | `ColorManagement.enabled = true`; brand hexes declared as sRGB via `setHex(hex, SRGBColorSpace)` |
| Tone mapping | **`NeutralToneMapping`** at exposure `1.0`, and `toneMapped: false` on flat brand-colour elements. **ACESFilmic is banned** — measured, it renders `#ED7C30` as `#E8903A` |
| Light rig | Key warm (`#F2A16A`, upper-right, climbing at 17°), fill cool (`#4394D5`/`#3171AE` hemisphere), rim white. Ambient ≤ `0.25` |
| Materials | `MeshStandardMaterial`, `metalness: 0`, `roughness ≥ 0.35`, flat-shaded low-poly. No chrome, glass, iridescence or toon outlines |
| Palette | The six brand colours plus white. **No seventh hue in any scene** |
| Camera | FOV 35 desktop / 45 mobile, max 50, **roll always 0**, never animate FOV |
| Post | Desktop: subtle bloom, vignette, DOF/SSAO at high tier. Mobile: **none**. Banned everywhere: chromatic aberration, grain, glitch, motion blur, lens flare, LUT grading |
| Contexts | **One WebGL context per page.** Never one per card |
| Status | 3D is a **progressive enhancement**. WebGL off must still leave a complete, bookable page |

Full geometry vocabulary, approved component catalogue, budgets, disposal and QA:
`references/10-3d-and-threejs.md`.

**Verify before styling anything:** render a flat `#ED7C30` quad with
`toneMapped: false` and read the **default framebuffer** back (a render target is
linear and will read `#D83308`). It must return `#ED7C30 ± 2`.
`verifyBrandColour()` in `assets/three.brand.js` does this.

---

## 8. Responsive in one page

Mobile and desktop are **two designed experiences**, not one layout that shrinks.
Design 360px first, then 1440px. The primary break is **1024px**.

| | Mobile (< 1024px / `pointer: coarse`) | Desktop (≥ 1024px / `pointer: fine`) |
|---|---|---|
| Grid | 4–8 col, 20–32px margin, cards 1–2 up | 12 col, container 1200, cards 3 up |
| Body type | 16px Latin / **17px Bangla** minimum | 16px Latin / 17px Bangla |
| Hero media | `4:5` portrait, text below | `21:9`, text overlaid |
| Hover | **Does not exist** — every hover needs a touch equivalent | Card lift `translate(2px, -6px)` |
| Parallax | **Banned** | ≤ 20px travel |
| 3D canvas | ≤ **55dvh**, `touch-action: pan-y`, DPR ≤ 1.5, 0 shadows, 0 post passes, ≤ 80k tris | Up to 100dvh, DPR ≤ 2, 1 shadow map, ≤ 3 passes, ≤ 350k tris |
| 3D components | Globe / Photo Prism / Terrain Card **swap to DOM equivalents** | Full WebGL |
| Page weight | **< 700KB** initial, LCP < 2.5s on throttled 4G | < 1.4MB, LCP < 1.8s |

Use `100dvh`, never `100vh`. Respect `env(safe-area-inset-bottom)`. Gate hover
styles on `@media (hover: hover) and (pointer: fine)`. Tap targets 44px with 8px
separation.

Full breakpoint tables, per-component behaviour matrix, image art direction and
the responsive QA checklist: `references/11-responsive-standards.md`.

---

## 9. Hard rules (violations are bugs)

1. Never place white text directly on `#ED7C30`.
2. Never recolour, rotate, outline, or add effects to the logo mark.
3. Never use pure black `#000000` anywhere. Darkest ink is `#111823`.
4. Never use a stock-looking generic travel photo where a real tour photo exists.
5. Never render Bangla in Inter or Plus Jakarta Sans.
6. Never use a gradient that mixes orange and blue through grey — use the
   prescribed Horizon Gradient stops.
7. Every price shows the `৳` symbol and tabular numerals.
8. Every package card must carry a WhatsApp CTA — it is the brand's real conversion path.
9. Dividers and hero cuts use 17°, not 45°, not 0°.
10. Dark sections use `--te-deep-950`, not neutral-950.
11. Never ship a 3D scene without `ColorManagement.enabled` and Neutral tone mapping.
12. Never extrude the logo into 3D, and never render text in WebGL.
13. Never let a 3D canvas block vertical scroll or exceed 55dvh on mobile.
14. Never make 3D load-blocking — the DOM paints first, the canvas attaches second.
15. `prefers-reduced-motion` renders a static frame. No exceptions, no "play anyway" nag.
16. Never use `100vh` on mobile — always `100dvh`.
17. Never ship a hover-only affordance without a touch equivalent.

---

## 10. Brand facts (use verbatim)

- **Name:** Trip Express BD (never "TripExpress", never "Trip Express Bangladesh")
- **Home:** Chattogram (Chittagong) 4202, Bangladesh
- **Office:** 1301, Mosjid Goli, Dui Number Gate, Chattogram — opposite Sermon School
- **Phones:** 01621-785968 · 01838-754207 · 01840-004495
- **WhatsApp:** wa.me/+8801838754207
- **Email:** tripexpressb@gmail.com
- **Signature destinations:** Kashmir, Meghalaya/Shillong, Sikkim, Darjeeling, Nepal
  (Kathmandu–Nagarkot–Pokhara), Kolkata, Maldives, Sri Lanka

More in `references/01-brand-foundation.md`.
