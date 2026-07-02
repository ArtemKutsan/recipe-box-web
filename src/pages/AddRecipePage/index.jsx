import { useForm } from 'react-hook-form';
import { useCreateRecipeMutation } from '@/entities/recipe';
import { RecipeForm } from '@/features/add-recipe';

// Начальное состояние формы для создания нового рецепта
const initialFormValues = {
  name: '',
  image: '',
  cuisine: '',
  mealType: '',
  difficulty: 'Easy',
  servings: 4,
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  caloriesPerServing: 300,
  tags: '',
  ingredients: '',
  instructions: '',
};

const AddRecipePage = () => {
  const [createRecipe, { isLoading, isSuccess, isError, error }] = useCreateRecipeMutation();
  // Инициализация React Hook Form с начальными значениями формы
  const { register, handleSubmit, reset: resetForm } = useForm({
    defaultValues: initialFormValues,
  });

  const onSubmit = async (formValues) => {
    const nextRecipe = {
      title: formValues.name.trim(),
      thumbnailUrl: formValues.image.trim(),
      cuisine: formValues.cuisine.trim(),
      mealType: formValues.mealType
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      difficulty: formValues.difficulty,
      servings: Number(formValues.servings),
      prepTimeMinutes: Number(formValues.prepTimeMinutes),
      cookTimeMinutes: Number(formValues.cookTimeMinutes),
      caloriesPerServing: Number(formValues.caloriesPerServing),
      tags: formValues.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      ingredients: formValues.ingredients
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: formValues.instructions
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      rating: 0,
      reviewCount: 0,
    };

    try {
      const createdRecipe = await createRecipe(nextRecipe).unwrap();

      console.log('Recipe created:', createdRecipe);
      resetForm(initialFormValues);
    } catch (error) {
      console.error('Failed to create recipe:', error);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Add Recipe</h1>
        <p>Add a new recipe</p>
      </header>

      <RecipeForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        message={
          isLoading
            ? 'Creating recipe...'
            : isError
              ? error?.data?.message ?? error?.message ?? 'Failed to create recipe'
              : isSuccess
                ? 'Recipe created.'
                : ''
        }
        isSubmitting={isLoading}
      />
    </section>
  );
};

export default AddRecipePage;
