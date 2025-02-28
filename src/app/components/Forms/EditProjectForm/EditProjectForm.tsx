'use client';

import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useProject';
import { Button, Title } from '../../../components';
import css from './EditProjectForm.module.scss';

interface IProject {
  _id: string;
  name: string;
  tasks: object[];
}

const EditProjectForm: React.FC = () => {
  const { id } = useParams();
  const { project } = useProject(id as string);
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
