import { fireEvent, render } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useDemoStore } from '@/store/demo-store';
import { Button, Sheet, Text, TextField } from '@/ui/components';
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

function SheetHarness() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button label="Open sheet" onPress={() => setVisible(true)} />
      <Sheet onClose={() => setVisible(false)} title="Local sheet" visible={visible}>
        <Text>Sheet content</Text>
      </Sheet>
    </>
  );
}

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

    expect(view.getByLabelText('Email').props.accessibilityHint).toBe('Email is required.');
    expect(view.getByLabelText('Password').props.secureTextEntry).toBe(true);
    await fireEvent.press(view.getByRole('button', { name: 'Show password' }));
    expect(view.getByLabelText('Password').props.secureTextEntry).toBe(false);
  });

  it('opens and closes the local sheet', async () => {
    const view = await renderWithProviders(<SheetHarness />);

    await fireEvent.press(view.getByRole('button', { name: 'Open sheet' }));
    view.getByRole('header', { name: 'Local sheet' });
    await fireEvent.press(view.getByRole('button', { name: 'Close sheet' }));
    expect(view.queryByRole('header', { name: 'Local sheet' })).toBeNull();
  });
});
