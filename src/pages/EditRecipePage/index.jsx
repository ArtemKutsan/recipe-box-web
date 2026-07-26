import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAuthUser } from '@/entities/auth';
import { useGetCuisinesQuery } from '@/entities/cuisine';
import { useGetMealTypesQuery } from '@/entities/meal-type';
import { useRecipe, useUpdateRecipeMutation } from '@/entities/recipe';
import {
  buildRecipeFormValues,
  buildRecipePayload,
  RecipeForm,
} from '@/features/recipe-form';
import { buildRecipePath } from '@/shared/config/routerPaths';

const EditRecipeForm = ({ recipe, mealTypes, cuisines }) => {
  const navigate = useNavigate();
  const [updateRecipe, { isLoading }] = useUpdateRecipeMutation();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: buildRecipeFormValues(recipe, mealTypes, cuisines),
  });

  const onSubmit = async (formValues) => {
    clearErrors('root.server');

    try {
      const updatedRecipe = await updateRecipe({
        recipeId: recipe.id,
        recipe: buildRecipePayload(formValues),
      }).unwrap();

      navigate(buildRecipePath(updatedRecipe.id));
    } catch (error) {
      setError('root.server', {
        type: 'server',
        message: error?.data?.message ?? error?.message ?? 'Failed to update recipe',
      });
    }
  };

  return (
    <RecipeForm
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      message={isLoading ? 'Saving recipe...' : errors.root?.server?.message ?? ''}
      messageTone={errors.root?.server ? 'error' : 'default'}
      isSubmitting={isLoading}
      mealTypes={mealTypes}
      cuisines={cuisines}
      submitLabel="Save changes"
    />
  );
};

const EditRecipePage = () => {
  const { id } = useParams();
  const authUser = useSelector(selectAuthUser);
  const { recipe, status, error } = useRecipe(id);
  const {
    data: mealTypes = [],
    isLoading: isMealTypesLoading,
    isError: isMealTypesError,
  } = useGetMealTypesQuery();
  const {
    data: cuisines = [],
    isLoading: isCuisinesLoading,
    isError: isCuisinesError,
  } = useGetCuisinesQuery();

  if (status === 'idle' || status === 'loading' || isMealTypesLoading || isCuisinesLoading) {
    return <p>Loading recipe...</p>;
  }

  if (error || isMealTypesError || isCuisinesError) {
    return <p>{error ?? 'Failed to load recipe dictionaries'}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  if (String(authUser?.id) !== String(recipe.author?.id)) {
    return <p>You can edit only your own recipes.</p>;
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Recipe</h1>
        <p>Update your recipe</p>
      </header>

      <EditRecipeForm recipe={recipe} mealTypes={mealTypes} cuisines={cuisines} />
    </section>
  );
};

export default EditRecipePage;
