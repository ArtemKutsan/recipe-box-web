import MainPage from '@/pages/MainPage';
import RecipesPage from '@/pages/RecipesPage';
import PostsPage from '@/pages/PostsPage';
import CategoriesPage from '@/pages/CategoriesPage';
import AuthPage from '@/pages/AuthPage';
import AuthLayout from '@/app/layouts/AuthLayout';
import AddRecipePage from '@/pages/AddRecipePage';
import MealPlannerPage from '@/pages/MealPlannerPage';
import ProfilePage from '@/pages/ProfilePage';
import RecipeDetailsPage from '@/pages/RecipeDetailsPage';
import EditRecipePage from '@/pages/EditRecipePage';
import NotFoundPage from '@/pages/NotFoundPage';
import { AppRoute, RouterPath } from '@/shared/config/routerPaths';

/*
Здесь собраны маршруты приложения.
path — адрес страницы, element — сама страница.
protected: true означает, что открыть страницу можно только после входа.
layout нужен для страниц с отдельным оформлением, например /auth.
Если layout не указан, AppRouter использует MainLayout.
*/
export const routeConfig = {
  [AppRoute.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRoute.RECIPES]: {
    path: RouterPath.recipes,
    element: <RecipesPage />,
  },
  [AppRoute.POSTS]: {
    path: RouterPath.posts,
    element: <PostsPage />,
  },
  [AppRoute.CATEGORIES]: {
    path: RouterPath.categories,
    element: <CategoriesPage />,
  },
  [AppRoute.AUTH]: {
    path: RouterPath.auth,
    element: <AuthPage />,
    layout: AuthLayout,
  },
  [AppRoute.ADD_RECIPE]: {
    path: RouterPath.add_recipe,
    element: <AddRecipePage />,
    protected: true,
  },
  [AppRoute.MEAL_PLANNER]: {
    path: RouterPath.meal_planner,
    element: <MealPlannerPage />,
    protected: true,
  },
  [AppRoute.PROFILE]: {
    path: RouterPath.profile,
    element: <ProfilePage />,
    protected: true,
  },
  [AppRoute.USER_PROFILE]: {
    path: RouterPath.user_profile,
    element: <ProfilePage />,
  },
  [AppRoute.RECIPE_DETAIL]: {
    path: RouterPath.recipe_detail,
    element: <RecipeDetailsPage />,
  },
  [AppRoute.EDIT_RECIPE]: {
    path: RouterPath.edit_recipe,
    element: <EditRecipePage />,
    protected: true,
  },
  [AppRoute.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
