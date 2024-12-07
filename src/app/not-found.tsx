import { Metadata } from 'next';
import { Logo, PageNotFound } from './components';

export const metadata: Metadata = {
  title: 'Uniux | Page Not Found',
  description: "This page doesn't exist.",
};

const NotFound: React.FC = () => {
  return (
    <>
      <Logo />
      <PageNotFound />
    </>
  );
};

export default NotFound;
