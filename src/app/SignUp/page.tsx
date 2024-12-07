import Link from 'next/link';
import { Logo, FormWrapper, Button, Text, Title, RegistrationForm } from '../components';

const LoginPage: React.FC = () => {
  return (
    <>
      <Logo position="left" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Sign up for Uniux
        </Title>
        <RegistrationForm />
        <Text align="center" color="grey">
          By clicking "Create account" or "Continue with Google", you agree to the{' '}
          <Link href="/" className="link">
            UniUX
          </Link>{' '}
          TOS and{' '}
          <Link href="/" className="link">
            Privacy Policy
          </Link>
        </Text>
        <Text align="center" color="grey">
          *By opting in, you are consenting to receive product, service and events updates from Figma. You can
          unsubscribe at any time.
        </Text>
        <Text align="center" size="big">
          Already have an account?{' '}
          <Link href="/login" className="link">
            Log in
          </Link>
        </Text>
      </FormWrapper>
    </>
  );
};

export default LoginPage;
