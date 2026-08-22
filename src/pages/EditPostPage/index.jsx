import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from '@/entities/post';
import { initialPostFormValues, PostForm } from '@/features/post-form';
import { buildPostPath, RouterPath } from '@/shared/config/routerPaths';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, isError, error } = useGetPostByIdQuery(id);
  const [updatePost, { isLoading: isSaving }] = useUpdatePostMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: initialPostFormValues });

  useEffect(() => {
    if (!post) {
      return;
    }

    reset({
      title: post.title,
      body: post.body,
      recipeId: post.recipe?.id ?? null,
    });
  }, [post, reset]);

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (isError) {
    return <p>{error?.data?.message ?? 'Failed to load post.'}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  const onSubmit = async (formValues) => {
    try {
      const updatedPost = await updatePost({ postId: post.id, post: formValues }).unwrap();
      navigate(buildPostPath(updatedPost.id));
    } catch (requestError) {
      setError('root.server', {
        type: 'server',
        message: requestError?.data?.message ?? requestError?.message ?? 'Failed to update post.',
      });
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Link to={RouterPath.post_detail.replace(':id', post.id)} className="self-start text-sm font-medium text-secondary">
        Back to post
      </Link>
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Edit post</h1>
        <p className="text-muted-foreground">Update your community publication.</p>
      </header>

      <PostForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        setValue={setValue}
        initialSelectedRecipe={
          post.recipe ? { id: post.recipe.id, name: post.recipe.title } : null
        }
        onSubmit={onSubmit}
        message={isSaving ? 'Saving post...' : errors.root?.server?.message ?? ''}
        messageTone={errors.root?.server ? 'error' : 'default'}
        isSubmitting={isSaving}
        submitLabel="Save changes"
      />
    </section>
  );
};

export default EditPostPage;
