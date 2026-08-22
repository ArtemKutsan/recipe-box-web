import { Link } from 'react-router-dom';
import { UserAvatar } from '@/entities/user';
import { buildRecipePath, buildUserProfilePath } from '@/shared/config/routerPaths';

const FeedRecipeItem = ({ recipe, publishedAt }) => {
  const authorName = recipe.author?.name ?? 'RecipeBox user';

  return (
    <article className="flex flex-col gap-5 border-b py-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar src={recipe.author?.avatarUrl} alt={authorName} className="size-10" />
          <div className="min-w-0">
            {recipe.author?.id ? (
              <Link
                to={buildUserProfilePath(recipe.author.id)}
                className="block truncate text-sm font-semibold hover:text-secondary"
              >
                {authorName}
              </Link>
            ) : (
              <p className="truncate text-sm font-semibold">{authorName}</p>
            )}
            <time className="text-xs text-muted-foreground" dateTime={publishedAt ?? undefined}>
              {publishedAt ? new Date(publishedAt).toLocaleDateString() : ''}
            </time>
          </div>
        </div>
        <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-secondary">
          Recipe publication
        </span>
      </header>

      <Link
        to={buildRecipePath(recipe.id)}
        className="flex flex-col gap-4 sm:flex-row sm:items-start"
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="aspect-[4/3] w-full rounded-xl object-cover sm:size-40 sm:shrink-0"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground sm:size-40 sm:shrink-0">
            No image
          </div>
        )}
        <div className="min-w-0 space-y-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{recipe.name}</h2>
          {recipe.description ? (
            <p className="line-clamp-3 text-base leading-7 text-muted-foreground">
              {recipe.description}
            </p>
          ) : null}
          <span className="inline-block text-sm font-medium text-secondary">Open recipe</span>
        </div>
      </Link>
    </article>
  );
};

export default FeedRecipeItem;
