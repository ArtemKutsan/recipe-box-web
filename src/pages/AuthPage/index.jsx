import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '@/entities/auth';
import { Authentication } from '@/features/authentication';
import { RouterPath } from '@/shared/config/routerPaths';

const AuthPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    // Авторизованному пользователю формы входа и регистрации уже не нужны.
    return <Navigate to={RouterPath.profile} replace />;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/auth-bg.png')" }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-screen items-center px-4 pb-4 pt-16 md:p-8">
        <Authentication />
      </div>
    </>
  );
};

export default AuthPage;
