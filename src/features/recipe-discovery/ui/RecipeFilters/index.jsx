import SearchIcon from '@/assets/icons/search.svg?react';
import {
  CuisineCarousel,
  CuisineSelect,
  MealTypeCarousel,
  MealTypeSelect,
} from '@/features/recipe-categorization';
import { Button } from '@/shared/ui';

const RecipeFilters = ({
  search,
  mealType,
  cuisine,
  mealTypes = [],
  cuisines = [],
  mealTypeItems = [],
  cuisineItems = [],
  onSearchChange,
  onMealTypeChange,
  onCuisineChange,
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

    </div>
  );
};

export default RecipeFilters;
