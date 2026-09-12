/**
 * Trip Express BD - "The Journey": a scroll-driven departure.
 *
 * This is storytelling, not decoration. Scroll position IS flight progress, and
 * the whole world tells one story as it advances:
 *
 *   0.00  Chattogram, before dawn - stars out, ridges in silhouette
 *   0.28  Nepal, first light - the horizon turns Sand Orange
 *   0.52  Meghalaya, morning - Sky Blue opens up, cloud deck below the wing
 *   0.74  Dawki, over water - the river shelf and its sun glitter
 *   0.92  Kashmir, golden hour - Sunset Orange returns, ridges go warm
 *
 * At each waypoint a real trip photograph rises beside the route on a card, so the
 * 3D is showing the brand's actual proof, not an abstraction. Clicking a
 * destination in the DOM flies the camera to its waypoint and holds.
 *
 * Brand contract - references/10-3d-and-threejs.md:
 *  - ColorManagement on, brand hexes sRGB, Neutral tone mapping @ 1.0,
 *    `toneMapped: false` on every flat brand-colour element
 *  - key warm / fill cool / rim white, ambient <= 0.25
 *  - metalness 0, roughness >= 0.35, flat-shaded low poly
 *  - only the six brand hues and their documented ramp steps (RAMP)
 *  - camera roll 0, FOV 35 desktop / 45 mobile, never animated
 *  - the far plane is sized from the world (depthPlan) - fog hides the edge,
 *    never the clip plane
 *  - one WebGL context, mobile gets 0 shadows and 0 post passes
 *  - progressive enhancement: the page is complete and bookable without it
 */

import * as THREE from 'three';
import {
  COLOR, HEX, RAMP, TIERS, MOTION, FLIGHT_ANGLE_RAD,
  createRenderer, createLightRig, createCamera, brandMaterial, brandColor,
  createTierWatchdog, disposeScene, verifyBrandColour, depthPlan,
} from './three.brand.js';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };

/* ------------------------------------------------------------------
 * The route. `t` is flight progress 0..1 and maps to scroll.
 * `photo` is a real photograph from that departure; null means we have
 * none yet, and the card falls back to the brand's own sunset disc.
 * ------------------------------------------------------------------ */
export const WAYPOINTS = [
  { id: 'chattogram', label: 'Chattogram', sub: 'Departure',    t: 0.08, photo: null },
  { id: 'nepal',      label: 'Nepal',      sub: 'Pokhara',      t: 0.30, photo: 'nepal' },
  { id: 'meghalaya',  label: 'Meghalaya',  sub: 'Cherrapunji',  t: 0.52, photo: 'meghalaya' },
  { id: 'dawki',      label: 'Dawki',      sub: 'Umngot river', t: 0.74, photo: 'dawki' },
  { id: 'kashmir',    label: 'Kashmir',    sub: 'Season 5',     t: 0.93, photo: null },
];

/* ------------------------------------------------------------------
 * The sky: four keyframes across the flight. Every stop is a brand hue
 * or a documented ramp step - the horizon stop also drives the fog, so
 * the terrain always dissolves into exactly the sky behind it.
 * ------------------------------------------------------------------ */
const SKY_KEYS = [
  /* first light over Chattogram - the page opens on the best hour of the flight,
     never on a dim frame */
  { t: 0.00, zenith: RAMP.deep800, high: RAMP.deep600,   horizon: HEX.sunset,   glow: HEX.sand },
  /* morning climb past Pokhara */
  { t: 0.36, zenith: RAMP.deep700, high: HEX.sky,        horizon: RAMP.blue300, glow: HEX.white },
  /* clear day over the plateau and the Umngot */
  { t: 0.70, zenith: RAMP.deep600, high: RAMP.blue400,   horizon: RAMP.sand300, glow: HEX.white },
  /* golden hour into Kashmir */
  { t: 1.00, zenith: RAMP.deep800, high: RAMP.orange700, horizon: HEX.sunset,   glow: HEX.sand },
];

