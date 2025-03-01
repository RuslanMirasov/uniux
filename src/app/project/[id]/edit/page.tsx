import { PrivateRoute, Logo, GoBack, Main, Sidebar, Device, EditProjectForm } from '../../../components';

const EditProjectPage = async () => {
  return (
    <PrivateRoute>
      <Sidebar>
        <GoBack />
        <EditProjectForm />
      </Sidebar>
      <Main>
        <Logo position="right" />
        <Device />
      </Main>
    </PrivateRoute>
  );
};

export default EditProjectPage;
