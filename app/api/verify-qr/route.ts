import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@vercel/postgres';
import { auth } from '@/auth';
import { isValidQRCode } from '@/lib/utils';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({
      message: 'Not Authorized',
    });
  }

  const client = createClient();
  await client.connect();

  const data = await req.json();

  console.log('verify-qr data', data);
  const qr = data['qr-text'] as string;
  if (!isValidQRCode(qr)) {
    return NextResponse.json({
      status: 'failed',
      message: 'QR Invalid',
    });
  }
  const codeString = qr.split('event://')[1];
  console.log('Code', codeString);

  //   Check if id exists in registrations table
  const { rowCount } = await client.sql`
        SELECT * FROM college_events_registrations WHERE id = ${codeString} and qr_scanned = false;
  `;
  if (rowCount) {
    await client.sql`
        UPDATE college_events_registrations
        SET qr_scanned = true
        WHERE id = ${codeString};
  `;
    return NextResponse.json({
      status: 'success',
      message: 'QR verified successfully',
    });
  } else {
    return NextResponse.json({
      status: 'failed',
      message: 'QR is not valid',
    });
  }
};
