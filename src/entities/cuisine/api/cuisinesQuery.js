import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const cuisinesApi = createApi({
  reducerPath: 'cuisinesApi',
  baseQuery,
  endpoints: (build) => ({
    getCuisines: build.query({
      query: () => '/cuisines',
      transformResponse: (response) => response.items ?? [],
    }),
  }),
});

export const { useGetCuisinesQuery } = cuisinesApi;
