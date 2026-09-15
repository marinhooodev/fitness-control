import { fireEvent, render } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SignInScreen } from '@/features/auth/sign-in-screen';
import { useDemoStore } from '@/store/demo-store';
import { ControlThemeProvider } from '@/ui/theme/theme-provider';

const mockPush = jest.fn();

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
  ThemeProvider: ({ children }: { children: ReactNode }) => children,
  useRouter: () => ({ push: mockPush }),
}));

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

async function renderScreen() {
  return render(
    <GestureHandlerRootView>
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <ControlThemeProvider>
          <SignInScreen />
        </ControlThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>,
  );
}

describe('<SignInScreen />', () => {
  beforeEach(() => {
    mockPush.mockClear();
    useDemoStore.setState({
      themeMode: 'light',
      isHydrated: true,
      profile: null,
      preferences: null,
      session: null,
    });
  });

  it('opens sign-up with an unknown valid email', async () => {
    const view = await renderScreen();

    await fireEvent.changeText(view.getByLabelText('Email'), 'NEW@EXAMPLE.COM');
    await fireEvent.changeText(view.getByLabelText('Password'), '12345678');
    await fireEvent.press(view.getByRole('button', { name: 'Sign in locally' }));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/(auth)/sign-up',
      params: { email: 'new@example.com', source: 'unknown-email' },
    });
  });

  it('enters directly with the complete demo profile', async () => {
    const view = await renderScreen();

    await fireEvent.press(view.getByRole('button', { name: 'Continue with demo profile' }));

    expect(useDemoStore.getState().profile?.name).toBe('Alex Morgan');
    expect(useDemoStore.getState().session?.onboardingComplete).toBe(true);
  });
});
