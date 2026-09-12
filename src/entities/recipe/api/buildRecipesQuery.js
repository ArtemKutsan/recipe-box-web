export const buildRecipesQuery = ({
  search,
  mealType,
  cuisine,
  tag,
  sortBy,
  order,
  pageSize,
  page,
} = {}) => {
  const params = new URLSearchParams();

  if (search) {
    params.set('q', search);
  }

  if (mealType && mealType !== 'All') {
    params.set('mealType', mealType);
  }

  if (cuisine) {
    params.set('cuisine', cuisine);
  }

  if (tag) {
    params.set('tag', tag);
  }

  if (sortBy) {
    params.set('sortBy', sortBy);
  }

  if (order) {
    params.set('sortOrder', order);
  }

  if (pageSize) {
    params.set('pageSize', pageSize);
  }

  if (page) {
    params.set('page', page);
  }

  return params.toString();
};
