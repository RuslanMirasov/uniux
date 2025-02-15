'use client';

import { Title, Text, Button } from '../../components';
import { usePopup } from '@/hooks/usePopup';
import css from './Projects.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Projects: React.FC = () => {
  const router = useRouter();
  const { openPopup, closePopup } = usePopup();

  const handleClick = (): void => {
    openPopup({
      type: 'success',
      title: `Cangratulations!`,
      subtitle: 'You just click to the thumbnail area!',
      icon: 'success',
      btn: 'ОК, I got it',
      action: () => {
        closePopup();
        setTimeout(() => {
          router.push('/projects');
        }, 600);
      },
    });
  };

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
      <ul className={css.ProjectsCollection}>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.jpg" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.jpg" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.jpg" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.jpg" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.jpg" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.jpg" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.jpg" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
      </ul>
    </div>
  );
};

export default Projects;
