import Svg, { Circle, Line, Path, Polyline } from 'react-native-svg';

export type ControlIconName =
  'alert' | 'check' | 'chevron-down' | 'close' | 'eye' | 'eye-off' | 'info' | 'spark';

interface ControlIconProps {
  name: ControlIconName;
  color: string;
  size?: number;
  strokeWidth?: number;
}

export function ControlIcon({ name, color, size = 20, strokeWidth = 2 }: ControlIconProps) {
  const sharedProps = {
    fill: 'none',
    stroke: color,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth,
  };

  return (
    <Svg accessibilityElementsHidden height={size} viewBox="0 0 24 24" width={size}>
      {name === 'alert' ? (
        <>
          <Path
            d="M10.3 3.4 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.4a2 2 0 0 0-3.4 0Z"
            {...sharedProps}
          />
          <Line x1="12" x2="12" y1="9" y2="13" {...sharedProps} />
          <Line x1="12" x2="12.01" y1="17" y2="17" {...sharedProps} />
        </>
      ) : null}
      {name === 'check' ? <Polyline points="5 12 10 17 19 7" {...sharedProps} /> : null}
      {name === 'chevron-down' ? <Polyline points="6 9 12 15 18 9" {...sharedProps} /> : null}
      {name === 'close' ? (
        <>
          <Line x1="6" x2="18" y1="6" y2="18" {...sharedProps} />
          <Line x1="18" x2="6" y1="6" y2="18" {...sharedProps} />
        </>
      ) : null}
      {name === 'eye' ? (
        <>
          <Path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" {...sharedProps} />
          <Circle cx="12" cy="12" r="2.5" {...sharedProps} />
        </>
      ) : null}
      {name === 'eye-off' ? (
        <>
          <Path d="M3 3 21 21" {...sharedProps} />
          <Path
            d="M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a15 15 0 0 1-2.3 3"
            {...sharedProps}
          />
          <Path
            d="M6.1 6.1C3.8 7.8 2.5 12 2.5 12s3.5 6 9.5 6a9.7 9.7 0 0 0 3.2-.5"
            {...sharedProps}
          />
        </>
      ) : null}
      {name === 'info' ? (
        <>
          <Circle cx="12" cy="12" r="9" {...sharedProps} />
          <Line x1="12" x2="12" y1="11" y2="16" {...sharedProps} />
          <Line x1="12" x2="12.01" y1="8" y2="8" {...sharedProps} />
        </>
      ) : null}
      {name === 'spark' ? (
        <Path
          d="m12 2 1.5 5.3L19 9l-5.5 1.7L12 16l-1.5-5.3L5 9l5.5-1.7L12 2Zm6 13 .7 2.3L21 18l-2.3.7L18 21l-.7-2.3L15 18l2.3-.7L18 15Z"
          {...sharedProps}
        />
      ) : null}
    </Svg>
  );
}
