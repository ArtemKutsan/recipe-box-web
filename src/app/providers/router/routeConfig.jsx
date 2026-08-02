import MainPage from '@/pages/MainPage';
import RecipesPage from '@/pages/RecipesPage';
import CategoriesPage from '@/pages/CategoriesPage';
import AuthPage from '@/pages/AuthPage';
import AddRecipePage from '@/pages/AddRecipePage';
import MealPlannerPage from '@/pages/MealPlannerPage';
import ProfilePage from '@/pages/ProfilePage';
import RecipeDetailsPage from '@/pages/RecipeDetailsPage';
import EditRecipePage from '@/pages/EditRecipePage';
import NotFoundPage from '@/pages/NotFoundPage';
import { AppRoute, RouterPath } from '@/shared/config/routerPaths';

export const RouteLayout = {
  MAIN: 'main',
  AUTH: 'auth',
};

// Конфигурация маршрутов находится в app, потому что связывает пути с компонентами страниц
export const routeConfig = {
  [AppRoute.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRoute.RECIPES]: {
    path: RouterPath.recipes,
    element: <RecipesPage />,
  },
  [AppRoute.CATEGORIES]: {
    path: RouterPath.categories,
    element: <CategoriesPage />,
  },
  [AppRoute.AUTH]: {
    path: RouterPath.auth,
    element: <AuthPage />,
    layout: RouteLayout.AUTH,
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
