import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Button, InputError } from '../../../components';
import css from './Forms.module.scss';

interface IFeedbackForm {
  email: string;
  password: string;
  subscribe: string;
}

const RegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required field'),
    password: Yup.string().required('Required field'),
    subscribe: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFeedbackForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFeedbackForm> = async data => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)}>
      {/* EMAIL */}
      <div className={css.InputWrapper} data-col="2">
        <input
          id="email"
          {...register('email')}
          type="email"
          placeholder="email"
          style={errors.email && { border: '1px solid var(--invalid)' }}
        />
        <InputError text={errors.email && errors.email.message} />
      </div>

      {/* PASSWORD */}
      <div className={css.InputWrapper} data-col="2">
        <input
          id="password"
          {...register('password')}
          type="password"
          placeholder="password"
          style={errors.password && { border: '1px solid var(--invalid)' }}
        />
        <InputError text={errors.password && errors.password.message} />
      </div>

      {/* SUBSCRIBE */}
      <div className={css.InputWrapper}>
        <input id="subscribe" type="checkbox" {...register('subscribe')} />
        <label htmlFor="subscribe" className={`${css.RadioLabel} ${errors.subscribe ? 'invalid' : ''}`}>
          <span>Subscribe to UniUXtips and updates</span>
        </label>
        <InputError text={errors.subscribe && errors.subscribe.message} />
      </div>

      <Button type="submit" full variant="white" isLoading={isLoading}>
        Create account
      </Button>
    </form>
  );
};

export default RegistrationForm;
