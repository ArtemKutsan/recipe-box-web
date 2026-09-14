// src/features/recipe-filters/config/mealTypeIcons.js
import CategoriesIcon from '@/assets/icons/categories.svg?react';
import BurgerIcon from '@/assets/icons/burger.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';
import CupcakeIcon from '@/assets/icons/cupcake.svg?react';
import ServingsIcon from '@/assets/icons/servings.svg?react';
import UtensilsIcon from '@/assets/icons/utensils.svg?react';

// Ииконка по умолчанию для типов блюд, для которых нет своей иконки
export const fallbackMealTypeIcon = UtensilsIcon;

// Иконки для типов блюд (meal types)
export const mealTypeIcons = {
  All: CategoriesIcon,
  Breakfast: SunIcon,
  Lunch: BurgerIcon,
  Dinner: ServingsIcon,
  Snack: UtensilsIcon,
  Dessert: CupcakeIcon,
  'Side Dish': UtensilsIcon,
  Appetizer: UtensilsIcon,
};
