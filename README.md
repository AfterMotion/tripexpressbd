# Trip Express BD - landing page

Static site. Built entirely against the `trip-express-brand` skill in
`../.claude/skills/trip-express-brand/`. No value here is invented: colours, type,
spacing, motion and the 3D contract all come from that skill's tokens.

## Run it

The page uses ES modules and an import map, so it needs to be served over HTTP -
opening `index.html` from the filesystem will silently skip the 3D scene (the
still photograph fallback still renders, and everything else works).

```bash
cd site
python -m http.server 8731
# http://127.0.0.1:8731/
```

**While iterating, serve with `Cache-Control: no-store`.** `http.server` sends no
cache headers at all, so Chrome applies heuristic freshness and keeps serving the
old CSS and JS without even revalidating - a hard reload refreshes the HTML and
nothing else, and your edits look like they did nothing.

```python
# dev-server.py
import http.server, socketserver
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()
socketserver.TCPServer.allow_reuse_address = True
socketserver.TCPServer(('127.0.0.1', 8731), H).serve_forever()
```

Add `?verify=1` to the URL to log the 3D brand-colour check to the console. It must
report `#ED7C30`.

## What is where

```
index.html                  the whole page
favicon.svg                 monogram - white aircraft on the sunset disc
assets/brand/logo-mark.svg  the logo, traced from logo.jpg (7.3 KB, 4 colour layers)
assets/icons.svg            icon sprite - Lucide geometry, stroke width set by the page
assets/css/tokens.css       brand tokens, copied verbatim from the skill
assets/css/site.css         page styles, built only on those tokens
assets/js/main.js           nav, rail, drawer, gallery, lightbox, form, tilt, 3D boot
assets/js/three.brand.js    brand 3D contract (copied from the skill)
assets/js/scene.js          "The Journey" - the scroll-driven WebGL flight
assets/img/                 art-directed derivatives generated from ../images/
assets/img/og/og-share.jpg  1200×630 social card
```

## The journey

One WebGL context, on the hero. **Scroll position is flight progress** - nothing in
the scene runs on a timer. As `p` goes 0 → 1 the aircraft travels a route past five
waypoints and the whole world advances with it:

| `p` | |
|---|---|
| 0.08 | Chattogram - first light, Sunset Orange on the horizon |
| 0.30 | Nepal - morning climb, the sky opens to Sky Blue |
| 0.52 | Meghalaya - clear day over the plateau, cloud deck below the wing |
| 0.74 | Dawki - the water shelf and its sun glitter |
| 0.93 | Kashmir - golden hour, the ridges go warm again |

At each waypoint a **real photograph from that departure** rises beside the route on
a card. That is the point: the 3D is showing the brand's actual proof, not an
abstraction. Waypoints report back to the DOM, so the matching destination lights
up - and clicking a destination flies the camera there and holds for 2.8s.

Technically:

- `NeutralToneMapping` at exposure 1.0 for lit surfaces; flat brand-colour elements
  (sun, sky, ribbon, photo cards) carry `toneMapped: false` so they render at
  exactly `#ED7C30` / `#FFFFFF`.
- The frustum is sized from the world with `depthPlan(340)` - **fog ends the scene,
  never the clip plane**. (The previous build clipped a 300-unit route inside a
  120-unit far plane and rendered a flat navy panel with no error at all.)
- Key light warm, fill cool hemisphere, rim white, ambient 0.18. The key colour
  follows the sky but is always mixed back toward Sand Orange.
- Sky is a `CanvasTexture` gradient on a camera-pinned dome, repainted only when the
  palette actually moves - not a `ShaderMaterial`, which would bypass three's output
  colour conversion and break every brand hex.
- Desktop: 4 ridge strips, 48 instanced clouds, ~28 draw calls. Mobile: 2 ridges,
  20 clouds, no shadows, no rim light, DPR ≤ 1.5.
- On desktop the hero copy owns the left third, so the frustum is shifted with
  `camera.setViewOffset` - FOV and roll never move.

**It is a progressive enhancement.** Under `prefers-reduced-motion`, `saveData`, low
memory, no WebGL, a lost context, or the footer's "Reduce 3D" toggle, the canvas
never appears and the hero photograph is what you get. Verified.

## Navigation and wayfinding

- Desktop: seven nav links, active one underlined with the 17° Flight Rule.
- Mobile: a **journey rail** of section chips under the header. It arrives once the
  hero is behind you, hides on an active downward scroll and returns the moment you
  scroll up. One scroll-spy paints the nav, the rail and the drawer.
- Anchor scrolling is a single eased curve in JS (`easeInOutQuint`, duration scaled
  by distance, 380–980ms). Native `scroll-behavior: smooth` is off: it cannot be
  interrupted, and a visitor who starts scrolling mid-animation gets dragged back.
- Drawer: spring open, staggered items, current section marked, **drag right to
  close**, focus trapped, Escape closes.

## Gallery

Infinite column masonry - 1 / 2 / 3 / 4 columns, six frames appended per
`IntersectionObserver` hit. Monochrome by default; colour returns on hover, or on a
phone when the frame reaches the middle of the screen. Odd columns drift with the
scroll and even columns against it, capped at 20px and desktop-only.

## Content

Everything factual came from `../plan.md` (the brand's own published posts) and the
23 photographs in `../images/`. Nothing was invented - see the note on Kashmir below.

- Nepal package: ৳58,500, 5D/4N, full inclusion and exclusion lists, verbatim Bangla.
- Kashmir by road: ৳35,000 from Chattogram, Season 5.
- Meghalaya: 4 days, team of 13, price on request (no published price exists).
- Stats are only figures the brand has actually published.

**The Kashmir card has no photograph** because no Kashmir photo was supplied. Rather
than use stock (brand rule 4), its media area is an illustration built from the
brand's own ridge and flight-streak vocabulary, and its 3D waypoint shows a marker
with no proof card. Replace both with a real photo when one exists.

## Known follow-ups

- The enquiry form validates but does not transmit - wire it to a backend or a form
  service. The page says so in-line.
- Fonts load from Google Fonts as variable ranges (`Inter:wght@400..700`), which the
  550/650 weights in the CSS need. Self-host and subset to Latin + Bengali before
  launch to hit the 180 KB font budget reliably; Hind Siliguri is the expensive part.
- `canonical`, `og:image` and the JSON-LD all point at `tripexpressbd.example` -
  swap in the real domain at launch.
- Facebook link in the footer points at facebook.com - swap in the real page URL.
- Only Nepal, Meghalaya and Dawki have photography. Sikkim, Darjeeling, Kolkata,
  Maldives and Sri Lanka use the brand's night disc.
