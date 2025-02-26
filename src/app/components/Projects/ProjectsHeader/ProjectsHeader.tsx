import { Button } from '../../../components';
import css from './ProjectsHeader.module.scss';

const ProjectsHeader: React.FC = () => {
  return (
    <header className={css.Header}>
      <Button href="/create-new-project" size="small">
        +&nbsp;&nbsp;&nbsp;Test project
      </Button>
    </header>
  );
};

export default ProjectsHeader;
