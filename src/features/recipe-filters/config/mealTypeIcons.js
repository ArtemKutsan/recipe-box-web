// src/features/recipe-filters/config/mealTypeIcons.js
import CategoriesIcon from '@/assets/icons/categories.svg?react';
import BurgerIcon from '@/assets/icons/burger.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';
import CupcakeIcon from '@/assets/icons/cupcake.svg?react';
import CookieIcon from '@/assets/icons/cookie.svg?react';
import DishIcon from '@/assets/icons/dish.svg?react';
import MugIcon from '@/assets/icons/mug.svg?react';
import SaladIcon from '@/assets/icons/salad.svg?react';
import ServingsIcon from '@/assets/icons/servings.svg?react';
import UtensilsIcon from '@/assets/icons/utensils.svg?react';

// Ииконка по умолчанию для типов блюд, для которых нет своей иконки
export const fallbackMealTypeIcon = UtensilsIcon;

// Иконки для типов блюд (meal types)
export const mealTypeIcons = {
  All: CategoriesIcon,
  Breakfast: SunIcon,
  Beverage: MugIcon,
  Lunch: BurgerIcon,
  Dinner: ServingsIcon,
  Snack: CookieIcon,
  Dessert: CupcakeIcon,
  'Side Dish': DishIcon,
  Appetizer: SaladIcon,
};
