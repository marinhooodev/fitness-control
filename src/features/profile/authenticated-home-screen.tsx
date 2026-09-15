import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useDemoStore, type ThemeMode } from '@/store/demo-store';
import { ControlWordmark } from '@/ui/brand/control-wordmark';
import { Avatar, Button, Card, Chip, FormMessage, Screen, Sheet, Text } from '@/ui/components';
import { spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

const themeModes: ThemeMode[] = ['system', 'light', 'dark'];

const goalLabels = {
  strength: 'Strength',
  conditioning: 'Conditioning',
  balanced: 'Balanced',
} as const;

const equipmentLabels = {
  'full-gym': 'Full gym',
  home: 'Home setup',
  minimal: 'Minimal equipment',
} as const;

export function AuthenticatedHomeScreen() {
  const profile = useDemoStore((state) => state.profile);
  const preferences = useDemoStore((state) => state.preferences);
  const signOut = useDemoStore((state) => state.signOut);
  const resetDemoData = useDemoStore((state) => state.resetDemoData);
  const [isResetVisible, setResetVisible] = useState(false);
  const { mode, resolvedMode, setMode } = useTheme();

  if (!profile || !preferences) {
    return null;
  }

  return (
    <>
      <Screen contentContainerStyle={styles.content} scroll>
        <View style={styles.header}>
          <ControlWordmark width={142} />
          <Chip label="SESSION 3" selected />
        </View>

        <View style={styles.hero}>
          <Text tone="brand" variant="caption">
            LOCAL PROFILE READY
          </Text>
          <Text accessibilityRole="header" variant="display">
            READY WHEN YOU ARE.
          </Text>
          <Text tone="secondary">
            Auth and onboarding are complete. The CONTROL Dock arrives in Session 4.
          </Text>
        </View>

        <Card variant="elevated">
          <View style={styles.profileRow}>
            <Avatar name={profile.name} size="large" />
            <View style={styles.profileCopy}>
              <Text variant="heading">{profile.name}</Text>
              <Text tone="secondary">{profile.email}</Text>
            </View>
          </View>
          <View style={styles.preferenceRow}>
            <Chip label={goalLabels[preferences.goal]} />
            <Chip label={`${preferences.daysPerWeek} days / week`} />
            <Chip label={equipmentLabels[preferences.equipment]} />
          </View>
        </Card>

        <Card>
          <Text variant="heading">Appearance</Text>
          <Text tone="secondary">
            Theme preference persists locally. Current appearance: {resolvedMode}.
          </Text>
          <View
            accessibilityLabel="Theme mode"
            accessibilityRole="radiogroup"
            style={styles.preferenceRow}
          >
            {themeModes.map((themeMode) => (
              <Chip
                accessibilityRole="radio"
                key={themeMode}
                label={themeMode[0].toUpperCase() + themeMode.slice(1)}
                onPress={() => setMode(themeMode)}
                selected={mode === themeMode}
              />
            ))}
          </View>
        </Card>

        <FormMessage
          message="Everything on this screen is mock data stored only on this device."
          tone="info"
        />

        <View style={styles.actions}>
          <Button fullWidth label="Log out" onPress={signOut} variant="secondary" />
          <Button
            fullWidth
            label="Reset demo data"
            onPress={() => setResetVisible(true)}
            variant="danger"
          />
        </View>
      </Screen>

      <Sheet
        closeOnBackdropPress={false}
        onClose={() => setResetVisible(false)}
        title="Reset demo data?"
        visible={isResetVisible}
      >
        <FormMessage
          message="This removes the local profile, session, onboarding choices and theme preference."
          tone="warning"
        />
        <Button
          fullWidth
          label="Keep my data"
          onPress={() => setResetVisible(false)}
          variant="secondary"
        />
        <Button fullWidth label="Reset everything" onPress={resetDemoData} variant="danger" />
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.x6,
  },
  header: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x4,
  },
  hero: {
    gap: spacing.x3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x4,
  },
  profileCopy: {
    flex: 1,
    gap: spacing.x1,
  },
  preferenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.x2,
  },
  actions: {
    gap: spacing.x3,
  },
});
