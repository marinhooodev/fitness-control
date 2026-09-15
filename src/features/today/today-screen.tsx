import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { demoWorkout } from '@/data/fixtures/demo-workout';
import { AppHeader } from '@/features/shell/app-header';
import { useDemoStore } from '@/store/demo-store';
import { Button, Card, Chip, Screen, Text } from '@/ui/components';
import { ControlIcon } from '@/ui/icons/control-icon';
import { borders, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

function formatToday() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());
}

export function TodayScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const firstName = useDemoStore((state) => state.profile?.name.split(/\s+/)[0] ?? 'Athlete');
  const activeWorkout = useDemoStore((state) => state.activeWorkout);

  return (
    <Screen contentContainerStyle={styles.content} safeAreaEdges={['top', 'left', 'right']} scroll>
      <AppHeader wordmark />

      <View style={styles.intro}>
        <Text tone="secondary" variant="caption">
          {formatToday().toUpperCase()}
        </Text>
        <Text accessibilityRole="header" variant="title">
          Ready, {firstName}?
        </Text>
        <Text tone="secondary">Your next session is set. Keep the goal, own the pace.</Text>
      </View>

      <View
        style={[
          styles.hero,
          {
            backgroundColor: theme.colors.surfaceElevated,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View
          aria-hidden
          style={[styles.heroPulse, { borderColor: theme.colors.brand, opacity: 0.16 }]}
        />
        <View style={styles.heroTop}>
          <View style={styles.heroLabel}>
            <ControlIcon color={theme.colors.brand} name="activity" size={18} />
            <Text tone="brand" variant="caption">
              TODAY · RECOMMENDED
            </Text>
          </View>
          <Chip label="42 MIN" selected />
        </View>
        <View style={styles.heroCopy}>
          <Text style={styles.heroTitle} variant="display">
            UPPER{`\n`}STRENGTH
          </Text>
          <Text tone="secondary">Push, pull and brace with a controlled strength focus.</Text>
        </View>
      </View>

      <Card>
        <View style={styles.sectionHeading}>
          <View style={styles.sectionTitle}>
            <ControlIcon color={theme.colors.textSecondary} name="target" size={20} />
            <Text variant="heading">Session brief</Text>
          </View>
          <Text tone="secondary" variant="caption">
            DEMO DATA
          </Text>
        </View>
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text variant="metric">{demoWorkout.exerciseCount}</Text>
            <Text tone="secondary" variant="caption">
              EXERCISES
            </Text>
          </View>
          <View style={[styles.metricDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.metric}>
            <Text variant="metric">{demoWorkout.durationMinutes}</Text>
            <Text tone="secondary" variant="caption">
              MINUTES
            </Text>
          </View>
        </View>
        <Button
          fullWidth
          label={activeWorkout ? 'Return to active workout' : 'View workout'}
          onPress={() =>
            router.push(activeWorkout ? '/(app)/workout/active' : '/(app)/workout/preview')
          }
          size="large"
        />
      </Card>
    </Screen>
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
  hero: {
    minHeight: 300,
    borderRadius: radii.hero,
    borderWidth: borders.hairline,
    padding: spacing.x6,
    justifyContent: 'space-between',
    gap: spacing.x8,
    overflow: 'hidden',
  },
  heroPulse: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: radii.round,
    borderWidth: 44,
    right: -70,
    bottom: -90,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x3,
  },
  heroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
    flexShrink: 1,
  },
  heroCopy: {
    maxWidth: 360,
    gap: spacing.x3,
  },
  heroTitle: {
    fontSize: 58,
    lineHeight: 54,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x3,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.x5,
    paddingVertical: spacing.x2,
  },
  metric: {
    flex: 1,
    gap: spacing.x1,
  },
  metricDivider: {
    width: 1,
  },
});
