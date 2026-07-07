import { recipeOrderOptions, recipeSortOptions } from '../../config/options';
import CategoriesIcon from '@/assets/icons/categories.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

const RecipeDiscoveryControls = ({
  search,
  sortBy,
  order,
  viewMode,
  onSearchChange,
  onSortByChange,
  onOrderChange,
  onViewModeChange,
}) => {
  const viewButtonClassName = (isActive) =>
    cn(
      'rounded-lg border px-3',
      isActive ? 'border-secondary bg-secondary/10 text-secondary' : 'bg-card text-muted-foreground',
    );

  return (
    <div className="flex flex-col gap-4">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search recipes..."
        className="min-w-0 rounded-xl border bg-card px-4 py-2 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15"
      />

      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
            className="rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:border-secondary"
          >
            {recipeSortOptions.map((option) => (
              <option key={option.value || 'default'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={order}
            onChange={(event) => onOrderChange(event.target.value)}
            className="rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:border-secondary"
          >
            {recipeOrderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={viewButtonClassName(viewMode === 'grid')}
            aria-label="Show recipes as grid"
            onClick={() => onViewModeChange('grid')}
          >
            <CategoriesIcon className="size-5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={viewButtonClassName(viewMode === 'list')}
            aria-label="Show recipes as list"
            onClick={() => onViewModeChange('list')}
          >
            <ListIcon className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDiscoveryControls;
