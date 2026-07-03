import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const mealTypesApi = createApi({
  reducerPath: 'mealTypesApi',
  baseQuery,
  endpoints: (build) => ({
    getMealTypes: build.query({
      query: () => '/meal-types',
      transformResponse: (response) => response.items ?? [],
    }),
  }),
});

export const { useGetMealTypesQuery } = mealTypesApi;
