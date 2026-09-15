import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthScreen } from '@/features/auth/auth-screen';
import { normalizeEmail, type SignUpErrors, validateSignUp } from '@/features/auth/auth-validation';
import { useDemoStore } from '@/store/demo-store';
import { Button, FormMessage, TextField } from '@/ui/components';
import { spacing } from '@/ui/theme/tokens';

export function SignUpScreen() {
  const params = useLocalSearchParams<{ email?: string; source?: string }>();
  const registerLocal = useDemoStore((state) => state.registerLocal);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(typeof params.email === 'string' ? params.email : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<SignUpErrors>({});

  const submit = () => {
    const nextErrors = validateSignUp({ name, email, password, confirmPassword });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    registerLocal({ name, email: normalizeEmail(email) });
  };

  return (
    <AuthScreen
      description="One profile, stored only on this device. Your password is discarded."
      eyebrow="Local profile"
      footer={
        <Button
          label="Back to sign in"
          onPress={() => router.replace('/(auth)/sign-in')}
          variant="ghost"
        />
      }
      title="Set your starting point."
    >
      {params.source === 'unknown-email' ? (
        <FormMessage
          message="No saved profile matched that email. Create the local profile below."
          tone="info"
        />
      ) : null}

      <View style={styles.fields}>
        <TextField
          autoCapitalize="words"
          autoComplete="name"
          error={errors.name}
          label="Name"
          onChangeText={(value) => {
            setName(value);
            setErrors((current) => ({ ...current, name: undefined }));
          }}
          returnKeyType="next"
          textContentType="name"
          value={name}
        />
        <TextField
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
          keyboardType="email-address"
          label="Email"
          onChangeText={(value) => {
            setEmail(value);
            setErrors((current) => ({ ...current, email: undefined }));
          }}
          returnKeyType="next"
          textContentType="emailAddress"
          value={email}
        />
        <TextField
          autoComplete="new-password"
          error={errors.password}
          hint="Used only to validate this form, then discarded."
          label="Password"
          onChangeText={(value) => {
            setPassword(value);
            setErrors((current) => ({ ...current, password: undefined }));
          }}
          returnKeyType="next"
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />
        <TextField
          autoComplete="new-password"
          error={errors.confirmPassword}
          label="Confirm password"
          onChangeText={(value) => {
            setConfirmPassword(value);
            setErrors((current) => ({ ...current, confirmPassword: undefined }));
          }}
          onSubmitEditing={submit}
          returnKeyType="done"
          secureTextEntry
          textContentType="newPassword"
          value={confirmPassword}
        />
      </View>

      <Button fullWidth label="Create local profile" onPress={submit} size="large" />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: spacing.x4,
  },
});
