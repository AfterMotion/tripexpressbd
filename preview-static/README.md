# Trip Express BD - Zero-Framework Static Site & Portal Showcase

Runnable multi-page static HTML + CSS + classic vanilla JS site requiring **zero** React/Vue frameworks, zero npm build steps, and zero backend.

---

## 1. Directory Map

- [index.html](index.html) - Home (Horizon Dispatch hero, 8-destination strip, Nepal/Meghalaya/Kashmir departures, stats, photo masonry, quick enquiry)
- [tours.html](tours.html) - Filterable Tour Catalog (search, region/mode chips, sort, empty reset, responsive comparison matrix, 5-color flat brand vectors)
- [nepal-tour.html](nepal-tour.html) - Explore Nepal 5D/4N (`৳58,500`) detail template (keyboard tabs, 5-day Bangla timeline, inclusions/exclusions, deposit channels, lightbox)
- [about.html](about.html) - Chattogram Mosjid Goli office, `তাঁবু নিবাসী` co-hosting, vertical milestones timeline
- [reports.html](reports.html) - Meghalaya & Nepal trip reports + Indian tourist visa & `৳36,000` airfare-cap guides
- [contact.html](contact.html) - Validated enquiry form (`01XXXXXXXXX` check, simulated network error toggle, confirmation ref), bank channels, FAQ accordion
- [admin.html](admin.html) - Dense `[data-density="compact"]` Operations Portal shell (sidebar/topbar, breadcrumbs, `Ctrl+K` command modal, role UI visibility switcher, KPI strip, sortable/multi-select table, loading/empty/503 states, slide-over detail drawer, destructive confirm dialog, toasts)
- [legal.html](legal.html) - Published booking & airfare ceiling terms + explicit legal placeholders
- [404.html](404.html) - Off-route recovery page
- [css/tokens.css](css/tokens.css) - Single `@import` entrypoint bridging canonical [../../tokens/tokens.css](../../tokens/tokens.css) + [../../tokens/themes.css](../../tokens/themes.css)
- [css/site.css](css/site.css) - Shared layout, theme, component, responsive table & admin shell styles (zero hardcoded hexes; zero inline styles needed in HTML)
- [js/app.js](js/app.js) - Single classic deferred JS file (`<script defer src="js/app.js">`) powering Light/Night Ocean toggle, drawers, keyboard tabs/modals, filters, form validation, lightbox, toasts, and admin ledger interactions
- [assets/](assets/) - SVG brand identity (`brand/logo-mark.svg`, `favicon.svg`); real WebP trip photos resolve via `../assets/img/` from repository root

---

## 2. How to Run

### Option A: Open Directly From Disk (`file://`)
Double-click `preview-static/index.html` (or open `file:///.../preview-static/index.html` in Chrome, Edge, or Firefox).
- Uses a classic deferred script (`<script defer src="js/app.js">`) rather than `<script type="module">` so browsers do **not** block scripts with CORS errors on `file://` origins.
- Local storage theme persistence wraps `localStorage` in `try/catch` for strict `file://` security policies.

### Option B: Minimal One-Line Local Server (Recommended for Full Browser Parity)
```bash
python -m http.server 8080
```
Then open `http://localhost:8080/preview-static/index.html` (from repository root so `../../tokens/` and `../assets/img/` resolve over HTTP).
- **Why run a local server if extending later:** If you switch `js/app.js` to ES modules (`type="module"`), use `fetch()` for JSON mock fixtures, or inspect multi-page `localStorage`/cookie persistence identically across routes, modern browsers block `file://` cross-file requests due to opaque origin (`null`) CORS rules.

---

## 3. Client-Side Demo Caveats
1. Enquiry submissions (`index.html`, `contact.html`) validate client-side and generate demo reference codes (`TE-XXXX`) without sending HTTP `POST` requests.
2. Admin role switching (`admin.html` - Operations Lead / Desk Agent / Finance Verifier) previews UI visibility only; **production deployments must enforce RBAC server-side on every endpoint**.
3. Routes without verified current BDT pricing display `[PLACEHOLDER: RATE_TBD]` rather than fabricated figures.
