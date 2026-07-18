import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials, selectAuthUser, selectIsAuthenticated } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';
import { navItems } from '@/widgets/Sidebar/navItems';
import { cn } from '@/shared/lib/cn';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';

const navLinkBase =
  'relative flex min-h-12 min-w-12 items-center gap-4 overflow-hidden rounded-2xl px-3 py-2 text-sm font-semibold transition-colors';
const navLinkActive = 'bg-secondary/5 text-secondary';
const navLinkIdle = 'text-foreground/90 hover:bg-lite hover:text-accent-foreground';
const collapsibleLabelBase =
  'min-w-0 max-w-48 shrink-0 overflow-hidden transition-[max-width,opacity] duration-200';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const displayName = user?.name ?? 'Account';
  const avatarLetter = displayName.slice(0, 1).toUpperCase();
  const visibleNavItems = navItems.filter((item) => !item.authOnly || isAuthenticated);
  const collapsibleLabelState = isCollapsed ? 'md:max-w-0 md:opacity-0' : 'md:opacity-100';

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((previous) => !previous);
  };

  return (
    <aside
      className={cn(
        'z-50 fixed hidden min-h-screen shrink-0 flex-col border-r bg-card px-4 py-5 transition-[width,padding] duration-200 md:flex max-md:min-h-0 max-md:w-full max-md:border-r-0 max-md:border-b max-md:px-4 lg:sticky lg:top-0 lg:h-screen',
        isCollapsed ? 'w-20 sticky top-0 h-screen' : 'w-54 shadow-2xl lg:shadow-none',
      )}
      aria-label="Primary"
    >
      {/* TODO: Переделать на икоки? */}
      <button
        type="button"
        className="absolute -right-4 top-5 hidden size-8 shrink-0 items-center justify-center rounded-full border bg-card text-lg font-semibold text-foreground transition-colors hover:bg-lite md:inline-flex"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!isCollapsed}
        onClick={handleToggleCollapse}
      >
        {isCollapsed ? '›' : '‹'}
      </button>

      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        <div className="mb-4 flex items-center gap-2">
          <NavLink
            to={RouterPath.main}
            aria-label="Home"
            className="relative flex min-w-0 items-center gap-2 md:ml-2"
          >
            <ChefHatIcon aria-hidden="true" className="size-8 shrink-0 text-secondary" />
            <span
              className={cn(
                collapsibleLabelBase,
                collapsibleLabelState,
                'whitespace-nowrap text-lg font-bold',
              )}
            >
              RecipeBox
            </span>
          </NavLink>
        </div>

        <nav className="flex-1 pt-4">
          <ul className="list-none space-y-2">
            {visibleNavItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(navLinkBase, isActive ? navLinkActive : navLinkIdle)
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  {item.Icon ? (
                    <item.Icon className="size-6 shrink-0" aria-hidden="true" />
                  ) : (
                    <span
                      className="size-2 shrink-0 rounded-full bg-current opacity-75"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(collapsibleLabelBase, collapsibleLabelState, 'whitespace-nowrap')}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t pt-4">
          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <div className="relative flex items-center gap-3">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={displayName}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                    {avatarLetter}
                  </span>
                )}
                <div className={cn(collapsibleLabelBase, collapsibleLabelState)}>
                  <p className="truncate text-sm font-semibold">{displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">Signed in</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className={cn(
                  'relative overflow-hidden px-4 py-2 text-left text-sm font-medium text-secondary/80 transition-colors hover:text-secondary',
                  isCollapsed && 'md:px-0 md:text-center',
                )}
                aria-label="Logout"
              >
                <span className="shrink-0 whitespace-nowrap">{isCollapsed ? 'Out' : 'Logout'}</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink
                to={RouterPath.login}
                className={({ isActive }) =>
                  cn(
                    navLinkBase,
                    'justify-center',
                    isCollapsed && 'md:px-0',
                    isActive ? navLinkActive : navLinkIdle,
                  )
                }
                title={isCollapsed ? 'Login' : undefined}
              >
                <span className="shrink-0 whitespace-nowrap">{isCollapsed ? 'In' : 'Login'}</span>
              </NavLink>
              <NavLink
                to={RouterPath.register}
                className={cn(
                  'relative overflow-hidden whitespace-nowrap px-4 py-2 text-center text-sm font-medium text-secondary/80 transition-colors hover:text-secondary',
                  isCollapsed && 'md:px-0',
                )}
              >
                <span
                  className={cn(collapsibleLabelBase, collapsibleLabelState, 'whitespace-nowrap')}
                >
                  Create account
                </span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
