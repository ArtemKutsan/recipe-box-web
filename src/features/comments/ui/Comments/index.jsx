import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '@/entities/auth';
import { useGetCommentsQuery } from '@/entities/comment';
import { Pagination } from '@/shared/ui';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';

const COMMENT_PAGE_SIZE = 10;
const EMPTY_COMMENTS = [];

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
    <div className="space-y-6" aria-labelledby={`${targetType}-comments-title`}>
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
    </div>
  );
};

export default Comments;
