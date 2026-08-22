import { Link } from 'react-router-dom';
import { UserAvatar } from '@/entities/user';
import { buildPostPath, buildRecipePath, buildUserProfilePath } from '@/shared/config/routerPaths';
import { formatPostDate } from '../../lib/formatPostDate';

const PostCard = ({ post }) => {
  const author = post.author;
  const authorName = author?.name ?? 'Unknown user';
  const postType = post.recipe ? 'Cooking result' : 'Community note';

  return (
    <article className="flex flex-col gap-5 border-b py-8 first:pt-0">
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar src={author?.avatarUrl} alt={authorName} className="size-10" />
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
        </div>
        <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-secondary">
          {postType}
        </span>
      </header>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{post.title}</h2>
        <p className="whitespace-pre-wrap text-base leading-7 text-foreground/90">{post.body}</p>
      </div>

      {post.recipe ? (
        <Link
          to={buildRecipePath(post.recipe.id)}
          className="flex max-w-md flex-col gap-1 border-l-2 border-secondary/40 pl-4 transition-colors hover:border-secondary"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recipe mentioned
          </span>
          <span className="text-sm font-semibold hover:text-secondary">{post.recipe.title}</span>
        </Link>
      ) : null}

      <Link
        to={buildPostPath(post.id)}
        className="self-start text-sm font-medium text-secondary hover:text-secondary/80"
      >
        Read post
      </Link>
    </article>
  );
};

export default PostCard;
