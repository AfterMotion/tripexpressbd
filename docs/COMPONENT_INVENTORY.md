# Trip Express BD - Component Inventory & Design Contracts

**Version:** `3.0.0-gate3`  
**Status Legend:** `implemented` (interactive HTML/CSS/JS specimen or page prototype live) · `spec-only` (Gate 2 contract complete; awaiting dedicated Prompt 3B interactive widget build) · `missing` (not yet authored)  
**HTML Previews:** [Design System Reference](../design-system/index.html) · [Showcase Index](../showcase/index.html)  
**All components consume Layer 3 tokens from** [tokens.css](../tokens/tokens.css) **and** [themes.css](../tokens/themes.css).

---

## Global Component Contracts

- **Minimum Touch Target:** `44×44 CSS px` with `≥ 8px` separation (`sm`/`compact` controls extend hit area via `::after` inset).
- **Focus Trap & Return:** All modal overlays (`Dialog`, `Drawer`, `Lightbox`) trap `Tab`/`Shift+Tab`, close on `Escape`, lock background scroll cleanly, and restore focus to the opener.
- **Validation Policy:** Validate on blur/submit (`no-premature-validation`), clear errors immediately on fix, focus error summary on failed submit, and never block paste.
- **Bilingual Support:** Any slot accepting Bangla text inherits `:lang(bn)` (`Hind Siliguri`, `≥ 17px` body / `≥ 16px` UI chip, `1.85` line-height, zero uppercase/tracking).
- **Section Header & Flight Rule Clearance:** Text-adjacent Flight Rules (`.rule`, `.te-flight-rule`) MUST use `--te-p-rule-angle-neg` (`-3deg`, `~3.4–3.8px` rise) with `margin: 12px 0 16px` (`10px 0 12px` on `<640px` mobile) — never `-17deg` under overlines/headings, preventing overlap on responsive screens.
- **Command Palette & Bulk Action Contracts:** `Ctrl+K` / `Cmd+K` opens modal (`role="dialog"`, `aria-modal="true"`) with live filtered list (`role="listbox"` / `ArrowUp`/`ArrowDown`/`Enter` navigation, `Escape` closes and returns focus). Compact admin shells enforce `[data-density="compact"]` (`40px` rows, `36px` controls, `8px` card/button radii, zero `17°` skew), and client-side RBAC role switching only controls UI visibility while documenting mandatory server-side enforcement.

---

## Category 1: Actions & Status

