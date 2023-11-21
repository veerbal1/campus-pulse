'use client';

import { Button } from '@/components/ui/button';
import { rejectUser } from '@/lib/actions';
import { Cross1Icon, ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: '',
  status: '',
};

const RejectUser = ({ id }: { id: string }) => {
  const dispatchWrapper = () => rejectUser(id);
  const [state, formAction] = useFormState(dispatchWrapper, initialState);
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" disabled={pending}>
      {pending ? <ReloadIcon className="animate-spin" /> : <Cross1Icon />}
    </Button>
  );
};

export default RejectUser;
