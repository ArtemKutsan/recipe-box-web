/*
AppRoute хранит внутренние ключи маршрутов, а не адреса страниц.
Эти ключи используем дальше в RouterPath и routeConfig, чтобы не писать
одни и те же строковые названия в разных местах.
*/
export const AppRoute = {
  MAIN: 'main',
  RECIPES: 'recipes',
  POSTS: 'posts',
  CATEGORIES: 'categories',
  AUTH: 'auth',
  ADD_RECIPE: 'add_recipe',
  ADD_POST: 'add_post',
  MEAL_PLANNER: 'meal_planner',
  PROFILE: 'profile',
  USER_PROFILE: 'user_profile',
  POST_DETAIL: 'post_detail',
  EDIT_POST: 'edit_post',
  RECIPE_DETAIL: 'recipe_detail',
  EDIT_RECIPE: 'edit_recipe',
  NOT_FOUND: 'not_found',
};

/*
RouterPath хранит настоящие адреса страниц.
В адресах с :id пока находится шаблон: например, /recipes/:id.
Перед переходом helper-функции ниже заменяют :id на id нужного рецепта или пользователя.
*/
export const RouterPath = {
  [AppRoute.MAIN]: '/',
  [AppRoute.RECIPES]: '/recipes',
  [AppRoute.POSTS]: '/posts',
  [AppRoute.CATEGORIES]: '/categories',
  [AppRoute.AUTH]: '/auth',
  [AppRoute.ADD_RECIPE]: '/add-recipe',
  [AppRoute.ADD_POST]: '/add-post',
  [AppRoute.MEAL_PLANNER]: '/meal-planner',
  [AppRoute.PROFILE]: '/profile',
  [AppRoute.USER_PROFILE]: '/users/:id',
  [AppRoute.POST_DETAIL]: '/posts/:id',
  [AppRoute.EDIT_POST]: '/posts/:id/edit',
  [AppRoute.RECIPE_DETAIL]: '/recipes/:id',
  [AppRoute.EDIT_RECIPE]: '/recipes/:id/edit',
  [AppRoute.NOT_FOUND]: '*',
};

// Режим формы авторизации хранится в query-параметре страницы /auth.
export const AuthMode = {
  LOGIN: 'login',
  REGISTER: 'register',
};

// Login открывает /auth, а Register открывает /auth?mode=register.
export const buildAuthPath = (mode = AuthMode.LOGIN) =>
  mode === AuthMode.REGISTER ? `${RouterPath.auth}?mode=${AuthMode.REGISTER}` : RouterPath.auth;

/*
Здесь собираем адреса страниц с конкретными id, чтобы компоненты не делали replace сами.
Например, buildRecipePath(12) вернёт /recipes/12,
а buildEditRecipePath(12) вернёт /recipes/12/edit.
*/
export const buildRecipePath = (recipeId) => RouterPath.recipe_detail.replace(':id', recipeId);
export const buildEditRecipePath = (recipeId) => RouterPath.edit_recipe.replace(':id', recipeId);
export const buildUserProfilePath = (userId) => RouterPath.user_profile.replace(':id', userId);
export const buildPostPath = (postId) => RouterPath.post_detail.replace(':id', postId);
export const buildEditPostPath = (postId) => RouterPath.edit_post.replace(':id', postId);
