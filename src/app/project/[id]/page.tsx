import { SessionWelcome, SessionRoom } from '../../components';
import { getProjectById } from '@/lib/getProjectById';
import { notFound } from 'next/navigation';

interface Params {
  id: string;
}

interface SearchParams {
  task?: string;
  status?: string;
}

interface Props {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

const ProjectPage = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { task, status } = await searchParams;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  if (!status || status !== 'start')
    return <SessionWelcome project={project} task={task ? Number(task) : null} status={status || null} />;

  return (
    <SessionRoom
      prototype={project?.tasks ? project?.tasks[Number(task) - 1]?.protoUrl : null}
      target={project?.tasks ? project?.tasks[Number(task) - 1]?.target : null}
    />
  );
};

export default ProjectPage;
