// src/widgets/Sidebar/navItems.js
import { RouterPath } from '@/shared/config/routerPaths';
import HomeIcon from '@/assets/icons/home.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import NotebookIcon from '@/assets/icons/notebook.svg?react';
import CalendarIcon from '@/assets/icons/calendar.svg?react';
import NotesIcon from '@/assets/icons/notes.svg?react';

// Основное меню содержит продуктовые разделы, а auth-ссылки рендерятся отдельно внизу Sidebar.
export const navItems = [
  { to: RouterPath.recipes, label: 'Recipes', Icon: HomeIcon },
  { to: RouterPath.posts, label: 'Posts', Icon: NotesIcon },
  { to: RouterPath.add_recipe, label: 'Add Recipe', Icon: ListIcon, authOnly: true },
  { to: RouterPath.add_post, label: 'Create Post', Icon: NotebookIcon, authOnly: true },
  { to: RouterPath.meal_planner, label: 'Meal Planner', Icon: CalendarIcon },
];
