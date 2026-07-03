import { AUTH_TOKEN_STORAGE_KEY } from '@/shared/config/auth';

export const readStoredToken = () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const saveToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
};
