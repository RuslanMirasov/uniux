import { Logo, Main, Sidebar, Device, Title } from '../../components';

const ProjectPage = async () => {
  return (
    <>
      <Sidebar>
        <Title tag="h1" size="h1">
          Hello World
        </Title>
      </Sidebar>
      <Main>
        <Logo position="right" />
        <Device />
      </Main>
    </>
  );
};

export default ProjectPage;
