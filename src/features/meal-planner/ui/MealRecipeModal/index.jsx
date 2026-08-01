import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '@/entities/auth';
import { useGetMealTypesQuery } from '@/entities/meal-type';
import { useRecipes } from '@/entities/recipe';
import { useUserRecipes } from '@/entities/user';
import { Modal, Pagination, ToggleGroup } from '@/shared/ui';

/*
Feature-компонент модалки выбора рецепта для конкретного слота календаря.

selectedSlot:
{
  day: "Monday",
  mealPeriod: "Breakfast"
}

Компонент отвечает за поиск, фильтрацию и пагинацию рецептов
по активному источнику данных.
*/
const RECIPES_PER_PAGE = 8;
const RECIPE_SOURCE_OPTIONS = [
  { value: 'all', label: 'All recipes' },
  { value: 'my', label: 'My recipes' },
];

const MealRecipeModal = ({
  selectedSlot,
  recipeSource,
  canUseMyRecipes,
  onChangeRecipeSource,
  onClose,
  onSelectRecipe,
}) => {
  const authUser = useSelector(selectAuthUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState(() => selectedSlot?.mealPeriod ?? 'All');
  const [page, setPage] = useState(1);

  const {
    data: mealTypes = [],
    isLoading: isMealTypesLoading,
    isError: isMealTypesError,
    error: mealTypesError,
  } = useGetMealTypesQuery();

  const queryParams = useMemo(
    () => ({
      search: searchQuery.trim() || undefined,
      mealType: selectedMealType === 'All' ? undefined : selectedMealType,
      page,
      pageSize: RECIPES_PER_PAGE,
    }),
    [page, searchQuery, selectedMealType],
  );

  const allRecipesQuery = useRecipes(queryParams, {
    skip: recipeSource !== 'all',
  });
  const myRecipesQuery = useUserRecipes(authUser?.id, queryParams, {
    skip: recipeSource !== 'my' || !authUser?.id,
  });

  const activeQuery = recipeSource === 'my' ? myRecipesQuery : allRecipesQuery;

  // Заголовок показывает координаты слота, для которого выбирается рецепт
  const title = selectedSlot
    ? `Add meal: ${selectedSlot.mealPeriod}, ${selectedSlot.day}`
    : 'Add meal';

  const mealTypeOptions = useMemo(
    () =>
      ['All', ...mealTypes.map((mealType) => mealType.title ?? mealType.slug ?? '')].filter(
        Boolean,
      ),
    [mealTypes],
  );

  const handleChangeRecipeSource = (nextSource) => {
    if (nextSource !== recipeSource) {
      setPage(1);
    }

    onChangeRecipeSource(nextSource);
  };

  // Отправляем PATCH выбранного слота и закрываем модалку только после успешного ответа.
  const handleSelectRecipe = async (recipeId) => {
    if (!selectedSlot) return;

    try {
      await onSelectRecipe({
        ...selectedSlot,
        recipeId,
      });
      onClose();
    } catch {
      // Ошибку уже показал родитель, модалка остается открытой для повторной попытки.
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleMealTypeChange = (event) => {
    setSelectedMealType(event.target.value);
    setPage(1);
  };

  if (isMealTypesError) {
    return (
      <Modal
        isOpen={Boolean(selectedSlot)}
        title={title}
        onClose={onClose}
        className="bg-background"
      >
        <p className="text-sm text-destructive">
          {mealTypesError?.data?.message ?? mealTypesError?.message ?? 'Failed to load meal types.'}
        </p>
      </Modal>
    );
  }

  if (isMealTypesLoading || activeQuery.status === 'loading') {
    return (
      <Modal
        isOpen={Boolean(selectedSlot)}
        title={title}
        onClose={onClose}
        className="bg-background"
      >
        <p className="text-sm text-muted-foreground">Loading recipes...</p>
      </Modal>
    );
  }

  if (activeQuery.status === 'failed') {
    return (
      <Modal
        isOpen={Boolean(selectedSlot)}
        title={title}
        onClose={onClose}
        className="bg-background"
      >
        <p className="text-sm text-destructive">{activeQuery.error ?? 'Failed to load recipes.'}</p>
      </Modal>
    );
  }

  return (
    // Наличие selectedSlot одновременно означает, что пользователь выбрал слот и модалку нужно открыть
    <Modal
      isOpen={Boolean(selectedSlot)}
      title={title}
      onClose={onClose}
      className="bg-background shadow-2xl"
    >
      <div className="mb-4 flex flex-col gap-3">
        <label className="flex items-center gap-3 rounded-xl border bg-card px-4 py-2">
          <span className="text-sm text-muted-foreground">Search</span>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search recipes"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border bg-card px-3 py-2">
            <span className="shrink-0 text-sm text-muted-foreground">Meal type</span>
            <select
              value={selectedMealType}
              onChange={handleMealTypeChange}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            >
              {mealTypeOptions.map((mealType) => (
                <option key={mealType} value={mealType}>
                  {mealType}
                </option>
              ))}
            </select>
          </label>

          <ToggleGroup
            options={canUseMyRecipes ? RECIPE_SOURCE_OPTIONS : RECIPE_SOURCE_OPTIONS.slice(0, 1)}
            value={recipeSource}
            onChange={handleChangeRecipeSource}
            ariaLabel="Recipe source"
            className="shrink-0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {activeQuery.recipes.map((recipe) => (
            <button
              type="button"
              key={recipe.id}
              onClick={() => handleSelectRecipe(recipe.id)}
              className="flex cursor-pointer items-center gap-4 rounded-2xl border bg-card p-3 text-left"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="size-16 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <h3 className="line-clamp-2 text-sm font-medium">{recipe.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {recipe.caloriesPerServing} kcal
                </p>
              </div>
            </button>
          ))}
        </div>

        {activeQuery.recipes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recipes found for the current filters.</p>
        ) : null}

        <Pagination
          page={activeQuery.page}
          totalPages={activeQuery.totalPages}
          onPageChange={setPage}
          className="pt-2"
        />
      </div>
    </Modal>
  );
};

export default MealRecipeModal;
