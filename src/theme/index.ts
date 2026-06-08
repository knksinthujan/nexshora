// ============================================================
// Sutrigo — MUI Theme factory
// Single source of truth: palette + typography + shape +
// component overrides. Tweaks at runtime flow through
// `createSutrigoTheme()` so every MUI component AND every
// CSS-variable consumer updates in lockstep.
// ============================================================

import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette, BRAND, type BrandPalette } from './palette';
import { typography } from './typography';

/* ---- Augment the MUI palette type with our brand colours ---- */
declare module '@mui/material/styles' {
  interface Palette {
    brand: BrandPalette;
  }
  interface PaletteOptions {
    brand?: BrandPalette;
  }
}

export type ThemeMode = 'light' | 'dark';

export type SutrigoThemeOptions = {
  mode?: ThemeMode;
  /** Primary brand colour (sunset orange by default). */
  primary?: string;
  /** Secondary / accent brand colour (gold by default). */
  accent?: string;
  /** Extra MUI overrides spliced on top. */
  overrides?: ThemeOptions;
};

const SHARED: ThemeOptions = {
  typography,
  shape: { borderRadius: 14 },
  spacing: 8,
  shadows: [
    'none',
    '0 1px 2px rgba(26, 20, 16, 0.04), 0 1px 1px rgba(26, 20, 16, 0.03)',
    '0 4px 10px -2px rgba(26, 20, 16, 0.08), 0 2px 4px rgba(26, 20, 16, 0.04)',
    '0 16px 32px -12px rgba(26, 20, 16, 0.14), 0 6px 12px -4px rgba(26, 20, 16, 0.06)',
    '0 32px 60px -20px rgba(26, 20, 16, 0.22), 0 12px 24px -8px rgba(26, 20, 16, 0.08)',
    ...Array(20).fill(
      '0 32px 60px -20px rgba(26, 20, 16, 0.22), 0 12px 24px -8px rgba(26, 20, 16, 0.08)'
    ),
  ] as Theme['shadows'],
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 22,
          paddingBlock: 12,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 500 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: 'antialiased',
          textRendering: 'optimizeLegibility',
        },
      },
    },
  },
};

/**
 * Build a Sutrigo theme. Pass primary/accent overrides for live theming
 * (the Tweaks panel uses this on every change).
 */
export function createSutrigoTheme(opts: SutrigoThemeOptions = {}): Theme {
  const { mode = 'light', primary, accent, overrides = {} } = opts;
  const base = mode === 'dark' ? darkPalette : lightPalette;
  return createTheme({
    ...SHARED,
    palette: {
      ...base,
      ...(primary && { primary: { ...base.primary, main: primary } }),
      ...(accent  && { secondary: { ...base.secondary, main: accent } }),
    },
    ...overrides,
  });
}

export const lightTheme = createSutrigoTheme({ mode: 'light' });
export const darkTheme  = createSutrigoTheme({ mode: 'dark' });

export { BRAND } from './palette';
export type { BrandPalette } from './palette';
