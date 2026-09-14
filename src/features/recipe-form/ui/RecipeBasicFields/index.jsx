import { FormField } from '@/shared/ui';

const RecipeBasicFields = ({ register, errors, rules }) => {
  const renderError = (fieldName) =>
    errors[fieldName] ? <p className="text-sm text-destructive">{errors[fieldName].message}</p> : null;

  return (
    <>
      <div>
        <FormField label="Title" required {...register('title', rules.title)} />
        {renderError('title')}
      </div>
      <div>
        <FormField label="Image URL" {...register('image', rules.image)} />
        {renderError('image')}
      </div>
    </>
  );
};

export default RecipeBasicFields;
