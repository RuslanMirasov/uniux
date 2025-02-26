import { GoBack, PrivateRoute, Sidebar } from '../components';

const ProjectsPage: React.FC = () => {
  return (
    <PrivateRoute>
      <Sidebar>
        <GoBack />
      </Sidebar>
    </PrivateRoute>
  );
};

export default ProjectsPage;
