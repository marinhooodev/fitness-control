import { StyleSheet, View, type ViewProps } from 'react-native';

import { ControlMark } from '@/ui/brand/control-mark';
import { ControlWordmark } from '@/ui/brand/control-wordmark';
import { spacing } from '@/ui/theme/tokens';

export function ControlSplash({ style, ...props }: ViewProps) {
  return (
    <View
      {...props}
      accessibilityLabel="CONTROL"
      accessibilityRole="image"
      style={[styles.root, style]}
    >
      <ControlMark decorative size={72} />
      <ControlWordmark decorative width={168} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x4,
  },
});
