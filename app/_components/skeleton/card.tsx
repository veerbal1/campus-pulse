import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle>
          <Skeleton className='w-[100px] h-12'/>
        </CardTitle>
        <CardDescription>
          <Skeleton />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Skeleton />
        </div>
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}

export default CardSkeleton;
