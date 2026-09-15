import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { demoWorkout } from '@/data/fixtures/demo-workout';
import { StackHeader } from '@/features/shell/stack-header';
import { useDemoStore } from '@/store/demo-store';
import { Button, Card, Chip, FormMessage, Screen, Text } from '@/ui/components';
import { ControlIcon } from '@/ui/icons/control-icon';
import { borders, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export function WorkoutPreviewScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const activeWorkout = useDemoStore((state) => state.activeWorkout);
  const startWorkout = useDemoStore((state) => state.startWorkout);

  const start = () => {
    if (!activeWorkout) {
      startWorkout(demoWorkout.id);
    }

    router.replace('/(app)/workout/active');
  };

  return (
    <Screen contentContainerStyle={styles.content} scroll>
      <StackHeader title="Workout preview" />

      <View
        style={[
          styles.hero,
          {
            backgroundColor: theme.colors.surfaceElevated,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.heroLabel}>
          <ControlIcon color={theme.colors.brand} name="target" />
          <Text tone="brand" variant="caption">
            READY WHEN YOU ARE
          </Text>
        </View>
        <Text style={styles.heroTitle} variant="display">
          UPPER{`\n`}STRENGTH
        </Text>
        <Text tone="secondary">{demoWorkout.focus}</Text>
        <View style={styles.chips}>
          <Chip label={`${demoWorkout.durationMinutes} min`} selected />
          <Chip label={`${demoWorkout.exerciseCount} exercises`} />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Text variant="heading">Today’s work</Text>
          <Text tone="secondary" variant="caption">
            DEMO SESSION
          </Text>
        </View>
        {demoWorkout.exercises.map((exercise, index) => (
          <Card key={exercise.id}>
            <View style={styles.exerciseRow}>
              <View style={[styles.exerciseIndex, { backgroundColor: theme.colors.infoSurface }]}>
                <Text style={{ color: theme.colors.info }} variant="label">
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>
              <View style={styles.exerciseCopy}>
                <Text variant="label">{exercise.name}</Text>
                <Text tone="secondary" variant="caption">
                  {exercise.detail}
                </Text>
              </View>
              <Text variant="heading">{exercise.prescription}</Text>
            </View>
          </Card>
        ))}
      </View>

      <FormMessage
        message="This v0.1 workout tracks session time and pause state only. Set logging arrives in v0.3."
        tone="info"
      />

      <Button
        fullWidth
        label={activeWorkout ? 'Return to active workout' : 'Start workout'}
        onPress={start}
        size="large"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.x6,
  },
  hero: {
    borderRadius: radii.hero,
    borderWidth: borders.hairline,
    padding: spacing.x6,
    gap: spacing.x3,
    overflow: 'hidden',
  },
  heroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
  heroTitle: {
    fontSize: 58,
    lineHeight: 54,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.x2,
    marginTop: spacing.x2,
  },
  section: {
    gap: spacing.x3,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x3,
  },
  exerciseRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  exerciseIndex: {
    width: 40,
    height: 40,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseCopy: {
    flex: 1,
    gap: spacing.x1,
  },
});
