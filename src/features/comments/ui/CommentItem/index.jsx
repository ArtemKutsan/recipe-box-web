import { Link } from 'react-router-dom';
import { UserAvatar } from '@/entities/user';
import { buildUserProfilePath } from '@/shared/config/routerPaths';
import { Button } from '@/shared/ui';
import CommentForm from '../CommentForm';

const getVisualIndentClass = (depth) => {
  return depth >= 1 && depth <= 4 ? 'ml-4 md:ml-4' : 'ml-0 md:ml-4';
};

const CommentItem = ({
  comment,
  childrenByParent,
  isAuthenticated,
  targetType,
  targetId,
  replyToId,
  onReply,
  parentComment,
}) => {
  const visualIndentClass = getVisualIndentClass(comment.depth ?? 0);
  const replies = childrenByParent.get(comment.id) ?? [];

  return (
    <div className={visualIndentClass}>
      <article id={`comment-${comment.id}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <UserAvatar src={comment.author?.avatarUrl} alt={comment.author?.name ?? 'RecipeBox user'} className="size-8" />
            <div className="min-w-0">
              <p className="break-words text-sm font-semibold">{comment.author?.name ?? 'RecipeBox user'}</p>
              <time className="mt-1 block text-xs text-muted-foreground" dateTime={comment.createdAt}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </time>
            </div>
          </div>
          {isAuthenticated ? (
            <Button type="button" variant="outline" size="sm" className="shrink-0" onClick={() => onReply(comment.id)}>
              Reply
            </Button>
          ) : null}
        </div>
        <p className="mt-2 whitespace-pre-line text-sm leading-6">
          {parentComment?.author?.id ? (
            <Link to={buildUserProfilePath(parentComment.author.id)} className="mr-1 font-medium text-secondary hover:underline">
              @{parentComment.author.name}
            </Link>
          ) : null}
          {comment.body}
        </p>
      </article>

      {replyToId === comment.id ? (
        <div className="mt-3">
          <CommentForm
            targetType={targetType}
            targetId={targetId}
            parentCommentId={comment.id}
            onDone={() => onReply(null)}
          />
        </div>
      ) : null}

      {replies.length > 0 ? (
        <div className="mt-3 space-y-3">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              childrenByParent={childrenByParent}
              isAuthenticated={isAuthenticated}
              targetType={targetType}
              targetId={targetId}
              replyToId={replyToId}
              onReply={onReply}
              parentComment={comment}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CommentItem;
