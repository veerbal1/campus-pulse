'use client';

import { Button } from '@/components/ui/button';
import { toggleEventStatus } from '@/lib/actions';
import { LockClosedIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';

function EventCloseButton({ id }: { id: string }) {
  const dispatchWrapper = () => toggleEventStatus(id, 'Open');
  const [state, formAction] = useFormState(dispatchWrapper, undefined);
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="bg-red-400 hover:bg-red-500" disabled={pending}>
      {pending ? <ReloadIcon className="animate-spin" /> : <LockClosedIcon />}
    </Button>
  );
};

export default EventCloseButton;
