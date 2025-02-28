import { Logo, GoBack, Main, Sidebar, Device } from '../../components';

const ProjectPage = async () => {
  return (
    <>
      <Logo position="right" />
      <Sidebar>
        <GoBack />
        <p>Public Project page</p>
      </Sidebar>
      <Main>
        <Device />
      </Main>
    </>
  );
};

export default ProjectPage;
