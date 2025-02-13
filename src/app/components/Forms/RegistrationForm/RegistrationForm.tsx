'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button, InputError } from '../../../components';
import css from '../Forms.module.scss';

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, errors, isLoading, onSubmit } = useAuth('register');

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.InputWrapper}>
        <input
          id="email"
          {...register('email')}
          type="email"
          placeholder="Email"
          className={errors.email ? css.Invalid : ''}
        />
        <InputError text={errors.email?.message} />
      </div>

      <div className={css.InputWrapper}>
        <input
          id="password"
          {...register('password')}
          type="password"
          placeholder="Password"
          className={errors.password ? css.Invalid : ''}
        />
        <InputError text={errors.password?.message} />
      </div>

      <div className={css.InputWrapper}>
        <input id="subscribe" type="checkbox" {...register('subscribe')} />
        <label htmlFor="subscribe">
          <span>Subscribe to UniUXtips and updates</span>
        </label>
      </div>

      <Button type="submit" full variant="white" isLoading={isLoading} disabled={isLoading}>
        Create account
      </Button>
    </form>
  );
};

export default RegistrationForm;
