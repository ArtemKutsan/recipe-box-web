import { useForm } from 'react-hook-form';
import { authFieldRules, useRegisterMutation } from '@/entities/auth';
import { Button, FormField } from '@/shared/ui';
import SocialAuthActions from '../SocialAuthActions';

/*
React Hook Form хранит значения полей и проверяет их по правилам из auth entity.
После отправки useRegisterMutation передаёт на backend name, email и password.
Ошибки показываем прямо в форме. Если регистрация прошла успешно, вызываем onSuccess,
а Authentication уже переводит пользователя на нужную страницу.
Подтверждение пароля пока оставлено ниже как TODO.
*/
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const RegisterForm = ({ onSuccess }) => {
  const [registerUser, { isLoading }] = useRegisterMutation();
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
      await registerUser({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
      }).unwrap();

      onSuccess();
    } catch (error) {
      setError('root.server', {
        message: error?.data?.message ?? error?.message ?? 'Failed to register',
      });
    }
  };

  return (
    <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-primary-foreground">Create account</h1>
        <p className="mt-2 text-sm text-primary-foreground/75">Create your RecipeBox account</p>
      </div>

      <SocialAuthActions />
      <p className="text-center text-xs text-primary-foreground/75">or register with your email</p>

      <div className="flex flex-col gap-2">
        <FormField
          label="Name"
          type="text"
          autoComplete="name"
          disabled={isLoading}
          {...register('name', authFieldRules.name)}
        />
        {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          disabled={isLoading}
          {...register('email', authFieldRules.email)}
        />
        {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <FormField
          label="Password"
          type="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register('password', authFieldRules.password)}
        />
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      {/* TODO: вернуть подтверждение пароля и frontend-проверку совпадения значений.
      <div className="flex flex-col gap-2">
        <FormField
          label="Repeat password"
          type="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register('repeatPassword', {
            required: 'Repeat password is required',
            validate: (value) => value === getValues('password') || 'Passwords must match',
          })}
        />
        {errors.repeatPassword ? (
          <p className="text-sm text-destructive">{errors.repeatPassword.message}</p>
        ) : null}
      </div> */}

      {errors.root?.server ? (
        <p className="text-center text-sm text-destructive">{errors.root.server.message}</p>
      ) : null}

      <Button type="submit" disabled={isLoading} className="w-full md:w-fit self-center">
        {isLoading ? 'Creating account...' : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterForm;
