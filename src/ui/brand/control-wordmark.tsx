import Svg, { Text as SvgText, type SvgProps } from 'react-native-svg';

import { fontFamilies } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

interface ControlWordmarkProps extends Omit<
  SvgProps,
  | 'accessibilityElementsHidden'
  | 'accessibilityLabel'
  | 'accessibilityRole'
  | 'accessible'
  | 'color'
> {
  accessibilityLabel?: string;
  color?: string;
  decorative?: boolean;
  width?: number;
}

export function ControlWordmark({
  accessibilityLabel = 'CONTROL',
  color,
  decorative = false,
  width = 152,
  ...props
}: ControlWordmarkProps) {
  const { theme } = useTheme();
  const height = width * 0.24;

  return (
    <Svg
      {...props}
      accessibilityLabel={decorative ? undefined : accessibilityLabel}
      accessibilityRole={decorative ? undefined : 'image'}
      height={height}
      viewBox="0 0 152 36"
      width={width}
    >
      <SvgText
        fill={color ?? theme.colors.textPrimary}
        fontFamily={fontFamilies.performanceBold}
        fontSize="35"
        letterSpacing="1.4"
        x="0"
        y="30"
      >
        CONTROL
      </SvgText>
    </Svg>
  );
}
