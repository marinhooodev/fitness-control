export type TrainingGoal = 'strength' | 'conditioning' | 'balanced';
export type EquipmentProfile = 'full-gym' | 'home' | 'minimal';
export type TrainingFrequency = 3 | 4 | 5;

export interface DemoProfile {
  id: string;
  name: string;
  email: string;
  avatarSeed: string;
}

export interface TrainingPreferences {
  goal: TrainingGoal;
  daysPerWeek: TrainingFrequency;
  equipment: EquipmentProfile;
}

export interface DemoSession {
  profileId: string;
  signedInAt: string;
  onboardingComplete: boolean;
}
