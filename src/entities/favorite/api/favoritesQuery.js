import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery,
  endpoints: (build) => ({
    getFavorites: build.query({
      // Загружаем все легкие Favorite-связи один раз для глобального состояния.
      query: () => '/favorites',
      transformResponse: (response) => (Array.isArray(response.items) ? response.items : []),
    }),
    getFavoriteRecipes: build.query({
      // Полные карточки загружаются отдельно и постранично для будущего раздела профиля.
      query: ({ page = 1, pageSize = 20 } = {}) =>
        `/favorites/recipes?page=${page}&pageSize=${pageSize}`,
    }),
    addFavorite: build.mutation({
      query: (recipeId) => ({
        url: `/favorites/${recipeId}`,
        method: 'PUT',
      }),
      transformResponse: (response) => response.favorite,
    }),
    removeFavorite: build.mutation({
      query: (recipeId) => ({
        url: `/favorites/${recipeId}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.favorite,
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useGetFavoriteRecipesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoritesApi;
