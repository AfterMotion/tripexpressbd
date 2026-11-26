# Trip Express BD - Brand Foundations & Visual Guidelines (Gate 1 Review)

**Status:** Gate 1 Foundation Deliverable - Source observations verified; proposed system decisions marked `[PROPOSED - APPROVAL REQUIRED]`.  
**Scope:** Identity audit, brand strategy, logo rules, color system, typography, imagery/icon/texture direction, grids, voice/microcopy, motion, and rules for both **marketing pages** and **dense admin interfaces**.  
**Non-alteration rule:** Original supplied logo geometry (`assets/brand/logo-mark.svg`, `logo.jpg`) is preserved untouched. No vector redraw or identity modification is shipped without explicit Gate 1 approval.

---

## 1. Epistemological Ledger: Verified Observations vs. Recommendations vs. Assumptions

Every claim in this system is separated into one of three tiers so reviewers can audit logo fidelity and brand direction cleanly.

### 1.1 Verified Observations (Directly Measured from Supplied Assets & Brief)

| Category | Verified Fact | Evidence Source |
|---|---|---|
| **Files in `assets/brand/`** | Only **one** file exists: `assets/brand/logo-mark.svg` (7,439 bytes, `viewBox="0 0 1839 1572"`). | Direct directory inspection |
| **Root & skill logo assets** | `logo.jpg` and `.claude/skills/trip-express-brand/assets/logo-primary.jpg` are byte-identical (`SHA-256 prefix: ad41024459467f95`, `2048×2048` RGB JPEG, `#FFFFFF` background). `favicon.svg` (314 bytes, `64×64`) is an existing simplified orange-disc + white-plane monogram. | File hash & PIL pixel inspection |
| **Logo composition** | Split circular emblem divided diagonally by an ascending aircraft streak overhanging both left and right edges of the circle. | Visual + bounding-box check |
| **Observable shapes** | **Upper hemisphere:** 4-window minibus silhouette, two palm trees (left shorter, right taller), multi-peak mountain range with right-facing highlight facets. **Center diagonal:** aircraft silhouette (nose right-up, swept wings, tail fin) + diagonal contrail bar. **Lower hemisphere:** top-down 2-blade kayak silhouette + subtle curved water shadow wave (in `logo.jpg`). | `logo.jpg` & `logo-mark.svg` |
| **Observable type clues** | **Zero typography** exists inside `logo.jpg` or `logo-mark.svg`. The supplied identity is an emblem-only mark. | Direct inspection |
| **Measured geometry (`logo.jpg`)** | Non-white bounding box: `x: 80..1947`, `y: 241..1815` (`1868×1575` px). Vertical disc span: `y: 241..1815` (`1575` px = **76.90%** of `2048` px canvas). Left tip `(80, 1428)`, right tip `(1947, 858)`. Blue streak bottom edge angle: **17.12°** rising left-to-right; upper orange seam angle: **9.13°** (widens leftward). | Python/NumPy pixel measurement |
| **Measured `logo-mark.svg` structure** | 4 `<path>` layers using `fill-rule="evenodd"` (`#ED7C30`, `#4394D5`, `#F2A15F`, `#3171AE`) with **transparent cutouts** (no `#FFFFFF` backing layer and no soft gradient wave). | XML parse of `logo-mark.svg` |
| **Sampled artwork colors (`logo.jpg`)** | Sunset Orange `#ED7C30` (17.70% of canvas), Sand Orange `#F2A15F` (1.89%), Sky Blue `#4394D5` (13.66%), Deep Ocean `#3171AE` (6.29%), Sea Shadow wave gradient `#387DB4`–`#3C83B9` (visible in JPEG only), White background + negative space (58.94% of full canvas). | Median/mode RGB pixel sampling |
| **Verified brand facts (`plan.md`)** | Name: **Trip Express BD**; 5.9K Facebook followers; Location: **1301, Mosjid Goli, Dui Number Gate (opposite Sermon School), Chattogram 4202**; Phones: `01621-785968`, `01838-754207`, `01840-004495`; WhatsApp: `wa.me/+8801838754207`; Email: `tripexpressb@gmail.com`; Partner: **তাঁবু নিবাসী**; Banks: Islami Bank (Chawkbazar, Chattogram) & Eastern Bank Bangladesh (Agrabad Branch); Published tours: Explore Nepal (`৳58,500`, 5D/4N), Kashmir by road (`৳35,000`, Season 5), Meghalaya (4 days, team of 13), Kolkata (3rd/4th city trips), Maldives & Sri Lanka (7 days), Sikkim, Darjeeling. | `plan.md` Facebook export |
| **Verified photography gap** | Real group tour photos exist in `assets/img/` for Meghalaya, Dawki, Nepal, etc. **No Kashmir photograph** is supplied in `assets/img/` or `images/`. | File inventory & `README.md` |

### 1.2 Proposed Recommendations `[PROPOSED - GATE 1 APPROVAL REQUIRED]`

1. **Missing Logo Variants:** Source files provide only the 4-color `logo-mark.svg` and `favicon.svg` monogram. Proposed variants-disc-only avatar, white-backed reverse mark (critical for dark surfaces because `logo-mark.svg` has transparent cutouts), single-color monochrome (`#132436` / `#FFFFFF`), and horizontal/stacked wordmark lockups-require Gate 1 approval before generating SVG assets.
2. **Contrast-Adjusted Derived Palette:** Raw logo orange (`#ED7C30`) fails WCAG AA with white text (`2.79:1`) and as text on white (`2.79:1`). Proposed solution pairs `#ED7C30` fills with `#111823` ink (`6.39:1` AA) and shifts text orange on white to derived `#A45826` (`5.25:1` AA). Derived ramps (`50–950`), blue-tinted slate neutrals (`#111823` floor), Night Ocean dark mode (`#132436`), and semantic colors are **derived system tokens**, not literal logo colors.
3. **Wordmark & UI Typography:** Because the logo contains no type, **Plus Jakarta Sans** (700/800) is proposed for display & wordmark, **Inter** (400–700, `tabular-nums`) for Latin body/UI/prices, and **Hind Siliguri** (400/500/600/700) for Bangla, with an optional monospace role (**JetBrains Mono**) for dense admin booking IDs and bank account references.
4. **17° Flight Angle System:** Formalizes the logo's measured `17.12°` streak angle into section dividers (`tan(17°) = 0.3057`), Flight Rule accents, and departure animations-banned inside dense admin tables and forms.
5. **Dual-Mode Layout Rules:** Distinct density rules for public **marketing pages** vs. back-office **admin interfaces** (booking ledger, bank deposit verification, seat-cap tracking, visa queue).

