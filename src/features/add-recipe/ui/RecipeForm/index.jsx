import { Button, FormField } from '@/shared/ui';

const RecipeForm = ({ register, handleSubmit, onSubmit, message, isSubmitting, mealTypes = [], cuisines = [] }) => (
  <form className="rounded-3xl border bg-card p-6" onSubmit={handleSubmit(onSubmit)}>
    <div className="grid gap-4 md:grid-cols-2">
      <FormField label="Name" required {...register('name', { required: true })} />

      <FormField label="Image URL" {...register('image')} />

      <FormField as="select" label="Cuisine" required {...register('cuisine', { required: true })}>
        <option value="">Select cuisine</option>
        {cuisines.map((cuisine) => (
          <option key={cuisine.slug} value={cuisine.slug}>
            {cuisine.title}
          </option>
        ))}
      </FormField>

      <FormField as="select" label="Meal Type" required {...register('mealType', { required: true })}>
        <option value="">Select meal type</option>
        {mealTypes.map((mealType) => (
          <option key={mealType.slug} value={mealType.slug}>
            {mealType.title}
          </option>
        ))}
      </FormField>

      <FormField as="select" label="Difficulty" {...register('difficulty')}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </FormField>

      <FormField
        label="Servings"
        type="number"
        {...register('servings', { valueAsNumber: true })}
      />

      <FormField
        label="Prep Time"
        type="number"
        {...register('prepTimeMinutes', { valueAsNumber: true })}
      />

      <FormField
        label="Cook Time"
        type="number"
        {...register('cookTimeMinutes', { valueAsNumber: true })}
      />

      <FormField
        label="Calories"
        type="number"
        {...register('caloriesPerServing', { valueAsNumber: true })}
      />

      <FormField
        label="Tags"
        placeholder="Pizza, Italian"
        containerClassName="md:col-span-2"
        {...register('tags')}
      />

      <FormField
        as="textarea"
        label="Ingredients"
        placeholder="One ingredient per line"
        className="min-h-32"
        containerClassName="md:col-span-2"
        {...register('ingredients')}
      />

      <FormField
        as="textarea"
        label="Instructions"
        placeholder="One instruction per line"
        className="min-h-40"
        containerClassName="md:col-span-2"
        {...register('instructions')}
      />
    </div>

    <div className="mt-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <p className="text-sm text-secondary">{message}</p>
      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        Add recipe
      </Button>
    </div>
  </form>
);

export default RecipeForm;
