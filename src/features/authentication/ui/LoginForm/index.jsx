import { useForm } from 'react-hook-form';
import { authFieldRules, useLazyGetCurrentUserQuery, useLoginMutation } from '@/entities/auth';
import { Button, FormField } from '@/shared/ui';
import SocialAuthActions from '../SocialAuthActions';

const initialFormValues = {
  email: '',
  password: '',
};

const LoginForm = ({ onSuccess }) => {
  const [login, { isLoading }] = useLoginMutation();
  const [getCurrentUser, { isLoading: isLoadingCurrentUser }] = useLazyGetCurrentUserQuery();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormValues,
  });

  const onSubmit = async (formValues) => {
    try {
      // unwrap возвращает успешный ответ или передаёт ошибку RTK Query в catch.
      await login({
        email: formValues.email.trim(),
        password: formValues.password,
      }).unwrap();

      // Проверяем cookie отдельным запросом. Только его успешный ответ подтверждает вход.
      await getCurrentUser().unwrap();

      onSuccess();
    } catch (error) {
      setError('root.server', {
        message: error?.data?.message ?? error?.message ?? 'Failed to log in',
      });
    }
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-primary-foreground">Login</h1>
        <p className="mt-2 text-sm text-primary-foreground/75">Sign in to your RecipeBox account</p>
      </div>

      <SocialAuthActions />
      <p className="text-center text-xs text-primary-foreground/75">
        or use your email and password
      </p>

      <div className="flex flex-col gap-2">
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          disabled={isLoading || isLoadingCurrentUser}
          {...register('email', authFieldRules.email)}
        />
        {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          disabled={isLoading || isLoadingCurrentUser}
          {...register('password', authFieldRules.password)}
        />
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <span className="self-center text-sm text-primary-foreground/75" aria-disabled="true">
        Forgot password?
      </span>

      {errors.root?.server ? (
        <p className="text-center text-sm text-destructive">{errors.root.server.message}</p>
      ) : null}

      <Button
        type="submit"
        disabled={isLoading || isLoadingCurrentUser}
        className="w-full md:w-fit self-center"
      >
        {isLoading || isLoadingCurrentUser ? 'Signing in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;
