import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const mealPlansApi = createApi({
  reducerPath: 'mealPlansApi',
  baseQuery,
  endpoints: (build) => ({
    getCurrentMealPlan: build.query({
      // Backend сам определяет текущего пользователя по JWT и возвращает план текущей недели.
      query: () => '/meal-plans/current',
      transformResponse: (response) => response.mealPlan ?? null,
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
      /*
      RTK Query вызывает onQueryStarted сразу после запуска PATCH.
      _slot содержит day, mealPeriod и recipeId отправленного изменения, но здесь
      не используется, потому что backend возвращает весь актуальный план.
      queryFulfilled завершается после успешного ответа и отдаёт уже обработанный
      transformResponse объект. После этого через dispatch локально заменяем
      cache getCurrentMealPlan, не отправляя повторный GET.
      */
      onQueryStarted: async (_slot, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedMealPlan } = await queryFulfilled;

          // PATCH уже вернул актуальный план, поэтому обновляем cache без повторного GET.
          dispatch(
            mealPlansApi.util.upsertQueryData('getCurrentMealPlan', undefined, updatedMealPlan),
          );
        } catch {
          // Ошибку mutation обрабатывает компонент, cache при этом не меняется.
        }
      },
    }),
  }),
});

export const { useGetCurrentMealPlanQuery, useUpdateCurrentMealPlanSlotMutation } = mealPlansApi;
