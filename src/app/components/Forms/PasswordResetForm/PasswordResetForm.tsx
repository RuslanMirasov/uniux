'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordValidationSchema } from '@/lib/validationSchemas';
import { Button, Input } from '../..';
import css from '../Forms.module.scss';

interface IRegistrationForm {
  email: string;
}

const PasswordResetForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IRegistrationForm>({
    resolver: yupResolver(ResetPasswordValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<IRegistrationForm> = async data => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input type="email" placeholder="Email" register={register('email')} error={errors.email?.message} />
      <Button type="submit" full isLoading={isLoading} disabled={!isDirty}>
        Reset password
      </Button>
    </form>
  );
};

export default PasswordResetForm;
