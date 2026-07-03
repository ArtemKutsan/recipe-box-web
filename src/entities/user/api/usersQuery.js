import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/shared/config/api';
import { toRecipeListResponse } from '@/entities/recipe/api/response';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (build) => ({
    getUserById: build.query({
      query: (userId) => `/users/${userId}`,
      transformResponse: (response) => response.user ?? null,
    }),
    getUserRecipes: build.query({
      query: (userId) => `/users/${userId}/recipes`,
      transformResponse: (response) => ({
        items: Array.isArray(response.items) ? response.items.map(toRecipeListResponse) : [],
        total: response.total ?? 0,
        cuisines: response.cuisines ?? [],
        page: response.page ?? 1,
        pageSize: response.pageSize ?? 20,
        totalPages: response.totalPages ?? 0,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useGetUserRecipesQuery } = usersApi;
