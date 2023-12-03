import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import Header from '../_components/layout/header';
import SidebarWrapper from '../_components/layout/sidebar-wrapper';
import NavLink from '../_components/nav-link';
import SlideSidebar from '../_components/layout/slide-sidebar';
import WelcomeMessage from './_components/welcome-message';
import RejectionMessage from './_components/rejection-message';

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
        <Header
          sidebar={
            session?.user.approval_status === 'pending' ||
            session?.user.approval_status === 'rejected' ? (
              <></>
            ) : (
              <SlideSidebarWrapper />
            )
          }
        />
        <div className="relative pt-12">
          {session?.user.approval_status === 'pending' && (
            <div className="w-full h-full flex justify-center">
              <WelcomeMessage userName={session.user.name as string} />
            </div>
          )}
          {session?.user.approval_status === 'rejected' && (
            <div className="w-full h-full flex justify-center">
              <RejectionMessage userName={session.user.name as string} />
            </div>
          )}
          {session?.user.approval_status === 'approved' && (
            <div className="flex w-full h-full">
              <div className="hidden md:block">
                <SidebarWrapper>
                  {sidebarMenuItems.map((item) => (
                    <NavLink key={item.title} item={item} />
                  ))}
                </SidebarWrapper>
              </div>
              <div className="w-full p-4">{children}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const SlideSidebarWrapper = () => {
  return (
    <SlideSidebar>
      <SidebarWrapper>
        {sidebarMenuItems.map((item) => (
          <NavLink key={item.title} item={item} />
        ))}
      </SidebarWrapper>
    </SlideSidebar>
  );
};
export default Layout;
