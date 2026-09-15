import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const palette = {
  dark: {
    canvas: '#080A09',
    surface: '#121513',
    textPrimary: '#F3F6F2',
    textSecondary: '#98A29B',
    border: '#2A312C',
    brand: '#C8FF3D',
    brandInk: '#142000',
  },
  light: {
    canvas: '#F2F5F0',
    surface: '#FFFFFF',
    textPrimary: '#0B0E0C',
    textSecondary: '#626D65',
    border: '#D2DAD1',
    brand: '#B7EF2F',
    brandInk: '#111800',
  },
} as const;

export function ControlBaselineScreen() {
  const colorScheme = useColorScheme();
  const colors = palette[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.canvas }]}>
      <View style={styles.frame}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[styles.glow, { borderColor: colors.brand }]}
        />

        <View style={styles.topLine}>
          <Text style={[styles.eyebrow, { color: colors.textSecondary }]}>CONTROL / 0.1</Text>
          <View style={[styles.signal, { backgroundColor: colors.brand }]} />
        </View>

        <View style={styles.hero}>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[styles.symbol, { borderColor: colors.brand, borderRightColor: 'transparent' }]}
          >
            <View style={[styles.pulse, { backgroundColor: colors.brand }]} />
          </View>

          <View style={styles.copy}>
            <Text style={[styles.kicker, { color: colors.textSecondary }]}>FUNCTIONAL SHELL</Text>
            <Text
              accessibilityRole="header"
              style={[styles.wordmark, { color: colors.textPrimary }]}
            >
              CONTROL
            </Text>
            <Text style={[styles.tagline, { color: colors.textSecondary }]}>
              Your body changes every day.{`\n`}Your plan should too.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={[styles.statusDot, { backgroundColor: colors.brand }]} />
          <View style={styles.statusCopy}>
            <Text style={[styles.statusTitle, { color: colors.textPrimary }]}>
              Foundation ready
            </Text>
            <Text style={[styles.statusDetail, { color: colors.textSecondary }]}>
              Local demo · Offline first
            </Text>
          </View>
          <View style={[styles.versionBadge, { backgroundColor: colors.brand }]}>
            <Text style={[styles.versionText, { color: colors.brandInk }]}>v0.1</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    borderWidth: 1,
    opacity: 0.16,
    top: -180,
    right: -180,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  signal: {
    width: 32,
    height: 4,
    borderRadius: 2,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: 32,
  },
  symbol: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 10,
    transform: [{ rotate: '-32deg' }],
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  pulse: {
    width: 32,
    height: 10,
    borderRadius: 5,
    marginRight: -14,
    transform: [{ rotate: '32deg' }],
  },
  copy: {
    gap: 12,
  },
  kicker: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  wordmark: {
    fontSize: 58,
    lineHeight: 62,
    fontWeight: '800',
    letterSpacing: -2.4,
  },
  tagline: {
    maxWidth: 360,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '500',
  },
  statusCard: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusCopy: {
    flex: 1,
    gap: 2,
  },
  statusTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  statusDetail: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  versionBadge: {
    minWidth: 48,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
  },
});
