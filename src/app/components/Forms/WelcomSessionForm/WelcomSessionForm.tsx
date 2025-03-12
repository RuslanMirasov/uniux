'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSessionParams } from '@/hooks/useSessionParams';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Title, Text, Input, Fieldset } from '../../../components';
import { ResetPasswordValidationSchema } from '@/lib/validationSchemas';
import css from './WelcomSessionForm.module.scss';

interface IWelcomeForm {
  email: string;
}

const WelcomSessionForm: React.FC = () => {
  const setSessionParams = useSessionParams();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IWelcomeForm>({
    resolver: yupResolver(ResetPasswordValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (session?.user?.email) {
      reset({ email: session.user.email });
    }
  }, [session, reset]);

  const onSubmit: SubmitHandler<IWelcomeForm> = async data => {
    console.log(data);
    setSessionParams('1', 'info');
  };

  return (
    <form className={css.WelcomeForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title tag="h1" size="h1">
        Welcome!
      </Title>
      <Fieldset legend="Enter your e-mail">
        <Input
          type="email"
          placeholder="Email"
          register={register('email')}
          error={errors.email?.message}
          disabled={!!session?.user?.email}
        />
      </Fieldset>
      <Text size="big" color="grey">
        WARNING: For best results, we record with the front camera. Familiarise yourself with the{' '}
        <Link href="/policy" className="link">
          privacy policy.
        </Link>
      </Text>
      <Button full disabled={!session?.user?.email ? !isDirty : false}>
        To the task
      </Button>
    </form>
  );
};

export default WelcomSessionForm;
