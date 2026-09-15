import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DesignSystemShowcaseScreen } from '@/features/foundation/design-system-showcase-screen';
import { demoStorageKey, useDemoStore } from '@/store/demo-store';
import { Button, TextField } from '@/ui/components';
import { ControlThemeProvider } from '@/ui/theme/theme-provider';

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

async function renderWithProviders(component: ReactElement) {
  useDemoStore.setState({ themeMode: 'light', isHydrated: true });

  return render(
    <GestureHandlerRootView>
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <ControlThemeProvider>{component}</ControlThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>,
  );
}

describe('<DesignSystemShowcaseScreen />', () => {
  it('renders the CONTROL foundation and switches the persisted theme mode', async () => {
    const view = await renderWithProviders(<DesignSystemShowcaseScreen />);

    view.getByRole('header', { name: 'BUILT TO MOVE.' });
    view.getByText('Manrope + Barlow Condensed');
    view.getByText('Vector-first identity');

    await fireEvent.press(view.getByRole('radio', { name: 'Dark' }));

    expect(useDemoStore.getState().themeMode).toBe('dark');
    view.getByText('Resolved appearance · dark');
    await waitFor(() =>
      expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(
        demoStorageKey,
        expect.stringContaining('"themeMode":"dark"'),
      ),
    );
  });

  it('opens and closes the local sheet', async () => {
    const view = await renderWithProviders(<DesignSystemShowcaseScreen />);

    await fireEvent.press(view.getByRole('button', { name: 'Open workout sheet' }));
    view.getByRole('header', { name: 'Today · Upper Strength' });

    await fireEvent.press(view.getByRole('button', { name: 'Close sheet' }));
    expect(view.queryByRole('header', { name: 'Today · Upper Strength' })).toBeNull();
  });
});

describe('CONTROL primitives', () => {
  it('honors enabled, disabled and loading button states', async () => {
    const onPress = jest.fn();
    const disabledPress = jest.fn();
    const view = await renderWithProviders(
      <>
        <Button label="Continue" onPress={onPress} />
        <Button disabled label="Unavailable" onPress={disabledPress} />
        <Button label="Saving" loading />
      </>,
    );

    await fireEvent.press(view.getByRole('button', { name: 'Continue' }));
    await fireEvent.press(view.getByRole('button', { name: 'Unavailable' }));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(disabledPress).not.toHaveBeenCalled();
    expect(view.getByRole('button', { name: 'Saving' })).toBeBusy();
    expect(view.getByRole('button', { name: 'Saving' })).toBeDisabled();
  });

  it('associates field errors and toggles password visibility', async () => {
    const view = await renderWithProviders(
      <>
        <TextField error="Email is required." label="Email" value="" />
        <TextField label="Password" secureTextEntry value="secret" />
      </>,
    );

    view.getByText('Email is required.');
    expect(view.getByLabelText('Email').props.accessibilityHint).toBe('Email is required.');
    expect(view.getByLabelText('Password').props.secureTextEntry).toBe(true);

    await fireEvent.press(view.getByRole('button', { name: 'Show password' }));

    expect(view.getByLabelText('Password').props.secureTextEntry).toBe(false);
    view.getByRole('button', { name: 'Hide password' });
  });
});
