'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Button, InputError } from '../..';
import css from '../Forms.module.scss';

interface IRegistrationForm {
  project: string;
}

const CreateNewTestForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    project: Yup.string().required('Required field').url('Invalid URL format'),
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
          id="project"
          {...register('project')}
          type="url"
          placeholder="Link to Figma project"
          className={errors.project ? css.Invalid : ''}
        />
        <InputError text={errors.project && errors.project.message} />
      </div>

      <Button type="submit" full isLoading={isLoading}>
        Create test
      </Button>
    </form>
  );
};

export default CreateNewTestForm;
