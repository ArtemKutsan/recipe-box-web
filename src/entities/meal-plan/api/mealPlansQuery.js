import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const mealPlansApi = createApi({
  reducerPath: 'mealPlansApi',
  tagTypes: ['MealPlan'],
  baseQuery,
  endpoints: (build) => ({
    getCurrentMealPlan: build.query({
      // Backend сам определяет текущего пользователя по JWT и возвращает план текущей недели.
      query: () => '/meal-plans/current',
      transformResponse: (response) => response.mealPlan ?? null,
      providesTags: [{ type: 'MealPlan', id: 'CURRENT' }],
    }),
    updateCurrentMealPlanSlot: build.mutation({
      // Обновляем один слот, не отправляя всю неделю целиком.
      query: ({ day, mealPeriod, recipeId }) => ({
        url: '/meal-plans/current/slot',
        method: 'PATCH',
        body: {
          day,
          mealPeriod,
          recipeId,
        },
      }),
      transformResponse: (response) => response.mealPlan ?? null,
      invalidatesTags: [{ type: 'MealPlan', id: 'CURRENT' }],
    }),
  }),
});

export const { useGetCurrentMealPlanQuery, useUpdateCurrentMealPlanSlotMutation } = mealPlansApi;
