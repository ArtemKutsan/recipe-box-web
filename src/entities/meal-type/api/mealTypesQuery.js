import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/shared/config/api';

export const mealTypesApi = createApi({
  reducerPath: 'mealTypesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (build) => ({
    getMealTypes: build.query({
      query: () => '/meal-types',
      transformResponse: (response) => response.items ?? [],
    }),
  }),
});

export const { useGetMealTypesQuery } = mealTypesApi;
