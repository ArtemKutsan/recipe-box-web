import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';
import { Button } from '@/shared/ui';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import GlobalSearch from '@/widgets/GlobalSearch';

const TopBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleShortcut);

    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 px-4 py-3 backdrop-blur md:px-6 md:py-4">
      <div className="mx-auto hidden w-full max-w-7xl items-center gap-4 md:flex">
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="relative flex h-10 min-w-0 flex-1 items-center rounded-xl border bg-card px-4 pr-20 text-left text-sm text-muted-foreground transition-colors hover:border-secondary hover:text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/15"
          aria-haspopup="dialog"
          aria-expanded={isSearchOpen}
          aria-label="Open search"
        >
          <span
            className="pointer-events-none absolute left-3 text-muted-foreground"
            aria-hidden="true"
          >
            <SearchIcon className="size-4" />
          </span>
          <span className="truncate pl-6">Search</span>
          <span className="pointer-events-none absolute right-2 hidden rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground sm:inline-flex">
            Ctrl K
          </span>
        </button>

        {isAuthenticated ? (
          <Button as={NavLink} to={RouterPath.add_recipe} variant="secondary" className="shrink-0">
            <span aria-hidden="true">+</span>
            <span className="hidden sm:inline">Add Recipe</span>
          </Button>
        ) : null}
      </div>

      <div className="mx-auto flex w-full items-center justify-between gap-3 md:hidden">
        <NavLink
          to={RouterPath.main}
          aria-label="Home"
          className="flex min-w-0 items-center gap-2 text-foreground"
        >
          <ChefHatIcon aria-hidden="true" className="size-7 shrink-0 text-secondary" />
          <span className="truncate text-base font-bold">RecipeBox</span>
        </NavLink>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="bg-card"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search"
            aria-haspopup="dialog"
            aria-expanded={isSearchOpen}
          >
            <SearchIcon aria-hidden="true" className="size-5" />
          </Button>

          {isAuthenticated ? (
            <Button
              as={NavLink}
              to={RouterPath.add_recipe}
              variant="secondary"
              size="icon"
              aria-label="Add recipe"
            >
              <span aria-hidden="true" className="text-xl leading-none">+</span>
            </Button>
          ) : null}
        </div>
      </div>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default TopBar;
