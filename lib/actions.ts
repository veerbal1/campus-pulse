'use server';
import { auth, signIn, signOut } from '@/auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { createClient, sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NewEventFormType } from '@/app/(admin)/admin/events/_components/create-event';
import { formSchema } from '@/app/(admin)/admin/events/_components/schema';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  roll_no: z.string({ required_error: 'Roll Number is required' }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  class_id: z.string({ required_error: 'Class is required' }),
});

export async function signUpAction(
  prevState: string | undefined,
  formData: FormData
) {
  let success = false;
  try {
    const client = createClient();
    await client.connect();
    const formDataObject = Object.fromEntries(formData);
    // Validate the form data using the Zod schema
    const validatedData = signUpSchema.parse(formDataObject);
    console.log('Validated data', validatedData);

    const { rowCount } =
      await client.sql`SELECT id FROM college_users WHERE roll_no = ${validatedData.roll_no};`;

    if (rowCount) return 'User already exists';

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const { rows } = await client.sql`
    INSERT INTO college_users (name, roll_no, password, class_id, role, approval_status)
    VALUES (${validatedData.name}, ${validatedData.roll_no}, ${hashedPassword}, ${validatedData.class_id}, 'student', 'pending');`;
    console.log(rows);
    await client.end();
    success = true;
    console.log('User Submitted Successfully');
    return 'User Submitted Successfully';
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Log or return the validation error messages
      console.error(error.errors);
      return error.errors.map((err) => err.message).join(', ');
    }

    if ((error as Error).message.includes('CredentialsSignup')) {
      return 'CredentialsSignup';
    }
    return JSON.stringify(error);
  } finally {
    if (success) {
      redirect('/');
    }
  }
}

export async function logout() {
  await signOut();
}

export async function acceptUser(id: string) {
  try {
    const client = createClient();
    await client.connect();

    await client.sql`
      UPDATE college_users
      SET approval_status = 'approved'
      WHERE id = ${id}
    `;
    revalidatePath('/admin/users');
    return {
      status: 'success',
      message: 'Something went wrong',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
}

export async function rejectUser(id: string) {
  try {
    const client = createClient();
    await client.connect();

    await client.sql`
      UPDATE college_users
      SET approval_status = 'rejected'
      WHERE id = ${id}
    `;
    revalidatePath('/admin/users');
    return {
      status: 'success',
      message: 'Something went wrong',
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
}

export async function acceptEventRegistration(id: string) {
  try {
    const client = createClient();
    await client.connect();

    const qr_code = `event://${id}`;
    await client.sql`
      UPDATE college_events_registrations
      SET registration_status = 'approved',
          qr_code = ${qr_code}
      WHERE id = ${id}
    `;
    revalidatePath('/admin/approvals');
    return {
      status: 'success',
      message: 'Something went wrong',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
}

export async function registerForEvent(studentId: string, eventId: string) {
  console.log(studentId, eventId);
  try {
    const client = createClient();
    await client.connect();

    await client.sql`
    INSERT INTO college_events_registrations (
      student_id, 
      event_id, 
      registration_status, 
      qr_code, 
      qr_scanned
  ) VALUES (
      ${studentId},
      ${eventId},
      'pending',
      '',
      false
    );
    `;
    console.log('Registration success');
    revalidatePath('/students/approvals/events/${eventId}');
    return {
      status: 'success',
      message: 'Registraion successful',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
}

export async function createEvent(data: NewEventFormType) {
  let success = false;
  try {
    const session = await auth();
    console.log('create event', data);
    formSchema.safeParse(data);
    const userId = session?.user.id;

    const client = createClient();
    await client.connect();

    await client.sql`
    INSERT INTO college_events (name, description, event_date, location, registration_status, created_by)
    VALUES (${data.name},${data.description}, ${data.event_date.toString()}, ${
      data.location
    }, 'Open', ${userId});`;

    console.log('Success');
    success = true;
    revalidatePath('/admin/events');
    return {
      status: 'success',
      message: 'Success',
    };
  } catch (error) {
    console.log('New event submission error', error);
    if (error instanceof z.ZodError) {
      return {
        status: 'error',
        message: 'Zod error',
      };
    }
    return {
      status: 'error',
      message: 'Something went wrong',
    };
  } finally {
    if (success) {
      redirect('/admin/events');
    }
  }
}

export async function toggleEventStatus(id: string, status: 'Open' | 'Closed') {
  try {
    const client = createClient();
    await client.connect();

    await client.sql`
    UPDATE college_events
    SET Registration_status = ${status}
    WHERE id = ${id}
    `;
    console.log(`Event ${status} successfully`);
    revalidatePath('/admin/events');
    return {
      message: `Event ${status} successfully`,
    };
  } catch (error) {
    console.log('Error', error);
    return {
      message: 'Error',
    };
  }
}
