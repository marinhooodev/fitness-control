import { Tabs } from 'expo-router';

import { ControlDock } from '@/features/shell/control-dock';
import { useTheme } from '@/ui/theme/theme-provider';

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      backBehavior="history"
      initialRouteName="today"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.canvas },
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <ControlDock {...props} />}
    >
      <Tabs.Screen
        name="today"
        options={{ tabBarAccessibilityLabel: 'Today tab', title: 'Today' }}
      />
      <Tabs.Screen name="plan" options={{ tabBarAccessibilityLabel: 'Plan tab', title: 'Plan' }} />
      <Tabs.Screen
        name="progress"
        options={{ tabBarAccessibilityLabel: 'Progress tab', title: 'Progress' }}
      />
      <Tabs.Screen name="you" options={{ tabBarAccessibilityLabel: 'You tab', title: 'You' }} />
    </Tabs>
  );
}
