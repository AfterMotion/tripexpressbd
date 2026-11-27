# Trip Express BD - Website Build Context & Source Reconciliation

**Purpose:** Authoritative technical & brand intake brief for future website/portal builds. Synthesizes all brand documents, token layers, existing landing-page assets, component libraries, conflicts, missing tokens, and open business questions **without replacing existing brand decisions**.  
**Rule:** Do not build new pages from this document until open material approvals and missing business facts are confirmed.

---

## 1. Authoritative File Paths

| Domain | Authoritative Path | Role |
|---|---|---|
| **Agent Rules & Skill** | [AGENTS.md](../AGENTS.md), [SKILL.md](../SKILL.md) | Mandatory read order, token reuse, accessibility & change-control rules |
| **Brand Strategy & Audit** | [docs/BRAND_GUIDELINES.md](BRAND_GUIDELINES.md), [docs/BRAND_FOUNDATIONS.json](BRAND_FOUNDATIONS.json) | Asset inventory, source vs. derived palette, voice, logo rules, Gate 1 status |
| **Design System & Inventory** | [docs/DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [docs/COMPONENT_INVENTORY.md](COMPONENT_INVENTORY.md), [docs/QUALITY_REPORT.md](QUALITY_REPORT.md) | 3-layer token specs, WCAG 2.2 AA contrast audit, component contracts (`implemented` vs. `spec-only`), QA log |
| **Canonical Tokens** | [tokens/design-tokens.json](../tokens/design-tokens.json), [tokens/tokens.css](../tokens/tokens.css), [tokens/themes.css](../tokens/themes.css), [tokens/tailwind.tokens.js](../tokens/tailwind.tokens.js) | **Single authoritative token source** (Primitives, Semantics, Component tokens, Light/Night Ocean Dark/High-Contrast/Compact) |
| **Brand Artwork** | [assets/brand/logo-mark.svg](../assets/brand/logo-mark.svg), [logo.jpg](../logo.jpg), [favicon.svg](../favicon.svg) | Supplied vector mark (`1839×1572`), raster master (`2048×2048`), and `64×64` plane monogram |
| **Icon Sprite & Photography** | [assets/icons.svg](../assets/icons.svg), `assets/img/{card,disc,gallery,hero,og}/` | Lucide 24×24 sprite (stroke inherited from host) + real tour photography + `og-share.jpg` (`1200×630`) |
| **Reference Showcase & Prototypes** | [brand-guide/index.html](../brand-guide/index.html), [design-system/index.html](../design-system/index.html), [showcase/index.html](../showcase/index.html) | Interactive static HTML references and 9 application pattern demos (client-side mocked state) |
| **Existing Root Landing Site** | [index.html](../index.html), [assets/css/site.css](../assets/css/site.css), [assets/css/tokens.css](../assets/css/tokens.css), `assets/js/{main,scene,three.brand}.js` | Live static marketing landing page + Three.js journey; `assets/css/tokens.css` acts as a zero-duplication bridge importing `tokens/` |
| **Historical Brand Skill** | `.claude/skills/trip-express-brand/` | Pre-Stage-1 skill reference; superseded by `tokens/` and `docs/` where reconciliations are documented below |

---

## 2. Fonts & Canonical Token Names

### 2.1 Approved Font Families (SIL OFL 1.1)
- **Display & Wordmark (Latin):** `'Plus Jakarta Sans', 'Hind Siliguri', 'Segoe UI', system-ui, -apple-system, sans-serif` (variable `700..800`)
- **Body, UI & Forms (Latin):** `'Inter', 'Hind Siliguri', 'Segoe UI', system-ui, -apple-system, sans-serif` (variable `400..700` to preserve `550`/`650` cuts)
- **All Bangla:** `'Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi', 'Segoe UI', sans-serif` (static `400;500;600` + `700` if needed; **17px minimum running text**, `line-height: 1.85`, `letter-spacing: 0`, never uppercase)
- **Prices, Dates, Ledger Columns:** `'Inter', 'Hind Siliguri', system-ui, sans-serif` with `font-variant-numeric: tabular-nums` (`.te-num`)
- **Admin IDs / Bank Accounts (Optional Portal/Admin):** `'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace` (`.te-mono`)

### 2.2 Canonical Token Naming (`tokens/tokens.css` + `tokens/themes.css`)
- **Layer 1 Primitives (`--te-p-*`):** `--te-p-orange-{50..950}`, `--te-p-sky-{50..950}`, `--te-p-ocean-{50..950}`, `--te-p-n-{0..950}`, `--te-p-green-*`, `--te-p-amber-*`, `--te-p-red-*`, `--te-p-wa-*`, `--te-p-dark-*`, `--te-p-fs-*`, `--te-p-space-{0..32}`, `--te-p-r-{xs..disc}`, `--te-p-shadow-*`, `--te-p-dur-*`, `--te-p-ease-*`, `--te-p-z-*`, `--te-p-flight-angle` (`17deg`), `--te-p-rule-angle` (`3deg`, `-3deg` for text-adjacent Flight Rules), `--te-p-cut-rise` (`min(30.57vw, 170px)`).
- **Layer 2 Semantics:** `--te-bg-{canvas,subtle,warm,cool,dark-band}`, `--te-surface-{card,raised,field,readonly,selected,disabled,overlay}`, `--te-border-{subtle,strong,control}`, `--te-text-{heading,body,muted,readonly,disabled,inverse,overline,link,link-hover}`, `--te-action-{primary,secondary,danger}-*`, `--te-focus-ring`, `--te-status-{success,warning,error,info}-*`, `--te-wa-{solid,soft}-*`, `--te-chart-series-{1..5}`.
- **Layer 3 Component Tokens:** `--te-btn-*`, `--te-input-*`, `--te-table-*`, `--te-nav-*`, `--te-card-*`, `--te-badge-*`, `--te-dialog-*`, `--te-chart-*`.
- **Legacy Bridge (`assets/css/tokens.css`):** Maps 114 legacy short names used by `assets/css/site.css` (`--te-bg`, `--te-orange-500`, `--te-action-bg`, etc.) directly to `tokens/`.

---

## 3. Approved Logo & Imagery Rules

- **Supplied Artwork (Preserve Untouched):** Only `assets/brand/logo-mark.svg` (4-layer flat `evenodd` vector) and `favicon.svg` (`64×64` orange-disc plane monogram) exist as source vectors; `logo.jpg` (`2048×2048`) is the raster master.
- **Geometry & Clear Space:** Preserve the `17.12°` overhanging aircraft streak (never clip to circle); minimum clear space = **`0.25 × disc diameter`** on all four sides; primary mark minimum height = **`40px`** screen / `15mm` print; switch to `favicon.svg` monogram below `32px`.
- **Dark-Surface Cutout Constraint:** Because `assets/brand/logo-mark.svg` has transparent `evenodd` cutouts with no white backing fill, **never place it raw on `#132436` or photography**-wrap it in a `#FFFFFF` circular disc chip until Gate 1 approves exporting a white-backed reverse SVG.
- **Photography & Stock Prohibition:** Use real tour photography from `assets/img/` (Nepal, Meghalaya, Dawki, Shillong). Never substitute generic stock photography; destinations without photos (Kashmir, Sikkim, Maldives, Sri Lanka) use brand artwork/night discs. Never place text over unmodified photos without `--te-scrim`, a solid card, or `72%` Night Ocean duotone.

---

## 4. Existing Components Inventory

### A. Root Landing Site Components (`index.html` + `assets/css/site.css` + `assets/js/main.js`)
Already built for the single-page marketing site: sticky `.hdr` header, `.rail` mobile journey rail, `.drawer` mobile slide drawer, `.journey` / `.hero` WebGL-or-photo stage, `.dests` horizontal/grid destination discs, `.cards` / `.card` package cards, `.incl` inclusion/exclusion lists, `.gallery` infinite column masonry + `.lb` lightbox, `.stats` Night Ocean counter band, `.reports` trip reports, `.formcard` 5-field enquiry form (client-side only), `.ftr` `17°` Night Ocean footer, and `.fab` floating WhatsApp pill.

### B. Design System & Showcase Library (`design-system/` + `showcase/`)
Token-bound reusable CSS/JS components documented in [docs/COMPONENT_INVENTORY.md](COMPONENT_INVENTORY.md):
- **`implemented`:** Buttons (`primary`, `secondary`, `outline`, `ghost`, `danger`, `wa`, `icon`, async loading), inline links, toggle chips, status badges (`-6deg` marketing / flat compact admin), 3-step stepper, skeletons/spinners, live toasts & `alertdialog` confirms, `+880` forgiving phone validation, password show/hide, `one-time-code` OTP, read-only & error inputs, native select, checkbox & accessible `te-switch`, marketing header/rail, admin sidebar/drawer, `ArrowLeft/Right` keyboard tabs, slide-over right detail drawer, package & KPI cards, proof lightbox, advanced CRUD table (sortable, bulk select, mobile stacked fallback), accessible SVG bar chart + `<details>` data table, permission matrix, and 9 complete HTML page demos.
- **`spec-only`:** Split Button, Avatar Group (`+N`), Textarea Counter, Multiselect/Cascading Select, Drag-Dropzone, Rich Text Editor, Mega Menu, Command Palette, Resizable Split Panel, Itinerary Accordion, Popover/Tooltip/Nested Menu, Calendar/Scheduler, Tree View, and Advanced Filter Builder.

---

## 5. Target Stack

- **Current Repository Stack:** Static **HTML5 + Vanilla CSS3 + Vanilla ES Modules** (verified absent: `package.json`, `tailwind.config.js`, `next.config.js`). Uses Google Fonts CDN and Three.js `0.169.0` via `<script type="importmap">` in root `index.html`.
- **Portable Migration Targets:** `tokens/tailwind.tokens.js` + `SKILL.md` provide ready mappings for **Tailwind CSS**, **React / Next.js (JSX)**, and **Vue 3** if a framework build is commissioned.

---

## 6. Conflicts Found & Authoritative Resolutions

| # | Conflict | Conflicting Sources | Authoritative Resolution (No Material Brand Change) |
|---|---|---|---|
| 1 | **Sand Orange HEX (`#F2A15F` vs `#F2A16A`)** | `logo.jpg`, `assets/brand/logo-mark.svg`, & `.claude/.../02-color.md` §1 use `#F2A15F`; `02-color.md` §2 (`orange-400`), `tokens/design-tokens.json`, & `tokens/tokens.css` use `#F2A16A`. | Keep `#F2A15F` inside logo artwork; use `#F2A16A` (`--te-p-orange-400`) in UI ramps to hold a constant `24°` hue (`7.56:1` vs `7.53:1` on `#132436`). |
| 2 | **Primary CTA Contrast Ratio (`5.66:1` vs `6.39:1`)** | `.claude/.../09-accessibility-and-qa.md` & `.claude/.../SKILL.md` state `5.66:1` for `#111823` on `#ED7C30`. | Verified WCAG 2.2 luminance ratio for `#111823` on `#ED7C30` is **`6.39:1`** (`5.66:1` is `#1B2330`). Cite **`6.39:1`** per `docs/DESIGN_SYSTEM.md`. |
| 3 | **Overline Size & Tracking (`12px/0.12em` vs `13px/0.09em`)** | `.claude/.../11-responsive-standards.md` §3 lists `12px` / `0.12em`; `.claude/.../03-typography.md` & `tokens/tokens.css` enforce `13px` (`0.8125rem`) / `0.09em`. | Standardized on **`13px / 0.09em`** (`0.07em` `<640px`) in `tokens/tokens.css` and `assets/css/tokens.css`. |
| 4 | **Bangla Running Text Floor (`15px` vs `17px`)** | `.claude/.../03-typography.md` §2 line 53 cites `15px`, while §6 & `AGENTS.md` & `tokens/tokens.css` enforce `17px`. | Enforce **`17px`** minimum Bangla running text (`--te-p-fs-bn-min`) and **`16px`** Bangla UI chips. |
| 5 | **Root `index.html` Footer Logo Cutouts** | `index.html` line 775 places raw `assets/brand/logo-mark.svg` directly on dark `#132436` `.ftr`, letting dark navy bleed through `evenodd` transparent holes. | Do **not** alter `logo-mark.svg` without approval; wrap footer mark in `#FFFFFF` disc chip or use a Gate-1-approved white-backed reverse SVG. |
| 6 | **Hardcoded Hex in Root `assets/css/site.css`** | `assets/css/site.css` contains **48 raw hex values** (e.g., `#fff`, `#DCE5EE`, `#CFDAE6`, `#D3DDE7`, `#BCCAD8`) instead of `tokens/` aliases. | Migrate `site.css` raw hexes to `tokens/` variables during future site refactoring (`assets/css/tokens.css` itself is now a 0-hex bridge). |
| 7 | **Kashmir Illustration Gradient vs Flat Rule** | `.claude/.../07-imagery-and-texture.md` §6 bans gradients inside illustrations (5 flat colors only); `index.html` lines 407-435 uses linear gradients `#k-sky` / `#k-near`. | Follow `07-imagery-and-texture.md` flat 5-color rule for new illustrations unless `index.html` dawn-ridge style is explicitly approved. |
| 8 | **Brand Guide Inline Styles (`brand-guide/index.html`)** | Created in Stage 1 before `tokens/` existed; carries inline `:root` hex variables. | Keep as Stage 1 visual archive or link `tokens/tokens.css` in maintenance; never copy inline `:root` blocks into new builds. |

---

## 7. Unsupported / Missing Tokens

The following tokens are referenced by `assets/css/site.css` (via `assets/css/tokens.css` bridge) or `docs/COMPONENT_INVENTORY.md` (`spec-only`), and are **not yet formalized inside `tokens/tokens.css` / `tokens/design-tokens.json`**:
1. **Glass & Header Alpha Tokens:** `--te-glass-bg`, `--te-glass-bg-strong`, `--te-glass-border`, `--te-glass-blur`, `--te-hdr-bg`, `--te-hdr-bg-stuck`, `--te-ring`.
2. **3D / WebGL Tokens:** `--te-3d-canvas-max-h-mobile`, `--te-3d-canvas-max-h-desktop`, `--te-3d-fallback-bg`, `--te-3d-fade-in`.
3. **Additional Fluid Type Aliases:** `--te-fs-display`, `--te-fs-lead`, `--te-fs-price`, `--te-fs-stat`.
4. **Unmapped `site.css` Intermediate Slate Hexes:** `#DCE5EE`, `#CFDAE6`, `#D3DDE7`, `#BCCAD8` (closest canonical steps are `--te-p-n-200` `#DFE5EC` and `--te-p-n-300` `#C6CFDA`).
5. **Layer 3 Tokens for `spec-only` Widgets:** `--te-tooltip-*`, `--te-popover-*`, `--te-accordion-*`, `--te-stepper-*`, `--te-skeleton-*`.

---

## 8. Unanswered Business Facts (Require Owner Input Before Production Launch)

1. **Social URL:** Root `index.html` line 783 links to generic `https://www.facebook.com/` - exact Trip Express BD Facebook Page URL is unverified in `plan.md`. *(Domain `tripexpressbd.com` is confirmed in `CNAME`.)*
2. **Unpriced & Undated Destinations:** Only **Explore Nepal** (`৳58,500`, 5D/4N) and **Kashmir by Road** (`৳35,000`, Season 5) have published BDT prices; **Meghalaya**, **Sikkim**, **Darjeeling**, **Kolkata**, **Maldives & Sri Lanka**, and **Domestic Bangladesh** need current pricing and upcoming departure dates.
3. **Missing Destination Photography:** Real photos exist only for Meghalaya, Dawki, Shillong, and Nepal. Real photos for **Kashmir**, **Sikkim**, **Darjeeling**, **Kolkata**, **Maldives**, and **Sri Lanka** have not been supplied.
4. **Legal, Licensing & Office Hours:** Missing office opening hours, formal cancellation/refund schedule, privacy policy, and Bangladesh civil aviation/ATAB/trade-license details.
5. **Partner Assets:** No supplied logo file exists for partner **তাঁবু নিবাসী**.
6. **Backend & Payment Gateway:** Target form submission endpoint, admin auth/OTP provider, and whether online payments (bKash/Nagad/SSLCommerz) will supplement Islami Bank / Eastern Bank deposits are undecided.

---

## 9. Material Brand Approvals Required Before Next Build

> **No material brand decision is altered without explicit sign-off:**
1. **Logo Derivatives (Gate 1):** Approve generating SVG files for (a) **White-Backed Reverse Mark** (fixes `index.html` dark-footer cutout bleed), (b) **Disc-Only Avatar**, (c) **Monochrome (`#132436` / `#FFFFFF`)**, and (d) **Plus Jakarta Sans 800 Wordmark Lockups**.
2. **Kashmir Artwork Policy:** Confirm whether new Kashmir/missing-photo graphics follow the strict **flat 5-color rule** or the multi-stop gradient ridge in `index.html`.
3. **Token Consolidation:** Approve migrating the 48 raw hex values in `assets/css/site.css` and adding glass/3D tokens directly into `tokens/tokens.css` + `tokens/design-tokens.json`.
