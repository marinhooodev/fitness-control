import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'system' | 'light' | 'dark';

interface DemoStore {
  themeMode: ThemeMode;
  isHydrated: boolean;
  setTheme: (themeMode: ThemeMode) => void;
  setHydrated: (isHydrated: boolean) => void;
}

export const demoStorageKey = 'control-demo-v1';

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      themeMode: 'system',
      isHydrated: false,
      setTheme: (themeMode) => set({ themeMode }),
      setHydrated: (isHydrated) => set({ isHydrated }),
    }),
    {
      name: demoStorageKey,
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ themeMode }) => ({ themeMode }),
      onRehydrateStorage:
        ({ setHydrated }) =>
        () =>
          setHydrated(true),
      skipHydration: Platform.OS === 'web',
    },
  ),
);
