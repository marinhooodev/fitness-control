import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useDemoStore } from '@/store/demo-store';
import { controlFonts } from '@/ui/theme/fonts';
import { ControlThemeProvider, useTheme } from '@/ui/theme/theme-provider';

void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 240, fade: true });

function AppFrame() {
  const { resolvedMode, theme } = useTheme();

  return (
    <>
      <StatusBar style={resolvedMode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.colors.canvas },
          headerShown: false,
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(controlFonts);
  const isHydrated = useDemoStore((state) => state.isHydrated);
  const themeReady = Platform.OS === 'web' || isHydrated;
  const fontsReady = fontsLoaded || Boolean(fontError);

  useEffect(() => {
    if (fontsReady && themeReady) {
      void SplashScreen.hideAsync();
    }
  }, [fontsReady, themeReady]);

  if (!fontsReady || !themeReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ControlThemeProvider>
          <AppFrame />
        </ControlThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