### 1.3 Explicit Assumptions (Flagged for Validation)

- **Audience demographics:** Primary target (Bangladeshi adults aged 22–45 in Chattogram/Dhaka, Android-first, WhatsApp-native, mixed Bangla/English readers) is inferred from Facebook posts, BDT pricing, and mobile-centric booking flow rather than analytics telemetry.
- **Secondary service pillars:** Corporate/institutional custom trips and standalone air ticketing / visa assistance are inferred as expansion pillars beyond the core published group departures.
- **Admin operational workflow:** Need for high-density admin tables (seat inventory, Islami Bank / Eastern Bank deposit reconciliation, passport/visa checklists) is inferred from the manual bank-deposit confirmation rules in `plan.md`.

---

## 2. Brand Strategy Foundations

- **Positioning Statement:** For Bangladeshi travellers-especially from Chattogram-who want guided South Asian and international group tours (Kashmir, Meghalaya, Nepal, Sikkim, Darjeeling, Kolkata, Maldives, Sri Lanka) without assembling logistics alone, **Trip Express BD** delivers fixed-date departures, transparent published prices in BDT (`৳`), real departure photography, and direct human support by phone, WhatsApp, and physical office.
- **Target Audience:**
  - *Primary `[ASSUMPTION]`*: Bangladeshi young professionals, friend groups, and families (ages 22–45) in Chattogram and greater Chattogram; Android mobile-first, WhatsApp-native, bilingual (Bangla + English), trust-seeking (verify real photos, inclusions, exclusions, and physical office).
  - *Secondary*: Dhaka-based travellers joining air departures (e.g., Kathmandu, Maldives/Sri Lanka).
  - *Tertiary `[ASSUMPTION]`*: University, friend-circle, or corporate custom group departures.
- **Brand Attributes:**
  1. **Warm** - human-led, welcoming to families and solo/female travellers, sunset-orange energy.
  2. **Trustworthy** - published prices, explicit exclusions, verifiable bank details, physical office address.
  3. **Energetic** - ascending `17°` flight momentum, multi-modal travel (bus, jeep, plane, boat).
  4. **Local** - Chattogram roots, natural bilingual Bangla/English voice, community camaraderie.
  5. **Proof-Driven** - real group photographs and dated trip completions serve as primary evidence, not stock polish.
- **Mood Words:** Sunlit, Upward, Grounded, Communal, Transparent, Horizon-bound. *(Explicitly NOT: corporate-aloof, luxury-exclusive, discount-shouty, stock-generic.)*
- **Visual Rationale:** The logo visually encodes the brand's complete offering in a single split circle: golden-hour mountain & palm overland trips above (`#ED7C30` / `#F2A15F`), cool river/lake/island water trips below (`#4394D5` / `#3171AE`), unified by an upward `17°` white flight corridor representing the "Express" crossing borders. Over half of the `2048×2048` canvas is open white space-signaling clarity and breathing room rather than visual clutter.
- **Permitted Use Cases:**
  - Public tour marketing website, package itineraries, trip photo archives.
  - WhatsApp/Facebook departure flyers, OG share cards (`1200×630`), and partner co-branding (e.g., with **তাঁবু নিবাসী**).
  - Internal booking/operations admin portal, printed vouchers, office signage (`1301, Mosjid Goli, Dui Number Gate`), and receipts.

---

## 3. Logo System & Usage Rules

> **Fidelity Guardrail:** Only `assets/brand/logo-mark.svg` (4-color emblem) and `favicon.svg` (monogram) exist as approved vector files today. **Do not redraw `logo-mark.svg` or ship newly proposed variants in production until Gate 1 approves them.**

### 3.1 Variant Matrix

| Variant | Current Status | Description & Geometry | Permitted Contexts |
|---|---|---|---|
| **Primary Full Mark** | **VERIFIED SOURCE** (`assets/brand/logo-mark.svg`, `logo.jpg`) | Full split disc + overhanging `17°` aircraft streak in 4 flat colors (`#ED7C30`, `#F2A15F`, `#4394D5`, `#3171AE`). | Light surfaces (`#FFFFFF`, `#F7F9FB`, `#FEF8F5`, `#F6FAFD`) at `≥ 40px` height. |
| **Monogram (Favicon)** | **VERIFIED SOURCE** (`favicon.svg`) | `#ED7C30` circle with solid `#FFFFFF` aircraft silhouette (`64×64` viewBox). | Small UI badges and browser favicons `16px–32px` where bus/palms/kayak collapse. |
| **White-Backed / Reverse Mark** | `[PROPOSED - APPROVAL REQUIRED]` | Identical 4-color mark with an explicit `#FFFFFF` interior backing disc/fuselage layer so dark backgrounds do not bleed through `evenodd` holes, paired with `#FFFFFF` wordmark. | **Required** for Night Ocean (`#132436`) headers, dark footers, and dark photo scrims. |
| **Disc-Only Avatar** | `[PROPOSED - APPROVAL REQUIRED]` | Disc clipped to `1:1` circle without overhanging streak tips. | Circular social avatars, app icons (`180×180`, `192×192`, `512×512` maskable) where overhang would clip awkwardly. |
| **Single-Color Monochrome** | `[PROPOSED - APPROVAL REQUIRED]` | Single-ink silhouette (`#132436` Night Ocean on light; `#FFFFFF` on `#ED7C30` or dark photos). | Embossing, single-color print receipts, thermal vouchers, watermarks, `#ED7C30` solid banners. |
| **Horizontal Lockup** | `[PROPOSED - APPROVAL REQUIRED]` | Primary mark (`H`) + `0.32 × H` gap + `Trip Express BD` in Plus Jakarta Sans 800 (`cap-height ≈ 0.40 × H`), optically aligned to disc center line. | Top navigation bar (`≥ 120px` wide), admin portal header, email signature. |
| **Stacked Lockup** | `[PROPOSED - APPROVAL REQUIRED]` | Primary mark (`H`) above + `0.22 × H` gap + centered `Trip Express BD` (`cap-height ≈ 0.26 × H`). Optional split color (`Trip` `#ED7C30`, `Express BD` `#132436`) allowed here only. | Hero badges, OG cards, print posters, square social cards. |

