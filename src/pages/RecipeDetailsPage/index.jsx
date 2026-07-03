import { Link, useParams } from 'react-router-dom';
import { Badge, BulletList, InfoLabel, NumberedList } from '@/shared/ui';
import TimerIcon from '@/assets/icons/timer.svg?react';
import FireIcon from '@/assets/icons/fire-line.svg?react';
import ServingsIcon from '@/assets/icons/servings.svg?react';
import UtensilsIcon from '@/assets/icons/utensils.svg?react';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import { useRecipe } from '@/entities/recipe';
import { useUser } from '@/entities/user';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const { recipe, status, error } = useRecipe(id);
  const authorId = recipe?.userId;
  const { user: author } = useUser(authorId);

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

  return (
    <section className="mx-auto">
      <article className="overflow-hidden rounded-4xl border bg-card">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="h-full">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-full min-h-64 w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 px-4 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Badge>{recipe.difficulty}</Badge>
              <span className="inline-flex items-baseline gap-2 text-sm">
                <span className="text-lg text-amber-400">★</span>
                <span className="font-medium">{recipe.rating ?? '—'}</span>
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {recipe.name}
              </h1>
              {/* Описание */}
              <p className="max-w-2xl">
                {recipe?.description ??
                  `A simple and delicious ${recipe?.cuisine?.toLowerCase() || 'cuisine'} classic with fresh ingredients.`}
              </p>
              {author && (
                <Link
                  to={`/users/${author.id}`}
                  className="inline-flex items-center gap-3 self-start rounded-2xl border px-4 py-3 transition-colors hover:bg-lite"
                >
                  {author.avatarUrl ? (
                    <img src={author.avatarUrl} alt={author.name} className="size-10 rounded-full object-cover" />
                  ) : (
                    <span className="flex size-10 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                      {author.name?.slice(0, 1)?.toUpperCase() ?? 'U'}
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{author.name}</span>
                    <span className="text-xs text-muted-foreground">User #{author.id}</span>
                  </span>
                </Link>
              )}
            </div>

            <div className="grid gap-6 border-y py-6 sm:grid-cols-2 md:grid-cols-3">
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

            <div className="flex flex-wrap gap-4">
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

        <div className="p-4 sm:p-8">
          <div className="flex items-center gap-4 rounded-2xl p-4 bg-secondary/5 text-secondary">
            <span className="flex size-10 items-center justify-center rounded-full bg-secondary/5 text-primary">
              <ChefHatIcon className="size-5 text-secondary" aria-hidden="true" />
            </span>
            <p>Tip: Use the freshest ingredients for the best flavor!</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default RecipeDetailsPage;
