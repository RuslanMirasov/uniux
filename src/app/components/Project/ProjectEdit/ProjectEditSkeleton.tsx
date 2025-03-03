import { Skeleton } from '../../../components';

const ProjectEditSkeleton: React.FC = () => (
  <>
    <Skeleton width="80%" height="18px" radius="4px" margin="30px 0px 14px 0px" />
    <Skeleton width="60%" height="18px" radius="4px" />
  </>
);

export default ProjectEditSkeleton;
