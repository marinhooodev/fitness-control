import { StyleSheet, View } from 'react-native';

import { demoWeek, type WeekDayStatus } from '@/data/fixtures/demo-workout';
import { AppHeader } from '@/features/shell/app-header';
import { Card, FormMessage, Screen, Text } from '@/ui/components';
import { ControlIcon, type ControlIconName } from '@/ui/icons/control-icon';
import { borders, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

const statusMeta: Record<WeekDayStatus, { label: string; icon: ControlIconName }> = {
  complete: { label: 'DONE', icon: 'check' },
  today: { label: 'TODAY', icon: 'activity' },
  upcoming: { label: 'UP NEXT', icon: 'clock' },
  recovery: { label: 'RECOVERY', icon: 'spark' },
};

export function PlanScreen() {
  const { theme } = useTheme();

  return (
    <Screen contentContainerStyle={styles.content} safeAreaEdges={['top', 'left', 'right']} scroll>
      <AppHeader title="Plan" />

      <View style={styles.intro}>
        <Text tone="brand" variant="caption">
          THIS WEEK
        </Text>
        <Text accessibilityRole="header" variant="title">
          Built for momentum.
        </Text>
        <Text tone="secondary">Four training days, one recovery window and room to adapt.</Text>
      </View>

      <Card>
        {demoWeek.map((item, index) => {
          const meta = statusMeta[item.status];
          const highlighted = item.status === 'today';
          const muted = item.status === 'upcoming' || item.status === 'recovery';

          return (
            <View key={`${item.day}-${item.date}`}>
              <View
                accessibilityLabel={`${item.day} ${item.date}, ${item.session}, ${meta.label}`}
                style={[
                  styles.day,
                  highlighted && {
                    backgroundColor: theme.colors.infoSurface,
                    borderColor: theme.colors.info,
                  },
                ]}
              >
                <View style={styles.date}>
                  <Text tone={highlighted ? 'info' : 'secondary'} variant="caption">
                    {item.day}
                  </Text>
                  <Text variant="heading">{item.date}</Text>
                </View>
                <View style={styles.session}>
                  <Text tone={muted ? 'secondary' : 'primary'} variant="label">
                    {item.session}
                  </Text>
                  <View style={styles.status}>
                    <ControlIcon
                      color={
                        highlighted
                          ? theme.colors.info
                          : item.status === 'complete'
                            ? theme.colors.success
                            : theme.colors.textSecondary
                      }
                      name={meta.icon}
                      size={14}
                    />
                    <Text
                      tone={
                        highlighted ? 'info' : item.status === 'complete' ? 'success' : 'secondary'
                      }
                      variant="caption"
                    >
                      {meta.label}
                    </Text>
                  </View>
                </View>
              </View>
              {index < demoWeek.length - 1 ? (
                <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
              ) : null}
            </View>
          );
        })}
      </Card>

      <FormMessage
        message="Full planning arrives in v0.4. This schedule is fixed demo data for the functional shell."
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
  day: {
    minHeight: 72,
    borderRadius: radii.control,
    borderWidth: borders.hairline,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x4,
    paddingHorizontal: spacing.x3,
    paddingVertical: spacing.x2,
  },
  date: {
    width: 44,
    alignItems: 'center',
  },
  session: {
    flex: 1,
    gap: spacing.x1,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x1,
  },
  divider: {
    height: 1,
    marginHorizontal: spacing.x3,
  },
});
