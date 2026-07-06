export const initialRecipeFormValues = {
  name: '',
  description: '',
  image: '',
  cuisine: '',
  mealType: '',
  visibility: 'public',
  difficulty: 'Easy',
  servings: 4,
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  caloriesPerServing: 300,
  tags: '',
  ingredients: '',
  instructions: '',
};

const splitLines = (value) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const splitCommaList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const hasListItems = (value) => splitLines(value).length > 0;

const isOptionalUrl = (value) => {
  if (!value.trim()) {
    return true;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return 'Image URL must be a valid URL';
  }
};

export const recipeFormRules = {
  name: {
    required: 'Recipe name is required',
    minLength: { value: 3, message: 'Recipe name must be at least 3 characters' },
  },
  image: {
    validate: isOptionalUrl,
  },
  cuisine: {
    required: 'Cuisine is required',
  },
  mealType: {
    required: 'Meal type is required',
  },
  servings: {
    valueAsNumber: true,
    min: { value: 1, message: 'Servings must be at least 1' },
  },
  prepTimeMinutes: {
    valueAsNumber: true,
    min: { value: 0, message: 'Prep time cannot be negative' },
  },
  cookTimeMinutes: {
    valueAsNumber: true,
    min: { value: 0, message: 'Cook time cannot be negative' },
  },
  caloriesPerServing: {
    valueAsNumber: true,
    min: { value: 0, message: 'Calories cannot be negative' },
  },
  ingredients: {
    validate: (value) => hasListItems(value) || 'Add at least one ingredient',
  },
  instructions: {
    validate: (value) => hasListItems(value) || 'Add at least one instruction',
  },
};

export const buildCreateRecipePayload = (formValues) => ({
  title: formValues.name.trim(),
  description: formValues.description.trim(),
  thumbnailUrl: formValues.image.trim(),
  cuisine: formValues.cuisine.trim(),
  mealType: [formValues.mealType],
  visibility: formValues.visibility,
  difficulty: formValues.difficulty,
  servings: Number(formValues.servings),
  prepTimeMinutes: Number(formValues.prepTimeMinutes),
  cookTimeMinutes: Number(formValues.cookTimeMinutes),
  caloriesPerServing: Number(formValues.caloriesPerServing),
  tags: splitCommaList(formValues.tags),
  ingredients: splitLines(formValues.ingredients),
  instructions: splitLines(formValues.instructions),
});
