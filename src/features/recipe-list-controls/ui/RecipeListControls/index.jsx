import ArrowUpIcon from '@/assets/icons/arrow-up.svg?react';
import CategoriesIcon from '@/assets/icons/categories.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import { ToggleGroup } from '@/shared/ui';

const RECIPE_VIEW_OPTIONS = [
  { value: 'grid', label: <CategoriesIcon className="size-4" aria-hidden="true" />, ariaLabel: 'Show recipes as grid' },
  { value: 'list', label: <ListIcon className="size-4" aria-hidden="true" />, ariaLabel: 'Show recipes as list' },
];

const RECIPE_SORT_OPTIONS = [
  { value: '', label: 'Sort by default' },
  { value: 'title', label: 'Name' },
  { value: 'rating', label: 'Rating' },
  { value: 'cookTimeMinutes', label: 'Cook time' },
];

const RECIPE_ORDER_OPTIONS = [
  { value: 'asc', label: <ArrowUpIcon className="size-4" aria-hidden="true" />, ariaLabel: 'Ascending order' },
  { value: 'desc', label: <ArrowUpIcon className="size-4 rotate-180" aria-hidden="true" />, ariaLabel: 'Descending order' },
];

const RecipeListControls = ({
  resultTitle = '',
  sortBy,
  order,
  viewMode,
  onSortByChange,
  onOrderChange,
  onViewModeChange,
}) => (
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    {resultTitle ? <h2 className="text-xl font-semibold">{resultTitle}</h2> : null}

    <div className="flex min-w-0 items-center justify-end gap-2">
      <div className="overflow-clip flex min-w-0 flex-1 items-center border rounded-xl bg-white sm:max-w-xs">
        <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
          <span className="hidden shrink-0 text-sm text-muted-foreground sm:inline">Sort by</span>
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
          <ToggleGroup options={RECIPE_ORDER_OPTIONS} value={order} onChange={onOrderChange} ariaLabel="Recipe sort order" className="rounded-none p-0" />
        </div>
      </div>

      <ToggleGroup options={RECIPE_VIEW_OPTIONS} value={viewMode} onChange={onViewModeChange} ariaLabel="Recipe view" className="shrink-0" />
    </div>
  </div>
);

export default RecipeListControls;
