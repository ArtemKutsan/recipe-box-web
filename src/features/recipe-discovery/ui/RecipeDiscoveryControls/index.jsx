import { recipeOrderOptions, recipeSortOptions } from '../../config/options';
import CategoriesIcon from '@/assets/icons/categories.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

const RecipeDiscoveryControls = ({
  search,
  mealType,
  cuisine,
  sortBy,
  order,
  viewMode,
  mealTypes = [],
  cuisines = [],
  onSearchChange,
  onMealTypeChange,
  onCuisineChange,
  onSortByChange,
  onOrderChange,
  onViewModeChange,
  onClearFilters,
}) => {
  const viewButtonClassName = (isActive) =>
    cn(
      'rounded-lg border px-3',
      isActive
        ? 'border-secondary bg-secondary/10 text-secondary'
        : 'bg-card text-muted-foreground',
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative min-w-0 md:flex-[1.35]">
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            >
              <SearchIcon className="size-4" />
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search in recipes"
              className="h-9 w-full rounded-lg border bg-background px-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none"
              aria-label="Search in recipes"
            />
          </label>

          <select
            value={mealType}
            onChange={(event) => onMealTypeChange(event.target.value)}
            className="min-w-0 rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:border-secondary md:flex-1"
          >
            <option value="">All meal types</option>
            {mealTypes.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          <select
            value={cuisine}
            onChange={(event) => onCuisineChange(event.target.value)}
            className="min-w-0 rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:border-secondary md:flex-1"
          >
            <option value="">All cuisines</option>
            {cuisines.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-start md:shrink-0 md:justify-end">
            <Button
              type="button"
              variant="ghost"
              className="h-9 px-0 text-secondary/80 md:px-3"
              onClick={onClearFilters}
            >
              Clear filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <select
              value={sortBy}
              onChange={(event) => onSortByChange(event.target.value)}
              className="rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:border-secondary"
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
              className="rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:border-secondary"
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
    </div>
  );
};

export default RecipeDiscoveryControls;
