'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { Preloader, Button, ButtonsList } from './components';

const HomePage: React.FC = () => {
  const { user, isLogin, isLoading } = useAuth();

  if (isLoading) return <Preloader />;

  return (
    <>
      <h1>Main page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt necessitatibus molestias voluptates facere
        cumque, harum id autem vitae ad quasi eius excepturi reprehenderit iste, pariatur cum quod veniam quibusdam in.
      </p>
      <ButtonsList>
        <Button href="/login">Login</Button>
        <Button href="/create-new-project">Create New Project</Button>
      </ButtonsList>
      {isLogin && user && (
        <div
          style={{
            display: 'flex',
            maxWidth: '500px',
            margin: '50px auto',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          {user.img_url && <Image src={user.img_url} alt="User" width="100" height="100" />}

          <p>
            <strong style={{ color: 'var(--color)' }}>figmaId: </strong>
            {user?.figmaId}
          </p>
          <p>
            <strong style={{ color: 'var(--color)' }}>email: </strong>
            {user?.email}
          </p>
          <h2>{user?.handle}</h2>
          <p>
            <strong style={{ color: 'var(--color)' }}>authType: </strong>
            {user?.authType}
          </p>
        </div>
      )}
    </>
  );
};

export default HomePage;
