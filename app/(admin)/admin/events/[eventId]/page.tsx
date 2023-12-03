import { getEventDetails } from '@/lib/db';
import { notFound } from 'next/navigation';
import Details from './_components/details';

async function EventDetailsPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { rowCount, rows } = await getEventDetails(params.eventId);
  if (!rowCount) {
    return notFound();
  }
  return (
    <div>
      {rows.map((row) => (
        <Details
          key={row.id}
          details={{
            name: row.name,
            description: row.description,
            event_date: row.event_date,
            location: row.location,
          }}
        />
      ))}
    </div>
  );
}

export default EventDetailsPage;
