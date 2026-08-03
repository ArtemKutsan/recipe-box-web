import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/app/layouts/MainLayout';
import { PageLoader } from '@/shared/ui/PageLoader';
import ProtectedRoute from './ProtectedRoute';
import { routeConfig } from './routeConfig';

/*
Берём список маршрутов из routeConfig и собираем из него компоненты Route.
Сначала добавляем Suspense, затем при необходимости ProtectedRoute и нужный layout.
Если отдельный layout не указан, используем обычный MainLayout.
*/
const AppRouter = () => {
  /*
  Из одного объекта routeConfig собираем один Route.
  Например, /auth использует AuthLayout без проверки входа, а /meal-planner
  использует MainLayout и сначала проверяет, вошёл ли пользователь.
  */
  const renderRoute = (route) => {
    // Пока страница загружается, Suspense может показать PageLoader.
    const page = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;

    // Для protected: true сначала проверяем, вошёл ли пользователь.
    const protectedPage = route.protected ? <ProtectedRoute>{page}</ProtectedRoute> : page;

    // Берём layout из настроек маршрута или используем обычный MainLayout.
    const Layout = route.layout ?? MainLayout;
    const element = <Layout>{protectedPage}</Layout>;

    // Возвращаем готовый маршрут с адресом и собранной страницей.
    return <Route key={route.path} path={route.path} element={element} />;
  };

  /*
  После renderRoute маршруты выглядят примерно так:

  <Route
    path="/auth"
    element={<AuthLayout><Suspense><AuthPage /></Suspense></AuthLayout>}
  />

  <Route
    path="/meal-planner"
    element={
      <MainLayout>
        <ProtectedRoute><Suspense><MealPlannerPage /></Suspense></ProtectedRoute>
      </MainLayout>
    }
  />
  */

  // Для каждого объекта из routeConfig создаём отдельный Route.
  return <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>;
};

export default AppRouter;
