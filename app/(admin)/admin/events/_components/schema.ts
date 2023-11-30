import * as z from 'zod';
export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter a name with at least 2 characters.' })
    .max(50, { message: 'The name must be no more than 50 characters long.' })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: 'Name contains invalid characters.',
    }),
  description: z.string().min(10, {
    message: 'Please provide a description of at least 10 characters.',
  }),
  event_date: z
    .date({ required_error: 'Please select a date for the event.' })
    .refine((date) => date >= new Date(), {
      message: 'Event date cannot be in the past.',
    }),
  location: z
    .string()
    .trim()
    .min(2, { message: 'Please enter a location with at least 2 characters.' })
    .regex(/^[a-zA-Z0-9\s,]+$/, {
      message: 'Location contains invalid characters.',
    }),
  // If any optional fields are needed, they can be added here.
});
