import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSearchQuery } from '@/entities/search';
import { buildPostPath, buildRecipePath, buildUserProfilePath } from '@/shared/config/routerPaths';
import { Modal } from '@/shared/ui';
import useDebounce from '@/shared/hooks/useDebounce';

const MIN_SEARCH_LENGTH = 2;

function SearchSection({ title, children }) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="grid gap-2 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function GlobalSearch({ isOpen, onClose }) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue.trim(), 250);
  const canSearch = isOpen && debouncedSearch.length >= MIN_SEARCH_LENGTH;
  const { data, isLoading, isError } = useSearchQuery(debouncedSearch, { skip: !canSearch });
  const recipes = data?.recipes ?? [];
  const posts = data?.posts ?? [];
  const users = data?.users ?? [];
  const hasResults = recipes.length > 0 || posts.length > 0 || users.length > 0;

  const handleClose = () => {
    setSearchValue('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Search"
      onClose={handleClose}
      className="max-w-4xl bg-background shadow-2xl max-md:h-[100dvh] max-md:max-h-none max-md:max-w-none max-md:rounded-none"
      overlayClassName="max-md:p-0"
    >
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3">
          <span className="text-sm text-muted-foreground">Search</span>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search recipes, posts, people..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
        </label>

        {!canSearch ? (
          <p className="rounded-2xl border border-dashed bg-card p-4 text-sm text-muted-foreground">
            Start typing to search recipes, posts, and people.
          </p>
        ) : isLoading ? (
          <p className="text-sm text-muted-foreground">Searching...</p>
        ) : isError ? (
          <p className="text-sm text-destructive">Failed to load search results.</p>
        ) : !hasResults ? (
          <p className="text-sm text-muted-foreground">Nothing found.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {recipes.length > 0 ? (
              <SearchSection title="Recipes">
                {recipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    to={buildRecipePath(recipe.id)}
                    onClick={handleClose}
                    className="flex items-center gap-3 rounded-xl border bg-card p-3 text-left transition-colors hover:border-secondary/40 hover:bg-accent/40"
                  >
                    {recipe.thumbnailUrl ? (
                      <img
                        src={recipe.thumbnailUrl}
                        alt={recipe.title}
                        className="size-12 shrink-0 rounded-lg object-cover"
                      />
                    ) : null}
                    <span className="min-w-0 truncate text-sm font-medium">{recipe.title}</span>
                  </Link>
                ))}
              </SearchSection>
            ) : null}

            {posts.length > 0 ? (
              <SearchSection title="Posts">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={buildPostPath(post.id)}
                    onClick={handleClose}
                    className="rounded-xl border bg-card p-3 text-left transition-colors hover:border-secondary/40 hover:bg-accent/40"
                  >
                    <span className="block truncate text-sm font-medium">{post.title}</span>
                    <span className="mt-1 block truncate text-xs text-muted-foreground">
                      {post.author?.name ?? 'RecipeBox user'}
                    </span>
                  </Link>
                ))}
              </SearchSection>
            ) : null}

            {users.length > 0 ? (
              <SearchSection title="People">
                {users.map((user) => (
                  <Link
                    key={user.id}
                    to={buildUserProfilePath(user.id)}
                    onClick={handleClose}
                    className="flex items-center gap-3 rounded-xl border bg-card p-3 text-left transition-colors hover:border-secondary/40 hover:bg-accent/40"
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="size-12 shrink-0 rounded-lg object-cover"
                      />
                    ) : null}
                    <span className="truncate text-sm font-medium">{user.name}</span>
                  </Link>
                ))}
              </SearchSection>
            ) : null}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default GlobalSearch;
