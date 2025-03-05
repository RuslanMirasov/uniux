import { GoBack } from '../../components';
import css from './Sidebar.module.scss';

interface SidebarProps {
  type?: 'main' | 'project';
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children, type = 'project' }) => {
  return (
    <aside className={`${css.Sidebar} ${type ? css['type--' + type] : ''}`}>
      {type === 'project' ? (
        <>
          <GoBack />
          <div className={css.ProjectContent}>{children}</div>
        </>
      ) : (
        children
      )}
    </aside>
  );
};

export default Sidebar;
