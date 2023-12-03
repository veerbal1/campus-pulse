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
import { getUserEventRegistrations } from '@/lib/db';

async function RegistrationsTable() {
  const { rows, rowCount } = await getUserEventRegistrations();
  return (
    <Table>
      <TableCaption>A list of events you registred in</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Event Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Registration Status</TableHead>
          <TableHead>Attended</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.event_date}</TableCell>
            <TableCell>{row.location}</TableCell>
            <TableCell>
              {row.registration_status.charAt(0).toUpperCase() +
                row.registration_status.slice(1)}
            </TableCell>
            <TableCell>{row.qr_scanned ? 'Yes' : 'No'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{rowCount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default RegistrationsTable;
