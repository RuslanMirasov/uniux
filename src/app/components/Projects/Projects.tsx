import { Title, Text, Button } from '../../components';
import { usePopup } from '@/hooks/usePopup';
import css from './Projects.module.scss';
import Image from 'next/image';

const Projects: React.FC = () => {
  const { openPopup } = usePopup();

  const handleClick = (): void => {
    openPopup({
      type: 'success',
      title: `Cangratulations!`,
      subtitle: 'You just click to the thumbnail area!',
      icon: 'success',
      btn: 'ОК, I got it',
      action: () => {
        openPopup({
          type: 'error',
          title: `OOOOPS.....`,
          subtitle:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora minus, deserunt dignissimos ratione numquam esse illo magnam ullam sapiente minima quisquam, adipisci reiciendis incidunt error quam blanditiis libero commodi officia. Odio delectus iusto labore debitis sapiente dolore! Delectus, ipsum. Maiores odio, iste maxime odit veniam pariatur explicabo eos omnis eius non? Sit, quo nihil! Quas illo quos veritatis dignissimos ab! Repellat porro harum nostrum laudantium? Magnam, nisi libero ut tempore animi, dolores nam similique ratione reprehenderit quas eveniet facilis aliquam deserunt? Quia maiores illo ex debitis quo expedita dignissimos voluptatem. Accusantium exercitationem ex tenetur a suscipit iure omnis harum sunt inventore, placeat voluptatum iste quasi. Qui optio, at nemo, sed odit facere aperiam odio assumenda mollitia illo quia, facilis cum! Eligendi, quia? Laudantium voluptates rerum dolorem tempora eum magnam non, aperiam inventore, aliquam quas tempore facilis! Accusantium velit odio excepturi id ut, inventore rem, nobis sed quaerat temporibus cum reiciendis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora minus, deserunt dignissimos ratione numquam esse illo magnam ullam sapiente minima quisquam, adipisci reiciendis incidunt error quam blanditiis libero commodi officia. Odio delectus iusto labore debitis sapiente dolore! Delectus, ipsum. Maiores odio, iste maxime odit veniam pariatur explicabo eos omnis eius non? Sit, quo nihil! Quas illo quos veritatis dignissimos ab! Repellat porro harum nostrum laudantium? Magnam, nisi libero ut tempore animi, dolores nam similique ratione reprehenderit quas eveniet facilis aliquam deserunt? Quia maiores illo ex debitis quo expedita dignissimos voluptatem. Accusantium exercitationem ex tenetur a suscipit iure omnis harum sunt inventore, placeat voluptatum iste quasi. Qui optio, at nemo, sed odit facere aperiam odio assumenda mollitia illo quia, facilis cum! Eligendi, quia? Laudantium voluptates rerum dolorem tempora eum magnam non, aperiam inventore, aliquam quas tempore facilis! Accusantium velit odio excepturi id ut, inventore rem, nobis sed quaerat temporibus cum reiciendis?',
          icon: 'error',
          btn: 'Close',
        });
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
      </ul>
    </div>
  );
};

export default Projects;
