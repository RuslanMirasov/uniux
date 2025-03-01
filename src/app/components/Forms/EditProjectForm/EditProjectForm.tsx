'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useProject';
import { generateObjectId } from '@/lib/generateObjectId';
import { Button, Title, AddTaskForm } from '../../../components';
import EditProjectSkeleton from './EditProfileSkeleton';
import type { ITask } from '@/models/Project';
import css from './EditProjectForm.module.scss';

interface IProject {
  _id: string;
  name: string;
  tasks: ITask[];
}

const EditProjectForm: React.FC = () => {
  const { id } = useParams();
  const { project, isLoading, isError } = useProject(id as string);
  const [newTasks, setNewTasks] = useState<ITask[]>([]);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (!project) return;

    setNewTasks(prevTasks =>
      JSON.stringify(prevTasks) !== JSON.stringify(project.tasks) ? (project.tasks as ITask[]) : prevTasks
    );
  }, [project]);

  const addTask = () => {
    if (!project) return;
    const taskId = generateObjectId();

    const newTask: ITask = {
      _id: taskId,
      device: 'app',
      taskName: 'New Task',
      description: '',
      protoUrl: '',
      target: `uniux-${taskId}`,
    };

    setNewTasks([...newTasks, newTask]);
    setIsModified(true);
  };

  if (isError) return null;
  if (!project || project._id !== id || isLoading) return <EditProjectSkeleton />;

  const { name } = project as IProject;

  return (
    <div className={css.EditProject}>
      <div className={css.Form}>
        <Title tag="h2" size="h3">
          {name}
        </Title>
        <div>{newTasks.length > 0 && newTasks.map(task => <AddTaskForm key={task._id} defaultValues={task} />)}</div>

        <Button type="button" full variant="white" onClick={addTask}>
          Add task
        </Button>
      </div>

      <div className={css.StartButtonWrapper}>
        <Button type="button" full disabled={!isModified}>
          Start test
        </Button>
      </div>
    </div>
  );
};

export default EditProjectForm;
