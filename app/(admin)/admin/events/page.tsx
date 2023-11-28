import { Suspense } from 'react';
import EventsTable from './_components/events-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function Events() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <div className='w-full flex justify-end'>
            <Link href={'/admin/events/create'}>
              <Button>Create</Button>
            </Link>
          </div>
          <EventsTable />
        </div>
      </Suspense>
    </div>
  );
}

export default Events;
