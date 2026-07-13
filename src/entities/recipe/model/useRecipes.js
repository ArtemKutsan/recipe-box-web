import { useRecipesQuery } from './useRecipesQuery';

const DEFAULT_RECIPES_PAGE_SIZE = 100;

// Хук сущности для получения общего списка рецептов через RTK Query.
// Если фильтры не переданы, запрашиваем первый pageSize блока, чтобы сохранить прежнее поведение экранов.
export const useRecipes = (queryParams = null, options = {}) => {
  const normalizedQueryParams = queryParams ?? { pageSize: DEFAULT_RECIPES_PAGE_SIZE };
  const query = useRecipesQuery(normalizedQueryParams, options);

  return {
    recipes: query.recipes,
    status: query.isLoading ? 'loading' : query.isError ? 'failed' : 'succeeded',
    error: query.error?.data?.message ?? query.error?.message ?? null,
  };
};
