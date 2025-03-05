'use client';

import { Accordeon, Text } from '../../../components';

interface Task {
  _id: string;
  taskName: string;
  description: string;
}

interface TasksCollectionProps {
  locked?: boolean;
  projectId?: string | string[] | undefined;
  tasks: Task[];
}

const TasksCollection: React.FC<TasksCollectionProps> = ({ locked = false, projectId = '', tasks }) => {
  return (
    <div>
      {tasks.map(({ _id, taskName, description }, index) => (
        <Accordeon key={_id} number={index + 1} title={taskName} locked={locked} href={`/project/${projectId}/${_id}`}>
          <Text color="grey">{description}</Text>
        </Accordeon>
      ))}
    </div>
  );
};

export default TasksCollection;
