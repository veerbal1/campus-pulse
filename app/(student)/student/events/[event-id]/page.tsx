import { getEventDetails } from '@/lib/db';
import EventRegistrationForm from './form';
import { notFound } from 'next/navigation';
import Details from './details';

async function EventRegistration({
  params,
}: {
  params: {
    'event-id': string;
  };
}) {
  if (!params['event-id']) return notFound();
  const { rows, rowCount } = await getEventDetails(params['event-id']);
  if (!rowCount) return notFound();
  return (
    <div className="w-full h-full flex gap-3">
      <div className="flex-1">
        <Details details={rows[0]} />
      </div>
      <div className="flex-1">
        <EventRegistrationForm
          eventName={rows[0].name}
          eventId={params['event-id']}
        />
      </div>
    </div>
  );
}

export default EventRegistration;
