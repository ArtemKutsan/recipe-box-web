import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecipeList } from '@/entities/recipe/ui';
import { useRecipesQuery } from '@/entities/recipe';
import { buildRecipesQuery } from '@/entities/recipe/lib';
import { useGetMealTypesQuery } from '@/entities/meal-type';
import { useGetCuisinesQuery } from '@/entities/cuisine';
import { RecipeDiscoveryControls } from '@/features/recipe-discovery';
import { FavoriteButton } from '@/features/toggle-favorite';
import { Pagination } from '@/shared/ui';

const RECIPES_PER_PAGE = 12;

const RecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mealType, setMealType] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const { data: mealTypes = [] } = useGetMealTypesQuery();
  const { data: cuisines = [] } = useGetCuisinesQuery();
  const search = searchParams.get('search') ?? '';

  const query = useMemo(
    () =>
      buildRecipesQuery({
        search,
        mealType,
        cuisine,
        sortBy,
        order,
        page,
        pageSize: RECIPES_PER_PAGE,
      }),
    [cuisine, mealType, order, page, search, sortBy],
  );

  const { recipes, totalPages, isLoading, isError, error } = useRecipesQuery(query);

  const isEmpty = !isLoading && !isError && recipes.length === 0;

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

  const updateSearch = (value) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value.trim()) {
        nextParams.set('search', value);
      } else {
        nextParams.delete('search');
      }

      return nextParams;
    }, { replace: true });
    setPage(1);
  };

  const clearFilters = () => {
    setMealType('');
    setCuisine('');
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.delete('search');
      return nextParams;
    }, { replace: true });
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
        <RecipeList
          recipes={recipes}
          viewMode={viewMode}
          renderFavoriteAction={(recipe) => <FavoriteButton recipeId={recipe.id} />}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default RecipesPage;
