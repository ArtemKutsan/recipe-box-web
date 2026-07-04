import { useSelector } from 'react-redux';
import { selectAuthToken, selectAuthUser, useGetCurrentUserQuery } from '@/entities/auth';
import { PageLoader } from '@/shared/ui/PageLoader';

const AuthSessionProvider = ({ children }) => {
  const token = useSelector(selectAuthToken);
  const user = useSelector(selectAuthUser);
  const shouldRestoreSession = Boolean(token) && !user;
  const { isLoading, isFetching } = useGetCurrentUserQuery(undefined, {
    skip: !shouldRestoreSession,
  });

  if (shouldRestoreSession && (isLoading || isFetching)) {
    // Пока восстанавливаем пользователя по сохраненному токену, не показываем auth-only UI с пустым user.
    return <PageLoader />;
  }

  return children;
};

export default AuthSessionProvider;
