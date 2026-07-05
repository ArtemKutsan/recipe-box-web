// src/pages/MealPlannerPage/index.jsx
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRecipes } from '@/entities/recipe';
import {
  useGetCurrentMealPlanQuery,
  useUpdateCurrentMealPlanSlotMutation,
} from '@/entities/meal-plan';
import {
  buildMealPlan,
  getDays,
  mealPeriods,
  MealPlannerCalendar,
  MealRecipeModal,
  selectMealPlan,
  setMealPlan,
} from '@/features/meal-planner';
import { emptyMealPlan } from '@/features/meal-planner/model/emptyMealPlan';

const MealPlannerPage = () => {
  const dispatch = useDispatch();
  // Храним координаты пустого слота, для которого пользователь открыл выбор рецепта
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  // Получаем рецепты, статус загрузки и ошибку с помощью кастомного хука useRecipes
  const { recipes, status, error } = useRecipes();
  const {
    data: mealPlanResponse,
    isLoading: isMealPlanLoading,
    isError: isMealPlanError,
    error: mealPlanError,
  } = useGetCurrentMealPlanQuery();
  const [updateMealPlanSlot, { isLoading: isUpdatingMealPlanSlot }] =
    useUpdateCurrentMealPlanSlotMutation();
  // Получаем недельный план с ID рецептов из Redux store
  const storedMealPlan = useSelector(selectMealPlan);
  // Получаем дни для календаря и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const days = useMemo(() => getDays(), []);

  useEffect(() => {
    // Backend возвращает mealPlan целиком, а для календаря нам нужны только slots.
    dispatch(setMealPlan(mealPlanResponse?.slots ?? emptyMealPlan));
  }, [dispatch, mealPlanResponse]);

  // Соединяем ID из meal plan с полными объектами рецептов для отображения календаря
  const mealPlan = useMemo(
    () =>
      buildMealPlan({
        days,
        mealPeriods,
        mealPlan: storedMealPlan,
        recipes,
      }),
    [days, recipes, storedMealPlan],
  );

  if (status === 'idle' || status === 'loading' || isMealPlanLoading) {
    return <p>Loading...</p>;
  }

  if (error || isMealPlanError) {
    const message = error ?? mealPlanError?.data?.message ?? mealPlanError?.message ?? 'Failed to load meal plan.';

    return <p>{message}</p>;
  }

  const handleUpdateMealPlanSlot = async ({ day, mealPeriod, recipeId }) => {
    try {
      const updatedMealPlan = await updateMealPlanSlot({
        day,
        mealPeriod,
        recipeId,
      }).unwrap();

      setUpdateError(null);
      dispatch(setMealPlan(updatedMealPlan?.slots ?? emptyMealPlan));
      return updatedMealPlan;
    } catch (err) {
      const message = err?.data?.message ?? err?.message ?? 'Failed to update meal plan.';
      setUpdateError(message);
      throw err;
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Meal Planner</h1>
        <p>Plan your meals for the week</p>
      </header>
      {isUpdatingMealPlanSlot ? <p>Saving...</p> : null}
      {updateError ? <p className="text-sm text-destructive">{updateError}</p> : null}
      {/* Пустой слот передаёт сюда day и mealPeriod через onAddMeal */}
      <MealPlannerCalendar
        days={days}
        rows={mealPlan}
        onAddMeal={setSelectedSlot}
        onRemoveMeal={handleUpdateMealPlanSlot}
      />
      {/* selectedSlot управляет открытием модалки и определяет тип отображаемых рецептов */}
      {/* После закрытия очищаем выбранный слот, поэтому модалка перестаёт рендериться */}
      <MealRecipeModal
        selectedSlot={selectedSlot}
        recipes={recipes}
        onSelectRecipe={handleUpdateMealPlanSlot}
        onClose={() => setSelectedSlot(null)}
      />
    </section>
  );
};

export default MealPlannerPage;
