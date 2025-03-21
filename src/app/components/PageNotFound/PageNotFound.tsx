import Image from 'next/image';
import Link from 'next/link';
import { Title, Text, Button } from '../../components';
import css from './PageNotFound.module.scss';

const PageNotFound: React.FC = () => {
  return (
    <div className={css.PageNotFound}>
      <Title tag="h1" size="h1">
        Error 404
      </Title>
      <Text align="center">The page you are looking for can`t be found.</Text>
      <Image src="/notfound.webp" alt="uniux" width="512" height="451" priority />
      <Link href="/">
        <Button type="button" full>
          Back to main page
        </Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
