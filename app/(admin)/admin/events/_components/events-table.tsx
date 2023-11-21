import ApprovedIcon from '@/app/_components/icons/approved-icon';
import { Button } from '@/components/ui/button';
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
import { LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons';
// import AcceptUser from './accept-user-button';
// import RejectUser from './reject-user-button';

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
          <TableHead>Status</TableHead>
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
            <TableCell>
              {row.registration_status === 'Closed' ? (
                <LockClosedIcon className='text-red-600 font-bold'/>
              ) : (
                <LockOpen2Icon className='text-green-600 font-bold'/>
              )}
            </TableCell>
            <TableCell className="text-right flex justify-end">
              {row.registration_status}
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
