import { PrivateRoute, Logo, Main, Sidebar, Device, ProjectStarted } from '../../../components';

const EditProjectPage = async () => {
  return (
    <PrivateRoute>
      <Sidebar>
        <ProjectStarted />
      </Sidebar>
      <Main>
        <Logo position="right" />
        <Device />
      </Main>
    </PrivateRoute>
  );
};

export default EditProjectPage;
