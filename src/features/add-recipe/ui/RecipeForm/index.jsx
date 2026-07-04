import { Button, FormField } from '@/shared/ui';

const hasListItems = (value) => value.split('\n').some((item) => item.trim());

const RecipeForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  message,
  isSubmitting,
  mealTypes = [],
  cuisines = [],
}) => {
  const renderError = (fieldName) =>
    errors[fieldName] ? <p className="text-sm text-destructive">{errors[fieldName].message}</p> : null;

  return (
    <form className="rounded-3xl border bg-card p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FormField
            label="Name"
            required
            {...register('name', {
              required: 'Recipe name is required',
              minLength: { value: 3, message: 'Recipe name must be at least 3 characters' },
            })}
          />
          {renderError('name')}
        </div>

        <FormField label="Image URL" {...register('image')} />

        <div>
          <FormField
            as="select"
            label="Cuisine"
            required
            {...register('cuisine', { required: 'Cuisine is required' })}
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
            {...register('mealType', { required: 'Meal type is required' })}
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

        <FormField as="select" label="Difficulty" {...register('difficulty')}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </FormField>

        <div>
          <FormField
            label="Servings"
            type="number"
            {...register('servings', {
              valueAsNumber: true,
              min: { value: 1, message: 'Servings must be at least 1' },
            })}
          />
          {renderError('servings')}
        </div>

        <div>
          <FormField
            label="Prep Time"
            type="number"
            {...register('prepTimeMinutes', {
              valueAsNumber: true,
              min: { value: 0, message: 'Prep time cannot be negative' },
            })}
          />
          {renderError('prepTimeMinutes')}
        </div>

        <div>
          <FormField
            label="Cook Time"
            type="number"
            {...register('cookTimeMinutes', {
              valueAsNumber: true,
              min: { value: 0, message: 'Cook time cannot be negative' },
            })}
          />
          {renderError('cookTimeMinutes')}
        </div>

        <div>
          <FormField
            label="Calories"
            type="number"
            {...register('caloriesPerServing', {
              valueAsNumber: true,
              min: { value: 0, message: 'Calories cannot be negative' },
            })}
          />
          {renderError('caloriesPerServing')}
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
            placeholder="One ingredient per line"
            className="min-h-32"
            {...register('ingredients', {
              validate: (value) => hasListItems(value) || 'Add at least one ingredient',
            })}
          />
          {renderError('ingredients')}
        </div>

        <div className="md:col-span-2">
          <FormField
            as="textarea"
            label="Instructions"
            placeholder="One instruction per line"
            className="min-h-40"
            {...register('instructions', {
              validate: (value) => hasListItems(value) || 'Add at least one instruction',
            })}
          />
          {renderError('instructions')}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-secondary">{message}</p>
        <Button type="submit" variant="secondary" disabled={isSubmitting}>
          Add recipe
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;