### 3.2 Clear Space, Safe Area, Alignment & Minimum Sizes

- **Clear-Space & Aspect-Ratio Fidelity:** `logo-mark.svg` (`viewBox="0 0 1839 1572"`) has a native **`1.17 : 1`** horizontal-to-vertical aspect ratio due to the overhanging `17.12°` aircraft streak. Always render with natural aspect ratio (e.g., `47×40px` or `width="47" height="40"`), **never forcing equal square `width === height` CSS dimensions** that distort or escape its container.
- **Clear-Space Methodology:** Define `D` as the **vertical disc diameter** (`1575/2048 ≈ 76.9%` of full mark height in `logo.jpg`; full `1572` height in `logo-mark.svg` minus overhang). Minimum untouched clear space on all four sides = **`0.25 × D`** (25% of disc height). At `48px` mark height, clear space is `12px` minimum on every side.
- **Overhang Protection:** The aircraft streak extends left (`x=80`) and right (`x=1947`) beyond the circular disc. Never apply `border-radius: 50%` or `overflow: hidden` directly to the primary mark-only the proposed Disc-Only variant may trim the overhang.
- **White vs. Dark Container Sizing:** On crisp Light / Frosted White headers (`#FFFFFF` / `--te-glass-bg-strong`), place `logo-mark.svg` directly without trapping it inside a tight ring. On dark Night Ocean (`#132436`) surfaces such as the footer, give the protective `#FFFFFF` pill/oval chip **`1.45×` the mark width** (`padding: 7px 10px`, `border-radius: 999px`) so the `1.17:1` wings sit comfortably inside white with `≥ 0.25 × D` margin on every edge.
- **Alignment:** In horizontal lockups, align the wordmark baseline/x-center to the **circular disc's vertical midpoint**, never to the tilted `17°` wing tip.
- **Minimum Sizes:**
  - Primary 4-color mark: **`40px` tall** (screen) / **`15mm` tall** (print) - below 40px the minibus windows, palm fronds, and kayak paddle lose clarity.
  - Disc-only avatar `[PROPOSED]`: **`32px`** (screen).
  - Monogram (`favicon.svg`): **`16px`** (screen).
  - Horizontal lockup `[PROPOSED]`: **`120px` wide** (screen) / **`35mm` wide** (print).
- **Partner Co-Branding:** Place Trip Express BD lockup on the left, a `1px` `#C6CFDA` vertical divider of height `D` separated by `0.25 × D` clear space on each side, and partner mark (e.g., **তাঁবু নিবাসী**) on the right.

### 3.3 Background Compatibility & Misuse Examples

- **Approved Backgrounds for Source `logo-mark.svg`:** Pure White `#FFFFFF`, Neutral-50 `#F7F9FB`, Sunset-50 `#FEF8F5`, Sky-50 `#F6FAFD`.
- **Critical Technical Warning (Verified):** Because `assets/brand/logo-mark.svg` uses `fill-rule="evenodd"` cutouts with **no white fill layer**, placing the raw `logo-mark.svg` directly on `#132436` Night Ocean or photography causes the dark background to show *inside* the plane body, palms, bus, and kayak. Until a white-backed SVG is approved, place `logo-mark.svg` inside a **`#FFFFFF` circular disc chip** (`1.45×` mark width) on dark or photographic backgrounds.
- **Never Do (Misuse):**
  1. Recolor the orange/blue halves or swap them.
  2. Rotate, mirror, or alter the `17°` aircraft flight angle.
  3. Stretch or compress non-uniformly.
  4. Apply drop shadows, outer glows, strokes, or 3D bevels to the mark.
  5. Crop the overhanging aircraft streak with a tight circle (`overflow: hidden`).
  6. Place `logo-mark.svg` raw on `#ED7C30` (orange disc vanishes) or raw on `#132436` (cutouts go dark).
  7. Ship the `2048×2048` `logo.jpg` raster in web headers where SVG belongs.

---

## 4. Color System & Contrast Architecture

> **Critical Distinction:** Only the **6 sampled colors** below exist literally in the logo artwork. All 50–950 ramps, blue-tinted slate neutrals, Night Ocean dark theme surfaces, and semantic colors are **contrast-aware derived tokens** `[PROPOSED - APPROVAL REQUIRED]`-never treat them as literal original logo colors.

### 4.1 Literal Source Colors (Sampled from `logo.jpg` & `logo-mark.svg`)

| Source Name | HEX | RGB | HSL | Share (2048px) | Origin in Artwork |
|---|---|---|---|---|---|
| **Sunset Orange** | `#ED7C30` | `rgb(237, 124, 48)` | `hsl(24, 84%, 56%)` | 17.70% | Upper land/sun disc & mountain base |
| **Sand Orange (Source)** | `#F2A15F` | `rgb(242, 161, 95)` | `hsl(27, 85%, 66%)` | 1.89% | Illuminated right-facing mountain facets |
| **Sky Blue** | `#4394D5` | `rgb(67, 148, 213)` | `hsl(207, 63%, 55%)` | 13.66% | Lower water disc |
| **Deep Ocean** | `#3171AE` | `rgb(49, 113, 174)` | `hsl(209, 56%, 44%)` | 6.29% | Aircraft underwing shadow & diagonal streak |
| **Sea Shadow (JPEG only)** | `#387DB4` | `rgb(56, 125, 180)` | `hsl(207, 53%, 46%)` | Gradient | Soft curved wave shadow in `logo.jpg` (omitted in flat `logo-mark.svg`) |
| **Horizon White** | `#FFFFFF` | `rgb(255, 255, 255)` | `hsl(0, 0%, 100%)` | 58.94%* | Canvas & aircraft/bus/palm/kayak negative space (*includes margins) |

