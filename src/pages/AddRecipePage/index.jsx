import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGetCuisinesQuery } from '@/entities/cuisine';
import { useGetMealTypesQuery } from '@/entities/meal-type';
import { useCreateRecipeMutation } from '@/entities/recipe';
import { buildCreateRecipePayload, initialRecipeFormValues, RecipeForm } from '@/features/add-recipe';
import { buildRecipePath } from '@/shared/config/routerPaths';

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
    defaultValues: initialRecipeFormValues,
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
    const nextRecipe = buildCreateRecipePayload(formValues);

    try {
      const createdRecipe = await createRecipe(nextRecipe).unwrap();

      resetForm(initialRecipeFormValues);
      // После создания открываем детальную страницу, чтобы пользователь сразу видел сохраненный рецепт.
      navigate(buildRecipePath(createdRecipe.id));
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
