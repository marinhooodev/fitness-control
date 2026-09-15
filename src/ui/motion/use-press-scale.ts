import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { motion } from '@/ui/theme/tokens';

export function usePressScale(pressedScale = 0.98) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const pressIn = useCallback(() => {
    scale.set(reduceMotion ? 1 : withTiming(pressedScale, { duration: motion.duration.feedback }));
  }, [pressedScale, reduceMotion, scale]);

  const pressOut = useCallback(() => {
    scale.set(reduceMotion ? 1 : withTiming(1, { duration: motion.duration.feedback }));
  }, [reduceMotion, scale]);

  return { animatedStyle, pressIn, pressOut };
}
