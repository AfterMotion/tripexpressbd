# Trip Express BD - Multipage Architecture & Reuse Plan

Extends Concept 1 (**"The Horizon Dispatch"**, [preview/index.html](../preview/index.html)) across 8 coherent static HTML routes while preserving one authoritative token source ([tokens/tokens.css](../tokens/tokens.css) + [tokens/themes.css](../tokens/themes.css)), shared chrome/JS ([preview/assets/preview.css](../preview/assets/preview.css), [preview/assets/preview.js](../preview/assets/preview.js)), and strict zero-fabricated-data rules.

---

## 1. Side-by-Side Preview Directory

| Route Concept | File | Primary User Task | Layout Template (Non-Cloned) |
| :--- | :--- | :--- | :--- |
| `/` | [preview/index.html](../preview/index.html) | Orient Chattogram/BD group travellers & start destination jump | 5/7 asymmetric dark-band hero + 8-disc strip + 7/5 departures + masonry proof + 5-field form |
| `/tours` | [preview/tours.html](../preview/tours.html) | Search, filter, sort & factually compare all 8 routes | Subhero + interactive search/chip toolbar + 3-col cards + empty-state recovery + responsive `.pv-table--stack` comparison matrix |
| `/tours/explore-nepal` | [preview/nepal-tour.html](../preview/nepal-tour.html) | Inspect full Nepal 5D/4N schedule, `৳36,000` ceiling, exclusions & bank details | Subhero breadcrumb + `8fr/4fr` sticky-aside layout (`.pv-detail-grid`) + Day 1–5 `.pv-timeline` + Bangla inclusions/exclusions + lightbox |
| `/about` | [preview/about.html](../preview/about.html) | Verify Chattogram office, leadership accounts, `তাঁবু নিবাসী` co-hosting & history | Subhero + Night Ocean 4-stat strip + 2-col office/photo proof + vertical `.pv-timeline` events log |
| `/reports` | [preview/reports.html](../preview/reports.html) | Read verified Meghalaya/Nepal dispatches & Indian visa / airfare guides | Subhero + category filter chips + editorial report cards + resource guides |
| `/contact` | [preview/contact.html](../preview/contact.html) | Submit seat enquiry (with URL `?tour=` pre-fill), test error/confirmation states, view FAQ | Subhero + `7fr/5fr` enquiry form (validation + simulated failure + confirmation ref) & office/bank stack + FAQ accordion |
| `/legal` | [preview/legal.html](../preview/legal.html) | Check `৳36,000` airfare policy, verified deposit accounts & open policy placeholders | Narrow 1-col prose stack (`78ch`) |
| `/404` | [preview/404.html](../preview/404.html) | Recover cleanly from a broken route via search/CTA buttons | Centered 2-col recovery card with 5-color flat brand vector detour graphic |

---

## 2. SEO Metadata Plan

| Page | `<title>` | `<meta name="description">` Summary |
| :--- | :--- | :--- |
| Home | `Trip Express BD - Guided Group Tours from Chattogram` | Guided small-group departures from Chattogram to Nepal, Kashmir, Meghalaya & Maldives with fixed dates, published ৳ rates & real photos. |
| Tours | `Tours, Search & Comparison - Trip Express BD` | Search and compare Trip Express BD group tours by destination, travel mode, duration & published Taka price. |
| Nepal Detail | `Explore Nepal 5D/4N (৳58,500) - Trip Express BD` | 5D/4N Dhaka–Kathmandu–Nagarkot–Pokhara tour with full inclusions, exclusions, ৳36,000 airfare ceiling & bank deposit details. |
| About | `About, Chattogram Roots & Events - Trip Express BD` | 1301 Mosjid Goli office desk, co-hosted Meghalaya tours with তাঁবু নিবাসী, verified group departures & operational milestones. |
| Reports | `Trip Reports, Dispatches & Resource Guides - Trip Express BD` | Field trip reports plus Indian tourist visa advisories and airfare-cap breakdowns. |
| Contact | `Contact, Booking Desk & FAQ - Trip Express BD` | Seat reservation form, Chattogram phone lines, bank verification & pre-booking FAQ. |
| Legal | `Legal, Privacy & Booking Terms - Trip Express BD` | Airfare ceiling disclosure, authorized deposit accounts & explicit placeholders awaiting legal sign-off. |
| 404 | `404 Route Not Found - Trip Express BD` | Off-route recovery links back to tours catalog, Explore Nepal & Chattogram desk. |

---

## 3. Component Reuse Matrix (`preview.css` & `preview.js`)

| Shared Primitive / Pattern | Pages Using It | Token Source |
| :--- | :--- | :--- |
| Sticky `.pv-hdr`, active `aria-current="page"`, `.pv-drawer`, `#pvThemeBtn` | All 8 pages | `--te-nav-*`, `--te-dialog-*`, `--te-action-primary-*` |
| Side-by-side `.pv-pages-bar` notice strip | All 8 pages | `--te-status-info-*` |
| Breadcrumb `.pv-crumbs` & `.pv-subhero` | `tours`, `nepal-tour`, `about`, `reports`, `contact`, `legal` | `--te-bg-subtle`, `--te-text-link` |
| Interactive filter pills `.pv-chips` / `.pv-chip[aria-pressed="true"]` | `tours`, `reports` | `--te-surface-selected`, `--te-focus-ring` |
| Responsive `.pv-table--stack` comparison table | `tours` | `--te-table-header-*`, `--te-table-border` |
| `8fr/4fr` sticky aside `.pv-detail-grid` + `.pv-sticky-aside` | `nepal-tour` | Grid rhythm + `--te-card-*` |
| Timeline `.pv-timeline` / `.pv-timeline__item` | `nepal-tour`, `about` | `--te-border-strong`, `--te-action-primary-bg` |
| Client validation + status feedback (`[role="status"]`, `.te-err`) | `index`, `contact` | `--te-status-success-*`, `--te-status-error-*`, `--te-input-*` |
| Accordion (`[data-acc-btn]`) & Lightbox (`[data-lb-src]`) | `index`, `nepal-tour`, `about`, `contact` | `--te-surface-raised`, `--te-bg-dark-band` |
| Dark clipped footer `.pv-ftr-cut` + `.pv-ftr` + WhatsApp FAB `.pv-fab` | 8 footer pages / 6 FAB pages | `--te-bg-dark-band`, `--te-wa-solid-*` |

---

## 4. Truthfulness, Media & Placeholder Controls

1. **No fabricated prices or dates:** Only `Explore Nepal 5D/4N (৳58,500)` and `Kashmir by Road Season 5 (৳35,000)` show Taka figures. Routes lacking verified current pricing (`Meghalaya`, `Maldives & Sri Lanka`, `Sikkim`, `Darjeeling`, `Kolkata`) display explicit `[PLACEHOLDER: CURRENT_RATE_TBD]` / on-request messaging.
2. **Real WebP vs 5-color brand illustration:** `assets/img/{hero,card,gallery}/` WebPs are strictly scoped to Nepal and Meghalaya/Dawki/Shillong. Unphotographed destinations (`Kashmir`, `Maldives`, `Sikkim`, `Darjeeling`, `Kolkata`) and `404.html` render inline 5-color flat brand vectors using CSS token variables (`--te-p-orange-500`, `--te-p-orange-400`, `--te-p-sky-500`, `--te-p-ocean-500`, `--te-p-n-0`) - zero stock photos and zero raw hexes.
3. **Client-side prototype caveat:** Enquiry submissions on [preview/index.html](../preview/index.html) and [preview/contact.html](../preview/contact.html) run client-side validation and demo confirmation/error state previews without sending network POST requests.
