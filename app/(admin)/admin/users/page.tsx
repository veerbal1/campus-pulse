import UsersTable from './_components/UsersTable';
import ActiveCard from './_components/cards/active-users';
import PendingCard from './_components/cards/pending-users';
import RejectedCard from './_components/cards/rejected-users';

function Users() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="cards-layer flex flex-wrap gap-4">
        <ActiveCard />
        <PendingCard />
        <RejectedCard />
      </div>
      <div className="tables-layer">
        <UsersTable />
      </div>
    </div>
  );
}

export default Users;
