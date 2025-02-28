'use client';

import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useProject';
import { Button, Title, Skeleton } from '../../../components';
import css from './EditProjectForm.module.scss';

interface IProject {
  _id: string;
  name: string;
  tasks: object[];
}

const EditProjectForm: React.FC = () => {
  const { id } = useParams();
  const { project, isLoading, isError } = useProject(id as string);

  if (isError) return null;

  if (!project || isLoading) {
    return (
      <div className={css.EditProjectForm}>
        <div>
          <Skeleton height="14px" radius="4px" margin="0px 0px 14px 0px" />
          <Skeleton width="60%" height="14px" radius="4px" margin="0px 0px 30px 0px" />
          <Skeleton height="50px" radius="5px" />
        </div>

        <Skeleton height="50px" radius="5px" />
      </div>
    );
  }

  const { _id, name, tasks } = project as IProject;

  return (
    <div className={css.EditProjectForm}>
      <div>
        <Title tag="h2" size="h3">
          {name}
        </Title>
        <p>ID: {_id}</p>
        <p>Tasks: {tasks ? tasks.length : 'null'}</p>
        <Button type="button" full variant="white">
          Add task
        </Button>
      </div>

      <Button type="button" full>
        Start test
      </Button>
    </div>
  );
};

export default EditProjectForm;
