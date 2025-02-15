import Link from 'next/link';
import { Suspense } from 'react';
import { Logo, FormWrapper, Text, Title, LoginForm, GoogleButton } from './../components';

const LoginPage: React.FC = () => {
  return (
    <>
      <Logo position="left" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Log in to Uniux
        </Title>

        <Suspense fallback={null}>
          <LoginForm />
          <GoogleButton />
        </Suspense>

        <Text align="center" color="grey">
          By clicking &quot;Continue with Google&quot;, you agree <br />
          to the{' '}
          <Link href="/uniux-tos" className="link">
            UniUX
          </Link>{' '}
          TOS and{' '}
          <Link href="/policy" className="link">
            Privacy Policy
          </Link>
        </Text>

        <Text align="center" size="big">
          <Link href="/reset-password" className="link">
            Reset password
          </Link>
        </Text>

        <Text align="center" size="big">
          No account?{' '}
          <Link href="/sign-up" className="link">
            Create one
          </Link>
        </Text>
      </FormWrapper>
    </>
  );
};

export default LoginPage;
