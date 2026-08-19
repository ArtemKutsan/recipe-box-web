import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/shared/config/api';
import { AUTH_TOKEN_STORAGE_KEY } from '@/shared/config/auth';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  // Разрешаем браузеру принимать и отправлять HttpOnly session cookie.
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // Сначала берем токен из Redux, а после перезагрузки страницы подстраховываемся localStorage.
    const token = getState().auth?.token ?? localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
