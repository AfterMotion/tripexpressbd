# 10 - 3D, WebGL & Three.js Standards

The portfolio is 3D-heavy. That is a deliberate differentiator, not decoration.
This file makes 3D a **brand-governed medium** with the same rigour as colour and
type. Every rule here exists so that the 3D layer looks like Trip Express BD and
still loads on a mid-range Android phone in Chattogram.

**Governing principle:** the 3D world is the logo, extruded into space -
a warm sun above, cool water below, a white flight path climbing at 17°.

---

## 1. When 3D is allowed at all

3D is a **progressive enhancement**. The site must be complete, readable and
bookable with WebGL disabled.

| Allowed | Not allowed |
|---|---|
| Hero scene behind DOM content | 3D as the only way to read a price or date |
| Destination globe / map experience | 3D nav menu |
| Portfolio trip viewer (gallery in space) | 3D form inputs |
| Scroll-driven flight path between sections | 3D body copy or extruded headings |
| Package card depth/tilt effects | A 3D loading screen the user must wait through |
| Interactive itinerary route | Full-screen WebGL that blocks scrolling |

**Hard rule:** if WebGL fails, the context is lost, or the device is low tier, the
page renders its static fallback and nothing breaks. Build the DOM first; attach
the canvas second.

Maximum **one** WebGL context per page. Never spin up a canvas per card - use a
single shared renderer with multiple scissored viewports, or CSS 3D for card tilt.

---

## 2. Colour management - get this right first

Brand colour in WebGL is wrong by default. Three.js works in linear space; brand
hexes are sRGB. Unmanaged, `#ED7C30` renders as a washed, pinkish orange that is
off-brand.

```js
import * as THREE from 'three';

THREE.ColorManagement.enabled = true;               // default in r152+, set it anyway

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Brand colours MUST be declared as sRGB and converted, never assigned raw.
const SUNSET = new THREE.Color().setHex(0xED7C30, THREE.SRGBColorSpace);
const SAND   = new THREE.Color().setHex(0xF2A16A, THREE.SRGBColorSpace);
const SKY    = new THREE.Color().setHex(0x4394D5, THREE.SRGBColorSpace);
const OCEAN  = new THREE.Color().setHex(0x3171AE, THREE.SRGBColorSpace);
const NIGHT  = new THREE.Color().setHex(0x132436, THREE.SRGBColorSpace);
const WHITE  = new THREE.Color().setHex(0xFFFFFF, THREE.SRGBColorSpace);
```

Texture rules:

- Colour/albedo textures: `texture.colorSpace = THREE.SRGBColorSpace`
- Normal, roughness, metalness, AO, displacement: leave `NoColorSpace` (linear)
- Getting this backwards is the single most common cause of "the orange looks wrong"

### Tone mapping

Measured on a flat `#ED7C30` quad at `toneMappingExposure: 1.0`, three r169,
read back from the default framebuffer:

| Mode | `#ED7C30` renders as | Verdict |
|---|---|---|
| `NoToneMapping` | **`#ED7C30`** exact | Required for flat, unlit, logo-accurate elements |
| **`NeutralToneMapping`** | `#E87414` | **Default for lit scenes.** Hue held, slightly deeper - the only acceptable tone-mapped option |
| `ACESFilmicToneMapping` | `#E8903A` | **Banned.** Green +20 - reads cream, breaks the palette |
| `AgXToneMapping` | `#CC8A5C` | **Banned.** Visibly desaturated |
| `ReinhardToneMapping` | `#B4722F` | **Banned.** Muddy midtones |

**Consequence - the flat-element rule:** tone mapping applies to `MeshBasicMaterial`
too, so a lit scene alone cannot hold brand colour exactly. Every flat,
logo-accurate element (the sun disc, the flight ribbon, any brand-coloured unlit
shape) sets **`toneMapped: false`** on its material. It then renders at exactly
`#ED7C30` / `#FFFFFF` while the lit PBR surfaces around it still go through Neutral.

```js
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;   // never above 1.15, never below 0.85
```

**Verification step, mandatory:** render a flat `#ED7C30` quad with
`toneMapped: false` and read the **default framebuffer** back - a `WebGLRenderTarget`
is linear, so reading one measures nothing and will look like a failure
(`#D83308`). It must read `#ED7C30 ± 2` per channel. If it does not, colour
management or the output colour space is wrong - fix that before styling anything
else. `verifyBrandColour()` in `assets/three.brand.js` does exactly this.

