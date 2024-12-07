import Link from 'next/link';
import { Logo, FormWrapper, Button, Text, Title, LoginForm } from './../components';

const LoginPage: React.FC = () => {
  return (
    <>
      <Logo position="left" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Log in to Uniux
        </Title>
        <LoginForm />
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
