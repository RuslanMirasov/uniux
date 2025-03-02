'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useProject';
import { generateObjectId } from '@/lib/generateObjectId';
import { Button, Title, AddTaskForm } from '../../../components';
import EditProjectSkeleton from './EditProjectSkeleton';
import type { ITask } from '@/models/Project';
import css from './EditProjectForm.module.scss';

const EditProjectForm: React.FC = () => {
  const { id } = useParams();
  const { project, isLoading, isError } = useProject(id as string);
  const [newTasks, setNewTasks] = useState<ITask[]>([]);
  const [openedTaskIds, setOpenedTaskIds] = useState<string[]>([]);
  const [dirtyStates, setDirtyStates] = useState<{ [taskId: string]: boolean }>({});
  const isModified = Object.values(dirtyStates).some(Boolean);
  const formRefs = useRef<{ [taskId: string]: () => Promise<ITask | null> }>({});

  useEffect(() => {
    if (!project) return;
    setNewTasks(project.tasks as ITask[]);
  }, [project]);

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

    alert('ВСё хорошо');
    console.log('TASKS DATA: ', data);
  };

  if (isError) return null;
  if (!project || project._id !== id || isLoading) return <EditProjectSkeleton />;

  return (
    <div className={css.EditProject}>
      <div className={css.Form}>
        <Title tag="h2" size="h3">
          {project.name}
        </Title>

        {newTasks.length > 0 && (
          <div>
            {newTasks.map((task, index) => (
              <AddTaskForm
                key={task._id}
                defaultValues={task}
                number={index + 1}
                open={openedTaskIds.includes(task._id)}
                onDirtyChange={handleDirtyChange}
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
        <Button type="button" full disabled={!isModified} onClick={updateProject}>
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default EditProjectForm;
