import { useEffect, useMemo, useRef } from 'react';
import {
  AccessibilityInfo,
  findNodeHandle,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/ui/components/icon-button';
import { Text } from '@/ui/components/text';
import { ControlIcon } from '@/ui/icons/control-icon';
import { borders, motion, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

interface SheetProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  closeOnBackdropPress?: boolean;
}

const sheetEntranceOffset = 56;
const dismissDistance = 96;
const dismissVelocity = 800;

export function Sheet({
  visible,
  title,
  children,
  onClose,
  closeOnBackdropPress = true,
}: SheetProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<React.ElementRef<typeof Text>>(null);
  const translateY = useSharedValue(reduceMotion ? 0 : sheetEntranceOffset);
  const backdropOpacity = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (!visible) {
      translateY.set(reduceMotion ? 0 : sheetEntranceOffset);
      backdropOpacity.set(reduceMotion ? 1 : 0);
      return;
    }

    translateY.set(reduceMotion ? 0 : withTiming(0, { duration: motion.duration.content }));
    backdropOpacity.set(reduceMotion ? 1 : withTiming(1, { duration: motion.duration.feedback }));
  }, [backdropOpacity, reduceMotion, translateY, visible]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.get() }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.get(),
  }));

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          translateY.set(Math.max(0, event.translationY));
        })
        .onEnd((event) => {
          if (event.translationY > dismissDistance || event.velocityY > dismissVelocity) {
            runOnJS(onClose)();
            return;
          }

          translateY.set(reduceMotion ? 0 : withSpring(0, motion.spring));
        }),
    [onClose, reduceMotion, translateY],
  );

  const focusTitle = () => {
    if (Platform.OS === 'web') {
      const webTitle = titleRef.current as unknown as {
        focus?: () => void;
        setAttribute?: (name: string, value: string) => void;
      } | null;
      webTitle?.setAttribute?.('tabindex', '-1');
      webTitle?.focus?.();
      return;
    }

    const handle = findNodeHandle(titleRef.current);

    if (handle) {
      AccessibilityInfo.setAccessibilityFocus(handle);
    }
  };

  return (
    <Modal
      animationType="none"
      navigationBarTranslucent
      onRequestClose={onClose}
      onShow={focusTitle}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View style={styles.modalRoot}>
        <Animated.View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: theme.colors.overlay },
            backdropStyle,
          ]}
        />
        <Pressable
          accessibilityElementsHidden
          disabled={!closeOnBackdropPress}
          importantForAccessibility="no-hide-descendants"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          pointerEvents="box-none"
          style={styles.sheetPosition}
        >
          <GestureDetector gesture={panGesture}>
            <Animated.View
              accessibilityViewIsModal
              style={[
                styles.panel,
                {
                  backgroundColor: theme.colors.surfaceElevated,
                  borderColor: theme.colors.border,
                  paddingBottom: Math.max(insets.bottom, spacing.x5),
                },
                theme.elevation.floating,
                panelStyle,
              ]}
            >
              <View
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={[styles.handle, { backgroundColor: theme.colors.borderStrong }]}
              />
              <View style={styles.header}>
                <Text
                  accessibilityRole="header"
                  ref={titleRef}
                  style={styles.title}
                  variant="heading"
                >
                  {title}
                </Text>
                <IconButton accessibilityLabel="Close sheet" onPress={onClose}>
                  <ControlIcon color={theme.colors.textPrimary} name="close" />
                </IconButton>
              </View>
              <View style={styles.content}>{children}</View>
            </Animated.View>
          </GestureDetector>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetPosition: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  panel: {
    maxHeight: '88%',
    borderTopLeftRadius: radii.hero,
    borderTopRightRadius: radii.hero,
    borderWidth: borders.hairline,
    paddingHorizontal: spacing.x5,
    paddingTop: spacing.x3,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: radii.round,
    alignSelf: 'center',
    marginBottom: spacing.x4,
  },
  header: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x3,
  },
  title: {
    flex: 1,
  },
  content: {
    paddingTop: spacing.x4,
    gap: spacing.x4,
  },
});
