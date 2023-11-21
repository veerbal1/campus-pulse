'use client';

import { Button } from '@/components/ui/button';
import { acceptEventRegistration } from '@/lib/actions';
import { CheckIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: '',
  status: '',
};

const AcceptRegistration = ({ id }: { id: string }) => {
  const dispatchWrapper = () => acceptEventRegistration(id);
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
    <Button disabled={pending}>
      {pending ? <ReloadIcon className="animate-spin" /> : <CheckIcon />}
    </Button>
  );
};
export default AcceptRegistration;
