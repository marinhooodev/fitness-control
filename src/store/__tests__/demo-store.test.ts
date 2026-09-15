import AsyncStorage from '@react-native-async-storage/async-storage';
import { waitFor } from '@testing-library/react-native';

import { demoStorageKey, useDemoStore } from '@/store/demo-store';

function resetStoreMemory() {
  useDemoStore.setState({
    themeMode: 'system',
    isHydrated: true,
    profile: null,
    preferences: null,
    session: null,
    activeWorkout: null,
  });
}

describe('demo store', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    resetStoreMemory();
  });

  it('creates the complete Alex Morgan demo session and persists it', async () => {
    useDemoStore.getState().signInDemo();

    const state = useDemoStore.getState();
    expect(state.profile).toMatchObject({
      name: 'Alex Morgan',
      email: 'alex@control.demo',
    });
    expect(state.preferences).toEqual({
      goal: 'balanced',
      daysPerWeek: 4,
      equipment: 'full-gym',
    });
    expect(state.session?.onboardingComplete).toBe(true);

    await waitFor(async () => {
      const persisted = await AsyncStorage.getItem(demoStorageKey);
      expect(persisted).toContain('alex@control.demo');
      expect(persisted).toContain('onboardingComplete');
    });
  });

  it('registers without accepting or persisting a password, then completes onboarding', async () => {
    useDemoStore.getState().registerLocal({
      name: ' Jordan Lee ',
      email: ' JORDAN@EXAMPLE.COM ',
    });

    expect(useDemoStore.getState().profile).toMatchObject({
      name: 'Jordan Lee',
      email: 'jordan@example.com',
    });
    expect(useDemoStore.getState().session?.onboardingComplete).toBe(false);

    useDemoStore.getState().completeOnboarding({
      goal: 'strength',
      daysPerWeek: 3,
      equipment: 'home',
    });

    expect(useDemoStore.getState().session?.onboardingComplete).toBe(true);
    expect(useDemoStore.getState().preferences?.goal).toBe('strength');

    await waitFor(async () => {
      const persisted = await AsyncStorage.getItem(demoStorageKey);
      expect(persisted).not.toMatch(/password/i);
      expect(persisted).toContain('jordan@example.com');
    });
  });

  it('rehydrates a completed local session after an in-memory restart', async () => {
    useDemoStore.getState().registerLocal({ name: 'Jordan Lee', email: 'jordan@example.com' });
    useDemoStore.getState().completeOnboarding({
      goal: 'conditioning',
      daysPerWeek: 5,
      equipment: 'minimal',
    });

    let persistedState: string | null = null;
    await waitFor(async () => {
      persistedState = await AsyncStorage.getItem(demoStorageKey);
      expect(persistedState).toContain('conditioning');
    });

    resetStoreMemory();
    await AsyncStorage.setItem(demoStorageKey, persistedState!);
    await useDemoStore.persist.rehydrate();

    expect(useDemoStore.getState().profile?.email).toBe('jordan@example.com');
    expect(useDemoStore.getState().preferences?.daysPerWeek).toBe(5);
    expect(useDemoStore.getState().session?.onboardingComplete).toBe(true);
  });

  it('accepts only the saved local email', () => {
    useDemoStore.getState().registerLocal({ name: 'Jordan Lee', email: 'jordan@example.com' });
    useDemoStore.getState().signOut();

    expect(useDemoStore.getState().signInLocal('unknown@example.com')).toBe(false);
    expect(useDemoStore.getState().session).toBeNull();
    expect(useDemoStore.getState().signInLocal(' JORDAN@EXAMPLE.COM ')).toBe(true);
  });

  it('keeps local data on logout and clears it on reset', () => {
    useDemoStore.getState().signInDemo();
    useDemoStore.getState().setTheme('dark');
    useDemoStore.getState().signOut();

    expect(useDemoStore.getState()).toMatchObject({
      themeMode: 'dark',
      session: null,
    });
    expect(useDemoStore.getState().profile?.name).toBe('Alex Morgan');
    expect(useDemoStore.getState().preferences).not.toBeNull();

    useDemoStore.getState().resetDemoData();

    expect(useDemoStore.getState()).toMatchObject({
      themeMode: 'system',
      profile: null,
      preferences: null,
      session: null,
      activeWorkout: null,
    });
  });

  it('persists start, pause, resume and finish transitions using timestamps', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-09-15T12:00:00.000Z'));

    useDemoStore.getState().signInDemo();
    useDemoStore.getState().startWorkout('upper-strength-a');

    expect(useDemoStore.getState().activeWorkout).toEqual({
      workoutId: 'upper-strength-a',
      status: 'active',
      startedAt: '2026-09-15T12:00:00.000Z',
      pausedAt: null,
      accumulatedPauseMs: 0,
    });

    jest.setSystemTime(new Date('2026-09-15T12:05:00.000Z'));
    useDemoStore.getState().pauseWorkout();
    expect(useDemoStore.getState().activeWorkout?.pausedAt).toBe('2026-09-15T12:05:00.000Z');

    jest.setSystemTime(new Date('2026-09-15T12:07:00.000Z'));
    useDemoStore.getState().resumeWorkout();
    expect(useDemoStore.getState().activeWorkout).toMatchObject({
      status: 'active',
      pausedAt: null,
      accumulatedPauseMs: 120_000,
    });

    await waitFor(async () => {
      const persisted = await AsyncStorage.getItem(demoStorageKey);
      expect(persisted).toContain('upper-strength-a');
      expect(persisted).toContain('accumulatedPauseMs');
    });

    useDemoStore.getState().finishWorkout();
    expect(useDemoStore.getState().activeWorkout).toBeNull();

    await waitFor(async () => {
      const persisted = await AsyncStorage.getItem(demoStorageKey);
      expect(JSON.parse(persisted!).state.activeWorkout).toBeNull();
    });

    jest.useRealTimers();
  });
});
