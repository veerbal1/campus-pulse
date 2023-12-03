import { getUser } from '@/lib/db';
import QRCode from './qr-code';
import { cn } from '@/lib/utils';

const RegistrationApproved = async ({ data, eventInfo }: any) => {
  const { rows } = await getUser(data.student_id);
  const studentInfo = rows ? rows[0] : {};
  console.log('Event Info', data);
  return <Ticket eventInfo={eventInfo} data={data} studentInfo={studentInfo} />;
};

const Ticket = ({ eventInfo, data, studentInfo }: any) => {
  return (
    <div className="flex max-w-xs flex-col items-center justify-center gap-2 border p-4 shadow rounded-md">
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        {eventInfo.name}
      </h3>
      <div className="main-body flex flex-col">
        <div
          className={cn(
            data.qr_scanned && 'flex justify-center items-center relative'
          )}
        >
          <p
            className={cn(
              data.qr_scanned
                ? `absolute z-10 text-center text-xl text-green-400`
                : 'hidden'
            )}
          >
            Ticket Scanned <br /> Successfully
          </p>
          <div className={cn(data.qr_scanned && 'blur-md grayscale')}>
            <QRCode qrCode={data.qr_code} />
          </div>
        </div>
        <div className="student-detail flex flex-col gap-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="font-semibold">{studentInfo.name}</div>
            <small className="text-sm font-medium leading-none mb-1">
              {studentInfo.class_name} {studentInfo.department}
            </small>
            <small className="text-sm font-medium leading-none">
              {studentInfo.roll_no}
            </small>
          </div>
          <ul className="list-disc px-4">
            <li className="text-muted-foreground text-justify text-xs">
              At the Event: Remember to bring your ticket showing the QR code to
              the entry gate on the event day. Our team will scan it to grant
              you seamless entry.
            </li>
            <li className="text-muted-foreground text-justify text-xs">
              Your presence adds to the joy and spirit of the event. Remember to
              be kind, respectful, and open to the experiences that await.
              Let&apos;s make this a beautiful day to remember for everyone
              involved!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegistrationApproved;
