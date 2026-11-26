# Trip Express BD - Brand, Design System & UI Package (`v2.0.0`)

Portable design system, token architecture, brand guidelines, interactive component reference, and responsive HTML prototypes for **Trip Express BD** (Chattogram-based guided group tour operator).

> **Prototype Status Notice:** The interactive pages in `design-system/` and `showcase/` are **static browser reference prototypes** with intentionally mocked client-side state (no backend auth, database, or payment processing). Do not treat them as production-ready applications without backend integration and manual browser/screen-reader QA (see [QUALITY_REPORT.md](docs/QUALITY_REPORT.md)).

---

## 1. Authoritative Token Source

**One source of truth:** All colors, typography, spacing, radii, shadows, motion, and theme/density overrides live in `tokens/`.
- [tokens/design-tokens.json](tokens/design-tokens.json) - W3C DTCG 3-layer tokens (`primitive` → `semantic` → `component`)
- [tokens/tokens.css](tokens/tokens.css) - CSS custom properties (Primitives, Structural/Density Semantics, Layer 3 Component Tokens, Bangla `17px` floor, `:focus-visible`, `prefers-reduced-motion`)
- [tokens/themes.css](tokens/themes.css) - Light, Night Ocean Dark (`#132436` with full `prefers-color-scheme` parity), High Contrast (`[data-contrast="high"]`), and Compact Admin Density (`[data-density="compact"]`)
- [tokens/tailwind.tokens.js](tokens/tailwind.tokens.js) - Tailwind `theme.extend` bound to CSS custom properties

Legacy [assets/css/tokens.css](assets/css/tokens.css) imports `tokens/tokens.css` and `tokens/themes.css` and acts purely as a zero-duplication alias bridge for the root landing page (`index.html` + `assets/css/site.css`).

---

## 2. Quick Installation & Usage

### HTML / CSS
```html
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="tokens/themes.css">
```
Toggle modes via attributes on `<html>`:
- Theme: `data-theme="light"` | `data-theme="dark"` (auto-detects `prefers-color-scheme: dark` when unset)
- Contrast: `data-contrast="standard"` | `data-contrast="high"`
- Density: `data-density="comfortable"` (marketing/portal) | `data-density="compact"` (dense admin tables)

### Tailwind CSS
```js
const teTokens = require('./tokens/tailwind.tokens.js');
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: { extend: { ...teTokens } },
};
```
See [SKILL.md](SKILL.md) for **React / Next.js (JSX)** and **Vue 3** component examples, and [AGENTS.md](AGENTS.md) for AI agent rules.

---

## 3. Directory Map

```text
assets/brand/logo-mark.svg      Source 4-color SVG emblem (preserved untouched)
assets/css/tokens.css           Legacy compatibility bridge importing tokens/
brand-guide/index.html          Stage 1 brand audit, swatches, clear space & previews
design-system/
  index.html                    Interactive foundation & core component reference
  assets/ds.css, ds.js          Token-bound styles + search, theme/density & validation JS
docs/
  BRAND_GUIDELINES.md           Brand strategy, logo rules, sampled vs. derived palette
  BRAND_FOUNDATIONS.json        Machine-readable brand audit & Gate 1 specs
  DESIGN_SYSTEM.md              3-layer architecture, WCAG audits, layouts & chart rules
  COMPONENT_INVENTORY.md        Full component contracts, statuses & preview links
  QUALITY_REPORT.md             Automated checks, sandbox limits & manual QA checklist
showcase/
  index.html                    Hub for all 9 application pattern prototypes
  01-marketing-home.html        Marketing homepage (hero, discs, packages, proof, footer)
  02-listing-search.html        Tour search, filters, mobile sheet, skeleton, empty state
  03-auth-flow.html             Login, password reset & 6-digit OTP verification
  04-onboarding-booking.html    3-step tour registration wizard + error summary
  05-admin-dashboard.html       Compact admin KPIs, charts + accessible table fallback
  06-admin-users-crud.html      Sortable CRUD table, bulk actions, modal, drawer & confirm
  07-record-detail.html         TE-NEP-041 record detail with tabs, timeline & audit log
  08-settings-profile.html      Preferences, switches, high-contrast & role permissions
  09-system-states.html         Empty, 403, 404, 500 & Maintenance state gallery
tokens/
  design-tokens.json            Canonical W3C DTCG tokens
  tokens.css                    Canonical CSS Layer 1 + Layer 2 + Layer 3 variables
  themes.css                    Light, Night Ocean Dark, High-Contrast & Compact themes
  tailwind.tokens.js            Tailwind CSS theme extension
SKILL.md                        Portable multi-stack agent skill guide
AGENTS.md                       Repository agent guardrails & workflow
```

---

## 4. Local Preview

Serve over HTTP (recommended so all ES modules, fonts, and navigation links resolve identically to production):

```bash
python -m http.server 8731
# Brand Guide:    http://127.0.0.1:8731/brand-guide/
# Design System:  http://127.0.0.1:8731/design-system/
# Showcase Hub:   http://127.0.0.1:8731/showcase/
# Landing Site:   http://127.0.0.1:8731/
```

For active CSS/JS iteration, send `Cache-Control: no-store` so browsers do not serve stale sub-resources.

---

## 5. Component Coverage Summary

Full per-component contracts and direct preview links live in [docs/COMPONENT_INVENTORY.md](docs/COMPONENT_INVENTORY.md):
- **Implemented (`design-system/` + `showcase/`):** Buttons, Links, Icon Buttons, WhatsApp Actions, Toggles/Chips, Badges, Steppers, Skeletons/Spinners, Toasts/Alerts/Confirms, Inputs (`+880` phone, password, OTP, select, checkbox, switch, read-only, file, error summary), Marketing Header/Rail, Admin Sidebar/Drawer, Keyboard Tabs, Breadcrumbs, Lightbox, Package/KPI Cards, Advanced CRUD & Selectable Tables, Accessible SVG Charts + Table Fallback, Activity/Permission Tables, and **9/9 Stage 3C page patterns**.
- **Spec-Only (`spec-only` in inventory):** Split Button, Avatar Group, Textarea Counter, Multiselect/Cascading Select, Drag-Dropzone, Rich Text Editor, Mega Menu, Command Palette, Resizable Split, Itinerary Accordion, Popover/Tooltip/Nested Menu, Calendar/Tree View/Filter Builder.

---

## 6. Change-Control Guidance

1. Never edit `assets/brand/logo-mark.svg` or `logo.jpg` without explicit brand approval.
2. Never hardcode colors in component CSS or HTML; add new semantic/component aliases to `tokens/design-tokens.json`, `tokens/tokens.css`, `tokens/themes.css`, and `tokens/tailwind.tokens.js` together.
3. Document any new component or variant in `docs/COMPONENT_INVENTORY.md` before writing UI code, verify WCAG AA contrast in Light, Night Ocean Dark, and High Contrast, and update `docs/QUALITY_REPORT.md`.
