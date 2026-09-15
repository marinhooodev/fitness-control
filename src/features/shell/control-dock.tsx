import { useRouter } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type PressableProps,
} from 'react-native';
import Animated, {
  FadeIn,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { demoWorkout } from '@/data/fixtures/demo-workout';
import { useWorkoutElapsed } from '@/features/workout/use-workout-elapsed';
import { useDemoStore } from '@/store/demo-store';
import { Text } from '@/ui/components';
import { ControlIcon, type ControlIconName } from '@/ui/icons/control-icon';
import { triggerHaptic } from '@/ui/motion/haptics';
import { usePressScale } from '@/ui/motion/use-press-scale';
import { borders, fontFamilies, layout, motion, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

const dockHeight = 78;
const centerSize = 66;
const indicatorWidth = 24;
const ringRadius = 34;
const ringCircumference = 2 * Math.PI * ringRadius;

const tabMeta: Record<string, { label: string; icon: ControlIconName }> = {
  today: { label: 'Today', icon: 'home' },
  plan: { label: 'Plan', icon: 'calendar' },
  progress: { label: 'Progress', icon: 'chart' },
  you: { label: 'You', icon: 'user' },
};

function routeToVisualIndex(routeIndex: number) {
  return routeIndex < 2 ? routeIndex : routeIndex + 1;
}

interface DockTabButtonProps {
  accessibilityLabel: string;
  focused: boolean;
  icon: ControlIconName;
  label: string;
  onLongPress: PressableProps['onLongPress'];
  onPress: PressableProps['onPress'];
  testID?: string;
}

function DockTabButton({
  accessibilityLabel,
  focused,
  icon,
  label,
  onLongPress,
  onPress,
  testID,
}: DockTabButtonProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const focusProgress = useSharedValue(focused ? 1 : 0);
  const { animatedStyle: pressStyle, pressIn, pressOut } = usePressScale(0.9);

  useEffect(() => {
    focusProgress.set(
      reduceMotion
        ? focused
          ? 1
          : 0
        : withSpring(focused ? 1 : 0, {
            ...motion.spring,
            damping: 20,
            stiffness: 260,
          }),
    );
  }, [focusProgress, focused, reduceMotion]);

  const focusStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(focusProgress.get(), [0, 1], [0, -2]) },
      { scale: interpolate(focusProgress.get(), [0, 1], [1, 1.08]) },
    ],
  }));

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      aria-selected={focused}
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={styles.tab}
      testID={testID}
    >
      <Animated.View style={[styles.tabContent, pressStyle]}>
        <Animated.View style={[styles.iconWrap, focusStyle]}>
          {focused ? (
            <View
              aria-hidden
              style={[styles.iconGlow, { backgroundColor: theme.colors.dockGlow }]}
            />
          ) : null}
          <ControlIcon
            color={focused ? theme.colors.brand : theme.colors.textSecondary}
            name={icon}
            size={focused ? 22 : 21}
            strokeWidth={focused ? 2.4 : 2}
          />
        </Animated.View>
        {focused ? (
          <Animated.View entering={reduceMotion ? undefined : FadeIn.duration(180)}>
            <Text numberOfLines={1} style={[styles.tabLabel, { color: theme.colors.textPrimary }]}>
              {label}
            </Text>
          </Animated.View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

interface CenterActionProps {
  active: boolean;
  onPress: () => void;
  progress: number;
}

function CenterAction({ active, onPress, progress }: CenterActionProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const pulse = useSharedValue(0);
  const { animatedStyle: pressStyle, pressIn, pressOut } = usePressScale(0.9);

  useEffect(() => {
    cancelAnimation(pulse);

    if (reduceMotion) {
      pulse.set(0);
      return;
    }

    const duration = active ? 900 : 1400;
    pulse.set(
      withRepeat(withSequence(withTiming(1, { duration }), withTiming(0, { duration })), -1),
    );

    return () => cancelAnimation(pulse);
  }, [active, pulse, reduceMotion]);

  const haloStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.get(), [0, 1], active ? [0.22, 0.48] : [0.2, 0.42]),
    transform: [{ scale: interpolate(pulse.get(), [0, 1], [0.92, 1.14]) }],
  }));

  return (
    <Animated.View style={[styles.centerLift, pressStyle]}>
      <Animated.View
        aria-hidden
        style={[styles.centerHalo, { backgroundColor: theme.colors.dockGlow }, haloStyle]}
      />
      <Svg
        aria-hidden
        height={centerSize + 12}
        style={styles.progressRing}
        viewBox="0 0 78 78"
        width={centerSize + 12}
      >
        <Circle
          cx="39"
          cy="39"
          fill="none"
          r={ringRadius}
          stroke={active ? theme.colors.borderStrong : theme.colors.dockGlow}
          strokeDasharray={active ? undefined : '2 6'}
          strokeLinecap="round"
          strokeWidth={active ? 2 : 3}
        />
        {active ? (
          <Circle
            cx="39"
            cy="39"
            fill="none"
            r={ringRadius}
            rotation="-90"
            stroke={theme.colors.brand}
            strokeDasharray={`${ringCircumference} ${ringCircumference}`}
            strokeDashoffset={ringCircumference * (1 - progress)}
            strokeLinecap="round"
            strokeWidth="3.5"
            x="0"
            y="0"
          />
        ) : null}
      </Svg>
      <Pressable
        accessibilityHint={
          active ? 'Returns to the workout in progress' : 'Opens the workout preview'
        }
        accessibilityLabel={active ? 'Return to active workout' : 'Start workout'}
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[
          styles.centerButton,
          theme.elevation.floating,
          {
            backgroundColor: theme.colors.brand,
            borderColor: theme.colors.dockSurface,
          },
        ]}
      >
        <View
          aria-hidden
          style={[styles.centerSheen, { backgroundColor: theme.colors.dockHighlight }]}
        />
        {active ? (
          <View
            aria-hidden
            style={[styles.liveBadge, { backgroundColor: theme.colors.dockSurface }]}
          >
            <View style={[styles.liveDot, { backgroundColor: theme.colors.brand }]} />
          </View>
        ) : null}
        <ControlIcon
          color={theme.colors.brandInk}
          name={active ? 'activity' : 'play'}
          size={23}
          strokeWidth={2.5}
        />
        <Text style={styles.startLabel} tone="brand-ink">
          {active ? 'LIVE' : 'START'}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function ControlDock({ state, descriptors, navigation }: BottomTabBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const activeWorkout = useDemoStore((store) => store.activeWorkout);
  const elapsedMs = useWorkoutElapsed(activeWorkout);
  const reduceMotion = useReducedMotion();
  const [dockWidth, setDockWidth] = useState(0);
  const indicatorOffset = useSharedValue(0);
  const activeVisualIndex = routeToVisualIndex(state.index);
  const slotWidth = Math.max(0, dockWidth - spacing.x4) / 5;

  useEffect(() => {
    const nextOffset = activeVisualIndex * slotWidth;
    indicatorOffset.set(
      reduceMotion || slotWidth === 0 ? nextOffset : withSpring(nextOffset, motion.spring),
    );
  }, [activeVisualIndex, indicatorOffset, reduceMotion, slotWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorOffset.get() }],
  }));

  const progress = activeWorkout
    ? Math.min(1, elapsedMs / (demoWorkout.durationMinutes * 60 * 1000))
    : 0;

  const handleDockLayout = (event: LayoutChangeEvent) => {
    setDockWidth(event.nativeEvent.layout.width);
  };

  const renderTab = (routeIndex: number) => {
    const route = state.routes[routeIndex];
    const descriptor = descriptors[route.key];
    const meta = tabMeta[route.name];
    const focused = state.index === routeIndex;

    if (!meta) {
      return null;
    }

    const selectTab = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }

      triggerHaptic('selection');
    };

    return (
      <DockTabButton
        accessibilityLabel={descriptor.options.tabBarAccessibilityLabel ?? meta.label}
        focused={focused}
        icon={meta.icon}
        key={route.key}
        label={meta.label}
        onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
        onPress={selectTab}
        testID={descriptor.options.tabBarButtonTestID}
      />
    );
  };

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { height: dockHeight + insets.bottom + spacing.x3 }]}
    >
      <View
        aria-hidden
        style={[
          styles.dockAura,
          {
            backgroundColor: theme.colors.dockGlow,
            bottom: insets.bottom + spacing.x1,
          },
        ]}
      />
      <View
        onLayout={handleDockLayout}
        style={[
          styles.dock,
          theme.elevation.floating,
          {
            backgroundColor: theme.colors.dockSurface,
            borderColor: theme.colors.borderStrong,
            marginBottom: insets.bottom + spacing.x3,
          },
        ]}
      >
        <View
          aria-hidden
          style={[styles.shellHighlight, { backgroundColor: theme.colors.dockHighlight }]}
        />
        {dockWidth > 0 ? (
          <View
            aria-hidden
            style={[
              styles.centerBridge,
              {
                backgroundColor: theme.colors.dockGlow,
                left: dockWidth / 2 - 44,
              },
            ]}
          />
        ) : null}
        {dockWidth > 0 ? (
          <Animated.View
            aria-hidden
            style={[
              styles.activeCapsule,
              {
                backgroundColor: theme.colors.surfaceElevated,
                borderColor: theme.colors.focusRing,
                left: spacing.x3,
                width: Math.max(0, slotWidth - spacing.x2),
              },
              indicatorStyle,
            ]}
          >
            <View
              style={[styles.capsuleHighlight, { backgroundColor: theme.colors.dockHighlight }]}
            />
            <View style={[styles.indicator, { backgroundColor: theme.colors.brand }]} />
          </Animated.View>
        ) : null}

        {renderTab(0)}
        {renderTab(1)}

        <View style={styles.centerSlot}>
          <CenterAction
            active={Boolean(activeWorkout)}
            onPress={() => {
              triggerHaptic('medium');
              router.push(activeWorkout ? '/(app)/workout/active' : '/(app)/workout/preview');
            }}
            progress={progress}
          />
        </View>

        {renderTab(2)}
        {renderTab(3)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.x4,
    backgroundColor: 'transparent',
  },
  dockAura: {
    position: 'absolute',
    left: spacing.x8,
    right: spacing.x8,
    height: 24,
    borderRadius: radii.round,
    opacity: 0.32,
  },
  dock: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    height: dockHeight,
    borderRadius: radii.hero,
    borderWidth: borders.hairline,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.x2,
    overflow: 'visible',
  },
  shellHighlight: {
    position: 'absolute',
    top: 1,
    left: spacing.x6,
    right: spacing.x6,
    height: 1,
    borderRadius: radii.round,
    opacity: 0.8,
  },
  centerBridge: {
    position: 'absolute',
    top: -8,
    width: 88,
    height: 32,
    borderRadius: radii.round,
    opacity: 0.42,
  },
  activeCapsule: {
    position: 'absolute',
    top: spacing.x2,
    height: dockHeight - spacing.x4,
    borderRadius: radii.card,
    borderWidth: borders.hairline,
    alignItems: 'center',
    overflow: 'hidden',
  },
  capsuleHighlight: {
    position: 'absolute',
    top: 0,
    left: spacing.x3,
    right: spacing.x3,
    height: 1,
    borderRadius: radii.round,
  },
  tab: {
    flex: 1,
    height: dockHeight,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingTop: spacing.x1,
    paddingBottom: spacing.x2,
    zIndex: 2,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  iconWrap: {
    width: 30,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: radii.round,
  },
  tabLabel: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 10,
    lineHeight: 12,
  },
  indicator: {
    position: 'absolute',
    bottom: 4,
    width: indicatorWidth,
    height: 3,
    borderRadius: radii.round,
  },
  centerSlot: {
    flex: 1,
    height: dockHeight,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  centerLift: {
    width: centerSize + 18,
    height: centerSize + 18,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -18 }],
  },
  centerHalo: {
    position: 'absolute',
    width: centerSize + 18,
    height: centerSize + 18,
    borderRadius: radii.round,
  },
  centerButton: {
    width: centerSize,
    height: centerSize,
    borderRadius: radii.round,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    overflow: 'visible',
  },
  progressRing: {
    position: 'absolute',
    top: 3,
    left: 3,
  },
  centerSheen: {
    position: 'absolute',
    top: 5,
    left: 15,
    right: 15,
    height: 2,
    borderRadius: radii.round,
    opacity: 0.72,
  },
  liveBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: radii.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: radii.round,
  },
  startLabel: {
    fontFamily: fontFamilies.bodyExtraBold,
    fontSize: 9,
    lineHeight: 10,
    letterSpacing: 0.8,
  },
});
