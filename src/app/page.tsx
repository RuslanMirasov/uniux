import {
  PrivateRoute,
  Profile,
  Sidebar,
  SearchForm,
  ProjectsSection,
  ProjectsHeader,
  ProjectsFilters,
  ProjectsCollection,
} from './components';

const HomePage = async () => {
  return (
    <PrivateRoute>
      <Sidebar type="main">
        <Profile />
        <SearchForm />
        <hr />
      </Sidebar>
      <ProjectsSection>
        <ProjectsHeader />
        <ProjectsFilters />
        <ProjectsCollection />
      </ProjectsSection>
    </PrivateRoute>
  );
};

export default HomePage;
