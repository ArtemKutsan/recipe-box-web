import { useGetUserByIdQuery } from '../api/usersQuery';

// Хук сущности для получения публичного профиля пользователя через наш API.
export const useUser = (userId) => {
  const query = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  return {
    user: query.data ?? null,
    status: query.isLoading ? 'loading' : query.isError ? 'failed' : query.isSuccess ? 'succeeded' : 'idle',
    error: query.error?.data?.message ?? query.error?.message ?? null,
  };
};
