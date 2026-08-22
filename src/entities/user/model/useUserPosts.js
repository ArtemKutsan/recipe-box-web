import { useGetUserPostsQuery } from '../api/usersQuery';

export const useUserPosts = (userId, queryParams = {}, options = {}) => {
  const query = useGetUserPostsQuery(
    {
      userId,
      isCurrentUser: options.isCurrentUser ?? false,
      ...queryParams,
    },
    { skip: options.skip || !userId },
  );
  const data = query.data ?? {};

  return {
    ...query,
    posts: data.items ?? [],
    total: data.total ?? 0,
    page: data.page ?? 1,
    pageSize: data.pageSize ?? 10,
    totalPages: data.totalPages ?? 0,
    status: query.isLoading ? 'loading' : query.isError ? 'failed' : 'succeeded',
    error: query.error?.data?.message ?? query.error?.message ?? null,
  };
};
