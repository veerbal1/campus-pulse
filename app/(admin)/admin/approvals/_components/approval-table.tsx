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
import { getEventsRegistrations } from '@/lib/db';
import {
  CheckCircledIcon,
  LockClosedIcon,
  LockOpen2Icon,
  TimerIcon,
} from '@radix-ui/react-icons';
import AcceptButton from './accept-button';
import RejectButton from './reject-button';
import AcceptRegistration from './accept-button';

async function ApprovalTable() {
  const { rows, rowCount } = await getEventsRegistrations();
  return (
    <Table>
      <TableCaption>A list of your events.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Roll No.</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.student_name}</TableCell>
            <TableCell>
              {row.student_class} - {row.student_class_department}
            </TableCell>
            <TableCell>{row.roll_number}</TableCell>
            <TableCell>{row.event_name}</TableCell>
            {row.registration_status === 'pending' && (
              <TableCell>
                <TimerIcon className="text-gray-500" />
              </TableCell>
            )}
            {row.registration_status === 'approved' && (
              <TableCell>
                <CheckCircledIcon className="text-green-600" />
              </TableCell>
            )}

            <TableCell className="flex justify-end">
              <div className="flex gap-2">
                {row.registration_status === 'pending' ? (
                  <AcceptRegistration id={row.id} />
                ) : (
                  <div>Approved</div>
                )}
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
export default ApprovalTable;
