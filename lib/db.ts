import { auth } from '@/auth';
import { createClient } from '@vercel/postgres';

export const getClasses = async () => {
  try {
    const client = createClient();
    await client.connect();

    const { rows } = await client.sql`
        SELECT * FROM college_classes;
    `;
    await client.end();

    return {
      message: 'Classes Found',
      rows,
    };
  } catch (error) {
    console.log('Get Classes', error);
    return {
      message: 'Something went wrong',
      rows: [],
    };
  }
};

export const getUsers = async () => {
  try {
    const client = createClient();
    await client.connect();

    const { rows, rowCount } = await client.sql`
    SELECT 
        college_users.id, 
        college_users.name, 
        college_users.roll_no,  
        college_classes.name as class_name,
        college_classes.department,
        college_users.approval_status
    FROM college_users INNER JOIN college_classes ON college_users.class_id = college_classes.id;
`;
    await client.end();

    return {
      status: 'success',
      message: 'Successfully fetched users',
      rows,
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};

export const getActiveUsers = async () => {
  const session = await auth();
  if (!session) return null;
  try {
    const client = createClient();
    await client.connect();
    const { rowCount } = await client.sql`
    SELECT * FROM college_users WHERE approval_status = 'approved';
`;
    await client.end();

    return {
      status: 'success',
      message: 'Active Found',
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
      rowCount: 0,
    };
  }
};

export const getPendingUsers = async () => {
  const session = await auth();
  if (!session) return null;
  try {
    const client = createClient();
    await client.connect();
    const { rowCount } = await client.sql`
    SELECT * FROM college_users WHERE approval_status = 'pending';
`;
    await client.end();

    return {
      status: 'success',
      message: 'Active Found',
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
      rowCount: 0,
    };
  }
};

export const getRejectedUsers = async () => {
  const session = await auth();
  if (!session) return null;
  try {
    const client = createClient();
    await client.connect();
    const { rowCount } = await client.sql`
    SELECT * FROM college_users WHERE approval_status = 'rejected';
`;
    await client.end();

    return {
      status: 'success',
      message: 'Active Found',
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
      rowCount: 0,
    };
  }
};

export const getEvents = async () => {
  try {
    const client = createClient();
    await client.connect();

    const { rows, rowCount } = await client.sql`
      SELECT id, name, description, event_date, location, registration_status FROM college_events;
    `;
    await client.end();

    return {
      status: 'success',
      message: 'Successfully fetched events',
      rows,
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};

export const getActiveEvents = async () => {
  try {
    const client = createClient();
    await client.connect();

    const { rows, rowCount } = await client.sql`
      SELECT id, name, description, event_date, location, registration_status FROM college_events WHERE registration_status = 'Open';
    `;
    await client.end();

    return {
      status: 'success',
      message: 'Successfully fetched events',
      rows,
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};

export const getEventDetails = async (id: string) => {
  try {
    const client = createClient();
    await client.connect();

    const { rows, rowCount } = await client.sql`
      SELECT id, name, description, event_date, location FROM college_events WHERE id = ${id};
    `;
    await client.end();

    return {
      status: 'success',
      message: 'Successfully fetched event details',
      rows,
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};

export const getEventsRegistrations = async () => {
  try {
    const client = createClient();
    await client.connect();

    const { rows, rowCount } = await client.sql`
    SELECT 
      college_events_registrations.id, 
      college_users.name as student_name,
      college_users.roll_no as roll_number,
      college_classes.name as student_class,
      college_classes.department as student_class_department,
      college_events.name as event_name,
      college_events_registrations.registration_status as registration_status,
      college_events_registrations.qr_code as qr
    FROM 
      college_events_registrations
    INNER JOIN 
      college_users ON college_events_registrations.student_id = college_users.id
    INNER JOIN
      college_classes ON college_users.class_id = college_classes.id
    INNER JOIN
      college_events ON college_events_registrations.event_id = college_events.id;
    `;
    await client.end();
    return {
      status: 'success',
      message: 'Successfully fetched event registrations',
      rows,
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};
