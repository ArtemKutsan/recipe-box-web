import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import { useGetFavoritesQuery } from '@/entities/favorite';

const FavoritesSessionProvider = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // После входа один раз загружаем Favorite-связи, а slice принимает fulfilled action.
  useGetFavoritesQuery(undefined, {
    skip: !isAuthenticated,
  });

  return children;
};

export default FavoritesSessionProvider;
