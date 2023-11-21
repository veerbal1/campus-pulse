import { Suspense } from 'react';
import EventsTable from './_components/events-table';

function Events() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EventsTable />
      </Suspense>
    </div>
  );
}

export default Events;
