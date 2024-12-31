'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { Preloader, SidebarMain, Projects } from './components';

const HomePage: React.FC = () => {
  const { user, isLogin, isLoading } = useAuth();

  if (isLoading) return <Preloader />;

  return (
    <>
      <SidebarMain>
        <h1>Sidebar</h1>
      </SidebarMain>
      <Projects />

      {/* {isLogin && user && (
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
            width="320"
            height="320"
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
        </div>
      )} */}
    </>
  );
};

export default HomePage;
