import Link from 'next/link';
import { Logo, FormWrapper, PasswordResetForm, Title, Text } from '../components';

const ResetPasswordPage: React.FC = () => {
  return (
    <>
      <Logo position="left" />
      <FormWrapper>
        <Title tag="h1" size="h1">
          Enter your email <br /> to reset password
        </Title>
        <PasswordResetForm />
        <Text align="center" size="big">
          <Link href="/login" className="link">
            Cancel
          </Link>
        </Text>
      </FormWrapper>
    </>
  );
};

export default ResetPasswordPage;
