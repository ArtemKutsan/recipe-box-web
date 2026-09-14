import { FormField } from '@/shared/ui';

const RecipeContentFields = ({ register, errors, rules }) => {
  const renderError = (fieldName) =>
    errors[fieldName] ? <p className="text-sm text-destructive">{errors[fieldName].message}</p> : null;

  return (
    <>
      <FormField as="textarea" label="Description" placeholder="Short recipe description" className="min-h-24" containerClassName="md:col-span-2" {...register('description')} />
      <FormField as="textarea" label="Author Note" placeholder="Share the story or personal context behind this recipe" className="min-h-28" containerClassName="md:col-span-2" {...register('authorNote')} />
      <FormField label="Tags" placeholder="Pizza, Italian" showLabel containerClassName="md:col-span-2" {...register('tags')} />
      <div className="md:col-span-2">
        <FormField as="textarea" label="Ingredients" placeholder="Ingredients, one per line" className="min-h-32" {...register('ingredients', rules.ingredients)} />
        {renderError('ingredients')}
      </div>
      <div className="md:col-span-2">
        <FormField as="textarea" label="Instructions" placeholder="Instructions, one step per line" className="min-h-40" {...register('instructions', rules.instructions)} />
        {renderError('instructions')}
      </div>
    </>
  );
};

export default RecipeContentFields;
