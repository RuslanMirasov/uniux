import { PrivateRoute, SidebarMain, Projects, Profile } from './components';

const HomePage = async () => {
  return (
    <PrivateRoute>
      <SidebarMain>
        <Profile />
      </SidebarMain>
      <Projects />
    </PrivateRoute>
  );
};

export default HomePage;
