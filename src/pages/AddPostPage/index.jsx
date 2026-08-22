import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '@/entities/post';
import { initialPostFormValues, PostForm } from '@/features/post-form';
import { buildPostPath } from '@/shared/config/routerPaths';

const AddPostPage = () => {
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initialPostFormValues });

  const onSubmit = async (formValues) => {
    try {
      const createdPost = await createPost(formValues).unwrap();
      navigate(buildPostPath(createdPost.id));
    } catch (error) {
      setError('root.server', {
        type: 'server',
        message: error?.data?.message ?? error?.message ?? 'Failed to create post.',
      });
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create post</h1>
        <p className="text-muted-foreground">Share something from your cooking experience.</p>
      </header>

      <PostForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        message={isLoading ? 'Publishing post...' : errors.root?.server?.message ?? ''}
        messageTone={errors.root?.server ? 'error' : 'default'}
        isSubmitting={isLoading}
      />
    </section>
  );
};

export default AddPostPage;
