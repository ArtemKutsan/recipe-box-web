import { NavLink } from 'react-router-dom';
import { RouterPath } from '@/shared/config/routerPaths';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';

const AuthLayout = ({ children }) => {
  return (
    <main className="relative min-h-screen">
      <NavLink
        to={RouterPath.main}
        className="fixed left-4 top-4 z-20 flex items-center gap-2 text-white md:left-6 md:top-5"
        aria-label="RecipeBox home"
      >
        <ChefHatIcon aria-hidden="true" className="size-8 shrink-0" />
        <span className="text-lg font-bold">RecipeBox</span>
      </NavLink>
      {children}
    </main>
  );
};

export default AuthLayout;
