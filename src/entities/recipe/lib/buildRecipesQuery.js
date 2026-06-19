export const buildRecipesQuery = ({
  search = '',
  mealType = '',
  tag = '',
  sortBy = '',
  order = 'asc',
  page = 1,
  pageSize = 0,
}) => ({
  search: search.trim().toLowerCase(),
  mealType,
  tag,
  sortBy,
  order,
  limit: pageSize,
  skip: pageSize ? (page - 1) * pageSize : 0,
});