*Note on Sand Orange discrepancy:* Existing `.claude/skills/trip-express-brand` tokens map `orange-400` (`Sand Orange`) to `#F2A16A` (`hsl(24, 84%, 68%)`) to keep hue constant at `24°`, whereas `logo-mark.svg` and `logo.jpg` pixels are literally `#F2A15F` (`hsl(27, 85%, 66%)`). Keep `#F2A15F` inside logo artwork and use `#F2A16A` (`orange-400`) for UI ramp consistency (contrast difference on `#132436` is negligible: `7.53:1` vs `7.56:1`).

### 4.2 Contrast-Aware Adjustments (Why Derived Tokens Exist)

- **Why `#ED7C30` cannot carry white text:** `#FFFFFF` on `#ED7C30` measures **`2.79:1`**, failing WCAG 2.2 AA (`4.5:1` normal, `3.0:1` large). **Rule:** Primary buttons and badges using `#ED7C30` MUST use `#111823` (`n-950`, **`6.39:1` AA**) or `#1B2330` (`n-900`, **`5.66:1` AA**) dark ink.
- **Why orange text on white shifts to `#A45826` (`orange-700`):** `#ED7C30` on `#FFFFFF` is `2.79:1` (FAIL). Darkening along the `24°` hue to `#A45826` reaches **`5.25:1` AA** for overlines, links, and active status labels.
- **Why `#4394D5` Sky Blue shifts to `#316896` / `#25517B` for text & buttons:** `#FFFFFF` on `#4394D5` is **`3.26:1`** (fails small text). Use `#3171AE` (`deep-500`, `5.12:1` AA) or `#25517B` (`deep-700`, `8.26:1` AA) for white-ink buttons, and `#316896` (`blue-700`, `5.91:1` AA) for blue text on white.
- **Why pure `#000000` is banned:** Darkest ink is blue-tinted slate `#111823` (`n-950`, `17.82:1` on white), and dark theme base is **Night Ocean** `#132436` (`deep-950`, `15.75:1` with white), keeping dark UI rooted in the logo's ocean hue.

### 4.3 Proposed Color Ramps `[PROPOSED - GATE 1 APPROVAL REQUIRED]`

#### Orange (Primary Brand Ramp)
| Token | HEX | RGB | HSL | vs `#FFFFFF` | vs `#132436` | Role |
|---|---|---|---|---|---|---|
| `orange-50` | `#FEF8F5` | `254, 248, 245` | `20, 82%, 98%` | 1.05 | 14.97 | Warm section band |
| `orange-100` | `#FDEFE6` | `253, 239, 230` | `23, 85%, 95%` | 1.13 | 14.00 | Subtle warm chip bg |
| `orange-200` | `#FADDC9` | `250, 221, 201` | `24, 83%, 88%` | 1.29 | 12.19 | Contour ridge stroke (light) |
| `orange-300` | `#F7C5A4` | `247, 197, 164` | `24, 84%, 81%` | 1.56 | 10.11 | Warm highlight |
| `orange-400` | `#F2A16A` | `242, 161, 106` | `24, 84%, 68%` | 2.08 | **7.56 ✓AA** | Dark-mode overlines & accent text |
| `orange-500` | `#ED7C30` | `237, 124, 48` | `24, 84%, 56%` | 2.79 (FAIL text) | **5.65 ✓AA** | **Source Primary** - CTA bg (`#111823` ink = 6.39:1) |
| `orange-600` | `#C96A2B` | `201, 106, 43` | `24, 65%, 48%` | 3.76 (lg only) | 4.19 | Primary CTA hover bg |
| `orange-700` | `#A45826` | `164, 88, 38` | `24, 62%, 40%` | **5.25 ✓AA** | 3.00 | **Light-mode orange text / overlines** |
| `orange-800` | `#804621` | `128, 70, 33` | `23, 59%, 32%` | 7.46 ✓AAA | 2.11 | High-contrast warm ink |
| `orange-900` | `#60371C` | `96, 55, 28` | `24, 55%, 24%` | 10.19 ✓AAA | 1.55 | Deep warm ink |
| `orange-950` | `#402718` | `64, 39, 24` | `23, 45%, 17%` | 13.80 ✓AAA | 1.14 | Darkest warm accent |

#### Sky Blue (Secondary Brand Ramp)
| Token | HEX | RGB | HSL | vs `#FFFFFF` | vs `#132436` | Role |
|---|---|---|---|---|---|---|
| `sky-50` | `#F6FAFD` | `246, 250, 253` | `206, 64%, 98%` | 1.05 | 15.01 | Cool section band |
| `sky-100` | `#E8F2FA` | `232, 242, 250` | `207, 64%, 95%` | 1.13 | 13.88 | Map water / subtle tag |
| `sky-200` | `#CEE3F4` | `206, 227, 244` | `207, 63%, 88%` | 1.32 | 11.94 | Hover tint |
| `sky-300` | `#ACD0ED` | `172, 208, 237` | `207, 64%, 80%` | 1.62 | **9.75 ✓AAA** | **Dark-mode links & focus ring** |
| `sky-400` | `#78B2E1` | `120, 178, 225` | `207, 64%, 68%` | 2.27 | **6.94 ✓AA** | Dark-mode graphic accent |
| `sky-500` | `#4394D5` | `67, 148, 213` | `207, 63%, 55%` | 3.26 (lg only) | **4.83 ✓AA** | **Source Secondary** - decorative / dark icon |
| `sky-600` | `#3A7EB5` | `58, 126, 181` | `207, 51%, 47%` | 4.35 (lg only) | 3.62 | Wave shelf mid-layer |
| `sky-700` | `#316896` | `49, 104, 150` | `207, 51%, 39%` | **5.91 ✓AA** | 2.66 | Light-mode sky text |
| `sky-800` | `#285376` | `40, 83, 118` | `207, 49%, 31%` | 8.11 ✓AAA | 1.94 | Deep sky ink |
| `sky-900` | `#20405B` | `32, 64, 91` | `207, 48%, 24%` | 10.79 ✓AAA | 1.46 | Deep marine |
| `sky-950` | `#182D3F` | `24, 45, 63` | `208, 45%, 17%` | 14.13 ✓AAA | 1.11 | Night-sky shadow |

