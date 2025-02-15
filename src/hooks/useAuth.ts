import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePopup } from '@/hooks/usePopup';
import { registerValidationSchema, loginValidationSchema } from '@/lib/validationSchemas';
import { registerUser, loginUser } from '@/services/authService';

interface IAuthForm {
  email: string;
  password: string;
  subscribe?: boolean;
}

interface FetchError extends Error {
  status?: number;
  message: string;
}

export const useAuth = (type: 'login' | 'register') => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { openPopup } = usePopup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthForm>({
    resolver: yupResolver(type === 'login' ? loginValidationSchema : registerValidationSchema),
  });

  const onSubmit: SubmitHandler<IAuthForm> = async data => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (type === 'register') {
        await registerUser(data);
      }

      const signInUser = await loginUser(data.email, data.password);

      if (signInUser?.error) {
        openPopup({
          type: 'error',
          title: 'Login failed',
          subtitle: signInUser.error || 'An unexpected error occurred.',
          icon: 'error',
          btn: 'Close',
        });
      } else {
        router.replace(callbackUrl);
      }
    } catch (error) {
      const err = error as FetchError;
      openPopup({
        type: 'error',
        title: `${type === 'register' ? 'Registration' : 'Login'} failed!`,
        subtitle: err?.message || 'An unexpected error occurred.',
        icon: 'error',
        btn: 'Close',
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return { register, handleSubmit, errors, isLoading, onSubmit };
};
