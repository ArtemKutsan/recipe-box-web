import { toRecipeListResponse } from './toRecipeListResponse';

// Детальная карточка использует тот же базовый контракт, но содержит полный список полей.
export function toRecipeDetailResponse(recipe) {
  return {
    ...toRecipeListResponse(recipe),
    authorNote: recipe.authorNote ?? '',
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
    images: Array.isArray(recipe.images) ? recipe.images : [],
    createdAt: recipe.createdAt ?? null,
    updatedAt: recipe.updatedAt ?? null,
  };
}
