import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadCNCard,
} from '@/components/ui/card';
import { getActiveUsers, getPendingUsers } from '@/lib/db';

async function PendingCard() {
  const data = await getPendingUsers();
  if (data?.status === 'error') {
    return <div>Something went wrong in card</div>;
  }
  return (
    <ShadCNCard>
      <CardHeader className="pb-1">
        <CardTitle>Pending Users</CardTitle>
        <CardDescription>Number of pending Users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.rowCount}</div>
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </ShadCNCard>
  );
}

export default PendingCard;
