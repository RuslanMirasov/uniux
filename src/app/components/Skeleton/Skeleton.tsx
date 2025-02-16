import css from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  margin?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '100%', radius = '100px', margin = 'none' }) => {
  return (
    <div
      className={css.Skeleton}
      style={
        {
          '--skeleton-width': width,
          '--skeleton-height': height,
          '--skeleton-radius': radius,
          '--skeleton-margin': margin,
        } as React.CSSProperties
      }
    ></div>
  );
};

export default Skeleton;
