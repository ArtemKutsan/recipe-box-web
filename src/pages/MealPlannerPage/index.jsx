// src/pages/MealPlannerPage/index.jsx
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRecipes } from '@/entities/recipe';
import { selectAuthUser } from '@/entities/auth';
import { useUserRecipes } from '@/entities/user';
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
  const authUser = useSelector(selectAuthUser);
  // Храним координаты пустого слота, для которого пользователь открыл выбор рецепта
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [recipeSource, setRecipeSource] = useState('all');
  const [updateError, setUpdateError] = useState(null);
  // Получаем рецепты, статус загрузки и ошибку с помощью кастомного хука useRecipes
  const { recipes: allRecipes, status: allRecipesStatus, error: allRecipesError } = useRecipes();
  const {
    recipes: myRecipes,
    status: myRecipesStatus,
    error: myRecipesError,
  } = useUserRecipes(authUser?.id, {
    skip: !authUser?.id,
  });
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
  const canUseMyRecipes = Boolean(authUser?.id);
  // TODO: заменить строковое состояние на отдельный визуальный переключатель с явно оформленным контролом.
  const effectiveRecipeSource = canUseMyRecipes ? recipeSource : 'all';
  const recipesForCalendar = useMemo(() => {
    const recipesById = new Map();

    [...allRecipes, ...myRecipes].forEach((recipe) => {
      if (recipe?.id === null || recipe?.id === undefined) return;
      recipesById.set(String(recipe.id), recipe);
    });

    return Array.from(recipesById.values());
  }, [allRecipes, myRecipes]);

  const activeRecipes = effectiveRecipeSource === 'my' ? myRecipes : allRecipes;
  const activeRecipesStatus = effectiveRecipeSource === 'my' ? myRecipesStatus : allRecipesStatus;
  const activeRecipesError = effectiveRecipeSource === 'my' ? myRecipesError : allRecipesError;

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
        recipes: recipesForCalendar,
      }),
    [days, recipesForCalendar, storedMealPlan],
  );

  if (activeRecipesStatus === 'idle' || activeRecipesStatus === 'loading' || isMealPlanLoading) {
    return <p>Loading...</p>;
  }

  if (activeRecipesError || isMealPlanError) {
    const message =
      activeRecipesError ??
      mealPlanError?.data?.message ??
      mealPlanError?.message ??
      'Failed to load meal plan.';

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
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
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
        key={selectedSlot ? `${selectedSlot.day}-${selectedSlot.mealPeriod}` : 'meal-recipe-modal-closed'}
        selectedSlot={selectedSlot}
        recipes={activeRecipes}
        recipeSource={effectiveRecipeSource}
        canUseMyRecipes={canUseMyRecipes}
        onChangeRecipeSource={setRecipeSource}
        onSelectRecipe={handleUpdateMealPlanSlot}
        onClose={() => setSelectedSlot(null)}
      />
    </section>
  );
};

export default MealPlannerPage;
