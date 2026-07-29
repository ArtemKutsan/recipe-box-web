import { configureStore } from '@reduxjs/toolkit';
import { authApi, authReducer } from '@/entities/auth';
import { mealTypesApi } from '@/entities/meal-type';
import { cuisinesApi } from '@/entities/cuisine';
import { mealPlansApi } from '@/entities/meal-plan';
import { recipesApi } from '@/entities/recipe/api/recipesQuery';
import { usersApi } from '@/entities/user';
import { favoritesApi, favoritesReducer } from '@/entities/favorite';
import { apiErrorMiddleware } from './apiErrorMiddleware';
import { sessionCleanupMiddleware } from './sessionCleanupMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    [authApi.reducerPath]: authApi.reducer,
    [mealTypesApi.reducerPath]: mealTypesApi.reducer,
    [cuisinesApi.reducerPath]: cuisinesApi.reducer,
    [mealPlansApi.reducerPath]: mealPlansApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      mealTypesApi.middleware,
      cuisinesApi.middleware,
      mealPlansApi.middleware,
      recipesApi.middleware,
      usersApi.middleware,
      favoritesApi.middleware,
      sessionCleanupMiddleware,
      apiErrorMiddleware,
    ),
});
