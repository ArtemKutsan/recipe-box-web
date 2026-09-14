import { FormField } from '@/shared/ui';

const RecipeClassificationFields = ({ register, errors, mealTypes = [], cuisines = [], rules }) => {
  const renderError = (fieldName) =>
    errors[fieldName] ? <p className="text-sm text-destructive">{errors[fieldName].message}</p> : null;

  return (
    <div className="md:col-span-2 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <FormField as="select" label="Cuisine" required {...register('cuisine', rules.cuisine)}>
          <option value="">Select cuisine</option>
          {cuisines.map((cuisine) => <option key={cuisine.slug} value={cuisine.slug}>{cuisine.title}</option>)}
        </FormField>
        {renderError('cuisine')}
      </div>
      <div>
        <FormField as="select" label="Meal Type" required {...register('mealType', rules.mealType)}>
          <option value="">Select meal type</option>
          {mealTypes.map((mealType) => <option key={mealType.slug} value={mealType.slug}>{mealType.title}</option>)}
        </FormField>
        {renderError('mealType')}
      </div>
      <FormField as="select" label="Visibility" {...register('visibility')}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </FormField>
      <FormField as="select" label="Difficulty" {...register('difficulty')}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </FormField>
    </div>
  );
};

export default RecipeClassificationFields;
