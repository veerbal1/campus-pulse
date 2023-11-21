import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import Header from '../_components/layout/header';
import Footer from '../_components/layout/footer';
import SidebarWrapper from '../_components/layout/sidebar-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import NavLink from '../_components/nav-link';
import SlideSidebar from '../_components/layout/slide-sidebar';

const sidebarMenuItems = [
  {
    title: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    title: 'Users',
    link: '/admin/users',
  },
  {
    title: 'Approvals',
    link: '/admin/approvals',
  },
  {
    title: 'Events',
    link: '/admin/events',
  },
  {
    title: 'Scan QR',
    link: '/admin/scan',
  },
];

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) return null;

  if (session?.user.role !== 'admin') {
    notFound();
  }

  return (
    <div className="w-full min-h-screen">
      <Header sidebar={<SlideSidebarWrapper />} />
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
    </div>
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
