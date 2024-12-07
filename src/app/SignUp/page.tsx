import Link from 'next/link';
import { Logo, FormWrapper, Button, Text, Title } from '../components';

const LoginPage: React.FC = () => {
  return (
    <>
      <Logo position="left" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Sign up for Uniux
        </Title>
        <Text align="center" size="big">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus suscipit impedit ab. Tempore laudantium
          similique accusamus nobis, itaque ipsa dicta asperiores quam, placeat nesciunt incidunt, accusantium esse
          labore dolores vel.
        </Text>
        <Button href="/" full variant="white">
          Create account
        </Button>
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
