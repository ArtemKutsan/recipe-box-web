import { useGetRecipeByIdQuery } from '../api/recipesQuery';

// Хук сущности для получения одного рецепта через RTK Query.
export const useRecipe = (recipeId) => {
  const query = useGetRecipeByIdQuery(recipeId, {
    skip: !recipeId,
  });

  return {
    recipe: query.data ?? null,
    status: query.isLoading ? 'loading' : query.isError ? 'failed' : query.isSuccess ? 'succeeded' : 'idle',
    error: query.error?.data?.message ?? query.error?.message ?? null,
  };
};
