import { PrivateRoute, SidebarMain, Projects, Profile, Skeleton } from './components';

const HomePage = async () => {
  return (
    <PrivateRoute>
      <SidebarMain>
        <Profile />
        <Skeleton width="calc(100% - 20px)" height="40px" radius="5px" margin="10px 10px 20px 10px" />
        <hr />
      </SidebarMain>
      <Projects />
    </PrivateRoute>
  );
};

export default HomePage;
