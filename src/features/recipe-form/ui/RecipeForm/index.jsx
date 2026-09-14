import { Button, FormField } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import { recipeFormRules } from '../../model/form';
import RecipeImageField from '../RecipeImageField';
import RecipeClassificationFields from '../RecipeClassificationFields';
import RecipeMetricsFields from '../RecipeMetricsFields';

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
  const messageClassName = cn(
    'text-sm',
    messageTone === 'error' ? 'text-destructive' : 'text-foreground',
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FormField label="Name" required {...register('name', recipeFormRules.name)} />
          {renderError('name')}
        </div>

        <div>
          <FormField label="Image URL" {...register('image', recipeFormRules.image)} />
          {renderError('image')}
        </div>

        <div>
          <RecipeImageField register={register} />
          {renderError('imageFile')}
        </div>

        <FormField
          as="textarea"
          label="Description"
          placeholder="Short recipe description"
          className="min-h-24"
          containerClassName="md:col-span-2"
          {...register('description')}
        />

        <FormField
          as="textarea"
          label="Author Note"
          placeholder="Share the story or personal context behind this recipe"
          className="min-h-28"
          containerClassName="md:col-span-2"
          {...register('authorNote')}
        />

        <RecipeClassificationFields
          register={register}
          errors={errors}
          mealTypes={mealTypes}
          cuisines={cuisines}
          rules={recipeFormRules}
        />

          <RecipeMetricsFields register={register} errors={errors} rules={recipeFormRules} />
        </div>

        <FormField
          label="Tags"
          placeholder="Pizza, Italian"
          showLabel
          containerClassName="md:col-span-2"
          {...register('tags')}
        />

        <div className="md:col-span-2">
          <FormField
            as="textarea"
            label="Ingredients"
            placeholder="Ingredients, one per line"
            className="min-h-32"
            {...register('ingredients', recipeFormRules.ingredients)}
          />
          {renderError('ingredients')}
        </div>

        <div className="md:col-span-2">
          <FormField
            as="textarea"
            label="Instructions"
            placeholder="Instructions, one step per line"
            className="min-h-40"
            {...register('instructions', recipeFormRules.instructions)}
          />
          {renderError('instructions')}
        </div>
      <div className="mt-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <p className={messageClassName}>{message}</p>
        <Button type="submit" variant="secondary" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;
