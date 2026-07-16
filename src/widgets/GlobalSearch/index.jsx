import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useRecipes } from '@/entities/recipe';
import { buildRecipePath, RouterPath } from '@/shared/config/routerPaths';
import { Button, Modal, Pagination } from '@/shared/ui';
import useDebounce from '@/shared/hooks/useDebounce';

const RESULT_PAGE_SIZE = 8;
const MIN_SEARCH_LENGTH = 2;

const GlobalSearch = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue.trim(), 250);
  const canSearch = isOpen && debouncedSearch.length >= MIN_SEARCH_LENGTH;

  useEffect(() => {
    if (!isOpen) {
      setPage(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setPage(1);
    }
  }, [debouncedSearch, isOpen]);

  const queryParams = useMemo(
    () => ({
      search: debouncedSearch,
      page,
      pageSize: RESULT_PAGE_SIZE,
    }),
    [debouncedSearch, page],
  );

  const { recipes, totalPages, status, error } = useRecipes(queryParams, {
    skip: !canSearch,
  });

  const openRecipesPage = () => {
    const searchParams = new URLSearchParams();

    if (debouncedSearch) {
      searchParams.set('search', debouncedSearch);
    }

    onClose();
    navigate({
      pathname: RouterPath.recipes,
      search: searchParams.size > 0 ? `?${searchParams.toString()}` : '',
    });
  };

  const closeOnNavigate = () => {
    onClose();
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Search recipes"
      onClose={onClose}
      className="max-w-4xl bg-background shadow-2xl"
    >
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3">
          <span className="text-sm text-muted-foreground">Search</span>
          <input
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search recipes..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
        </label>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Recipes</h3>
            <p className="text-xs text-muted-foreground">
              Start typing to search recipes and open the full catalog from the page button.
            </p>
          </div>
          {debouncedSearch.length >= MIN_SEARCH_LENGTH ? (
            <Button type="button" variant="ghost" className="text-secondary/80" onClick={openRecipesPage}>
              View all recipes
            </Button>
          ) : null}
        </div>

        {debouncedSearch.length < MIN_SEARCH_LENGTH ? (
          <p className="rounded-2xl border border-dashed bg-card p-4 text-sm text-muted-foreground">
            Start typing to search recipes. The modal will show a compact recipe list and a page
            button once results are available.
          </p>
        ) : status === 'loading' ? (
          <p className="text-sm text-muted-foreground">Searching recipes...</p>
        ) : status === 'failed' ? (
          <p className="text-sm text-destructive">{error ?? 'Failed to search recipes.'}</p>
        ) : recipes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recipes found.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={buildRecipePath(recipe.id)}
                  onClick={closeOnNavigate}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-4 text-left transition-colors hover:border-secondary/40 hover:bg-accent/40"
                >
                  {recipe.image ? (
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="size-20 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground">
                      No image
                    </div>
                  )}

                  <div className="min-w-0">
                    <h4 className="line-clamp-2 text-sm font-medium">{recipe.name}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {recipe.cuisine ?? 'Cuisine'}
                      {Array.isArray(recipe.mealType) && recipe.mealType.length > 0
                        ? ` • ${recipe.mealType[0]}`
                        : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center border-t pt-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GlobalSearch;
