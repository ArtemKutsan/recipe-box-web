import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments'],
  baseQuery,
  endpoints: (build) => ({
    getComments: build.query({
      query: ({ targetType, targetId, page = 1, pageSize = 10 }) =>
        `/${targetType === 'recipe' ? 'recipes' : 'posts'}/${targetId}/comments?page=${page}&pageSize=${pageSize}`,
      providesTags: (_result, _error, { targetType, targetId }) => [
        { type: 'Comments', id: `${targetType}-${targetId}` },
      ],
    }),
    createComment: build.mutation({
      query: ({ targetType, targetId, body, parentCommentId = null }) => ({
        url: `/${targetType === 'recipe' ? 'recipes' : 'posts'}/${targetId}/comments`,
        method: 'POST',
        body: { body, parentCommentId },
      }),
      invalidatesTags: (_result, _error, { targetType, targetId }) => [
        { type: 'Comments', id: `${targetType}-${targetId}` },
      ],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentsApi;
