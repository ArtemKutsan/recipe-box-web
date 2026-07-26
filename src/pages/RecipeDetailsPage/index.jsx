import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '@/entities/auth';
import { buildEditRecipePath, buildUserProfilePath } from '@/shared/config/routerPaths';
import { Badge, BulletList, Button, InfoLabel, NumberedList } from '@/shared/ui';
import TimerIcon from '@/assets/icons/timer.svg?react';
import FireIcon from '@/assets/icons/fire-line.svg?react';
import ServingsIcon from '@/assets/icons/servings.svg?react';
import UtensilsIcon from '@/assets/icons/utensils.svg?react';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import { getDifficultyBadgeClassName, useRecipe } from '@/entities/recipe';
import { UserAvatar } from '@/entities/user';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const authUser = useSelector(selectAuthUser);
  const { recipe, status, error } = useRecipe(id);

  if (status === 'idle' || status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  const tags = recipe.tags ?? [];
  const mealTypes = recipe.mealType ?? [];
  const ingredients = recipe.ingredients ?? [];
  const instructions = recipe.instructions ?? [];
  const author = recipe.author;
  const authorName = author?.name ?? 'RecipeBox user';
  const canEdit = authUser?.id != null && String(authUser.id) === String(author?.id);

  return (
    <section className="mx-auto">
      <article className="overflow-hidden rounded-4xl border bg-card">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-full min-h-64 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-64 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
              No image
            </div>
          )}

          <div className="flex flex-col gap-8 px-4 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Badge className={getDifficultyBadgeClassName(recipe.difficulty)}>
                {recipe.difficulty}
              </Badge>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-baseline gap-2 text-sm">
                  <span className="text-lg text-amber-400">★</span>
                  <span className="font-medium">{recipe.rating ?? '—'}</span>
                </span>
                {canEdit ? (
                  <Button as={Link} to={buildEditRecipePath(recipe.id)} variant="outline" size="sm">
                    Edit
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {recipe.name}
              </h1>
              {/* Описание */}
              <p className="max-w-2xl">
                {recipe?.description ||
                  `A simple and delicious ${recipe?.cuisine?.toLowerCase() || 'cuisine'} classic with fresh ingredients.`}
              </p>
              {author && (
                <Link
                  to={buildUserProfilePath(author.id)}
                  className="inline-flex items-center gap-3 self-start rounded-2xl border px-4 py-3 transition-colors hover:bg-lite"
                >
                  <UserAvatar src={author.avatarUrl} alt={authorName} className="size-10" />
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{authorName}</span>
                    <span className="text-xs text-muted-foreground">User #{author.id}</span>
                  </span>
                </Link>
              )}
            </div>

            <div className="grid gap-6 border-y py-6 grid-cols-2 md:grid-cols-3">
              <InfoLabel
                icon={TimerIcon}
                label="Prep Time"
                value={`${recipe.prepTimeMinutes} mins`}
              />
              <InfoLabel
                icon={TimerIcon}
                label="Cook Time"
                value={`${recipe.cookTimeMinutes} mins`}
              />
              <InfoLabel icon={ServingsIcon} label="Servings" value={recipe.servings} />
              <InfoLabel icon={ChefHatIcon} label="Cuisine" value={recipe.cuisine} />
              <InfoLabel
                icon={FireIcon}
                label="Calories"
                value={`${recipe.caloriesPerServing} kcal`}
              />
              <InfoLabel icon={UtensilsIcon} label="Meal Type" value={mealTypes.join(', ')} />
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-y-8 border-t p-4 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="lg:border-r lg:pr-8">
            <div className="mb-6 flex items-center gap-2">
              <ChefHatIcon className="ml-1 size-6 text-secondary" aria-hidden="true" />
              <h2 className="text-2xl font-semibold">Ingredients</h2>
            </div>
            <BulletList items={ingredients} />
          </section>

          <section className="lg:pl-8">
            <div className="mb-6 flex items-center gap-2">
              <ListIcon className="ml-1 size-6 text-secondary" aria-hidden="true" />
              <h2 className="text-2xl font-semibold">Instructions</h2>
            </div>
            <NumberedList items={instructions} />
          </section>
        </div>

        {recipe.authorNote ? (
          <section
            className="border-t bg-muted/30 px-4 py-8 sm:px-8 sm:py-10"
            aria-labelledby="recipe-author-note-title"
          >
            <div className="mx-auto max-w-3xl">
              <header className="flex items-center gap-4">
                {author ? (
                  <Link
                    to={buildUserProfilePath(author.id)}
                    className="shrink-0 rounded-full"
                    aria-label={`Open ${authorName}'s profile`}
                  >
                    <UserAvatar src={author.avatarUrl} alt={authorName} className="size-12" />
                  </Link>
                ) : null}
                <div>
                  <p className="text-sm font-medium text-secondary">From the author</p>
                  <h2 id="recipe-author-note-title" className="text-xl font-semibold">
                    Behind this recipe
                  </h2>
                  {author ? (
                    <p className="mt-1 text-sm text-muted-foreground">{authorName}</p>
                  ) : null}
                </div>
              </header>

              <div className="mt-6 whitespace-pre-line text-base leading-7 text-foreground">
                {recipe.authorNote}
              </div>
            </div>
          </section>
        ) : null}
      </article>
    </section>
  );
};

export default RecipeDetailsPage;
