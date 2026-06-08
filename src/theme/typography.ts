// ============================================================
// Sutrigo — Typography tokens
// ============================================================

import type { TypographyVariantsOptions } from '@mui/material/styles';

export const FONT_DISPLAY = '"Space Grotesk", "Inter", system-ui, sans-serif';
export const FONT_BODY    = '"Inter", system-ui, sans-serif';
export const FONT_MONO    = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';

export const typography: TypographyVariantsOptions = {
  fontFamily: FONT_BODY,
  fontSize: 14,
  htmlFontSize: 16,
  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
    fontSize: 'clamp(40px, 6vw, 84px)',
    letterSpacing: '-0.035em',
    lineHeight: 1.08,
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 'clamp(28px, 3.4vw, 48px)',
    letterSpacing: '-0.028em',
    lineHeight: 1.1,
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 'clamp(20px, 2vw, 28px)',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: '-0.015em',
    lineHeight: 1.3,
  },
  h5: { fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 16, lineHeight: 1.4 },
  h6: { fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 14, lineHeight: 1.4 },
  body1: { fontSize: 15, lineHeight: 1.55 },
  body2: { fontSize: 13, lineHeight: 1.55 },
  button: {
    fontFamily: FONT_BODY,
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: '0.005em',
    textTransform: 'none',
  },
  caption: {
    fontSize: 12,
    color: 'inherit',
    letterSpacing: '0.02em',
  },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: 11,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    lineHeight: 1,
  },
};
