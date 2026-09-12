# 08 - Voice, Tone & Content Rules

## 1. Voice attributes

| We are | We are not |
|---|---|
| Warm and personal ("we", "our team") | Corporate and third-person |
| Specific (dates, prices, seat counts) | Vague ("amazing packages available") |
| Confident, calm | Hype, all-caps urgency |
| Local and proud of Chattogram | Generically "international" |
| Honest about exclusions | Hiding costs until the phone call |
| Community-minded | Transactional |

## 2. Bilingual policy

The brand publishes in **Bangla and English, mixed**. The website follows the same
logic rather than forcing one language.

| Content type | Language |
|---|---|
| Navigation, buttons, UI labels | English, with Bangla in the mobile drawer |
| Package titles | English (`Explore Nepal`), Bangla subtitle allowed |
| Itinerary detail | **Bangla primary**, English summary line above |
| Inclusions / exclusions | Bangla primary |
| Trip reports / portfolio captions | Whichever the original post used |
| Legal, policy, forms | Both, Bangla first |
| Prices | Western digits with the taka symbol, everywhere |

Rules:

- Never machine-translate Bangla. If a Bangla string is unavailable, ship English
  rather than bad Bangla.
- Never mix scripts inside a single word or brand name.
- Always tag Bangla with `lang="bn"` so the correct font and line-height apply.
- If the site offers a language toggle, it switches **content**, not just labels -
  a half-translated page damages trust more than a monolingual one.

## 3. Headline patterns

**Hero** - destination plus promise, under 8 words:
- "Kashmir, the way it should be seen."
- "Five days in Nepal. One team. Fixed dates."
- "ভূস্বর্গ কাশ্মীর - আমাদের সাথে"

**Section** - plain, declarative, no questions:
- "Where we take you"
- "What is included"
- "Trips we have already run"

Avoid: rhetorical questions, "Discover", "Unlock", "Embark on a journey",
"Your adventure awaits", exclamation marks in headings.

## 4. Body copy rules

- Sentences under 20 words. Paragraphs under 4 lines.
- Lead with the fact: date, price, duration, seats.
- Use the brand's own list format - a check glyph line per inclusion, a cross glyph
  line per exclusion. It is already familiar to the audience.
- Numbers are always concrete: "7 travellers", "13-person team", "Season 5",
  not "a small group".
- Never promise what is outside the package. The exclusion list is a trust asset.

## 5. Religious and cultural register

The brand's authentic voice includes Islamic expressions - *Alhamdulillah*,
*Insha'Allah* - in trip reports and announcements. This is genuine and should be
preserved in:

- Portfolio trip reports and social embeds (verbatim, never edited out)
- Bangla announcement copy

Keep it out of:

- Transactional UI (buttons, form errors, checkout)
- English marketing headlines aimed at a mixed audience

Do not add these expressions to copy that did not originally contain them, and do
not remove them from copy that did.

## 6. CTA vocabulary

| Intent | Primary label | Bangla |
|---|---|---|
| Book a seat | `Book Your Seat` | `সিট বুক করুন` |
| Ask a question | `Chat on WhatsApp` | `হোয়াটসঅ্যাপে চ্যাট করুন` |
| See detail | `View Itinerary` | `বিস্তারিত দেখুন` |
| Browse | `See All Tours` | `সব ট্যুর দেখুন` |
| Call | `Call 01838-754207` | `কল করুন` |

Rules: one primary CTA per viewport. WhatsApp is always available. Never use
"Submit", "Click here", or "Learn more".

## 7. Price presentation

```
৳58,500  per person
```

- Western digits, comma thousands separator, `tabular-nums`
- The taka symbol is attached to the number with no space
- "per person" in `caption` `n-500` immediately after
- "From ৳X" only when multiple tiers genuinely exist
- Any conditional surcharge (for example an air-fare ceiling clause) appears as a
  footnote on the same card, never hidden on another page
- Never strike through a fake original price

## 8. Date and number formats

| Thing | Format | Example |
|---|---|---|
| Single date | `DD Mon YYYY` | `11 Nov 2025` |
| Range, same month | `DD–DD Mon YYYY` | `11–15 Nov 2025` |
| Range, cross-month | `DD Mon – DD Mon YYYY` | `28 Dec 2025 – 03 Jan 2026` |
| Time | 12-hour with AM/PM | `10:05 AM` |
| Duration | `N Days / N Nights` | `5 Days / 4 Nights` |
| Phone display | `01838-754207` | with a hyphen after 5 digits |
| Phone link | `tel:+8801838754207` | full international |
| WhatsApp link | `https://wa.me/8801838754207` | no plus sign |

Use an en dash for ranges, never a hyphen.

## 9. Required content on every package page

In this order:

1. Hero image plus title plus duration plus price
2. Fixed departure and return dates (with flight times if applicable)
3. Day-by-day itinerary
4. What is included
5. What is not included
6. Booking deadline
7. Booking method and payment terms
8. Contact block - three phone numbers plus WhatsApp
9. Gallery from previous runs of the same trip
10. Related trips

Omitting 4, 5, 6 or 7 is a content bug, not a design choice.

## 10. Microcopy

| Situation | Copy |
|---|---|
| Empty gallery | "Photos from this trip are on the way." |
| Form success | "Thank you. We will call you within one working day." |
| Form error | "Please enter a valid Bangladeshi mobile number." |
| Sold out | "This departure is full. Ask us about the next one." |
| Loading | Skeletons, never a spinner with text |
| 404 | "This route does not exist yet." plus a link back to all tours |

Never use exclamation marks in error states. Never apologise more than once.

## 11. SEO and metadata

- Title pattern: `<Trip Name> - <N Days / N Nights> from Chattogram | Trip Express BD`
- Meta description: destination, duration, price, departure month, in one sentence
  under 155 characters
- Every image needs a descriptive `alt` naming the place and the subject, never
  "image1" and never the file name
- Structured data: `TouristTrip` and `TravelAgency` schema, with the real address,
  phone numbers and opening hours
- `og:image` uses the stacked lockup on the Horizon Gradient, or the trip's own
  cover photo with the reverse lockup applied
