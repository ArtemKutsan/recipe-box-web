import { useMemo, useState } from 'react';
import { RecipeListItem } from '@/entities/recipe/ui';
import { useRecipesQuery } from '@/entities/recipe';
import { useGetMealTypesQuery } from '@/entities/meal-type';
import {
  CuisineList,
  MealTypeSelector,
  getMealTypeItems,
} from '@/features/recipe-categorization';

const mapCuisineItemsToCards = (cuisines) =>
  // Backend уже отдает не весь каталог рецептов, а готовые кухни для текущего фильтра.
  // Здесь мы только приводим их к UI-формату карточек без дополнительной бизнес-логики.
  cuisines.map((cuisine) => ({
    name: cuisine.title,
    slug: cuisine.slug,
    count: cuisine.recipesCount ?? 0,
    image: null,
  }));

const CategoriesPage = () => {
  const {
    data: mealTypes = [],
    isLoading: mealTypesLoading,
    isError: isMealTypesError,
  } = useGetMealTypesQuery();
  const [activeMealType, setActiveMealType] = useState('All');
  const [activeCuisine, setActiveCuisine] = useState(null);

  // Общий total нужен только для пункта All в селекторе meal types.
  // Мы берем его из обычного списка recipes, но запрашиваем только pageSize=1,
  // потому что нам здесь не нужен весь каталог, а нужен только total из ответа.
  const {
    total: allRecipesTotal,
    isLoading: allRecipesLoading,
    isError: isAllRecipesError,
    error: allRecipesError,
  } = useRecipesQuery({ pageSize: 1 });

  // Когда меняется mealType, мы заново просим backend посчитать, какие cuisines доступны
  // внутри этого mealType. Если выбран All, backend считает кухни по всему набору рецептов.
  const cuisineListParams = activeMealType === 'All'
    ? { pageSize: 1 }
    : { mealType: activeMealType, pageSize: 1 };
  const {
    cuisines: cuisineItemsRaw,
    isLoading: cuisineListLoading,
    isError: isCuisineListError,
    error: cuisineListError,
  } = useRecipesQuery(cuisineListParams);

  // Рецепты на экран нужны только после выбора кухни.
  // До этого момента мы показываем только список кухонь, поэтому не дергаем список рецептов целиком.
  const shouldLoadRecipes = Boolean(activeCuisine);
  const {
    recipes,
    isLoading: recipesLoading,
    isFetching: recipesFetching,
    isError: isRecipesError,
    error: recipesError,
  } = useRecipesQuery(
    {
      mealType: activeMealType === 'All' ? undefined : activeMealType,
      cuisine: activeCuisine ?? undefined,
      page: 1,
      pageSize: 20,
    },
    {
      // Пока кухня не выбрана, список рецептов не нужен.
      skip: !shouldLoadRecipes,
    },
  );

  // Справочник mealTypes нужен для верхнего селектора категорий.
  // Дальше он не строит cuisine-список сам, потому что кухни теперь приходят из ответа recipes.
  const mealTypeItems = useMemo(() => getMealTypeItems(mealTypes, allRecipesTotal), [mealTypes, allRecipesTotal]);
  const cuisineItems = useMemo(
    // Берем кухни из ответа recipes и превращаем их в UI-элементы.
    () => mapCuisineItemsToCards(cuisineItemsRaw),
    [cuisineItemsRaw],
  );

  const activeMealTypeLabel =
    mealTypeItems.find((item) => item.slug === activeMealType)?.name ?? 'All';
  const activeCuisineLabel =
    cuisineItems.find((item) => item.slug === activeCuisine)?.name ?? activeCuisine;

  const selectMealType = (mealType) => {
    // При смене mealType сбрасываем выбранную кухню,
    // чтобы под новый фильтр показать новый набор cuisine cards.
    setActiveMealType(mealType);
    setActiveCuisine(null);
  };

  // Пока справочник mealTypes, общий total и список cuisines не приехали, экран не строим.
  if (mealTypesLoading || allRecipesLoading || cuisineListLoading) {
    return <p>Loading...</p>;
  }

  // Ошибки справочников и запроса списка cuisines блокируют экран категорий,
  // потому что без них нельзя правильно собрать селектор и список кухонь.
  if (isMealTypesError || isAllRecipesError || isCuisineListError) {
    return (
      <p>
        {allRecipesError?.data?.message ??
          cuisineListError?.data?.message ??
          'Failed to load categories'}
      </p>
    );
  }

  if (isRecipesError) {
    return <p>{recipesError?.data?.message ?? 'Failed to load recipes'}</p>;
  }

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p>Browse recipes by category</p>
      </header>

      {/* Верхний селектор строится из справочника mealTypes и общего total. */}
      <MealTypeSelector items={mealTypeItems} activeItem={activeMealType} onSelect={selectMealType} />

      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">
            {activeCuisine
              ? `${activeCuisineLabel} recipes`
              : activeMealType === 'All'
                ? 'All Cuisines'
                : `${activeMealTypeLabel} Cuisines`}
          </h2>

          {activeCuisine ? (
            <button
              type="button"
              onClick={() => setActiveCuisine(null)}
              className="text-sm font-medium text-secondary/80"
            >
              All cuisines
            </button>
          ) : null}
        </div>

        {/* Пока кухня не выбрана, показываем доступные кухни для текущего mealType. */}
        {!activeCuisine ? (
          <CuisineList
            cuisines={cuisineItems}
            mealType={activeMealTypeLabel}
            onSelect={setActiveCuisine}
          />
        ) : (
          // После выбора кухни берем уже paginated recipes и рендерим карточки.
          <div className="grid gap-4">
            {recipesLoading || recipesFetching ? (
              <p>Loading...</p>
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => <RecipeListItem key={recipe.id} recipe={recipe} />)
            ) : (
              <p>No recipes found</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesPage;
