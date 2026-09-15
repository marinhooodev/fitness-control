import { StyleSheet, View } from 'react-native';

import { demoProgressMetrics } from '@/data/fixtures/demo-workout';
import { AppHeader } from '@/features/shell/app-header';
import { Card, FormMessage, Screen, Text } from '@/ui/components';
import { ControlIcon } from '@/ui/icons/control-icon';
import { borders, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export function ProgressScreen() {
  const { theme } = useTheme();

  return (
    <Screen contentContainerStyle={styles.content} safeAreaEdges={['top', 'left', 'right']} scroll>
      <AppHeader title="Progress" />

      <View style={styles.intro}>
        <Text tone="brand" variant="caption">
          LAST 4 WEEKS · DEMO DATA
        </Text>
        <Text accessibilityRole="header" variant="title">
          Momentum, not noise.
        </Text>
        <Text tone="secondary">A compact signal of the work you keep showing up for.</Text>
      </View>

      <View style={styles.metricGrid}>
        {demoProgressMetrics.map((metric, index) => (
          <View
            key={metric.label}
            style={[
              styles.metricCard,
              {
                backgroundColor: index === 0 ? theme.colors.surfaceElevated : theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text tone={index === 0 ? 'brand' : 'primary'} variant="metric">
              {metric.value}
            </Text>
            <Text variant="label">{metric.label}</Text>
            <Text tone="secondary" variant="caption">
              {metric.detail}
            </Text>
          </View>
        ))}
      </View>

      <Card variant="elevated">
        <View style={styles.summaryIcon}>
          <ControlIcon color={theme.colors.brand} name="trophy" size={24} />
        </View>
        <Text variant="heading">Consistency leads.</Text>
        <Text tone="secondary">
          You completed more than four out of five planned sessions in this local snapshot.
        </Text>
      </Card>

      <FormMessage
        message="Trends, records and Control Twin arrive in v0.5. No health conclusions are made from this demo."
        tone="info"
      />
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
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.x3,
  },
  metricCard: {
    minWidth: 144,
    flexGrow: 1,
    flexBasis: '30%',
    borderRadius: radii.card,
    borderWidth: borders.hairline,
    padding: spacing.x4,
    gap: spacing.x1,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
