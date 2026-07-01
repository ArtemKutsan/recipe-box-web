import axios from 'axios';
import { API_BASE_URL } from '@/shared/config/api';
import { toRecipeListResponse } from './response';

const getRecipesEndpoint = ({ mealType, tag, search }) => {
  const params = new URLSearchParams();

  if (search) {
    params.set('q', search);
  }

  if (mealType) {
    params.set('mealType', mealType);
  }

  if (tag) {
    params.set('tag', tag);
  }

  return params.toString() ? `${API_BASE_URL}/recipes?${params.toString()}` : `${API_BASE_URL}/recipes`;
};

// Загружает список рецептов из нашего API с поддержкой поиска, фильтров, сортировки и пагинации.
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
  const pageSize = limit > 0 ? limit : 100;
  const page = pageSize ? Math.floor(skip / pageSize) + 1 : undefined;
  const { data } = await axios.get(endpoint, {
    params: {
      ...(sortBy ? { sortBy } : {}),
      ...(order ? { sortOrder: order } : {}),
      ...(page ? { page } : {}),
      ...(pageSize ? { pageSize } : {}),
    },
  });

  return Array.isArray(data.items) ? data.items.map(toRecipeListResponse) : [];
};
