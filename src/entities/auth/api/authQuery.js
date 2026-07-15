import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';
import { setCredentials, setCurrentUser } from '../model/authSlice';

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
          // После успешного логина сохраняем пользователя и JWT в auth state.
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
          // Регистрация сразу авторизует пользователя, потому backend возвращает token.
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
          // /auth/me восстанавливает пользователя по уже сохраненному токену.
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch {
          // Ошибки обрабатывает общий middleware на уровне store.
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } = authApi;
