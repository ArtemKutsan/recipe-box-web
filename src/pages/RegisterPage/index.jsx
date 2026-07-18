import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { authFieldRules, selectIsAuthenticated, useRegisterMutation } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';
import { Button, FormField } from '@/shared/ui';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [formError, setFormError] = useState('');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialFormValues,
  });

  if (isAuthenticated) {
    // Авторизованному пользователю не нужна повторная регистрация.
    return <Navigate to={RouterPath.profile} replace />;
  }

  const onSubmit = async (formValues) => {
    setFormError('');

    try {
      // Backend после регистрации возвращает user и token, поэтому пользователь сразу становится авторизованным.
      await registerUser({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
      }).unwrap();

      navigate(RouterPath.profile);
    } catch (error) {
      setFormError(error?.data?.message ?? error?.message ?? 'Failed to register');
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
        <p>Create your RecipeBox account</p>
      </header>

      <form className="flex flex-col gap-4 rounded-2xl border bg-card p-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Name"
          type="text"
          autoComplete="name"
          disabled={isLoading}
          {...register('name', authFieldRules.name)}
        />
        {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          disabled={isLoading}
          {...register('email', authFieldRules.email)}
        />
        {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
        <FormField
          label="Password"
          type="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register('password', authFieldRules.password)}
        />
        {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}

        {formError ? <p className="text-sm text-destructive">{formError}</p> : null}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Creating account...' : 'Register'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to={RouterPath.login} className="text-secondary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
