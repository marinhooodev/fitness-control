import type { ReactNode } from 'react';
import { Pressable, type PressableProps, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { triggerHaptic } from '@/ui/motion/haptics';
import { usePressScale } from '@/ui/motion/use-press-scale';
import { borders, layout, radii } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  accessibilityLabel: string;
  children: ReactNode;
  variant?: 'ghost' | 'secondary' | 'primary';
  size?: 'medium' | 'large';
}

export function IconButton({
  accessibilityLabel,
  children,
  variant = 'ghost',
  size = 'medium',
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  hitSlop = 4,
  ...props
}: IconButtonProps) {
  const { theme } = useTheme();
  const { animatedStyle, pressIn, pressOut } = usePressScale(0.94);

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        {...props}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ ...props.accessibilityState, disabled: Boolean(disabled) }}
        disabled={disabled}
        hitSlop={hitSlop}
        onPress={(event) => {
          triggerHaptic('light');
          onPress?.(event);
        }}
        onPressIn={(event) => {
          pressIn();
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          pressOut();
          onPressOut?.(event);
        }}
        style={({ pressed }) => [
          styles.base,
          size === 'large' && styles.large,
          {
            backgroundColor: disabled
              ? theme.colors.surfaceDisabled
              : variant === 'primary'
                ? theme.colors.brand
                : pressed
                  ? theme.colors.surfacePressed
                  : variant === 'secondary'
                    ? theme.colors.surface
                    : 'transparent',
            borderColor:
              variant === 'secondary'
                ? theme.colors.border
                : variant === 'primary'
                  ? theme.colors.brand
                  : 'transparent',
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: radii.round,
    borderWidth: borders.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: 52,
    height: 52,
  },
});
