import { Suspense } from 'react';
import UsersTable from './_components/UsersTable';
import ActiveCard from './_components/cards/active-users';
import PendingCard from './_components/cards/pending-users';
import RejectedCard from './_components/cards/rejected-users';
import CardSkeleton from '@/app/_components/skeleton/card';

function Users() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="cards-layer flex flex-wrap gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ActiveCard />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PendingCard />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <RejectedCard />
        </Suspense>
      </div>
      <div className="tables-layer">
        <Suspense fallback={<div>Loading Table...</div>}>
          <UsersTable />
        </Suspense>
      </div>
    </div>
  );
}

export default Users;
