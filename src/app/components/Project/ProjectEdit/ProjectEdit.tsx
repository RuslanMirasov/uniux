'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useProject';
import { usePopup } from '@/hooks/usePopup';
import { fetcher } from '@/lib/fetcher';
import { generateObjectId } from '@/lib/generateObjectId';
import { Button, AddTaskForm, InputError } from '../../../components';
import ProjectEditSkeleton from './ProjectEditSkeleton';
import type { ITask } from '@/models/Project';
import css from './ProjectEdit.module.scss';

interface FetchError extends Error {
  status?: number;
  message: string;
}

const ProjectEdit: React.FC = () => {
  const { id } = useParams();
  const [formSenging, setFormSending] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { openPopup } = usePopup();
  const { project, isLoading, isError, mutate } = useProject(id as string);
  const [newTasks, setNewTasks] = useState<ITask[]>([]);
  const [openedTaskIds, setOpenedTaskIds] = useState<string[]>([]);
  const [dirtyStates, setDirtyStates] = useState<{ [taskId: string]: boolean }>({});
  const isModified = Object.values(dirtyStates).some(Boolean);
  const formRefs = useRef<{ [taskId: string]: () => Promise<ITask | null> }>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProjectName(e.target.value);
    setDirtyStates(prev => ({ ...prev, ['prjectName']: !!e.target.value }));
  };

  const setTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (!project) return;
    setProjectName(project.name);
    setNewTasks(project.tasks as ITask[]);
  }, [project]);

  useEffect(() => {
    setTextareaHeight();
  }, [projectName]);

  const addTask = () => {
    if (!project) return;
    const taskId = generateObjectId();

    const newTask: ITask = {
      _id: taskId,
      device: 'app',
      taskName: 'My new task',
      description: '',
      protoUrl: '',
      target: `uniux-${taskId}`,
    };

    setNewTasks([...newTasks, newTask]);
    setOpenedTaskIds(prev => [...prev, taskId]);
    setDirtyStates(prev => ({ ...prev, [taskId]: true }));
  };

  const removeTask = (taskId: string) => {
    setNewTasks(prev => prev.filter(task => task._id !== taskId));
    setOpenedTaskIds(prev => prev.filter(id => id !== taskId));
    setDirtyStates(prev => ({ ...prev, [taskId]: true }));
    delete formRefs.current[taskId];
  };

  const handleDirtyChange = useCallback((taskId: string, isDirty: boolean) => {
    setDirtyStates(prev => ({ ...prev, [taskId]: isDirty }));
  }, []);

  const validateTasks = async () => {
    setOpenedTaskIds([]);
    const invalidTaskIds: string[] = [];
    let errorsCount = 0;

    const formDataArray = await Promise.all(
      Object.entries(formRefs.current).map(async ([taskId, submit]) => {
        const formData = await submit();
        if (!formData) {
          errorsCount += 1;
          invalidTaskIds.push(taskId);
        }
        return formData;
      })
    );
    setOpenedTaskIds(prev => [...new Set([...prev, ...invalidTaskIds])]);

    return { errors: errorsCount, data: formDataArray };
  };

  const updateProject = async () => {
    const { errors, data } = await validateTasks();
    if (errors > 0) return;

    setFormSending(true);
    const updateData = {
      name: projectName,
      tasks: data,
    };

    try {
      await fetcher(`/api/projects/${project?._id}`, { method: 'PATCH', data: updateData });
      mutate();

      openPopup({
        type: 'success',
        icon: 'success',
        title: `Project updated!`,
        subtitle: 'The data has been successfully added, share the test with your team.',
        btn: 'Ok',
      });
    } catch (error) {
      const err = error as FetchError;
      openPopup({
        type: 'error',
        icon: 'error',
        title: `Update project error ${err.status}`,
        subtitle: err.message,
        btn: 'Close',
      });
    } finally {
      setDirtyStates({});
      setOpenedTaskIds([]);
      setFormSending(false);
    }
  };

  if (isError) return null;
  if (!project || project._id !== id || isLoading) return <ProjectEditSkeleton />;

  return (
    <div className={css.EditProject}>
      <div className={css.Form}>
        <span>
          <textarea
            ref={textareaRef}
            name="name"
            className={`${css.Textarea} ${!projectName ? css.Invalid : ''}`}
            value={projectName}
            onInput={handleInput}
          />
          {!projectName && <InputError text="Project name can not be empty!" />}
        </span>

        {newTasks.length > 0 && (
          <div>
            {newTasks.map((task, index) => (
              <AddTaskForm
                key={task._id}
                defaultValues={task}
                number={index + 1}
                open={openedTaskIds.includes(task._id)}
                onDirtyChange={handleDirtyChange}
                onRemoveTask={() => removeTask(task._id)}
                registerSubmit={validate => (formRefs.current[task._id] = validate)}
              />
            ))}
          </div>
        )}

        <Button type="button" full variant="white" onClick={addTask}>
          Add task
        </Button>
      </div>

      <div className={css.StartButtonWrapper}>
        <Button
          type="button"
          full
          disabled={!isModified || formSenging}
          isLoading={formSenging}
          onClick={updateProject}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default ProjectEdit;
