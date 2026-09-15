import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/features/shell/app-header';
import { useDemoStore, type ThemeMode } from '@/store/demo-store';
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

export function YouScreen() {
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
      <Screen
        contentContainerStyle={styles.content}
        safeAreaEdges={['top', 'left', 'right']}
        scroll
      >
        <AppHeader title="You" />

        <View style={styles.intro}>
          <Text tone="brand" variant="caption">
            LOCAL PROFILE
          </Text>
          <Text accessibilityRole="header" variant="title">
            Your setup, your control.
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
          <View style={styles.cardHeading}>
            <Text variant="heading">Appearance</Text>
            <Text tone="secondary" variant="caption">
              {resolvedMode.toUpperCase()} NOW
            </Text>
          </View>
          <Text tone="secondary">Theme choice is stored only on this device.</Text>
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
          message="Everything in CONTROL is mock data stored locally. No real account is created."
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
          message="This removes the local profile, session, onboarding choices, active workout and theme preference."
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
    paddingBottom: spacing.x8,
  },
  intro: {
    gap: spacing.x2,
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
  cardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x3,
  },
  actions: {
    gap: spacing.x3,
  },
});
