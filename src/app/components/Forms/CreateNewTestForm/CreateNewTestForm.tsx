'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProjectValidationSchema } from '@/lib/validationSchemas';

import { Button, Input } from '../..';
import css from '../Forms.module.scss';

interface IRegistrationForm {
  project: string;
}

const CreateNewTestForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IRegistrationForm>({
    resolver: yupResolver(ProjectValidationSchema),
    defaultValues: {
      project: '',
    },
  });

  const onSubmit: SubmitHandler<IRegistrationForm> = async data => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        type="url"
        register={register('project')}
        placeholder="Link to Figma prototype"
        error={errors.project?.message}
      />
      <Button type="submit" full isLoading={isLoading} disabled={!isDirty || isLoading}>
        Create test
      </Button>
    </form>
  );
};

export default CreateNewTestForm;
