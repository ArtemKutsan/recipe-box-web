import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/app/layouts/AuthLayout';
import MainLayout from '@/app/layouts/MainLayout';
import { PageLoader } from '@/shared/ui/PageLoader';
import ProtectedRoute from './ProtectedRoute';
import { routeConfig, RouteLayout } from './routeConfig';

const AppRouter = () => {
  const renderWithWrapper = (route) => {
    // Сначала собираем страницу с Suspense, а затем при необходимости закрываем ее auth-проверкой.
    const page = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;
    const protectedPage = route.protected ? <ProtectedRoute>{page}</ProtectedRoute> : page;
    const element =
      route.layout === RouteLayout.AUTH ? (
        <AuthLayout>{protectedPage}</AuthLayout>
      ) : (
        <MainLayout>{protectedPage}</MainLayout>
      );

    return <Route key={route.path} path={route.path} element={element} />;
  };

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
