import { StyleSheet, View, type ViewProps } from 'react-native';

import { borders } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export function Divider({ style, ...props }: ViewProps) {
  const { theme } = useTheme();

  return (
    <View
      {...props}
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[styles.divider, { backgroundColor: theme.colors.border }, style]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: borders.hairline,
  },
});
