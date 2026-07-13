import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';
import { toRecipeListResponse } from '@/entities/recipe/api/response';

const buildUserRecipesQuery = (userId, queryParams = {}) => {
  const params = new URLSearchParams();

  if (queryParams.search) {
    params.set('q', queryParams.search);
  }

  if (queryParams.mealType && queryParams.mealType !== 'All') {
    params.set('mealType', queryParams.mealType);
  }

  if (queryParams.cuisine) {
    params.set('cuisine', queryParams.cuisine);
  }

  if (queryParams.tag) {
    params.set('tag', queryParams.tag);
  }

  if (queryParams.sortBy) {
    params.set('sortBy', queryParams.sortBy);
  }

  if (queryParams.order) {
    params.set('sortOrder', queryParams.order);
  }

  if (queryParams.pageSize) {
    params.set('pageSize', queryParams.pageSize);
  }

  if (queryParams.page) {
    params.set('page', queryParams.page);
  }

  const queryString = params.toString();

  return queryString ? `/users/${userId}/recipes?${queryString}` : `/users/${userId}/recipes`;
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  endpoints: (build) => ({
    getUserById: build.query({
      query: (userId) => `/users/${userId}`,
      transformResponse: (response) => response.user ?? null,
    }),
    getUserRecipes: build.query({
      query: ({ userId, ...queryParams }) => buildUserRecipesQuery(userId, queryParams),
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
