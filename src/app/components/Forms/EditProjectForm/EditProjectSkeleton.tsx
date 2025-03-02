import { Skeleton } from '../..';
import css from './EditProjectForm.module.scss';

const EditProjectSkeleton: React.FC = () => {
  return (
    <div className={css.EditProject}>
      <div className={css.Form}>
        <Skeleton height="14px" radius="4px" margin="0px 0px 14px 0px" />
        <Skeleton width="60%" height="14px" radius="4px" margin="0px 0px 30px 0px" />
        <Skeleton height="50px" radius="5px" />
      </div>

      <div className={css.StartButtonWrapper}>
        <Skeleton height="50px" radius="5px" />
      </div>
    </div>
  );
};

export default EditProjectSkeleton;
