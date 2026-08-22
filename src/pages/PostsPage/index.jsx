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
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">Cooking updates from the RecipeBox community</p>
      </header>

      {isFetching ? <p className="text-sm text-muted-foreground">Loading...</p> : null}

      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No posts yet</p>
      )}

      <Pagination
        page={data?.page ?? page}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
      />
    </section>
  );
};

export default PostsPage;
