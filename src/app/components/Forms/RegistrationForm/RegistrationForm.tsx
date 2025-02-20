'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button, Input } from '../../../components';
import css from '../Forms.module.scss';

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, errors, isLoading, isDirty, onSubmit } = useAuth('register');

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input type="email" placeholder="Email" register={register('email')} error={errors.email?.message} />
      <Input type="password" placeholder="Password" register={register('password')} error={errors.password?.message} />
      <Input type="checkbox" label="Subscribe to UniUXtips and updates" register={register('subscribe')} />
      <Button type="submit" full variant="white" isLoading={isLoading} disabled={!isDirty || isLoading}>
        Create account
      </Button>
    </form>
  );
};

export default RegistrationForm;
