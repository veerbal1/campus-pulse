import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadCNCard,
} from '@/components/ui/card';
import { getActiveUsers } from '@/lib/db';

async function ActiveCard() {
  const data = await getActiveUsers();
  if (data?.status === 'error') {
    return <div>Something went wrong in card</div>;
  }
  return (
    <ShadCNCard>
      <CardHeader className="pb-1">
        <CardTitle>Active Users</CardTitle>
        <CardDescription>Number of approved Users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.rowCount}</div>
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </ShadCNCard>
  );
}

export default ActiveCard;
