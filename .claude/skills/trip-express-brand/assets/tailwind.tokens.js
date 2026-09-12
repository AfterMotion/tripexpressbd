/**
 * Trip Express BD — Tailwind theme extension
 * Spread this into tailwind.config.js -> theme.extend
 *
 *   const teBrand = require('./.claude/skills/trip-express-brand/assets/tailwind.tokens.js')
 *   module.exports = { theme: { extend: { ...teBrand } } }
 */

module.exports = {
  colors: {
    orange: {
      50: '#FEF8F5', 100: '#FDEFE6', 200: '#FADDC9', 300: '#F7C5A4',
      400: '#F2A16A', 500: '#ED7C30', 600: '#C96A2B', 700: '#A45826',
      800: '#804621', 900: '#60371C', 950: '#402718',
      DEFAULT: '#ED7C30',
    },
    sky: {
      50: '#F6FAFD', 100: '#E8F2FA', 200: '#CEE3F4', 300: '#ACD0ED',
      400: '#78B2E1', 500: '#4394D5', 600: '#3A7EB5', 700: '#316896',
      800: '#285376', 900: '#20405B', 950: '#182D3F',
      DEFAULT: '#4394D5',
    },
    ocean: {
      50: '#F5F8FB', 100: '#E6EEF5', 200: '#C9DAEA', 300: '#A4C1DB',
      400: '#6B99C5', 500: '#3171AE', 600: '#2B6195', 700: '#25517B',
      800: '#1E4162', 900: '#19324C', 950: '#132436',
      DEFAULT: '#3171AE',
    },
    ink: {
      0: '#FFFFFF', 50: '#F7F9FB', 100: '#EFF3F7', 200: '#DFE5EC',
      300: '#C6CFDA', 400: '#9AA6B6', 500: '#6F7D90', 600: '#556274',
      700: '#3F4A5A', 800: '#2B3442', 900: '#1B2330', 950: '#111823',
    },
    success: { DEFAULT: '#1E9E6A', text: '#15784F', surface: '#E7F7F0', border: '#A7E3CB' },
    warning: { DEFAULT: '#E0A000', text: '#8A6100', surface: '#FFF6E0', border: '#F5DB9B' },
    danger:  { DEFAULT: '#D64545', text: '#B02E2E', surface: '#FDECEC', border: '#F3B9B9' },
    info:    { DEFAULT: '#3171AE', text: '#25517B', surface: '#E6EEF5', border: '#A4C1DB' },
    whatsapp:{ DEFAULT: '#25D366', hover: '#1FBE5A', ink: '#0B3D22' },
  },

  fontFamily: {
    display: ['Plus Jakarta Sans', 'Hind Siliguri', 'Segoe UI', 'system-ui', 'sans-serif'],
    body:    ['Inter', 'Hind Siliguri', 'Segoe UI', 'system-ui', 'sans-serif'],
    bangla:  ['Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi', 'Segoe UI', 'sans-serif'],
    num:     ['Inter', 'system-ui', 'sans-serif'],
  },

  fontSize: {
    'display-xl': ['clamp(2.75rem, 1.6rem + 4.6vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '800' }],
    'display-lg': ['clamp(2.25rem, 1.5rem + 3.2vw, 3.5rem)',  { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
    'h1':         ['clamp(1.875rem, 1.35rem + 2.2vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
    'h2':         ['clamp(1.5rem, 1.2rem + 1.3vw, 2.125rem)',  { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
    'h3':         ['clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
    'h4':         ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
    'body-lg':    ['1.125rem', { lineHeight: '1.65' }],
    'body':       ['1rem', { lineHeight: '1.6' }],
    'body-sm':    ['0.9375rem', { lineHeight: '1.55' }],
    'caption':    ['0.875rem', { lineHeight: '1.45', fontWeight: '500' }],
    'overline':   ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.12em', fontWeight: '700' }],
    'price-lg':   ['clamp(1.5rem, 1.2rem + 1.2vw, 2rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
    'price-sm':   ['1.125rem', { lineHeight: '1.2', fontWeight: '600' }],
  },

  borderRadius: {
    xs: '4px', sm: '8px', md: '12px', lg: '16px',
    xl: '24px', '2xl': '32px', pill: '999px', disc: '50%',
  },

  boxShadow: {
    xs:   '0 1px 2px rgba(19,36,54,0.06)',
    sm:   '0 2px 6px rgba(19,36,54,0.08)',
    md:   '0 8px 20px rgba(19,36,54,0.10)',
    lg:   '0 16px 40px rgba(19,36,54,0.14)',
    xl:   '0 28px 64px rgba(19,36,54,0.18)',
    warm: '0 10px 28px rgba(237,124,48,0.32)',
  },

  backgroundImage: {
    'grad-sunset':  'linear-gradient(17deg, #F2A16A 0%, #ED7C30 100%)',
    'grad-ocean':   'linear-gradient(17deg, #4394D5 0%, #3171AE 100%)',
    'grad-night':   'linear-gradient(17deg, #19324C 0%, #132436 100%)',
    'grad-horizon': 'linear-gradient(17deg, #ED7C30 0%, #F2A16A 34%, #FFFFFF 50%, #4394D5 66%, #3171AE 100%)',
    'scrim':        'linear-gradient(to top, rgba(19,36,54,0.88) 0%, rgba(19,36,54,0.55) 38%, rgba(19,36,54,0) 100%)',
    'flight-streak':'repeating-linear-gradient(107deg, rgba(237,124,48,0.07) 0px, rgba(237,124,48,0.07) 2px, transparent 2px, transparent 18px)',
  },

  transitionTimingFunction: {
    'te-out':   'cubic-bezier(0.16, 1, 0.30, 1)',
    'te-in':    'cubic-bezier(0.70, 0, 0.84, 0)',
    'te-inout': 'cubic-bezier(0.65, 0, 0.35, 1)',
    'te-lift':  'cubic-bezier(0.34, 1.26, 0.64, 1)',
  },

  transitionDuration: {
    instant: '100ms', fast: '180ms', base: '260ms', slow: '420ms', scenic: '700ms',
  },

  screens: {
    sm: '480px',
    md: '640px',
    lg: '1024px',   // primary break: mobile behaviour <-> desktop behaviour
    xl: '1280px',
    '2xl': '1536px',
    // Capability queries — gate hover affordances and 3D on these, not on width.
    hoverable: { raw: '(hover: hover) and (pointer: fine)' },
    touch: { raw: '(hover: none)' },
    'motion-ok': { raw: '(prefers-reduced-motion: no-preference)' },
    'short-landscape': { raw: '(max-height: 480px) and (orientation: landscape)' },
  },

  height: {
    'screen-d': '100dvh',        // use this, never h-screen (100vh) on mobile
    'canvas-mobile': '55dvh',
  },

  maxHeight: {
    'canvas-mobile': '55dvh',
    'canvas-desktop': '100dvh',
  },

  maxWidth: {
    container: '1200px',
    'container-narrow': '800px',
    'container-wide': '1440px',
    measure: '68ch',
    'measure-bangla': '62ch',
  },

  rotate: { 'flight': '17deg', 'flight-neg': '-17deg' },

  zIndex: {
    sticky: '100', dropdown: '200', whatsapp: '300',
    overlay: '400', modal: '500', toast: '600',
  },

  keyframes: {
    depart: {
      from: { opacity: '0', transform: 'translate(-14px, 10px)' },
      to:   { opacity: '1', transform: 'translate(0, 0)' },
    },
  },

  animation: {
    depart: 'depart 260ms cubic-bezier(0.16, 1, 0.30, 1) both',
  },
};
