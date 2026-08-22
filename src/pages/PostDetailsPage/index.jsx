import { Link, useParams } from 'react-router-dom';
import { formatPostDate, useGetPostByIdQuery } from '@/entities/post';
import { UserAvatar } from '@/entities/user';
import { buildRecipePath, buildUserProfilePath, RouterPath } from '@/shared/config/routerPaths';

const PostDetailsPage = () => {
  const { id } = useParams();
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

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <Link to={RouterPath.posts} className="self-start text-sm font-medium text-secondary">
        Back to community
      </Link>

      <header className="flex flex-col gap-6 border-b pb-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-secondary">
            {postType}
          </span>
          <time className="text-sm text-muted-foreground" dateTime={post.createdAt ?? undefined}>
            {formatPostDate(post.createdAt)}
          </time>
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
    </article>
  );
};

export default PostDetailsPage;
