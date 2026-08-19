import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';
import { clearCredentials, setCredentials, setCurrentUser } from '../model/authSlice';

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
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          // После логина сохраняем переходный JWT и пользователя в auth state.
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // Ошибку логина оставляем в RTK Query state, чтобы UI сам решил, как ее показать.
        }
      },
    }),
    register: build.mutation({
      query: (payload) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          // Регистрация сразу авторизует пользователя и ставит session cookie.
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // Ошибку регистрации оставляем в RTK Query state, чтобы UI сам решил, как ее показать.
        }
      },
    }),
    getCurrentUser: build.query({
      query: () => '/auth/me',
      transformResponse: (response) => response.user ?? null,
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          // /auth/me восстанавливает пользователя по cookie или переходному JWT.
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch {
          // Ошибки обрабатывает общий middleware на уровне store.
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
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;
