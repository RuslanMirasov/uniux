'use client';
import { useState, useEffect } from 'react';
import { Button, Input, Fieldset } from '../../../components';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileValidationSchema } from '@/lib/validationSchemas';
import { fetcher } from '@/lib/fetcher';
import { usePopup } from '@/hooks/usePopup';
import css from '../Forms.module.scss';

interface FetchError extends Error {
  status?: number;
  message: string;
}

interface IProfileForm {
  name: string;
  email: string;
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
  subscribe?: boolean;
}

interface Session {
  id: string;
  name: string;
  email: string;
  image: string;
  subscribe: boolean;
}

interface ProfileProps {
  user: Session;
  mutate: () => void;
}

const ProfileUpdateForm: React.FC<ProfileProps> = ({ user, mutate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { openPopup } = usePopup();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<IProfileForm>({
    resolver: yupResolver(profileValidationSchema) as Resolver<IProfileForm>,
    defaultValues: {},
  });

  useEffect(() => {
    if (user) {
      reset({
        ...(user as Session),
        currentpassword: '',
        newpassword: '',
        confirmpassword: '',
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<IProfileForm> = async data => {
    setIsLoading(true);
    try {
      await fetcher('/api/auth/profile', {
        method: 'PATCH',
        data: data,
      });
      mutate();
      reset();
    } catch (error) {
      const err = error as FetchError;
      openPopup({
        type: 'error',
        title: `Update error${err.status ? ' ' + err.status : ''}`,
        subtitle: err.message,
        icon: 'error',
        btn: 'Закрыть',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={`${css.Form} ${css.Mini}`} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Fieldset legend="Profile settings">
        <Input type="email" placeholder="E-mail" register={register('email')} error={errors.email?.message} disabled />
        <Input type="text" placeholder="Name" register={register('name')} error={errors.name?.message} />
        <Input
          type="checkbox"
          label="Subscribe to UniUXtips and updates"
          register={register('subscribe')}
          error={errors.subscribe?.message}
        />
      </Fieldset>

      <Fieldset legend="Change password">
        <Input
          type="password"
          placeholder="Current password"
          register={register('currentpassword')}
          error={errors.currentpassword?.message}
        />
        <Input
          type="password"
          placeholder="New password"
          register={register('newpassword')}
          error={errors.newpassword?.message}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          register={register('confirmpassword')}
          error={errors.confirmpassword?.message}
        />
      </Fieldset>

      <Button type="submit" size="small" full isLoading={isLoading} disabled={!isDirty || isLoading}>
        Save changes
      </Button>
    </form>
  );
};

export default ProfileUpdateForm;
