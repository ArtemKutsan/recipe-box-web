import axios from 'axios';
import { normalizeMealType } from '../lib/normalizeMealType';

const getRecipesEndpoint = ({ mealType, tag, search }) => {
  if (mealType) {
    const normalizedMealType = normalizeMealType(mealType).toLowerCase();

    return `https://dummyjson.com/recipes/meal-type/${encodeURIComponent(normalizedMealType)}`;
  }

  if (tag) {
    return `https://dummyjson.com/recipes/tag/${encodeURIComponent(tag)}`;
  }

  if (search) {
    return 'https://dummyjson.com/recipes/search';
  }

  return 'https://dummyjson.com/recipes';
};

// Загружает список рецептов из временного API с поддержкой поиска, фильтров, сортировки и пагинации
export const getRecipes = async ({
  search = '',
  mealType = '',
  tag = '',
  sortBy = '',
  order = '',
  limit = 0,
  skip = 0,
} = {}) => {
  const endpoint = getRecipesEndpoint({ mealType, tag, search });
  const { data } = await axios.get(endpoint, {
    params: {
      ...(search && !mealType && !tag ? { q: search } : {}),
      ...(sortBy ? { sortBy } : {}),
      ...(order ? { order } : {}),
      limit,
      skip,
    },
  });

  return data.recipes;
};
