import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  formatPostDate,
  useDeletePostMutation,
  useGetPostByIdQuery,
} from '@/entities/post';
import { selectAuthUser } from '@/entities/auth';
import { UserAvatar } from '@/entities/user';
import { Comments } from '@/features/comments';
import { Button } from '@/shared/ui';
import { buildEditPostPath, buildRecipePath, buildUserProfilePath, RouterPath } from '@/shared/config/routerPaths';

const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = useSelector(selectAuthUser);
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [deleteError, setDeleteError] = useState('');
  const { data: post, isLoading, isError, error } = useGetPostByIdQuery(id);

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (isError) {
    return <p>{error?.data?.message ?? 'Failed to load post'}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  const authorName = post.author?.name ?? 'Unknown user';
  const postType = post.recipe ? 'Cooking result' : 'Community note';
  const canManagePost = authUser?.id != null && String(authUser.id) === String(post.author?.id);

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) {
      return;
    }

    setDeleteError('');

    try {
      await deletePost(post.id).unwrap();
      navigate(RouterPath.posts);
    } catch (deleteRequestError) {
      setDeleteError(
        deleteRequestError?.data?.message ??
          deleteRequestError?.message ??
          'Failed to delete post.',
      );
    }
  };

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <Link to={RouterPath.posts} className="self-start text-sm font-medium text-secondary">
        Back to community
      </Link>

      <header className="flex flex-col gap-6 border-b pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-secondary">
            {postType}
          </span>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <time className="text-sm text-muted-foreground" dateTime={post.createdAt ?? undefined}>
              {formatPostDate(post.createdAt)}
            </time>
            {canManagePost ? (
              <div className="flex items-center gap-2">
                <Button as={Link} to={buildEditPostPath(post.id)} variant="outline" size="sm">
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        {post.author ? (
          <Link
            to={buildUserProfilePath(post.author.id)}
            className="inline-flex items-center gap-3 self-start"
          >
            <UserAvatar src={post.author.avatarUrl} alt={authorName} className="size-10" />
            <span className="text-sm font-semibold hover:text-secondary">{authorName}</span>
          </Link>
        ) : null}
      </header>

      {deleteError ? <p className="text-sm text-destructive">{deleteError}</p> : null}

      <div className="whitespace-pre-wrap text-lg leading-8 text-foreground/90 sm:text-xl">
        {post.body}
      </div>

      {post.recipe ? (
        <Link
          to={buildRecipePath(post.recipe.id)}
          className="flex flex-col gap-2 border-y py-5 transition-colors hover:text-secondary"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recipe mentioned
          </span>
          <span className="text-lg font-semibold">{post.recipe.title}</span>
        </Link>
      ) : null}

      <Comments targetType="post" targetId={post.id} />
    </article>
  );
};

export default PostDetailsPage;