---

## 3. The brand light rig

The logo has one implied light: **the sun, upper-right, above the horizon.**
Every scene uses the same three-light rig so all 3D across the site matches.

```js
// KEY - the sun. Warm, upper-right, elevated along the Flight Angle.
const key = new THREE.DirectionalLight(SAND, 2.4);
key.position.set(6, 4.2, 3);          // ~17deg rise to the right, camera-relative
key.castShadow = true;

// FILL - the sea. Cool, low, opposite side, soft.
const fill = new THREE.HemisphereLight(SKY, OCEAN, 0.85);

// RIM - the white seam. Separates subject from background.
const rim = new THREE.DirectionalLight(WHITE, 1.1);
rim.position.set(-4, 1.5, -5);

// AMBIENT - minimal, only to lift black crush. Never above 0.25.
const ambient = new THREE.AmbientLight(SKY, 0.18);
```

Rules:

1. **Key is always warm, fill is always cool.** Never invert. This is the logo.
2. Key elevation reads as the Flight Angle - the light climbs to the right.
3. Never use pure white as the key colour; it flattens the brand warmth. Use `SAND`.
4. Never use more than **one** shadow-casting light. Shadows are expensive and the
   brand's flat-vector heritage does not want complex shadowing.
5. Ambient never exceeds `0.25` intensity - crushed darks are off-brand, but so is
   a washed-out flat scene.
6. `useLegacyLights` must be off; use physically-correct intensities.

### Shadows

| Tier | Setting |
|---|---|
| Desktop high | `PCFSoftShadowMap`, one directional, map 2048, bias `-0.0005` |
| Desktop standard | `PCFShadowMap`, map 1024 |
| Mobile | **Shadows off.** Use a baked contact-shadow plane (an alpha texture) instead |

A baked radial contact shadow under a floating object is always preferable to a
real-time shadow map. It is cheaper, and it matches the logo's flat drop-shadow
language.

### Environment / IBL

- Use a **generated** environment, not a downloaded HDRI: build a small gradient
  environment from the Horizon Gradient via `PMREMGenerator` and a
  `GradientTexture`/canvas source.
- Environment intensity `0.4`–`0.7`. Above that, brand hues get overwhelmed by the
  environment and everything drifts grey-blue.
- Never ship an HDRI larger than 512×256 RGBE, and never a photographic studio HDRI
  - it introduces colours that are not in the palette.

---

## 4. Materials

The logo is **flat vector**. The 3D system is *"flat vector with just enough
dimension"* - not photoreal, not cartoon-glossy.

| Property | Brand value | Note |
|---|---|---|
| Base material | `MeshStandardMaterial` | `MeshPhysicalMaterial` only where transmission is genuinely needed |
| `metalness` | `0.0` for brand-coloured surfaces | Metal tints reflections and breaks palette fidelity |
| `toneMapped` | `false` on every flat, unlit brand-colour element | Tone mapping shifts even a `MeshBasicMaterial` - see the table above |
| `roughness` | `0.55`–`0.85` | Matte. Never below `0.35` on a brand-coloured surface |
| `flatShading` | `true` for terrain, mountains, low-poly forms | This is the logo's language |
| `envMapIntensity` | `0.4`–`0.7` | |
| `clearcoat` | `0` | Banned on brand surfaces |
| Emissive | Only `WHITE` or `SAND`, intensity ≤ `0.6` | For the flight path ribbon and highlights |

**Banned materials and looks**

- Chrome / mirror / high-metalness surfaces
- Iridescent, holographic, oil-slick shaders
- Heavy glass with strong refraction and dispersion
- Liquid-metal or metaball blobs
- Neon / cyberpunk wireframe glow
- Procedural noise that introduces non-palette hues
- Toon ramp shaders with black outlines (the logo has no outlines)

**Colour discipline in 3D:** a scene may use the six brand colours plus white, plus
tonal variations produced by the light rig. **No seventh hue.** If a model ships
with its own materials, retint it.

---

## 5. Geometry vocabulary

Derive 3D forms from the logo's own objects. That is what makes the 3D read as
Trip Express BD rather than as a generic WebGL template.

