import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useDemoStore } from '@/store/demo-store';
import { ControlWordmark } from '@/ui/brand/control-wordmark';
import { Avatar, IconButton, Text } from '@/ui/components';
import { spacing } from '@/ui/theme/tokens';

interface AppHeaderProps {
  title?: string;
  wordmark?: boolean;
}

export function AppHeader({ title, wordmark = false }: AppHeaderProps) {
  const router = useRouter();
  const profileName = useDemoStore((state) => state.profile?.name ?? 'CONTROL athlete');

  return (
    <View style={styles.header}>
      <View style={styles.titleWrap}>
        {wordmark ? <ControlWordmark width={132} /> : null}
        {!wordmark && title ? (
          <Text accessibilityRole="header" variant="title">
            {title}
          </Text>
        ) : null}
      </View>
      <IconButton
        accessibilityHint="Opens the You tab"
        accessibilityLabel="Open profile"
        onPress={() => router.push('/(app)/(tabs)/you')}
      >
        <Avatar accessible={false} name={profileName} size="small" />
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x4,
  },
  titleWrap: {
    flex: 1,
  },
});
