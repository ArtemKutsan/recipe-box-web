// src/features/recipe-filters/ui/MealTypeCarousel/MealTypeOption.jsx
import { cn } from '@/shared/lib/cn';

const MealTypeOption = ({ item, isActive, onSelect }) => {
  const { title, slug, count, Icon } = item;

  return (
    <button
      type="button"
      onClick={() => onSelect(slug)}
      className={cn(
        'flex h-16 min-w-40 flex-row items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors',
        isActive
          ? 'border-secondary/10 bg-secondary/5 text-secondary'
          : 'border-border bg-card text-foreground hover:border-secondary/50',
      )}
    >
      <Icon
        className={cn('size-8 shrink-0', isActive ? 'text-secondary' : 'text-foreground')}
        aria-hidden="true"
      />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold">
          {title === 'All' ? 'All Recipes' : title}
        </span>
        <span className="text-sm font-medium text-muted-foreground">{count} recipes</span>
      </span>
    </button>
  );
};

export default MealTypeOption;
