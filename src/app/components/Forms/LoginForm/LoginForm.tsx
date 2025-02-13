'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button, InputError } from '../..';
import css from '../Forms.module.scss';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, isLoading, onSubmit } = useAuth('login');

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.InputWrapper}>
        <input {...register('email')} type="email" placeholder="Email" className={errors.email ? css.Invalid : ''} />
        <InputError text={errors.email?.message} />
      </div>

      <div className={css.InputWrapper}>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className={errors.password ? css.Invalid : ''}
        />
        <InputError text={errors.password?.message} />
      </div>

      <Button type="submit" full variant="white" isLoading={isLoading} disabled={isLoading}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
