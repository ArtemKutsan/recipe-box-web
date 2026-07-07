import { useMemo, useState } from 'react';
import { RecipeList } from '@/entities/recipe/ui';
import { useRecipesQuery } from '@/entities/recipe';
import { buildRecipesQuery } from '@/entities/recipe/lib';
import { useGetMealTypesQuery } from '@/entities/meal-type';
import { useGetCuisinesQuery } from '@/entities/cuisine';
import { RecipeDiscoveryControls } from '@/features/recipe-discovery';
import { Pagination } from '@/shared/ui';
import useDebounce from '@/shared/hooks/useDebounce';

const RECIPES_PER_PAGE = 10;

const RecipesPage = () => {
  const [search, setSearch] = useState('');
  const [mealType, setMealType] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const debouncedSearch = useDebounce(search, 300);
  const { data: mealTypes = [] } = useGetMealTypesQuery();
  const { data: cuisines = [] } = useGetCuisinesQuery();

  const query = useMemo(
    () =>
      buildRecipesQuery({
        search: debouncedSearch,
        mealType,
        cuisine,
        sortBy,
        order,
        page,
        pageSize: RECIPES_PER_PAGE,
      }),
    [cuisine, debouncedSearch, mealType, order, page, sortBy],
  );

  const {
    recipes,
    totalPages,
    isLoading,
    isError,
    error,
  } = useRecipesQuery(query);

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

  const updateMealType = (value) => {
    setMealType(value);
    setPage(1);
  };

  const updateCuisine = (value) => {
    setCuisine(value);
    setPage(1);
  };

  const clearFilters = () => {
    setMealType('');
    setCuisine('');
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
        mealType={mealType}
        cuisine={cuisine}
        sortBy={sortBy}
        order={order}
        viewMode={viewMode}
        mealTypes={mealTypes}
        cuisines={cuisines}
        onSearchChange={updateSearch}
        onMealTypeChange={updateMealType}
        onCuisineChange={updateCuisine}
        onSortByChange={updateSortBy}
        onOrderChange={updateOrder}
        onViewModeChange={setViewMode}
        onClearFilters={clearFilters}
      />

      {isError ? (
        <p>{error?.data?.message ?? error?.message ?? 'Failed to load recipes'}</p>
      ) : isLoading ? (
        <p>Loading recipes...</p>
      ) : isEmpty ? (
        <p>No recipes found.</p>
      ) : (
        <RecipeList recipes={recipes} viewMode={viewMode} />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default RecipesPage;