#### Deep Ocean (Anchor & Dark-Surface Ramp)
| Token | HEX | RGB | HSL | vs `#FFFFFF` | Role |
|---|---|---|---|---|---|
| `deep-50` | `#F5F8FB` | `245, 248, 251` | `210, 43%, 97%` | 1.07 | Outline button hover bg |
| `deep-100` | `#E6EEF5` | `230, 238, 245` | `208, 43%, 93%` | 1.17 | Info badge surface |
| `deep-200` | `#C9DAEA` | `201, 218, 234` | `209, 44%, 85%` | 1.43 | Subtle cool border |
| `deep-300` | `#A4C1DB` | `164, 193, 219` | `208, 43%, 75%` | 1.87 | Outline button border |
| `deep-400` | `#6B99C5` | `107, 153, 197` | `209, 44%, 60%` | 3.01 | Chart/illustration highlight |
| `deep-500` | `#3171AE` | `49, 113, 174` | `209, 56%, 44%` | **5.12 ✓AA** | **Source Anchor** - focus ring, info base |
| `deep-600` | `#2B6195` | `43, 97, 149` | `209, 55%, 38%` | **6.47 ✓AA** | **Light-mode prose link** |
| `deep-700` | `#25517B` | `37, 81, 123` | `209, 54%, 31%` | **8.26 ✓AAA** | **Secondary button bg (`#FFFFFF` ink)** |
| `deep-800` | `#1E4162` | `30, 65, 98` | `209, 53%, 25%` | 10.57 ✓AAA | Secondary button hover |
| `deep-900` | `#19324C` | `25, 50, 76` | `211, 50%, 20%` | 13.11 ✓AAA | Elevated dark surface |
| `deep-950` | `#132436` | `19, 36, 54` | `211, 48%, 14%` | **15.75 ✓AAA** | **Night Ocean** - dark theme base, footer |

#### Neutral Slate Ramp (Blue-Tinted, Zero Pure Grey/Black)
| Token | HEX | RGB | HSL | vs `#FFFFFF` | vs `#132436` | Role |
|---|---|---|---|---|---|---|
| `n-0` | `#FFFFFF` | `255, 255, 255` | `0, 0%, 100%` | 1.00 | 15.75 | Page background, cards (light) |
| `n-50` | `#F7F9FB` | `247, 249, 251` | `210, 33%, 98%` | 1.06 | 14.92 | Subtle band, form `--te-field-bg`, admin table header |
| `n-100` | `#EFF3F7` | `239, 243, 247` | `210, 33%, 95%` | 1.12 | 14.13 | Ghost hover, compact row stripe |
| `n-200` | `#DFE5EC` | `223, 229, 236` | `212, 25%, 90%` | 1.27 | 12.42 | Card borders, hairlines |
| `n-300` | `#C6CFDA` | `198, 207, 218` | `213, 21%, 82%` | 1.57 | **10.00 ✓AAA** | Input border (light) / **Body text (dark)** |
| `n-400` | `#9AA6B6` | `154, 166, 182` | `214, 16%, 66%` | 2.47 | 6.38 | Disabled UI only (never body text on light) |
| `n-500` | `#6F7D90` | `111, 125, 144` | `215, 13%, 50%` | 4.19 | 3.76 | Placeholder text / large text ≥24px only |
| `n-600` | `#556274` | `85, 98, 116` | `215, 15%, 39%` | **6.20 ✓AA** | 2.54 | **Muted / metadata text (light)** |
| `n-700` | `#3F4A5A` | `63, 74, 90` | `216, 18%, 30%` | **8.98 ✓AAA** | 1.75 | **Primary body text (light)** |
| `n-800` | `#2B3442` | `43, 52, 66` | `217, 21%, 21%` | 12.56 ✓AAA | 1.25 | Sub-headings / strong labels |
| `n-900` | `#1B2330` | `27, 35, 48` | `217, 28%, 15%` | **15.79 ✓AAA** | 1.00 | **Heading text (light)** |
| `n-950` | `#111823` | `17, 24, 35` | `217, 35%, 10%` | **17.82 ✓AAA** | 1.13 | **Darkest ink** (`#ED7C30` CTA ink = 6.39:1) |

### 4.4 Semantic Feedback & Light/Dark Surface Mapping

| Semantic Role | Light Base | Light Text (on Surface) | Light Surface | Light Border | Light Ratio | Dark Text (on Dark Surface) | Dark Surface | Dark Border | Dark Ratio |
|---|---|---|---|---|---|---|---|---|---|
| **Success** (Booking open / Paid) | `#1E9E6A` | `#15784F` | `#E7F7F0` | `#A7E3CB` | **4.95:1** | `#6FD9AC` | `#14342A` | `#2A6A52` | **7.85:1** |
| **Warning** (Seats filling / Pending) | `#E0A000` | `#8A6100` | `#FFF6E0` | `#F5DB9B` | **5.15:1** | `#F3C969` | `#33280F` | `#6B5424` | **9.21:1** |
| **Error** (Sold out / Rejected) | `#D64545` | `#B02E2E` | `#FDECEC` | `#F3B9B9` | **5.61:1** | `#F3A3A3` | `#361B1B` | `#6E3636` | **7.96:1** |
| **Info** (Visa update / Notice) | `#3171AE` | `#25517B` | `#E6EEF5` | `#A4C1DB` | **7.05:1** | `#A4C1DB` | `#17304A` | `#2F557A` | **7.21:1** |
| **WhatsApp Action** | `#25D366` | `#0B3D22` | `#E4F8EC` (`#10693C` text) | `#B6E7CB` | **6.21 / 6.09** | `#6FD9AC` | `#14342A` | `#2A6A52` | **7.85:1** |

