import { Link } from 'react-router-dom';
import { getDifficultyBadgeClassName } from '../../../lib/getDifficultyBadgeClassName';
import { buildRecipePath } from '@/shared/config/routerPaths';
import { Badge, InfoLabel } from '@/shared/ui';
import TimerIcon from '@/assets/icons/timer.svg?react';

const RecipeGridCard = ({ recipe, favoriteAction = null }) => {
  const totalTime = (recipe?.prepTimeMinutes ?? 0) + (recipe?.cookTimeMinutes ?? 0);
  const cuisineLabel = recipe?.cuisine ?? 'Cuisine';
  const mealTypeLabel = Array.isArray(recipe?.mealType) ? recipe.mealType[0] : '';
  const difficultyLabel = recipe?.difficulty ? String(recipe.difficulty) : '';

  return (
    <article className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-2xl border bg-card p-3 transition-transform duration-200">
      <Link
        to={buildRecipePath(recipe.id)}
        className="absolute inset-0 z-10"
        aria-label={`Open ${recipe?.name ?? 'recipe'}`}
      />
      <div className="relative flex gap-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-20 sm:w-20">
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
          {difficultyLabel ? (
            <Badge className={getDifficultyBadgeClassName(difficultyLabel)}>
              {difficultyLabel}
            </Badge>
          ) : null}
          {favoriteAction ? <div className="flex relative z-20">{favoriteAction}</div> : null}
        </div>
      </div>
    </article>
  );
};

export default RecipeGridCard;
