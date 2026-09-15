import { fireEvent, render } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ActiveWorkoutScreen } from '@/features/workout/active-workout-screen';
import { useDemoStore } from '@/store/demo-store';
import { ControlThemeProvider } from '@/ui/theme/theme-provider';

const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  DarkTheme: {
    dark: true,
    colors: {
      primary: '#ffffff',
      background: '#000000',
      card: '#111111',
      text: '#ffffff',
      border: '#333333',
      notification: '#ff0000',
    },
  },
  DefaultTheme: {
    dark: false,
    colors: {
      primary: '#000000',
      background: '#ffffff',
      card: '#ffffff',
      text: '#000000',
      border: '#dddddd',
      notification: '#ff0000',
    },
  },
  Redirect: () => null,
  ThemeProvider: ({ children }: { children: ReactNode }) => children,
  useRouter: () => ({ replace: mockReplace }),
}));

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

describe('<ActiveWorkoutScreen />', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    useDemoStore.setState({
      themeMode: 'light',
      isHydrated: true,
      profile: {
        id: 'profile-test',
        name: 'Jordan Lee',
        email: 'jordan@example.com',
        avatarSeed: 'jordan',
      },
      preferences: { goal: 'balanced', daysPerWeek: 4, equipment: 'full-gym' },
      session: {
        profileId: 'profile-test',
        signedInAt: '2026-09-15T12:00:00.000Z',
        onboardingComplete: true,
      },
      activeWorkout: {
        workoutId: 'upper-strength-a',
        status: 'active',
        startedAt: new Date().toISOString(),
        pausedAt: null,
        accumulatedPauseMs: 0,
      },
    });
  });

  it('pauses, resumes and finishes the local session', async () => {
    const view = await render(
      <GestureHandlerRootView>
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ControlThemeProvider>
            <ActiveWorkoutScreen />
          </ControlThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>,
    );

    await fireEvent.press(view.getByRole('button', { name: 'Pause workout' }));
    expect(useDemoStore.getState().activeWorkout?.status).toBe('paused');
    view.getByRole('button', { name: 'Resume workout' });

    await fireEvent.press(view.getByRole('button', { name: 'Resume workout' }));
    expect(useDemoStore.getState().activeWorkout?.status).toBe('active');

    await fireEvent.press(view.getByRole('button', { name: 'Finish workout' }));
    expect(useDemoStore.getState().activeWorkout).toBeNull();
    expect(mockReplace).toHaveBeenCalledWith('/(app)/(tabs)/today');
  });
});
