import Svg, { Path, type SvgProps } from 'react-native-svg';

import { useTheme } from '@/ui/theme/theme-provider';

interface ControlMarkProps extends Omit<SvgProps, 'color'> {
  color?: string;
  size?: number;
}

export function ControlMark({ color, size = 64, ...props }: ControlMarkProps) {
  const { theme } = useTheme();
  const resolvedColor = color ?? theme.colors.brand;

  return (
    <Svg
      {...props}
      accessibilityLabel={props.accessibilityLabel ?? 'CONTROL mark'}
      accessibilityRole="image"
      height={size}
      viewBox="0 0 80 64"
      width={size * 1.25}
    >
      <Path
        d="M45 12.8A22 22 0 1 0 45 51.2"
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeWidth="8"
      />
      <Path
        d="M40 32h8l4-7 6 14 5-7h12"
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
    </Svg>
  );
}
