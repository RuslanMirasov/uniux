'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { useProject } from '@/hooks/useProject';
import { usePopup } from '@/hooks/usePopup';
import { fetcher } from '@/lib/fetcher';
import { generateObjectId } from '@/lib/generateObjectId';
import { Button, AddTaskForm, EditProjectNameForm, StartProjectButton, ProjectSkeleton } from '../../components';
import type { ITask } from '@/models/Project';

interface FetchError extends Error {
  status?: number;
  message: string;
}

const ProjectEdit: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [formSenging, setFormSending] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { openPopup } = usePopup();
  const { project, isLoading, isError } = useProject(id as string);
  const [newTasks, setNewTasks] = useState<ITask[]>([]);
  const [openedTaskIds, setOpenedTaskIds] = useState<string[]>([]);
  const [dirtyStates, setDirtyStates] = useState<{ [taskId: string]: boolean }>({});
  const isModified = Object.values(dirtyStates).some(Boolean);
  const formRefs = useRef<{ [taskId: string]: () => Promise<ITask | null> }>({});

  useEffect(() => {
    if (!project) return;
    setProjectName(project.name);
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

    try {
      setFormSending(true);
      await fetcher(`/api/projects/${project?._id}`, {
        method: 'PATCH',
        data: {
          name: projectName,
          tasks: data,
        },
      });
      router.push(`/project/${project?._id}/start`);
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

  if (isLoading) return <ProjectSkeleton />;
  if (isError || !project) notFound();

  return (
    <>
      <EditProjectNameForm projectName={projectName} setProjectName={setProjectName} setDirtyStates={setDirtyStates} />

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

      <StartProjectButton>
        <Button
          type="button"
          full
          disabled={!isModified || formSenging}
          isLoading={formSenging}
          onClick={updateProject}
        >
          Start test
        </Button>
      </StartProjectButton>
    </>
  );
};

export default ProjectEdit;
