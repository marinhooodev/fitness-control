import { act, fireEvent, render } from '@testing-library/react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ControlDock } from '@/features/shell/control-dock';
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

const routes = ['today', 'plan', 'progress', 'you'].map((name) => ({
  key: `${name}-key`,
  name,
  params: undefined,
}));

function createProps() {
  const emit = jest.fn(() => ({ defaultPrevented: false }));
  const navigate = jest.fn();
  const descriptors = Object.fromEntries(
    routes.map((route) => [route.key, { options: {}, route }]),
  );

  const props = {
    state: {
      stale: false,
      type: 'tab',
      key: 'tabs-key',
      index: 0,
      routeNames: routes.map((route) => route.name),
      history: [{ type: 'route', key: routes[0].key }],
      routes,
      preloadedRouteKeys: [],
    },
    descriptors,
    navigation: { emit, navigate },
    insets: initialMetrics.insets,
  } as unknown as BottomTabBarProps;

  return { props, emit, navigate };
}

describe('<ControlDock />', () => {
  beforeEach(() => {
    mockPush.mockClear();
    useDemoStore.setState({
      themeMode: 'dark',
      isHydrated: true,
      activeWorkout: null,
    });
  });

  it('selects tabs and opens preview from the central action', async () => {
    const { props, navigate } = createProps();
    const view = await render(
      <GestureHandlerRootView>
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ControlThemeProvider>
            <ControlDock {...props} />
          </ControlThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>,
    );

    expect(view.getByRole('tab', { name: 'Today' })).toBeSelected();
    await fireEvent.press(view.getByRole('tab', { name: 'Plan' }));
    expect(navigate).toHaveBeenCalledWith('plan', undefined);

    await fireEvent.press(view.getByRole('button', { name: 'Start workout' }));
    expect(mockPush).toHaveBeenCalledWith('/(app)/workout/preview');
  });

  it('shows the live state and returns to an active workout', async () => {
    const { props } = createProps();
    const view = await render(
      <GestureHandlerRootView>
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ControlThemeProvider>
            <ControlDock {...props} />
          </ControlThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>,
    );

    await act(async () => {
      useDemoStore.setState({
        activeWorkout: {
          workoutId: 'upper-strength',
          status: 'active',
          startedAt: '2026-09-15T12:00:00.000Z',
          pausedAt: null,
          accumulatedPauseMs: 0,
        },
      });
    });

    const liveAction = view.getByRole('button', { name: 'Return to active workout' });
    expect(view.getByText('LIVE')).toBeTruthy();

    await fireEvent.press(liveAction);
    expect(mockPush).toHaveBeenCalledWith('/(app)/workout/active');
  });
});
