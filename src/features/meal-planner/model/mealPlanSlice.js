import { createSlice } from '@reduxjs/toolkit';
import { mockMealPlan } from './mockMealPlan';

/*
Структура состояния meal plan:
{
  plan: {
    Monday: {
      Breakfast: recipeId | null,
      Lunch: recipeId | null,
      Dinner: recipeId | null,
      Snack: recipeId | null
    },
    ...
  }
}

В календаре хранится только ID рецепта.
Полные данные рецепта остаются в entities/recipe и не дублируются в meal planner.
Значение null означает, что слот выбранного периода питания пока пуст.
*/

// Временно заполняем начальное состояние моковым планом в формате реального состояния
const initialState = {
  plan: mockMealPlan,
};

// Slice управляет добавлением и удалением рецептов в отдельных слотах календаря
const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {
    /*
    Заменяет локальный план данными из backend.

    payload:
    {
      Monday: {
        Breakfast: recipeId | null,
        ...
      },
      ...
    }
    */
    setMealPlan(state, action) {
      // Backend возвращает slots в том же формате, который календарь уже умеет читать.
      state.plan = action.payload;
    },
    /*
    Добавляет рецепт в выбранный слот.

    payload:
    {
      day: "Monday",
      mealPeriod: "Breakfast",
      recipeId: 12
    }
    */
    addMeal(state, action) {
      const { day, mealPeriod, recipeId } = action.payload;

      // Получаем план конкретного дня по его названию
      const dayPlan = state.plan[day];

      // Не изменяем state, если день или период питания не существуют
      if (!dayPlan || !(mealPeriod in dayPlan)) return;

      // Redux Toolkit использует Immer, поэтому допустимо изменять draft-state напрямую
      dayPlan[mealPeriod] = recipeId;
    },
    /*
    Очищает выбранный слот календаря.

    payload:
    {
      day: "Monday",
      mealPeriod: "Breakfast"
    }
    */
    removeMeal(state, action) {
      const { day, mealPeriod } = action.payload;

      // Получаем план конкретного дня по его названию
      const dayPlan = state.plan[day];

      // Не изменяем state, если день или период питания не существуют
      if (!dayPlan || !(mealPeriod in dayPlan)) return;

      // Возвращаем слот в пустое состояние
      dayPlan[mealPeriod] = null;
    },
  },
});

// Actions используются UI-компонентами meal planner для изменения выбранного слота
export const { addMeal, removeMeal, setMealPlan } = mealPlanSlice.actions;

// Reducer подключается к корневому Redux store под ключом mealPlan
export const mealPlanReducer = mealPlanSlice.reducer;
