import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '@/entities/auth';
import { useCreateCommentMutation, useGetCommentsQuery } from '@/entities/comment';
import { UserAvatar } from '@/entities/user';
import { buildUserProfilePath } from '@/shared/config/routerPaths';
import { Button, FormField, Pagination } from '@/shared/ui';

const COMMENT_PAGE_SIZE = 10;
const EMPTY_COMMENTS = [];

const getVisualIndentClass = (depth) => {
  return depth >= 1 && depth <= 4 ? 'ml-4 md:ml-4' : 'ml-0 md:ml-4';
};

const CommentForm = ({ targetType, targetId, parentCommentId = null, onDone }) => {
  const [createComment, createState] = useCreateCommentMutation();
  const { register, handleSubmit, reset } = useForm({ defaultValues: { body: '' } });
  const targetLabel = targetType === 'post' ? 'post' : 'recipe';

  const handleCreateComment = async ({ body }) => {
    await createComment({
      targetType,
      targetId,
      body,
      parentCommentId,
    }).unwrap();
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
            <UserAvatar
              src={comment.author?.avatarUrl}
              alt={comment.author?.name ?? 'RecipeBox user'}
              className="size-8"
            />
            <div className="min-w-0">
              <p className="break-words text-sm font-semibold">
                {comment.author?.name ?? 'RecipeBox user'}
              </p>
              <time
                className="mt-1 block text-xs text-muted-foreground"
                dateTime={comment.createdAt}
              >
                {new Date(comment.createdAt).toLocaleDateString()}
              </time>
            </div>
          </div>
          {isAuthenticated ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() => onReply(comment.id)}
            >
              Reply
            </Button>
          ) : null}
        </div>
        <p className="mt-2 whitespace-pre-line text-sm leading-6">
          {parentComment?.author?.id ? (
            <Link
              to={buildUserProfilePath(parentComment.author.id)}
              className="mr-1 font-medium text-secondary hover:underline"
            >
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

const Comments = ({ targetType, targetId }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [page, setPage] = useState(1);
  const [replyToId, setReplyToId] = useState(null);
  const { data, isLoading, isError } = useGetCommentsQuery({
    targetType,
    targetId,
    page,
    pageSize: COMMENT_PAGE_SIZE,
  });
  const comments = data?.items ?? EMPTY_COMMENTS;

  useEffect(() => {
    if (isLoading || !location.hash) {
      return;
    }

    const scrollToComment = () => {
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ block: 'center' });
      });
    };

    if (document.readyState === 'complete') {
      scrollToComment();
      return undefined;
    }

    window.addEventListener('load', scrollToComment, { once: true });

    return () => window.removeEventListener('load', scrollToComment);
  }, [comments, isLoading, location.hash]);
  const commentsByParent = useMemo(() => {
    const grouped = new Map();

    comments.forEach((comment) => {
      const parentId = comment.parentCommentId ?? null;
      const siblings = grouped.get(parentId) ?? [];
      grouped.set(parentId, [...siblings, comment]);
    });

    return grouped;
  }, [comments]);

  return (
    <section className="mt-8 space-y-6" aria-labelledby={`${targetType}-comments-title`}>
      <div className="flex items-baseline gap-2">
        <h2 id={`${targetType}-comments-title`} className="text-2xl font-semibold">
          Comments
        </h2>
        <span className="text-sm text-muted-foreground">{data?.total ?? 0}</span>
      </div>

      {isAuthenticated ? (
        <CommentForm targetType={targetType} targetId={targetId} onDone={() => setPage(1)} />
      ) : null}

      {isLoading ? <p className="text-sm text-muted-foreground">Loading comments...</p> : null}
      {isError ? <p className="text-sm text-destructive">Failed to load comments.</p> : null}

      {!isLoading && !isError && comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      ) : null}

      <div className="space-y-4">
        {(commentsByParent.get(null) ?? []).map((comment) => (
          <div key={comment.id} className="space-y-3">
            <CommentItem
              comment={comment}
              childrenByParent={commentsByParent}
              isAuthenticated={isAuthenticated}
              targetType={targetType}
              targetId={targetId}
              replyToId={replyToId}
              onReply={setReplyToId}
              parentComment={null}
            />
          </div>
        ))}
      </div>

      <Pagination
        page={data?.page ?? page}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
      />
    </section>
  );
};

export default Comments;
