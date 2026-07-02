// src/features/recipe-categorization/ui/MealTypeSelectorItem/index.jsx
import { cn } from '@/shared/lib/cn';

// Компонент MealTypeSelectorItem принимает объект item, который содержит информацию о типе блюда (name, count и Icon), булевое значение isActive для определения активного элемента и функцию onSelect для обработки выбора типа блюда. Он отображает кнопку с иконкой, названием типа блюда и количеством рецептов, а также изменяет стиль кнопки в зависимости от того, является ли она активной.
const MealTypeSelectorItem = ({ item, isActive, onSelect }) => {
  const { name, slug, count, Icon } = item;

  return (
    <button
      type="button"
      onClick={() => onSelect(slug)}
      className={cn(
        'flex min-h-32 min-w-28 flex-col items-center justify-center gap-4 rounded-lg border p-4',
        isActive ? 'bg-secondary/5' : 'bg-card',
      )}
    >
      <Icon className={cn('size-8', isActive ? 'text-secondary' : '')} aria-hidden="true" />
      <span className="text-sm font-semibold">{name === 'All' ? 'All Recipes' : name}</span>
      <span className="text-sm text-muted-foreground">{count}</span>
    </button>
  );
};

export default MealTypeSelectorItem;
