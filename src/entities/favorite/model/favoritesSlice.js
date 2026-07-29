import { createSlice } from '@reduxjs/toolkit';
import { favoritesApi } from '../api/favoritesQuery';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

function addOrReplaceFavorite(items, favorite) {
  const nextItems = items.filter(
    ({ recipeId }) => String(recipeId) !== String(favorite.recipeId),
  );

  nextItems.unshift(favorite);
  return nextItems;
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(favoritesApi.endpoints.getFavorites.matchPending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher(favoritesApi.endpoints.getFavorites.matchFulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addMatcher(favoritesApi.endpoints.getFavorites.matchRejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.payload?.data?.message ?? action.error?.message ?? 'Failed to load favorites';
      })
      .addMatcher(favoritesApi.endpoints.addFavorite.matchFulfilled, (state, action) => {
        state.items = addOrReplaceFavorite(state.items, action.payload);
      })
      .addMatcher(favoritesApi.endpoints.removeFavorite.matchFulfilled, (state, action) => {
        state.items = state.items.filter(
          ({ recipeId }) => String(recipeId) !== String(action.payload.recipeId),
        );
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
