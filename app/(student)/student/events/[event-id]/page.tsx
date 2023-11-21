import { getEventDetails } from '@/lib/db';
import EventRegistrationForm from './_components/form';
import { notFound } from 'next/navigation';
import Details from './_components/details';
import { Suspense } from 'react';

async function EventRegistration({
  params,
}: {
  params: {
    'event-id': string;
  };
}) {
  return (
    <Suspense fallback={<div>Loading details...</div>}>
      <Content params={params} />
    </Suspense>
  );
}

const Content = async ({
  params,
}: {
  params: {
    'event-id': string;
  };
}) => {
  if (!params['event-id']) return notFound();
  const { rows, rowCount } = await getEventDetails(params['event-id']);
  if (!rowCount) return notFound();
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-3">
      <div className="flex-1">
        <Details details={rows[0]} />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Suspense fallback={<div>Loading registration form...</div>}>
          <EventRegistrationForm
            eventInfo={rows[0]}
            eventId={params['event-id']}
          />
        </Suspense>
      </div>
    </div>
  );
};
export default EventRegistration;
