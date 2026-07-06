import { useMemo } from 'react';
import { filterRecipesByMealType } from '@/entities/recipe/lib';
import { Button, Modal } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

/*
Feature-компонент модалки выбора рецепта для конкретного слота календаря.

selectedSlot:
{
  day: "Monday",
  mealPeriod: "Breakfast"
}

Компонент отвечает за фильтрацию и отображение подходящих рецептов.
*/
const MealRecipeModal = ({
  selectedSlot,
  recipes,
  recipeSource,
  canUseMyRecipes,
  onChangeRecipeSource,
  onClose,
  onSelectRecipe,
}) => {

  // Пересчитываем список только при изменении рецептов или выбранного слота
  const filteredRecipes = useMemo(
    () => (selectedSlot ? filterRecipesByMealType(recipes, selectedSlot.mealPeriod) : []),
    [recipes, selectedSlot],
  );

  // Заголовок показывает координаты слота, для которого выбирается рецепт
  const title = selectedSlot
    ? `Add meal: ${selectedSlot.mealPeriod}, ${selectedSlot.day}`
    : 'Add meal';

  const sourceButtonClassName = (isActive) =>
    cn(
      'rounded-full px-4 py-2 text-sm font-medium transition-colors',
      isActive ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground',
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

  return (
    // Наличие selectedSlot одновременно означает, что пользователь выбрал слот и модалку нужно открыть
    <Modal isOpen={Boolean(selectedSlot)} title={title} onClose={onClose} className="bg-background">
      <div className="mb-4 flex flex-wrap gap-2">
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
