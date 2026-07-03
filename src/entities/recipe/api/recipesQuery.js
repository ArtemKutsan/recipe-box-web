import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/shared/config/api';
import { toRecipeDetailResponse, toRecipeListResponse } from '@/entities/recipe/api/response';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  tagTypes: ['Recipes'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (build) => ({
    getRecipes: build.query({
      // Собираем query string только из тех фильтров, которые реально нужны текущему экрану.
      // mealType, cuisine и tag идут в backend как slug, search/sort управляют списком,
      // page/pageSize нужны для пагинации, а сам ответ backend возвращает items и cuisines.
      query: ({ search, mealType, cuisine, tag, sortBy, order, pageSize, page } = {}) => {
        const params = new URLSearchParams();

        if (search) {
          params.set('q', search);
        }

        if (mealType && mealType !== 'All') {
          params.set('mealType', mealType);
        }

        if (cuisine) {
          params.set('cuisine', cuisine);
        }

        if (tag) {
          params.set('tag', tag);
        }

        if (sortBy) {
          params.set('sortBy', sortBy);
        }

        if (order) {
          params.set('sortOrder', order);
        }

        if (pageSize) {
          params.set('pageSize', pageSize);
        }

        if (page) {
          params.set('page', page);
        }

        const query = params.toString();

        return query ? `/recipes?${query}` : '/recipes';
      },
      // Приводим backend-ответ к удобной форме для фронта:
      // - items: готовые карточки рецептов
      // - total/page/pageSize/totalPages: метаданные для пагинации и подсчета
      // - cuisines: список кухонь, который CategoriesPage использует после выбора mealType
      transformResponse: (response) => ({
        items: Array.isArray(response.items) ? response.items.map(toRecipeListResponse) : [],
        total: response.total ?? 0,
        cuisines: response.cuisines ?? [],
        page: response.page ?? 1,
        pageSize: response.pageSize ?? 20,
        totalPages: response.totalPages ?? 0,
      }),
      providesTags: (result) => {
        const items = Array.isArray(result?.items) ? result.items : [];

        return [{ type: 'Recipes', id: 'LIST' }, ...items.map((recipe) => ({ type: 'Recipes', id: recipe.id }))];
      },
    }),
    getRecipeById: build.query({
      query: (recipeId) => `/recipes/${recipeId}`,
      transformResponse: (response) => toRecipeDetailResponse(response.recipe),
      providesTags: (_result, _error, recipeId) => [{ type: 'Recipes', id: recipeId }],
    }),
    createRecipe: build.mutation({
      query: (recipe) => ({
        url: '/recipes',
        method: 'POST',
        body: recipe,
      }),
      transformResponse: (response) => toRecipeDetailResponse(response.recipe),
      invalidatesTags: [{ type: 'Recipes', id: 'LIST' }],
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeByIdQuery, useCreateRecipeMutation } = recipesApi;