| Form | Source | Use |
|---|---|---|
| **Horizon Disc** | The mark itself | Hero anchor, destination selector, section transition |
| **Flight Ribbon** | The aircraft streak | Scroll path, route between destinations, section connector |
| **Low-poly ridge** | The mountain silhouette | Terrain cards, Kashmir/Meghalaya/Nepal scenes |
| **Wave shelf** | The sea shadows | Base plane, Maldives/Sri Lanka scenes, footer edge |
| **Photo prism** | - | Portfolio gallery: photos on thin extruded planes, floating |
| **Vehicle silhouettes** | Bus, kayak, aircraft | Accent props only, never hero-scale detail models |

Style: **low-poly, faceted, hard-edged.** The logo has no bevels and no soft
corners on its vehicles. Keep models under the triangle budgets in §8. A stylised
2k-triangle mountain on brand is better than a 200k-triangle photoscan off brand.

**Banned 3D elements**

- The logo extruded into 3D and rotated. The mark is 2D. Never give it depth.
- 3D extruded text of any kind, in any language.
- Generic starfields, particle storms, confetti bursts.
- Floating cursor-follow blobs or gooey cursors.
- Spinning globes with default blue-marble Earth textures.
- Physics sandboxes the user can fling objects around in.
- Anything that reads as a WebGL demo rather than as this agency's work.

---

## 6. Camera

```js
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 120);
```

