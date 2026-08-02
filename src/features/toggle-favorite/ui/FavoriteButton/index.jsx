import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import {
  selectIsFavorite,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '@/entities/favorite';
import { RouterPath } from '@/shared/config/routerPaths';
import { cn } from '@/shared/lib/cn';
import LikeIcon from '@/assets/icons/like.svg?react';
import LikeFilledIcon from '@/assets/icons/like-filled.svg?react';

const FavoriteButton = ({ recipeId, className }) => {
  const [isHoverPreviewDisabled, setIsHoverPreviewDisabled] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isFavorite = useSelector((state) => selectIsFavorite(state, recipeId));
  const [addFavorite, addState] = useAddFavoriteMutation();
  const [removeFavorite, removeState] = useRemoveFavoriteMutation();
  const isLoading = addState.isLoading || removeState.isLoading;
  const isDisplayedAsFavorite = isFavorite && !removeState.isLoading;
  const canShowHoverPreview = !isDisplayedAsFavorite && !isHoverPreviewDisabled;

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      navigate(RouterPath.auth);
      return;
    }

    if (isFavorite) {
      setIsHoverPreviewDisabled(true);
      void removeFavorite(recipeId);
      return;
    }

    void addFavorite(recipeId);
  };

  return (
    <button
      type="button"
      className={cn(
        'group relative inline-flex items-center justify-center rounded-full transition-colors',
        isFavorite ? 'text-secondary' : 'text-muted-foreground',
        className,
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      disabled={isLoading}
      onClick={handleClick}
      onMouseLeave={() => setIsHoverPreviewDisabled(false)}
    >
      <LikeIcon
        aria-hidden="true"
        className={cn(
          'size-5 transition-opacity',
          isDisplayedAsFavorite
            ? 'opacity-0'
            : cn('opacity-100', canShowHoverPreview && 'group-hover:opacity-0'),
        )}
      />
      <LikeFilledIcon
        aria-hidden="true"
        className={cn(
          'absolute size-5 transition-opacity',
          isDisplayedAsFavorite
            ? 'opacity-100'
            : cn('opacity-0', canShowHoverPreview && 'group-hover:opacity-100'),
        )}
      />
    </button>
  );
};

export default FavoriteButton;
