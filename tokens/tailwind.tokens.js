/**
 * Trip Express BD - Tailwind CSS Theme Mapping (Gate 2 Design System)
 * Maps CSS custom properties from tokens/tokens.css + tokens/themes.css
 * so Tailwind utilities automatically respond to light, Night Ocean dark,
 * high-contrast, and comfortable/compact density modes.
 *
 * Usage in tailwind.config.js:
 *   const teTokens = require('./tokens/tailwind.tokens.js');
 *   module.exports = { darkMode: ['class', '[data-theme="dark"]'], theme: { extend: { ...teTokens } } };
 */

module.exports = {
  colors: {
    /* Primitive palettes (for gradients / brand illustrations / explicit scales) */
    orange: {
      50: '#FEF8F5', 100: '#FDEFE6', 200: '#FADDC9', 300: '#F7C5A4',
      400: '#F2A16A', 500: '#ED7C30', 600: '#C96A2B', 700: '#A45826',
      800: '#804621', 900: '#60371C', 950: '#402718',
      DEFAULT: 'var(--te-p-orange-500)',
    },
    sky: {
      50: '#F6FAFD', 100: '#E8F2FA', 200: '#CEE3F4', 300: '#ACD0ED',
      400: '#78B2E1', 500: '#4394D5', 600: '#3A7EB5', 700: '#316896',
      800: '#285376', 900: '#20405B', 950: '#182D3F',
      DEFAULT: 'var(--te-p-sky-500)',
    },
    ocean: {
      50: '#F5F8FB', 100: '#E6EEF5', 200: '#C9DAEA', 300: '#A4C1DB',
      400: '#6B99C5', 500: '#3171AE', 600: '#2B6195', 700: '#25517B',
      800: '#1E4162', 900: '#19324C', 950: '#132436',
      DEFAULT: 'var(--te-p-ocean-500)',
    },
    ink: {
      0: '#FFFFFF', 50: '#F7F9FB', 100: '#EFF3F7', 200: '#DFE5EC',
      300: '#C6CFDA', 400: '#9AA6B6', 500: '#6F7D90', 600: '#556274',
      700: '#3F4A5A', 800: '#2B3442', 900: '#1B2330', 950: '#111823',
    },

    /* Semantic theme-aware roles */
    canvas:  'var(--te-bg-canvas)',
    subtle:  'var(--te-bg-subtle)',
    warm:    'var(--te-bg-warm)',
    cool:    'var(--te-bg-cool)',
    card:    'var(--te-surface-card)',
    raised:  'var(--te-surface-raised)',
    field:   'var(--te-surface-field)',
    selected:'var(--te-surface-selected)',
    border:  'var(--te-border-subtle)',
    control: 'var(--te-border-control)',
    heading: 'var(--te-text-heading)',
    body:    'var(--te-text-body)',
    muted:   'var(--te-text-muted)',
    overline:'var(--te-text-overline)',
    link:    'var(--te-text-link)',
    ring:    'var(--te-focus-ring)',

    primary: {
      DEFAULT: 'var(--te-action-primary-bg)',
      hover:   'var(--te-action-primary-bg-hover)',
      active:  'var(--te-action-primary-bg-active)',
      ink:     'var(--te-action-primary-ink)',
    },
    secondary: {
      DEFAULT: 'var(--te-action-secondary-bg)',
      hover:   'var(--te-action-secondary-bg-hover)',
      active:  'var(--te-action-secondary-bg-active)',
      ink:     'var(--te-action-secondary-ink)',
    },
    danger: {
      DEFAULT: 'var(--te-action-danger-bg)',
      hover:   'var(--te-action-danger-bg-hover)',
      ink:     'var(--te-action-danger-ink)',
    },
    status: {
      'success-text':    'var(--te-status-success-text)',
      'success-surface': 'var(--te-status-success-surface)',
      'success-border':  'var(--te-status-success-border)',
      'warning-text':    'var(--te-status-warning-text)',
      'warning-surface': 'var(--te-status-warning-surface)',
      'warning-border':  'var(--te-status-warning-border)',
      'error-text':      'var(--te-status-error-text)',
      'error-surface':   'var(--te-status-error-surface)',
      'error-border':    'var(--te-status-error-border)',
      'info-text':       'var(--te-status-info-text)',
      'info-surface':    'var(--te-status-info-surface)',
      'info-border':     'var(--te-status-info-border)',
    },
    whatsapp: {
      DEFAULT:   'var(--te-wa-solid-bg)',
      hover:     'var(--te-wa-solid-hover)',
      ink:       'var(--te-wa-solid-ink)',
      soft:      'var(--te-wa-soft-bg)',
      'soft-ink':'var(--te-wa-soft-ink)',
      'soft-bd': 'var(--te-wa-soft-border)',
    },
  },

  fontFamily: {
    display: ['var(--te-font-display)'],
    body:    ['var(--te-font-body)'],
    bangla:  ['var(--te-font-bangla)'],
    num:     ['var(--te-font-num)'],
    mono:    ['var(--te-font-mono)'],
  },

  fontSize: {
    'micro':      ['var(--te-p-fs-micro)',      { lineHeight: '1.30', letterSpacing: 'var(--te-p-track-overline)', fontWeight: '700' }],
    'caption':    ['var(--te-p-fs-caption)',    { lineHeight: '1.45', fontWeight: '500' }],
    'body-sm':    ['var(--te-p-fs-body-sm)',    { lineHeight: '1.55' }],
    'body':       ['var(--te-p-fs-body)',       { lineHeight: '1.60' }],
    'bn-min':     ['var(--te-p-fs-bn-min)',     { lineHeight: '1.85', letterSpacing: '0' }],
    'body-lg':    ['var(--te-p-fs-body-lg)',    { lineHeight: '1.65' }],
    'h4':         ['var(--te-p-fs-h4)',         { lineHeight: '1.40', fontWeight: '600' }],
    'h3':         ['var(--te-p-fs-h3)',         { lineHeight: '1.30', letterSpacing: '-0.01em', fontWeight: '700' }],
    'h2':         ['var(--te-p-fs-h2)',         { lineHeight: '1.20', letterSpacing: '-0.015em', fontWeight: '700' }],
    'h1':         ['var(--te-p-fs-h1)',         { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-lg': ['var(--te-p-fs-display-lg)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
    'display-xl': ['var(--te-p-fs-display-xl)', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '800' }],
    'price-sm':   ['var(--te-p-fs-price-sm)',   { lineHeight: '1.20', fontWeight: '600' }],
    'price-lg':   ['var(--te-p-fs-price-lg)',   { lineHeight: '1.10', letterSpacing: '-0.01em', fontWeight: '700' }],
  },

  spacing: {
    'section-y': 'var(--te-space-section-y)',
    'card-pad':  'var(--te-space-card-pad)',
    'grid-gap':  'var(--te-space-grid-gap)',
    'page-x':    'var(--te-space-page-x)',
  },

  borderRadius: {
    xs: 'var(--te-p-r-xs)',
    sm: 'var(--te-p-r-sm)',
    md: 'var(--te-p-r-md)',
    lg: 'var(--te-p-r-lg)',
    xl: 'var(--te-p-r-xl)',
    '2xl': 'var(--te-p-r-2xl)',
    pill: 'var(--te-p-r-pill)',
    disc: 'var(--te-p-r-disc)',
    btn: 'var(--te-btn-radius)',
    input: 'var(--te-input-radius)',
    card: 'var(--te-card-radius)',
  },

  boxShadow: {
    xs: 'var(--te-shadow-xs)',
    sm: 'var(--te-shadow-sm)',
    md: 'var(--te-shadow-md)',
    lg: 'var(--te-shadow-lg)',
    xl: 'var(--te-shadow-xl)',
    warm: 'var(--te-p-shadow-warm)',
  },

  backgroundImage: {
    'grad-sunset':   'var(--te-grad-sunset)',
    'grad-ocean':    'var(--te-grad-ocean)',
    'grad-night':    'var(--te-grad-night)',
    'grad-horizon':  'var(--te-grad-horizon)',
    'scrim':         'var(--te-scrim)',
    'glow-ambient':  'var(--te-glow-ambient)',
    'glow-infinity': 'var(--te-glow-infinity)',
    'glow-warm':     'var(--te-glow-warm)',
    'glow-sky':      'var(--te-glow-sky)',
    'flight-streak': 'repeating-linear-gradient(107deg, rgba(237,124,48,0.07) 0px, rgba(237,124,48,0.07) 2px, transparent 2px, transparent 18px)',
  },

  transitionTimingFunction: {
    'te-out':   'var(--te-p-ease-out)',
    'te-in':    'var(--te-p-ease-in)',
    'te-inout': 'var(--te-p-ease-inout)',
    'te-lift':  'var(--te-p-ease-lift)',
  },

  transitionDuration: {
    instant: 'var(--te-p-dur-instant)',
    fast:    'var(--te-p-dur-fast)',
    base:    'var(--te-p-dur-base)',
    slow:    'var(--te-p-dur-slow)',
    scenic:  'var(--te-p-dur-scenic)',
  },

  screens: {
    sm: '480px',
    md: '640px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    hoverable: { raw: '(hover: hover) and (pointer: fine)' },
    touch:     { raw: '(hover: none)' },
    'motion-ok': { raw: '(prefers-reduced-motion: no-preference)' },
  },

  maxWidth: {
    narrow:    'var(--te-p-container-narrow)',
    container: 'var(--te-p-container)',
    wide:      'var(--te-p-container-wide)',
    measure:   'var(--te-measure)',
    'measure-bn': 'var(--te-measure-bangla)',
  },

  zIndex: {
    base:     'var(--te-p-z-base)',
    raised:   'var(--te-p-z-raised)',
    sticky:   'var(--te-p-z-sticky)',
    dropdown: 'var(--te-p-z-dropdown)',
    whatsapp: 'var(--te-p-z-whatsapp)',
    overlay:  'var(--te-p-z-overlay)',
    modal:    'var(--te-p-z-modal)',
    toast:    'var(--te-p-z-toast)',
  },

  rotate: {
    flight: 'var(--te-p-flight-angle)',
    'flight-neg': 'var(--te-p-flight-angle-neg)',
  },
};
