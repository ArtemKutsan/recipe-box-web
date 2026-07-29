import RecipeGridCard from './RecipeGridCard';
import RecipeRowCard from './RecipeRowCard';

const RecipeListItem = ({ recipe, viewMode = 'list', favoriteAction = null }) => {
  if (viewMode === 'grid') {
    return <RecipeGridCard recipe={recipe} favoriteAction={favoriteAction} />;
  }

  return <RecipeRowCard recipe={recipe} favoriteAction={favoriteAction} />;
};

export default RecipeListItem;
