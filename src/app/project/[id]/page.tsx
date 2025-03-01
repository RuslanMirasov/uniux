import { Logo, GoBack, Main, Sidebar, Device, TasksCollection } from '../../components';

const ProjectPage = async () => {
  return (
    <>
      <Logo position="right" />
      <Sidebar>
        <GoBack />
        <TasksCollection />
      </Sidebar>
      <Main>
        <Device />
      </Main>
    </>
  );
};

export default ProjectPage;
