# Trip Express BD - Art Direction & Layout Concept Evaluation

**Method:** Creative composition & anti-template restraint (`frontend-design`) + mobile-first usability, contrast & responsive verification (`ui-ux-pro-max`).  
**Constraints:** Uses **only** locked palette & typography tokens ([BRAND_GUIDELINES.md](BRAND_GUIDELINES.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [tokens.css](../tokens/tokens.css)), Flow A content sequence ([PAGE_ARCHITECTURE.md](PAGE_ARCHITECTURE.md)), and real brand copy/assets ([WEBSITE_BUILD_CONTEXT.md](WEBSITE_BUILD_CONTEXT.md)). **No new brand identity generated; no token files modified.**

---

## 1. Three Compliant Layout Concepts (Varying Hierarchy & Composition)

### Concept 1: **The Horizon Dispatch** *(Asymmetric Editorial-Proof Split)* - **RECOMMENDED**
- **Rationale:** Built directly around the split-disc anatomy of `logo-mark.svg` while optimizing `360px` Android first-fold clarity. Breaks the generic "centered hero → 3 identical cards" SaaS pattern by pairing real group proof (`7/5` desktop split) with an **unequal flagship-plus-stack departure layout** (`7-col` featured Nepal dossier + inline Bangla inclusions preview alongside `5-col` stacked Kashmir & Meghalaya rows).
- **Typography Roles:** Sentence-case `Plus Jakarta Sans` (`700/800`, hero capped at `clamp(2.375rem, 1.55rem + 3.3vw, 3.875rem)` so headline + CTA + proof fit above the fold on `360×800`), `Inter` (`400–700`, `tabular-nums` for `৳` & phones), `Hind Siliguri` (`≥17px`, `1.85` LH for Bangla inclusions/reports). Eyebrow labels appear **only** on major section shifts-never repeated on every card.
- **Hero Concept:** Asymmetric `5 / 7` split on desktop (`132436` Night Ocean copy block on left + full-height Meghalaya `cliff-wide-1600.webp` group photo on right, separated by `--te-scrim` fade); `4:5` `falls-tall-720.webp` photo above compact copy block on mobile.
- **Grid Rhythm:** Alternates `5/7` hero → `8`-disc horizontal/grid strip → `7/5` asymmetric departures → `6/6` Included/Not-Included ledger → `3-col` proof masonry → `7/5` Enquiry/Office desk.
- **Section Transitions:** Crisp alternating `--te-bg-canvas` (`#FFFFFF`), `--te-bg-subtle` (`#F7F9FB`), `--te-bg-warm` (`#FEF8F5`), and `--te-bg-dark-band` (`#132436`). Only **two** `17°` diagonal cuts per page (Hero exit & Footer entry, `tan(17°) = 0.3057`).
- **Real Photography & Graphics:** Real group photos in hero, discs, Nepal/Meghalaya departures, and `23`-frame masonry (`g00–g22`); strict 5-color flat brand illustration (`#ED7C30`, `#F2A15F`, `#4394D5`, `#3171AE`, `#FFFFFF`) for unphotographed Kashmir.
- **Distinctive Brand Motif:** **The 17° Horizon Seam** - a `4px` `#FFFFFF` diagonal line echoing the aircraft corridor dividing warm land from cool sea, echoed once in the hero cut, once in the footer cut, and in the `72×3px` Flight Rule.

---

### Concept 2: **Field Dossier & Route Ledger** *(Utility-First Timetable & Proof Wall)*
- **Rationale:** Approaches the site like an honest Chattogram dispatch board from `1301 Mosjid Goli`: minimizes hero height so price-conscious travellers immediately see the live departure timetable (`Nepal ৳58,500`, `Kashmir ৳35,000`, `Meghalaya 4D`), bank/office verification, and raw road photographs.
- **Typography Roles:** Tighter `display-lg` ceiling (`36→56px`) paired with dominant `Inter` `tabular-nums` ledger columns (`price-lg`, dates, seat counts) and `17px` `Hind Siliguri` Bangla inclusion rows.
- **Hero Concept:** White-canvas `50 / 50` masthead (zero dark overlay): left side holds headline + compact 3-row Departure Quick-Picker with `৳` prices; right side displays uncropped `3:2` `cover-nepal-1440.webp` coach & team photo inside `--te-p-r-xl` (`24px`) frame.
- **Grid Rhythm:** `6/6` masthead → full-width responsive departure table (`sc-table-stack` cards on mobile) → `2-col` Bangla/English inclusion split → `4-col` monochrome-to-color gallery wall → `8/4` office & enquiry block.
- **Section Transitions:** Architectural `1px solid #DFE5EC` hairlines and quiet `#F7F9FB` / `#FEF8F5` paper bands; zero full-bleed diagonal hero cut (`17°` appears only in Flight Rules and Footer cut).
- **Real Photography & Graphics:** Zero scrims over photos-every photograph sits cleanly inside bordered white frames with captions below.
- **Distinctive Brand Motif:** **The Stamped Departure Ledger** - tabular `৳` pricing rows anchored over a subtle `≤0.07` opacity `107°` Flight Streak wash behind the contact & office desk.

---

### Concept 3: **The Split-Disc Route Atlas** *(Interactive Waypoint & Photo Stage)*
- **Rationale:** Turns the logo's split circular disc into an interactive geographic journey: a sticky route stage (`Chattogram → Nepal → Meghalaya → Dawki → Kashmir`) paired with circular `1:1` destination discs that jump the user across proof cards.
- **Typography Roles:** Expressive `display-xl` (`44→72px`) headline over the hero stage paired with `13px` waypoint chips and `17px` Bangla road quotes.
- **Hero Concept:** Full-bleed `21:9` desktop (`46dvh` sticky mobile) photo/progressive-WebGL stage with translucent Night Ocean waypoint pill (`rgba(19,36,54,0.55)`).
- **Grid Rhythm:** Full-bleed sticky hero → `8`-disc orbital/rail selector → `3-up` equal package grid → `2-col` inclusions → `3-col` masonry → Night Ocean stats strip.
- **Section Transitions:** Scroll-linked sky stop transitions + `17°` bottom hero cut + `17°` footer cut.
- **Real Photography & Graphics:** Circular `1:1` cropped discs (faces centered via `object-position`) + floating photo proof cards + Kashmir night-disc icon.
- **Distinctive Brand Motif:** **The Waypoint Disc Ring** - `3px #FFFFFF` circular photo medallions whose ring shifts to `#ED7C30` on active route selection.

---

## 2. Concept Scoring Matrix (1–10 Scale)

| Criterion | Concept 1: Horizon Dispatch *(Rec.)* | Concept 2: Field Dossier | Concept 3: Route Atlas | Notes |
|---|---|---|---|---|
| **Brand Fidelity** | **9.5** | **8.5** | **9.5** | C1 & C3 express the split + disc + 17° streak; C2 underuses the 17° diagonal identity. |
| **Audience Relevance** *(360px Android, Chattogram)* | **9.5** | **9.0** | **7.5** | C1 puts group faces + departures + WhatsApp fast on 4G (`<700KB`); C3's sticky 3D stage risks 4G payload & scroll friction. |
| **Readability** *(Bilingual Bangla/Latin)* | **9.5** | **9.5** | **8.0** | C1 & C2 avoid oversized `72px` text and keep Bangla `17px` on solid `#FFFFFF`/`#F7F9FB` cards; C3 overlays text on dynamic canvas. |
| **Originality** *(Non-Templated)* | **9.0** | **8.5** | **9.0** | C1 uses asymmetric `7/5` flagship+stack hierarchy rather than 3 identical cards. |
| **Conversion Clarity** *(WhatsApp + ৳ + Exclusions)* | **9.5** | **9.5** | **8.0** | C1 & C2 surface Nepal `৳58,500`, Kashmir `৳35,000`, and exclusions early without burying them. |
| **Accessibility** *(WCAG 2.2 AA)* | **9.5** | **9.5** | **8.0** | C1 & C2 guarantee solid surface contrast (`≥6.20:1`) and zero sticky-scroll traps; C3 requires extra scrim verification over moving 3D frames. |
| **Weighted Total** | **56.5 / 60** | **54.5 / 60** | **50.0 / 60** | **Concept 1 selected** (adopting C2's crisp inclusion table clarity). |

---

## 3. Explicit Audit of AI-Template Tells (Across All 3 Concepts)

| AI-Template Tell | How Our Concepts Audit & Eliminate It |
|---|---|
| **1. Unmotivated gradient backgrounds** | **Eliminated:** No purple/teal washes or gradient card fills. `--te-grad-horizon` is banned from text and general cards; `--te-grad-sunset` is restricted to the `72×3px` Flight Rule and Featured badge. Pages stay `60%` clean white/near-white. |
| **2. Repeated equal cards** | **Rejected in Concept 1:** Instead of 3 identical `16:10` boxes, Featured Nepal (`7-col` horizontal card with route + quick-facts + Bangla inclusion summary) sits beside `5-col` stacked Kashmir & Meghalaya rows, breaking visual monotony while marking hierarchy (`Explore Nepal` is the only full itinerary published in `plan.md`). |
| **3. Generic metrics** | **Eliminated:** Zero invented "10,000+ happy clients" or "99% satisfaction". Only verified `plan.md` figures appear (`5.9K` FB followers, `8` destinations, `5` Kashmir seasons, `4` Kolkata runs). |
| **4. Random decorative ornaments** | **Eliminated:** No floating blobs, meaningless `01/02/03` step numbers on non-sequential content, or confetti shapes. Every `17°` rule/cut and Flight Streak maps directly to the aircraft corridor in `logo-mark.svg`. |
| **5. Oversized type that hides information** | **Eliminated in Concept 1 & 2:** Hero display is capped at `3.875rem` (`62px` desktop / `38px` mobile) instead of `72px+`, ensuring headline, Bangla sub-copy, and CTA fit cleanly alongside the photo on `360×800` phones. (Concept 3 penalized for `72px` risk.) |
| **6. Repeated badges / tracked ALL-CAPS eyebrows** | **Eliminated:** Removed redundant eyebrows inside every card and report; overlines (`13px / 0.09em`) appear **strictly once per top-level section header** to anchor wayfinding, never stacked inside sub-cards. Status badges appear only where booking state genuinely differs (`Featured`, `Booking Open`, `Season 5`). |
| **7. Fake testimonials** | **Eliminated:** Replaced generic 5-star review cards with **verbatim dated Facebook trip close-outs & route reports** attributed to Trip Express BD departures with real road photos. |
| **8. Unnecessary motion** | **Eliminated:** Banned continuous infinite loops, heavy mobile parallax, and scroll-triggered fade-ups on every single paragraph. Motion is reserved for one subtle `260ms` arrival (`te-depart`) and user-triggered hover/drawer/lightbox responses, collapsing cleanly under `prefers-reduced-motion: reduce`. |

---

## 4. Recommended Direction & Rejected Conventions

### Selected Direction: **Concept 1 ("The Horizon Dispatch") + Concept 2 Transparency Table**
- Adopt **Concept 1** as the visual and structural architecture for `/`:
  - Asymmetric `5/7` hero split (`4:5` photo above Night Ocean copy on `360px` mobile)
  - `8`-destination circular disc jump strip
  - Asymmetric `7/5` Open Departures (`Explore Nepal ৳58,500` flagship dossier + stacked `Meghalaya` & `Kashmir ৳35,000` rows)
  - Clean 2-column Bangla/English Included vs. Not Included panel (`৳36,000` airfare ceiling callout)
  - Real-photo Archive + Masonry + Keyboard Lightbox + Night Ocean Stats + Verbatim Reports
  - `7/5` Chattogram Office, Bank Verification & 5-Field/WhatsApp Conversion Desk
- **From Concept 3, keep ONLY lightweight optionality:** Progressive Three.js hero (`index.html`) may enhance desktop if `saveData === false`, `deviceMemory >= 4`, and `prefers-reduced-motion` is off, while defaulting to static photography on mobile 4G so LCP stays `< 2.5s`.

### Explicitly Rejected Conventions
1. **Rejected:** `Hero → 3 Identical Cards → 3-Column Star Testimonials → Generic Newsletter CTA`.
2. **Rejected:** Full-viewport (`100dvh`) 3D WebGL blocking vertical scroll on `360px` Android phones.
3. **Rejected:** White text on `#ED7C30`, pure `#000000`, stock Kashmir mountain photos, ALL-CAPS eyebrows on every sub-card, and single-word colored italic accents inside headlines.

---

## 5. Proposed Token Extensions (Do Not Implement Without Approval)

Existing [tokens/tokens.css](../tokens/tokens.css) and [tokens/themes.css](../tokens/themes.css) cover ~95% of Concept 1. Only **4 minimal extensions** are needed if Concept 1 is approved for implementation:

| Proposed Token | Proposed Value | Purpose | Approval Needed |
|---|---|---|---|
| `--te-p-fs-hero-capped` | `clamp(2.375rem, 1.55rem + 3.3vw, 3.875rem)` | Caps hero display at `38→62px` so `360px` mobile above-the-fold holds headline + CTA cleanly. | **Yes (before adding to `tokens/`)** |
| `--te-glass-bg` / `--te-glass-border` | `rgba(19, 36, 54, 0.55)` / `rgba(255, 255, 255, 0.14)` | Standardizes translucent Night Ocean scrim pill over hero/3D stage (currently only in `assets/css/tokens.css` bridge). | **Yes (promote from bridge)** |
| `--te-tex-flight-streak` | `repeating-linear-gradient(107deg, rgba(237,124,48,0.07) 0 2px, transparent 2px 18px)` | Subtle `107°` background wash behind stats/contact bands (`≤0.07` opacity). | **Yes (promote from Tailwind config)** |
| `--te-card-featured-strip` | `4px` | Standardizes top Sunset Gradient accent strip height on flagship Nepal dossier. | **Yes** |
