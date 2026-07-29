import RecipeListItem from '../RecipeListItem';
import { cn } from '@/shared/lib/cn';

const RecipeList = ({ recipes = [], viewMode = 'list', renderFavoriteAction }) => {
  if (recipes.length === 0) {
    return <p>No recipes yet</p>;
  }

  return (
    <ul
      className={cn(
        viewMode === 'grid'
          ? 'grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          : 'space-y-4',
      )}
    >
      {recipes.map((recipe) => (
        <li key={recipe.id ?? recipe.name}>
          <RecipeListItem
            recipe={recipe}
            viewMode={viewMode}
            favoriteAction={renderFavoriteAction?.(recipe)}
          />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
