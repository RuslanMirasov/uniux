'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { mutate } from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, InputError } from '../..';
import css from '../Forms.module.scss';
import { usePopup } from '@/hooks/usePopup';

interface FetchError extends Error {
  status?: number;
  message: string;
}

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openPopup } = usePopup();
  const router = useRouter();

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .required('Required field')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Wrong e-mail format'),
    password: Yup.string()
      .required('Required field')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async data => {
    setIsLoading(true);

    try {
      await fetcher('/api/auth/login', { method: 'POST', data: { ...data } });
      // await mutate('/api/auth/me');
      router.push('/');
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
      reset();
    }
  };

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.InputWrapper}>
        <input {...register('email')} type="email" placeholder="Email" className={errors.email ? css.Invalid : ''} />
        <InputError text={errors.email && errors.email.message} />
      </div>

      <div className={css.InputWrapper}>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className={errors.password ? css.Invalid : ''}
        />
        <InputError text={errors.password && errors.password.message} />
      </div>

      <Button type="submit" full variant="white" isLoading={isLoading}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
