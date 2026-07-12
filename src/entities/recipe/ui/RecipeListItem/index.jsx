import RecipeGridCard from './RecipeGridCard';
import RecipeRowCard from './RecipeRowCard';

const RecipeListItem = ({ recipe, viewMode = 'list' }) => {
  if (viewMode === 'grid') {
    return <RecipeGridCard recipe={recipe} />;
  }

  return <RecipeRowCard recipe={recipe} />;
};

export default RecipeListItem;
