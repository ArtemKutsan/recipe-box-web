import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '@/entities/auth';
import { useGetMealTypesQuery } from '@/entities/meal-type';
import { useRecipes } from '@/entities/recipe';
import { useUserRecipes } from '@/entities/user';
import { Button, Modal } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

/*
Feature-компонент модалки выбора рецепта для конкретного слота календаря.

selectedSlot:
{
  day: "Monday",
  mealPeriod: "Breakfast"
}

Компонент отвечает за поиск, фильтрацию и отображение подходящих рецептов
по активному источнику данных.
*/
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
  const {
    data: mealTypes = [],
    isLoading: isMealTypesLoading,
    isError: isMealTypesError,
    error: mealTypesError,
  } = useGetMealTypesQuery();

  const allRecipesQuery = useRecipes(undefined, {
    skip: recipeSource !== 'all',
  });
  const myRecipesQuery = useUserRecipes(authUser?.id, {
    skip: recipeSource !== 'my' || !authUser?.id,
  });

  const activeQuery = recipeSource === 'my' ? myRecipesQuery : allRecipesQuery;
  const filteredRecipes = useMemo(() => {
    const mealTypeFilter = selectedMealType === 'All' ? selectedSlot?.mealPeriod : selectedMealType;
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const recipesByMealType =
      mealTypeFilter && mealTypeFilter !== 'All'
        ? activeQuery.recipes.filter((recipe) =>
            Array.isArray(recipe.mealType)
              ? recipe.mealType.some(
                  (mealType) =>
                    String(mealType).trim().toLowerCase() === String(mealTypeFilter).trim().toLowerCase(),
                )
              : false,
          )
        : activeQuery.recipes;

    if (!normalizedSearch) {
      return recipesByMealType;
    }

    return recipesByMealType.filter((recipe) => {
      const searchableText = [
        recipe?.name,
        recipe?.description,
        recipe?.cuisine,
        Array.isArray(recipe?.tags) ? recipe.tags.join(' ') : '',
        Array.isArray(recipe?.mealType) ? recipe.mealType.join(' ') : '',
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [activeQuery.recipes, searchQuery, selectedMealType, selectedSlot?.mealPeriod]);

  // Заголовок показывает координаты слота, для которого выбирается рецепт
  const title = selectedSlot
    ? `Add meal: ${selectedSlot.mealPeriod}, ${selectedSlot.day}`
    : 'Add meal';

  const sourceButtonClassName = (isActive) =>
    cn(
      'rounded-full px-4 py-2 text-sm font-medium transition-colors',
      isActive ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground',
    );

  const mealTypeOptions = useMemo(
    () => ['All', ...mealTypes.map((mealType) => mealType.title ?? mealType.slug ?? '')].filter(Boolean),
    [mealTypes],
  );

  // TODO: заменить две кнопки на единый переключатель источника рецептов, когда оформим общий паттерн для таких экранов.
  // Записываем ID рецепта в выбранный слот Redux store и закрываем модалку
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

  if (isMealTypesError) {
    return (
      <Modal isOpen={Boolean(selectedSlot)} title={title} onClose={onClose} className="bg-background">
        <p className="text-sm text-destructive">
          {mealTypesError?.data?.message ?? mealTypesError?.message ?? 'Failed to load meal types.'}
        </p>
      </Modal>
    );
  }

  if (isMealTypesLoading || activeQuery.status === 'loading') {
    return (
      <Modal isOpen={Boolean(selectedSlot)} title={title} onClose={onClose} className="bg-background">
        <p className="text-sm text-muted-foreground">Loading recipes...</p>
      </Modal>
    );
  }

  if (activeQuery.status === 'failed') {
    return (
      <Modal isOpen={Boolean(selectedSlot)} title={title} onClose={onClose} className="bg-background">
        <p className="text-sm text-destructive">
          {activeQuery.error ?? 'Failed to load recipes.'}
        </p>
      </Modal>
    );
  }

  return (
    // Наличие selectedSlot одновременно означает, что пользователь выбрал слот и модалку нужно открыть
    <Modal isOpen={Boolean(selectedSlot)} title={title} onClose={onClose} className="bg-background">
      <div className="mb-4 flex flex-col gap-3">
        <label className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3">
          <span className="text-sm text-muted-foreground">Search</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search recipes"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        <label className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3">
          <span className="text-sm text-muted-foreground">Meal type</span>
          <select
            value={selectedMealType}
            onChange={(event) => setSelectedMealType(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          >
            {mealTypeOptions.map((mealType) => (
              <option key={mealType} value={mealType}>
                {mealType}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="ghost"
            className={sourceButtonClassName(recipeSource === 'all')}
            onClick={() => onChangeRecipeSource('all')}
          >
            All recipes
          </Button>
          {canUseMyRecipes ? (
            <Button
              type="button"
              variant="ghost"
              className={sourceButtonClassName(recipeSource === 'my')}
              onClick={() => onChangeRecipeSource('my')}
            >
              My recipes
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredRecipes.map((recipe) => (
          <button
            type="button"
            key={recipe.id}
            onClick={() => handleSelectRecipe(recipe.id)}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border bg-card p-4 text-left"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="size-20 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-medium">{recipe.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{recipe.caloriesPerServing} kcal</p>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default MealRecipeModal;
