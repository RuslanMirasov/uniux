import { PrivateRoute, Logo, GoBack, Main, Sidebar, Device, EditProjectForm } from '../../../components';

const EditProjectPage = async () => {
  return (
    <PrivateRoute>
      <Logo position="right" />
      <Sidebar>
        <GoBack />
        <EditProjectForm />
      </Sidebar>
      <Main>
        <Device />
      </Main>
    </PrivateRoute>
  );
};

export default EditProjectPage;
