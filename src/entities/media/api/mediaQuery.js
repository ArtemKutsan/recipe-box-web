import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

export const mediaApi = createApi({
  reducerPath: 'mediaApi',
  baseQuery,
  endpoints: (build) => ({
    createPresignedUpload: build.mutation({
      // Сначала просим backend подготовить временную ссылку для S3.
      query: ({ purpose, contentType, sizeBytes }) => ({
        url: '/uploads/presign',
        method: 'POST',
        body: {
          purpose,
          contentType,
          sizeBytes,
        },
      }),
    }),
  }),
});

export const { useCreatePresignedUploadMutation } = mediaApi;
