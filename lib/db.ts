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