- **Light vs. Dark Parity Rule:** Every semantic token (`--te-bg`, `--te-surface`, `--te-surface-2`, `--te-text`, `--te-text-heading`, `--te-text-muted`, `--te-border`, `--te-field-bg`, `--te-overline`) must be defined identically inside both `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` so light-section bands never retain dark ink or vice versa.
- **Page Color Proportion:** Target **60% White/Near-White · 25% Orange family · 12% Blue family · 3% Ink & semantic accents**, mirroring the airy openness of `logo.jpg`.

---

## 5. Typography System `[PROPOSED - GATE 1 APPROVAL REQUIRED]`

### 5.1 Font Stack & Licensing

| Role | Family | License | Weights | Fallback Stack |
|---|---|---|---|---|
| **Display / Headings / Wordmark (Latin)** | **Plus Jakarta Sans** | SIL OFL 1.1 (Free) | Variable `700..800` | `'Plus Jakarta Sans', 'Hind Siliguri', 'Segoe UI', system-ui, -apple-system, sans-serif` |
| **Body / UI / Forms (Latin)** | **Inter** | SIL OFL 1.1 (Free) | Variable `400..700` | `'Inter', 'Hind Siliguri', 'Segoe UI', system-ui, -apple-system, sans-serif` |
| **All Bangla (Headings & Body)** | **Hind Siliguri** | SIL OFL 1.1 (Free) | Static `400, 500, 600` (+`700` heading) | `'Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi', 'Segoe UI', sans-serif` |
| **Numerals, Prices, Dates** | **Inter** (`tabular-nums`) | SIL OFL 1.1 (Free) | `600, 700` | `'Inter', 'Hind Siliguri', system-ui, sans-serif` *(Hind supplies `৳` glyph)* |
| **Admin Monospace IDs / Bank A/C** `[PROPOSED]` | **JetBrains Mono** or system mono | SIL OFL 1.1 (Free) | `500` | `'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace` |

- **Critical Variable vs. Static Rule:** Load Latin faces as variable ranges (`Plus+Jakarta+Sans:wght@700..800`, `Inter:wght@400..700`) because UI specs use `550` and `650` weights. Hind Siliguri lacks a variable build-ship at most 3–4 static cuts (`400, 500, 600` minimum; `700` if Bangla H1s are heavy) and subset Latin + Bengali before production to stay under the `180 KB` font budget.

### 5.2 Type Scale (Marketing vs. Admin) & Bilingual Floors

**Unbreakable Floors:**
- **Bangla running text minimum:** **`17px`** (`--te-fs-bn-min`) - Bangla conjuncts stack vertically and read ~8% smaller optically than Latin at equal px. Bangla UI chips may step down to **`16px`** (`--te-fs-bn-ui-min`) and no lower. Set `line-height: 1.85`, `letter-spacing: 0`, never uppercase, and `font-weight: 500` on dark Night Ocean surfaces so thin strokes hold.
- **Latin UI minimum:** **`13px`** (`--te-fs-micro`) - never `12px` uppercase overlines; `13px` at `0.09em` tracking (relaxing to `0.07em` below `640px`) remains legible on 360px Android devices.

| Token | Size / Clamp | Family | Weight | LH | Tracking | Context |
|---|---|---|---|---|---|---|
| `display-xl` | `clamp(2.75rem, 1.6rem + 4.6vw, 4.5rem)` (`44→72px`) | Display | 800 | 1.04 | `-0.03em` | Marketing Hero H1 |
| `display-lg` | `clamp(2.25rem, 1.5rem + 3.2vw, 3.5rem)` (`36→56px`) | Display | 800 | 1.08 | `-0.025em` | Landing sub-hero |
| `h1` | `clamp(1.875rem, 1.35rem + 2.2vw, 2.75rem)` (`30→44px`) | Display | 700 | 1.15 | `-0.02em` | Marketing section / Admin page title (`28px` cap in admin) |
| `h2` | `clamp(1.5rem, 1.2rem + 1.3vw, 2.125rem)` (`24→34px`) | Display | 700 | 1.20 | `-0.015em` | Sub-section |
| `h3` | `clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)` (`20→26px`) | Display | 700 | 1.30 | `-0.01em` | Package card title |
| `h4` | `1.125rem` (`18px`) | Body | 600 | 1.40 | `0` | Small card / Admin drawer header |
| `body-lg` | `1.125rem` (`18px`) | Body | 400 | 1.65 | `0` | Marketing lead |
| `body` | `1rem` (`16px`) | Body | 400 | 1.60 | `0` | Default Latin prose |
| `body-bn` | `1.0625rem` (`17px` min) | Bangla | 400/500 | 1.85 | `0` | Default Bangla prose / itineraries |
| `body-sm` | `0.9375rem` (`15px`) | Body | 400 | 1.55 | `0` | Dense marketing lists / Admin table cells (`14px`–`15px` Latin; `17px` if Bangla) |
| `caption` | `0.875rem` (`14px`) | Body | 500 | 1.45 | `0.005em` | Photo captions, table secondary meta |
| `overline` | `0.8125rem` (`13px`) | Body | 700 | 1.30 | `0.09em` | Eyebrow label (UPPERCASE Latin only) |
| `price-lg` | `clamp(1.5rem, 1.2rem + 1.2vw, 2rem)` (`24→32px`) | Num | 700 | 1.10 | `-0.01em` | Package price (`tabular-nums`) |
| `price-sm` | `1.125rem` (`18px`) | Num | 600 | 1.20 | `0` | Compact card / Admin ledger totals (`tabular-nums`) |

---

## 6. Iconography, Illustration, Texture & Photography Direction

### 6.1 Icons (`assets/icons.svg`)
- **Geometry:** 24×24 Lucide-style stroke icons, round linecaps and linejoins.
- **Inherited Stroke Rule:** Never hardcode `stroke-width` inside `<symbol>` paths or `<defs><style>`. Set `--te-ic-sw` on the host `.ic` class per size (target ~`1.5px` optical stroke) so `16px` and `24px` icons match visually.
- **Exception:** Third-party brand glyphs (`whatsapp`, `facebook`) remain solid fills (`fill="currentColor"`), never redrawn as line icons.

