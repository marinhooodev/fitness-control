import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '@/ui/components/text';
import { triggerHaptic, type HapticIntent } from '@/ui/motion/haptics';
import { usePressScale } from '@/ui/motion/use-press-scale';
import { borders, layout, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'medium' | 'large';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leading?: ReactNode;
  hapticIntent?: HapticIntent | false;
}

export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  leading,
  hapticIntent,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const { animatedStyle, pressIn, pressOut } = usePressScale();
  const isDisabled = disabled || loading;

  const foreground = isDisabled
    ? theme.colors.textDisabled
    : variant === 'primary'
      ? theme.colors.brandInk
      : variant === 'danger'
        ? theme.colors.dangerInk
        : theme.colors.textPrimary;

  const handlePress: PressableProps['onPress'] = (event) => {
    const resolvedHaptic =
      hapticIntent === undefined
        ? variant === 'danger'
          ? 'warning'
          : variant === 'primary'
            ? 'medium'
            : variant === 'ghost'
              ? 'selection'
              : 'light'
        : hapticIntent;

    if (resolvedHaptic) {
      triggerHaptic(resolvedHaptic);
    }
    onPress?.(event);
  };

  return (
    <Animated.View style={[fullWidth && styles.fullWidth, animatedStyle]}>
      <Pressable
        {...props}
        accessibilityRole="button"
        accessibilityState={{ ...props.accessibilityState, busy: loading, disabled: isDisabled }}
        disabled={isDisabled}
        onPress={handlePress}
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
          size === 'large' ? styles.large : styles.medium,
          fullWidth && styles.fullWidth,
          {
            backgroundColor: isDisabled
              ? theme.colors.surfaceDisabled
              : variant === 'primary'
                ? pressed
                  ? theme.colors.brandPressed
                  : theme.colors.brand
                : variant === 'danger'
                  ? pressed
                    ? theme.colors.dangerPressed
                    : theme.colors.danger
                  : pressed
                    ? theme.colors.surfacePressed
                    : variant === 'secondary'
                      ? theme.colors.surface
                      : 'transparent',
            borderColor:
              variant === 'secondary' || variant === 'ghost'
                ? pressed
                  ? theme.colors.borderStrong
                  : theme.colors.border
                : 'transparent',
          },
        ]}
      >
        {loading ? <ActivityIndicator color={foreground} size="small" /> : leading}
        <View style={styles.labelWrap}>
          <Text align="center" style={{ color: foreground }} variant="label">
            {label}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.minTouchTarget,
    borderRadius: radii.control,
    borderWidth: borders.hairline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x2,
  },
  medium: {
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3,
  },
  large: {
    minHeight: 56,
    paddingHorizontal: spacing.x5,
    paddingVertical: spacing.x4,
  },
  fullWidth: {
    width: '100%',
  },
  labelWrap: {
    flexShrink: 1,
  },
});
