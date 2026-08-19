import { useGetCurrentUserQuery } from '@/entities/auth';
import { PageLoader } from '@/shared/ui/PageLoader';

const AuthSessionProvider = ({ children }) => {
  // При старте проверяем cookie. Если её нет, backend вернёт 401 и приложение останется гостевым.
  const { isLoading, isUninitialized } = useGetCurrentUserQuery();

  if (isUninitialized || isLoading) {
    // Пока backend проверяет сессию, не показываем страницы с неправильным auth-состоянием.
    return <PageLoader />;
  }

  return children;
};

export default AuthSessionProvider;
