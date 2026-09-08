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

const FavoriteButton = ({ recipeId, className, iconClassName }) => {
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
        'group/favorite relative inline-flex items-center justify-center rounded-full transition-colors',
        isFavorite ? 'text-red-600' : 'text-muted-foreground',
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
          cn('size-4 transition-opacity', iconClassName),
          isDisplayedAsFavorite
            ? 'opacity-0'
            : cn('opacity-100', canShowHoverPreview && 'group-hover/favorite:opacity-0'),
        )}
      />
      <LikeFilledIcon
        aria-hidden="true"
        className={cn(
          cn('absolute size-4 transition-opacity', iconClassName),
          isDisplayedAsFavorite
            ? 'opacity-100'
            : cn('opacity-0', canShowHoverPreview && 'group-hover/favorite:opacity-100'),
        )}
      />
    </button>
  );
};

export default FavoriteButton;
