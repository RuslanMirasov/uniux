import { PrivatPage, SidebarMain, Projects, Profile } from './components';

const HomePage = async () => {
  return (
    <PrivatPage>
      <SidebarMain>
        <Profile />
      </SidebarMain>
      <Projects />
    </PrivatPage>
  );
};

export default HomePage;
