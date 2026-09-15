import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ControlMark } from '@/ui/brand/control-mark';
import { ControlSplash } from '@/ui/brand/control-splash';
import { ControlWordmark } from '@/ui/brand/control-wordmark';
import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  FormMessage,
  IconButton,
  Screen,
  Sheet,
  Text,
  TextField,
} from '@/ui/components';
import { ControlIcon } from '@/ui/icons/control-icon';
import { layout, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';
import type { ThemeMode } from '@/store/demo-store';

const themeModes: ThemeMode[] = ['system', 'light', 'dark'];
const trainingGoals = ['Strength', 'Balanced', 'Conditioning'] as const;

type SheetIntent = 'workout' | 'reset';

interface SectionProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

function Section({ eyebrow, title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <Text style={styles.eyebrow} tone="secondary" variant="caption">
          {eyebrow.toUpperCase()}
        </Text>
        <Text accessibilityRole="header" variant="heading">
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

export function DesignSystemShowcaseScreen() {
  const { theme, mode, resolvedMode, setMode } = useTheme();
  const [selectedGoal, setSelectedGoal] = useState<(typeof trainingGoals)[number]>('Balanced');
  const [displayName, setDisplayName] = useState('Alex Morgan');
  const [sheetIntent, setSheetIntent] = useState<SheetIntent>('workout');
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [feedback, setFeedback] = useState('All foundations are interactive and local.');

  const openSheet = (intent: SheetIntent) => {
    setSheetIntent(intent);
    setSheetVisible(true);
  };

  return (
    <>
      <Screen scroll testID="design-system-showcase">
        <View style={styles.header}>
          <ControlWordmark width={142} />
          <View style={styles.headerActions}>
            <IconButton
              accessibilityLabel="Show foundation status"
              onPress={() => setFeedback('Foundation status checked locally.')}
              variant="secondary"
            >
              <ControlIcon color={theme.colors.textPrimary} name="spark" />
            </IconButton>
            <Avatar name="Alex Morgan" />
          </View>
        </View>

        <Card style={styles.heroCard} variant="elevated">
          <View style={styles.heroTopline}>
            <View style={[styles.statusPill, { backgroundColor: theme.colors.brand }]}>
              <View style={[styles.liveDot, { backgroundColor: theme.colors.brandInk }]} />
              <Text tone="brand-ink" variant="caption">
                SESSION 2
              </Text>
            </View>
            <ControlMark accessible={false} size={48} />
          </View>
          <View style={styles.heroCopy}>
            <Text accessibilityRole="header" variant="display">
              BUILT TO MOVE.
            </Text>
            <Text style={styles.heroDescription} tone="secondary">
              The reusable visual foundation for every CONTROL flow.
            </Text>
          </View>
          <View style={styles.metricRow}>
            <View style={styles.metricBlock}>
              <Text variant="metric">44</Text>
              <Text tone="secondary" variant="caption">
                MIN TOUCH
              </Text>
            </View>
            <Divider style={styles.metricDivider} />
            <View style={styles.metricBlock}>
              <Text variant="metric">4pt</Text>
              <Text tone="secondary" variant="caption">
                BASE GRID
              </Text>
            </View>
          </View>
        </Card>

        <View accessibilityLiveRegion="polite" style={styles.feedback}>
          <FormMessage message={feedback} tone="info" />
        </View>

        <Section eyebrow="Theme provider" title="System, light, dark">
          <View
            accessibilityLabel="Theme mode"
            accessibilityRole="radiogroup"
            style={styles.wrapRow}
          >
            {themeModes.map((themeMode) => (
              <Chip
                accessibilityRole="radio"
                key={themeMode}
                label={themeMode[0].toUpperCase() + themeMode.slice(1)}
                onPress={() => {
                  setMode(themeMode);
                  setFeedback(`${themeMode} theme preference saved locally.`);
                }}
                selected={mode === themeMode}
              />
            ))}
          </View>
          <Text tone="secondary" variant="caption">
            Resolved appearance · {resolvedMode}
          </Text>
          <View style={styles.swatchRow}>
            {[
              ['Canvas', theme.colors.canvas],
              ['Surface', theme.colors.surface],
              ['Volt', theme.colors.brand],
              ['Info', theme.colors.info],
              ['Warning', theme.colors.warning],
              ['Danger', theme.colors.danger],
            ].map(([label, color]) => (
              <View key={label} style={styles.swatchItem}>
                <View
                  style={[
                    styles.swatch,
                    { backgroundColor: color, borderColor: theme.colors.border },
                  ]}
                />
                <Text align="center" tone="secondary" variant="caption">
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Divider />

        <Section eyebrow="Typography" title="Manrope + Barlow Condensed">
          <Card>
            <Text variant="display">64:00</Text>
            <Text variant="title">Training, under control.</Text>
            <Text tone="secondary">
              Clear hierarchy keeps dense performance information calm and usable.
            </Text>
            <Text tone="brand" variant="label">
              ADAPTIVE COMMAND CENTER
            </Text>
          </Card>
        </Section>

        <Divider />

        <Section eyebrow="Actions" title="Buttons and icon controls">
          <View style={styles.buttonStack}>
            <Button
              fullWidth
              label="Open workout sheet"
              onPress={() => openSheet('workout')}
              size="large"
            />
            <Button
              fullWidth
              label="Save locally"
              onPress={() => setFeedback('Demo settings saved on this device.')}
              variant="secondary"
            />
            <Button
              fullWidth
              label="Clear message"
              onPress={() => setFeedback('Ready when you are.')}
              variant="ghost"
            />
            <Button
              fullWidth
              label="Preview reset"
              onPress={() => openSheet('reset')}
              variant="danger"
            />
          </View>
          <View style={styles.wrapRow}>
            <Button disabled label="Disabled" variant="secondary" />
            <Button label="Saving" loading variant="secondary" />
          </View>
        </Section>

        <Divider />

        <Section eyebrow="Inputs" title="Persistent labels and clear errors">
          <View style={styles.inputStack}>
            <TextField
              autoCapitalize="words"
              label="Display name"
              onChangeText={setDisplayName}
              value={displayName}
            />
            <TextField
              autoCapitalize="none"
              error="Enter a valid email address."
              keyboardType="email-address"
              label="Email"
              value="alex@"
            />
            <TextField
              hint="Passwords are discarded in this offline demo."
              label="Password"
              secureTextEntry
              value="control-demo"
            />
            <TextField editable={false} label="Disabled field" value="Unavailable" />
          </View>
        </Section>

        <Divider />

        <Section eyebrow="Selection" title="Chips carry more than color">
          <View style={styles.wrapRow}>
            {trainingGoals.map((goal) => (
              <Chip
                key={goal}
                label={goal}
                onPress={() => {
                  setSelectedGoal(goal);
                  setFeedback(`${goal} selected as the demo training focus.`);
                }}
                selected={selectedGoal === goal}
                variant={goal === 'Conditioning' ? 'info' : 'neutral'}
              />
            ))}
            <Chip label="Recovery note" variant="warning" />
          </View>
        </Section>

        <Divider />

        <Section eyebrow="Surfaces" title="Cards, messages, avatars">
          <View style={styles.cardStack}>
            <Card>
              <Text variant="label">DEFAULT SURFACE</Text>
              <Text tone="secondary">A bordered card for calm, readable grouping.</Text>
            </Card>
            <Card variant="elevated">
              <Text variant="label">ELEVATED SURFACE</Text>
              <Text tone="secondary">Reserved for floating or high-priority content.</Text>
            </Card>
            <Card
              accessibilityLabel="Interactive card sample"
              onPress={() => setFeedback('Interactive card pressed.')}
              variant="interactive"
            >
              <View style={styles.interactiveCardRow}>
                <View style={styles.interactiveCardCopy}>
                  <Text variant="label">INTERACTIVE SURFACE</Text>
                  <Text tone="secondary">Press feedback, semantics and haptics.</Text>
                </View>
                <ControlIcon color={theme.colors.brand} name="spark" />
              </View>
            </Card>
          </View>
          <View style={styles.avatarRow}>
            <Avatar name="Alex Morgan" size="small" />
            <Avatar name="Jordan Lee" />
            <Avatar name="Sam Rivera" size="large" />
          </View>
          <View style={styles.messageStack}>
            <FormMessage message="Demo data stays on this device." tone="info" />
            <FormMessage message="Schedule needs one recovery day." tone="warning" />
            <FormMessage message="Profile is ready." tone="success" />
            <FormMessage message="This field needs attention." />
          </View>
        </Section>

        <Divider />

        <Section eyebrow="Brand system" title="Vector-first identity">
          <Card style={styles.splashCard}>
            <ControlSplash />
            <Text align="center" tone="secondary" variant="caption">
              PROVISIONAL VECTOR SPLASH
            </Text>
          </Card>
        </Section>
      </Screen>

      <Sheet
        onClose={() => setSheetVisible(false)}
        title={sheetIntent === 'reset' ? 'Reset demo data?' : 'Today · Upper Strength'}
        visible={isSheetVisible}
      >
        {sheetIntent === 'reset' ? (
          <>
            <FormMessage
              message="This is a component preview. Confirmation is explicit and no data is removed here."
              tone="warning"
            />
            <Button
              fullWidth
              label="Confirm preview"
              onPress={() => {
                setSheetVisible(false);
                setFeedback('Destructive confirmation pattern verified.');
              }}
              variant="danger"
            />
          </>
        ) : (
          <>
            <Text tone="secondary">
              A local sheet built with Modal, Gesture Handler and Reanimated. Drag down, use back,
              tap the backdrop or press close.
            </Text>
            <Divider />
            <View style={styles.sheetMetricRow}>
              <View>
                <Text variant="metric">42</Text>
                <Text tone="secondary" variant="caption">
                  MINUTES
                </Text>
              </View>
              <View>
                <Text variant="metric">06</Text>
                <Text tone="secondary" variant="caption">
                  EXERCISES
                </Text>
              </View>
            </View>
            <Button
              fullWidth
              label="Close preview"
              onPress={() => {
                setSheetVisible(false);
                setFeedback('Workout sheet interaction verified.');
              }}
            />
          </>
        )}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x4,
    marginBottom: spacing.x8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
  heroCard: {
    borderRadius: radii.hero,
    padding: spacing.x6,
    marginBottom: spacing.x4,
  },
  heroTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x4,
  },
  statusPill: {
    minHeight: 32,
    borderRadius: radii.round,
    paddingHorizontal: spacing.x3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: radii.round,
  },
  heroCopy: {
    gap: spacing.x3,
    paddingVertical: spacing.x6,
  },
  heroDescription: {
    maxWidth: 390,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.x5,
  },
  metricBlock: {
    flex: 1,
    gap: spacing.x1,
  },
  metricDivider: {
    width: 1,
    height: 'auto',
  },
  feedback: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    marginBottom: spacing.x8,
  },
  section: {
    gap: spacing.x4,
    paddingVertical: spacing.x8,
  },
  sectionHeading: {
    gap: spacing.x1,
  },
  eyebrow: {
    letterSpacing: 1.6,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.x2,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.x3,
  },
  swatchItem: {
    width: 68,
    alignItems: 'center',
    gap: spacing.x2,
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: radii.control,
    borderWidth: 1,
  },
  buttonStack: {
    gap: spacing.x3,
  },
  inputStack: {
    gap: spacing.x5,
  },
  cardStack: {
    gap: spacing.x3,
  },
  interactiveCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x4,
  },
  interactiveCardCopy: {
    flex: 1,
    gap: spacing.x1,
  },
  avatarRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x4,
  },
  messageStack: {
    gap: spacing.x3,
  },
  splashCard: {
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x5,
  },
  sheetMetricRow: {
    flexDirection: 'row',
    gap: spacing.x10,
  },
});
