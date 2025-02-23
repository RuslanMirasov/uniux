'use client';

import { Skeleton, Title, Text, Button } from '../../components';
import { useProject } from '@/hooks/useProject';
import css from './Projects.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Projects: React.FC = () => {
  const { projects, isLoading, isError } = useProject();

  if (isError) return null;

  return (
    <div className={css.Projects}>
      <header className={css.Header}>
        <Button href="/create-new-project" size="small">
          +&nbsp;&nbsp;&nbsp;Test project
        </Button>
      </header>
      <nav className={css.Navigation}>
        <ul className={css.ProjectsFilter}>
          <li>
            <button data-active>Recently viewed</button>
          </li>
          <li>
            <button>Shared files</button>
          </li>
          <li>
            <button>Shared projects</button>
          </li>
        </ul>
        <button className={css.ChangeViewButton}></button>
      </nav>
      {isLoading && (
        <ul className={css.ProjectsCollection}>
          <li className={css.ProjectsCollectionItem}>
            <Skeleton height="60%" radius="15px" />
            <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
            <Skeleton width="22%" height="12%" radius="4px" />
          </li>
          <li className={css.ProjectsCollectionItem}>
            <Skeleton height="60%" radius="15px" />
            <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
            <Skeleton width="22%" height="12%" radius="4px" />
          </li>
          <li className={css.ProjectsCollectionItem}>
            <Skeleton height="60%" radius="15px" />
            <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
            <Skeleton width="22%" height="12%" radius="4px" />
          </li>
          <li className={css.ProjectsCollectionItem}>
            <Skeleton height="60%" radius="15px" />
            <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
            <Skeleton width="22%" height="12%" radius="4px" />
          </li>
          <li className={css.ProjectsCollectionItem}>
            <Skeleton height="60%" radius="15px" />
            <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
            <Skeleton width="22%" height="12%" radius="4px" />
          </li>
          <li className={css.ProjectsCollectionItem}>
            <Skeleton height="60%" radius="15px" />
            <Skeleton width="36%" height="8%" radius="4px" margin="2.4% 0px 2.4% 0px" />
            <Skeleton width="22%" height="12%" radius="4px" />
          </li>
        </ul>
      )}

      {!isLoading && (
        <ul className={css.ProjectsCollection}>
          {projects.map(({ _id, image, name, updatedAt }) => (
            <li key={_id} className={css.ProjectsCollectionItem}>
              <Link href={`/${_id}`} className={css.Thumbnail}>
                <Image src={image ? image : `/placeholder.webp`} width="1000" height="1000" alt={name} />
              </Link>
              <Title tag="h2" size="h6">
                {name}
              </Title>
              <Text>{updatedAt}</Text>
            </li>
          ))}
          {/* <li className={css.ProjectsCollectionItem}>
            <div className={css.Thumbnail}>
              <Image src="/placeholder.webp" width="500" height="500" alt="Uniux" />
            </div>
            <Title tag="h2" size="h6">
              Project name
            </Title>
            <Text>Edited 5 minutes ago</Text>
          </li> */}
        </ul>
      )}
    </div>
  );
};

export default Projects;
