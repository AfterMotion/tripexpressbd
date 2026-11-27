---
name: trip-express-bd-design-system
description: Authoritative brand, token, accessibility, and multi-mode UI design system for Trip Express BD (public marketing, customer portals, complex forms, and compact admin panels). Read before creating or modifying any page or component.
version: 2.0.0
---

# Trip Express BD - Portable Design System Skill

## 1. Mandatory Read Order (Before Coding)
1. [BRAND_GUIDELINES.md](docs/BRAND_GUIDELINES.md) & [BRAND_FOUNDATIONS.json](docs/BRAND_FOUNDATIONS.json) - identity, logo fidelity, source vs. derived palette, bilingual voice.
2. [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) - 3-layer token inheritance, Light / Night Ocean Dark / High-Contrast / Density specs, layout & data-viz rules.
3. [COMPONENT_INVENTORY.md](docs/COMPONENT_INVENTORY.md) - component contracts, state machines, keyboard/ARIA rules, `implemented` vs. `spec-only` coverage.
4. [tokens/tokens.css](tokens/tokens.css), [tokens/themes.css](tokens/themes.css), [tokens/design-tokens.json](tokens/design-tokens.json), and [tokens/tailwind.tokens.js](tokens/tailwind.tokens.js) - **the single authoritative token source**.
5. Visual references: [design-system/index.html](design-system/index.html) and [showcase/index.html](showcase/index.html).

---

## 2. Non-Negotiable Rules
1. **Single Authoritative Token Source:** Import `tokens/tokens.css` + `tokens/themes.css` (or `tokens/tailwind.tokens.js`). Legacy `assets/css/tokens.css` is now a pure alias bridge to `tokens/`. Never invent new hex codes or duplicate `:root` color palettes.
2. **Contrast Guardrails:** Never put `#FFFFFF` ink on `#ED7C30` (`2.79:1` FAIL). Pair `#ED7C30` buttons with `#111823` (`6.39:1` AA). Use `#A45826` (`5.25:1`) for orange text on light surfaces and `#F2A16A` (`7.56:1`) on Night Ocean `#132436`.
3. **Bilingual & Micro Floors:** Tag Bangla runs with `lang="bn"` (`Hind Siliguri`, **`≥17px`** running text, `line-height: 1.85`, `letter-spacing: 0`, never uppercase). Keep Latin UI text **`≥13px`**. Use `tabular-nums` on every `৳` price, date, and ledger cell.
4. **Logo Integrity:** Never recolor, stretch, rotate, add shadows, or clip the `17°` overhanging streak of `assets/brand/logo-mark.svg`. Because `logo-mark.svg` uses transparent `evenodd` cutouts, wrap it in a `#FFFFFF` disc chip on dark/photo surfaces until a white-backed reverse SVG is approved.
5. **Context-Sensitive Density & Geometry:** Marketing pages use comfortable spacing + `17°` Flight Angle cuts/badges/lifts, while text-adjacent Flight Rules / underlines MUST use gentle `-3deg` (`--te-p-rule-angle-neg`) with `margin: 12px 0 16px` (`10px 0 12px` `<640px`) so angled rules never overlap overlines or headings; `[data-density="compact"]` admin interfaces use `40px` table rows, `36px` controls, `8px` radii, and **zero** skew.
6. **Change Control:** Before building a missing or `spec-only` variant, document its anatomy, states, token aliases, responsive behavior, and `spec-ready` entry in `docs/COMPONENT_INVENTORY.md` and `docs/DESIGN_SYSTEM.md`.

---

## 3. Multi-Stack Implementation Examples

Each stack consumes the exact same CSS/Tailwind tokens while keeping idiomatic framework patterns (do not force identical JS internals across stacks).

### 3.1 HTML / CSS
```html
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="tokens/themes.css">

<article class="te-card te-card--featured" lang="en">
  <p class="te-overline">Nepal · Fixed Departure</p>
  <h3>Explore Nepal</h3>
  <p lang="bn" class="bn">ঢাকা ↔ কাঠমুন্ডু রিটার্ন এয়ার টিকিট</p>
  <span class="te-num">৳58,500</span>
  <button class="te-btn te-btn--primary" type="button">Book Your Seat</button>
</article>
```

### 3.2 Tailwind CSS (`tokens/tailwind.tokens.js`)
```js
// tailwind.config.js
const teTokens = require('./tokens/tailwind.tokens.js');
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: { extend: { ...teTokens } },
};
```
```html
<button class="inline-flex min-h-[44px] items-center rounded-btn bg-primary px-5 font-semibold text-primary-ink hover:bg-primary-hover focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-ring">
  Book Your Seat
</button>
```

### 3.3 React / Next.js (JSX)
```tsx
// Assumes tokens/tokens.css and tokens/themes.css are imported in app/layout.tsx
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'wa';

export function TeButton({
  variant = 'primary',
  loading = false,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
}) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={`te-btn te-btn--${variant} ${loading ? 'is-loading' : ''}`}
    >
      {loading && <span className="te-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
```

### 3.4 Vue 3 (`<script setup>`)
```vue
<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'wa';
  loading?: boolean;
}>(), { variant: 'primary', loading: false });
</script>

<template>
  <button
    type="button"
    :aria-busy="loading || undefined"
    :class="['te-btn', `te-btn--${variant}`, { 'is-loading': loading }]"
  >
    <slot />
  </button>
</template>
```
