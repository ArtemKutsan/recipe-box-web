import { createApi } from '@reduxjs/toolkit/query/react';
import { toRecipeListResponse } from '@/entities/recipe';
import { baseQuery } from '@/shared/api';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery,
  tagTypes: ['FavoriteRecipes'],
  endpoints: (build) => ({
    getFavorites: build.query({
      // Загружаем все легкие Favorite-связи один раз для глобального состояния.
      query: () => '/favorites',
      transformResponse: (response) => (Array.isArray(response.items) ? response.items : []),
    }),
    getFavoriteRecipes: build.query({
      // Полные карточки загружаются отдельно и постранично для раздела профиля.
      query: ({ page = 1, pageSize = 20 } = {}) =>
        `/favorites/recipes?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response) => ({
        items: Array.isArray(response.items)
          ? response.items.map((recipe) => ({
              ...toRecipeListResponse(recipe),
              isFavorite: recipe.isFavorite ?? true,
              savedAt: recipe.savedAt ?? null,
            }))
          : [],
        total: response.total ?? 0,
        page: response.page ?? 1,
        pageSize: response.pageSize ?? 20,
        totalPages: response.totalPages ?? 0,
      }),
      providesTags: ['FavoriteRecipes'],
    }),
    addFavorite: build.mutation({
      query: (recipeId) => ({
        url: `/favorites/${recipeId}`,
        method: 'PUT',
      }),
      transformResponse: (response) => response.favorite,
      invalidatesTags: ['FavoriteRecipes'],
    }),
    removeFavorite: build.mutation({
      query: (recipeId) => ({
        url: `/favorites/${recipeId}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.favorite,
      invalidatesTags: ['FavoriteRecipes'],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useGetFavoriteRecipesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoritesApi;
