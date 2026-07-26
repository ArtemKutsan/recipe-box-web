// src/shared/config/routerPaths.js

// Определение маршрутов приложения с помощью констант и конфигурационного объекта
export const AppRoute = {
  MAIN: 'main',
  RECIPES: 'recipes',
  CATEGORIES: 'categories',
  LOGIN: 'login',
  REGISTER: 'register',
  ADD_RECIPE: 'add_recipe',
  MEAL_PLANNER: 'meal_planner',
  PROFILE: 'profile',
  USER_PROFILE: 'user_profile',
  RECIPE_DETAIL: 'recipe_detail',
  EDIT_RECIPE: 'edit_recipe',
  NOT_FOUND: 'not_found',
};

// Объект, который связывает каждую константу маршрута с его соответствующим маршрутом
export const RouterPath = {
  [AppRoute.MAIN]: '/',
  [AppRoute.RECIPES]: '/recipes',
  [AppRoute.CATEGORIES]: '/categories',
  [AppRoute.LOGIN]: '/login',
  [AppRoute.REGISTER]: '/register',
  [AppRoute.ADD_RECIPE]: '/add-recipe',
  [AppRoute.MEAL_PLANNER]: '/meal-planner',
  [AppRoute.PROFILE]: '/profile',
  [AppRoute.USER_PROFILE]: '/users/:id',
  [AppRoute.RECIPE_DETAIL]: '/recipes/:id',
  [AppRoute.EDIT_RECIPE]: '/recipes/:id/edit',
  [AppRoute.NOT_FOUND]: '*',
};

// Helper-ы для динамических UI-маршрутов, чтобы страницы не собирали URL вручную.
export const buildRecipePath = (recipeId) => RouterPath.recipe_detail.replace(':id', recipeId);
export const buildEditRecipePath = (recipeId) =>
  RouterPath.edit_recipe.replace(':id', recipeId);
export const buildUserProfilePath = (userId) => RouterPath.user_profile.replace(':id', userId);
