import type { DemoProfile, TrainingPreferences } from '@/types/demo';

export const demoProfile: DemoProfile = {
  id: 'profile-alex-morgan',
  name: 'Alex Morgan',
  email: 'alex@control.demo',
  avatarSeed: 'alex-morgan',
};

export const demoPreferences: TrainingPreferences = {
  goal: 'balanced',
  daysPerWeek: 4,
  equipment: 'full-gym',
};
