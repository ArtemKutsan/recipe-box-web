import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGetCuisinesQuery } from '@/entities/cuisine';
import { useGetMealTypesQuery } from '@/entities/meal-type';
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

const AddRecipePage = () => {
  const navigate = useNavigate();
  const [createRecipe, { isLoading, isSuccess, isError, error }] = useCreateRecipeMutation();
  const {
    data: mealTypes = [],
    isLoading: isMealTypesLoading,
    isError: isMealTypesError,
    error: mealTypesError,
  } = useGetMealTypesQuery();
  const {
    data: cuisines = [],
    isLoading: isCuisinesLoading,
    isError: isCuisinesError,
    error: cuisinesError,
  } = useGetCuisinesQuery();
  const isDictionariesLoading = isMealTypesLoading || isCuisinesLoading;
  const dictionariesError = mealTypesError ?? cuisinesError;
  // Инициализация React Hook Form с начальными значениями формы
  const { register, handleSubmit, reset: resetForm, formState: { errors } } = useForm({
    defaultValues: initialFormValues,
  });

  const formMessage = isLoading
    ? 'Creating recipe...'
    : isDictionariesLoading
      ? 'Loading recipe dictionaries...'
      : isMealTypesError || isCuisinesError
        ? dictionariesError?.data?.message ?? dictionariesError?.message ?? 'Failed to load recipe dictionaries'
        : isError
          ? error?.data?.message ?? error?.message ?? 'Failed to create recipe'
          : isSuccess
            ? 'Recipe created.'
            : '';

  const onSubmit = async (formValues) => {
    const nextRecipe = {
      title: formValues.name.trim(),
      thumbnailUrl: formValues.image.trim(),
      cuisine: formValues.cuisine.trim(),
      mealType: [formValues.mealType],
      difficulty: formValues.difficulty,
      servings: Number(formValues.servings),
      prepTimeMinutes: Number(formValues.prepTimeMinutes),
      cookTimeMinutes: Number(formValues.cookTimeMinutes),
      caloriesPerServing: Number(formValues.caloriesPerServing),
      tags: splitCommaList(formValues.tags),
      ingredients: splitLines(formValues.ingredients),
      instructions: splitLines(formValues.instructions),
      rating: 0,
      reviewCount: 0,
    };

    try {
      const createdRecipe = await createRecipe(nextRecipe).unwrap();

      resetForm(initialFormValues);
      // После создания открываем детальную страницу, чтобы пользователь сразу видел сохраненный рецепт.
      navigate(`/recipes/${createdRecipe.id}`);
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
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        message={formMessage}
        isSubmitting={isLoading || isDictionariesLoading || isMealTypesError || isCuisinesError}
        mealTypes={mealTypes}
        cuisines={cuisines}
      />
    </section>
  );
};

export default AddRecipePage;
