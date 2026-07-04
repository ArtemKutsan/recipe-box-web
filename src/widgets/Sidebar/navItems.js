// src/widgets/Sidebar/navItems.js
import { RouterPath } from '@/shared/config/routerPaths';
import HomeIcon from '@/assets/icons/home.svg?react';
import CategoriesIcon from '@/assets/icons/categories.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import CalendarIcon from '@/assets/icons/calendar.svg?react';
import ProfileIcon from '@/assets/icons/profile.svg?react';

// Конфигурация навигационных пунктов для сайдбара, которая включает путь, метку и иконку для каждого пункта
export const navItems = [
  { to: RouterPath.recipes, label: 'Recipes', Icon: HomeIcon },
  { to: RouterPath.categories, label: 'Categories', Icon: CategoriesIcon },
  { to: RouterPath.login, label: 'Login', Icon: ProfileIcon },
  { to: RouterPath.register, label: 'Register', Icon: ProfileIcon },
  { to: RouterPath.add_recipe, label: 'Add Recipe', Icon: ListIcon },
  { to: RouterPath.meal_planner, label: 'Meal Planner', Icon: CalendarIcon },
  { to: RouterPath.profile, label: 'Profile', Icon: ProfileIcon },
];
