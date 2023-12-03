import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getEvents } from '@/lib/db';
import EventOpenButton from './event-open-btn';
import EventCloseButton from './event-close-btn';
import Link from 'next/link';
import { FileIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

async function EventsTable() {
  const { rows, rowCount } = await getEvents();
  return (
    <Table>
      <TableCaption>A list of your events.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Event Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell className="text-ellipsis overflow-hidden max-w-sm whitespace-nowrap">
              {row.description}
            </TableCell>
            <TableCell>{row.event_date}</TableCell>
            <TableCell>{row.location}</TableCell>
            <TableCell className="text-right flex justify-end">
              <div className="flex gap-2">
                {row.registration_status === 'Open' && (
                  <EventOpenButton id={row.id} />
                )}
                {row.registration_status === 'Closed' && (
                  <EventCloseButton id={row.id} />
                )}
                <Link href={`/admin/events/${row.id}`}>
                  <Button>
                    <FileIcon />
                  </Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">{rowCount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export default EventsTable;
