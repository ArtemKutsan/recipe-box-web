import { FormField } from '@/shared/ui';

const minValues = {
  servings: 1,
  prepTimeMinutes: 0,
  cookTimeMinutes: 0,
  caloriesPerServing: 0,
};

const RecipeMetricsFields = ({ register, errors, rules }) => {
  const renderError = (fieldName) =>
    errors[fieldName] ? <p className="text-sm text-destructive">{errors[fieldName].message}</p> : null;

  return (
    <div className="md:col-span-2 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        ['servings', 'Servings'],
        ['prepTimeMinutes', 'Prep Time'],
        ['cookTimeMinutes', 'Cook Time'],
        ['caloriesPerServing', 'Calories'],
      ].map(([name, label]) => (
        <div key={name}>
          <FormField
            label={label}
            type="number"
            min={minValues[name]}
            step="1"
            showLabel
            {...register(name, rules[name])}
          />
          {renderError(name)}
        </div>
      ))}
    </div>
  );
};

export default RecipeMetricsFields;
