import { Button } from '@/components/ui/button';

import { auth, signOut } from '@/auth';
import { logout } from '@/lib/actions';

function Dashboard() {
  return (
    <div>
      Dashboard
      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </div>
  );
}

export default Dashboard;
