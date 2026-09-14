import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

const RecipeFormActions = ({ message, messageTone = 'default', isSubmitting, submitLabel }) => {
  const messageClassName = cn(
    'text-sm',
    messageTone === 'error' ? 'text-destructive' : 'text-foreground',
  );

  return (
    <div className="mt-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <p className={messageClassName}>{message}</p>
      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </div>
  );
};

export default RecipeFormActions;
