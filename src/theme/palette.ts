// ============================================================
// Sutrigo — Brand colour tokens + MUI palette definitions
// SINGLE SOURCE OF TRUTH for every colour used in the app.
// Change a hex here → both MUI components AND the existing
// CSS-variable-driven styles update in lockstep.
// ============================================================

/**
 * Brand colours. Surfaced on the MUI theme under `theme.palette.brand`
 * so any component can read them via `useTheme()`.
 */
export const BRAND = {
  sunset: '#FF7B54',
  coral:  '#FF9F76',
  gold:   '#D4AF37',
  ocean:  '#0A4D68',
  teal:   '#05BFDB',
  leaf:   '#4CAF50',
} as const;

export type BrandPalette = typeof BRAND;

/**
 * Neutrals — warm-toned to match the resort/tropical aesthetic.
 */
export const NEUTRALS = {
  // Light
  bg:          '#FAF6EF',
  bgElev:      '#FFFFFF',
  bgSunken:    '#F2EDE3',
  ink:         '#1A1410',
  ink2:        '#4A423B',
  ink3:        '#80766B',
  inkMute:     '#B8AFA3',
  line:        'rgba(26, 20, 16, 0.08)',
  line2:       'rgba(26, 20, 16, 0.14)',
  // Dark
  bgDark:      '#0E0B08',
  bgElevDark:  '#181310',
  bgSunkenDk:  '#07060A',
  inkDark:     '#F6EFE4',
  ink2Dark:    '#C9BFB1',
  ink3Dark:    '#8A8174',
  inkMuteDk:   '#5C544A',
  lineDark:    'rgba(246, 239, 228, 0.08)',
  line2Dark:   'rgba(246, 239, 228, 0.14)',
} as const;

/* ---------------- MUI palette options ---------------- */

import type { PaletteOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main:         BRAND.sunset,
    light:        BRAND.coral,
    dark:         '#E0653D',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main:         BRAND.gold,
    light:        '#E6C66B',
    dark:         '#A88A2A',
    contrastText: NEUTRALS.ink,
  },
  info:    { main: BRAND.teal,  contrastText: '#FFFFFF' },
  success: { main: BRAND.leaf,  contrastText: '#FFFFFF' },
  warning: { main: '#E0A800',   contrastText: NEUTRALS.ink },
  error:   { main: '#D7263D',   contrastText: '#FFFFFF' },
  background: {
    default: NEUTRALS.bg,
    paper:   NEUTRALS.bgElev,
  },
  text: {
    primary:   NEUTRALS.ink,
    secondary: NEUTRALS.ink2,
    disabled:  NEUTRALS.ink3,
  },
  divider: NEUTRALS.line,
  brand:   BRAND,
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main:         BRAND.sunset,
    light:        BRAND.coral,
    dark:         '#E0653D',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main:         BRAND.gold,
    light:        '#E6C66B',
    dark:         '#A88A2A',
    contrastText: NEUTRALS.ink,
  },
  info:    { main: BRAND.teal,  contrastText: '#FFFFFF' },
  success: { main: BRAND.leaf,  contrastText: '#FFFFFF' },
  warning: { main: '#E0A800',   contrastText: NEUTRALS.ink },
  error:   { main: '#D7263D',   contrastText: '#FFFFFF' },
  background: {
    default: NEUTRALS.bgDark,
    paper:   NEUTRALS.bgElevDark,
  },
  text: {
    primary:   NEUTRALS.inkDark,
    secondary: NEUTRALS.ink2Dark,
    disabled:  NEUTRALS.ink3Dark,
  },
  divider: NEUTRALS.lineDark,
  brand:   BRAND,
};
