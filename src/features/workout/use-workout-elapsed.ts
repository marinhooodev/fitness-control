import { useEffect, useState } from 'react';

import type { ActiveWorkoutState } from '@/types/demo';
import { getWorkoutElapsedMs } from '@/features/workout/workout-time';

export function useWorkoutElapsed(activeWorkout: ActiveWorkoutState | null) {
  const [nowMs, setNowMs] = useState(Date.now);

  useEffect(() => {
    if (!activeWorkout || activeWorkout.status !== 'active') {
      return;
    }

    const interval = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [activeWorkout]);

  return activeWorkout ? getWorkoutElapsedMs(activeWorkout, nowMs) : 0;
}
