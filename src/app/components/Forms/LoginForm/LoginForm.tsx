'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button, Input } from '../..';
import css from '../Forms.module.scss';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, isLoading, isDirty, onSubmit } = useAuth('login');

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input type="email" placeholder="Email" register={register('email')} error={errors.email?.message} />
      <Input type="password" placeholder="Password" register={register('password')} error={errors.password?.message} />
      <Button type="submit" full variant="white" isLoading={isLoading} disabled={!isDirty}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
