import { auth } from '@/auth';
import EventSubmitForm from './submit-button';
import { getUserEventRegistrationDetail } from '@/lib/db';

async function EventRegistrationForm({
  eventId,
  eventName,
}: {
  eventName: string;
  eventId: string;
}) {
  const session = await auth();
  const { rows, rowCount } = await getUserEventRegistrationDetail(
    session?.user.id as string
  );
  if (rowCount) {
    if (rows[0].registration_status === 'approved') {
      return <div>Registration approved</div>;
    } else if (rows[0].registration_status === 'pending') {
      return <PendingSubmission eventName={eventName} />;
    } else {
      return <div>Registration rejected</div>;
    }
  } else {
    return (
      <div className="w-full shadow p-4 flex flex-col gap-6">
        <p className="text-xl text-muted-foreground">
          Fantastic! It looks like you're already part of our community. We've
          saved your details to make things easier for you. Just one quick click
          and you're all set for the event!
        </p>
        <EventSubmitForm
          studentId={session?.user.id as string}
          eventId={eventId}
        />
      </div>
    );
  }
}

const PendingSubmission = ({ eventName }: { eventName: string }) => {
  return (
    <div className="border-l px-2">
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Thank You for Registering!
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Your request to attend "<>{eventName}</>" has been successfully
        submitted. Here's what you need to know:
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          Admin Approval: Your registration is currently pending approval from
          our event admin team. This is a necessary step to ensure the best
          experience for all attendees.
        </li>

        <li>
          Check Back Soon: There's no need to wait for an email notification.
          Simply refresh the event page occasionally to check the status of your
          registration.
        </li>

        <li>
          Access Your Ticket: Once your registration is approved (typically this
          happens quickly), you'll see your event ticket with a unique QR code
          on the same page upon refresh.
        </li>

        <li>
          At the Event: Remember to bring your ticket showing the QR code to the
          entry gate on the event day. Our team will scan it to grant you
          seamless entry.
        </li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        We're thrilled to have you join us and look forward to creating
        unforgettable memories together. If you have any questions or need
        assistance, don't hesitate to contact us.
      </p>
    </div>
  );
};

export default EventRegistrationForm;
