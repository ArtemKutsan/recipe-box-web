import { Link } from 'react-router-dom';
import { UserAvatar } from '@/entities/user';
import { buildRecipePath, buildUserProfilePath } from '@/shared/config/routerPaths';

const formatPostDate = (value) => {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(value));
};

const PostCard = ({ post }) => {
  const author = post.author;
  const authorName = author?.name ?? 'Unknown user';

  return (
    <article className="flex flex-col gap-4 rounded-2xl border bg-card p-5">
      <header className="flex items-center gap-3">
        <UserAvatar
          src={author?.avatarUrl}
          alt={authorName}
          className="size-10"
        />
        <div className="min-w-0">
          {author?.id ? (
            <Link
              to={buildUserProfilePath(author.id)}
              className="block truncate text-sm font-semibold hover:text-secondary"
            >
              {authorName}
            </Link>
          ) : (
            <p className="truncate text-sm font-semibold">{authorName}</p>
          )}
          <time className="text-xs text-muted-foreground" dateTime={post.createdAt ?? undefined}>
            {formatPostDate(post.createdAt)}
          </time>
        </div>
      </header>

      <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">{post.body}</p>

      {post.recipe ? (
        <Link
          to={buildRecipePath(post.recipe.id)}
          className="self-start rounded-xl border px-3 py-2 text-sm font-medium transition-colors hover:border-secondary hover:text-secondary"
        >
          {post.recipe.title}
        </Link>
      ) : null}
    </article>
  );
};

export default PostCard;
