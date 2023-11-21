import { getUser } from '@/lib/db';

const RegistrationApproved = async ({ data, eventInfo }: any) => {
  const { rows } = await getUser(data.student_id);
  const studentInfo = rows ? rows[0] : {};
  //   qr_code
  /**
   *  {"id":"dafc30be-e3e1-4381-a1cc-88a0c5e71136","student_id":"23e8b829-c047-4d21-afd2-404a7e6455da","event_id":"0ff42608-d8e9-4c9d-b50c-e6dd8a207bec","registration_status":"approved","qr_code":"event://dafc30be-e3e1-4381-a1cc-88a0c5e71136","qr_scanned":false,"entry_time":null,"createdat":"2023-11-21T09:09:30.949Z","updatedat":"2023-11-21T09:09:30.949Z"}
   */
  const {} = data;
  return (
    <div className="flex max-w-xs flex-col items-center justify-center gap-2 border p-4 shadow">
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        {eventInfo.name}
      </h3>
      <div className="main-body flex flex-col">
        <div className="qr mx-auto h-56 w-56 rounded-lg bg-emerald-300">QR</div>
        <div className="student-detail flex flex-col gap-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="font-semibold">{studentInfo.name}</div>
            <small className="text-sm font-medium leading-none">
              {studentInfo.class_name} {studentInfo.department}
            </small>
            <small className="text-sm font-medium leading-none">
              {studentInfo.roll_no}
            </small>
          </div>
          <p className="text-muted-foreground text-justify text-xs">
            Thank you for joining us on this memorable journey. As we gather to
            celebrate, let's cherish these moments with sincerity and kindness.
            Your presence adds to the joy and spirit of the event. Remember to
            be kind, respectful, and open to the experiences that await. Let's
            make this a beautiful day to remember for everyone involved!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationApproved;
