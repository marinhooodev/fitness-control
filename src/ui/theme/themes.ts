import { darkColors, elevation, lightColors, type SemanticColors } from '@/ui/theme/tokens';

export type ResolvedThemeMode = 'light' | 'dark';

export interface ControlTheme {
  name: ResolvedThemeMode;
  colors: SemanticColors;
  elevation: (typeof elevation)[ResolvedThemeMode];
}

export const themes: Record<ResolvedThemeMode, ControlTheme> = {
  light: {
    name: 'light',
    colors: lightColors,
    elevation: elevation.light,
  },
  dark: {
    name: 'dark',
    colors: darkColors,
    elevation: elevation.dark,
  },
};
