import Svg, { Circle, Line, Path, Polygon, Polyline, Rect } from 'react-native-svg';

export type ControlIconName =
  | 'activity'
  | 'alert'
  | 'arrow-left'
  | 'calendar'
  | 'chart'
  | 'check'
  | 'chevron-down'
  | 'clock'
  | 'close'
  | 'eye'
  | 'eye-off'
  | 'home'
  | 'info'
  | 'pause'
  | 'play'
  | 'spark'
  | 'target'
  | 'trophy'
  | 'user';

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
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      {name === 'activity' ? (
        <Polyline points="3 12 7 12 9.5 6 14 18 16.5 12 21 12" {...sharedProps} />
      ) : null}
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
      {name === 'arrow-left' ? (
        <>
          <Line x1="20" x2="5" y1="12" y2="12" {...sharedProps} />
          <Polyline points="11 6 5 12 11 18" {...sharedProps} />
        </>
      ) : null}
      {name === 'calendar' ? (
        <>
          <Rect height="17" rx="3" width="18" x="3" y="4" {...sharedProps} />
          <Line x1="8" x2="8" y1="2" y2="6" {...sharedProps} />
          <Line x1="16" x2="16" y1="2" y2="6" {...sharedProps} />
          <Line x1="3" x2="21" y1="9" y2="9" {...sharedProps} />
        </>
      ) : null}
      {name === 'chart' ? (
        <>
          <Path d="M4 19V5" {...sharedProps} />
          <Path d="M4 19h16" {...sharedProps} />
          <Polyline points="7 15 11 11 14 13 20 7" {...sharedProps} />
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
      {name === 'home' ? (
        <>
          <Path d="m3 11 9-8 9 8" {...sharedProps} />
          <Path d="M5 10v10h14V10" {...sharedProps} />
          <Path d="M9 20v-6h6v6" {...sharedProps} />
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
      {name === 'clock' ? (
        <>
          <Circle cx="12" cy="12" r="9" {...sharedProps} />
          <Path d="M12 7v5l3.5 2" {...sharedProps} />
        </>
      ) : null}
      {name === 'pause' ? (
        <>
          <Line x1="9" x2="9" y1="7" y2="17" {...sharedProps} />
          <Line x1="15" x2="15" y1="7" y2="17" {...sharedProps} />
        </>
      ) : null}
      {name === 'play' ? <Polygon points="8 5 19 12 8 19 8 5" {...sharedProps} /> : null}
      {name === 'target' ? (
        <>
          <Circle cx="12" cy="12" r="9" {...sharedProps} />
          <Circle cx="12" cy="12" r="4" {...sharedProps} />
          <Circle cx="12" cy="12" fill={color} r="1" />
        </>
      ) : null}
      {name === 'trophy' ? (
        <>
          <Path d="M8 4h8v4c0 4-1.8 6-4 6s-4-2-4-6V4Z" {...sharedProps} />
          <Path d="M8 6H4v2c0 2 1.3 3 3.5 3" {...sharedProps} />
          <Path d="M16 6h4v2c0 2-1.3 3-3.5 3" {...sharedProps} />
          <Line x1="12" x2="12" y1="14" y2="19" {...sharedProps} />
          <Line x1="8" x2="16" y1="20" y2="20" {...sharedProps} />
        </>
      ) : null}
      {name === 'user' ? (
        <>
          <Circle cx="12" cy="8" r="4" {...sharedProps} />
          <Path d="M4.5 21c.7-4.2 3.2-6.5 7.5-6.5s6.8 2.3 7.5 6.5" {...sharedProps} />
        </>
      ) : null}
    </Svg>
  );
}
