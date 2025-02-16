'use client';

import { Title, Text, Button } from '../../components';
import { usePopup } from '@/hooks/usePopup';
import css from './Projects.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Projects: React.FC = () => {
  const router = useRouter();
  const { openPopup, closePopup, refreshPopup } = usePopup();

  const handleClick = (): void => {
    openPopup({
      type: 'success',
      title: `Cangratulations!`,
      subtitle: 'You just click to the thumbnail area!',
      icon: 'success',
      btn: 'ОК, I got it',
      action: () => {
        refreshPopup({
          type: 'success',
          icon: 'notfound',
          title: `Enother popup!`,
          subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus culpa minima, dignissimos, officia iste
          earum fugit non aut odio quae provident. Harum, atque expedita. Ipsam alias non sed? Aperiam, nemo. Illum
          fugiat reiciendis iusto quia ex! Cumque consequatur omnis voluptate cupiditate libero corporis temporibus
          pariatur architecto dolores, placeat corrupti odit impedit voluptatibus? Perspiciatis est molestiae qui magni!
          Reiciendis, aliquid ut? Tempore consectetur voluptatibus molestias ad unde debitis ipsum error alias sequi
          esse minus, eum voluptates incidunt, quasi rerum. Nostrum itaque quia necessitatibus minima tempora! Sit
          similique cum officiis ratione dolores. Magni cumque facere beatae distinctio nesciunt a, nisi debitis
          corporis ex iusto sequi quisquam, commodi ducimus quasi delectus sapiente dicta? Aliquid rem et, ipsam
          praesentium cupiditate esse rerum nobis deserunt! Provident doloribus consectetur dicta iure fuga mollitia
          esse quia quis dolor, magni porro sit labore ea maxime voluptatem. Ipsum quos repellendus quae accusamus minus
          nobis illo labore quas recusandae quaerat. Non libero dignissimos fugit provident perferendis quod ipsa sint
          beatae laudantium! Nesciunt, nostrum adipisci voluptatibus quasi sapiente sed, tenetur iure placeat at
          corrupti esse voluptate dolore impedit ipsam non tempora. Dicta possimus exercitationem quis nemo nihil
          dolorum placeat accusantium. Consectetur eveniet facere aliquam cumque odio sit id quisquam dignissimos amet,
          assumenda fugiat, ullam nobis officiis, autem provident similique ut reprehenderit. Magnam totam delectus
          nihil ad voluptates, odit quae provident minima dolores voluptatum aperiam eius est dolorem ducimus sint
          soluta sit cupiditate obcaecati nesciunt esse omnis tenetur autem. Nobis, minima accusamus.`,
          btn: 'Go to project',
          action: () => {
            closePopup();
            setTimeout(() => {
              router.push('/projects');
            }, 600);
          },
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
            <Image src="/placeholder.webp" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.webp" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.webp" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.webp" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.webp" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.webp" width="500" height="500" alt="Uniux" />
          </div>
          <Title tag="h2" size="h6">
            Project name
          </Title>
          <Text>Edited 5 minutes ago</Text>
        </li>
        <li className={css.ProjectsCollectionItem} onClick={handleClick}>
          <div className={css.Thumbnail}>
            <Image src="/placeholder.webp" width="500" height="500" alt="Uniux" />
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
