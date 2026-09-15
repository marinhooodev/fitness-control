import { formatWorkoutElapsed, getWorkoutElapsedMs } from '@/features/workout/workout-time';
import type { ActiveWorkoutState } from '@/types/demo';

const activeWorkout: ActiveWorkoutState = {
  workoutId: 'upper-strength-a',
  status: 'active',
  startedAt: '2026-09-15T12:00:00.000Z',
  pausedAt: null,
  accumulatedPauseMs: 120_000,
};

describe('workout time', () => {
  it('derives active elapsed time from timestamps and accumulated pauses', () => {
    const now = Date.parse('2026-09-15T12:07:42.000Z');

    expect(getWorkoutElapsedMs(activeWorkout, now)).toBe(342_000);
    expect(formatWorkoutElapsed(342_000)).toBe('05:42');
  });

  it('freezes elapsed time at pausedAt and formats sessions over one hour', () => {
    const pausedWorkout: ActiveWorkoutState = {
      ...activeWorkout,
      status: 'paused',
      pausedAt: '2026-09-15T13:03:05.000Z',
      accumulatedPauseMs: 0,
    };

    const elapsed = getWorkoutElapsedMs(pausedWorkout, Date.parse('2026-09-15T14:00:00.000Z'));

    expect(elapsed).toBe(3_785_000);
    expect(formatWorkoutElapsed(elapsed)).toBe('01:03:05');
  });
});
