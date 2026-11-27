# Trip Express BD - Deployable Static Site (`site/`)

Promotes Stage 3E into a clean, zero-framework, accessible, SEO-ready static HTML5 website built strictly on [css/tokens.css](css/tokens.css), [css/themes.css](css/themes.css), [css/site.css](css/site.css), and classic deferred vanilla JS ([js/site.js](js/site.js)).

---

## 1. Reusable Page Templates & File Inventory

| File | Template Archetype | Purpose | Canonical URL |
| :--- | :--- | :--- | :--- |
| [index.html](index.html) | Editorial Home Showcase | Horizon hero, 8 corridors, Nepal/Meghalaya/Kashmir highlights, `3.3K` proof strip, gallery lightbox, enquiry form | `https://tripexpressbd.com/` |
| [tours.html](tours.html) | Searchable Catalog + Matrix | Live search, region/mode filter chips, price sort, empty state, responsive stacked comparison table | `https://tripexpressbd.com/tours.html` |
| [nepal-tour.html](nepal-tour.html) | Service Detail + Sticky Aside | `8fr/4fr` sticky rate/bank panel, keyboard tabs (`5-Day Route` / `Inclusions`), gallery lightbox | `https://tripexpressbd.com/nepal-tour.html` |
| [about.html](about.html) | Credibility & Chronological Log | Chattogram desk, named bank signatories, `তাঁবু নিবাসী` co-hosting, vertical timeline, `[PLACEHOLDER: ...]` gaps | `https://tripexpressbd.com/about.html` |
| [reports.html](reports.html) | Dispatches & Guides | Category filter chips across Meghalaya 13-person report, Nepal route guide, Indian visa advisory & `৳36,000` ceiling | `https://tripexpressbd.com/reports.html` |
| [contact.html](contact.html) | Conversion Form & FAQ | Static-mode disclosure (pre-filled WhatsApp handoff until `action` endpoint configured), office & FAQ accordion | `https://tripexpressbd.com/contact.html` |
| [legal.html](legal.html) | Narrow Compliance Prose | `৳36,000` airfare policy, verified deposit accounts, refund/privacy legal placeholders | `https://tripexpressbd.com/legal.html` |
| [404.html](404.html) | Off-Route Recovery | `noindex` 404 page with 5-color brand vector illustration & CTA recovery links | `-` |
| [robots.txt](robots.txt) / [sitemap.xml](sitemap.xml) / [CNAME](CNAME) | Crawler & Hosting Metadata | Search indexing directives pointing to `https://tripexpressbd.com/sitemap.xml` | `-` |

---

## 2. Static Form & Asset Configuration Before Production Upload

### A. Static Form Endpoint (No Fake Submission)
In [index.html](index.html) and [contact.html](contact.html), `#teEnquiryForm` ships with `action="#configured-endpoint-required"`. When untouched, valid entries clearly tell the user that static hosting has no backend yet and link straight to WhatsApp (`wa.me/8801838754207`) with pre-filled details. To enable server/serverless capture (e.g., Formspree, Cloudflare Workers, PHP handler):
```html
<form id="teEnquiryForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
```

### B. Self-Contained Image Copy Step Before Standalone Upload
Because the build sandbox denied child-process binary writes into new subdirectories, image paths currently resolve cleanly to `../assets/img/...` inside this repository so **0 assets are missing locally**. When deploying `site/` alone to Cloudflare Pages, Netlify, GitHub Pages, or cPanel:
```bash
# Run from repository root prior to uploading site/ alone
cp -r assets/img site/assets/img
# Then update ../assets/img/ -> assets/img/ across site/*.html (and verify og:image URLs)
```

---

## 3. Local Preview & Deployment

### Local HTTP Preview (Recommended)
```bash
python -m http.server 8080
```
Open `http://localhost:8080/site/index.html` from repository root (ensures relative `../assets/img/` and Google Fonts behave cleanly).

### Static Host Deployment Targets
- **GitHub Pages:** Point root (or workflow artifact) to `site/` preserving `site/CNAME`.
- **Cloudflare Pages / Netlify:** Run the asset copy step above, set publish directory to `site/`, build command empty.

---

## 4. Production Pre-Flight QA Checklist

- [x] **Tokens synced cleanly:** `site/css/tokens.css` and `site/css/themes.css` mirror canonical `tokens/` (`0` raw hexes in `site/css/site.css` and `site/*.html`).
- [x] **Semantic landmarks & SEO:** Every page defines `.skip-link`, `<header>`, `<nav>`, `<main id="main">`, `<footer>`, unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph tags.
- [x] **Internal links & assets verified on disk:** `0` broken local `href`/`src`/`srcset`/anchor/SVG `<use>` refs across all 8 HTML files.
- [x] **JavaScript syntax verified:** `node --check site/js/site.js` passed cleanly.
- [ ] **Browser DOM/Console & Breakpoint QA (`360px`, `768px`, `1024px`, `1440px`):** Pending manual browser verification outside sandbox (sandbox blocks headless Edge network/loopback execution). Check zero console errors, keyboard navigation (`Tab`, `Esc`, `ArrowLeft`/`ArrowRight`), Light/Night Ocean persistence, and image loading.
