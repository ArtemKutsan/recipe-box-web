import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';
import { toRecipeListResponse } from '@/entities/recipe';
import { toPostResponse } from '@/entities/post';
import { setCurrentUser } from '@/entities/auth';

const buildUserRecipesQuery = (userId, queryParams = {}, isCurrentUser = false) => {
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
  const path = isCurrentUser ? '/users/me/recipes' : `/users/${userId}/recipes`;

  return queryString ? `${path}?${queryString}` : path;
};

const buildUserPostsQuery = (userId, queryParams = {}, isCurrentUser = false) => {
  const params = new URLSearchParams();

  if (queryParams.pageSize) {
    params.set('pageSize', queryParams.pageSize);
  }

  if (queryParams.page) {
    params.set('page', queryParams.page);
  }

  const queryString = params.toString();
  const path = isCurrentUser ? '/users/me/posts' : `/users/${userId}/posts`;

  return queryString ? `${path}?${queryString}` : path;
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
      // Для своего профиля используем защищённый маршрут, который возвращает и приватные рецепты.
      query: ({ userId, isCurrentUser = false, ...queryParams }) =>
        buildUserRecipesQuery(userId, queryParams, isCurrentUser),
      transformResponse: (response) => ({
        items: Array.isArray(response.items) ? response.items.map(toRecipeListResponse) : [],
        total: response.total ?? 0,
        cuisines: response.cuisines ?? [],
        page: response.page ?? 1,
        pageSize: response.pageSize ?? 20,
        totalPages: response.totalPages ?? 0,
      }),
    }),
    getUserPosts: build.query({
      query: ({ userId, isCurrentUser = false, ...queryParams }) =>
        buildUserPostsQuery(userId, queryParams, isCurrentUser),
      transformResponse: (response) => ({
        items: Array.isArray(response.items) ? response.items.map(toPostResponse) : [],
        total: response.total ?? 0,
        page: response.page ?? 1,
        pageSize: response.pageSize ?? 10,
        totalPages: response.totalPages ?? 0,
      }),
    }),
    updateMyAvatar: build.mutation({
      query: (avatarKey) => ({
        url: '/users/me/avatar',
        method: 'PATCH',
        body: { avatarKey },
      }),
      transformResponse: (response) => response.user ?? null,
      async onQueryStarted(_avatarKey, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch {
          // Ошибку показа аватара обрабатывает ProfilePage.
        }
      },
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserRecipesQuery,
  useGetUserPostsQuery,
  useUpdateMyAvatarMutation,
} = usersApi;
