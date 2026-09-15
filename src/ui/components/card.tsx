import type { ReactNode } from 'react';
import { Pressable, type PressableProps, StyleSheet, View, type ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { triggerHaptic } from '@/ui/motion/haptics';
import { usePressScale } from '@/ui/motion/use-press-scale';
import { borders, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export type CardVariant = 'default' | 'elevated' | 'interactive';

interface CardProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
  variant?: CardVariant;
  onPress?: PressableProps['onPress'];
  accessibilityLabel?: string;
}

export function Card({
  children,
  variant = 'default',
  onPress,
  accessibilityLabel,
  style,
  ...props
}: CardProps) {
  const { theme } = useTheme();
  const { animatedStyle, pressIn, pressOut } = usePressScale();
  const sharedStyle = [
    styles.base,
    {
      backgroundColor: variant === 'elevated' ? theme.colors.surfaceElevated : theme.colors.surface,
      borderColor: theme.colors.border,
    },
    variant === 'elevated' && theme.elevation.card,
    style,
  ];

  if (variant === 'interactive' && onPress) {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
          onPress={(event) => {
            triggerHaptic('light');
            onPress(event);
          }}
          onPressIn={pressIn}
          onPressOut={pressOut}
          style={({ pressed }) => [sharedStyle, pressed && { borderColor: theme.colors.brand }]}
        >
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View {...props} style={sharedStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: borders.hairline,
    borderRadius: radii.card,
    padding: spacing.x5,
    gap: spacing.x3,
  },
});
