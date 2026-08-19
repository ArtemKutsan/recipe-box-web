import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';
import { clearCredentials, setCurrentUser } from '../model/authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    register: build.mutation({
      query: (payload) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
    }),
    getCurrentUser: build.query({
      query: () => '/auth/me',
      transformResponse: (response) => response.user ?? null,
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          // /auth/me восстанавливает пользователя по session cookie.
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch (error) {
          // Если cookie и старый JWT недействительны, оставляем приложение в состоянии гостя.
          if (error?.error?.status === 401) {
            dispatch(clearCredentials());
          }
        }
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
        } catch {
          // При ошибке сети состояние авторизации не очищаем.
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetCurrentUserQuery,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;
