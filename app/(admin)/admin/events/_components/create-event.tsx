import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function CreateEventForm() {
  return (
    <div>
      <h3 className="text-lg font-medium">Create New Event</h3>
      <p className="text-sm text-muted-foreground">
        Start organizing your event by filling in the details below.
      </p>
      <form className="flex flex-col gap-2 max-w-lg mt-6">
        <Input placeholder="Event Name" name="name" />
        <Textarea rows={6} placeholder="Description" name="description" />
        <Input
          placeholder="Date - e.g 17 May, 2023 11:00 AM"
          name="event_date"
        />
        <Input placeholder="Location - e.g Chandigarh" name="location" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CreateEventForm;
