import Image from "next/image";
import { Title, Text, Button, Logo } from "../../components";
import css from "./PageNotFound.module.scss";

const PageNotFound: React.FC = () => {
  return (
    <>
      <Logo />
      <div className={css.PageNotFound}>
        <Title tag="h1" size="h1">
          Error 404
        </Title>
        <Text align="center">The page you are looking for can`t be found.</Text>
        <Image src="/notfound.png" alt="uniux" width="512" height="451" />
        <Button href="/">Back to main page</Button>
      </div>
    </>
  );
};

export default PageNotFound;
