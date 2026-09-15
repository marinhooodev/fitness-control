import type { WorkoutSummary } from '@/types/demo';

export const demoWorkout: WorkoutSummary = {
  id: 'upper-strength-a',
  title: 'Upper Strength',
  focus: 'Strength · Upper body',
  durationMinutes: 42,
  exerciseCount: 3,
  exercises: [
    {
      id: 'bench-press',
      name: 'Bench press',
      prescription: '4 × 6',
      detail: 'Controlled tempo · 2 min rest',
    },
    {
      id: 'chest-supported-row',
      name: 'Chest-supported row',
      prescription: '4 × 8',
      detail: 'Neutral grip · 90 sec rest',
    },
    {
      id: 'half-kneeling-press',
      name: 'Half-kneeling press',
      prescription: '3 × 10',
      detail: 'Each side · 75 sec rest',
    },
  ],
};

export type WeekDayStatus = 'complete' | 'today' | 'upcoming' | 'recovery';

export interface DemoWeekDay {
  day: string;
  date: string;
  session: string;
  status: WeekDayStatus;
}

export const demoWeek: DemoWeekDay[] = [
  { day: 'MON', date: '14', session: 'Lower strength', status: 'complete' },
  { day: 'TUE', date: '15', session: 'Upper strength', status: 'today' },
  { day: 'WED', date: '16', session: 'Recovery', status: 'recovery' },
  { day: 'THU', date: '17', session: 'Conditioning', status: 'upcoming' },
  { day: 'FRI', date: '18', session: 'Full body', status: 'upcoming' },
];

export const demoProgressMetrics = [
  { label: 'Sessions', value: '12', detail: 'last 4 weeks' },
  { label: 'Consistency', value: '86%', detail: 'planned sessions' },
  { label: 'Streak', value: '4', detail: 'active weeks' },
] as const;
