import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/entities/auth';
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
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormValues,
  });

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
          {...register('name', { required: true })}
        />
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
          autoComplete="new-password"
          disabled={isLoading}
          {...register('password', { required: true })}
        />

        {formError ? <p className="text-sm text-destructive">{formError}</p> : null}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Creating account...' : 'Register'}
        </Button>
      </form>
    </section>
  );
};

export default RegisterPage;
