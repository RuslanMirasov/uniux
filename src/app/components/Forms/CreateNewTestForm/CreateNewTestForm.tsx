'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateNewProjectValidationSchema } from '@/lib/validationSchemas';
import { Button, Input, Skeleton } from '../..';
import css from '../Forms.module.scss';
import { useUser } from '@/hooks/useUser';
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'next/navigation';
import { usePopup } from '@/hooks/usePopup';

interface FetchError extends Error {
  status?: number;
  message: string;
}
interface ICreateNewProjectForm {
  owner: string;
  protoUrl: string;
}

interface Session {
  _id: string;
  name: string;
  email: string;
  image: string;
  subscribe: boolean;
}

const CreateNewTestForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser() as { user: Session };
  const { openPopup } = usePopup();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm<ICreateNewProjectForm>({
    resolver: yupResolver(CreateNewProjectValidationSchema),
    defaultValues: {
      owner: user?._id || '',
      protoUrl: '',
    },
  });

  useEffect(() => {
    if (user?._id) setValue('owner', user._id);
  }, [user, setValue]);

  const onSubmit: SubmitHandler<ICreateNewProjectForm> = async data => {
    setIsLoading(true);
    try {
      await fetcher('api/projects', { method: 'POST', data: data });
      router.push('/');
    } catch (error) {
      const err = error as FetchError;
      openPopup({
        type: 'error',
        icon: 'error',
        title: `Conflict ${err.status}`,
        subtitle: err.message,
        btn: 'Close',
      });
    } finally {
      setIsLoading(false);
      reset({
        owner: user?._id || '',
        protoUrl: '',
      });
    }
  };

  if (!user)
    return (
      <div className={css.Form}>
        <Skeleton height="50px" radius="5px" />
        <Skeleton height="50px" radius="5px" />
      </div>
    );

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input type="hidden" register={register('owner')} />
      <Input
        type="url"
        register={register('protoUrl')}
        placeholder="Link to Figma prototype"
        error={errors.protoUrl?.message}
      />
      <Button type="submit" full isLoading={isLoading} disabled={!isDirty || isLoading}>
        Create test
      </Button>
    </form>
  );
};

export default CreateNewTestForm;
