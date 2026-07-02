import { useMemo, useState } from 'react';
import { RecipeList } from '@/entities/recipe/ui';
import { useRecipesQuery } from '@/entities/recipe';
import { buildRecipesQuery } from '@/entities/recipe/lib';
import { RecipeDiscoveryControls } from '@/features/recipe-discovery';
import { Button } from '@/shared/ui';
import useDebounce from '@/shared/hooks/useDebounce';

const RECIPES_PER_PAGE = 10;

const RecipesPage = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const query = useMemo(
    () =>
      buildRecipesQuery({
        search: debouncedSearch,
        sortBy,
        order,
        page,
        pageSize: RECIPES_PER_PAGE,
      }),
    [debouncedSearch, order, page, sortBy],
  );

  const {
    recipes,
    total,
    totalPages,
    isLoading,
    isError,
    error,
  } = useRecipesQuery(query);

  const hasNextPage = page < totalPages || recipes.length === RECIPES_PER_PAGE && page === totalPages;
  const isEmpty = !isLoading && !isError && recipes.length === 0;

  const updateSearch = (value) => {
    setSearch(value);

    if (page !== 1) {
      setPage(1);
    }
  };

  const updateSortBy = (value) => {
    setSortBy(value);
    setPage(1);
  };

  const updateOrder = (value) => {
    setOrder(value);
    setPage(1);
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Recipes</h1>
        <p>Find your next favorite recipe</p>
      </header>

      <RecipeDiscoveryControls
        search={search}
        sortBy={sortBy}
        order={order}
        onSearchChange={updateSearch}
        onSortByChange={updateSortBy}
        onOrderChange={updateOrder}
      />

      {isError ? (
        <p>{error?.data?.message ?? error?.message ?? 'Failed to load recipes'}</p>
      ) : isLoading ? (
        <p>Loading recipes...</p>
      ) : isEmpty ? (
        <p>No recipes found.</p>
      ) : (
        <RecipeList recipes={recipes} />
      )}

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page}
          {total ? ` of ${totalPages}` : ''}
        </span>
        <Button
          variant="ghost"
          onClick={() => setPage((currentPage) => currentPage + 1)}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default RecipesPage;
