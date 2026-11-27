# Trip Express BD - Page & Product Brief

**Basis:** [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [WEBSITE_BUILD_CONTEXT.md](WEBSITE_BUILD_CONTEXT.md), [plan.md](../plan.md), and [index.html](../index.html).  
**Integrity Rule:** Zero fabricated statistics, quotes, reviews, or partner logos. Every unverified business detail below is marked `[PLACEHOLDER: ...]` so it cannot be mistaken for a published claim.

---

## 1. Brief Variables

| Variable | Authoritative Value / Scope |
|---|---|
| **`[BRAND]`** | **Trip Express BD** (never `TripExpress`, `Trip Express Bangladesh`, or `TEBD`; lowercase `tripexpressbd` in URLs/handles only). Home: `1301, Mosjid Goli, Dui Number Gate (opposite Sermon School), Chattogram 4202, Bangladesh`. |
| **`[WEBSITE TYPE]`** | **Primary:** `marketing / landing` (public tour discovery & WhatsApp/phone lead conversion). **Secondary expansion targets:** `portal` (traveller booking/visa status) and `admin` (`[data-density="compact"]` operations, seat manifest & bank deposit verification). |
| **`[PAGE GOAL]`** | Convert mobile-first Bangladeshi travellers into confirmed group-tour enquiries or seat reservations by proving real past departures, publishing full inclusions/exclusions and BDT (`৳`) prices upfront, and routing directly to WhatsApp, phone, or physical office deposit. |
| **`[PRIMARY AUDIENCE]`** | **Primary:** Bangladeshi adults (ages `22-45` `[ASSUMPTION]`) in Chattogram & greater Chattogram; Android mobile-first, WhatsApp-native, bilingual Bangla + English readers, travelling in friend groups or families. **Secondary:** Dhaka air-departure joiners; `[ASSUMPTION]` corporate/institutional group trips. |
| **`[PRIMARY CTA]`** | **`Book Your Seat`** (`সিট বুক করুন`) / **`Chat on WhatsApp`** (`https://wa.me/8801838754207`, Bangla: `হোয়াটসঅ্যাপে চ্যাট করুন`) - WhatsApp is the real conversion path and must remain one tap away. |
| **`[SECONDARY CTA]`** | **`View Itinerary`** (`বিস্তারিত দেখুন`) / **`See All Tours`** / **`Call 01838-754207`** (`01621-785968`, `01838-754207`, `01840-004495`). |
| **`[PRODUCT/SERVICE]`** | Guided small-team group departures (`7-15` travellers typical) across 8 signature routes (**Kashmir**, **Meghalaya/Shillong**, **Sikkim**, **Darjeeling**, **Nepal: Kathmandu-Nagarkot-Pokhara**, **Kolkata**, **Maldives**, **Sri Lanka**), plus domestic Bangladesh trips, custom group tours, and air ticketing / visa support (`[PLACEHOLDER: VERIFY_STANDALONE_VISA_PRICING]`). |
| **`[PROOF SOURCES]`** | **Verified only:** `3.3K` Facebook followers (`plan.md`), `8` signature destinations, `5` Kashmir by-road seasons, `4` Kolkata-Jammu runs (`index.html` / `plan.md`), `23` real departure photos (`assets/img/gallery/g00..g22`), verbatim Bangla & English trip reports (`plan.md`), physical Chattogram office opening post (`Trip Express BD x তাঁবু নিবাসী`), and verifiable Islami Bank (`20501620205843017`) & Eastern Bank (`0011450000514`) deposit accounts. |
| **`[CONTENT/ASSETS]`** | `assets/brand/logo-mark.svg`, `logo.jpg`, `favicon.svg`, `assets/icons.svg`, `assets/img/{hero,card,disc,gallery,og}/` (real photos for **Nepal, Meghalaya, Dawki, Shillong** only), `plan.md` (verbatim Bangla/English Nepal 5D/4N itinerary & Meghalaya/Kashmir posts). **Missing:** real photos for Kashmir, Sikkim, Darjeeling, Kolkata, Maldives, Sri Lanka, and partner SVG for **তাঁবু নিবাসী**. |
| **`[REFERENCE SITES]`** | `[PLACEHOLDER: NONE_SUPPLIED_BY_OWNER]` - design benchmarked internally against [index.html](../index.html), [brand-guide/index.html](../brand-guide/index.html), [design-system/index.html](../design-system/index.html), and [showcase/index.html](../showcase/index.html). |
| **`[TECH STACK]`** | **Current repo:** Static HTML5 + Vanilla CSS3 (`tokens/tokens.css`, `tokens/themes.css`) + Vanilla ES Modules (+ optional progressive Three.js `0.169.0` hero in `index.html`). **Optional production targets:** Tailwind CSS (`tokens/tailwind.tokens.js`), React/Next.js, or Vue 3 (see [SKILL.md](../SKILL.md)). |
| **`[ROUTES]`** | **Marketing:** `/` (Home & Journey), `/tours` (Listing & Filters), `/tours/:slug` (10-block Package Detail), `/portfolio` (Trip Archive & Lightbox), `/contact` (Office & 5-Field Enquiry). **Portal/Admin (Phase 2):** `/auth`, `/book` (3-Step Wizard), `/admin` (Dashboard), `/admin/travellers`, `/admin/bookings/:id`, `/settings`, `/403`, `/404`, `/500`. |

---

## 2. What Visitors Must Understand, Trust & Do

### 2.1 Understand (Within 5 Seconds Above the Fold)
- **What Trip Express BD is:** A Chattogram-based guided group-tour operator assembling real teams (`7-15` people) for South Asian overland and air departures-**not** an anonymous ticket aggregator.
- **What is concrete:** Fixed departure dates, exact duration (`5 Days / 4 Nights`), and published BDT pricing (`৳58,500` Nepal; `৳35,000` Kashmir by road) without hidden fees.
- **Bilingual clarity:** Key routes, inclusions, exclusions, and payment terms read naturally in Bangla (`lang="bn"`) and English side by side.

### 2.2 Trust (Proof Before Payment)
- **Real people on real trips:** Authentic group photographs (`assets/img/`) and dated completion reports (*"Alhamdulillah... team of 7"*, *"১৩ জনের টিম"*) replace generic stock photography.
- **Honest exclusions & surcharges:** Explicitly publishing what is **not** included (lunch, rides, insurance, personal expenses, and the `৳36,000` airfare ceiling note on Nepal) builds credibility before anyone calls.
- **Verifiable physical presence:** Real Chattogram office address (`1301, Mosjid Goli, Dui Number Gate`), three direct mobile numbers, and named Islami Bank / Eastern Bank accounts.

### 2.3 Do (Conversion & Task Goals)
- **Primary Marketing Conversion:** Tap **`Book Your Seat`** (5-field enquiry / 3-step booking flow) or **`Chat on WhatsApp`** (`wa.me/+8801838754207`) with pre-filled trip context.
- **Secondary Engagement:** Inspect day-by-day itinerary, verify inclusions/exclusions, browse real trip photos in lightbox, or visit/call the Chattogram office.
- **Portal / Admin Task Goals (Phase 2):** Authenticate via OTP, complete passport & seat registration, reconcile Islami/EBL bank deposit slips (`tabular-nums`), and update visa/seat manifests in `[data-density="compact"]`.

---

## 3. Required Content & Strict Exclusions

### 3.1 Required Page Content
1. **Marketing Homepage:** Sticky header + mobile journey rail → Hero (`21:9` desktop / `4:5` mobile) → Destination discs (`8` routes) → Featured & open Package cards (`৳` price + WhatsApp CTA) → Nepal Inclusion/Exclusion split → Real-photo Proof Archive & Masonry + Lightbox → Verified Stats band (`3.3K`, `8`, `5`, `4`) → Verbatim Trip Reports → 5-field Enquiry + Chattogram Office & Bank methods → Night Ocean `17°` Footer.
2. **Package Detail Route (`/tours/:slug`, mandatory 10-block order per brand rules):**
   `1. Hero + Title + Duration + Price` → `2. Fixed Departure & Return Dates` → `3. Day-by-Day Itinerary` → `4. Included` → `5. Not Included` → `6. Booking Deadline` → `7. Booking Method & Bank Accounts` → `8. Contact (3 Phones + WhatsApp)` → `9. Past Run Gallery` → `10. Related Trips`.

### 3.2 Explicit Exclusions (Content & Design Guardrails)
- **Never fabricate:** No invented traveller reviews, star ratings, fake countdown timers, struck-through fake original prices, or unverified counts (e.g., do not invent "10,000+ happy travellers").
- **Never fabricate partner logos:** Attribute **তাঁবু নিবাসী** in text only (`Trip Express BD × তাঁবু নিবাসী`) until an official partner SVG is supplied.
- **Never use stock photos:** Kashmir and other unphotographed destinations must display brand artwork/night discs, never stock mountains or airport-wing clichés.
- **Never violate contrast or type floors:** No white text on `#ED7C30` (`2.79:1`), no `#000000`, no Bangla below `17px` running text, no Latin UI below `13px`.

---

## 4. Proof, Accessibility & Performance Requirements

### 4.1 Proof Requirements
- Every stat card must trace back to `plan.md` or verified booking records (`3.3K followers`, `8 destinations`, `5 Kashmir seasons`, `4 Kolkata-Jammu runs`).
- Package pages must display real departure dates, airfare ceiling clauses, and inclusions/exclusions visibly without hiding them behind modals.

### 4.2 Accessibility Requirements (WCAG 2.2 Level AA)
- **Contrast:** Primary CTA `#111823` on `#ED7C30` (`6.39:1`), Secondary `#FFFFFF` on `#25517B` (`8.26:1`), Light links `#25517B` (`8.26:1`), Dark links `#ACD0ED` (`9.75:1`), Control borders `≥3.95:1` (WCAG 1.4.11).
- **Keyboard & Focus:** Skip-to-content link, visible `3px` focus ring (`outline-offset: 2px` / `3px` high-contrast), trapped focus in drawers/modals/lightbox with `Escape` close and focus restoration.
- **Bilingual & Touch:** Every Bangla text run tagged `lang="bn"` (`Hind Siliguri`, `≥17px`, `1.85` LH); minimum `44×44px` tap targets with `≥8px` separation; `16px+` input font to prevent iOS zoom.
- **Motion Safety:** `prefers-reduced-motion: reduce` disables parallax, auto-scroll, and `te-depart` transforms, showing static hero media immediately.

### 4.3 Performance Requirements (Android 4G Baseline)
- **Mobile (`360×800`, throttled 4G):** LCP `< 2.5s`, CLS `< 0.05`, INP `< 200ms`, total initial page weight **`< 700 KB`**, hero WebP `< 120 KB`, initial JS `< 120 KB` gzipped.
- **Desktop (`1440×900`):** LCP `< 1.8s`, total initial page weight `< 1.4 MB`.
- **Fonts:** Subset Latin + Bengali WOFF2 under **`180 KB`** total (`Plus Jakarta Sans` `700..800`, `Inter` `400..700`, `Hind Siliguri` max 3-4 static weights; `JetBrains Mono` loaded on portal/admin routes only).
- **3D / Progressive Enhancement:** Hero 3D (if enabled) loads dynamically after DOM paint, caps at `55dvh` on mobile (`touch-action: pan-y`), and falls back cleanly to static photography on `saveData`, low memory, or reduced motion.

---

## 5. Labeled Placeholders Register (Do Not Ship as Real Facts)

| Item | Placeholder Token | Owner Action Needed |
|---|---|---|
| Facebook Page URL | `[PLACEHOLDER: VERIFY_FACEBOOK_PAGE_URL]` | Replace `https://www.facebook.com/` in footer |
| Office Opening Hours | `[PLACEHOLDER: OFFICE_HOURS_TBD]` | Supply Saturday-Thursday / Friday desk hours for schema & footer |
| Unpriced Tour Dates & BDT | `[PLACEHOLDER: PRICE_AND_DATES_ON_REQUEST]` | Supply fixed prices/dates for Meghalaya, Sikkim, Darjeeling, Kolkata, Maldives, Sri Lanka |
| Missing Destination Photos | `[PLACEHOLDER: BRAND_ILLUSTRATION_UNTIL_REAL_PHOTO]` | Supply real team photos for Kashmir, Sikkim, Darjeeling, Kolkata, Maldives, Sri Lanka |
| Partner Mark (`তাঁবু নিবাসী`) | `[PLACEHOLDER: PARTNER_SVG_NOT_SUPPLIED]` | Supply official SVG/PNG or confirm text-only co-branding |
| Legal / Licensing / Policy | `[PLACEHOLDER: TRADE_LICENSE_AND_REFUND_POLICY_TBD]` | Provide ATAB/Civil Aviation/Trade License IDs & cancellation fee table |
| Reference Sites | `[PLACEHOLDER: NONE_SUPPLIED]` | Optional external benchmark URLs if desired |
| Backend Endpoints | `[PLACEHOLDER: API_AND_OTP_GATEWAY_TBD]` | Wire form POST, traveller OTP auth, and admin ledger API before launch |
