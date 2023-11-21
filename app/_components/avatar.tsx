import { Avatar as ShadCNAvatar, AvatarFallback } from '@/components/ui/avatar';

function Avatar() {
  return (
    <ShadCNAvatar>
      <AvatarFallback>VS</AvatarFallback>
    </ShadCNAvatar>
  );
}

export default Avatar;
