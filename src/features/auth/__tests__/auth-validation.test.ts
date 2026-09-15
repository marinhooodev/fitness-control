import { normalizeEmail, validateSignIn, validateSignUp } from '@/features/auth/auth-validation';

describe('local auth validation', () => {
  it('normalizes email without touching password data', () => {
    expect(normalizeEmail(' ALEX@CONTROL.DEMO ')).toBe('alex@control.demo');
    expect(validateSignIn({ email: 'alex@control.demo', password: '12345678' })).toEqual({});
  });

  it('rejects malformed sign-in fields', () => {
    expect(validateSignIn({ email: 'alex@', password: 'short' })).toEqual({
      email: 'Enter a valid email address.',
      password: 'Use at least 8 characters.',
    });
  });

  it('rejects an incomplete or mismatched sign-up', () => {
    expect(
      validateSignUp({
        name: ' ',
        email: 'invalid',
        password: '12345678',
        confirmPassword: 'different',
      }),
    ).toEqual({
      name: 'Enter your name.',
      email: 'Enter a valid email address.',
      confirmPassword: 'Passwords do not match.',
    });
  });
});
