import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthScreen } from '@/features/auth/auth-screen';
import { normalizeEmail, type SignInErrors, validateSignIn } from '@/features/auth/auth-validation';
import { useDemoStore } from '@/store/demo-store';
import { Button, Divider, Text, TextField } from '@/ui/components';
import { spacing } from '@/ui/theme/tokens';

export function SignInScreen() {
  const router = useRouter();
  const profileEmail = useDemoStore((state) => state.profile?.email ?? '');
  const signInDemo = useDemoStore((state) => state.signInDemo);
  const signInLocal = useDemoStore((state) => state.signInLocal);
  const [email, setEmail] = useState(profileEmail);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignInErrors>({});

  const submitLocalSignIn = () => {
    const nextErrors = validateSignIn({ email, password });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!signInLocal(email)) {
      router.push({
        pathname: '/(auth)/sign-up',
        params: { email: normalizeEmail(email), source: 'unknown-email' },
      });
    }
  };

  return (
    <AuthScreen
      description="Pick up a saved local profile or enter the ready-made demo."
      eyebrow="Welcome back"
      footer={
        <Button
          label="Create a local profile"
          onPress={() => router.push('/(auth)/sign-up')}
          variant="ghost"
        />
      }
      title="Training starts here."
    >
      <Button fullWidth label="Continue with demo profile" onPress={signInDemo} size="large" />

      <View style={styles.dividerRow}>
        <Divider style={styles.divider} />
        <Text tone="secondary" variant="caption">
          OR USE YOUR LOCAL PROFILE
        </Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.fields}>
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
          autoComplete="current-password"
          error={errors.password}
          label="Password"
          onChangeText={(value) => {
            setPassword(value);
            setErrors((current) => ({ ...current, password: undefined }));
          }}
          onSubmitEditing={submitLocalSignIn}
          returnKeyType="done"
          secureTextEntry
          textContentType="password"
          value={password}
        />
      </View>

      <Button fullWidth label="Sign in locally" onPress={submitLocalSignIn} variant="secondary" />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  divider: {
    flex: 1,
  },
  fields: {
    gap: spacing.x4,
  },
});
