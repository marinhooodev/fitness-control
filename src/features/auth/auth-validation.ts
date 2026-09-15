import { normalizeEmail } from '@/shared/utils/email';

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput extends SignInInput {
  name: string;
  confirmPassword: string;
}

export type SignInErrors = Partial<Record<keyof SignInInput, string>>;
export type SignUpErrors = Partial<Record<keyof SignUpInput, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string) {
  return emailPattern.test(normalizeEmail(email));
}

export { normalizeEmail };

export function isValidPassword(password: string) {
  return password.length >= 8;
}

export function validateSignIn({ email, password }: SignInInput): SignInErrors {
  const errors: SignInErrors = {};

  if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!isValidPassword(password)) {
    errors.password = 'Use at least 8 characters.';
  }

  return errors;
}

export function validateSignUp({
  name,
  email,
  password,
  confirmPassword,
}: SignUpInput): SignUpErrors {
  const errors: SignUpErrors = validateSignIn({ email, password });

  if (name.trim().length < 2) {
    errors.name = 'Enter your name.';
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}
