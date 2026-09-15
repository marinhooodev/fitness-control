import { useId, useState } from 'react';
import { Platform, StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

import { FormMessage } from '@/ui/components/form-message';
import { IconButton } from '@/ui/components/icon-button';
import { Text } from '@/ui/components/text';
import { ControlIcon } from '@/ui/icons/control-icon';
import { borders, fontFamilies, layout, radii, spacing } from '@/ui/theme/tokens';
import { useTheme } from '@/ui/theme/theme-provider';

export interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  hint?: string;
}

export function TextField({
  label,
  error,
  hint,
  secureTextEntry,
  editable = true,
  onFocus,
  onBlur,
  style,
  accessibilityHint,
  ...props
}: TextFieldProps) {
  const { theme } = useTheme();
  const messageId = `${useId()}-message`;
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = secureTextEntry === true;

  const handleFocus: NonNullable<TextInputProps['onFocus']> = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur: NonNullable<TextInputProps['onBlur']> = (event) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const borderColor = error
    ? theme.colors.danger
    : isFocused
      ? theme.colors.brand
      : theme.colors.border;

  return (
    <View style={styles.group}>
      <Text variant="label">{label}</Text>
      <View
        style={[
          styles.fieldShell,
          {
            backgroundColor: editable ? theme.colors.surface : theme.colors.surfaceDisabled,
            borderColor,
            ...(isFocused && Platform.OS === 'web'
              ? { boxShadow: `0 0 8px ${theme.colors.focusRing}` }
              : isFocused && Platform.OS === 'ios'
                ? { shadowColor: theme.colors.brand }
                : null),
          },
          isFocused && styles.focused,
        ]}
      >
        <TextInput
          {...props}
          accessibilityHint={error ?? hint ?? accessibilityHint}
          accessibilityLabel={props.accessibilityLabel ?? label}
          accessibilityState={{ ...props.accessibilityState, disabled: !editable }}
          aria-describedby={error || hint ? messageId : undefined}
          cursorColor={theme.colors.brand}
          editable={editable}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor={theme.colors.textDisabled}
          selectionColor={theme.colors.brand}
          secureTextEntry={isPassword && !isPasswordVisible}
          style={[
            styles.input,
            { color: editable ? theme.colors.textPrimary : theme.colors.textDisabled },
            style,
          ]}
        />
        {isPassword ? (
          <IconButton
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            onPress={() => setIsPasswordVisible((current) => !current)}
          >
            <ControlIcon
              color={theme.colors.textSecondary}
              name={isPasswordVisible ? 'eye-off' : 'eye'}
            />
          </IconButton>
        ) : null}
      </View>
      {error ? (
        <FormMessage message={error} nativeID={messageId} />
      ) : hint ? (
        <Text nativeID={messageId} tone="secondary" variant="caption">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    width: '100%',
    gap: spacing.x2,
  },
  fieldShell: {
    minHeight: 52,
    borderRadius: radii.control,
    borderWidth: borders.hairline,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.x4,
    paddingRight: spacing.x1,
  },
  focused: {
    borderWidth: borders.emphasized,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: layout.minTouchTarget,
    paddingVertical: spacing.x3,
    paddingRight: spacing.x2,
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 16,
    lineHeight: 22,
  },
});
