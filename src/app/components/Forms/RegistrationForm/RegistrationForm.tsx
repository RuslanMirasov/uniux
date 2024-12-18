'use client';

import { useState } from 'react';
import { mutate } from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePopup } from '@/hooks/usePopup';

import { Button, InputError } from '../../../components';
import css from '../Forms.module.scss';

interface FetchError extends Error {
  status?: number;
  message: string;
}

interface IRegistrationForm {
  email: string;
  password: string;
  subscribe?: boolean;
}

const RegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openPopup } = usePopup();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Required field')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Wrong e-mail format'),
    password: Yup.string()
      .required('Required field')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    subscribe: Yup.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IRegistrationForm> = async data => {
    setIsLoading(true);

    try {
      await fetcher('/api/auth/register', { method: 'POST', data: { ...data } });
      await mutate('/api/auth/me');
      openPopup({
        type: 'success',
        title: 'Welcome!',
        subtitle: 'Thank you for your interest in our service. Your account has been successfully created, have fun!',
        icon: 'success',
        btn: 'Get started',
      });
    } catch (error) {
      const err = error as FetchError;
      openPopup({
        type: 'error',
        title: `Error ${err?.status || ''}`,
        subtitle: err?.message || 'An unexpected error occurred.',
        icon: 'error',
        btn: 'Close',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <InputError text={errors.email && errors.email.message} />
      </div>

      <div className={css.InputWrapper}>
        <input
          id="password"
          {...register('password')}
          type="password"
          placeholder="Password"
          className={errors.password ? css.Invalid : ''}
        />
        <InputError text={errors.password && errors.password.message} />
      </div>

      <div className={css.InputWrapper}>
        <input id="subscribe" type="checkbox" {...register('subscribe')} />
        <label htmlFor="subscribe">
          <span>Subscribe to UniUXtips and updates</span>
        </label>
      </div>

      <Button type="submit" full variant="white" isLoading={isLoading}>
        Create account
      </Button>
    </form>
  );
};

export default RegistrationForm;
