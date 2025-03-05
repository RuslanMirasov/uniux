import Link from 'next/link';
import { ReactNode } from 'react';
import { Icon } from '../../../components';
import css from './ProjectHeadline.module.scss';

interface ProjectHeadlineProps {
  id?: string | string[] | undefined;
  children: ReactNode;
}

const ProjectHeadline: React.FC<ProjectHeadlineProps> = ({ id = undefined, children }) => {
  return (
    <div className={css.ProjectHeadline}>
      {children}
      {id && (
        <Link href={`/project/${id}/edit`}>
          <Icon name="pen" size="14" />
        </Link>
      )}
    </div>
  );
};

export default ProjectHeadline;
