'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Button, InputError } from '../..';
import css from '../Forms.module.scss';

interface IRegistrationForm {
  email: string;
}

const PasswordResetForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Required field')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Wrong e-mail format'),
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
    console.log(data);
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

      <Button type="submit" full isLoading={isLoading}>
        Reset password
      </Button>
    </form>
  );
};

export default PasswordResetForm;
