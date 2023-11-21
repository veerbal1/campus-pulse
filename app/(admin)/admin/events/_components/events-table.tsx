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
// import AcceptUser from './accept-user-button';
// import RejectUser from './reject-user-button';

async function EventsTable() {
  return (
    <Table>
      <TableCaption>A list of your events.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Timing</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Shopping Plaza</TableCell>
          <TableCell>12 Dec, 2023</TableCell>
          <TableCell className="text-right flex justify-end">Pending</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export default EventsTable;
