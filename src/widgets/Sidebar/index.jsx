import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials, selectAuthUser, selectIsAuthenticated } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';
import { navItems } from '@/widgets/Sidebar/navItems';
import { cn } from '@/shared/lib/cn';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';

const navLinkBase =
  'flex items-center gap-4 rounded-2xl px-3 py-2 min-h-12 min-w-12 text-sm font-semibold transition-colors';
const navLinkActive = 'bg-secondary/5 text-secondary';
const navLinkIdle = 'text-foreground/90 hover:bg-lite hover:text-accent-foreground';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const displayName = user?.name ?? 'Account';
  const avatarLetter = displayName.slice(0, 1).toUpperCase();
  const visibleNavItems = navItems.filter((item) => !item.authOnly || isAuthenticated);

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  const handleToggleCollapse = () => {
    if (isCollapsed) {
      setIsCollapsed(false);

      window.setTimeout(() => {
        setShowLabels(true);
      }, 200);

      return;
    }

    setShowLabels(false);
    setIsCollapsed(true);
  };

  return (
    <aside
      className={cn(
        'z-50 fixed flex min-h-screen shrink-0 flex-col border-r bg-card  px-4 py-5 transition-[width,padding] duration-200 max-md:min-h-0 max-md:w-full max-md:border-r-0 max-md:border-b max-md:px-4 lg:sticky lg:top-0 lg:h-screen',
        isCollapsed ? 'w-20 sticky top-0 h-screen' : 'w-54 shadow-2xl lg:shadow-none',
      )}
      aria-label="Primary"
    >
      <div className={cn('mb-4 flex items-center gap-2', isCollapsed && 'md:justify-center')}>
        <NavLink
          to={RouterPath.main}
          aria-label="Home"
          className={cn(
            'flex min-w-0 items-center gap-2',
            isCollapsed ? 'md:justify-center' : 'md:ml-2',
          )}
        >
          <ChefHatIcon aria-hidden="true" className="size-8 shrink-0 text-secondary" />
          <span className={cn('truncate text-lg font-bold', !showLabels && 'md:hidden')}>
            RecipeBox
          </span>
        </NavLink>

        <button
          type="button"
          className="absolute -right-4 top-5 hidden size-8 shrink-0 items-center justify-center rounded-full border bg-card text-lg font-semibold text-foreground transition-colors hover:bg-lite md:inline-flex"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
          onClick={handleToggleCollapse}
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>

      <nav className="flex-1 pt-4">
        <ul className="list-none space-y-2">
          {visibleNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    navLinkBase,
                    isCollapsed && 'md:justify-center md:gap-0 md:px-0',
                    isActive ? navLinkActive : navLinkIdle,
                  )
                }
                title={!showLabels ? item.label : undefined}
              >
                {item.Icon ? (
                  <item.Icon className="size-6" aria-hidden="true" />
                ) : (
                  <span className="size-2 rounded-full bg-current opacity-75" aria-hidden="true" />
                )}
                <span className={cn(!showLabels && 'md:hidden')}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t pt-4">
        {isAuthenticated ? (
          <div className="flex flex-col gap-3">
            <div
              className={cn(
                'flex items-center gap-3 px-3',
                isCollapsed && 'md:justify-center md:px-0',
              )}
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={displayName}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-10 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                  {avatarLetter}
                </span>
              )}
              <div className={cn('min-w-0', !showLabels && 'md:hidden')}>
                <p className="truncate text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-muted-foreground">Signed in</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                'px-4 py-2 text-left text-sm font-medium text-secondary/80 transition-colors hover:text-secondary',
                isCollapsed && 'md:px-0 md:text-center',
              )}
              aria-label="Logout"
            >
              <span className={cn(!showLabels && 'md:hidden')}>Logout</span>
              <span className={cn('hidden', !showLabels && 'md:inline')}>Out</span>
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
              title={!showLabels ? 'Login' : undefined}
            >
              <span className={cn(!showLabels && 'md:hidden')}>Login</span>
              <span className={cn('hidden', !showLabels && 'md:inline')}>In</span>
            </NavLink>
            <NavLink
              to={RouterPath.register}
              className={cn(
                'px-4 py-2 text-center text-sm font-medium text-secondary/80 transition-colors hover:text-secondary',
                !showLabels && 'md:hidden',
              )}
            >
              Create account
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