| Component | Variants | Sizes | Tokens Consumed | Preview Link | Status |
|---|---|---|---|---|---|
| **1.1 Button** | `primary`, `secondary`, `outline`, `ghost`, `danger`, `whatsapp-soft`, async loading | `sm (36px)`, `md (44px)`, `lg (52px)` | `--te-btn-*` | [Design System](../design-system/index.html#comp-button) | `implemented` |
| **1.2 Text Link** | `inline-prose`, `standalone-arrow` | Inherited / `caption` | `--te-text-link`, `--te-text-link-hover` | [Design System](../design-system/index.html#comp-button) | `implemented` |
| **1.3 Icon Button** | `ghost`, `outline`, notification bell, password eye | `sm`, `md` (44px hit) | `--te-btn-ghost-*` | [Dashboard](../showcase/05-admin-dashboard.html) | `implemented` |
| **1.4 Split Button & Button Group** | `primary-split`, `segmented-group` | `sm`, `md` | `--te-btn-*` | - | `spec-only` |
| **1.5 Floating Action (WhatsApp)** | `brand-surface-pill` / header WA pill | `44px–56px` | `--te-wa-*` | [Marketing Home](../showcase/01-marketing-home.html) | `implemented` |
| **1.6 Toggle & Toolbar** | `theme-switch`, `contrast-switch`, `density-switch`, `te-chip` | `sm`, `md` | `--te-surface-selected` | [Design System](../design-system/index.html#comp-button) | `implemented` |
| **1.7 Status Badge & Chip** | `featured (-6deg)`, `success`, `warning`, `error`, `info`, `te-chip` | `sm`, `md` | `--te-status-*` | [Design System](../design-system/index.html#comp-badge) | `implemented` |
| **1.8 Avatar & Counter** | `traveller-disc`, `group-stack (+N)` | `24–64px` | `--te-p-r-disc` | - | `spec-only` |
| **1.9 Progress Bar & Stepper** | `3-step-wizard-bar` | `md` | `--te-action-primary-bg`, `--te-status-success-*` | [Booking Wizard](../showcase/04-onboarding-booking.html) | `implemented` |
| **1.10 Skeleton & Spinner** | `sc-skel`, `te-spin` | `block`, `16px` | `--te-surface-raised` | [Tour Listing](../showcase/02-listing-search.html) | `implemented` |
| **1.11 Toast, Banner, Alert & Confirm** | `ds-toast`, `sc-banner-mock`, `alertdialog` | `compact`, `standard` | `--te-status-*`, `--te-p-z-toast` | [User CRUD](../showcase/06-admin-users-crud.html) | `implemented` |

---

## Category 2: Forms & Inputs

| Component | Variants | Tokens Consumed | Preview Link | Status |
|---|---|---|---|---|
| **2.1 Field Wrapper & Error Summary** | Stacked label, `*`, hint, `#errSummary` | `--te-text-heading`, `--te-status-error-text` | [Booking Wizard](../showcase/04-onboarding-booking.html) | `implemented` |
| **2.2 Text, Password, Tel (`+880`), Read-Only** | Forgiving BD phone validation, password show/hide, read-only bank A/C | `--te-input-*` | [Design System](../design-system/index.html#comp-input) · [Auth](../showcase/03-auth-flow.html) | `implemented` |
| **2.3 Textarea & Character Counter** | Multi-line notes with counter | `--te-input-*` | - | `spec-only` |
| **2.4 Search & Filter Input** | Section filter (`/` or `⌘K`), tour search, CRUD search | `--te-input-*` | [Tour Listing](../showcase/02-listing-search.html) | `implemented` |
| **2.5 Select (Native) vs Multiselect/Cascading** | Native `<select>` implemented; multiselect/cascading spec-only | `--te-input-*` | [Design System](../design-system/index.html#comp-input) | `implemented` (native) / `spec-only` (multi) |
| **2.6 Checkbox & Accessible Switch** | `te-check-row`, `te-switch` | `--te-action-primary-bg` | [Settings](../showcase/08-settings-profile.html) | `implemented` |
| **2.7 OTP / PIN Verification Input** | 6-digit pasteable `one-time-code` | `--te-input-*`, `--te-mono` | [Auth Flow](../showcase/03-auth-flow.html) | `implemented` |
| **2.8 File / Passport Upload** | Native `<input type="file">` specimen; drag-dropzone spec-only | `--te-input-*` | [Booking Wizard](../showcase/04-onboarding-booking.html) | `implemented` (basic) / `spec-only` (dropzone) |
| **2.9 Rich Text Editor** | Itinerary notes toolbar | `--te-input-*` | - | `spec-only` |
| **2.10 Multi-Step Form Wizard** | 3-step booking wizard with error summary | `--te-action-primary-*` | [Booking Wizard](../showcase/04-onboarding-booking.html) | `implemented` |

---

## Category 3: Navigation & Layout

| Component | Variants | Tokens Consumed | Preview Link | Status |
|---|---|---|---|---|
| **3.1 Marketing Header & Mobile Journey Rail** | Sticky header + mobile scroll-snap rail | `--te-nav-*` | [Marketing Home](../showcase/01-marketing-home.html) | `implemented` |
| **3.2 Admin App Shell & Sidebar Drawer** | Fixed desktop sidebar (`248px`) → mobile drawer | `--te-nav-sidebar-*` | [Dashboard](../showcase/05-admin-dashboard.html) | `implemented` |
| **3.3 Tabs (Keyboard `ArrowLeft/Right`)** | `role="tablist"` with focus management | `--te-nav-active-indicator` | [Design System](../design-system/index.html#comp-table) · [Record](../showcase/07-record-detail.html) | `implemented` |
| **3.4 Breadcrumbs & Skip Link** | 3-level record breadcrumb, skip-to-content | `--te-text-link` | [Record Detail](../showcase/07-record-detail.html) | `implemented` |
| **3.5 Slide-Over Right Drawer & Filter Sheet** | `sc-drawer-right` with `Esc` + focus trap | `--te-dialog-*` | [Tour Listing](../showcase/02-listing-search.html) · [User CRUD](../showcase/06-admin-users-crud.html) | `implemented` |
| **3.6 Footer (Night Ocean + 17° Cut)** | 3-col Chattogram contact footer | `--te-bg-dark-band` | [Marketing Home](../showcase/01-marketing-home.html) | `implemented` |
| **3.7 Command Palette (`Ctrl+K` / `/`)** | Global search modal, route jump, keyboard `ArrowUp/Down/Enter` | `--te-dialog-*`, `--te-surface-selected` | [Admin Portal](../admin/index.html) | `implemented` |
| **3.8 Pagination & Sticky Bulk Action Bar** | Page size, prev/next, multi-row bulk bar | `--te-surface-raised`, `--te-border-subtle`, `--te-btn-*` | [Admin Portal](../admin/index.html) | `implemented` |

---

## Category 4: Content & Marketing

| Component | Variants | Tokens Consumed | Preview Link | Status |
|---|---|---|---|---|
| **4.1 Hero Seamless Glass Slider (`#heroSlider`)** | Full-bleed desktop + open top mobile `16:11` stage, feathered dissolve into infinity glow, frosted dock | `--te-glass-*`, `--te-glow-infinity`, `--te-orange-500` | [Marketing Home](../showcase/01-marketing-home.html) · [Live Landing](../index.html#top) | `implemented` |
| **4.2 Destination Discs & Kashmir Flat Art** | Photo discs + 5-color brand illustration | `--te-p-r-disc` | [Marketing Home](../showcase/01-marketing-home.html) | `implemented` |
| **4.3 Featured Package Card & KPI Card** | Nested `16px/12px` radius, `-6deg` badge, `17°` lift | `--te-card-*` | [Design System](../design-system/index.html#comp-card) | `implemented` |
| **4.4 Proof Photo Grid & Modal Lightbox** | Real Meghalaya/Nepal/Dawki photos + lightbox | `--te-dialog-*` | [Marketing Home](../showcase/01-marketing-home.html) | `implemented` |
| **4.5 System State Illustrations (Empty/403/404/500/Maint)** | 5-color flat brand vector cards | `--te-status-*`, `--te-p-orange-500` | [System States](../showcase/09-system-states.html) | `implemented` |
| **4.6 Itinerary Accordion & Inclusion Lists** | Day timeline + check/cross split | `--te-status-*` | - | `spec-only` |

---

## Category 5: Overlays & Disclosure

| Component | Variants | Tokens Consumed | Preview Link | Status |
|---|---|---|---|---|
| **5.1 Modal Dialog & Destructive AlertDialog** | Focus trap, `Esc` close, focus return | `--te-dialog-*`, `--te-p-z-modal` | [User CRUD](../showcase/06-admin-users-crud.html) · [Record](../showcase/07-record-detail.html) | `implemented` |
| **5.2 Notification Center Modal** | Unread notification list | `--te-dialog-*` | [Dashboard](../showcase/05-admin-dashboard.html) | `implemented` |
| **5.3 Popover, Tooltip, Nested Menu, Coach Marks** | Secondary contextual disclosures | `--te-p-z-dropdown` | - | `spec-only` |
| **5.4 Corporate Lineage Glassmorphism Modal (`#brandModal`)** | Ultra-minimalist centered round Taabu Nibash logo modal (`2000ms` delayed `700ms` glide on every reload, `✕`/outside-click only) | `--te-glass-bg-strong`, `--te-glow-ambient`, `--te-p-z-modal` | [Live Landing](../index.html) · [Brand Guide](../brand-guide/index.html#logo) | `implemented` |

---

## Category 6: Data-Rich Widgets (Portal & Admin)

| Component | Variants | Tokens Consumed | Preview Link | Status |
|---|---|---|---|---|
| **6.1 Advanced CRUD Table & Stacked Mobile Table** | Search, role filter, sort, bulk checkboxes, mobile `sc-table-stack` | `--te-table-*` | [User CRUD](../showcase/06-admin-users-crud.html) | `implemented` |
| **6.2 Selectable Ledger Table** | Row selection + `tabular-nums` BDT | `--te-table-*`, `--te-num` | [Design System](../design-system/index.html#comp-table) | `implemented` |
| **6.3 Accessible Bar Chart + Table Fallback** | Colorblind-safe SVG bars + `<details>` data table | `--te-chart-*` | [Dashboard](../showcase/05-admin-dashboard.html) | `implemented` |
| **6.4 Activity Audit & Permission Matrix** | Chronological log + role capability table | `--te-table-*`, `--te-mono` | [Record](../showcase/07-record-detail.html) · [Settings](../showcase/08-settings-profile.html) | `implemented` |
| **6.5 Calendar/Scheduler, Tree View, Filter Builder** | Complex scheduling widgets | `--te-surface-*` | - | `spec-only` |

---

## Stage 3C Complete Page Patterns (9/9 Implemented)

| # | Page Pattern | Preview Link | Backend Mock Notes | Status |
|---|---|---|---|---|
| 1 | Marketing Homepage | [01-marketing-home.html](../showcase/01-marketing-home.html) | Enquiry form validates locally; no network POST | `implemented` |
| 2 | Tour Listing & Search | [02-listing-search.html](../showcase/02-listing-search.html) | Local JS tour array + simulated skeleton timer | `implemented` |
| 3 | Auth Flow (Login / Reset / OTP) | [03-auth-flow.html](../showcase/03-auth-flow.html) | Local validation; valid demo OTP is `123456` | `implemented` |
| 4 | 3-Step Booking Registration | [04-onboarding-booking.html](../showcase/04-onboarding-booking.html) | Calculates BDT totals & validates locally | `implemented` |
| 5 | Operations Admin Dashboard | [05-admin-dashboard.html](../showcase/05-admin-dashboard.html) | Date selector switches mock KPIs & chart | `implemented` |
| 6 | CRUD Traveller & User Manager | [06-admin-users-crud.html](../showcase/06-admin-users-crud.html) | In-memory array supports add/delete/sort/filter | `implemented` |
| 7 | Detailed Booking Record | [07-record-detail.html](../showcase/07-record-detail.html) | Static `TE-NEP-041` record + local void confirm | `implemented` |
| 8 | Settings & Permissions | [08-settings-profile.html](../showcase/08-settings-profile.html) | Syncs Light/Dark/High-Contrast in `localStorage` | `implemented` |
| 9 | System States (Empty/403/404/500/Maint) | [09-system-states.html](../showcase/09-system-states.html) | Interactive state switcher | `implemented` |
