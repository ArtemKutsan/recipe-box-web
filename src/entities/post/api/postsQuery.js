import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';
import { toPostResponse } from './response';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery,
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({ page = 1, pageSize = 10 } = {}) =>
        `/posts?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response) => ({
        items: Array.isArray(response.items) ? response.items.map(toPostResponse) : [],
        page: response.page ?? 1,
        pageSize: response.pageSize ?? 10,
        total: response.total ?? 0,
        totalPages: response.totalPages ?? 0,
      }),
      providesTags: (result) => {
        const items = Array.isArray(result?.items) ? result.items : [];

        return [
          { type: 'Posts', id: 'LIST' },
          ...items.map((post) => ({ type: 'Posts', id: post.id })),
        ];
      },
    }),
    getPostById: build.query({
      query: (postId) => `/posts/${postId}`,
      transformResponse: (response) => toPostResponse(response.post),
      providesTags: (_result, _error, postId) => [{ type: 'Posts', id: postId }],
    }),
    createPost: build.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      transformResponse: (response) => toPostResponse(response.post),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    updatePost: build.mutation({
      query: ({ postId, post }) => ({
        url: `/posts/${postId}`,
        method: 'PATCH',
        body: post,
      }),
      transformResponse: (response) => toPostResponse(response.post),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: 'Posts', id: 'LIST' },
        { type: 'Posts', id: postId },
      ],
    }),
    deletePost: build.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, postId) => [
        { type: 'Posts', id: 'LIST' },
        { type: 'Posts', id: postId },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
