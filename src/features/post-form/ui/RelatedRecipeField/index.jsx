import { useState } from 'react';
import { useRecipes } from '@/entities/recipe';
import useDebounce from '@/shared/hooks/useDebounce';
import { Pagination } from '@/shared/ui';

const RECIPE_SEARCH_PAGE_SIZE = 6;
const MIN_RECIPE_SEARCH_LENGTH = 2;

const RelatedRecipeField = ({ initialSelectedRecipe = null, setValue }) => {
  const [recipeSearch, setRecipeSearch] = useState('');
  const [recipePage, setRecipePage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(initialSelectedRecipe);
  const debouncedRecipeSearch = useDebounce(recipeSearch.trim(), 250);
  const canSearchRecipes = debouncedRecipeSearch.length >= MIN_RECIPE_SEARCH_LENGTH;
  const recipeQuery = useRecipes(
    { search: debouncedRecipeSearch, page: recipePage, pageSize: RECIPE_SEARCH_PAGE_SIZE },
    { skip: !canSearchRecipes },
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-10 items-center overflow-hidden rounded-xl border bg-white">
        <span className="shrink-0 px-3 text-sm text-muted-foreground">Related recipe</span>
        {selectedRecipe ? (
          <span className="min-w-0 flex-1 truncate px-3 text-sm text-foreground">
            {selectedRecipe.title}
          </span>
        ) : (
          <input
            type="search"
            value={recipeSearch}
            onChange={(event) => {
              setRecipeSearch(event.target.value);
              setRecipePage(1);
            }}
            placeholder="Search recipes..."
            aria-label="Search related recipes"
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
        )}
        {selectedRecipe ? (
          <div className="shrink-0 bg-border p-1">
            <button
              type="button"
              className="min-h-8 rounded-lg bg-secondary px-4 py-1 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
              onClick={() => {
                setSelectedRecipe(null);
                setValue('recipeId', null);
              }}
            >
              Remove
            </button>
          </div>
        ) : null}
      </div>
      {!selectedRecipe ? (
        <>
          {recipeSearch.trim().length > 0 && !canSearchRecipes ? (
            <p className="text-sm text-muted-foreground">Type at least two characters.</p>
          ) : null}
          {canSearchRecipes && recipeQuery.status === 'loading' ? (
            <p className="text-sm text-muted-foreground">Searching recipes...</p>
          ) : null}
          {canSearchRecipes && recipeQuery.status === 'failed' ? (
            <p className="text-sm text-destructive">{recipeQuery.error ?? 'Failed to search recipes.'}</p>
          ) : null}
          {canSearchRecipes && recipeQuery.status === 'succeeded' && recipeQuery.recipes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recipes found.</p>
          ) : null}
          {recipeQuery.recipes.length > 0 ? (
            <div className="flex flex-col gap-2">
              {recipeQuery.recipes.map((recipe) => (
                <button
                  key={recipe.id}
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-xl border bg-card px-3 py-2 text-left text-sm transition-colors hover:border-secondary/40 hover:bg-accent/40"
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setValue('recipeId', recipe.id, { shouldValidate: true });
                  }}
                >
                  <span className="min-w-0 truncate">{recipe.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{recipe.cuisine ?? 'Cuisine'}</span>
                </button>
              ))}
              <div className="border-t pt-3">
                <Pagination page={recipePage} totalPages={recipeQuery.totalPages} onPageChange={setRecipePage} />
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default RelatedRecipeField;
