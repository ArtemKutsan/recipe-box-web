const buildRecipeMeta = (recipe) => ({
  id: recipe.id,
  title: recipe.title,
  image: recipe.thumbnailUrl,
  caloriesPerServing: recipe.caloriesPerServing,
});

export const buildMealPlan = ({ days, mealPeriods, mealPlan }) => {
  // Для каждого периода питания формируем семь ячеек в порядке дней недели
  return mealPeriods.map(({ label, Icon }) => {
    const items = days.map(({ label: day }) => {
      const recipe = mealPlan[day]?.[label];

      return recipe ? buildRecipeMeta(recipe) : null;
    });

    return { label, Icon, items };
  });
};
