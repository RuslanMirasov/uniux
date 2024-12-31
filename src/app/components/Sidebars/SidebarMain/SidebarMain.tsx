import css from './SidebarMain.module.scss';

interface SidebarProps {
  children: React.ReactNode;
}

const SidebarMain: React.FC<SidebarProps> = ({ children }) => {
  return <aside className={css.SidebarMain}>{children}</aside>;
};

export default SidebarMain;
