'use client';

import { Button } from '@/components/ui/button';
import { toggleEventStatus } from '@/lib/actions';
import { LockOpen2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';

function EventOpenButton({ id }: { id: string }) {
  const dispatchWrapper = () => toggleEventStatus(id, 'Closed');
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
    <Button className="bg-green-400 hover:bg-green-500" disabled={pending}>
      {pending ? <ReloadIcon className='animate-spin'/> : <LockOpen2Icon />}
    </Button>
  );
};

export default EventOpenButton;
