import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthMode, buildAuthPath, RouterPath } from '@/shared/config/routerPaths';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isRegisterMode = searchParams.get('mode') === AuthMode.REGISTER;
  const redirectPath = location.state?.from?.pathname ?? RouterPath.profile;

  const changeMode = (mode) => {
    navigate(buildAuthPath(mode), { replace: true, state: location.state });
  };

  const handleSuccess = () => {
    navigate(redirectPath, { replace: true });
  };

  return (
    <section className="relative mx-auto min-h-[30rem] w-full max-w-3xl overflow-hidden rounded-3xl border border-white/45 bg-white/15 shadow-xl backdrop-blur-[25px]">
      <div
        className={cn(
          'absolute inset-y-0 left-0 flex w-full items-center px-6 pb-24 pt-6 transition-all duration-500 ease-in-out md:w-1/2 md:p-10',
          isRegisterMode
            ? 'pointer-events-none -translate-x-full opacity-0 md:translate-x-1/4'
            : 'translate-x-0 opacity-100',
        )}
        aria-hidden={isRegisterMode}
        inert={isRegisterMode}
      >
        <LoginForm onSuccess={handleSuccess} />
      </div>

      <div
        className={cn(
          'absolute inset-y-0 right-0 flex w-full items-center px-6 pb-24 pt-6 transition-all duration-500 ease-in-out md:w-1/2 md:p-10',
          isRegisterMode
            ? 'translate-x-0 opacity-100'
            : 'pointer-events-none translate-x-full opacity-0 md:-translate-x-1/4',
        )}
        aria-hidden={!isRegisterMode}
        inert={!isRegisterMode}
      >
        <RegisterForm onSuccess={handleSuccess} />
      </div>

      <div
        className={cn(
          'absolute bottom-0 left-0 z-10 h-20 w-full overflow-hidden bg-card text-center text-foreground transition-all duration-500 ease-in-out md:inset-y-0 md:left-1/2 md:h-full md:w-1/2 md:rounded-l-[8rem] md:rounded-r-3xl',
          isRegisterMode && 'md:-translate-x-full md:rounded-l-3xl md:rounded-r-[8rem]',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center gap-3 px-6 transition-[transform,opacity] duration-500 ease-in-out md:flex-col md:gap-4 md:px-10',
            isRegisterMode
              ? 'pointer-events-none translate-x-full opacity-0 md:translate-x-[200%]'
              : 'translate-x-0 opacity-100',
          )}
          aria-hidden={isRegisterMode}
        >
          <div className="hidden md:block">
            <h2 className="text-2xl font-semibold">New to RecipeBox?</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Create an account to save recipes and plan your meals.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full md:w-fit border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground"
            onClick={() => changeMode(AuthMode.REGISTER)}
          >
            Create account
          </Button>
        </div>

        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center gap-3 px-6 transition-[transform,opacity] duration-500 ease-in-out md:flex-col md:gap-4 md:px-10',
            isRegisterMode
              ? 'translate-x-0 opacity-100'
              : 'pointer-events-none -translate-x-full opacity-0 md:-translate-x-[200%]',
          )}
          aria-hidden={!isRegisterMode}
        >
          <div className="hidden md:block">
            <h2 className="text-2xl font-semibold">Welcome back!</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Sign in to continue building your recipe collection.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full md:w-fit border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground"
            onClick={() => changeMode(AuthMode.LOGIN)}
          >
            Switch to Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Authentication;
