import { configureStore } from '@reduxjs/toolkit';
import { authApi, authReducer } from '@/entities/auth';
import { mealTypesApi } from '@/entities/meal-type';
import { cuisinesApi } from '@/entities/cuisine';
import { commentsApi } from '@/entities/comment';
import { mealPlansApi } from '@/entities/meal-plan';
import { postsApi } from '@/entities/post';
import { recipesApi } from '@/entities/recipe/api/recipesQuery';
import { usersApi } from '@/entities/user';
import { favoritesApi, favoritesReducer } from '@/entities/favorite';
import { feedApi } from '@/entities/feed';
import { mediaApi } from '@/entities/media';
import { apiErrorMiddleware } from './apiErrorMiddleware';
import { sessionCleanupMiddleware } from './sessionCleanupMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    [authApi.reducerPath]: authApi.reducer,
    [mealTypesApi.reducerPath]: mealTypesApi.reducer,
    [cuisinesApi.reducerPath]: cuisinesApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [mealPlansApi.reducerPath]: mealPlansApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      mealTypesApi.middleware,
      cuisinesApi.middleware,
      commentsApi.middleware,
      mealPlansApi.middleware,
      postsApi.middleware,
      recipesApi.middleware,
      usersApi.middleware,
      favoritesApi.middleware,
      feedApi.middleware,
      mediaApi.middleware,
      sessionCleanupMiddleware,
      apiErrorMiddleware,
    ),
});
