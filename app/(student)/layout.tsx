import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import Header from '../_components/layout/header';
import SidebarWrapper from '../_components/layout/sidebar-wrapper';
import NavLink from '../_components/nav-link';

const sidebarMenuItems: {
  title: string;
  link: string;
}[] = [
  {
    title: 'Dashboard',
    link: '/student/dashboard',
  },
  {
    title: 'Profile',
    link: '/student/profile',
  },
  {
    title: 'Events',
    link: '/student/events',
  },
  {
    title: 'My Registrations',
    link: '/student/registrations',
  },
];

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) return null;

  if (session?.user.role !== 'student') {
    notFound();
  }

  return (
    <>
      <div className="w-full min-h-screen">
        <Header />
        <div className="flex w-full h-full">
          <SidebarWrapper>
            {sidebarMenuItems.map((item) => (
              <NavLink key={item.title} item={item} />
            ))}
          </SidebarWrapper>
          <div className="w-full p-4">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
