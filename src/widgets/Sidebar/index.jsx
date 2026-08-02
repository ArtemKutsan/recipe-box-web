import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials, selectAuthUser, selectIsAuthenticated } from '@/entities/auth';
import { UserAvatar } from '@/entities/user';
import { RouterPath } from '@/shared/config/routerPaths';
import { navItems } from '@/widgets/Sidebar/navItems';
import { cn } from '@/shared/lib/cn';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import SidebarIcon from '@/assets/icons/sidebar.svg?react';

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const displayName = user?.name ?? 'Account';
  const visibleNavItems = navItems.filter((item) => !item.authOnly || isAuthenticated);
  const collapsibleLabelState = isCollapsed ? 'md:max-w-0 md:opacity-0' : 'md:opacity-100';

  const handleLogout = () => {
    dispatch(clearCredentials());
    setIsMobileOpen(false);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((previous) => !previous);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileOpen((previous) => !previous);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="fixed right-4 bottom-6 z-[60] inline-flex size-12 items-center justify-center rounded-full border bg-card text-foreground shadow-lg transition-colors hover:bg-lite md:hidden"
        aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-navigation"
        onClick={handleToggleMobileMenu}
      >
        {isMobileOpen ? (
          <span aria-hidden="true" className="text-3xl leading-none">
            ×
          </span>
        ) : (
          <SidebarIcon aria-hidden="true" className="size-5" />
        )}
      </button>

      <aside
        id="mobile-navigation"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex min-h-screen w-full shrink-0 flex-col border-r bg-card px-4 pt-5 pb-6 transition-[transform,width,padding] duration-200 md:flex md:w-54 md:translate-x-0 lg:sticky lg:top-0 lg:h-screen',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'md:w-20 md:sticky md:h-screen' : 'md:shadow-2xl lg:shadow-none',
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
              onClick={handleCloseMobileMenu}
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
                    onClick={handleCloseMobileMenu}
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
                      className={cn(
                        collapsibleLabelBase,
                        collapsibleLabelState,
                        'whitespace-nowrap',
                      )}
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
                  <NavLink
                    to={RouterPath.profile}
                    aria-label="Open profile"
                    className="shrink-0"
                    onClick={handleCloseMobileMenu}
                  >
                    <UserAvatar src={user?.avatarUrl} alt={displayName} className="size-12" />
                  </NavLink>
                  <div className={cn(collapsibleLabelBase, collapsibleLabelState)}>
                    <NavLink
                      to={RouterPath.profile}
                      className="block truncate text-sm font-semibold hover:text-secondary"
                      onClick={handleCloseMobileMenu}
                    >
                      {displayName}
                    </NavLink>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-left text-xs text-secondary/80 transition-colors hover:text-secondary"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <NavLink
                  to={RouterPath.auth}
                  className={({ isActive }) =>
                    cn(
                      navLinkBase,
                      'justify-center',
                      isCollapsed && 'md:px-0',
                      isActive ? navLinkActive : navLinkIdle,
                    )
                  }
                  title={isCollapsed ? 'Login' : undefined}
                  onClick={handleCloseMobileMenu}
                >
                  <span className={cn('shrink-0 whitespace-nowrap', isCollapsed && 'md:hidden')}>
                    Login
                  </span>
                  <span
                    className={cn('hidden shrink-0 whitespace-nowrap', isCollapsed && 'md:inline')}
                  >
                    In
                  </span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
