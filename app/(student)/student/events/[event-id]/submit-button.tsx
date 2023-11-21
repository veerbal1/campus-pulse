'use client';
import { Button } from '@/components/ui/button';
import { registerForEvent } from '@/lib/actions';
import { FileTextIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: '',
  status: '',
};

function EventSubmitForm({
  studentId,
  eventId,
}: {
  studentId: string;
  eventId: string;
}) {
  const dispatchWrapper = () => registerForEvent(studentId, eventId);
  const [state, formAction] = useFormState(dispatchWrapper, initialState);
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? (
        <ReloadIcon className="animate-spin mr-2" />
      ) : (
        <FileTextIcon className="mr-2" />
      )}
      Register in One Click
    </Button>
  );
};
export default EventSubmitForm;
