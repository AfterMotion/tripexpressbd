# Trip Express BD - Design System Architecture (Gate 2 Review)

**Version:** `2.0.0-gate2`  
**Authoritative Inputs:** [BRAND_GUIDELINES.md](file:///D:/my-project/tripexpessbd.com/docs/BRAND_GUIDELINES.md), [BRAND_FOUNDATIONS.json](file:///D:/my-project/tripexpessbd.com/docs/BRAND_FOUNDATIONS.json)  
**Token Artifacts:** [design-tokens.json](file:///D:/my-project/tripexpessbd.com/tokens/design-tokens.json), [tokens.css](file:///D:/my-project/tripexpessbd.com/tokens/tokens.css), [themes.css](file:///D:/my-project/tripexpessbd.com/tokens/themes.css), [tailwind.tokens.js](file:///D:/my-project/tripexpessbd.com/tokens/tailwind.tokens.js)  
**Target Contexts:** Public marketing site · Authenticated customer portal · Complex booking/visa forms · Data-dense operations & accounting admin panels.

---

## 1. Three-Layer Token Architecture

Every visual decision flows strictly downward through three non-duplicating layers. **Components must never reference raw HEX values or Layer 1 color primitives directly.**

```
Layer 1: PRIMITIVES   (tokens/tokens.css :: --te-p-*)
   Raw color ramps (orange/sky/ocean/neutral/green/amber/red/wa), numeric scales, font stacks
         ↓  referenced only by Semantic aliases
Layer 2: SEMANTICS    (tokens/themes.css :: --te-bg-*, --te-surface-*, --te-text-*, --te-action-*, --te-status-*)
   Intent & theme-aware aliases (Light, Night Ocean Dark, High Contrast, Comfortable/Compact Density)
         ↓  inherited by Component tokens
Layer 3: COMPONENTS   (tokens/tokens.css :: --te-btn-*, --te-input-*, --te-table-*, --te-nav-*, --te-card-*)
   Component-specific styling hooks with zero hardcoded values
```

### 1.1 Naming Convention
- **CSS Custom Properties:** `--te-{layer}-{category}-{item}-{variant}-{state}`
  - Primitive layer uses `-p-`: `--te-p-orange-500`, `--te-p-space-4`, `--te-p-r-lg`.
  - Semantic layer drops `-p-`: `--te-bg-canvas`, `--te-text-heading`, `--te-action-primary-bg-hover`.
  - Component layer namespaces by component: `--te-btn-primary-bg`, `--te-input-border-error`, `--te-table-row-selected-bg`.
- **W3C DTCG JSON (`tokens/design-tokens.json`):** Uses `$value`, `$type`, `$description` with `{primitive.*}` and `{semantic.*}` pointer aliases.
- **Tailwind (`tokens/tailwind.tokens.js`):** Maps Tailwind `theme.extend` keys directly to CSS variables (`var(--te-*)`) so theme/contrast/density switching works at runtime without rebuilding CSS.

---

## 2. Themes, High-Contrast Mode & WCAG 2.2 AA Verification

### 2.1 Light & Night Ocean Dark Parity
- **Light Theme (`:root, [data-theme="light"]`):** 60% `#FFFFFF` canvas, `#F7F9FB` subtle sections, `#FEF8F5` warm bands, `#F6FAFD` cool bands, `#111823` darkest ink.
- **Night Ocean Dark Theme (`[data-theme="dark"]` & `@media (prefers-color-scheme: dark)`):** Anchored to `#132436` (`ocean-950`), elevated cards `#1A2E43`, raised headers/toolbars `#21384F`, body `#C6CFDA`, headings `#FFFFFF`, overlines `#F2A16A`, links `#ACD0ED`.
- **Parity Guarantee:** Both dark selectors define the exact same set of semantic tokens so light-section bands never keep dark ink or vice versa.

### 2.2 High-Contrast Considerations (`[data-contrast="high"]` & `@media (prefers-contrast: more)`)
- Strengthens hairline borders from `1px` to `1.5px` (`--te-p-bw-emphasis`).
- Upgrades `--te-border-subtle` from `#DFE5EC` (`1.27:1`) to `#556274` (`6.20:1` light) / `#A4C1DB` (`8.42:1` dark).
- Upgrades body/muted text to `#1B2330`/`#3F4A5A` (light) and `#FFFFFF`/`#DFE5EC` (dark).
- Increases `--te-focus-offset` from `2px` to `3px` with solid `3px` outline.

### 2.3 Pre-Computed Contrast Audit (All States Verified)

| Pairing | Foreground | Background | Ratio | WCAG 2.2 AA |
|---|---|---|---|---|
| Primary CTA Default | `#111823` | `#ED7C30` | **6.39:1** | PASS (Normal & Large) |
| Primary CTA Hover (Light) | `#111823` | `#C96A2B` | **4.73:1** | PASS (Normal & Large) |
| Primary CTA Hover (Dark) | `#111823` | `#F2A16A` | **8.55:1** | PASS (AAA) |
| Primary CTA Pressed (Dark) | `#111823` | `#F7C5A4` | **11.43:1** | PASS (AAA) |
| **BANNED:** White on Primary Orange | `#FFFFFF` | `#ED7C30` | **2.79:1** | **FAIL - Forbidden** |
| Secondary CTA Default | `#FFFFFF` | `#25517B` | **8.26:1** | PASS (AAA) |
| Secondary CTA Hover | `#FFFFFF` | `#1E4162` | **10.57:1** | PASS (AAA) |
| Secondary CTA Pressed | `#FFFFFF` | `#19324C` | **13.11:1** | PASS (AAA) |
| Danger CTA Default / Hover | `#FFFFFF` | `#B02E2E` / `#8E2424` | **6.41:1 / 8.65:1** | PASS |
| Text Link (Light / Hover) | `#25517B` / `#A45826` | `#FFFFFF` | **8.26:1 / 5.25:1** | PASS |
| Text Link (Dark / Hover) | `#ACD0ED` / `#F2A16A` | `#132436` | **9.75:1 / 7.56:1** | PASS |
| Selected Table Row (Light / Dark) | `#25517B` on `#E6EEF5` / `#FFFFFF` on `#1E4162` | - | **7.05:1 / 10.57:1** | PASS |
| Read-Only Input (Light / Dark) | `#556274` on `#EFF3F7` / `#C6CFDA` on `#21384F` | - | **5.56:1 / 7.65:1** | PASS |
| Control Border (WCAG 1.4.11 ≥3:1) | `#6F7D90` on `#F7F9FB` / `#6B99C5` on `#132436` | - | **3.95:1 / 5.24:1** | PASS (Non-text ≥3:1) |
| Semantic Success (Light / Dark) | `#15784F` on `#E7F7F0` / `#6FD9AC` on `#14342A` | - | **4.95:1 / 7.85:1** | PASS |
| Semantic Warning (Light / Dark) | `#8A6100` on `#FFF6E0` / `#F3C969` on `#33280F` | - | **5.15:1 / 9.21:1** | PASS |
| Semantic Error (Light / Dark) | `#B02E2E` on `#FDECEC` / `#F3A3A3` on `#361B1B` | - | **5.61:1 / 7.96:1** | PASS |
| Semantic Info (Light / Dark) | `#25517B` on `#E6EEF5` / `#A4C1DB` on `#17304A` | - | **7.05:1 / 7.21:1** | PASS |
| WhatsApp Solid / Soft | `#0B3D22` on `#25D366` / `#10693C` on `#E4F8EC` | - | **6.21:1 / 6.09:1** | PASS |

---

## 3. Interactive States, Actions & Focus Specification

### 3.1 State Priority & Precedence
Highest to lowest: `disabled` > `loading` (`aria-busy="true"`) > `error` (`aria-invalid="true"`) > `read-only` > `active/pressed` > `selected` > `focus-visible` > `hover` > `default`.

### 3.2 Interactive State Matrix
| State | Surface / Border Treatment | Cursor / Interaction | Accessibility Requirement |
|---|---|---|---|
| **Default** | Base semantic token (`--te-btn-*`, `--te-input-*`) | `pointer` (actions), `text` (inputs) | Minimum `44×44px` touch target (`min-height` hit area even on `36px` compact buttons) |
| **Hover** | Gated inside `@media (hover: hover) and (pointer: fine)` | Shift bg token (`--te-action-*-bg-hover`); marketing cards `translate(2px, -6px)` | Touch devices must have tap/active feedback instead |
| **Pressed / Active** | `translateY(1px)` (buttons), `scale(0.98)` on `@media (hover: none)` | Never drop contrast below `4.5:1` (`#ED7C30` stays `#C96A2B` `4.73:1`, never `#A45826` with dark ink) | Instant visual feedback `< 100ms` |
| **Selected** | `--te-surface-selected` (`#E6EEF5` light / `#1E4162` dark) + `2px` left/bottom accent | `aria-selected="true"` or `aria-current="page"` | Never color alone: add check icon, bold weight, or accent bar |
| **Focus-Visible** | `outline: 3px solid var(--te-focus-ring); outline-offset: var(--te-focus-offset)` | Never suppressed without replacement; parent containers avoid clipping ring | On `#ED7C30` surfaces override ring color to `#111823` |
| **Disabled** | `opacity: 0.5`, `--te-surface-disabled`, `--te-text-disabled` | `cursor: not-allowed; pointer-events: none` | Prefer keeping form Submit enabled and showing inline error guidance instead of pre-disabling |
| **Read-Only** | `--te-input-bg-readonly` (`#EFF3F7` / `#21384F`), dashed or subtle border, lock icon | Selectable/copyable text (`readonly` attribute, NOT `disabled`) | Contrast `≥ 5.5:1` so booking IDs & bank accounts remain copyable |

### 3.3 Text Links & Icon-Only Actions
- **Inline Text Links:** `--te-text-link` (`#25517B` light / `#ACD0ED` dark), `text-decoration: underline`, `text-underline-offset: 3px`, `text-decoration-thickness: 1.5px`; hover switches to `--te-text-link-hover` (`#A45826` / `#F2A16A`). Never rely on color without underline inside prose.
- **Icon-Only Buttons:** Mandatory `aria-label` (plus native `title` or accessible tooltip on hover/focus). Minimum `44×44px` hit box (or `36px` visual in compact admin toolbars with `44px` invisible hit target via `::after`), `border-radius: var(--te-p-r-pill)` (marketing) or `var(--te-p-r-sm)` (admin).

---

## 4. Typography, Content Density, Spacing & Geometry

### 4.1 Typography & Bilingual Floors
- **Families (SIL OFL 1.1):** `Plus Jakarta Sans` (variable `700..800`), `Inter` (variable `400..700`), `Hind Siliguri` (`400;500;600;700`), `JetBrains Mono` (`500` for admin IDs/bank accounts).
- **Mandatory Floors:** Bangla running text `≥ 17px` (`--te-p-fs-bn-min`, `line-height: 1.85`, `letter-spacing: 0`, `font-weight: 500` on dark); Bangla UI chips `≥ 16px`; Latin UI text `≥ 13px` (`--te-p-fs-micro`, overline tracking `0.09em`, `0.07em` below `640px`).
- **Tabular Numerals:** `.te-num` enforces `font-variant-numeric: tabular-nums` on every `৳` price, date, seat counter, and table cell.

### 4.2 Density Modes (`comfortable` vs. `compact`)
| Token | Comfortable (`:root` - Marketing & Portal) | Compact (`[data-density="compact"]` - Admin Panels) |
|---|---|---|
| `--te-space-section-y` | `clamp(4rem, 8vw, 7rem)` (`64px–112px`) | `32px` |
| `--te-space-card-pad` | `24px` | `16px` |
| `--te-control-height` | `44px` | `36px` |
| `--te-input-height` | `48px` | `38px` |
| `--te-table-row-height` | `48px` | `40px` |
| `--te-btn-radius` | `999px` (pill) | `8px` (`--te-p-r-sm`) |
| `17° Flight Angle & 3° Rule` | Active (cuts, `-3deg` Flight Rules with `12px/16px` desktop & `10px/12px` mobile clearance, `-6deg` badges, `translate(2px,-6px)`) | **Disabled** (zero skew in tables, toolbars, forms) |

### 4.3 Spacing, Radii, Elevation, Z-Index, Icons & Motion
- **Spacing Scale (4px base):** `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px`.
- **Radii:** `xs 4px`, `sm 8px`, `md 12px` (nested media = parent `16px` − `4px`/`16px` padding rule), `lg 16px`, `xl 24px`, `2xl 32px`, `pill 999px`, `disc 50%`.
- **Elevation:** Deep-Ocean-tinted shadows (`xs` through `xl` + `warm` CTA hover glow); dark theme reduces shadow reliance and pairs with `1px solid var(--te-border-subtle)`.
- **Infinity Radial Glow Ambient ("Background Dignity"):** `--te-glow-infinity` flows continuously behind transparent sections across `body` (`radial-gradient` Sunset Orange `0.08` + Sky Blue `0.08` light / `0.14–0.16` dark) so page scrolls seamlessly from section to section without horizontal color cutoff seams; collapses cleanly to `'none'` under `[data-contrast="high"]`.
- **Frosted Glassmorphism (`--te-glass-*`):** `backdrop-filter: saturate(140%) blur(var(--te-glass-blur))` (`16px`) over `--te-glass-bg` (`rgba(255, 255, 255, 0.80)` light / `rgba(19, 36, 54, 0.68)` dark) and `--te-glass-border` for floating headers, mobile drawers, full-bleed Hero glass copy panels, Hero slider controls, Route Map stop cards, review cards, and subtle footer glass badges (banned in dense admin tables). Fallback inside `@supports not (backdrop-filter: blur(1px))` switches to `--te-glass-bg-strong` (`0.95`), and High Contrast flattens to solid cards.
- **Z-Index Ladder:** `base 0`, `raised 10`, `sticky 100`, `dropdown 200`, `whatsapp 300`, `overlay 400`, `modal 500`, `toast 600`.
- **Icons (`assets/icons.svg`):** 24×24 Lucide stroke geometry; `stroke-width` inherited by size (`sm 16px/2.15`, `default 20px/1.85`, `md 22px/1.75`, `lg 26px/1.55`, `xl 32px/1.35`) to keep rendered strokes optically ~`1.5px`. Solid fill reserved strictly for WhatsApp & Facebook marks.
- **Motion:** `instant 100ms`, `fast 180ms`, `base 260ms`, `slow 420ms`, `scenic 700ms`. Easings: `out cubic-bezier(0.16, 1, 0.30, 1)`, `in cubic-bezier(0.70, 0, 0.84, 0)`, `inout`, `lift cubic-bezier(0.34, 1.26, 0.64, 1)`. Animate `transform` and `opacity` only; collapse to `0.01ms` under `prefers-reduced-motion: reduce`.

### 4.4 Grid, Containers & Breakpoints
| Breakpoint | Min Width | Columns | Gutter | Page Margin | Container Max |
|---|---|---|---|---|---|
| `xs / sm` | `0 / 480px` | 4 | `16px` | `20px` | Fluid (`360px` baseline) |
| `md` | `640px` | 8 | `20px` | `32px` | Fluid |
| `lg` | `1024px` | 12 | `24px` | `40px` | `1120px` |
| `xl` | `1280px` | 12 | `24px` | `48px` | `1240px` (`1440px` wide/admin) |
| `2xl` | `1536px` | 12 | `32px` | `64px` | `1280px` (marketing) / `1440px` (admin) |

---

## 5. Layouts & Navigation Architecture

1. **Public Marketing Layout:** Crisp White-Theme baseline running over a continuous **Infinity Radial Glow canvas (`--te-glow-infinity`)** with frosted glass sticky header (`76px` desktop / `64px` mobile) + smooth slide-over mobile drawer → **Full-Bleed Hero Tour Image Slider** (`#top`) spanning entire hero area on both desktop & mobile with floating Frosted Glassmorphism copy panel + bottom glass slide switcher → **Interactive Departure Route Map & Journey Timeline (`#destinations`)** anchored in Chattogram (clean schematic vector air/overland corridors + frosted glass stop cards) → 3-up / 1-up Package grid (strict flat 5-color illustration for Kashmir) → Inclusion/Exclusion split → **2-column mobile** / 3–4-column desktop Masonry proof gallery → Compact horizontal-swipe mobile / 3-up desktop Glass Review cards (`#reports`) → Contact form & office info → **Premium Night Ocean Footer** topped with `4px` `--te-grad-horizon`, ambient horizon glow, glass trust highlight strip, and clear white-pill logo shield. On `<640px`, typography, padding (`2.25rem`), and vertical stacks compact cleanly while preserving Bangla `≥17px` (`Hind Siliguri`).
2. **Authenticated Customer Portal Layout:** Topbar + horizontal section tabs (`My Bookings`, `Payments & Receipts`, `Visa Checklist`, `Profile`) → Summary cards (`Next Departure`, `Balance Due ৳`, `Visa Status`) → Single-column mobile / 2-col `8/4` desktop split.
3. **Complex Multi-Step Forms (Booking & Passenger Manifest):** Progressive 3-step stepper (`1. Departure & Seats` → `2. Traveller & Passport Details` → `3. Bank Deposit / Office Payment`); inline blur validation (never pre-validation before touch), focusable error summary on submit failure, forgiving `+880` phone normalization, `sessionStorage` draft protection with unsaved-changes confirmation.
4. **Data-Dense Admin Panel Layout (`[data-density="compact"]`):** Fixed/collapsible left navigation rail (`240px` expanded / `64px` icon-rail / mobile slide drawer) + `56px` sticky utility topbar (breadcrumb, global search `⌘K`, theme/density toggles) + `48px` sticky filter toolbar + `40px`-row scrollable/card-transformed ledger table + `480px` right slide-over detail drawer for bank slip & passport verification.

---

## 6. Data Visualization Conventions

- **Palette (Colorblind-Safe Brand Series - never Red/Green alone):**
  - Series 1: `--te-chart-series-1` (`#3171AE` light / `#78B2E1` dark)
  - Series 2: `--te-chart-series-2` (`#C96A2B` light / `#ED7C30` dark)
  - Series 3: `--te-chart-series-3` (`#316896` light / `#A4C1DB` dark)
  - Series 4: `--te-chart-series-4` (`#15784F` light / `#6FD9AC` dark)
  - Series 5: `--te-chart-series-5` (`#8A6100` light / `#F3C969` dark)
- **Rules:**
  - Always pair hue with distinct stroke dash patterns, marker shapes, or direct value labels.
  - Gridlines use `--te-chart-gridline` (`#DFE5EC` / `#2A4763`); axis labels `13px` tabular numerals in `--te-chart-axis-ink`.
  - Pie/donut restricted to `≤ 5` categories (otherwise switch to horizontal bar).
  - Every chart includes a toggleable/screen-reader `<table>` equivalent, keyboard-focusable data points, `prefers-reduced-motion` instant render, and explicit empty/error/skeleton states.

---

## 7. Browser Assumptions, Token Reconciliation & Open Decisions

### 7.1 Browser Assumptions
- Modern evergreen Chrome/Android WebView (primary audience), Safari iOS 16+, Firefox, and Edge.
- Relies on CSS Custom Properties, `clamp()`, `dvh` units (`100dvh`), `backdrop-filter` (with `@supports not` solid Night Ocean fallback), `clip-path`, and `:focus-visible`.

### 7.2 Token Reconciliations Made in Gate 2
1. **Overline Tracking:** Existing `assets/css/tokens.css` carried `--te-track-overline: 0.12em`, whereas Gate 1 (`03-typography.md` & `BRAND_FOUNDATIONS.json`) standardized `0.09em` (`0.07em` on `<640px`) at `13px` minimum. Gate 2 tokens standardize on `0.09em` / `0.07em`.
2. **Primary Button Contrast Ratio Label:** Existing `assets/css/tokens.css` commented `5.66:1` next to `#111823` on `#ED7C30` (which is `#1B2330`'s ratio). Computed WCAG 2.2 ratio for `#111823` on `#ED7C30` is **`6.39:1`**.
3. **Interactive Control Borders:** Upgraded default `--te-border-control` to `#6F7D90` (`n-500`, `3.95:1` on `#F7F9FB`) instead of `#C6CFDA` (`1.57:1`) so form inputs satisfy WCAG 1.4.11 non-text `3:1` contrast out of the box.

### 7.3 Documented Open Decisions (For Gate 2 Review)
- [ ] Confirm adopting `tokens/tokens.css` + `tokens/themes.css` as the canonical replacement/superset of legacy `assets/css/tokens.css` in Stage 3+.
- [ ] Confirm `--te-btn-radius` switching from `999px` (pill) in marketing to `8px` (`--te-p-r-sm`) in `[data-density="compact"]` admin toolbars.
- [ ] Confirm `JetBrains Mono` as optional load for admin Booking IDs & bank accounts (or fall back to `ui-monospace` to protect the `180 KB` public marketing font budget-recommended: load `JetBrains Mono` on portal/admin routes only).

---

## 8. Corporate Lineage, Glassmorphism Modal & Ambient Radial Glow Specifications

### 8.1 Corporate Hierarchy
- **Mother / Parent Company:** **Taabu Nibash Travel Group (তাঁবু নিবাসী ট্রাভেল গ্রুপ)** - Adventure, camping, hospitality network, and organizational umbrella.
- **Sister Concern / Outbound Wing:** **Trip Express BD (ট্রিপ এক্সপ্রেস বিডি)** - Guided South Asia group departures (Kashmir, Meghalaya, Nepal, Darjeeling, Sikkim, Maldives/Sri Lanka) from Chattogram.

### 8.2 Extracted & Authoritative Color Tokens
| Identity | Element | Measured HEX | Token Equivalent | Role |
|---|---|---|---|---|
| **Trip Express BD** | Sunset Orange | `#ED7C30` | `--te-orange-500` | Primary brand accent & button fill |
| **Trip Express BD** | Sand Orange | `#F2A15F` | `--te-orange-300` | Mountain highlights & soft badges |
| **Trip Express BD** | Sky Blue | `#4394D5` | `--te-sky-500` | Lower water disc & decorative accents |
| **Trip Express BD** | Deep Ocean | `#3171AE` | `--te-deep-500` | Focus rings & info alerts |
| **Trip Express BD** | Night Ocean Ink | `#111823` | `--te-n-950` | Primary dark ink (`6.39:1` on `#ED7C30`) |
| **Taabu Nibash** | Campfire Orange | `#ED7C30` / `#E68D27` | `--te-orange-500` | Campfire & tent canvas (harmonizes with TE) |
| **Taabu Nibash** | Pine Green | `#0A8B48` / `#118C49` | `--te-green-700` | "TRAVEL GROUP" text & evergreen pine trees |
| **Taabu Nibash** | Charcoal Brown | `#1F1610` / `#2D161E` | `--te-n-950` | "TAABU NIBASH" heading & outer boundary ring |

### 8.3 Headline Accent Primacy Rule
- **Rule:** Display headline emphasis (`.hero h1 em` e.g., *"Photographs to prove it."*) and brand lockup typography (`.brand__name i` e.g., *"Trip"*) MUST use the pure brand Sunset Orange `#ED7C30` (`var(--te-orange-500)`).
- Never degrade headline accents to muddied `#A45826` (`--te-orange-700`), which was intended strictly for small running body text on white.

### 8.4 Corporate Lineage Glassmorphism Modal (`#brandModal`) & Seamless Hero Slider
- **Modal Structure (Minimalist Pure Branding):**
  - **Behavior & Timing:** Opens `2000ms` after **every** page load/reload (so visitors scrolling are never interrupted abruptly at `0ms`), transitioning smoothly over `700ms cubic-bezier(0.22, 1, 0.36, 1)`. Zero persistent trigger buttons in navbar, drawer, or footer.
  - Fullscreen Backdrop: `background: rgba(17, 24, 35, 0.54)`, `backdrop-filter: blur(26px) saturate(165%)`.
  - Dual Ambient Glow Halo: `radial-gradient(380px circle at 76% 24%, rgba(237, 124, 48, 0.38), transparent 66%), radial-gradient(380px circle at 24% 78%, rgba(67, 148, 213, 0.30), transparent 68%)`, `filter: blur(48px)`.
  - Ultra-Minimalist Centered Frosted Card (`max-width: 390px`): `var(--te-glass-bg-strong)`, `backdrop-filter: blur(30px) saturate(190%)`, specular `var(--te-glass-highlight)` top rim, `border: 1.5px solid var(--te-glass-border)`, `border-radius: var(--te-r-2xl)`. Centered single oversized circular **Taabu Nibash** emblem (`112–128px`, `border-radius: var(--te-r-disc)`), centered `"Sister Concern by Taabu Nibash"` title, one short relevant EN+BN sentence, and top-right `✕`—zero Trip Express duplicate logo, zero Mother Company badge, zero redundant subheadings, and zero footer CTA buttons.
  - Dismiss: Top-right `✕`, click outside/backdrop, or `Escape` key.
- **Seamless Hero Slider & Mobile Breathing Room (`#heroSlider`):**
  - **Seamless Section Transition:** Hero image stage applies a feathered bottom mask (`linear-gradient(to bottom, #000 74%–80%, transparent 100%)`) melting into the continuous `body::before` `--te-glow-infinity` radial canvas so zero horizontal boundary separates Hero from Destinations.
  - **Mobile Stage (`<1040px`):** Open top `16:11` (`235px–310px`) photo canvas keeping traveller faces unobstructed (`object-position: center 22%`), paired below with floating frosted slider dock (`.hero-slider__glass`) and frosted headline card (`padding: 20px 18px`) with stacked `12px`-gapped CTAs (`>=46px` touch height, never crammed side-by-side below `480px`) and generous `18px 16px` card breathing room across timeline cards and compact footer desk strip.
  - **Footer Disc Mark:** True `1:1` `52×52px` circular white disc (`border-radius: 50%`) wrapping `logo-mark.svg` cleanly beside split `#ED7C30` wordmark.
  - **Desktop Stage (`>=1040px`):** Full-bleed background slider with frosted glass headline card left and translucent frosted `.hero-slider__dock` right (`01 / 04` counter + slide controls).
