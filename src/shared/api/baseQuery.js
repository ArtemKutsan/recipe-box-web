import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/shared/config/api';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  // Разрешаем браузеру принимать и отправлять HttpOnly session cookie.
  credentials: 'include',
});
