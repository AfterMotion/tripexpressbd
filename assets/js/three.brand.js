/**
 * Trip Express BD - Three.js brand constants and rig factories.
 *
 * Import this instead of hardcoding colours, lights, camera or budgets.
 * Rules enforced here are documented in references/10-3d-and-threejs.md.
 *
 *   import * as TE3D from './.claude/skills/trip-express-brand/assets/three.brand.js'
 *
 * Requires three >= r162 (NeutralToneMapping).
 */

import * as THREE from 'three';

/* ------------------------------------------------------------------
 * 1. Colour management - must run before any Color is constructed
 * ------------------------------------------------------------------ */

THREE.ColorManagement.enabled = true;

/** Brand hexes, sRGB. Never construct a brand Color any other way. */
export const HEX = {
  sunset: 0xED7C30,   // primary
  sand:   0xF2A16A,   // key-light colour, mountain tint
  sky:    0x4394D5,   // secondary
  ocean:  0x3171AE,   // anchor
  night:  0x132436,   // darkest surface
  white:  0xFFFFFF,
  ink:    0x111823,
};

const srgb = (hex) => new THREE.Color().setHex(hex, THREE.SRGBColorSpace);

export const COLOR = {
  sunset: srgb(HEX.sunset),
  sand:   srgb(HEX.sand),
  sky:    srgb(HEX.sky),
  ocean:  srgb(HEX.ocean),
  night:  srgb(HEX.night),
  white:  srgb(HEX.white),
  ink:    srgb(HEX.ink),
};

/**
 * Tints and shades of the six hues. A scene needs more than six values to build
 * aerial perspective (distant ridges must wash out, near ridges must go to
 * silhouette) - but every value here is a step on a documented brand ramp, so the
 * "no seventh hue" rule still holds. Do not add a value that is not in
 * references/02-color.md.
 */
export const RAMP = {
  sand300:   0xF7C5A4,
  orange600: 0xC96A2B,
  orange700: 0xA45826,
  orange800: 0x804621,
  blue300:   0xACD0ED,
  blue400:   0x78B2E1,
  deep400:   0x6B99C5,
  deep600:   0x2B6195,
  deep700:   0x25517B,
  deep800:   0x1E4162,
  deep900:   0x19324C,
  night900:  0x101E2E,
  blue900:   0x20405B,
  blue950:   0x182D3F,
};

/** The only hues permitted in a brand 3D scene (plus their documented ramp steps). */
export const PALETTE_ALLOWLIST = Object.freeze(Object.values(HEX));
export const PALETTE_FULL = Object.freeze([...Object.values(HEX), ...Object.values(RAMP)]);

/** Brand-safe Color from any allowlisted hex. */
export const brandColor = (hex) => new THREE.Color().setHex(hex, THREE.SRGBColorSpace);

/* ------------------------------------------------------------------
 * 2. Geometry / motion constants
 * ------------------------------------------------------------------ */

export const FLIGHT_ANGLE_DEG = 17;
export const FLIGHT_ANGLE_RAD = (17 * Math.PI) / 180;

/** Unit direction of the Flight Angle: rises to the right. */
export const FLIGHT_DIR = new THREE.Vector3(
  Math.cos(FLIGHT_ANGLE_RAD),
  Math.sin(FLIGHT_ANGLE_RAD),
  0,
).normalize();

export const MOTION = {
  dampCamera: 0.08,        // lerp factor per frame at 60fps
  dampPointer: 0.08,
  pointerMaxRotationRad: (2.5 * Math.PI) / 180,
  pointerMaxTranslate: 12, // px-equivalent in scene units at the design distance
  idleDriftRadPerSec: 0.08,
  maxDelta: 1 / 30,        // clamp delta so 60Hz and 120Hz match
  entranceStaggerMs: 80,
  entranceStaggerCap: 6,
};

/* ------------------------------------------------------------------
 * 3. Performance tiers
 * ------------------------------------------------------------------ */

export const TIERS = {
  high: {
    dprCap: 2.0, maxTriangles: 350_000, maxDrawCalls: 120,
    shadowMapSize: 2048, shadows: true, postPasses: 3,
    maxTextureSize: 2048, targetFrameMs: 8, payloadBytes: 3.5e6, fov: 35,
  },
  standard: {
    dprCap: 1.75, maxTriangles: 180_000, maxDrawCalls: 80,
    shadowMapSize: 1024, shadows: true, postPasses: 1,
    maxTextureSize: 2048, targetFrameMs: 12, payloadBytes: 2.5e6, fov: 35,
  },
  mobile: {
    dprCap: 1.5, maxTriangles: 80_000, maxDrawCalls: 45,
    shadowMapSize: 0, shadows: false, postPasses: 0,
    maxTextureSize: 1024, targetFrameMs: 16, payloadBytes: 1.2e6, fov: 45,
  },
  off: null, // render the static fallback instead
};

