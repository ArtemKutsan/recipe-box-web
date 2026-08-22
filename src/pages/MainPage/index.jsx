import { useState } from 'react';
import { FeedItem, useGetFeedQuery } from '@/entities/feed';
import { Pagination } from '@/shared/ui';

const FEED_PAGE_SIZE = 10;

const MainPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetFeedQuery({
    page,
    pageSize: FEED_PAGE_SIZE,
  });
  const items = data?.items ?? [];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col">
      <header className="flex flex-col gap-2 border-b pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">RecipeBox community</h1>
        <p className="text-muted-foreground">
          Recipes, cooking results, and notes from the community.
        </p>
      </header>

      {isLoading ? <p className="py-8 text-sm text-muted-foreground">Loading community...</p> : null}
      {isError ? (
        <p className="py-8 text-sm text-destructive">
          {error?.data?.message ?? error?.message ?? 'Failed to load community feed.'}
        </p>
      ) : null}
      {!isLoading && !isError && items.length === 0 ? (
        <p className="py-8 text-sm text-muted-foreground">No community publications yet.</p>
      ) : null}

      {!isLoading && !isError ? (
        <div>
          {items.map((item) => (
            <FeedItem
              key={`${item.type}-${item[item.type]?.id ?? item.publishedAt}`}
              item={item}
            />
          ))}
        </div>
      ) : null}

      <Pagination
        className="mt-6"
        page={data?.page ?? page}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
      />
    </section>
  );
};

export default MainPage;
