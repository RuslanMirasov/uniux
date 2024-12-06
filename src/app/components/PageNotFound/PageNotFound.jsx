import { Text, Title } from 'components/Typography';
import css from './PageNotFound.module.scss';
import image404 from 'images/404.png';
import { Button } from 'components/Buttons';

const PageNotFound = () => {
  return (
    <div className={css.PageNotFound}>
      <Title tag="h1" size="large">
        Error 404.
      </Title>
      <Text>The page you are looking for can`t be found.</Text>
      <img src={image404} alt="Uniux" className={css.Image} />
      <div className={css.Button}>
        <Button to="/" full>
          Back to main page
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
