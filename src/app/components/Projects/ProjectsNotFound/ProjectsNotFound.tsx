import { Icon, Text } from '../../../components';
import css from './ProjectsNotFound.module.scss';

const ProjectsNotFound: React.FC = () => {
  return (
    <div className={css.ProjectNotFound}>
      <Icon name="notfound" />
      <Text align="center" size="big">
        Projects not found
      </Text>
    </div>
  );
};

export default ProjectsNotFound;
