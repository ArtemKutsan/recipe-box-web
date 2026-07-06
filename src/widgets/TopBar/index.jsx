import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';
import { Button } from '@/shared/ui';
import SearchIcon from '@/assets/icons/search.svg?react';

const TopBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 px-4 py-4 backdrop-blur md:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4">
        <label className="relative flex min-w-0 flex-1 items-center">
          <span
            className="pointer-events-none absolute left-3 text-muted-foreground"
            aria-hidden="true"
          >
            <SearchIcon className="size-4" />
          </span>
          <input
            type="search"
            placeholder="Search recipes, cuisines, ingredients..."
            className="h-10 w-full rounded-xl border bg-card px-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/15"
            aria-label="Search recipes"
          />
          <span className="pointer-events-none absolute right-2 hidden rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground sm:inline-flex">
            Ctrl K
          </span>
        </label>

        {isAuthenticated ? (
          <Button as={NavLink} to={RouterPath.add_recipe} variant="secondary" className="shrink-0">
            <span aria-hidden="true">+</span>
            <span className="hidden sm:inline">Add Recipe</span>
          </Button>
        ) : null}
      </div>
    </header>
  );
};

export default TopBar;
