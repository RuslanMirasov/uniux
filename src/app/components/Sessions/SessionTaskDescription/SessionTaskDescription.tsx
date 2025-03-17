'use client';
import { useEffect } from 'react';
import { Title, Text, Button } from '../../../components';
import { useSessionParams } from '@/hooks/useSessionParams';
import { useTestSession } from '@/hooks/useTestSession';
import css from './SessionTaskDescription.module.scss';
import type { ITask } from '@/models/Project';

interface SessionTaskDescriptionProps {
  projectId: string;
  taskNumber: number | null;
  task: ITask;
}

const SessionTaskDescription: React.FC<SessionTaskDescriptionProps> = ({ projectId, taskNumber, task }) => {
  const setSessionParams = useSessionParams();
  const { updateTestSession } = useTestSession();
  const { taskName, description } = task;

  // Обновляем session при монтировании
  useEffect(() => {
    if (projectId && task) {
      updateTestSession({ project: projectId, task, clicks: [] });
    }
  }, [projectId, task, updateTestSession]);

  return (
    <div className={css.SessionTaskDescription}>
      {taskNumber && taskName && (
        <Title tag="h1" size="h1">
          <span>{taskNumber >= 10 ? taskNumber : `0${taskNumber}`}.</span> {taskName}
        </Title>
      )}
      <video width="110" height="150" autoPlay muted loop>
        <source src="https://storage.googleapis.com/uniux-f0503.appspot.com/sessions/session_1742252752105.webm" />
      </video>
      {description && <Text size="big">{description}</Text>}
      <Button type="button" full onClick={() => setSessionParams(`${taskNumber}`, 'start')}>
        To the task
      </Button>
    </div>
  );
};

export default SessionTaskDescription;
