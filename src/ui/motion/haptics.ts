import * as Haptics from 'expo-haptics';

export type HapticIntent = 'selection' | 'light' | 'medium' | 'warning' | 'success';

export function triggerHaptic(intent: HapticIntent) {
  const feedback = (() => {
    switch (intent) {
      case 'selection':
        return Haptics.selectionAsync();
      case 'light':
        return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      case 'medium':
        return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      case 'warning':
        return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      case 'success':
        return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  })();

  void feedback.catch(() => undefined);
}
