import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadCNCard,
} from '@/components/ui/card';
import { getRejectedUsers } from '@/lib/db';

async function RejectedCard() {
  const data = await getRejectedUsers();
  if (data?.status === 'error') {
    return <div>Something went wrong in card</div>;
  }
  return (
    <ShadCNCard>
      <CardHeader className="pb-1">
        <CardTitle>Rejected Users</CardTitle>
        <CardDescription>Number of Rejected Users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.rowCount}</div>
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </ShadCNCard>
  );
}

export default RejectedCard;
