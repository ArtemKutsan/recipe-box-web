import { useGetRecipesQuery } from '@/entities/recipe/api/recipesQuery';

// Общий хук для запросов рецептов по фильтрам.
// Он не знает ничего про конкретный экран:
// только принимает queryParams/options, а наружу отдает уже удобные поля с recipes, total и cuisines.
export const useRecipesQuery = (queryParams = {}, options = {}) => {
  const query = useGetRecipesQuery(queryParams, options);
  const data = query.data ?? {};

  return {
    ...query,
    recipes: data.items ?? [],
    total: data.total ?? 0,
    cuisines: data.cuisines ?? [],
    page: data.page ?? 1,
    pageSize: data.pageSize ?? 20,
    totalPages: data.totalPages ?? 0,
  };
};
