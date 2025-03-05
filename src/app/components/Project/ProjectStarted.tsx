'use client';
import { useParams, notFound } from 'next/navigation';
import { useProject } from '@/hooks/useProject';
import {
  Title,
  Button,
  StartProjectButton,
  Icon,
  ProjectHeadline,
  TasksCollection,
  InputCopyText,
  ProjectSkeleton,
} from '../../components';

const ProjectStarted: React.FC = () => {
  const { id } = useParams();
  const { project, isLoading, isError } = useProject(id as string);

  if (isLoading) return <ProjectSkeleton />;
  if (isError || !project) notFound();

  const { name, tasks } = project;

  return (
    <>
      <ProjectHeadline id={id}>
        <Icon name="done" color="var(--color)" size="18" />
        <Title tag="h1" size="h1">
          Your test is start
        </Title>
      </ProjectHeadline>

      <Title tag="h4" size="h4">
        {name}
      </Title>

      {tasks.length > 0 && <TasksCollection tasks={tasks} />}

      <InputCopyText text={`${window.location.origin}/project/${id}`} message="Link to the created test" />

      <StartProjectButton>
        <Button href="/" type="button" full>
          ok
        </Button>
      </StartProjectButton>
    </>
  );
};

export default ProjectStarted;
