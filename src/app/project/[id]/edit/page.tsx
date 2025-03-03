import { PrivateRoute, Logo, GoBack, Main, Sidebar, Device, ProjectEdit } from '../../../components';

const EditProjectPage = async () => {
  return (
    <PrivateRoute>
      <Sidebar>
        <GoBack />
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