### 6.2 Flat Vector Illustration `[PROPOSED]`
- **Strict 5-Color & Zero-Gradient Rule:** Match the logo's geometric construction strictly: **pure flat fills only, zero `<linearGradient>` / `<radialGradient>` inside illustration shapes, zero stroke outlines, zero gray/dark-navy transparency mud**. Colors MUST come exclusively from the 5 original logo artwork values:
  - Sunset Orange `#ED7C30`
  - Sand Orange `#F2A15F`
  - Sky Blue `#4394D5`
  - Deep Ocean `#3171AE`
  - Horizon White `#FFFFFF`
- Use clean upper-right daylight geometry and logo object vocabulary (plane, minibus, kayak/boat, palm, sun, faceted peaks, water ripples). Unphotographed routes such as **Kashmir by Road** (where no supplied team photo exists) MUST use a bright 5-color flat illustration paired with an explicit non-photo caption cue (`Route Illustration`) rather than dark gradients or stock imagery.

### 6.3 Approved Brand Textures & Surface Treatments `[PROPOSED]`
1. **Horizon Split** (`--te-grad-horizon`): `17deg` Sunset-to-Ocean gradient separated by a mandatory `#FFFFFF` midpoint (`50%`) to prevent muddy orange-blue mixing.
2. **Infinity Radial Glow Ambient Canvas** (`--te-glow-infinity`, `--te-glow-warm`, `--te-glow-sky`): Never clamp separate boxed ambient glows onto individual content sections (which breaks page continuity with horizontal seams). Instead, apply ONE **continuous infinity radial-glow canvas** spanning seamlessly behind transparent sections across `body` so soft Sunset Orange (`rgba(237, 124, 48, 0.08)`) and Sky Blue (`rgba(67, 148, 213, 0.08)`) pools flow uninterrupted from section to section. Preserves ≥60% clean white luminance and collapses cleanly under `[data-contrast="high"]` and `prefers-contrast: more`.
3. **Frosted Glassmorphism** (`--te-glass-bg`, `--te-glass-border`, `--te-glass-blur`): `backdrop-filter: saturate(140%) blur(16px)` white frosted panels (`rgba(255, 255, 255, 0.80)`, hairline border `rgba(223, 229, 236, 0.85)`) applied across floating navigation chrome, mobile slide-over drawers, full-bleed Hero copy panels, Hero slide controller bars, interactive Route Map stop cards, review cards, and subtle footer highlight chips-never on dense admin data tables or tiny multi-line inputs. Must include solid `--te-glass-bg-strong` fallback inside `@supports not (backdrop-filter: blur(1px))` and collapse cleanly in high-contrast mode.
4. **Flight Streak**: `repeating-linear-gradient(107deg, rgba(237,124,48,0.07) 0 2px, transparent 2px 18px)` - max opacity `0.10` light / `0.14` dark; never behind body copy at `>0.06`.
5. **Contour Ridge**: `1.5px` stroked open topographic lines in `orange-200` (light) or `#24405C` (dark), max 6 nested lines bleeding off an edge.
6. **Wave Shelf**: 2–3 flat stacked shallow wave layers (`#4394D5`, `#3A7EB5`, `#3171AE`), crest amplitude ≤10% of band height.

### 6.4 Photography Direction
- **Proof Over Stock:** Use authentic group photos from `assets/img/` (Meghalaya, Dawki, Nepal). **Rule:** Never substitute generic stock photos for Kashmir-show a brand-vocabulary illustration until a real Kashmir trip photo is supplied.
- **Subject & Grading:** Candid group shots in mountains/water with transport visible; golden-hour bias (`+100K` to `+250K`), saturation ≤ `+5`, natural skin tones preserved (never orange-cast faces).
- **Text Over Photos:** Mandatory `--te-scrim` (`rgba(19,36,54,0.88)` bottom → `0.55` at 38% → `0`), solid card panel, or `72%` Night Ocean duotone.
- **Crops:** Hero `21:9` desktop / `4:5` mobile; Package card `16:10`; Destination disc `1:1`; Gallery masonry native aspect; OG share `1200×630`.

---

## 7. Grids, Composition & The 17° Flight Angle

### 7.1 Responsive Grid System
| Breakpoint | Range | Columns | Gutter | Margin | Container |
|---|---|---|---|---|---|
| `xs / sm` | `< 640px` | 4 | 16px | 20px | Fluid (`360px` baseline) |
| `md` | `640–1023px` | 8 | 20px | 32px | Fluid |
| `lg` | `1024–1279px` | 12 | 24px | 40px | 1120px |
| `xl` | `1280–1535px` | 12 | 24px | 48px | 1240px (1200–1240px baseline) |
| `2xl` | `≥ 1536px` | 12 | 32px | 64px | 1280px max |

### 7.2 17° Flight Angle Arithmetic
- Because `tan(17°) = 0.3057`, a diagonal cut is only genuinely `17°` when its vertical rise equals **`30.57%` of its horizontal run** (`--te-cut-rise: min(30.57vw, 170px)`). Never stretch a shallow 36px full-width strip and call it `17°`-if vertical space is tight, shorten the horizontal run into a corner wedge.
- **Gentle / Crisp Seam Rule:** Never stretch a deep vertical triangle wedge across narrow mobile viewports (which reads steeper than 35°–45° and pushes footer branding down). For the footer top transition, use either a clean **`4px` full-width Horizon Split accent (`--te-grad-horizon`)** flush above Night Ocean `#132436` or a gentle shallow accent stripe; reserve angled wedges for subtle accent marks (`72px × 3px` Flight Rule).
- **Permitted uses:** `72px × 3px` rotated Flight Rule under section overlines, `4px` Horizon Split footer accent, subtle nav underline climb, `skewX(-6deg)` featured badges (counter-skewed text), and card hover lift `translate(2px, -6px)`.
- **Forbidden uses:** Inside data tables, inside form controls, navigation bars, or dense admin panels.

---

## 8. Voice, Microcopy & Motion Principles

