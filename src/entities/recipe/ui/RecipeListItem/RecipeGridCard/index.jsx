import { Link } from 'react-router-dom';
import { buildRecipePath } from '@/shared/config/routerPaths';
import { Badge, InfoLabel } from '@/shared/ui';
import TimerIcon from '@/assets/icons/timer.svg?react';
import LikeIcon from '@/assets/icons/like.svg?react';

const RecipeGridCard = ({ recipe }) => {
  const totalTime = (recipe?.prepTimeMinutes ?? 0) + (recipe?.cookTimeMinutes ?? 0);
  const cuisineLabel = recipe?.cuisine ?? 'Cuisine';
  const mealTypeLabel = Array.isArray(recipe?.mealType) ? recipe.mealType[0] : '';
  const difficultyLabel = recipe?.difficulty ? String(recipe.difficulty) : '';

  return (
    <Link to={buildRecipePath(recipe.id)} className="block h-full">
      <article className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-2xl border bg-card p-3 transition-transform duration-200">
        <div className="relative flex gap-3">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-20 sm:w-20">
            {recipe?.image ? (
              <img
                src={recipe.image}
                alt={recipe.name ?? 'Recipe'}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 flex flex-col justify-between">
            <h3 className="line-clamp-3 text-xs font-semibold leading-4 text-foreground sm:text-sm">
              {recipe?.name ?? 'RecipeListItem'}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground sm:text-xs">
              {cuisineLabel}
              {mealTypeLabel ? ` • ${mealTypeLabel}` : ''}
            </p>
          </div>
        </div>

        <div className="mt-auto flex w-full items-center justify-between gap-2">
          <InfoLabel icon={TimerIcon} value={`${totalTime || 0} min`} />
          <div className="flex items-center gap-2">
            {difficultyLabel ? <Badge>{difficultyLabel}</Badge> : null}
            <span className="rounded-full p-1 text-muted-foreground transition-colors hover:text-secondary">
              <LikeIcon aria-hidden="true" className="size-4 sm:size-5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RecipeGridCard;
