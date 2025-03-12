'use client';
import { useState, useEffect } from 'react';
import { Title, Icon, Button } from '../../../components';
import { useSessionParams } from '@/hooks/useSessionParams';
import css from './SessionTaskResult.module.scss';
import { usePopup } from '@/hooks/usePopup';

interface SessionTaskResultProps {
  taskNumber?: number | null;
  limit?: number | null;
  status?: string | null;
}

const SessionTaskResult: React.FC<SessionTaskResultProps> = ({ taskNumber = null, limit = null, status = null }) => {
  const [isTaskSaved, setIsTaskSaved] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const setSessionParams = useSessionParams();
  const { openPopup } = usePopup();

  useEffect(() => {
    if (taskNumber === limit && !isTestFinished) {
      setIsTestFinished(true);
      openPopup({
        type: 'success',
        icon: 'success',
        title: 'Congratulations',
        subtitle:
          ' The test is fully completed and the results have been successfully saved. Thank you for your time, your help is invaluable to us.',
        btn: 'Ok',
      });
    }
  }, [isTestFinished, limit, taskNumber, openPopup]);

  useEffect(() => {
    setIsTaskSaved(true);
  }, []);

  if (!limit || !taskNumber) return null;

  return (
    <div className={css.SessionTaskResult}>
      <div className={css.Title}>
        <Icon name={status === 'done' ? 'done' : 'error'} color="var(--color)" size="20" />
        <Title tag="h1" size="h4">
          {status === 'done' ? 'Task completed' : 'Task failed'}
        </Title>
      </div>

      {taskNumber < limit && (
        <Button
          full
          type="button"
          onClick={() => setSessionParams(`${taskNumber + 1}`, 'info')}
          disabled={!isTaskSaved}
        >
          Next task
        </Button>
      )}

      {taskNumber === limit && (
        <Button full href="/">
          Back to main page
        </Button>
      )}
    </div>
  );
};

export default SessionTaskResult;
