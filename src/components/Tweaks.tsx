import { useTheme } from '@/context/ThemeContext';
import type { ThemeState } from '@/types';

// `tweaks-panel.jsx` (a starter) exposes these via window. We declare their
// shapes here so the TS code remains type-safe.
declare global {
  interface Window {
    TweaksPanel: React.FC<{ title?: string; children?: React.ReactNode }>;
    TweakSection: React.FC<{ label: string; children?: React.ReactNode }>;
    TweakToggle: React.FC<{ label: string; value: boolean; onChange: (v: boolean) => void }>;
    TweakRadio: React.FC<{ label: string; value: string; options: string[]; onChange: (v: string) => void }>;
    TweakColor: React.FC<{ label: string; value: string; options: string[]; onChange: (v: string) => void }>;
  }
}

const PRIMARY_OPTIONS = ['#FF7B54', '#D7263D', '#0A4D68', '#1F8A5B', '#7A4FF5'];
const ACCENT_OPTIONS  = ['#D4AF37', '#05BFDB', '#FF9F76', '#E76F51', '#9B86BD'];

export function Tweaks() {
  const { theme, setTheme } = useTheme();

  const set = <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
    window.parent.postMessage(
      { type: '__edit_mode_set_keys', edits: { [key]: value } },
      '*'
    );
  };

  const TweaksPanel  = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakToggle  = window.TweakToggle;
  const TweakRadio   = window.TweakRadio;
  const TweakColor   = window.TweakColor;

  if (!TweaksPanel) return null;

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakToggle
          label="Dark mode"
          value={theme.dark}
          onChange={(v) => set('dark', v)}
        />
        <TweakRadio
          label="Hero variant"
          value={theme.heroVariant}
          options={['cinematic', 'editorial']}
          onChange={(v) => set('heroVariant', v as ThemeState['heroVariant'])}
        />
      </TweakSection>
      <TweakSection label="Brand colors">
        <TweakColor
          label="Primary"
          value={theme.primary}
          options={PRIMARY_OPTIONS}
          onChange={(v) => set('primary', v)}
        />
        <TweakColor
          label="Accent"
          value={theme.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => set('accent', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}
