'use client';
import { useParams, notFound } from 'next/navigation';
import { useProject } from '@/hooks/useProject';
import {
  Title,
  ProjectHeadline,
  TasksCollection,
  InputCopyText,
  ProjectSection,
  TaskStatistic,
  ProjectSkeleton,
  Button,
  SessionCollection,
  SessionItem,
} from '../../components';

const ProjectSessions: React.FC = () => {
  const { id } = useParams();
  const { project, isLoading, isError } = useProject(id as string);

  if (isLoading) return <ProjectSkeleton />;
  if (isError || !project) notFound();

  const { name, tasks } = project;

  return (
    <>
      <ProjectHeadline id={id}>
        <Title tag="h1" size="h1">
          {name}
        </Title>
      </ProjectHeadline>

      <Button href={`${window.location.origin}/project/${id}`} full>
        Run the test
      </Button>

      {tasks.length > 0 && <TasksCollection projectId={id} tasks={tasks} locked />}

      <InputCopyText text={`${window.location.origin}/project/${id}`} message="Share the test with your team" />

      <ProjectSection title="Statistics">
        <TaskStatistic overall={0} success={0} rate={0} time={90000} />
      </ProjectSection>

      <Button type="button" full>
        Click map
      </Button>

      <ProjectSection title="Sessions">
        <SessionCollection>
          <SessionItem email="mirasovdev@gmail.com" name="Руслан Мирасов" />
          <SessionItem email="mirasovdev@gmail.com" />
          <SessionItem email="mirasovdev@gmail.com" name="Jack Black" />
          <SessionItem email="mirasovdev@gmail.com" name="Андрей Сипатов" />
          <SessionItem email="mirasovdev@gmail.com" name="Bob Shneider" />
        </SessionCollection>
      </ProjectSection>
    </>
  );
};

export default ProjectSessions;
