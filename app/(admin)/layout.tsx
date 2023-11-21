import { auth } from '@/auth';
import { notFound } from 'next/navigation';

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) return null;

  if (session?.user.role !== 'admin') {
    notFound();
  }

  return (
    <>
      {children}
      {JSON.stringify(session)}
    </>
  );
}

export default Layout;
