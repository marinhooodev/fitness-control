import { Stack } from 'expo-router';

export default function AuthenticatedLayout() {
  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="workout/preview" />
      <Stack.Screen name="workout/active" />
    </Stack>
  );
}
