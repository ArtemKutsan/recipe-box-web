export const AUTH_NAME_MIN_LENGTH = 2;
export const AUTH_PASSWORD_MIN_LENGTH = 8;
export const AUTH_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const authFieldRules = {
  name: {
    required: 'Name is required',
    minLength: {
      value: AUTH_NAME_MIN_LENGTH,
      message: `Name must be at least ${AUTH_NAME_MIN_LENGTH} characters long`,
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: AUTH_EMAIL_PATTERN,
      message: 'Email must be a valid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: AUTH_PASSWORD_MIN_LENGTH,
      message: `Password must be at least ${AUTH_PASSWORD_MIN_LENGTH} characters long`,
    },
  },
};
