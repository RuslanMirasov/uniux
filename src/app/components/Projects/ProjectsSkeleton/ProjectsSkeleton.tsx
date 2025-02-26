import { Skeleton } from '../../../components';
import css from './ProjectsSkeleton.module.scss';

const ProjectsSkeleton: React.FC = () => {
  return (
    <ul className={css.ProjectsSkeleton}>
      <li>
        <Skeleton height="60%" radius="15px" />
        <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
        <Skeleton width="22%" height="12%" radius="4px" />
      </li>
      <li>
        <Skeleton height="60%" radius="15px" />
        <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
        <Skeleton width="22%" height="12%" radius="4px" />
      </li>
      <li>
        <Skeleton height="60%" radius="15px" />
        <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
        <Skeleton width="22%" height="12%" radius="4px" />
      </li>
      <li>
        <Skeleton height="60%" radius="15px" />
        <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
        <Skeleton width="22%" height="12%" radius="4px" />
      </li>
      <li>
        <Skeleton height="60%" radius="15px" />
        <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
        <Skeleton width="22%" height="12%" radius="4px" />
      </li>
      <li>
        <Skeleton height="60%" radius="15px" />
        <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
        <Skeleton width="22%" height="12%" radius="4px" />
      </li>
    </ul>
  );
};

export default ProjectsSkeleton;
