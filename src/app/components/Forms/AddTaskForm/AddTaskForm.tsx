'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateNewTaskValidationSchema } from '@/lib/validationSchemas';
import { Fieldset, Input, Accordeon, InputCopyText } from '../../../components';
import type { ITask } from '@/models/Project';
import css from '../Forms.module.scss';

interface AddTAskFormProps {
  open?: boolean;
  defaultValues: ITask;
}

const AddTaskForm: React.FC<AddTAskFormProps> = ({ open, defaultValues }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ITask>({
    resolver: yupResolver(CreateNewTaskValidationSchema),
    defaultValues: defaultValues,
  });

  const taskName = watch('taskName', defaultValues?.taskName || 'My new task');
  const [title, setTitle] = useState(taskName);

  useEffect(() => {
    setTitle(taskName);
  }, [taskName]);

  const onSubmit: SubmitHandler<ITask> = async data => {
    console.log(data);
  };

  return (
    <Accordeon title={title} open={open}>
      <form className={`${css.Form} ${css.Mini}`} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input type="hidden" register={register('_id')} />
        <Fieldset grid={['auto', 'auto', 'auto']}>
          <Input
            type="radio"
            value="browser"
            register={register('device')}
            label="Browser"
            error={errors.device?.message}
          />
          <Input type="radio" value="app" register={register('device')} label="App" error={errors.device?.message} />
        </Fieldset>

        <Input type="text" register={register('taskName')} placeholder="Task name" error={errors.taskName?.message} />

        <Input
          type="url"
          register={register('protoUrl')}
          placeholder="Link to Figma preview"
          error={errors.protoUrl?.message}
        />

        <Input
          type="text"
          register={register('description')}
          placeholder="Describe the task"
          error={errors.description?.message}
        />

        <Input type="hidden" register={register('target')} />
        <InputCopyText text={defaultValues?.target} message="Copy frame name as finale target" />
      </form>
    </Accordeon>
  );
};

export default AddTaskForm;
