import { configureStore } from '@reduxjs/toolkit';
import { mealTypesApi } from '@/entities/meal-type';
import { cuisinesApi } from '@/entities/cuisine';
import { recipesApi } from '@/entities/recipe/api/recipesQuery';
import { usersReducer } from '@/entities/user';
import { mealPlanReducer } from '@/features/meal-planner';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    mealPlan: mealPlanReducer,
    [mealTypesApi.reducerPath]: mealTypesApi.reducer,
    [cuisinesApi.reducerPath]: cuisinesApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealTypesApi.middleware, cuisinesApi.middleware, recipesApi.middleware),
});
