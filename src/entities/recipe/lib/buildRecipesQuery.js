export const buildRecipesQuery = ({
  search = '',
  mealType = '',
  cuisine = '',
  tag = '',
  sortBy = '',
  order = 'asc',
  page = 1,
  pageSize = 0,
}) => ({
  search: search.trim().toLowerCase(),
  mealType: mealType.trim().toLowerCase(),
  cuisine: cuisine.trim().toLowerCase(),
  tag,
  sortBy,
  order,
  page,
  pageSize,
});
