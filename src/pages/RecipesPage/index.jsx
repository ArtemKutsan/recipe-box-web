import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecipeList } from '@/entities/recipe/ui';
import { useRecipesQuery } from '@/entities/recipe';
import { normalizeRecipeQueryParams } from '@/entities/recipe/api/normalizeRecipeQueryParams';
import { useGetMealTypesQuery } from '@/entities/meal-type';
import { RecipeFilters, RecipeListControls } from '@/features/recipe-discovery';
import { buildMealTypeOptions } from '@/features/recipe-filters';
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
  const {
    cuisines: availableCuisines,
    total: availableRecipesTotal,
    isLoading: cuisinesLoading,
  } = useRecipesQuery({
    mealType: mealType || undefined,
    pageSize: 1,
  });
  const search = searchParams.get('search') ?? '';
  const mealTypeItems = useMemo(
    () => buildMealTypeOptions(mealTypes, availableRecipesTotal),
    [availableRecipesTotal, mealTypes],
  );
  const cuisineItems = useMemo(
    () =>
      availableCuisines.map((item) => ({
        title: item.title,
        slug: item.slug,
        count: item.recipesCount ?? item.count ?? 0,
      })),
    [availableCuisines],
  );
  const resultTitle = cuisine
    ? `${mealTypeItems.find((item) => item.slug === mealType)?.title ?? 'All'} · ${cuisineItems.find((item) => item.slug === cuisine)?.title ?? cuisine} recipes`
    : `${mealTypeItems.find((item) => item.slug === mealType)?.title ?? 'All'} recipes`;

  useEffect(() => {
    if (!mealType || cuisinesLoading || !cuisine) {
      return;
    }

    if (!cuisineItems.some((item) => item.slug === cuisine)) {
      // Сбрасываем кухню, которая стала недоступна после выбора нового типа блюда.
      // Вернуться к этому решению и проверить, нужен ли сброс в updateMealType.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCuisine('');
      setPage(1);
    }
  }, [cuisine, cuisineItems, cuisinesLoading, mealType]);

  const query = useMemo(
    () =>
      normalizeRecipeQueryParams({
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
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        if (value.trim()) {
          nextParams.set('search', value);
        } else {
          nextParams.delete('search');
        }

        return nextParams;
      },
      { replace: true },
    );
    setPage(1);
  };

  const clearFilters = () => {
    setMealType('');
    setCuisine('');
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete('search');
        return nextParams;
      },
      { replace: true },
    );
    setPage(1);
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight mt-1">Recipes</h1>
        <p>Find your next favorite recipe</p>
      </header>

      <RecipeFilters
        search={search}
        mealType={mealType}
        cuisine={cuisine}
        mealTypes={mealTypes}
        cuisines={cuisineItems}
        mealTypeItems={mealTypeItems}
        cuisineItems={cuisineItems}
        onSearchChange={updateSearch}
        onMealTypeChange={updateMealType}
        onCuisineChange={updateCuisine}
        onClearFilters={clearFilters}
      />

      <RecipeListControls
        resultTitle={resultTitle}
        sortBy={sortBy}
        order={order}
        viewMode={viewMode}
        onSortByChange={updateSortBy}
        onOrderChange={updateOrder}
        onViewModeChange={setViewMode}
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
          renderFavoriteButton={(recipe) => <FavoriteButton recipeId={recipe.id} />}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default RecipesPage;
