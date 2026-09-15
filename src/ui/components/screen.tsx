import type { ReactNode } from 'react';
import { ScrollView, type ScrollViewProps, StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { layout, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

interface ScreenProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
  scroll?: boolean;
  safeAreaEdges?: Edge[];
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
}

export function Screen({
  children,
  scroll = false,
  safeAreaEdges = ['top', 'right', 'bottom', 'left'],
  contentContainerStyle,
  keyboardShouldPersistTaps = 'handled',
  style,
  ...props
}: ScreenProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      {...props}
      edges={safeAreaEdges}
      style={[styles.safeArea, { backgroundColor: theme.colors.canvas }, style]}
    >
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.content, contentContainerStyle]}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.fill, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.phoneHorizontalPadding,
    paddingTop: spacing.x5,
    paddingBottom: spacing.x16,
  },
});
