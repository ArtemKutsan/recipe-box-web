import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery,
  endpoints: (build) => ({
    search: build.query({
      query: (query) => `/search?q=${encodeURIComponent(query)}`,
      transformResponse: (response) => ({
        query: response.query ?? '',
        recipes: Array.isArray(response.recipes) ? response.recipes : [],
        posts: Array.isArray(response.posts) ? response.posts : [],
        users: Array.isArray(response.users) ? response.users : [],
      }),
    }),
  }),
});

export const { useSearchQuery } = searchApi;
