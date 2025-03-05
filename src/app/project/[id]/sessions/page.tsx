import { PrivateRoute, Logo, Main, Sidebar, Device, ProjectSessions } from '../../../components';

const EditProjectPage = async () => {
  return (
    <PrivateRoute>
      <Sidebar>
        <ProjectSessions />
      </Sidebar>
      <Main>
        <Logo position="right" />
        <Device />
      </Main>
    </PrivateRoute>
  );
};

export default EditProjectPage;
