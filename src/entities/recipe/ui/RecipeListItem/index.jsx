import RecipeGridCard from './RecipeGridCard';
import RecipeRowCard from './RecipeRowCard';

const RecipeListItem = ({ recipe, viewMode = 'list', favoriteButton = null }) => {
  if (viewMode === 'grid') {
    return <RecipeGridCard recipe={recipe} favoriteButton={favoriteButton} />;
  }

  return <RecipeRowCard recipe={recipe} favoriteButton={favoriteButton} />;
};

export default RecipeListItem;
