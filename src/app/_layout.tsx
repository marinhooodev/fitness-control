import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useDemoStore } from '@/store/demo-store';
import { controlFonts } from '@/ui/theme/fonts';
import { ControlThemeProvider, useTheme } from '@/ui/theme/theme-provider';

void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 240, fade: true });

function AppFrame() {
  const { resolvedMode, theme } = useTheme();
  const session = useDemoStore((state) => state.session);
  const needsOnboarding = Boolean(session && !session.onboardingComplete);

  return (
    <>
      <StatusBar style={resolvedMode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.colors.canvas },
          headerShown: false,
        }}
      >
        <Stack.Protected guard={!session || needsOnboarding}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={Boolean(session?.onboardingComplete)}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(controlFonts);
  const isHydrated = useDemoStore((state) => state.isHydrated);
  const fontsReady = fontsLoaded || Boolean(fontError);

  useEffect(() => {
    void useDemoStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (fontsReady && isHydrated) {
      void SplashScreen.hideAsync();
    }
  }, [fontsReady, isHydrated]);

  if (!fontsReady || !isHydrated) {
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
