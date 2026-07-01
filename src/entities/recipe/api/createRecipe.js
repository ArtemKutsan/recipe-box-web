import axios from 'axios';

// Отправляет новый рецепт во временный API.
export const createRecipeRequest = async (recipe) => {
  const { data } = await axios.post('https://dummyjson.com/recipes/add', recipe);

  return data;
};
