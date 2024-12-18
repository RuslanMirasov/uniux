'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { Preloader, Button, ButtonsList } from './components';
import { usePopup } from '@/hooks/usePopup';

const HomePage: React.FC = () => {
  const { user, isLogin, isLoading } = useAuth();
  const { openPopup } = usePopup();

  const handleClick = (): void => {
    openPopup({
      type: 'error',
      title: 'Error 409',
      subtitle: (
        <>
          Invalid login or password, <br />
          please check if your data is correct and try again.
        </>
      ),
      btn: 'Try again',
      icon: 'error',
      action: () =>
        openPopup({
          type: 'message',
          title: (
            <>
              A new customer <br />
              successfully created
            </>
          ),
          subtitle: (
            <>
              Now you can use our service fully, <br />
              create your first test and enjoy it.
            </>
          ),
          btn: 'OK',
          icon: 'confirm',
        }),
    });
  };

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
          <Image
            src={user.img_url ? user.img_url : '/placeholder.jpg'}
            alt="User"
            width="120"
            height="120"
            style={{ borderRadius: '100px', width: '120px', height: '120px' }}
          />

          <p>
            <strong style={{ color: 'var(--color)' }}>ID: </strong>
            {user?.figmaId}
          </p>
          <p>
            <strong style={{ color: 'var(--color)' }}>email: </strong>
            {user?.email}
          </p>
          <h2>{user.handle ? user.handle : 'New User'}</h2>
          <p>
            <strong style={{ color: 'var(--color)' }}>authType: </strong>
            {user?.authType}
          </p>

          <Button onClick={handleClick}>Popup</Button>
        </div>
      )}
    </>
  );
};

export default HomePage;