| Property | Desktop | Mobile |
|---|---|---|
| FOV | `35°` | `45°` (wider keeps the subject framed on a tall viewport) |
| Max FOV | `50°` - above this, perspective distortion reads as a game engine, not a brand | |
| Near / far | `0.1` / `120` - keep the range tight for depth precision | |
| Default position | Slightly above the horizon, looking gently down (mirrors the logo's viewpoint) | |
| Roll | **Always 0.** Never tilt the camera. The 17° belongs to content, not to the camera | |

Camera motion rules:

- Movement is **damped, never linear.** Lerp factor `0.06`–`0.10` per frame at 60fps,
  frame-rate-normalised.
- The camera **eases along the Flight Angle** - when it travels, it rises slightly
  to the right.
- Never a free-orbit camera on a marketing page. Orbit is allowed only inside an
  explicit 3D viewer component, with `enableDamping: true`, `dampingFactor: 0.06`,
  `enableZoom` off on mobile, and clamped `minPolarAngle` / `maxPolarAngle` so the
  user can never get under the ground plane.
- Never auto-rotate indefinitely. If an idle rotation exists, it stops on first
  interaction and does not resume.
- FOV is never animated. Dolly the camera instead - animated FOV reads as nausea.

---

## 7. Depth, atmosphere, and post-processing

### Fog

Fog is the brand's depth tool. Its colour **always matches the background** exactly,
or the scene shows a visible seam.

```js
scene.fog = new THREE.Fog(bgColor, near, far);   // linear, easier to tune per section
// Warm sections: fog colour = #FEF8F5 or #F2A16A
// Cool sections: fog colour = #E8F2FA or #4394D5
// Dark sections: fog colour = #132436
```

### Post-processing allowlist

| Effect | Verdict | Settings |
|---|---|---|
| SMAA / FXAA | Allowed | Prefer MSAA via `antialias: true`; SMAA only on desktop when a composer already exists |
| Bloom | Allowed, restrained | `threshold ≥ 0.85`, `strength ≤ 0.35`, `radius ≤ 0.5`. Desktop only |
| Vignette | Allowed | `darkness ≤ 0.2`, offset ≥ 1.0. Must use `NIGHT`, never black |
| Depth of field | Desktop high tier only | Subtle: bokeh scale ≤ 2, focus on the subject, never rack-focus animation |
| SSAO / GTAO | Desktop high tier only | Radius small, intensity ≤ 0.6, colour tinted `OCEAN`, never grey |
| Colour grading LUT | **Banned** | The palette is already the grade |
| Chromatic aberration | **Banned** | Introduces non-brand fringing hues |
| Film grain / noise | **Banned** | The brand is clean flat vector |
| Glitch / RGB-split / datamosh | **Banned** | Wrong genre entirely |
| God rays / volumetric shafts | **Banned by default** | Only with explicit sign-off, only warm, only in a sunset scene |
| Motion blur | **Banned** | Accessibility and performance cost |
| Lens flare | **Banned** | Cheapens a trust-led travel brand |
| ASCII / halftone / dither | **Banned** | |

**Rule:** every post-processing pass must justify its frame cost. If a composer
pass costs more than 1.5ms on the desktop reference device, it is cut. On mobile,
the composer is **not used at all** - render straight to screen.

---

## 8. Performance tiers and budgets

The reference device is not a MacBook. It is a **mid-range Android phone on 4G**.

### Tier detection

```js
const tier = detectTier();   // 'high' | 'standard' | 'low' | 'off'
```

Detect from, in order: `navigator.hardwareConcurrency`, `deviceMemory`, a WebGL
renderer-string check, `matchMedia('(pointer: coarse)')`, and a first-frame timing
probe. Downgrade a tier automatically if the rolling average FPS sits below 45 for
2 seconds. **Never upgrade a tier mid-session** - it causes visible popping.

### Budgets

| Budget | Desktop high | Desktop standard | Mobile | Low / off |
|---|---|---|---|---|
| Triangles on screen | ≤ 350k | ≤ 180k | ≤ 80k | static image |
| Draw calls | ≤ 120 | ≤ 80 | ≤ 45 | - |
| Texture memory | ≤ 96MB | ≤ 64MB | ≤ 24MB | - |
| Max texture size | 2048 | 2048 | 1024 | - |
| Lights | 3 + 1 ambient | 3 + 1 ambient | 2 + 1 ambient | - |
| Shadow maps | 1 @ 2048 | 1 @ 1024 | **0** | - |
| Post passes | ≤ 3 | ≤ 1 | **0** | - |
| Device pixel ratio | `min(dpr, 2)` | `min(dpr, 1.75)` | `min(dpr, 1.5)` | - |
| Target frame time | ≤ 8ms | ≤ 12ms | ≤ 16ms | - |
| Total 3D payload | ≤ 3.5MB | ≤ 2.5MB | ≤ 1.2MB | 0 |

**DPR is the first lever.** Before cutting geometry or effects, cap pixel ratio.
Never render above `2.0` - the visual gain is negligible and the fill cost is
quadratic.

### Asset pipeline

- Format: **glTF 2.0 / `.glb` only.** No FBX, no OBJ, no unoptimised glTF.
- Geometry compression: **Meshopt** preferred, Draco acceptable. Always one or the
  other.
- Textures: **KTX2 / Basis** with a WebP fallback. Never ship PNG textures.
- Bake ambient occlusion into the albedo or a lightmap rather than computing it.
- Merge static geometry; use `InstancedMesh` for anything repeated more than 8 times.
- Dispose on unmount: geometries, materials, textures, render targets, and the
  renderer itself. A leaked context on route change is a shipping blocker.

### Loading behaviour

1. The canvas **never blocks LCP**. The DOM hero text and image paint first.
2. Initialise the renderer only when the canvas is within `200px` of the viewport
   (`IntersectionObserver`), and only after the page is interactive.
3. Show the brand static fallback (a still render or the Horizon Gradient) until
   the first frame is ready, then cross-fade over `--te-dur-scenic` 700ms.
4. No numeric percentage loader. If a progress indicator is needed, use a thin
   `--te-grad-sunset` bar at the top of the canvas area, 2px, no text.
5. Pause the render loop when the tab is hidden (`visibilitychange`) and when the
   canvas scrolls out of view. An off-screen `requestAnimationFrame` loop draining
   a phone battery is a bug.

---

## 9. Interaction and motion in 3D

### Scroll

- Scroll-driven camera is the **primary** 3D interaction. The camera travels a path
  shaped by the Flight Angle as the user scrolls.
- **Never hijack scroll.** No scroll-jacking, no forced snap through sections, no
  `preventDefault` on wheel. Native scroll position drives the scene; the scene
  never drives the scroll.
- Map scroll to camera with damping, not 1:1. Target lerp `0.08`.
- The user must always be able to reach the footer by flicking. Test this on a
  phone before shipping.

### Pointer

- Pointer parallax: maximum **2.5° of rotation** and **±12px of translation** on
  the whole scene. Anything stronger reads as a gimmick.
- Damped with the same `0.08` factor. Returns to rest over `--te-dur-slow` when the
  pointer leaves.
- On touch devices, pointer parallax is **disabled** - there is no hover, and
  gyroscope parallax is banned (it causes motion discomfort and needs permission
  prompts on iOS).

### Hover and selection

- Raycast on `pointermove` at **most 10 times per second**, throttled, and only
  against an explicit `interactables` array - never the whole scene.
- Hover response: a `SAND` emissive lift to `0.25` plus a `1.03` scale, over
  `--te-dur-fast`, `--te-ease-out`.
- Every 3D-hoverable object must also be reachable by keyboard through a parallel
  DOM control. See §11.

### Object animation

- Idle motion is a **slow drift**, not a spin: ≤ `0.08` rad/s, and it must be
  interruptible.
- Entrance: objects arrive along the Flight Angle - from lower-left, easing out
  over `--te-dur-scenic`, staggered by 80ms, stagger capped at 6 objects.
- Use the brand easing curves, converted to the animation library in use:
  `--te-ease-out: cubic-bezier(0.16, 1, 0.30, 1)`.
- All time-based animation is driven by a clamped delta (`Math.min(delta, 1/30)`),
  never by frame count - otherwise the scene runs at different speeds on 60Hz and
  120Hz displays.

### Banned interactions

- Cursor-locked first-person controls
- Drag-to-fling physics toys
- Anything requiring two-handed gestures on mobile
- Infinite auto-orbit
- Sound triggered by 3D interaction

---

## 10. The approved 3D component catalogue

Build from this list. Anything outside it needs a documented reason.

### 10.1 Horizon Hero
A large `Horizon Disc` behind the hero DOM content: an orange hemisphere above, a
blue hemisphere below, separated by a white flight ribbon at 17°. Slow drift,
pointer parallax, scroll dolly. Mobile: renders as a simplified two-material disc
with no parallax, or as the static Horizon Gradient.

### 10.2 Destination Globe
A low-poly stylised globe, land in `SAND`, water in `SKY`, with `ORANGE` pin discs
on served destinations. Click a pin to route to that destination page. Rotates only
on drag; snaps to the selected pin with damping. **Never** a photoreal Earth.
Mobile: replaced by the horizontal destination-disc rail from
`06-components.md §3`.

### 10.3 Flight Path Connector
A ribbon following the Flight Angle that draws itself as the user scrolls,
connecting section to section, with a small white aircraft silhouette travelling
along it. Emissive `WHITE` at `0.4`. Draws once, does not loop. Mobile: rendered as
an SVG stroke-dash animation instead of WebGL.

### 10.4 Portfolio Photo Prism
Trip photographs mapped onto thin extruded planes arranged in depth along the
Flight Angle. Scroll moves through them; click opens the DOM lightbox. Photo planes
are always fronto-parallel when focused - **never** show a trip photo at a steep
angle where faces distort. Mobile: replaced by the DOM masonry gallery.

### 10.5 Terrain Card
A low-poly, flat-shaded ridge in `SAND` over a `SKY` wave shelf, used as a
destination card's media area. Static by default; tilts ≤ 6° on hover.
Mobile: static rendered image.

### 10.6 Boarding Pass Parallax
A layered depth card for package previews - background photo, mid-ground text
panel, foreground badge - separated in Z and driven by pointer.
**This one uses CSS 3D transforms, not WebGL.** It must never instantiate a canvas.

---

## 11. Accessibility in 3D

Non-negotiable. This is where most 3D portfolio sites fail.

1. **`prefers-reduced-motion` is absolute.** Under it: no camera motion, no drift,
   no parallax, no entrance animation. Render one static, well-composed frame, or
   swap to the static fallback image entirely. Do not offer a "play anyway" nag.
2. The canvas carries `aria-hidden="true"` and **all** information in the scene is
   duplicated in real DOM elements. A screen reader user must lose nothing.
3. Every 3D interactive object has a focusable DOM twin - a visually-positioned
   button, or an equivalent control in a list below the canvas. Keyboard users must
   reach every destination, every photo, every package.
4. Focus is never trapped inside the canvas. Tab order flows through the page.
5. Provide a visible **"Reduce 3D"** toggle in the footer that forces the static
   tier and persists in `localStorage`. Respect it above device detection.
6. Handle `webglcontextlost`: prevent default, show the static fallback, attempt one
   restore. Never leave a blank rectangle.
7. No flashing above 3Hz. No strobing emissive. No rapid colour cycling.
8. Text is **never** rendered in WebGL. All copy is DOM, selectable, translatable,
   and searchable.
9. Contrast rules apply to DOM content over the canvas exactly as over a photo -
   use `--te-scrim` or a solid panel. Verify against the actual rendered frame at
   its darkest and lightest camera positions.

---

## 12. Implementation stack

| Concern | Standard |
|---|---|
| Core | `three` (pinned minor version; never `latest`) |
| React integration | `@react-three/fiber` + `@react-three/drei` |
| Post-processing | `postprocessing` / `@react-three/postprocessing`, desktop only |
| Scroll | Native scroll plus `IntersectionObserver`; Lenis is acceptable for smoothing but **must** be disabled under `prefers-reduced-motion` and on touch |
| Loaders | `GLTFLoader` + `MeshoptDecoder` or `DRACOLoader` + `KTX2Loader` |
| Tweening | The site's existing animation library; brand easing curves only |
| State | 3D state lives outside React render - use refs and the frame loop, never `setState` per frame |

Code rules:

- Never allocate inside the frame loop. Hoist `Vector3`, `Quaternion`, `Color`,
  `Raycaster` instances.
- Never call `new THREE.Color('#ED7C30')` inline in a render - hoist brand colours
  to a shared module (`assets/three.brand.js`).
- Always `renderer.setPixelRatio(Math.min(window.devicePixelRatio, cap))` and
  re-apply on resize.
- Debounce resize at 150ms; update camera aspect and renderer size together.
- Always dispose on unmount.
- Lazy-load the entire 3D bundle with a dynamic import so it never enters the main
  chunk.

---

## 13. 3D QA checklist

- [ ] `ColorManagement.enabled` is on; a `toneMapped: false` `#ED7C30` quad reads back
      from the **default framebuffer** as `#ED7C30 ± 2` (never from a render target)
- [ ] Every flat, unlit brand-colour element sets `toneMapped: false`
- [ ] Tone mapping is `Neutral` or `None` - never ACES
- [ ] Key light is warm, fill is cool, ambient ≤ 0.25
- [ ] No seventh hue anywhere in the scene
- [ ] Metalness 0, roughness ≥ 0.35 on all brand-coloured surfaces
- [ ] Camera roll is 0; FOV ≤ 50 and never animated
- [ ] Fog colour exactly matches the section background
- [ ] No banned post-processing pass is present
- [ ] Mobile runs with 0 shadow maps, 0 post passes, DPR ≤ 1.5
- [ ] Rolling FPS ≥ 45 on the reference mid-range Android
- [ ] Render loop pauses on tab hide and off-screen
- [ ] Everything disposes on route change; no context leak after 10 navigations
- [ ] `prefers-reduced-motion` renders a single static frame
- [ ] "Reduce 3D" toggle exists, works, and persists
- [ ] Every 3D interaction has a keyboard-reachable DOM equivalent
- [ ] Context loss shows the fallback, not a blank box
- [ ] WebGL disabled entirely: the page is still complete and bookable
- [ ] The 3D bundle is dynamically imported and absent from the main chunk
- [ ] LCP unaffected by the canvas

---

# Sizing the world: the failure that renders nothing

Measured on this site. A 300-unit route inside the default **120-unit far plane**
rendered *nothing but `scene.background`* - a flat navy panel, no error, no
warning, no console output. It is indistinguishable from "the scene failed to
load", and it survived a review because the fallback photograph was also dark.

**Derive the frustum from the world, every time.**

```js
import { depthPlan, createCamera } from './three.brand.js'

const WORLD_DEPTH = 340                       // scene units, longest axis
const plan = depthPlan(WORLD_DEPTH)           // { near, far, fogNear, fogFar }
const camera = createCamera(aspect, tier, plan)
scene.fog = new THREE.Fog(colour, plan.far * 0.24, plan.far * 0.78)
```

Fog ends the scene. The clip plane never does.

**Checklist when a scene renders "nothing":**

1. Is `camera.far` larger than the distance to the furthest object?
2. Is the sky dome radius inside `camera.far`?
3. Is `fogFar` inside `camera.far`?
4. Is anything at all inside `camera.near`?

---

# A scroll-driven scene is a story, not a loop

Decoration animates. A journey **advances**. Scroll position is the only clock:

```
p = 0.04 + scrollProgress * 0.92        // runway at both ends
```

Everything reads from `p`: sky palette, sun elevation, light colour and intensity,
camera offset, route draw range, waypoint proximity. Nothing is on a timer except
idle drift.

## The sky carries the narrative

Four keyframes, interpolated with smoothstep, every stop a brand hue or a `RAMP`
step. The Trip Express BD route runs **first light → morning → clear day → golden
hour**:

| `t` | Moment | zenith / high / horizon / glow |
|---|---|---|
| 0.00 | First light over Chattogram | deep800 / deep600 / **sunset** / sand |
| 0.36 | Morning climb past Pokhara | deep700 / **sky** / blue300 / white |
| 0.70 | Clear day over the plateau | deep600 / blue400 / sand300 / white |
| 1.00 | Golden hour into Kashmir | deep800 / orange700 / **sunset** / sand |

**Do not open on the dark end of the story.** The first build started at blue
hour, which is beautiful and lasted about four seconds before the visitor decided
the page had not loaded. Open on the best-looking moment of the flight; earn the
dark moments later.

## Sky implementation

A `CanvasTexture` gradient on a `SphereGeometry(BackSide)` pinned to the camera
each frame, `MeshBasicMaterial({ toneMapped: false, fog: false, depthWrite: false })`.

- **Not a raw `ShaderMaterial`.** Hand-written fragment shaders bypass three's
  output colour-space conversion, and every brand hex comes out wrong. The
  CanvasTexture path is the same one `verifyBrandColour()` checks.
- Repaint only when the palette has actually moved (quantise `p` to ~240 steps).
- Canvas row 0 maps to the **top** of the dome. The horizon stop belongs near the
  **middle** of the canvas - put it at 62% and the bright band ends up below the
  terrain, where nobody sees it.
- `scene.fog.color` follows the horizon stop (mixed toward the mid stop by ~0.4)
  so the terrain always dissolves into exactly the sky behind it.

## What makes a flight read as a flight

In the order they were worth adding:

1. **A cloud deck *below* the flight path.** Looking down on weather is what reads
   as altitude. Faceted boulders at wing height read as an asteroid field -
   `IcosahedronGeometry(1, 1)` scaled `(1.45, 0.40, 1.0)`, roughness 0.95, low
   emissive, y well under the route.
2. **Layered ridges with aerial perspective.** Four strips (two on mobile), each
   further back, each a lighter ramp step, all dissolving into the fog. The whole
   landscape sits **below** the route - a near ridge at eye level is a slab across
   the frame, not a mountain.
3. **A route that draws itself.** A dim full tube plus a bright one whose
   `setDrawRange` follows `p`.
4. **Waypoints that report back to the DOM**, so the page can light up the
   matching destination and a click can fly the camera there.

## Proof cards

At each waypoint, a **real photograph from that departure** on a billboarded plane
with a white frame, fading and scaling in with proximity. This is what stops the
scene being decoration: the 3D is showing the brand's actual evidence.

Brand rule 4 applies inside WebGL. A destination with no photograph gets a marker
and **nothing else** - an empty framed placeholder reads as a broken image, which
is worse than an absence.

## Composition against the layout

The hero copy owns the left third on desktop. Shift the **frustum**, not the
camera:

```js
if (!mobile && w / h > 1.3) camera.setViewOffset(w, h, -Math.round(w * 0.17), 0, w, h)
else camera.clearViewOffset()
```

FOV, roll and camera path stay untouched - only the window onto them moves.

## Two small things that read as bugs

- **Snap the camera on the first frame.** Lerping in from the origin looks like a
  loading glitch, not an entrance: `if (!firstFrame) camera.position.copy(target)`.
- **Never allocate per frame.** Palette interpolation runs 60×/s; use module-level
  scratch `Color`s and `Vector3`s, not fresh ones.

## Budget notes from this build

Desktop: ~28 draw calls, well inside the 120 cap - 4 ridge strips, 2 route tubes,
1 instanced cloud deck (48), 5 waypoint groups, sky, sun, stars, sea, aircraft.
Mobile: 2 ridges, 20 clouds, no rim light, no shadows, DPR ≤ 1.5.

Bloom is a **texture** (a radial `CanvasTexture` on an additive plane), not a post
pass. That keeps the mobile tier at zero passes while still giving the sun a glow.
