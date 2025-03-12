import { Title, Text, Button } from '../../../components';
import { useSessionParams } from '@/hooks/useSessionParams';
import css from './SessionTaskDescription.module.scss';
import type { ITask } from '@/models/Project';

interface SessionTaskDescriptionProps {
  taskNumber: number | null;
  task: ITask;
}

const SessionTaskDescription: React.FC<SessionTaskDescriptionProps> = ({ taskNumber, task }) => {
  const setSessionParams = useSessionParams();
  const { taskName, description } = task;
  return (
    <div className={css.SessionTaskDescription}>
      {taskNumber && taskName && (
        <Title tag="h1" size="h1">
          <span>{taskNumber >= 10 ? taskNumber : `0${taskNumber}`}.</span> {taskName}
        </Title>
      )}

      {description && <Text size="big">{description}</Text>}
      <Button type="button" full onClick={() => setSessionParams(`${taskNumber}`, 'start')}>
        To the task
      </Button>
    </div>
  );
};

export default SessionTaskDescription;
