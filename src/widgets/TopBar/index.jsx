import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import { AuthMode, buildAuthPath, RouterPath } from '@/shared/config/routerPaths';
import { Button } from '@/shared/ui';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import GlobalSearch from '@/widgets/GlobalSearch';

/*
TopBar показывает верхнюю панель для компьютера и телефона.
Если пользователь вошёл, показываем Add Recipe, иначе Login и Register.
isSearchOpen хранит состояние окна поиска. Открыть его можно кнопкой или Ctrl/Cmd+K,
а GlobalSearch вызывает onClose, когда окно нужно закрыть.
*/
const TopBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Глобальное сочетание Ctrl+K, а на macOS Cmd+K, открывает поиск с любой страницы.
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        // Отменяем стандартное действие браузера, чтобы оно не конфликтовало с поиском приложения.
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleShortcut);

    return () => {
      // Удаляем тот же обработчик при размонтировании TopBar, чтобы не копить подписки.
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 px-4 backdrop-blur md:px-6 py-4">
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
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <Button as={NavLink} to={buildAuthPath()}>
              Login
            </Button>
            <Button as={NavLink} to={buildAuthPath(AuthMode.REGISTER)} variant="outline">
              Register
            </Button>
          </div>
        )}
      </div>

      <div className="mx-auto flex w-full items-center justify-between gap-3 md:hidden">
        <NavLink
          to={RouterPath.main}
          aria-label="Home"
          className="flex min-w-0 items-center gap-2 text-foreground"
        >
          <ChefHatIcon aria-hidden="true" className="size-8 shrink-0 text-secondary" />
          <span className="truncate text-lg font-bold">RecipeBox</span>
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
              <span aria-hidden="true" className="text-xl leading-none">
                +
              </span>
            </Button>
          ) : null}
        </div>
      </div>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default TopBar;
