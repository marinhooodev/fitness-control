import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { demoPreferences, demoProfile } from '@/data/fixtures/demo-user';
import { normalizeEmail } from '@/shared/utils/email';
import type { DemoProfile, DemoSession, TrainingPreferences } from '@/types/demo';

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
  setTheme: (themeMode: ThemeMode) => void;
  setHydrated: (isHydrated: boolean) => void;
  signInDemo: () => void;
  signInLocal: (email: string) => boolean;
  registerLocal: (input: RegisterLocalInput) => void;
  completeOnboarding: (preferences: TrainingPreferences) => void;
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
      signOut: () => set({ session: null }),
      resetDemoData: () =>
        set({
          themeMode: 'system',
          profile: null,
          preferences: null,
          session: null,
        }),
    }),
    {
      name: demoStorageKey,
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ preferences, profile, session, themeMode }) => ({
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
