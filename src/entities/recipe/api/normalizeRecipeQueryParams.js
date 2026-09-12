export const normalizeRecipeQueryParams = ({
  search = '',
  mealType = '',
  cuisine = '',
  tag = '',
  sortBy = '',
  order = 'asc',
  page = 1,
  pageSize = 0,
} = {}) => {
  const normalizeString = (value) => String(value ?? '').trim().toLowerCase();
  const normalizePositiveInteger = (value, fallback) => {
    const number = Number(value);

    return Number.isInteger(number) && number > 0 ? number : fallback;
  };
  return {
    search: normalizeString(search),
    mealType: normalizeString(mealType),
    cuisine: normalizeString(cuisine),
    tag: normalizeString(tag),
    sortBy: String(sortBy ?? '').trim(),
    order: normalizeString(order) === 'desc' ? 'desc' : 'asc',
    page: normalizePositiveInteger(page, 1),
    pageSize: normalizePositiveInteger(pageSize, 0),
  };
};
