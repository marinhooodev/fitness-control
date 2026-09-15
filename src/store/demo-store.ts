import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { demoPreferences, demoProfile } from '@/data/fixtures/demo-user';
import { normalizeEmail } from '@/shared/utils/email';
import type {
  ActiveWorkoutState,
  DemoProfile,
  DemoSession,
  TrainingPreferences,
} from '@/types/demo';

export type ThemeMode = 'system' | 'light' | 'dark';

interface RegisterLocalInput {
  name: string;
  email: string;
}

export interface DemoStore {
  themeMode: ThemeMode;
  isHydrated: boolean;
  profile: DemoProfile | null;
  preferences: TrainingPreferences | null;
  session: DemoSession | null;
  activeWorkout: ActiveWorkoutState | null;
  setTheme: (themeMode: ThemeMode) => void;
  setHydrated: (isHydrated: boolean) => void;
  signInDemo: () => void;
  signInLocal: (email: string) => boolean;
  registerLocal: (input: RegisterLocalInput) => void;
  completeOnboarding: (preferences: TrainingPreferences) => void;
  startWorkout: (workoutId: string) => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  finishWorkout: () => void;
  signOut: () => void;
  resetDemoData: () => void;
}

export const demoStorageKey = 'control-demo-v1';

const createSession = (profileId: string, onboardingComplete: boolean): DemoSession => ({
  profileId,
  signedInAt: new Date().toISOString(),
  onboardingComplete,
});

const createLocalProfile = ({ name, email }: RegisterLocalInput): DemoProfile => {
  const normalizedEmail = normalizeEmail(email);

  return {
    id: 'profile-local',
    name: name.trim(),
    email: normalizedEmail,
    avatarSeed: normalizedEmail,
  };
};

export const useDemoStore = create<DemoStore>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      isHydrated: false,
      profile: null,
      preferences: null,
      session: null,
      activeWorkout: null,
      setTheme: (themeMode) => set({ themeMode }),
      setHydrated: (isHydrated) => set({ isHydrated }),
      signInDemo: () =>
        set({
          profile: demoProfile,
          preferences: demoPreferences,
          session: createSession(demoProfile.id, true),
        }),
      signInLocal: (email) => {
        const { profile, preferences } = get();

        if (!profile || profile.email !== normalizeEmail(email)) {
          return false;
        }

        set({ session: createSession(profile.id, preferences !== null) });
        return true;
      },
      registerLocal: (input) => {
        const profile = createLocalProfile(input);

        set({
          profile,
          preferences: null,
          session: createSession(profile.id, false),
        });
      },
      completeOnboarding: (preferences) => {
        const { session } = get();

        if (!session) {
          return;
        }

        set({
          preferences,
          session: { ...session, onboardingComplete: true },
        });
      },
      startWorkout: (workoutId) => {
        if (get().activeWorkout) {
          return;
        }

        set({
          activeWorkout: {
            workoutId,
            status: 'active',
            startedAt: new Date().toISOString(),
            pausedAt: null,
            accumulatedPauseMs: 0,
          },
        });
      },
      pauseWorkout: () => {
        const { activeWorkout } = get();

        if (!activeWorkout || activeWorkout.status !== 'active') {
          return;
        }

        set({
          activeWorkout: {
            ...activeWorkout,
            status: 'paused',
            pausedAt: new Date().toISOString(),
          },
        });
      },
      resumeWorkout: () => {
        const { activeWorkout } = get();

        if (!activeWorkout || activeWorkout.status !== 'paused' || !activeWorkout.pausedAt) {
          return;
        }

        const pauseStartedAt = Date.parse(activeWorkout.pausedAt);
        const pauseDuration = Number.isFinite(pauseStartedAt)
          ? Math.max(0, Date.now() - pauseStartedAt)
          : 0;

        set({
          activeWorkout: {
            ...activeWorkout,
            status: 'active',
            pausedAt: null,
            accumulatedPauseMs: activeWorkout.accumulatedPauseMs + pauseDuration,
          },
        });
      },
      finishWorkout: () => set({ activeWorkout: null }),
      signOut: () => set({ session: null }),
      resetDemoData: () =>
        set({
          themeMode: 'system',
          profile: null,
          preferences: null,
          session: null,
          activeWorkout: null,
        }),
    }),
    {
      name: demoStorageKey,
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ activeWorkout, preferences, profile, session, themeMode }) => ({
        activeWorkout,
        preferences,
        profile,
        session,
        themeMode,
      }),
      onRehydrateStorage:
        ({ setHydrated }) =>
        () =>
          setHydrated(true),
      skipHydration: true,
    },
  ),
);
