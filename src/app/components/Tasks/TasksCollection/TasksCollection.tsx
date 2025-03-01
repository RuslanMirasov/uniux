'use client';

import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useProject';

interface IProject {
  _id: string;
  name: string;
  tasks: object[];
}

const TasksCollection: React.FC = () => {
  const { id } = useParams();
  const { project, isError } = useProject(id as string);

  if (isError) return null;

  const { name } = project as IProject;

  return <h3>{name} </h3>;
};

export default TasksCollection;