/* Scratch colours - skyAt runs every frame, so it must not allocate. */
const SKY_SCRATCH = { zenith: new THREE.Color(), high: new THREE.Color(), horizon: new THREE.Color(), glow: new THREE.Color() };
const SKY_TMP = new THREE.Color();

function skyAt(p) {
  let i = 0;
  while (i < SKY_KEYS.length - 2 && p > SKY_KEYS[i + 1].t) i++;
  const a = SKY_KEYS[i], b = SKY_KEYS[i + 1];
  const k = smooth(a.t, b.t, p);
  for (const key of ['zenith', 'high', 'horizon', 'glow']) {
    SKY_SCRATCH[key].setHex(a[key], THREE.SRGBColorSpace);
    SKY_TMP.setHex(b[key], THREE.SRGBColorSpace);
    SKY_SCRATCH[key].lerp(SKY_TMP, k);
  }
  return SKY_SCRATCH;
}

/* Gradient sky on a dome. A CanvasTexture keeps the brand hexes exact through
   `toneMapped: false` + MeshBasicMaterial - the same path verifyBrandColour()
   checks. A raw ShaderMaterial would bypass three's output colour conversion. */
function createSky(mobile) {
  const c = document.createElement('canvas');
  c.width = 2; c.height = 256;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, mobile ? 18 : 28, mobile ? 12 : 18),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false, depthWrite: false, toneMapped: false }),
  );
  mesh.renderOrder = -10;

  const hex = (col) => '#' + col.getHexString(THREE.SRGBColorSpace);
  let lastKey = -1;

  return {
    mesh,
    /** Repaint only when the palette has actually moved. */
    paint(p, palette) {
      const key = Math.round(p * 240);
      if (key === lastKey) return;
      lastKey = key;
      /* Row 0 = dome top (zenith), row 256 = dome bottom. The horizon stop sits
         at 62%, not 46% - any higher and its bright "glow" neighbour paints a
         pale band across the part of the sky the terrain never covers, which
         reads as a streak sweeping the screen while the camera travels. */
      const g = ctx.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0.00, hex(palette.zenith));
      g.addColorStop(0.34, hex(palette.high));
      g.addColorStop(0.62, hex(palette.horizon));
      g.addColorStop(0.68, hex(palette.glow));
      g.addColorStop(1.00, hex(palette.horizon));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 2, 256);
      tex.needsUpdate = true;
    },
    dispose() { tex.dispose(); },
  };
}

/* ------------------------------------------------------------------
 * Ridge strips. Seeded value noise over a macro profile so the same
 * silhouette renders identically on every load.
 * ------------------------------------------------------------------ */
function ridgeGeometry({ length, segments, depth, amp, seed, profile, base }) {
  let s = seed >>> 0;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const ph = [];
  for (let i = 0; i < 6; i++) ph.push(rnd() * Math.PI * 2);
  const detail = (u) =>
      Math.sin(u * 13.7 + ph[0]) * 0.34
    + Math.sin(u * 27.1 + ph[1]) * 0.20
    + Math.sin(u * 52.3 + ph[2]) * 0.11
    + Math.sin(u * 97.9 + ph[3]) * 0.05;

  const top = [];
  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    const macro = profile(u);
    const h = amp * Math.max(0.02, macro * (0.60 + 0.40 * (detail(u) * 0.5 + 0.5)) + 0.16 * detail(u * 1.7));
    top.push({ x: (u - 0.5) * length, y: h });
  }

  const pos = [];
  for (let i = 0; i < segments; i++) {
    const a = top[i], b = top[i + 1];
    // front wall, camera-facing
    pos.push(a.x, base, 0, b.x, base, 0, b.x, b.y, 0);
    pos.push(a.x, base, 0, b.x, b.y, 0, a.x, a.y, 0);
    // back-slanting ridge facet so the key light has a surface to catch
    pos.push(a.x, a.y, 0, b.x, b.y, 0, b.x, b.y - depth * 0.22, -depth);
    pos.push(a.x, a.y, 0, b.x, b.y - depth * 0.22, -depth, a.x, a.y - depth * 0.22, -depth);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

/* ------------------------------------------------------------------
 * Aircraft: extruded delta, nose along +Z so lookAt() aims it.
 * ------------------------------------------------------------------ */
function planeGeometry() {
  const s = new THREE.Shape();
  s.moveTo(1.5, 0);
  s.lineTo(0.25, 0.16); s.lineTo(-0.5, 0.16);
  s.lineTo(-1.15, 0.95); s.lineTo(-0.72, 0.95);
  s.lineTo(0.1, 0.16); s.lineTo(0.1, -0.16);
  s.lineTo(-0.72, -0.95); s.lineTo(-1.15, -0.95);
  s.lineTo(-0.5, -0.16); s.lineTo(0.25, -0.16);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: false, curveSegments: 1 });
  g.center();
  g.rotateX(Math.PI / 2);
  g.rotateY(-Math.PI / 2);
  g.computeVertexNormals();
  return g;
}

