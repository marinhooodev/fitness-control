import { Pressable, type PressableProps, StyleSheet, View } from 'react-native';

import { Text } from '@/ui/components/text';
import { ControlIcon } from '@/ui/icons/control-icon';
import { triggerHaptic } from '@/ui/motion/haptics';
import { borders, layout, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export type ChipVariant = 'neutral' | 'info' | 'warning';

interface ChipProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  selected?: boolean;
  variant?: ChipVariant;
}

export function Chip({
  label,
  selected = false,
  variant = 'neutral',
  accessibilityRole = 'button',
  onPress,
  disabled,
  ...props
}: ChipProps) {
  const { theme } = useTheme();
  const background = selected
    ? theme.colors.brand
    : variant === 'info'
      ? theme.colors.infoSurface
      : variant === 'warning'
        ? theme.colors.warningSurface
        : theme.colors.surface;
  const foreground = selected
    ? theme.colors.brandInk
    : variant === 'info'
      ? theme.colors.info
      : variant === 'warning'
        ? theme.colors.warning
        : theme.colors.textPrimary;

  const content = (
    <>
      {selected ? (
        <ControlIcon color={foreground} name="check" size={16} strokeWidth={2.5} />
      ) : null}
      <View style={styles.labelWrap}>
        <Text style={{ color: foreground }} variant="label">
          {label}
        </Text>
      </View>
    </>
  );

  if (!onPress) {
    return (
      <View
        {...props}
        accessibilityState={{ ...props.accessibilityState, selected, disabled: Boolean(disabled) }}
        style={[
          styles.base,
          {
            backgroundColor: background,
            borderColor: selected ? theme.colors.brand : theme.colors.border,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      {...props}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ ...props.accessibilityState, selected, disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={(event) => {
        triggerHaptic('selection');
        onPress?.(event);
      }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed && !selected ? theme.colors.surfacePressed : background,
          borderColor: selected ? theme.colors.brand : theme.colors.border,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.minTouchTarget,
    alignSelf: 'flex-start',
    borderRadius: radii.round,
    borderWidth: borders.hairline,
    paddingHorizontal: spacing.x3,
    paddingVertical: spacing.x2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x2,
  },
  labelWrap: {
    flexShrink: 1,
  },
});
