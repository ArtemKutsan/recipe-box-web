import { useGetUserRecipesQuery } from '../api/usersQuery';

// Хук сущности для получения рецептов публичного профиля пользователя через наш API.
const hasQueryFilters = (value) =>
  Boolean(value) &&
  typeof value === 'object' &&
  ['search', 'mealType', 'cuisine', 'tag', 'sortBy', 'order', 'page', 'pageSize'].some(
    (key) => key in value,
  );

export const useUserRecipes = (userId, queryParamsOrOptions = {}, maybeOptions = {}) => {
  const hasFilters = hasQueryFilters(queryParamsOrOptions);
  const queryParams = hasFilters ? queryParamsOrOptions : {};
  const options = hasFilters ? maybeOptions : queryParamsOrOptions;

  const query = useGetUserRecipesQuery(
    {
      userId,
      isCurrentUser: options.isCurrentUser ?? false,
      ...queryParams,
    },
    {
      skip: options.skip || !userId,
    },
  );

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
