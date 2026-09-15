import { Redirect, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { demoWorkout } from '@/data/fixtures/demo-workout';
import { StackHeader } from '@/features/shell/stack-header';
import { formatWorkoutElapsed } from '@/features/workout/workout-time';
import { useWorkoutElapsed } from '@/features/workout/use-workout-elapsed';
import { useDemoStore } from '@/store/demo-store';
import { Button, Card, FormMessage, Screen, Text } from '@/ui/components';
import { ControlIcon } from '@/ui/icons/control-icon';
import { borders, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export function ActiveWorkoutScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const activeWorkout = useDemoStore((state) => state.activeWorkout);
  const pauseWorkout = useDemoStore((state) => state.pauseWorkout);
  const resumeWorkout = useDemoStore((state) => state.resumeWorkout);
  const finishWorkout = useDemoStore((state) => state.finishWorkout);
  const elapsedMs = useWorkoutElapsed(activeWorkout);

  if (!activeWorkout) {
    return <Redirect href="/(app)/workout/preview" />;
  }

  const isPaused = activeWorkout.status === 'paused';
  const elapsed = formatWorkoutElapsed(elapsedMs);

  const finish = () => {
    finishWorkout();
    router.replace('/(app)/(tabs)/today');
  };

  return (
    <Screen contentContainerStyle={styles.content} scroll>
      <StackHeader title="Live workout" />

      <View
        style={[
          styles.timerCard,
          {
            backgroundColor: isPaused ? theme.colors.warningSurface : theme.colors.surfaceElevated,
            borderColor: isPaused ? theme.colors.warning : theme.colors.border,
          },
        ]}
      >
        <View style={styles.statusRow}>
          <View style={styles.statusLabel}>
            <View
              aria-hidden
              style={[
                styles.statusDot,
                { backgroundColor: isPaused ? theme.colors.warning : theme.colors.brand },
              ]}
            />
            <Text tone={isPaused ? 'warning' : 'brand'} variant="caption">
              {isPaused ? 'SESSION PAUSED' : 'SESSION ACTIVE'}
            </Text>
          </View>
          <Text tone="secondary" variant="caption">
            {demoWorkout.durationMinutes} MIN PLAN
          </Text>
        </View>

        <View accessibilityLabel={`Elapsed time ${elapsed}`} style={styles.timer}>
          <Text style={styles.timerText} variant="display">
            {elapsed}
          </Text>
          <Text tone="secondary" variant="caption">
            ELAPSED TIME
          </Text>
        </View>

        <View style={styles.sessionName}>
          <ControlIcon
            color={isPaused ? theme.colors.warning : theme.colors.brand}
            name={isPaused ? 'pause' : 'activity'}
            size={20}
          />
          <Text variant="heading">{demoWorkout.title}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Text variant="heading">Session outline</Text>
          <Text tone="secondary" variant="caption">
            {demoWorkout.exerciseCount} MOVES
          </Text>
        </View>
        {demoWorkout.exercises.map((exercise, index) => (
          <Card key={exercise.id} variant={index === 0 ? 'elevated' : 'default'}>
            <View style={styles.exerciseRow}>
              <View style={styles.exerciseCopy}>
                <Text tone={index === 0 ? 'brand' : 'secondary'} variant="caption">
                  {index === 0 ? 'CURRENT BLOCK' : `BLOCK ${index + 1}`}
                </Text>
                <Text variant="label">{exercise.name}</Text>
              </View>
              <Text variant="heading">{exercise.prescription}</Text>
            </View>
          </Card>
        ))}
      </View>

      <FormMessage
        message={
          isPaused
            ? 'The timer is stopped. Resume when you are ready.'
            : 'You can leave this screen. The local timer stays coherent from its timestamps.'
        }
        tone={isPaused ? 'warning' : 'info'}
      />

      <View style={styles.actions}>
        <Button
          fullWidth
          label={isPaused ? 'Resume workout' : 'Pause workout'}
          leading={
            <ControlIcon
              color={theme.colors.brandInk}
              name={isPaused ? 'play' : 'pause'}
              size={18}
            />
          }
          onPress={isPaused ? resumeWorkout : pauseWorkout}
          size="large"
        />
        <Button
          fullWidth
          hapticIntent="success"
          label="Finish workout"
          onPress={finish}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.x6,
  },
  timerCard: {
    minHeight: 310,
    borderRadius: radii.hero,
    borderWidth: borders.hairline,
    padding: spacing.x6,
    justifyContent: 'space-between',
    gap: spacing.x6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x3,
  },
  statusLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: radii.round,
  },
  timer: {
    alignItems: 'center',
    gap: spacing.x2,
  },
  timerText: {
    fontSize: 88,
    lineHeight: 90,
    fontVariant: ['tabular-nums'],
  },
  sessionName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
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
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  exerciseCopy: {
    flex: 1,
    gap: spacing.x1,
  },
  actions: {
    gap: spacing.x3,
  },
});
