import { ReactNode } from 'react';
import css from './ProjectsSection.module.scss';

interface ProjectsSectionProps {
  children: ReactNode;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ children }) => (
  <main className={css.Projects}>{children}</main>
);

export default ProjectsSection;
