import { createSlice } from '@reduxjs/toolkit';
import { emptyMealPlan } from './emptyMealPlan';

/*
Структура состояния meal plan:
{
  data: {
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

// До загрузки backend-плана календарь стартует с пустыми слотами.
const initialState = {
  data: emptyMealPlan,
};

// Slice хранит только синхронизированную копию backend meal plan.
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
      state.data = action.payload;
    },
  },
});

// Action используется UI-компонентами meal planner для синхронизации плана с backend.
export const { setMealPlan } = mealPlanSlice.actions;

// Reducer подключается к корневому Redux store под ключом mealPlan
export const mealPlanReducer = mealPlanSlice.reducer;