/**
 * Pick a tier. Never upgrade mid-session - only downgrade.
 * Honours the user's "Reduce 3D" preference and saveData above everything else.
 */
export function detectTier() {
  if (typeof window === 'undefined') return 'off';

  try {
    if (localStorage.getItem('te-reduce-3d') === '1') return 'off';
  } catch { /* storage blocked - ignore */ }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 'off';

  const conn = navigator.connection;
  if (conn?.saveData) return 'off';
  if (conn && /^(slow-)?2g$/.test(conn.effectiveType || '')) return 'off';

  const gl = document.createElement('canvas').getContext('webgl2')
          || document.createElement('canvas').getContext('webgl');
  if (!gl) return 'off';

  const coarse = window.matchMedia?.('(pointer: coarse)').matches;
  const cores  = navigator.hardwareConcurrency || 4;
  const mem    = navigator.deviceMemory || 4;

  if (coarse || window.innerWidth < 1024) return mem < 4 ? 'off' : 'mobile';
  if (cores >= 8 && mem >= 8) return 'high';
  return 'standard';
}

/* ------------------------------------------------------------------
 * 4. Renderer - colour pipeline is non-negotiable
 * ------------------------------------------------------------------ */

export function createRenderer(canvas, tierName = 'standard') {
  const tier = TIERS[tierName];
  if (!tier) throw new Error('createRenderer called with the "off" tier');

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Neutral preserves brand hue. ACESFilmic shifts #ED7C30 toward cream - banned.
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, tier.dprCap));

  if (tier.shadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = tierName === 'high'
      ? THREE.PCFSoftShadowMap
      : THREE.PCFShadowMap;
  } else {
    renderer.shadowMap.enabled = false;
  }

  return renderer;
}

/* ------------------------------------------------------------------
 * 5. The brand light rig - key warm, fill cool, rim white
 * ------------------------------------------------------------------ */

export function createLightRig(scene, tierName = 'standard') {
  const tier = TIERS[tierName];

  // KEY - the sun, upper-right, climbing at the Flight Angle.
  const key = new THREE.DirectionalLight(COLOR.sand.clone(), 2.4);
  key.position.set(6, 4.2, 3);
  if (tier.shadows) {
    key.castShadow = true;
    key.shadow.mapSize.set(tier.shadowMapSize, tier.shadowMapSize);
    key.shadow.bias = -0.0005;
    key.shadow.normalBias = 0.02;
  }
  scene.add(key);

  // FILL - the sea. Cool hemisphere, never inverted.
  const fill = new THREE.HemisphereLight(COLOR.sky.clone(), COLOR.ocean.clone(), 0.85);
  scene.add(fill);

  // AMBIENT - lift only. Never above 0.25.
  const ambient = new THREE.AmbientLight(COLOR.sky.clone(), 0.18);
  scene.add(ambient);

  // RIM - the white seam. Desktop tiers only (mobile budget is 2 + ambient).
  let rim = null;
  if (tierName !== 'mobile') {
    rim = new THREE.DirectionalLight(COLOR.white.clone(), 1.1);
    rim.position.set(-4, 1.5, -5);
    scene.add(rim);
  }

  return { key, fill, ambient, rim };
}

/* ------------------------------------------------------------------
 * 6. Camera
 * ------------------------------------------------------------------ */

export function createCamera(aspect, tierName = 'standard', { near = 0.1, far = 120 } = {}) {
  const tier = TIERS[tierName];
  const camera = new THREE.PerspectiveCamera(tier.fov, aspect, near, far);
  camera.position.set(0, 1.2, 7);
  camera.lookAt(0, 0.4, 0);
  camera.rotation.z = 0; // roll is always zero
  return camera;
}

/**
 * Aerial perspective. A scene whose depth exceeds the camera far plane reads as
 * an empty background - measured on this site: a 300-unit route inside a 120-unit
 * far plane rendered nothing but `scene.background`. Size the far plane from the
 * world, then let fog, not clipping, hide the edge.
 *
 *   const { near, far, fogNear, fogFar } = depthPlan(worldDepth)
 */
export function depthPlan(worldDepth) {
  const far = Math.ceil(worldDepth * 2.2);
  return { near: Math.max(0.1, worldDepth / 4000), far, fogNear: far * 0.16, fogFar: far * 0.62 };
}

