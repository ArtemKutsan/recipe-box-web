// Приводим рецепт из backend-контракта к формату, который уже ждут страницы.
export function toRecipeResponse(recipe) {
  const id = recipe.id ?? recipe.publicId ?? null;
  const title = recipe.title ?? '';

  return {
    id,
    title,
    description: recipe.description ?? '',
    mealType: Array.isArray(recipe.mealType)
      ? recipe.mealType
      : Array.isArray(recipe.mealTypeIds)
        ? recipe.mealTypeIds
        : [],
    tags: Array.isArray(recipe.tags) ? recipe.tags : [],
    cuisine: recipe.cuisine ?? null,
    visibility: recipe.visibility ?? 'public',
    caloriesPerServing: recipe.caloriesPerServing ?? null,
    prepTimeMinutes: recipe.prepTimeMinutes ?? null,
    cookTimeMinutes: recipe.cookTimeMinutes ?? null,
    servings: recipe.servings ?? null,
    difficulty: recipe.difficulty ?? null,
    rating: recipe.rating ?? null,
    image: recipe.thumbnailUrl ?? recipe.image ?? null,
    thumbnailKey: recipe.thumbnailKey ?? null,
    userId: recipe.author?.id ?? recipe.authorId ?? recipe.userId ?? null,
    author: recipe.author ?? null,
  };
}
