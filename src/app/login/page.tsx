import Link from 'next/link';
import { Logo, FormWrapper, Button, Text, Title } from './../components';

const LoginPage: React.FC = () => {
  return (
    <>
      <Logo position="left" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Log in to Uniux
        </Title>
        <Text align="center" size="big">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus suscipit impedit ab. Tempore laudantium similique accusamus nobis, itaque
          ipsa dicta asperiores quam, placeat nesciunt incidunt, accusantium esse labore dolores vel.
        </Text>
        <Button href="/" full variant="white">
          Log in
        </Button>
        <Text align="center" size="big">
          No account?{' '}
          <Link href="/SignUp" className="link">
            Create one
          </Link>
        </Text>
      </FormWrapper>
    </>
  );
};

export default LoginPage;
