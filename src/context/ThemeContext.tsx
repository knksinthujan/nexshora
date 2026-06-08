import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createSutrigoTheme } from '@/theme';
import type { ThemeState } from '@/types';

type ThemeContextValue = {
  theme: ThemeState;
  setTheme: (next: ThemeState | ((prev: ThemeState) => ThemeState)) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  initial: ThemeState;
  children: ReactNode;
};

/**
 * Owns ThemeState (mode + brand colours + hero variant) and feeds it
 * into MUI's ThemeProvider. Also mirrors palette → CSS custom properties
 * so the existing token-driven CSS stays in sync.
 */
export function ThemeProvider({ initial, children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeState>(initial);

  const muiTheme = useMemo(
    () =>
      createSutrigoTheme({
        mode: theme.dark ? 'dark' : 'light',
        primary: theme.primary,
        accent: theme.accent,
      }),
    [theme.dark, theme.primary, theme.accent]
  );

  /* ---- Sync MUI palette → CSS variables ---- */
  useEffect(() => {
    const root = document.documentElement;
    if (theme.dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');

    const p = muiTheme.palette;
    root.style.setProperty('--primary', p.primary.main);
    root.style.setProperty('--accent', p.secondary.main);
    root.style.setProperty('--bg', p.background.default);
    root.style.setProperty('--bg-elev', p.background.paper);
    root.style.setProperty('--ink', p.text.primary);
    root.style.setProperty('--ink-2', p.text.secondary);
    root.style.setProperty('--ink-3', p.text.disabled || p.text.secondary);
    root.style.setProperty('--line', p.divider);
  }, [muiTheme, theme.dark]);

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
