import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Если пользователь открыл защищенную страницу напрямую, отправляем его на логин.
    return <Navigate to={RouterPath.login} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
