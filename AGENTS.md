# AGENTS.md - Trip Express BD Design System & UI Rules

Any coding agent working in this repository MUST follow these instructions before editing or creating UI code.

## 1. Read First
1. Read `SKILL.md` for workflow, change-control, and stack integration patterns.
2. Read `docs/BRAND_GUIDELINES.md` and `docs/DESIGN_SYSTEM.md`.
3. Check `docs/COMPONENT_INVENTORY.md` to locate the closest documented component and its token contract.
4. Load tokens exclusively from `tokens/tokens.css`, `tokens/themes.css`, `tokens/design-tokens.json`, or `tokens/tailwind.tokens.js`.

## 2. Hard Rules
- **One Token Source:** Never declare duplicate `:root` color palettes or hardcode hex values in component CSS or markup. (`assets/css/tokens.css` is a legacy bridge importing `tokens/`.)
- **Contrast:** Never put white text on `#ED7C30` (`2.79:1`). Primary buttons use `#ED7C30` + `#111823` (`6.39:1`). Never use `#000000`; darkest ink is `#111823` and dark theme canvas is `#132436` (Night Ocean).
- **Dark & High-Contrast Parity:** Every theme token override must appear in both `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)`. Support `[data-contrast="high"]` / `prefers-contrast: more`.
- **Bangla Typography:** Tag Bangla text with `lang="bn"`, render in `Hind Siliguri`, enforce **`17px`** minimum running text (`1.85` line-height, `0` letter-spacing, no uppercase). Keep Latin UI text **`≥13px`**.
- **Logo Fidelity:** Preserve `assets/brand/logo-mark.svg` untouched (`17.12°` overhang, `0.25 × D` clear space). Wrap in a white disc chip on dark/photographic surfaces unless an approved white-backed reverse SVG exists.
- **Density Separation:** Marketing uses comfortable spacing + `17°` Flight Angle geometry. Admin interfaces use `[data-density="compact"]` (`40px` rows, `36px` controls, `8px` radii, zero `17°` skew).
- **Real Proof Over Stock:** Use authentic tour photos from `assets/img/`. Where none exist (e.g., Kashmir), use the 5-color flat brand illustration style rather than generic stock.

## 3. Document Before Implementing New Variants
If a requested pattern is missing or marked `spec-only` in `docs/COMPONENT_INVENTORY.md`:
1. Add/update its specification (anatomy, sizes, variants, states, keyboard/ARIA, mobile behavior) in `docs/COMPONENT_INVENTORY.md`.
2. Add any missing Layer 2/3 tokens to `tokens/design-tokens.json`, `tokens/tokens.css`, `tokens/themes.css`, and `tokens/tailwind.tokens.js`.
3. Implement using those tokens, verify light/dark/high-contrast/mobile/keyboard behavior, and update `docs/COMPONENT_INVENTORY.md` status + `docs/QUALITY_REPORT.md`.

## 4. Production Caution
Files in `showcase/*.html` and `design-system/index.html` are static/client-side reference prototypes. Do not represent mocked form submissions, auth/OTP, or in-memory CRUD arrays as production-ready without real backend integration and browser QA.
