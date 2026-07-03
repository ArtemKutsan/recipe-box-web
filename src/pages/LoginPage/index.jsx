import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';
import { Button, FormField } from '@/shared/ui';

const initialFormValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [formError, setFormError] = useState('');
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormValues,
  });

  const onSubmit = async (formValues) => {
    setFormError('');

    try {
      // unwrap возвращает обычный успешный ответ или бросает ошибку RTK Query.
      await login({
        email: formValues.email.trim(),
        password: formValues.password,
      }).unwrap();

      navigate(RouterPath.profile);
    } catch (error) {
      setFormError(error?.data?.message ?? error?.message ?? 'Failed to log in');
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p>Sign in to your RecipeBox account</p>
      </header>

      <form className="flex flex-col gap-4 rounded-2xl border bg-card p-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          disabled={isLoading}
          {...register('email', { required: true })}
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register('password', { required: true })}
        />

        {formError ? <p className="text-sm text-destructive">{formError}</p> : null}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Signing in...' : 'Login'}
        </Button>
      </form>
    </section>
  );
};

export default LoginPage;
