import { Button, FormField } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import { postFormRules } from '../../model/form';
import RelatedRecipeField from '../RelatedRecipeField';

const PostForm = ({
  register,
  errors,
  handleSubmit,
  setValue,
  onSubmit,
  initialSelectedRecipe = null,
  message,
  messageTone = 'default',
  isSubmitting,
  submitLabel = 'Publish post',
}) => {
  const messageClassName = cn(
    'text-sm',
    messageTone === 'error' ? 'text-destructive' : 'text-foreground',
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormField label="Title" {...register('title', postFormRules.title)} />
        {errors.title ? (
          <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
        ) : null}
      </div>

      <div>
        <FormField
          as="textarea"
          label="Post text"
          placeholder="Share a cooking result, idea, question, or note"
          className="min-h-48"
          {...register('body', postFormRules.body)}
        />
        {errors.body ? (
          <p className="mt-1 text-sm text-destructive">{errors.body.message}</p>
        ) : null}
      </div>

        <RelatedRecipeField initialSelectedRecipe={initialSelectedRecipe} setValue={setValue} />

      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <p className={messageClassName}>{message}</p>
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
