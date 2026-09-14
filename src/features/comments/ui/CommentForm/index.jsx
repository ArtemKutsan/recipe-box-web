import { useForm } from 'react-hook-form';
import { useCreateCommentMutation } from '@/entities/comment';
import { Button, FormField } from '@/shared/ui';

const CommentForm = ({ targetType, targetId, parentCommentId = null, onDone }) => {
  const [createComment, createState] = useCreateCommentMutation();
  const { register, handleSubmit, reset } = useForm({ defaultValues: { body: '' } });
  const targetLabel = targetType === 'post' ? 'post' : 'recipe';

  const handleCreateComment = async ({ body }) => {
    await createComment({ targetType, targetId, body, parentCommentId }).unwrap();
    reset();
    onDone();
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handleCreateComment)}>
      <FormField
        as="textarea"
        label={parentCommentId ? 'Reply' : 'Comment'}
        placeholder={
          parentCommentId ? 'Write a reply' : `Share your thoughts about this ${targetLabel}`
        }
        rows={3}
        {...register('body', { required: true, maxLength: 2000 })}
      />
      <Button type="submit" disabled={createState.isLoading}>
        {createState.isLoading ? 'Sending...' : parentCommentId ? 'Reply' : 'Add comment'}
      </Button>
      {createState.isError ? (
        <p className="text-sm text-destructive">Failed to send comment.</p>
      ) : null}
    </form>
  );
};

export default CommentForm;
