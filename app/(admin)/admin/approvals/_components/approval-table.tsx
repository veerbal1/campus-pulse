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
import { LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons';

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
            <TableCell>{row.registration_status}</TableCell>
            <TableCell>X</TableCell>
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
