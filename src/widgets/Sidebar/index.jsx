import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials, selectAuthUser, selectIsAuthenticated } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';
import { navItems } from '@/widgets/Sidebar/navItems';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';

const navLinkBase =
  'flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors';
const navLinkActive = 'bg-secondary/5 text-secondary';
const navLinkIdle = 'text-foreground/90 hover:bg-lite hover:text-accent-foreground';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const displayName = user?.name ?? 'Account';
  const avatarLetter = displayName.slice(0, 1).toUpperCase();
  const visibleNavItems = navItems.filter((item) => !item.authOnly || isAuthenticated);

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  return (
    <aside
      className="flex min-h-screen w-72 shrink-0 flex-col border-r bg-card px-4 py-6 max-md:min-h-0 max-md:w-full max-md:border-r-0 max-md:border-b lg:sticky lg:top-0 lg:h-screen"
      aria-label="Primary"
    >
      <NavLink to={RouterPath.main} aria-label="Home" className="mb-4 ml-3 flex items-center gap-2">
        <ChefHatIcon aria-hidden="true" className="size-8 text-secondary" />
        <span className="text-lg font-bold">RecipeBox</span>
      </NavLink>

      <nav className="flex-1 pt-4">
        <ul className="list-none space-y-2">
          {visibleNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkIdle}`
                }
              >
                {item.Icon ? (
                  <item.Icon className="size-6" aria-hidden="true" />
                ) : (
                  <span className="size-2 rounded-full bg-current opacity-75" aria-hidden="true" />
                )}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t pt-4">
        {isAuthenticated ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 px-3">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={displayName} className="size-10 rounded-full object-cover" />
              ) : (
                <span className="flex size-10 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                  {avatarLetter}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-muted-foreground">Signed in</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 text-left text-sm font-medium text-secondary/80 transition-colors hover:text-secondary"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <NavLink
              to={RouterPath.login}
              className={({ isActive }) =>
                `${navLinkBase} justify-center ${isActive ? navLinkActive : navLinkIdle}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to={RouterPath.register}
              className="px-4 py-2 text-center text-sm font-medium text-secondary/80 transition-colors hover:text-secondary"
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
