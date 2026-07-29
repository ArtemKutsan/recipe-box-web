export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesStatus = (state) => state.favorites.status;
export const selectFavoritesError = (state) => state.favorites.error;

export const selectIsFavorite = (state, recipeId) =>
  state.favorites.items.some(
    (favorite) => String(favorite.recipeId) === String(recipeId),
  );
