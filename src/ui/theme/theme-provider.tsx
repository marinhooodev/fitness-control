import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from 'expo-router';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { Platform, useColorScheme } from 'react-native';

import { type ThemeMode, useDemoStore } from '@/store/demo-store';
import { themes, type ControlTheme, type ResolvedThemeMode } from '@/ui/theme/themes';

interface ThemeContextValue {
  theme: ControlTheme;
  mode: ThemeMode;
  resolvedMode: ResolvedThemeMode;
  isHydrated: boolean;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const subscribeToClient = () => () => undefined;

interface ControlThemeProviderProps {
  children: ReactNode;
}

export function ControlThemeProvider({ children }: ControlThemeProviderProps) {
  const systemMode = useColorScheme();
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const mode = useDemoStore((state) => state.themeMode);
  const isHydrated = useDemoStore((state) => state.isHydrated);
  const setMode = useDemoStore((state) => state.setTheme);
  const stableSystemMode = Platform.OS === 'web' && !isClient ? 'light' : systemMode;
  const resolvedMode: ResolvedThemeMode =
    mode === 'system' ? (stableSystemMode === 'dark' ? 'dark' : 'light') : mode;
  const theme = themes[resolvedMode];

  useEffect(() => {
    if (Platform.OS === 'web') {
      void useDemoStore.persist.rehydrate();
    }
  }, []);

  const navigationTheme = useMemo(() => {
    const baseTheme = resolvedMode === 'dark' ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      dark: resolvedMode === 'dark',
      colors: {
        ...baseTheme.colors,
        primary: theme.colors.brand,
        background: theme.colors.canvas,
        card: theme.colors.surface,
        text: theme.colors.textPrimary,
        border: theme.colors.border,
        notification: theme.colors.danger,
      },
    };
  }, [resolvedMode, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, resolvedMode, isHydrated, setMode }),
    [isHydrated, mode, resolvedMode, setMode, theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <NavigationThemeProvider value={navigationTheme}>{children}</NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme must be used inside ControlThemeProvider');
  }

  return value;
}
