# Trip Express BD - Content-First Page Architecture (`/`, Primary Marketing & Departure Route)

**Inputs:** [WEBSITE_BUILD_CONTEXT.md](WEBSITE_BUILD_CONTEXT.md), [PAGE_BRIEF.md](PAGE_BRIEF.md), [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [COMPONENT_INVENTORY.md](COMPONENT_INVENTORY.md)  
**Scope:** Information architecture, two competing page flows with decision rationale, section-by-section content/component contracts, navigation/footer, SEO metadata, trust/privacy cues, mobile reordering, empty/error states, and desktop (`1440px`) + mobile (`360px`) ASCII wireframes.  
**Rule:** Architecture & content structure only - **no decorative UI coding yet**.

---

## 1. Two Alternative Page Flows (And Why One Wins)

### Flow A (Recommended): **Proof-First Departure & Transparency Ledger**
```
Header (+ Mobile Journey Rail)
  → S1: Real-Team Hero & Departure Promise (4:5 mobile / 21:9 desktop)
  → S2: 8-Destination Jump Strip (Photo Discs + Brand-Art Discs for unphotographed routes)
  → S3: Open Departures & Published Pricing Grid (Nepal ৳58,500 · Meghalaya · Kashmir ৳35,000)
  → S4: Radical Transparency Split - Included vs. Not Included + ৳36,000 Airfare Ceiling Note
  → S5: Completed Trip Archive + Filterable Real-Photo Proof Wall (with Lightbox)
  → S6: Verified Scale Band (5.9K · 8 · 5 · 4) + Verbatim Bangla/English Road Reports
  → S7: Chattogram Office, Bank Deposit Trust & 5-Field / WhatsApp Conversion Desk
  → Footer (Night Ocean 17° seam, 3 phones, Mosjid Goli address)
```

### Flow B (Alternative): **Destination-First Editorial Journey**
```
Header
  → S1: Split-Disc Destination Matrix (Pick a region first before seeing hero copy)
  → S2: Flagship Single-Departure Spotlight (Deep 5D/4N Nepal itinerary timeline upfront)
  → S3: Secondary Overland Departures List (Kashmir & Meghalaya compact rows)
  → S4: Field Photo Masonry & Road Reports
  → S5: WhatsApp / Office Booking Block
  → Footer
```

### Why Flow A Is Recommended Over Flow B (And Avoids Generic `Hero → 3 Cards → Testimonials → CTA`)
1. **Matches Chattogram Facebook Traffic Behavior:** Primary visitors arrive on `360px` Android phones from Facebook group posts (`5.9K` followers) looking to verify *two* anxieties immediately: *"Are these real Bangladeshi teams?"* and *"What is the actual total cost without hidden extras?"* Flow A answers both within the first three scroll stops via **real group photography (S1/S2)** + **BDT prices (S3)** + the **Bangla Inclusion/Exclusion & Airfare-Ceiling split (S4)**-something a generic SaaS feature/card grid ignores.
2. **Avoids Cliché Testimonials & Unpriced Confusion:** Instead of fabricated 5-star quote cards, Flow A places **verified completed trip dossiers + verbatim Bangla/English road reports (S5/S6)** immediately after inclusions, proving execution before the final **Chattogram office + bank deposit + WhatsApp desk (S7)**.
3. **Why Flow B Loses on `/`:** Burying Meghalaya and Kashmir below a full 5-day Nepal accordion forces overland travellers to scroll past ~1,400px of Kathmandu details before seeing `৳35,000` Kashmir or `4-day` Meghalaya options. Flow B belongs on `/tours/explore-nepal`, not the root hub.

---

## 2. Navigation, Journey Rail & Footer Architecture

### 2.1 Global Header & Mobile Wayfinding
- **Desktop (`≥1024px`, `76px`):** White disc-chip + `logo-mark.svg` (`40px`) + `Trip Express BD` wordmark left; 6 plain links (`Destinations`, `Tours`, `Included`, `Portfolio`, `Reports`, `Contact` - active link marked by `3px` Sunset Orange bar); right cluster: clickable phone `01838-754207` (`te-num`) + Primary CTA `Book Your Seat`.
- **Mobile (`<1024px`, `64px` + `46px` sticky Journey Rail):** Header carries logo chip + `01838-754207` / WhatsApp icon button + `44×44px` menu drawer trigger. Below header, sticky horizontally scrollable **Journey Rail** (`#top`, `#destinations`, `#tours`, `#included`, `#portfolio`, `#reports`, `#contact`) appears past 60% hero scroll, hides on downward scroll, returns on upward scroll, and keeps `scroll-padding-top: 118px` so anchors never hide behind chrome.
- **Mobile Drawer (`min(88%, 388px)`):** Bilingual links (`Destinations / গন্তব্য`, `Tours / ট্যুর প্যাকেজ`, `What is included / যা থাকছে`, `Portfolio / ছবি`, `Trip reports / ট্রিপ রিপোর্ট`, `Contact / যোগাযোগ`), `Esc` + swipe-right dismiss, focus trap, and footer with direct `tel:` + Bangla WhatsApp CTA.

### 2.2 Footer (`#132436` Night Ocean with `17°` Top Cut)
- **Logo Treatment:** `assets/brand/logo-mark.svg` inside `#FFFFFF` circular disc chip (`≥48px`) until Gate 1 approves white-backed reverse SVG.
- **4 Columns Desktop / Accordion Mobile (Contact Always Expanded):**
  1. Brand summary + social links (`[PLACEHOLDER: VERIFY_FACEBOOK_PAGE_URL]`, WhatsApp, Email)
  2. Destinations (`Nepal`, `Meghalaya`, `Kashmir by road`, `Sikkim`, `Darjeeling`, `Maldives & Sri Lanka`)
  3. Quick anchors (`Tour packages`, `What is included`, `Portfolio`, `Trip reports`, `Contact`)
  4. Contact (`1301, Mosjid Goli, Dui Number Gate, Chattogram 4202`, `01621-785968`, `01838-754207`, `01840-004495`, `tripexpressb@gmail.com`, `[PLACEHOLDER: OFFICE_HOURS_TBD]`)

---

## 3. Section-by-Section Architecture Plan (Flow A)

| Section | User Question Answered | Proof / Content Required | Headline Direction | Interaction | Candidate Component | Image Type | CTA |
|---|---|---|---|---|---|---|---|
| **S1 · Hero Stage** | *"Who are you, where do you depart from, and are these real tours?"* | Chattogram origin, `7–15` team size, fixed dates, bilingual sub-line (`lang="bn"`). | Declarative, <8 words, no hype: *"Small teams. Real itineraries. Photographs to prove it."* | Progressive WebGL flight (desktop/high-tier) or static hero; `prefers-reduced-motion` shows photo immediately. | `4.1 Hero (Scrim + 17° Cut)` + `1.1 Button` | Real group cliff photo (`cliff-wide-1600.webp` desktop `21:9` / `falls-tall-720.webp` mobile `4:5`) + `--te-scrim`. | Primary: `Explore Departures` (`#tours`); Secondary: `See Real Photos` (`#portfolio`). |
| **S2 · 8-Destination Jump Rail** | *"Do you run trips to the place I want to visit?"* | All 8 routes: `Chattogram (Start)`, `Nepal`, `Meghalaya`, `Dawki`, `Kashmir`, `Shillong`, `Sikkim`, `Maldives & Sri Lanka`. | Plain factual: *"Where we take you"* | Click flies 3D waypoint (if active) or smooth-scrolls to matching package/contact; mobile horizontal `scroll-snap` rail. | `4.2 Destination Discs` (`120px` desktop / `96px` mobile) | Real `1:1` WebP discs for Nepal/Meghalaya/Dawki/Shillong; Night-Ocean brand icon disc for Kashmir/Sikkim/Maldives. | Tap disc → jumps to package or enquiry pre-filled with destination. |
| **S3 · Open Departures & Pricing** | *"What trips can I join now, how long are they, and what do they cost in ৳?"* | **Explore Nepal** (`5D/4N`, `৳58,500`, air), **Meghalaya by Road** (`4D/3N`, team of 13, `[PLACEHOLDER: PRICE_ON_REQUEST]`), **Kashmir by Road** (`Season 5`, `৳35,000`, `11N`). | Action-oriented: *"Departures you can join"* | Cards stretch-link to detail/enquiry; WhatsApp button pre-fills trip query (`?text=...`); desktop `17°` card lift (`translate(2px,-6px)`). | `4.3 Package Card` + `1.7 Status Badge` (`-6deg` featured) + `1.5 WhatsApp Pill` | `16:10` real photos (Nepal Pokhara, Dawki pool); **5-color flat brand illustration** for Kashmir (zero stock). | Per card: `Ask us` (WhatsApp soft pill) + card link to `#contact` / `/tours/:slug`. |
| **S4 · Inclusions, Exclusions & Airfare Clause** | *"What is actually included in ৳58,500, and are there hidden costs?"* | Verbatim Bangla inclusion list (8 items: return flight, transfers, 2/3-star hotels, breakfast+dinner, guide) & exclusion list (5 items: lunch, rides, personal, insurance, extras) + `৳36,000` airfare ceiling note. | Trust-first: *"What ৳58,500 covers"* | Static scannable two-column check/cross panels (`n-50` surface); stacks cleanly on mobile. | `4.6 Inclusion / Exclusion Split` (`spec-only` upgrade to `implemented` in site build) | Icon-led (`i-check` `#15784F`, `i-x` `#B02E2E`, `i-info`) - no stock photo. | Inline anchor to `Book Your Seat` (`#contact`) or WhatsApp question. |
| **S5 · Completed Trip Archive & Proof Wall** | *"Have you successfully completed these trips before?"* | Completed dossiers (`Explore Nepal · Nov 2025 · Team of 7`, `Meghalaya · Team of 13`) + `23` real gallery frames (`g00–g22`) + partner attribution `Trip Express BD × তাঁবু নিবাসী` (text). | Evidence-led: *"Trips we have already run"* | Incremental gallery batch reveal; monochrome resting → color on hover (desktop) or center-viewport intersection (mobile); click opens keyboard-trapped Lightbox. | `4.4 Proof Photo Grid` + `5.1 Modal Lightbox` + `1.10 Skeleton` | Real tour WebP photos at native aspect ratios (`1:1`/`4:3`/`3:4`) - never face-cropped squares. | Tap photo → Lightbox (`Prev/Next/Esc`); `Ask about next run` inside empty/end status. |
| **S6 · Verified Scale & Road Reports** | *"How experienced is the team, and what did real trips look like?"* | Night Ocean band (`5.9K` FB followers, `8` destinations, `5` Kashmir seasons, `4` Kolkata–Jammu runs) + 3 verbatim Bangla/English posts from `plan.md`. | Grounded: *"Straight from the road"* | Static high-contrast counters (`tabular-nums`); count-up optional on first view (instant under `prefers-reduced-motion`). | `4.7 Stats Band` + Verbatim Report Cards (`3px` Sunset left border) | Real `42px` circular team thumbnails (`g00`, `g01`, `g14`) - zero fabricated avatars. | None (pure trust bridge into S7). |
| **S7 · Chattogram Office, Bank Trust & Conversion Desk** | *"How do I book safely, pay, or meet you in person?"* | 5-field Enquiry Form (`Name`, `+880 Phone`, `Destination`, `Month`, `Notes`) + Chattogram Office (`1301, Mosjid Goli`), 3 clickable phone links, email, Islami Bank / Eastern Bank deposit method (`lang="bn"`). | Direct: *"Tell us where you want to go"* | Blur-triggered validation (no pre-validation), forgiving BD phone normalization, clear-on-fix, live `role="status"` confirmation (`"Thank you. We will call you within one working day."`). | `2.1 Field Wrapper` + `2.2 Tel (+880)` + `1.1 Primary Button` + `1.5 WhatsApp CTA` | Pin/Phone/Shield Lucide icons (`16–20px`) - clean high-contrast card. | Primary: `Send enquiry` (`#111823` on `#ED7C30`); Secondary: `Message us on WhatsApp`. |

---

## 4. SEO, Trust/Privacy, Mobile Ordering & Empty States

### 4.1 SEO Title & Meta Outline
- **Title (`<60 chars`):** `Trip Express BD - Guided Group Tours from Chattogram`
- **Meta Description (`≤155 chars`):** `Guided small-group departures from Chattogram to Nepal, Kashmir, Meghalaya & Maldives. Fixed dates, published ৳ prices, and real trip photos.`
- **Open Graph & Schema:** `og:image` = `assets/img/og/og-share.jpg` (`1200×630`); JSON-LD `TravelAgency` + `TouristTrip` offers (`৳58,500` Nepal, `৳35,000` Kashmir) with real `1301, Mosjid Goli, Chattogram 4202` address and 3 phone numbers; `[PLACEHOLDER: OFFICE_HOURS_TBD]` omitted from schema until verified.

### 4.2 Trust & Privacy Cues
- **Explicit Mock/Submission Notice (Until Backend Live):** Inline form notice states clearly whether enquiry is demo-validated or wired to a live callback queue; never silently drop a form submission.
- **Data Minimization:** Enquiry collects only 5 fields (no passport/NID upload on the public homepage-passport collection belongs exclusively in the authenticated `/book` wizard).
- **Financial Clarity:** Publishing Islami Bank / Eastern Bank branch details + airfare-ceiling footnote alongside prices eliminates hidden-fee suspicion.

### 4.3 Mobile Ordering (`360px`) & Empty/Error States
- **Mobile Reordering Rules:** Hero photo (`4:5`) sits *above* hero headline/CTA (never cramped side-by-side); Destination discs become a swipeable edge-peek rail; Package grid collapses `3 → 1` column; Inclusions stack above Exclusions; Contact Enquiry Form appears *above* Office/Phone block so quick lead capture precedes address lookup; Floating WhatsApp disc (`56px`) stays clear of `env(safe-area-inset-bottom)`.
- **Empty & Error States:**
  - *Empty Gallery / New Destination:* `"Photos from this trip are on the way."` + 5-color flat Kashmir-style brand illustration.
  - *Sold-Out Departure:* `Sold Out` semantic badge (`#B02E2E` on `#FDECEC`) + `"This departure is full. Ask us about the next one."` routing to WhatsApp.
  - *Form Error:* Inline field error (`aria-invalid="true"`, `aria-describedby`, zero exclamation marks) + focus moved to first invalid field on submit.

---

## 5. Lightweight ASCII Wireframes

### 5.1 Desktop (`1440px`, 12-Col Grid, `1240px` Container)
```text
+----------------------------------------------------------------------------------+
| [Chip Logo] Trip Express BD    Destinations Tours Included Portfolio Contact  [Call 01838..] [Book Seat] |
+----------------------------------------------------------------------------------+
| [HERO 21:9 REAL GROUP PHOTO + NIGHT OCEAN SCRIM ON LEFT]                         |
|   CHATTOGRAM · TRAVEL SERVICE                                                    |
|   Small teams. Real itineraries. Photographs to prove it.                        |
|   [Explore Departures]  [See Real Photos]                                        |
|  /  17° angled white cut seam rising left -> right                              /|
+----------------------------------------------------------------------------------+
| [DESTINATIONS: 6–8 CIRCULAR DISCS ACROSS]                                        |
|  (Ctg)    (Nepal)    (Meghalaya)    (Dawki)    (Kashmir Art)    (Shillong)       |
+----------------------------------------------------------------------------------+
| [OPEN DEPARTURES: 3-UP PACKAGE CARDS]                                            |
| +--------------------+  +--------------------+  +--------------------+           |
| | [16:10 Nepal Photo]|  | [16:10 Dawki Photo]|  | [16:10 Flat Kashmir]|          |
| | Explore Nepal      |  | Meghalaya by Road  |  | Kashmir by Road    |           |
| | ৳58,500   [Ask us] |  | On req.   [Ask us] |  | ৳35,000   [Ask us] |           |
| +--------------------+  +--------------------+  +--------------------+           |
+----------------------------------------------------------------------------------+
| [TRANSPARENCY SPLIT: 2-COL (৳58,500 NEPAL)]                                      |
| +----------------------------------+  +----------------------------------+       |
| | ✓ Included (Bangla 17px, 8 items)|  | ✕ Not Included (5 items)         |       |
| |                                  |  | [Info] ৳36,000 airfare ceiling   |       |
| +----------------------------------+  +----------------------------------+       |
+----------------------------------------------------------------------------------+
| [PROOF ARCHIVE: 2 COMPLETED TRIP CARDS] -> [3-COL REAL-PHOTO MASONRY + LIGHTBOX] |
+----------------------------------------------------------------------------------+
| [NIGHT OCEAN STATS BAND: 5.9K  |  8  |  5  |  4 ]                                |
| [VERBATIM TRIP REPORTS: 3-COL QUOTES (ENGLISH + BANGLA)]                         |
+----------------------------------------------------------------------------------+
| [CONVERSION DESK: 7/5 SPLIT]                                                     |
| +----------------------------------------+  +----------------------------------+ |
| | 5-Field Enquiry Form                   |  | Chattogram Office (Mosjid Goli)  | |
| | Name | +880 Phone | Dest | Month | Msg |  | 3 Phones · Email · Bank Method   | |
| | [           Send enquiry             ] |  | [    Message us on WhatsApp    ] | |
| +----------------------------------------+  +----------------------------------+ |
+----------------------------------------------------------------------------------+
|  / 17° Night Ocean Cut                                                           |
| [Chip Logo] Trip Express BD  |  Destinations  |  Company  |  Contact & Phones    |
+----------------------------------------------------------------------------------+
```

### 5.2 Mobile (`360px`, 4-Col Grid, `20px` Margin)
```text
+----------------------------------+
| [Logo] Trip Express BD  [WA] [=] | <- 64px Sticky Header
| [Tours] [Included] [Portfolio] > | <- 46px Sticky Journey Rail
+----------------------------------+
| [4:5 Hero Photo - Group Cliff]   |
|----------------------------------|
| CHATTOGRAM · TRAVEL SERVICE      |
| Small teams. Real itineraries.   |
| Bangla summary (17px, 1.85 LH)   |
| [   Explore Departures (44px)  ] |
| [   See Real Photos (44px)     ] |
+----------------------------------+
| Where we take you                |
| (Ctg)  (Nepal)  (Meghalaya)  (>) | <- Horizontal Scroll-Snap Rail
+----------------------------------+
| Departures you can join (1-up)   |
| +------------------------------+ |
| | [16:10 Photo]   [5D / 4N]    | |
| | Explore Nepal · ৳58,500      | |
| | [ Ask us on WhatsApp ]       | |
| +------------------------------+ |
| (Meghalaya card...)              |
| (Kashmir Flat-Art card...)       |
+----------------------------------+
| What ৳58,500 covers (Stacked)    |
| [✓ Included - Bangla 17px]       |
| [✕ Not Included + ৳36k note]     |
+----------------------------------+
| Trips we have run (1-col cards)  |
| [1-col Photo Masonry -> Tap LB]  |
+----------------------------------+
| Stats (2×2 Grid: 5.9K/8 & 5/4)   |
| Trip Reports (1-col Stack)       |
+----------------------------------+
| Book a seat (5-Field Form)       |
| [   Send enquiry (full width)  ] |
| Office & 3 Phones (Mosjid Goli)  |
| [  Message on WhatsApp (44px)  ] |
+----------------------------------+
| Footer (Contact Open, Acc. Links)|
|                      [WA FAB 56] | <- Clears safe-area-inset-bottom
+----------------------------------+
```
