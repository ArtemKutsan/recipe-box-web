import {
  CuisineCarousel,
  CuisineSelect,
  MealTypeCarousel,
  MealTypeSelect,
} from '@/features/recipe-categorization';
import RecipeSearch from '../RecipeSearch';
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
          <RecipeSearch value={search} onChange={onSearchChange} />

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
