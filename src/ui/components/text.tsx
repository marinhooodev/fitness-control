import { forwardRef } from 'react';
import {
  Text as NativeText,
  type TextProps as NativeTextProps,
  type TextStyle,
} from 'react-native';

import { typography } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export type TextVariant = keyof typeof typography;
export type TextTone =
  'primary' | 'secondary' | 'brand' | 'brand-ink' | 'danger' | 'info' | 'warning' | 'success';

export interface TextProps extends NativeTextProps {
  variant?: TextVariant;
  tone?: TextTone;
  align?: TextStyle['textAlign'];
}

export const Text = forwardRef<NativeText, TextProps>(function Text(
  { variant = 'body', tone = 'primary', align, style, ...props },
  ref,
) {
  const { theme } = useTheme();
  const toneColors: Record<TextTone, string> = {
    primary: theme.colors.textPrimary,
    secondary: theme.colors.textSecondary,
    brand: theme.colors.brand,
    'brand-ink': theme.colors.brandInk,
    danger: theme.colors.danger,
    info: theme.colors.info,
    warning: theme.colors.warning,
    success: theme.colors.success,
  };

  return (
    <NativeText
      {...props}
      allowFontScaling
      ref={ref}
      style={[typography[variant], { color: toneColors[tone], textAlign: align }, style]}
    />
  );
});
