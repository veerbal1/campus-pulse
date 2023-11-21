import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import Header from '../_components/layout/header';
import Footer from '../_components/layout/footer';
import SidebarWrapper from '../_components/layout/sidebar-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import NavLink from '../_components/nav-link';

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
];

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) return null;

  if (session?.user.role !== 'admin') {
    notFound();
  }

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="flex w-full h-full">
        <SidebarWrapper>
          {sidebarMenuItems.map((item) => (
            <NavLink item={item} />
          ))}
        </SidebarWrapper>
        <div className="w-full p-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
