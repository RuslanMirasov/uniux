import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';
import { redirect } from 'next/navigation';

const CreateProjectLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/create-new-project');
  }

  return <>{children}</>;
};

export default CreateProjectLayout;
