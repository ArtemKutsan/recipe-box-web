import { Link } from 'react-router-dom';
import { getDifficultyBadgeClassName } from '../../../lib/getDifficultyBadgeClassName';
import { buildRecipePath } from '@/shared/config/routerPaths';
import { Badge, InfoLabel } from '@/shared/ui';
import TimerIcon from '@/assets/icons/timer.svg?react';
import FireIcon from '@/assets/icons/fire-line.svg?react';
import UtensilsIcon from '@/assets/icons/utensils.svg?react';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import LikeIcon from '@/assets/icons/like.svg?react';

const RecipeRowCard = ({ recipe }) => {
  const totalTime = (recipe?.prepTimeMinutes ?? 0) + (recipe?.cookTimeMinutes ?? 0);
  const cuisineLabel = recipe?.cuisine ?? 'Cuisine';

  return (
    <Link
      to={buildRecipePath(recipe.id)}
      className="block overflow-hidden rounded-2xl border bg-card"
    >
      <article className="grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)_auto] p-4">
        {recipe?.image ? (
          <img
            src={recipe.image}
            alt={recipe.name ?? 'Recipe'}
            className="h-full min-h-40 w-full bg-muted object-cover rounded-xl"
          />
        ) : (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{recipe?.name ?? 'RecipeListItem'}</h3>
            {recipe?.description?.trim() ? (
              <p className="max-w-2xl text-sm text-muted-foreground line-clamp-3">
                {recipe.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <InfoLabel icon={TimerIcon} value={`${totalTime || 0} min`} />
            <InfoLabel icon={FireIcon} value={`${recipe?.caloriesPerServing ?? 0} kcal`} />
            <InfoLabel icon={UtensilsIcon} value={`${recipe?.servings ?? 0} servings`} />
            <InfoLabel icon={ChefHatIcon} value={cuisineLabel} />
            {recipe?.difficulty ? (
              <Badge
                className={`px-2 py-1 text-sm ${getDifficultyBadgeClassName(recipe.difficulty)}`}
              >
                {recipe.difficulty}
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex items-start justify-end gap-4 md:flex-col md:items-end md:justify-start md:pl-0">
          <span className="rounded-full p-2">
            <LikeIcon aria-hidden="true" className="size-5" />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default RecipeRowCard;
