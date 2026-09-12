# Trip Express BD — landing page

Static site. Built entirely against the `trip-express-brand` skill in
`../.claude/skills/trip-express-brand/`. No value here is invented: colours, type,
spacing, motion and the 3D contract all come from that skill's tokens.

## Run it

The page uses ES modules and an import map, so it needs to be served over HTTP —
opening `index.html` from the filesystem will silently skip the 3D scene (the
still photograph fallback still renders, and everything else works).

```bash
cd site
python -m http.server 8731
# http://127.0.0.1:8731/
```

Add `?verify=1` to the URL to log the 3D brand-colour check to the console. It must
report `#ED7C30`.

## What is where

```
index.html                  the whole page
favicon.svg                 monogram — white aircraft on the sunset disc
assets/brand/logo-mark.svg  the logo, traced from logo.jpg (7.3 KB, 4 colour layers)
assets/css/tokens.css       brand tokens, copied verbatim from the skill
assets/css/site.css         page styles, built only on those tokens
assets/js/main.js           nav, drawer, gallery, lightbox, form, tilt, 3D boot
assets/js/three.brand.js    brand 3D contract (copied from the skill)
assets/js/scene.js          the "Horizon Hero" WebGL scene
assets/img/                 art-directed derivatives generated from ../images/
```

## The 3D scene

One WebGL context, on the hero only. It is the logo extruded into space: a warm
sun and layered flat-shaded ridges above, a cool wave shelf below, and a white
flight ribbon climbing at exactly 17° with an aircraft travelling along it.

- `NeutralToneMapping` at exposure 1.0 for lit surfaces; flat brand-colour
  elements (sun, ribbon, sky) carry `toneMapped: false` so they render at exactly
  `#ED7C30` / `#FFFFFF`.
- Key light warm `#F2A16A` upper-right, fill cool hemisphere, rim white, ambient 0.18.
- Tier detection caps DPR, triangles, shadows and post passes per device; the
  watchdog only ever downgrades.
- It never blocks first paint: the DOM renders, then the canvas attaches on
  `IntersectionObserver` + `requestIdleCallback`.

**It is a progressive enhancement.** Under `prefers-reduced-motion`, `saveData`,
low memory, no WebGL, a lost context, or the footer's "Reduce 3D" toggle, the
canvas never appears and the hero photograph is what you get. Verified.

## Content

Everything factual came from `../plan.md` (the brand's own published posts) and the
23 photographs in `../images/`. Nothing was invented — see the note on Kashmir below.

- Nepal package: ৳58,500, 5D/4N, full inclusion and exclusion lists, verbatim Bangla.
- Kashmir by road: ৳35,000 from Chattogram, Season 5.
- Meghalaya: 4 days, team of 13, price on request (no published price exists).
- Stats are only figures the brand has actually published.

**The Kashmir card has no photograph** because no Kashmir photo was supplied. Rather
than use stock (brand rule 4), its media area is an illustration built from the
brand's own ridge and flight-streak vocabulary. Replace it with a real photo when
one exists.

## Known follow-ups

- The enquiry form validates but does not transmit — wire it to a backend or a form
  service. The page says so in-line.
- Fonts load from Google Fonts. Self-host and subset to Latin + Bengali before
  launch to hit the 180 KB font budget reliably.
- Facebook link in the footer points at facebook.com — swap in the real page URL.
- Only Nepal and Meghalaya have photography. Sikkim, Darjeeling, Kolkata, Maldives
  and Sri Lanka currently use gradient discs.
