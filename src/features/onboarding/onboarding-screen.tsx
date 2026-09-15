import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthScreen } from '@/features/auth/auth-screen';
import { useDemoStore } from '@/store/demo-store';
import type {
  EquipmentProfile,
  TrainingFrequency,
  TrainingGoal,
  TrainingPreferences,
} from '@/types/demo';
import { Button, Chip, Text } from '@/ui/components';
import { radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

const totalSteps = 3;

const goalOptions: { value: TrainingGoal; label: string }[] = [
  { value: 'strength', label: 'Build strength' },
  { value: 'conditioning', label: 'Improve conditioning' },
  { value: 'balanced', label: 'Balance both' },
];

const frequencyOptions: { value: TrainingFrequency; label: string }[] = [
  { value: 3, label: '3 days' },
  { value: 4, label: '4 days' },
  { value: 5, label: '5 days' },
];

const equipmentOptions: { value: EquipmentProfile; label: string }[] = [
  { value: 'full-gym', label: 'Full gym' },
  { value: 'home', label: 'Home setup' },
  { value: 'minimal', label: 'Minimal equipment' },
];

export function OnboardingScreen() {
  const { theme } = useTheme();
  const completeOnboarding = useDemoStore((state) => state.completeOnboarding);
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<TrainingGoal | null>(null);
  const [daysPerWeek, setDaysPerWeek] = useState<TrainingFrequency | null>(null);
  const [equipment, setEquipment] = useState<EquipmentProfile | null>(null);

  const selectedForStep = step === 1 ? goal : step === 2 ? daysPerWeek : equipment;
  const canContinue = selectedForStep !== null;

  const finish = () => {
    if (!goal || !daysPerWeek || !equipment) {
      return;
    }

    const preferences: TrainingPreferences = { goal, daysPerWeek, equipment };
    completeOnboarding(preferences);
  };

  return (
    <AuthScreen
      description="Three quick choices shape the local demo. You can reset them later."
      eyebrow={`Step ${step} of ${totalSteps}`}
      title={
        step === 1
          ? 'What are you training for?'
          : step === 2
            ? 'How often do you train?'
            : 'What can you train with?'
      }
    >
      <View
        accessible
        accessibilityLabel="Onboarding progress"
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 1,
          max: totalSteps,
          now: step,
          text: `Step ${step} of ${totalSteps}`,
        }}
        style={styles.progress}
      >
        {Array.from({ length: totalSteps }, (_, index) => (
          <View
            aria-hidden
            key={index}
            style={[
              styles.progressSegment,
              {
                backgroundColor: index < step ? theme.colors.brand : theme.colors.surfaceDisabled,
              },
            ]}
          />
        ))}
      </View>

      <View
        accessibilityLabel="Choose one option"
        accessibilityRole="radiogroup"
        style={styles.options}
      >
        {step === 1
          ? goalOptions.map((option) => (
              <Chip
                accessibilityRole="radio"
                key={option.value}
                label={option.label}
                onPress={() => setGoal(option.value)}
                selected={goal === option.value}
              />
            ))
          : null}
        {step === 2
          ? frequencyOptions.map((option) => (
              <Chip
                accessibilityRole="radio"
                key={option.value}
                label={option.label}
                onPress={() => setDaysPerWeek(option.value)}
                selected={daysPerWeek === option.value}
              />
            ))
          : null}
        {step === 3
          ? equipmentOptions.map((option) => (
              <Chip
                accessibilityRole="radio"
                key={option.value}
                label={option.label}
                onPress={() => setEquipment(option.value)}
                selected={equipment === option.value}
              />
            ))
          : null}
      </View>

      <Text tone="secondary" variant="caption">
        {step === 1
          ? 'This sets the emphasis of your demo plan.'
          : step === 2
            ? 'Choose a sustainable weekly rhythm.'
            : 'Equipment only changes local recommendations.'}
      </Text>

      <View style={styles.actions}>
        {step > 1 ? (
          <Button
            fullWidth
            label="Back"
            onPress={() => setStep((current) => current - 1)}
            variant="secondary"
          />
        ) : null}
        <Button
          disabled={!canContinue}
          fullWidth
          label={step === totalSteps ? 'Complete setup' : 'Continue'}
          onPress={step === totalSteps ? finish : () => setStep((current) => current + 1)}
        />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  progress: {
    flexDirection: 'row',
    gap: spacing.x2,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: radii.round,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.x2,
  },
  actions: {
    gap: spacing.x3,
  },
});
