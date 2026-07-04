import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/shared/ui/PageLoader';
import ProtectedRoute from './ProtectedRoute';
import { routeConfig } from './routeConfig';

const AppRouter = () => {
  const renderWithWrapper = (route) => {
    // Сначала собираем страницу с Suspense, а затем при необходимости закрываем ее auth-проверкой.
    const page = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;
    const element = route.protected ? <ProtectedRoute>{page}</ProtectedRoute> : page;

    return <Route key={route.path} path={route.path} element={element} />;
  };

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
