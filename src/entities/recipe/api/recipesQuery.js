import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/shared/config/api';
import { toRecipeListResponse } from '@/entities/recipe/api/response';

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (build) => ({
    getRecipes: build.query({
      // Собираем query string только из тех фильтров, которые реально нужны текущему экрану.
      // mealType и cuisine идут в backend как slug, page/pageSize нужны для списка рецептов,
      // а сам ответ backend возвращает и items, и список cuisines для экрана категорий.
      query: ({ mealType, cuisine, pageSize, page } = {}) => {
        const params = new URLSearchParams();

        if (mealType && mealType !== 'All') {
          params.set('mealType', mealType);
        }

        if (cuisine) {
          params.set('cuisine', cuisine);
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
    }),
  }),
});

export const { useGetRecipesQuery } = recipeApi;
