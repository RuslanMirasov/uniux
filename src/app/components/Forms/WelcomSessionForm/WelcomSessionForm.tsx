'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useTestSession } from '@/hooks/useTestSession';
import { useSessionParams } from '@/hooks/useSessionParams';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Title, Text, Input, Fieldset } from '../../../components';
import { taskSessionUser } from '@/lib/validationSchemas';
import css from './WelcomSessionForm.module.scss';

interface IWelcomeForm {
  name?: string | null;
  email: string;
  imageUrl?: string | null;
}

const WelcomSessionForm: React.FC = () => {
  const setSessionParams = useSessionParams();
  const { updateTestSession } = useTestSession();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IWelcomeForm>({
    resolver: yupResolver(taskSessionUser),
    defaultValues: {
      name: null,
      email: '',
      imageUrl: null,
    },
  });

  useEffect(() => {
    if (session?.user?.email) {
      reset({ email: session.user.email, name: session.user.name, imageUrl: session.user.image });
    }
  }, [session, reset]);

  const onSubmit: SubmitHandler<IWelcomeForm> = async data => {
    updateTestSession({
      user: {
        name: data.name || null,
        email: data.email,
        image: data.imageUrl || null,
      },
    });

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
        <Input type="hidden" register={register('name')} />
        <Input type="hidden" register={register('imageUrl')} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
        {errors.imageUrl?.message && <p>{errors.imageUrl?.message}</p>}
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
