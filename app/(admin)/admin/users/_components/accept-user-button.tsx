'use client';

import { Button } from '@/components/ui/button';
import { acceptUser } from '@/lib/actions';
import { CheckIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: '',
  status: '',
};

const AcceptUser = ({ id }: { id: string }) => {
  const dispatchWrapper = () => acceptUser(id);
  const [state, formAction] = useFormState(dispatchWrapper, initialState);
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <Button>{pending ? <ReloadIcon className='animate-spin'/> : <CheckIcon />}</Button>;
};

export default AcceptUser;
