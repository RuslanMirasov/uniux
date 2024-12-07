'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Button, InputError } from '../../../components';
import css from '../Forms.module.scss';

interface IRegistrationForm {
  email: string;
  password: string;
  subscribe?: boolean;
}

const RegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
