import RecipeFormActions from '../RecipeFormActions';
import { recipeFormRules } from '../../model/form';
import RecipeImageField from '../RecipeImageField';
import RecipeClassificationFields from '../RecipeClassificationFields';
import RecipeMetricsFields from '../RecipeMetricsFields';
import RecipeContentFields from '../RecipeContentFields';
import RecipeBasicFields from '../RecipeBasicFields';

const RecipeForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  message,
  messageTone = 'default',
  isSubmitting,
  mealTypes = [],
  cuisines = [],
  submitLabel = 'Add recipe',
}) => {
  const renderError = (fieldName) =>
    errors[fieldName] ? (
      <p className="text-sm text-destructive">{errors[fieldName].message}</p>
    ) : null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <RecipeBasicFields register={register} errors={errors} rules={recipeFormRules} />

        <div>
          <RecipeImageField register={register} />
          {renderError('imageFile')}
        </div>

        <RecipeClassificationFields
          register={register}
          errors={errors}
          mealTypes={mealTypes}
          cuisines={cuisines}
          rules={recipeFormRules}
        />

        <RecipeMetricsFields register={register} errors={errors} rules={recipeFormRules} />
        <RecipeContentFields register={register} errors={errors} rules={recipeFormRules} />
      </div>
      <RecipeFormActions
        message={message}
        messageTone={messageTone}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
      />
    </form>
  );
};

export default RecipeForm;
