import { PrivateRoute, Logo, Main, Sidebar, Device, ProjectEdit } from '../../../components';

const EditProjectPage = async () => {
  return (
    <PrivateRoute>
      <Sidebar>
        <ProjectEdit />
      </Sidebar>
      <Main>
        <Logo position="right" />
        <Device />
      </Main>
    </PrivateRoute>
  );
};

export default EditProjectPage;
