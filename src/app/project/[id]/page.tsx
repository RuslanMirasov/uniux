import { GoBack, PrivateRoute, Sidebar, Projects } from '../../components';

const ProjectsPage: React.FC = () => {
  return (
    <PrivateRoute>
      <Sidebar>
        <GoBack />
      </Sidebar>
      <Projects />
    </PrivateRoute>
  );
};

export default ProjectsPage;
