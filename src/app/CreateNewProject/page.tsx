import { Logo, FormWrapper, CreateNewTestForm, Title, GoBackWrapper, GoBack } from '../components';

const CreateNewProject: React.FC = () => {
  return (
    <>
      <GoBackWrapper>
        <GoBack />
      </GoBackWrapper>
      <Logo position="right" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Create test
        </Title>
        <CreateNewTestForm />
      </FormWrapper>
    </>
  );
};

export default CreateNewProject;
