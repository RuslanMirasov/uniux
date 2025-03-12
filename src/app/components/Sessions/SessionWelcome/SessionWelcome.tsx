'use client';
import type { IProjectData } from '@/models/Project';
import type { ITask } from '@/models/Project';
import {
  Logo,
  TasksPageContainer,
  ImageWithPreloader,
  WelcomSessionForm,
  SessionTaskDescription,
  SessionTaskResult,
} from '../../../components';
import css from './SessionWelcome.module.scss';
import { useState, useEffect } from 'react';

interface SearchParams {
  task?: number | null;
  status?: string | null;
}

interface SessionWelcomeProps extends SearchParams {
  project: IProjectData;
}

const SessionWelcome: React.FC<SessionWelcomeProps> = ({ project, task = null, status = null }) => {
  const [currentTask, setCurrentTask] = useState({});
  const { name, image, tasks } = project;

  useEffect(() => {
    if (!task || !tasks) return;
    const taskNumber = Number(task - 1);
    setCurrentTask(tasks[taskNumber]);
  }, [task, tasks]);

  return (
    <>
      <Logo position="right" />
      <TasksPageContainer>
        <div className={css.Image}>
          <ImageWithPreloader src={image} alt={name} width="840" height="600" />
        </div>
        <div className={css.Info}>
          {!status && <WelcomSessionForm />}
          {status === 'info' && <SessionTaskDescription taskNumber={task} task={currentTask as ITask} />}
          {(status === 'fail' || status === 'done') && (
            <SessionTaskResult taskNumber={task} limit={tasks?.length} status={status} />
          )}
        </div>
      </TasksPageContainer>
    </>
  );
};

export default SessionWelcome;
