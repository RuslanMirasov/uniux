'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateNewTaskValidationSchema } from '@/lib/validationSchemas';
import { Fieldset, Input, Accordeon, InputCopyText, ButtonIcon, ButtonsList } from '../../../components';
import type { ITask } from '@/models/Project';
import css from '../Forms.module.scss';
import { usePopup } from '@/hooks/usePopup';

interface AddTAskFormProps {
  number?: number;
  open?: boolean;
  onRemoveTask: (taskId: string) => void;
  onDirtyChange: (taskId: string, isDirty: boolean) => void;
  registerSubmit: (submit: () => Promise<ITask | null>) => void;
  defaultValues: ITask;
}

const AddTaskForm: React.FC<AddTAskFormProps> = ({
  number,
  open,
  onDirtyChange,
  registerSubmit,
  onRemoveTask,
  defaultValues,
}) => {
  const { openPopup, closePopup } = usePopup();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<ITask>({
    resolver: yupResolver(CreateNewTaskValidationSchema),
    defaultValues: defaultValues,
  });

  const prevIsDirty = useRef<boolean>(isDirty);

  useEffect(() => {
    if (prevIsDirty.current !== isDirty) {
      onDirtyChange(defaultValues._id, isDirty);
      prevIsDirty.current = isDirty;
    }
  }, [isDirty, defaultValues._id, onDirtyChange]);

  const taskName = watch('taskName', defaultValues?.taskName || 'My new task');
  const [title, setTitle] = useState(taskName);

  useEffect(() => {
    setTitle(taskName);
  }, [taskName]);

  useEffect(() => {
    registerSubmit(
      () =>
        new Promise<ITask | null>(resolve => {
          handleSubmit(
            data => {
              resolve(data);
            },
            () => {
              resolve(null);
            }
          )();
        })
    );
  }, [registerSubmit, handleSubmit]);

  return (
    <Accordeon number={number} title={title} open={open}>
      <form className={`${css.Form} ${css.Mini}`} noValidate>
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
        <ButtonsList align="flex-end">
          <ButtonIcon
            iconSize="10"
            color="#e75349"
            onClick={() =>
              openPopup({
                type: 'confirm',
                icon: 'question',
                title: 'Are you sure you want to delete the task?',
                subtitle: 'This action is irreversible, and all your data will be permanently lost.',
                btn: 'yes',
                action: () => {
                  onRemoveTask(defaultValues._id);
                  closePopup();
                },
              })
            }
          >
            Delete task
          </ButtonIcon>
        </ButtonsList>
      </form>
    </Accordeon>
  );
};

export default AddTaskForm;
