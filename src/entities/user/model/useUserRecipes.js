import { useGetUserRecipesQuery } from '../api/usersQuery';

// Хук сущности для получения рецептов публичного профиля пользователя через наш API.
export const useUserRecipes = (userId) => {
  const query = useGetUserRecipesQuery(userId, {
    skip: !userId,
  });

  return {
    recipes: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    cuisines: query.data?.cuisines ?? [],
    page: query.data?.page ?? 1,
    pageSize: query.data?.pageSize ?? 20,
    totalPages: query.data?.totalPages ?? 0,
    status: query.isLoading ? 'loading' : query.isError ? 'failed' : query.isSuccess ? 'succeeded' : 'idle',
    error: query.error?.data?.message ?? query.error?.message ?? null,
  };
};
