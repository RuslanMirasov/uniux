import { ReactNode } from 'react';
import css from './ProjectSection.module.scss';

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, children }) => {
  return (
    <div className={css.ProjectSection}>
      <strong>{title}</strong>
      {children}
    </div>
  );
};

export default ProjectSection;
