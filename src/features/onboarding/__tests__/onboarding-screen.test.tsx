import { fireEvent, render } from '@testing-library/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { OnboardingScreen } from '@/features/onboarding/onboarding-screen';
import { useDemoStore } from '@/store/demo-store';
import { ControlThemeProvider } from '@/ui/theme/theme-provider';

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

describe('<OnboardingScreen />', () => {
  it('collects all three choices before completing onboarding', async () => {
    useDemoStore.setState({
      themeMode: 'light',
      isHydrated: true,
      profile: {
        id: 'profile-test',
        name: 'Jordan Lee',
        email: 'jordan@example.com',
        avatarSeed: 'jordan@example.com',
      },
      preferences: null,
      session: {
        profileId: 'profile-test',
        signedInAt: '2026-09-15T12:00:00.000Z',
        onboardingComplete: false,
      },
    });

    const view = await render(
      <GestureHandlerRootView>
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ControlThemeProvider>
            <OnboardingScreen />
          </ControlThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>,
    );

    expect(view.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await fireEvent.press(view.getByRole('radio', { name: 'Build strength' }));
    await fireEvent.press(view.getByRole('button', { name: 'Continue' }));
    await fireEvent.press(view.getByRole('radio', { name: '3 days' }));
    await fireEvent.press(view.getByRole('button', { name: 'Continue' }));
    await fireEvent.press(view.getByRole('radio', { name: 'Home setup' }));
    await fireEvent.press(view.getByRole('button', { name: 'Complete setup' }));

    expect(useDemoStore.getState().preferences).toEqual({
      goal: 'strength',
      daysPerWeek: 3,
      equipment: 'home',
    });
    expect(useDemoStore.getState().session?.onboardingComplete).toBe(true);
  });
});
