import { createApi } from '@reduxjs/toolkit/query/react';
import { toPostResponse } from '@/entities/post';
import { toRecipeListResponse } from '@/entities/recipe';
import { baseQuery } from '@/shared/api';

function toFeedItemResponse(item) {
  if (item?.type === 'post') {
    return {
      type: 'post',
      publishedAt: item.publishedAt ?? null,
      post: toPostResponse(item.post),
    };
  }

  if (item?.type === 'recipe') {
    return {
      type: 'recipe',
      publishedAt: item.publishedAt ?? null,
      recipe: toRecipeListResponse(item.recipe),
    };
  }

  return null;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery,
  tagTypes: ['Feed'],
  endpoints: (build) => ({
    getFeed: build.query({
      query: ({ page = 1, pageSize = 10 } = {}) => `/feed?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response) => ({
        items: Array.isArray(response.items)
          ? response.items.map(toFeedItemResponse).filter(Boolean)
          : [],
        page: response.page ?? 1,
        pageSize: response.pageSize ?? 10,
        total: response.total ?? 0,
        totalPages: response.totalPages ?? 0,
      }),
      providesTags: [{ type: 'Feed', id: 'LIST' }],
    }),
  }),
});

export const { useGetFeedQuery } = feedApi;
