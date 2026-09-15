import type { TextStyle, ViewStyle } from 'react-native';

export const lightColors = {
  canvas: '#F2F5F0',
  surface: '#FFFFFF',
  surfaceElevated: '#E7ECE5',
  surfacePressed: '#DDE4DB',
  surfaceDisabled: '#E5EAE3',
  textPrimary: '#0B0E0C',
  textSecondary: '#626D65',
  textDisabled: '#89918B',
  border: '#D2DAD1',
  borderStrong: '#AAB5AC',
  brand: '#B7EF2F',
  brandPressed: '#A6DA29',
  brandInk: '#111800',
  info: '#087E8A',
  infoSurface: '#D7F0F1',
  warning: '#A85600',
  warningSurface: '#F9E5CC',
  danger: '#B8382D',
  dangerPressed: '#992E25',
  dangerInk: '#FFFFFF',
  dangerSurface: '#F8DEDB',
  success: '#3D7616',
  overlay: 'rgba(8, 10, 9, 0.58)',
  focusRing: 'rgba(183, 239, 47, 0.24)',
  shadow: '#152017',
} as const;

export const darkColors = {
  canvas: '#080A09',
  surface: '#121513',
  surfaceElevated: '#1A1F1C',
  surfacePressed: '#252C28',
  surfaceDisabled: '#191D1B',
  textPrimary: '#F3F6F2',
  textSecondary: '#98A29B',
  textDisabled: '#69716C',
  border: '#2A312C',
  borderStrong: '#465149',
  brand: '#C8FF3D',
  brandPressed: '#B2E435',
  brandInk: '#142000',
  info: '#72DCE8',
  infoSurface: '#12363A',
  warning: '#FFB45C',
  warningSurface: '#3A2A17',
  danger: '#FF6B5F',
  dangerPressed: '#E65F54',
  dangerInk: '#260703',
  dangerSurface: '#3B1D1A',
  success: '#9BDB66',
  overlay: 'rgba(0, 0, 0, 0.72)',
  focusRing: 'rgba(200, 255, 61, 0.2)',
  shadow: '#000000',
} as const;

export type SemanticColors = {
  [Token in keyof typeof lightColors]: string;
};

export const spacing = {
  none: 0,
  x1: 4,
  x2: 8,
  x3: 12,
  x4: 16,
  x5: 20,
  x6: 24,
  x8: 32,
  x10: 40,
  x12: 48,
  x16: 64,
} as const;

export const radii = {
  none: 0,
  small: 8,
  control: 12,
  card: 20,
  hero: 28,
  round: 999,
} as const;

export const borders = {
  hairline: 1,
  emphasized: 2,
} as const;

export const layout = {
  minTouchTarget: 44,
  phoneHorizontalPadding: 20,
  sectionGap: 24,
  maxContentWidth: 640,
} as const;

export const motion = {
  duration: {
    feedback: 180,
    content: 280,
    structural: 400,
  },
  spring: {
    damping: 18,
    stiffness: 220,
    mass: 0.8,
  },
} as const;

export const fontFamilies = {
  bodyMedium: 'Manrope_500Medium',
  bodySemiBold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
  bodyExtraBold: 'Manrope_800ExtraBold',
  performanceBold: 'BarlowCondensed_700Bold',
} as const;

export const typography = {
  display: {
    fontFamily: fontFamilies.performanceBold,
    fontSize: 64,
    lineHeight: 64,
    letterSpacing: -1,
  },
  metric: {
    fontFamily: fontFamilies.performanceBold,
    fontSize: 40,
    lineHeight: 42,
    fontVariant: ['tabular-nums'],
  },
  title: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  heading: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 14,
    lineHeight: 18,
  },
  caption: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
  },
} satisfies Record<string, TextStyle>;

export const elevation = {
  light: {
    card: {
      shadowColor: lightColors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 3,
    },
    floating: {
      shadowColor: lightColors.shadow,
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.16,
      shadowRadius: 28,
      elevation: 10,
    },
  },
  dark: {
    card: {
      shadowColor: darkColors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      shadowRadius: 12,
      elevation: 2,
    },
    floating: {
      shadowColor: darkColors.shadow,
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.36,
      shadowRadius: 30,
      elevation: 12,
    },
  },
} satisfies Record<'light' | 'dark', Record<'card' | 'floating', ViewStyle>>;
