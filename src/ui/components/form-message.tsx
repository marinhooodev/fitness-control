import { StyleSheet, View, type ViewProps } from 'react-native';

import { ControlIcon } from '@/ui/icons/control-icon';
import { Text } from '@/ui/components/text';
import { spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export type FormMessageTone = 'error' | 'info' | 'warning' | 'success';

interface FormMessageProps extends ViewProps {
  message: string;
  tone?: FormMessageTone;
}

export function FormMessage({ message, tone = 'error', style, ...props }: FormMessageProps) {
  const { theme } = useTheme();
  const color = {
    error: theme.colors.danger,
    info: theme.colors.info,
    warning: theme.colors.warning,
    success: theme.colors.success,
  }[tone];

  return (
    <View {...props} accessibilityLiveRegion="polite" style={[styles.row, style]}>
      <ControlIcon
        color={color}
        name={tone === 'error' || tone === 'warning' ? 'alert' : 'info'}
        size={16}
      />
      <Text style={[styles.message, { color }]} variant="caption">
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.x2,
  },
  message: {
    flex: 1,
  },
});