/* A soft radial sprite - used for the sun bloom and the wing light. Bloom as a
   texture, not a post pass, keeps the mobile tier at zero passes. */
function glowTexture(hex) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const col = brandColor(hex);
  const rgb = `${Math.round(col.r * 255)},${Math.round(col.g * 255)},${Math.round(col.b * 255)}`;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(${rgb},0.85)`);
  g.addColorStop(0.35, `rgba(${rgb},0.28)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* Fallback card face for a destination we have no photograph of yet.
   Brand rule 4: the sunset disc, never stock imagery. */
function placeholderTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 256, 256, 0);   // 17deg family: rises right
  g.addColorStop(0, '#A45826');
  g.addColorStop(0.55, '#ED7C30');
  g.addColorStop(1, '#F2A16A');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  ctx.beginPath(); ctx.arc(176, 84, 42, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,.34)'; ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, 256); ctx.lineTo(0, 176); ctx.lineTo(58, 132); ctx.lineTo(104, 168);
  ctx.lineTo(158, 106); ctx.lineTo(206, 156); ctx.lineTo(256, 124); ctx.lineTo(256, 256);
  ctx.closePath(); ctx.fillStyle = 'rgba(19,36,54,.30)'; ctx.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createJourneyScene({ canvas, tierName, onReady, onWaypoint, assetBase = 'assets/' }) {
  const tier = TIERS[tierName];
  if (!tier) return null;

  const mobile = tierName === 'mobile';
  const renderer = createRenderer(canvas, tierName);

  /* The world is ~340 units long and 200 deep. Size the frustum from it. */
  const WORLD_DEPTH = 340;
  const plan = depthPlan(WORLD_DEPTH);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(brandColor(RAMP.blue900), plan.far * 0.24, plan.far * 0.78);
  const bgColor = brandColor(HEX.night);
  scene.background = bgColor;

  const camera = createCamera(canvas.clientWidth / Math.max(1, canvas.clientHeight), tierName, plan);
  const lights = createLightRig(scene, tierName);

  const world = new THREE.Group();
  scene.add(world);

  /* ---------- sky + sun ---------- */
  const sky = createSky(mobile);
  sky.mesh.scale.setScalar(plan.far * 0.82);
  scene.add(sky.mesh);

  const sunGroup = new THREE.Group();
  const sun = new THREE.Mesh(
    new THREE.CircleGeometry(1, mobile ? 36 : 64),
    new THREE.MeshBasicMaterial({ color: COLOR.sunset.clone(), fog: false, toneMapped: false }),
  );
  sun.scale.setScalar(11);
  sunGroup.add(sun);
  const sunGlowTex = glowTexture(HEX.sand);
  const sunGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: sunGlowTex, transparent: true, fog: false, toneMapped: false,
      depthWrite: false, blending: THREE.AdditiveBlending,
    }),
  );
  sunGlow.scale.setScalar(150);
  sunGlow.position.z = -1;
  sunGroup.add(sunGlow);
  sun.renderOrder = -9;
  sunGlow.renderOrder = -9;
  scene.add(sunGroup);

  /* ---------- stars (they set before first light) ---------- */
  let stars = null;
  {
    const n = mobile ? 160 : 420;
    const arr = new Float32Array(n * 3);
    let s = 20250912 >>> 0;
    const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < n; i++) {
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(clamp(rnd() * 1.25 - 0.18, -1, 1));
      const r = plan.far * 0.70;
      arr[i * 3] = Math.sin(ph) * Math.cos(th) * r;
      arr[i * 3 + 1] = Math.abs(Math.cos(ph)) * r * 0.9;
      arr[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    stars = new THREE.Points(g, new THREE.PointsMaterial({
      color: COLOR.white.clone(), size: 1.8, sizeAttenuation: false,
      transparent: true, opacity: 0, depthWrite: false, fog: false, toneMapped: false,
    }));
    stars.renderOrder = -8;
    scene.add(stars);
  }

  /* ---------- the route ---------- */
  const ROUTE_LEN = 320;
  const routePoints = [];
  for (let i = 0; i <= 30; i++) {
    const u = i / 30;
    routePoints.push(new THREE.Vector3(
      (u - 0.5) * ROUTE_LEN,
      10 + Math.sin(u * Math.PI * 1.6) * 3.2 + (u - 0.5) * ROUTE_LEN * Math.tan(FLIGHT_ANGLE_RAD) * 0.16,
      Math.sin(u * Math.PI * 2.1) * 8,
    ));
  }
  const route = new THREE.CatmullRomCurve3(routePoints);

  const tubeSegs = mobile ? 90 : 200;
  const ribbon = new THREE.Mesh(
    new THREE.TubeGeometry(route, tubeSegs, 0.09, mobile ? 5 : 8, false),
    new THREE.MeshBasicMaterial({ color: COLOR.white.clone(), toneMapped: false, transparent: true, opacity: 0.22, fog: false }),
  );
  world.add(ribbon);

  /* the flown part of the route draws itself in behind the aircraft */
  const trail = new THREE.Mesh(
    new THREE.TubeGeometry(route, tubeSegs, 0.16, mobile ? 5 : 8, false),
    new THREE.MeshBasicMaterial({ color: COLOR.white.clone(), toneMapped: false, fog: false }),
  );
  trail.geometry.setDrawRange(0, 0);
  world.add(trail);

  /* ---------- terrain: aerial perspective, far ridges wash into the sky ---------- */
  const bump = (u, c, w) => Math.exp(-((u - c) ** 2) / w);
  const macro = (u) => clamp(
    0.22
    + bump(u, 0.30, 0.011) * 1.00      // Annapurna behind Pokhara
    + bump(u, 0.52, 0.020) * 0.66      // the Meghalaya plateau
    + bump(u, 0.93, 0.013) * 1.10      // the Kashmir wall
    - bump(u, 0.74, 0.010) * 0.40,     // the Umngot valley cuts down to water
    0.03, 1.6);

  const ridgeSpec = mobile
    ? [
        { z: -184, y: -36, amp: 56, depth: 34, seed: 7,  color: RAMP.deep600, k: 1.00, segs: 72, rough: 0.88 },
        { z: -96,  y: -58, amp: 32, depth: 26, seed: 23, color: RAMP.deep900, k: 0.56, segs: 62, rough: 0.84 },
      ]
    : [
        { z: -236, y: -32, amp: 64, depth: 42, seed: 7,  color: RAMP.deep400, k: 1.00, segs: 118, rough: 0.90 },
        { z: -172, y: -42, amp: 50, depth: 36, seed: 23, color: RAMP.deep600, k: 0.80, segs: 106, rough: 0.88 },
        { z: -116, y: -52, amp: 38, depth: 30, seed: 91, color: RAMP.deep800, k: 0.60, segs: 94,  rough: 0.86 },
        { z: -68,  y: -66, amp: 30, depth: 26, seed: 41, color: RAMP.deep900, k: 0.46, segs: 82,  rough: 0.82 },
      ];

  const ridges = ridgeSpec.map((L) => {
    const m = new THREE.Mesh(
      ridgeGeometry({
        length: ROUTE_LEN * 1.9, segments: L.segs, depth: L.depth, amp: L.amp, seed: L.seed,
        base: -46, profile: (u) => macro(u) * L.k + 0.05,
      }),
      brandMaterial({ color: brandColor(L.color), roughness: L.rough, flatShading: true }),
    );
    m.position.set(0, L.y, L.z);
    world.add(m);
    return m;
  });

  /* ---------- water: the Umngot shelf and the sea we start from ---------- */
  const sea = new THREE.Mesh(
    new THREE.PlaneGeometry(ROUTE_LEN * 3.2, 620, 1, 1),
    brandMaterial({ color: COLOR.ocean.clone(), roughness: 0.48 }),
  );
  sea.rotation.x = -Math.PI / 2;
  sea.position.set(0, -108, -190);
  world.add(sea);

  const glitterTex = glowTexture(HEX.sand);
  const glitter = new THREE.Mesh(
    new THREE.PlaneGeometry(46, 200),
    new THREE.MeshBasicMaterial({
      map: glitterTex, transparent: true, opacity: 0.5, depthWrite: false,
      blending: THREE.AdditiveBlending, toneMapped: false, fog: false,
    }),
  );
  glitter.rotation.x = -Math.PI / 2;
  glitter.position.set(0, -107.4, -190);
  world.add(glitter);

  /* ---------- cloud deck: the thing that actually reads as flight ---------- */
  let clouds = null;
  {
    const count = mobile ? 20 : 48;
    const geo = new THREE.IcosahedronGeometry(1, 1);
    geo.scale(1.45, 0.40, 1.0);
    clouds = new THREE.InstancedMesh(
      geo,
      brandMaterial({ color: COLOR.white.clone(), roughness: 0.95, emissive: COLOR.white, emissiveIntensity: 0.34 }),
      count,
    );
    clouds.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const dummy = new THREE.Object3D();
    let s = 99991 >>> 0;
    const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    clouds.userData.seeds = [];
    for (let i = 0; i < count; i++) {
      /* the deck sits under the flight path: you look down on to it, which is
         what actually reads as altitude */
      const far = rnd();
      const d = {
        x: (rnd() - 0.5) * ROUTE_LEN * 2.0,
        y: -64 + far * 30,
        z: -48 - far * 165,
        s: 5 + rnd() * 8 + far * 6,
        drift: 0.5 + rnd() * 1.6,
        ph: rnd() * Math.PI * 2,
      };
      clouds.userData.seeds.push(d);
      dummy.position.set(d.x, d.y, d.z);
      dummy.scale.setScalar(d.s);
      dummy.rotation.set(0, rnd() * Math.PI, 0);
      dummy.updateMatrix();
      clouds.setMatrixAt(i, dummy.matrix);
    }
    clouds.instanceMatrix.needsUpdate = true;
    world.add(clouds);
  }

  /* ---------- waypoints: a real photograph on a card beside the route ---------- */
  const loader = new THREE.TextureLoader();
  const fallbackTex = placeholderTexture();
  const coneGeo = new THREE.ConeGeometry(1.35, 5.0, 5);
  const ringGeo = new THREE.RingGeometry(2.4, 2.8, 30);
  const stemGeo = new THREE.CylinderGeometry(0.09, 0.09, 26, 5);
  const cardGeo = new THREE.PlaneGeometry(7.6, 7.6);
  const frameGeo = new THREE.PlaneGeometry(8.6, 8.6);
  const ownTextures = [fallbackTex, sunGlowTex, glitterTex];

  const markers = WAYPOINTS.map((w) => {
    const g = new THREE.Group();
    const at = route.getPointAt(w.t);

    const cone = new THREE.Mesh(coneGeo, brandMaterial({
      color: COLOR.white, roughness: 0.45, emissive: COLOR.sand, emissiveIntensity: 0.2,
    }));
    cone.rotation.x = Math.PI;
    g.add(cone);

    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
      color: COLOR.sunset.clone(), toneMapped: false, transparent: true, opacity: 0,
      side: THREE.DoubleSide, fog: false,
    }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -4.2;
    g.add(ring);

    const stem = new THREE.Mesh(stemGeo, new THREE.MeshBasicMaterial({
      color: COLOR.white.clone(), toneMapped: false, transparent: true, opacity: 0.18, fog: false,
    }));
    stem.position.y = -17;
    g.add(stem);

    /* the proof card - only where a real photograph from that departure exists */
    const card = new THREE.Group();
    card.visible = false;
    const frame = new THREE.Mesh(frameGeo, new THREE.MeshBasicMaterial({
      color: COLOR.white.clone(), toneMapped: false, transparent: true, opacity: 0, fog: false,
    }));
    frame.position.z = -0.06;
    const face = new THREE.Mesh(cardGeo, new THREE.MeshBasicMaterial({
      map: fallbackTex, toneMapped: false, transparent: true, opacity: 0, fog: false,
    }));
    card.add(frame); card.add(face);
    card.position.set(6, 9.5, -30);
    g.add(card);

    if (!w.photo) {
      card.userData.disabled = true;
    } else {
      loader.load(
        `${assetBase}img/disc/${w.photo}-${mobile ? 240 : 480}.webp`,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          face.material.map = tex;
          face.material.needsUpdate = true;
          ownTextures.push(tex);
        },
        undefined,
        () => { card.userData.disabled = true; },
      );
    }

    g.position.copy(at).add(new THREE.Vector3(0, -3.4, 0));
    world.add(g);
    return { ...w, group: g, cone, ring, card, frame, face, baseY: at.y - 3.4 };
  });

  /* ---------- the aircraft ---------- */
  const aircraft = new THREE.Mesh(
    planeGeometry(),
    brandMaterial({ color: COLOR.white, roughness: 0.4, emissive: COLOR.white, emissiveIntensity: 0.6 }),
  );
  aircraft.scale.setScalar(mobile ? 3.6 : 3.4);
  aircraft.up.set(0, 1, 0);
  if (tier.shadows) aircraft.castShadow = true;
  world.add(aircraft);

  const wingGlowTex = glowTexture(HEX.sunset);
  const wingGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: wingGlowTex, transparent: true, opacity: 0.8, depthWrite: false,
      blending: THREE.AdditiveBlending, toneMapped: false, fog: false,
    }),
  );
  wingGlow.scale.setScalar(16);
  world.add(wingGlow);
  ownTextures.push(wingGlowTex);

  /* ---------- state ---------- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const flight = { v: 0, t: 0 };
  const focus = { active: false, t: 0, until: 0 };
  const clock = new THREE.Clock();
  const tmpPos = new THREE.Vector3();
  const tmpTan = new THREE.Vector3();
  const tmpLook = new THREE.Vector3();
  const camPos = new THREE.Vector3();
  const offs = new THREE.Vector3();
  const tmpOff = new THREE.Vector3();
  const sunDir = new THREE.Vector3();
  const dummy = new THREE.Object3D();

  let raf = 0, visible = true, disposed = false, firstFrame = false, activeWp = -1;

  /* World-space chase offset: behind, above, and to the near side, so the ridge
     line (negative Z) fills the background. It closes in as the flight advances -
     the journey gets more intimate, it never rolls, and FOV never moves. */
  const CAM_FAR_OFF  = mobile ? new THREE.Vector3(-40, 15, 58) : new THREE.Vector3(-46, 17, 66);
  const CAM_NEAR_OFF = mobile ? new THREE.Vector3(-28, 10, 42) : new THREE.Vector3(-32, 12, 48);
  const LOOK_OFF     = mobile ? new THREE.Vector3(16, 6, -12) : new THREE.Vector3(22, 8, -16);
  const camOff = new THREE.Vector3();

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, tier.dprCap));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Hero copy occupies the left third on desktop. A frustum shift moves the
    // flight into the clear right-hand side without touching FOV or roll.
    if (!mobile && w / h > 1.3) camera.setViewOffset(w, h, -Math.round(w * 0.17), 0, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }

  const watchdog = createTierWatchdog({
    tierName,
    onDowngrade() {
      if (lights.key.castShadow) { lights.key.castShadow = false; renderer.shadowMap.enabled = false; }
      if (ridges.length > 2) ridges[0].visible = false;
      if (clouds) clouds.count = Math.max(8, Math.floor(clouds.count * 0.5));
      if (stars) stars.visible = false;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    },
  });

  function frame() {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), MOTION.maxDelta);
    const time = clock.elapsedTime;
    watchdog(dt);

    const k = 1 - Math.pow(1 - MOTION.dampCamera, dt * 60);

    let target = flight.t;
    if (focus.active) {
      if (time > focus.until) focus.active = false;
      else target = focus.t;
    }
    flight.v += (target - flight.v) * k;
    pointer.x += (pointer.tx - pointer.x) * k;
    pointer.y += (pointer.ty - pointer.y) * k;

    const p = 0.04 + clamp(flight.v, 0, 1) * 0.92;   // runway at both ends

    /* ---- the sky story ---- */
    const palette = skyAt(p);
    sky.paint(p, palette);
    scene.fog.color.copy(palette.horizon).lerp(palette.high, 0.42);
    bgColor.copy(palette.zenith);
    if (stars) stars.material.opacity = (1 - smooth(0.02, 0.16, p)) * 0.55;

    /* key light warms and climbs with the sun */
    lights.key.color.copy(palette.glow).lerp(COLOR.sand, 0.5);   // the key stays warm at every hour
    lights.key.intensity = lerp(2.3, 2.9, smooth(0.05, 0.45, p));
    lights.fill.intensity = lerp(0.9, 1.15, smooth(0.1, 0.5, p));

    /* ---- fly ---- */
    route.getPointAt(p, tmpPos);
    route.getTangentAt(p, tmpTan);
    aircraft.position.copy(tmpPos);
    aircraft.lookAt(tmpLook.copy(tmpPos).add(tmpTan));
    aircraft.rotateZ(clamp(-tmpTan.z * 0.6, -0.36, 0.36));   // bank, never a roll
    wingGlow.position.copy(tmpPos);

    const idx = trail.geometry.index;
    if (idx) trail.geometry.setDrawRange(0, Math.floor(idx.count * p));

    /* ---- chase camera ---- */
    camOff.copy(CAM_FAR_OFF).lerp(CAM_NEAR_OFF, smooth(0.05, 0.95, p));
    offs.copy(camOff).add(tmpOff.set(pointer.x * 6, -pointer.y * 3.6, 0));
    camPos.copy(tmpPos).add(offs);
    // First frame snaps into the chase position - a fly-in from the origin reads
    // as a bug, not an entrance.
    if (!firstFrame) camera.position.copy(camPos);
    else camera.position.lerp(camPos, 1 - Math.pow(0.002, dt));
    camera.lookAt(tmpLook.copy(tmpPos).add(LOOK_OFF));
    camera.rotation.z = 0;

    /* sky dome and sun ride with the camera so the horizon never runs out */
    sky.mesh.position.copy(camera.position);
    const elev = lerp(0.035, 0.20, smooth(0.0, 0.62, p)) - smooth(0.72, 1.0, p) * 0.12;
    const hx = Math.cos(FLIGHT_ANGLE_RAD), hz = -1.25;
    sunDir.set(hx, Math.tan(elev) * Math.hypot(hx, hz), hz).normalize();
    sunGroup.position.copy(camera.position).addScaledVector(sunDir, plan.far * 0.60);
    sunGroup.quaternion.copy(camera.quaternion);
    // the disc has to out-burn the sky it sits in, or it reads as a smudge
    sun.material.color.copy(palette.glow).lerp(COLOR.white, 0.62);
    sunGlow.material.opacity = lerp(0.35, 0.95, smooth(0.08, 0.5, p));
    glitter.position.x = sunGroup.position.x * 0.12;
    glitter.material.opacity = 0.22 + smooth(0.55, 0.85, p) * 0.45;

    /* ---- clouds drift, and the deck thickens over the plateau ---- */
    if (clouds) {
      const seeds = clouds.userData.seeds;
      for (let i = 0; i < clouds.count; i++) {
        const d = seeds[i];
        dummy.position.set(
          d.x + Math.sin(time * 0.05 * d.drift + d.ph) * 6,
          d.y + Math.sin(time * 0.22 + d.ph) * 0.7,
          d.z,
        );
        dummy.scale.setScalar(d.s);
        dummy.rotation.set(0, d.ph + time * 0.01 * d.drift, 0);
        dummy.updateMatrix();
        clouds.setMatrixAt(i, dummy.matrix);
      }
      clouds.instanceMatrix.needsUpdate = true;
      clouds.material.emissive.copy(palette.glow).lerp(COLOR.white, 0.45);
    }

    /* ---- waypoints report back to the DOM ---- */
    let nearest = -1, nd = 1;
    for (let i = 0; i < markers.length; i++) {
      const m = markers[i];
      const d = Math.abs(p - m.t);
      if (d < nd) { nd = d; nearest = i; }
      const near = clamp(1 - d / 0.12, 0, 1);
      const eased = near * near * (3 - 2 * near);
      m.ring.material.opacity = eased * 0.9;
      m.ring.scale.setScalar(1 + (1 - eased) * 0.55);
      m.cone.material.emissiveIntensity = 0.2 + eased * 0.4;
      m.group.position.y = m.baseY + Math.sin(time * 0.9 + i) * 0.22;

      m.frame.material.opacity = eased * 0.95;
      m.face.material.opacity = eased;
      m.card.scale.setScalar(0.7 + eased * 0.3);
      m.card.visible = !m.card.userData.disabled && eased > 0.004;
      if (m.card.visible) {
        m.card.quaternion.copy(camera.quaternion);
        m.card.rotation.z = 0;
      }
    }
    if (nd < 0.085 && nearest !== activeWp) {
      activeWp = nearest;
      onWaypoint?.(markers[nearest].id, nearest);
    } else if (nd >= 0.125 && activeWp !== -1) {
      activeWp = -1;
      onWaypoint?.(null, -1);
    }

    sea.position.x = Math.sin(time * 0.07) * 3;
    sea.material.color.copy(palette.horizon).lerp(COLOR.ocean, 0.40);

    renderer.render(scene, camera);
    if (!firstFrame) { firstFrame = true; onReady?.(); }
  }

  /* ---------- inputs ---------- */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onPointerMove = (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.tx = clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1);
    pointer.ty = clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1);
  };
  const onPointerLeave = () => { pointer.tx = 0; pointer.ty = 0; };
  if (fine) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
  }

  let rt = 0;
  const onResize = () => { clearTimeout(rt); rt = setTimeout(resize, 150); };
  window.addEventListener('resize', onResize);

  const onVis = () => { visible = !document.hidden; };
  document.addEventListener('visibilitychange', onVis);

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; }, { threshold: 0 });
  io.observe(canvas);

  const onLost = (e) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
    canvas.dispatchEvent(new CustomEvent('te:contextlost', { bubbles: true }));
  };
  canvas.addEventListener('webglcontextlost', onLost);

  resize();
  clock.start();
  raf = requestAnimationFrame(frame);

  return {
    renderer,
    waypoints: WAYPOINTS,
    /** Scroll through the journey block, 0..1. */
    setProgress(v) { flight.t = clamp(v, 0, 1); },
    /** Fly to a named waypoint, hold, then hand control back to scroll. */
    flyTo(id, holdSeconds = 2.8) {
      const w = WAYPOINTS.find((x) => x.id === id);
      if (!w) return false;
      focus.t = w.t;
      focus.active = true;
      focus.until = clock.elapsedTime + holdSeconds;
      return true;
    },
    verify: () => verifyBrandColour(),
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      if (fine) {
        window.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerleave', onPointerLeave);
      }
      sky.dispose();
      ownTextures.forEach((t) => t.dispose());
      disposeScene(scene, renderer);
    },
  };
}
