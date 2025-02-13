import { SidebarMain, Projects, Profile } from './components';

const HomePage: React.FC = () => {
  return (
    <>
      <SidebarMain>
        <Profile />
      </SidebarMain>
      <Projects />
    </>
  );
};

export default HomePage;
