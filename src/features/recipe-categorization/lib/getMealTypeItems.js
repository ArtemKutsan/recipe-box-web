import {
  fallbackMealTypeIcon,
  mealTypeIcons,
} from '@/features/recipe-categorization/config/mealTypeIcons';

// Собирает UI-список типов блюд из справочника backend и добавляет пункт All.
export const getMealTypeItems = (mealTypes, recipesCount = 0) => [
  {
    name: 'All',
    slug: 'All',
    count: recipesCount,
    Icon: mealTypeIcons.All ?? fallbackMealTypeIcon,
  },
  ...mealTypes.map((mealType) => ({
    name: mealType.title,
    slug: mealType.slug,
    count: mealType.recipesCount ?? 0,
    Icon: mealTypeIcons[mealType.title] ?? fallbackMealTypeIcon,
  })),
];
