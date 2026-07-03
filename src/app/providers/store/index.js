import { configureStore } from '@reduxjs/toolkit';
import { mealTypesApi } from '@/entities/meal-type';
import { cuisinesApi } from '@/entities/cuisine';
import { recipesApi } from '@/entities/recipe/api/recipesQuery';
import { usersApi } from '@/entities/user';
import { mealPlanReducer } from '@/features/meal-planner';

export const store = configureStore({
  reducer: {
    mealPlan: mealPlanReducer,
    [mealTypesApi.reducerPath]: mealTypesApi.reducer,
    [cuisinesApi.reducerPath]: cuisinesApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      mealTypesApi.middleware,
      cuisinesApi.middleware,
      recipesApi.middleware,
      usersApi.middleware,
    ),
});
