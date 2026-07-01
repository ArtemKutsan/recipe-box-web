import axios from 'axios';
import { API_BASE_URL } from '@/shared/config/api';
import { toRecipeDetailResponse } from './response';

// Загружает один рецепт по ID через наш API и приводит ответ к формату страницы.
export const getRecipeById = async (recipeId) => {
  const { data } = await axios.get(`${API_BASE_URL}/recipes/${recipeId}`);

  return toRecipeDetailResponse(data.recipe);
};
