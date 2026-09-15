import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { IconButton, Text } from '@/ui/components';
import { ControlIcon } from '@/ui/icons/control-icon';
import { spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

interface StackHeaderProps {
  title: string;
}

export function StackHeader({ title }: StackHeaderProps) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <IconButton
        accessibilityHint="Returns to Today while preserving an active workout"
        accessibilityLabel="Back to Today"
        onPress={() => router.replace('/(app)/(tabs)/today')}
        variant="secondary"
      >
        <ControlIcon color={theme.colors.textPrimary} name="arrow-left" />
      </IconButton>
      <Text accessibilityRole="header" style={styles.title} variant="heading">
        {title}
      </Text>
      <View aria-hidden style={styles.balance} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  balance: {
    width: 44,
    height: 44,
  },
});
