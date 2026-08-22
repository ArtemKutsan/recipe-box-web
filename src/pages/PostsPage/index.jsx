import { useState } from 'react';
import { PostCard, useGetPostsQuery } from '@/entities/post';
import { Pagination } from '@/shared/ui';

const POSTS_PER_PAGE = 10;

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError, error } = useGetPostsQuery({
    page,
    pageSize: POSTS_PER_PAGE,
  });

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>{error?.data?.message ?? 'Failed to load posts'}</p>;
  }

  const posts = data?.items ?? [];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col">
      <header className="mb-2 flex flex-col gap-3 border-b pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-secondary">Community</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">From the kitchen</h1>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          Cooking results, useful ideas, and everyday conversations from the RecipeBox community.
        </p>
      </header>

      {isFetching ? <p className="py-3 text-sm text-muted-foreground">Updating the feed...</p> : null}

      {posts.length > 0 ? (
        <div className="flex flex-col">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-muted-foreground">No community posts yet</p>
      )}

      <Pagination
        page={data?.page ?? page}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
        className="mt-8"
      />
    </section>
  );
};

export default PostsPage;
