import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/shared/config/api';

export const cuisinesApi = createApi({
  reducerPath: 'cuisinesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (build) => ({
    getCuisines: build.query({
      query: () => '/cuisines',
      transformResponse: (response) => response.items ?? [],
    }),
  }),
});

export const { useGetCuisinesQuery } = cuisinesApi;
