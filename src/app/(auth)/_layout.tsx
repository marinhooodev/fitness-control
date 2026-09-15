import { Stack } from 'expo-router';

import { useDemoStore } from '@/store/demo-store';

export default function AuthLayout() {
  const session = useDemoStore((state) => state.session);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack.Protected>
      <Stack.Protected guard={Boolean(session && !session.onboardingComplete)}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
    </Stack>
  );
}
