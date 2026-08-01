import { Button, FormField } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import { recipeFormRules } from '../../model/form';

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

        <div className="md:col-span-2 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <FormField
              as="select"
              label="Cuisine"
              required
              {...register('cuisine', recipeFormRules.cuisine)}
            >
              <option value="">Select cuisine</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine.slug} value={cuisine.slug}>
                  {cuisine.title}
                </option>
              ))}
            </FormField>
            {renderError('cuisine')}
          </div>

          <div>
            <FormField
              as="select"
              label="Meal Type"
              required
              {...register('mealType', recipeFormRules.mealType)}
            >
              <option value="">Select meal type</option>
              {mealTypes.map((mealType) => (
                <option key={mealType.slug} value={mealType.slug}>
                  {mealType.title}
                </option>
              ))}
            </FormField>
            {renderError('mealType')}
          </div>

          <div>
            <FormField as="select" label="Visibility" {...register('visibility')}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </FormField>
          </div>

          <FormField as="select" label="Difficulty" {...register('difficulty')}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </FormField>

          <div>
            <FormField
              label="Servings"
              type="number"
              {...register('servings', recipeFormRules.servings)}
            />
            {renderError('servings')}
          </div>

          <div>
            <FormField
              label="Prep Time"
              type="number"
              {...register('prepTimeMinutes', recipeFormRules.prepTimeMinutes)}
            />
            {renderError('prepTimeMinutes')}
          </div>

          <div>
            <FormField
              label="Cook Time"
              type="number"
              {...register('cookTimeMinutes', recipeFormRules.cookTimeMinutes)}
            />
            {renderError('cookTimeMinutes')}
          </div>

          <div>
            <FormField
              label="Calories"
              type="number"
              {...register('caloriesPerServing', recipeFormRules.caloriesPerServing)}
            />
            {renderError('caloriesPerServing')}
          </div>
        </div>

        <FormField
          label="Tags"
          placeholder="Pizza, Italian"
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
