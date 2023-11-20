import { NextResponse } from 'next/server';
import { createClient } from '@vercel/postgres';

export const GET = async () => {
  const client = createClient();
  await client.connect();

  const { rows, rowCount } = await client.sql`
        SELECT * FROM college_classes;
  `;

  return NextResponse.json({
    rows,
    rowCount,
  });
};
