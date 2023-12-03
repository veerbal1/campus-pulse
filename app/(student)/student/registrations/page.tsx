import { getUserEventRegistrations } from '@/lib/db';
import RegistrationsTable from './_components/registrations-table';

async function Profile() {
  return (
    <div>
      <RegistrationsTable />
    </div>
  );
}

export default Profile;