/* ------------------------------------------------------------------
 * 7. Materials
 * ------------------------------------------------------------------ */

/**
 * Brand-safe standard material. Metalness is pinned to 0 and roughness
 * is clamped to >= 0.35 so brand colour never distorts in reflections.
 */
export function brandMaterial({
  color = COLOR.sunset,
  roughness = 0.7,
  flatShading = false,
  emissive = null,
  emissiveIntensity = 0,
} = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color: color.clone(),
    metalness: 0.0,
    roughness: Math.min(0.95, Math.max(0.35, roughness)),
    flatShading,
    envMapIntensity: 0.55,
  });
  if (emissive) {
    mat.emissive = emissive.clone();
    mat.emissiveIntensity = Math.min(0.6, emissiveIntensity);
  }
  return mat;
}

/* ------------------------------------------------------------------
 * 8. Fog - colour must match the section background exactly
 * ------------------------------------------------------------------ */

export const FOG_BY_SECTION = {
  warm: 0xFEF8F5,   // orange-50
  cool: 0xE8F2FA,   // blue-100
  dark: 0x132436,   // deep-950
  white: 0xFFFFFF,
};

export function applyFog(scene, section = 'white', near = 8, far = 42) {
  scene.fog = new THREE.Fog(srgb(FOG_BY_SECTION[section]), near, far);
}

/* ------------------------------------------------------------------
 * 9. Frame-rate watchdog - downgrade only, never upgrade
 * ------------------------------------------------------------------ */

export function createTierWatchdog({ tierName, onDowngrade, thresholdFps = 45, windowMs = 2000 }) {
  let frames = 0;
  let elapsed = 0;
  let fired = false;
  const floor = tierName === 'mobile' ? 40 : thresholdFps;

  return function tick(delta) {
    if (fired) return;
    frames += 1;
    elapsed += delta * 1000;
    if (elapsed < windowMs) return;
    const fps = (frames / elapsed) * 1000;
    if (fps < floor) {
      fired = true;
      onDowngrade?.(fps);
    }
    frames = 0;
    elapsed = 0;
  };
}

/* ------------------------------------------------------------------
 * 10. Disposal - a leaked context on route change is a shipping blocker
 * ------------------------------------------------------------------ */

export function disposeScene(scene, renderer) {
  scene.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
    for (const mat of mats) {
      for (const key of Object.keys(mat)) {
        const value = mat[key];
        if (value && value.isTexture) value.dispose();
      }
      mat.dispose();
    }
  });
  renderer?.dispose();
  renderer?.forceContextLoss?.();
}

/* ------------------------------------------------------------------
 * 11. Verification helper - run this once per scene during QA
 * ------------------------------------------------------------------ */

/**
 * Colour-pipeline check. Renders a flat #ED7C30 quad with `toneMapped: false`
 * into its own canvas and reads the DEFAULT framebuffer back - a render target
 * is linear, so reading one measures nothing useful.
 *
 * With ColorManagement on, sRGB output and tone mapping bypassed, the result must
 * be #ED7C30 +/- 2 per channel. If it is not, the pipeline is broken.
 *
 * Measured, for reference, on the same quad WITH tone mapping applied at
 * exposure 1.0 (three r169):
 *   NoToneMapping  #ED7C30   exact
 *   Neutral        #E87414   closest tone-mapped option, hue held
 *   ACESFilmic     #E8903A   green +20, reads cream - banned
 *   AgX            #CC8A5C   desaturated - banned
 *   Reinhard       #B4722F   muddy - banned
 * This is why flat brand-colour elements set `toneMapped: false`.
 */
export function verifyBrandColour() {
  const canvas = document.createElement('canvas');
  canvas.width = 8; canvas.height = 8;
  const r = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true });
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.toneMapping = THREE.NeutralToneMapping;

  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial({ color: COLOR.sunset.clone(), toneMapped: false }),
  );
  scene.add(quad);
  r.setRenderTarget(null);
  r.render(scene, cam);

  const gl = r.getContext();
  const buf = new Uint8Array(4);
  gl.readPixels(4, 4, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf);

  quad.geometry.dispose();
  quad.material.dispose();
  r.dispose();

  const expected = [0xED, 0x7C, 0x30];
  const got = [buf[0], buf[1], buf[2]];
  const hex = (a) => '#' + a.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
  return { ok: expected.every((v, i) => Math.abs(got[i] - v) <= 2), got: hex(got), expected: hex(expected) };
}
