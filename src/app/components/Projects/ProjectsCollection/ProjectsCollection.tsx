'use client';

import { Title, Text, Icon, ImageWithPreloader, ProjectsSkeleton, ProjectsNotFound } from '../..';
import { timeAgo } from '@/lib/timeAgo';
import Link from 'next/link';
import { useProjects } from '@/hooks/useProjects';
import css from './ProjectsCollection.module.scss';

const ProjectsCollection: React.FC = () => {
  const { projects, isLoading, isError } = useProjects();

  if (isError) return null;
  if (isLoading || !projects) return <ProjectsSkeleton />;
  if (projects.length === 0) return <ProjectsNotFound />;

  return (
    <ul className={css.ProjectsCollection}>
      {projects.map(({ _id, image, name, views, updatedAt }) => (
        <li key={_id} className={css.ProjectCard}>
          <Link href={`/project/${_id}/sessions`} className={css.Thumbnail}>
            <ImageWithPreloader src={image} width="700" height="420" alt={name || 'uniux project poster'} />
          </Link>
          <div className={css.ProjectCardInfo}>
            <Title tag="h2" size="h6" auto>
              <Link href={`/project/${_id}/sessions`}>{name}</Link>
            </Title>
            <Text>
              <Icon name="time" size="16" color="var(--white)" />
              {timeAgo(updatedAt)}
            </Text>
            <div className={css.Views}>
              {views} <Icon name="views" size="15" color="var(--grey)" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsCollection;