### 8.1 Voice & Bilingual Microcopy
- **Tone:** First-person communal (`"we"`, `"our team"`), concrete numbers (`7 travellers`, `৳58,500`, `Season 5`), honest exclusions, Chattogram-grounded. Preserves authentic cultural phrases (*Alhamdulillah*, *Insha'Allah*) in trip reports and Bangla announcements, while keeping transactional UI/error copy neutral and direct.
- **CTAs:** `Book Your Seat` (`সিট বুক করুন`), `Chat on WhatsApp` (`হোয়াটসঅ্যাপে চ্যাট করুন`), `View Itinerary` (`বিস্তারিত দেখুন`), `Call 01838-754207`. Never `"Submit"`, `"Click here"`, or `"Learn more"`.
- **Standard Microcopy:**
  - *Form success:* `"Thank you. We will call you within one working day."`
  - *Form error:* `"Please enter a valid Bangladeshi mobile number."` *(no exclamation marks)*
  - *Sold out:* `"This departure is full. Ask us about the next one."`
  - *Empty gallery:* `"Photos from this trip are on the way."`
  - *404:* `"This route does not exist yet."` + link to all tours.
- **Formatting:** Prices always `৳58,500` (no space after `৳`, Western digits, `tabular-nums`); dates `11–15 Nov 2025` (en dash); phone display `01838-754207`.

### 8.2 Motion Principles
- **Durations:** `instant 100ms`, `fast 180ms`, `base 260ms`, `slow 420ms`, `scenic 700ms`.
- **Easings:** `ease-out cubic-bezier(0.16, 1, 0.30, 1)` (arrivals), `ease-in cubic-bezier(0.70, 0, 0.84, 0)` (exits), `ease-lift cubic-bezier(0.34, 1.26, 0.64, 1)` (cards only).
- **Signature Departure:** Elements enter along the Flight Angle (`translate(-14px, 10px) → (0, 0)`), staggered by `60ms` (capped at 6 items). Only `transform` and `opacity` animate.
- **Accessibility:** `prefers-reduced-motion: reduce` collapses animations to `0.01ms` and displays static hero frames immediately.

---

## 9. Rules for Marketing Pages vs. Dense Admin Interfaces `[PROPOSED]`

Both experiences share the exact same **color tokens, font families, semantic badges, and contrast floors**-never create a separate grey "admin palette". They diverge strictly on **density, geometry, and motion**.

| Dimension | Public Marketing Pages | Dense Admin Interfaces (Bookings, Bank Verification, Visa Queue) |
|---|---|---|
| **Goal** | Inspire trust, showcase real group proof, convert via WhatsApp/booking. | Scan 20–50 rows at once, verify Islami/EBL deposits, manage seats & passports. |
| **Whitespace & Rhythm** | Airy: 60% white field, `--te-section-y: clamp(4rem, 8vw, 7rem)`, `16px–24px` card padding. | Compact: `12px–16px` panel padding, `40px–44px` table rows, `16px` grid gutters, max-width `1440px` fluid workspace. |
| **17° Flight Angle** | Active: hero cuts, Flight Rules, `translate(2px, -6px)` card hover, `skewX(-6deg)` featured pills. | **Restricted:** Zero diagonal cuts, zero skewed badges, zero diagonal hover lifts. At most one subtle `2px` orange top accent bar in the sidebar/header. |
| **Typography & Numerals** | Hero up to `72px` (`display-xl`), `body` `16px`, `body-bn` `17px`. | Page title capped at `24px–28px`; table cells `14px` Latin (`tabular-nums` mandatory on `৳` amounts, seat counts, dates) / `17px` minimum for any Bangla notes; monospace `13px` for Booking IDs & A/C numbers (`20501620205843017`). |
| **Surfaces & Borders** | Cards (`16px` radius), `--te-shadow-sm`, `orange-50` / `blue-50` alternating bands. | Crisp `1px solid #DFE5EC` hairlines, `--te-r-sm` (`8px`) / `--te-r-md` (`12px`) containers, `#F7F9FB` sticky table headers, zero heavy drop shadows. |
| **Controls & Forms** | Large `44px–52px` pill CTAs, single primary CTA per viewport. | Compact `36px–40px` pill/rounded-8px toolbar actions (still `44px` touch hit-area on tablet), `--te-field-bg` (`#F7F9FB`) inline filter inputs, explicit semantic status pills (`Confirmed`, `Deposit Pending`, `Visa Hold`, `Sold Out`). |
| **Motion** | Scroll-triggered `te-depart`, `700ms` scenic image reveals, optional WebGL journey. | Instant state feedback (`100ms–180ms`), zero scroll reveals, zero 3D canvas, zero decorative parallax. |

---

## 10. GATE 1 - Approval Checklist

Approve or request revisions on the following proposed decisions before any UI component library or new SVG lockup generation begins:

- [ ] **Logo Fidelity:** Confirm `assets/brand/logo-mark.svg` and `logo.jpg` observations match the authoritative artwork and approve preserving the `17°` overhang without cropping.
- [ ] **Proposed Logo Derivatives:** Approve generating SVG files for: (a) White-backed Reverse Mark for dark backgrounds, (b) Disc-Only Avatar, (c) Single-Color Monochrome (`#132436` / `#FFFFFF`), and (d) Horizontal & Stacked Wordmark Lockups in Plus Jakarta Sans 800.
- [ ] **Derived Palette & Sand Orange Reconciliation:** Approve the 50–950 ramps, blue-tinted slate neutrals (`#111823` ink floor), Night Ocean (`#132436`) dark theme, `#A45826` text orange, `#111823` ink on `#ED7C30` buttons, and keeping `#F2A15F` inside logo artwork vs. `#F2A16A` (`orange-400`) in UI ramps.
- [ ] **Typography Pairing:** Approve Plus Jakarta Sans + Inter + Hind Siliguri (+ optional JetBrains Mono for admin IDs), the `17px` Bangla floor, and the `13px` Latin UI floor.
- [ ] **Marketing vs. Admin Rules & Brand Direction:** Approve positioning, bilingual voice/microcopy rules, real-photo-first Kashmir gap policy, 17° marketing geometry, and flat high-density admin table standards.
