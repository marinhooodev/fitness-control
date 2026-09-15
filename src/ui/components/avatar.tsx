import { StyleSheet, View, type ViewProps } from 'react-native';

import { Text } from '@/ui/components/text';
import { borders, radii } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarProps extends ViewProps {
  name: string;
  size?: AvatarSize;
}

const avatarSizes: Record<AvatarSize, number> = {
  small: 36,
  medium: 48,
  large: 64,
};

function initialsFor(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function Avatar({ name, size = 'medium', style, ...props }: AvatarProps) {
  const { theme } = useTheme();
  const dimension = avatarSizes[size];

  return (
    <View
      {...props}
      accessibilityLabel={`${name} avatar`}
      accessibilityRole="image"
      style={[
        styles.base,
        {
          width: dimension,
          height: dimension,
          backgroundColor: theme.colors.infoSurface,
          borderColor: theme.colors.info,
        },
        style,
      ]}
    >
      <Text style={{ color: theme.colors.info }} variant={size === 'large' ? 'heading' : 'label'}>
        {initialsFor(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.round,
    borderWidth: borders.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
