'use client';

import Link from 'next/link';
import { Logo, FormWrapper, Text, Title, LoginForm, Button } from './../components';

const LoginPage: React.FC = () => {
  return (
    <>
      <Logo position="left" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Log in to Uniux
        </Title>
        <LoginForm />
        <Button variant="border" full icon="figma" onClick={() => (window.location.href = '/api/auth/figma')}>
          Continue with Figma
        </Button>
        <Text align="center" color="grey">
          By clicking &quot;Continue with Figma&quot;, you agree <br />
          to the{' '}
          <Link href="/" className="link">
            UniUX
          </Link>{' '}
          TOS and{' '}
          <Link href="/" className="link">
            Privacy Policy
          </Link>
        </Text>
        <Text align="center" size="big">
          <Link href="/ResetPassword" className="link">
            Reset password
          </Link>
        </Text>
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
