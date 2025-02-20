'use client';
import { useState } from 'react';
import { Button, Input, Fieldset } from '../../../components';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileValidationSchema } from '@/lib/validationSchemas';
import css from '../Forms.module.scss';

interface IProfileForm {
  name: string;
  email: string;
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
  subscribe?: boolean;
  device?: string;
}

interface Session {
  name: string;
  email: string;
  image: string;
  subscribe: boolean;
}

interface ProfileUpdateFormProps {
  session: Session;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({ session }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<IProfileForm>({
    resolver: yupResolver(profileValidationSchema) as Resolver<IProfileForm>,
    defaultValues: {
      email: session.email || '',
      name: session.name || '',
      subscribe: session.subscribe || false,
      currentpassword: '',
      newpassword: '',
      confirmpassword: '',
      device: 'app',
    },
  });

  const onSubmit: SubmitHandler<IProfileForm> = async data => {
    if (isLoading) return;
    setIsLoading(true);
    console.log('DATA: ', data);
    setIsLoading(false);
    reset();
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
