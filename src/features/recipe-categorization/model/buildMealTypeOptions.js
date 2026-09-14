import {
  fallbackMealTypeIcon,
  mealTypeIcons,
} from '@/features/recipe-categorization/config/mealTypeIcons';

// Собирает UI-список типов блюд из справочника backend и добавляет пункт All.
export const buildMealTypeOptions = (mealTypes, recipesCount = 0) => {
  const options = mealTypes.map((mealType) => ({
    title: mealType.title,
    slug: mealType.slug,
    count: mealType.recipesCount ?? 0,
    Icon: mealTypeIcons[mealType.title] ?? fallbackMealTypeIcon,
  }));

  return [
    {
      title: 'All',
      slug: 'All',
      count: recipesCount,
      Icon: mealTypeIcons.All ?? fallbackMealTypeIcon,
    },
    ...options,
  ];
};
