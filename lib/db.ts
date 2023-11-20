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
