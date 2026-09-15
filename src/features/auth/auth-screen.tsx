import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { ControlWordmark } from '@/ui/brand/control-wordmark';
import { Card, FormMessage, Screen, Text } from '@/ui/components';
import { spacing } from '@/ui/theme/tokens';

interface AuthScreenProps {
  title: string;
  description: string;
  eyebrow: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthScreen({ title, description, eyebrow, children, footer }: AuthScreenProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.fill}
    >
      <Screen contentContainerStyle={styles.content} scroll>
        <View style={styles.brandRow}>
          <ControlWordmark width={142} />
          <Text tone="brand" variant="caption">
            LOCAL MODE
          </Text>
        </View>

        <View style={styles.intro}>
          <Text tone="brand" variant="caption">
            {eyebrow.toUpperCase()}
          </Text>
          <Text accessibilityRole="header" variant="title">
            {title}
          </Text>
          <Text tone="secondary">{description}</Text>
        </View>

        <Card style={styles.formCard}>{children}</Card>

        <FormMessage message="Offline demo — no real account is created" tone="info" />
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.x6,
  },
  brandRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x4,
  },
  intro: {
    gap: spacing.x2,
  },
  formCard: {
    gap: spacing.x5,
  },
  footer: {
    alignItems: 'center',
  },
});
