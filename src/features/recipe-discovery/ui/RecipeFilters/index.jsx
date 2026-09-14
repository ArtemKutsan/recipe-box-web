import ArrowUpIcon from '@/assets/icons/arrow-up.svg?react';
import CategoriesIcon from '@/assets/icons/categories.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import {
  CuisineCarousel,
  CuisineSelect,
  MealTypeCarousel,
  MealTypeSelect,
} from '@/features/recipe-categorization';
import { Button, ToggleGroup } from '@/shared/ui';

const RECIPE_VIEW_OPTIONS = [
  {
    value: 'grid',
    label: <CategoriesIcon className="size-4" aria-hidden="true" />,
    ariaLabel: 'Show recipes as grid',
  },
  {
    value: 'list',
    label: <ListIcon className="size-4" aria-hidden="true" />,
    ariaLabel: 'Show recipes as list',
  },
];

const RECIPE_SORT_OPTIONS = [
  { value: '', label: 'Sort by default' },
  { value: 'title', label: 'Name' },
  { value: 'rating', label: 'Rating' },
  { value: 'cookTimeMinutes', label: 'Cook time' },
];

const RECIPE_ORDER_OPTIONS = [
  {
    value: 'asc',
    label: <ArrowUpIcon className="size-4" aria-hidden="true" />,
    ariaLabel: 'Ascending order',
  },
  {
    value: 'desc',
    label: <ArrowUpIcon className="size-4 rotate-180" aria-hidden="true" />,
    ariaLabel: 'Descending order',
  },
];

const RecipeFilters = ({
  search,
  mealType,
  cuisine,
  sortBy,
  order,
  viewMode,
  mealTypes = [],
  cuisines = [],
  mealTypeItems = [],
  cuisineItems = [],
  resultTitle = '',
  onSearchChange,
  onMealTypeChange,
  onCuisineChange,
  onSortByChange,
  onOrderChange,
  onViewModeChange,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-4xl bg-card p-4">
        <div className="flex flex-col gap-3">
          <MealTypeCarousel
            items={mealTypeItems}
            activeMealType={mealType || 'All'}
            onSelect={(value) => onMealTypeChange(value === 'All' ? '' : value)}
          />
          <CuisineCarousel
            cuisines={cuisineItems}
            activeCuisine={cuisine || null}
            onSelect={onCuisineChange}
          />
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="text-sm flex min-h-10 min-w-0 items-center gap-3 rounded-xl border bg-white px-3 md:flex-[1.35]">
            <span className="shrink-0 text-muted-foreground" aria-hidden="true">
              <SearchIcon className="size-4" />
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search in recipes"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              aria-label="Search in recipes"
            />
          </label>

          <MealTypeSelect value={mealType} options={mealTypes} onChange={onMealTypeChange} />
          <CuisineSelect value={cuisine} options={cuisines} onChange={onCuisineChange} />
          <div className="flex items-center justify-start md:shrink-0 md:justify-end">
            <Button
              type="button"
              variant="ghost"
              className="min-h-10 px-0 hover:text-secondary md:px-3"
              onClick={onClearFilters}
            >
              Clear filters
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {resultTitle ? <h2 className="text-xl font-semibold">{resultTitle}</h2> : null}

        <div className="flex min-w-0 items-center justify-end gap-2">
          <div className="overflow-clip flex min-w-0 flex-1 items-center border rounded-xl bg-white sm:max-w-xs">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <span className="hidden shrink-0 text-sm text-muted-foreground sm:inline">
                Sort by
              </span>
              <select
                value={sortBy}
                onChange={(event) => onSortByChange(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              >
                {RECIPE_SORT_OPTIONS.map((option) => (
                  <option key={option.value || 'default'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="shrink-0 bg-border p-1">
              <ToggleGroup
                options={RECIPE_ORDER_OPTIONS}
                value={order}
                onChange={onOrderChange}
                ariaLabel="Recipe sort order"
                className="rounded-none p-0"
              />
            </div>
          </div>

          <ToggleGroup
            options={RECIPE_VIEW_OPTIONS}
            value={viewMode}
            onChange={onViewModeChange}
            ariaLabel="Recipe view"
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
