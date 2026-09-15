import type { ActiveWorkoutState } from '@/types/demo';

export function getWorkoutElapsedMs(activeWorkout: ActiveWorkoutState, nowMs = Date.now()) {
  const startedAt = Date.parse(activeWorkout.startedAt);

  if (!Number.isFinite(startedAt)) {
    return 0;
  }

  const pausedAt = activeWorkout.pausedAt ? Date.parse(activeWorkout.pausedAt) : nowMs;
  const effectiveNow = Number.isFinite(pausedAt) ? pausedAt : nowMs;

  return Math.max(0, effectiveNow - startedAt - activeWorkout.accumulatedPauseMs);
}

export function formatWorkoutElapsed(elapsedMs: number) {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pair = (value: number) => value.toString().padStart(2, '0');

  return hours > 0
    ? `${pair(hours)}:${pair(minutes)}:${pair(seconds)}`
    : `${pair(minutes)}:${pair(seconds)}`;
}
