export type User = {
  id: string;
  name: string;
  roll_no: string;
  password: string;
  class_id: string;
  role: 'admin' | 'student';
  permissions: string[];
  approval_status: 'pending' | 'approved' | 'rejected';
};

export type Event = {
  id: string;
  event_name: string;
  description: string;
  event_date: string;
  location: string;
  registration_status: 'open' | 'close';
  created_by: string;
};

export type Class = {
  id: string;
  class_name: string;
  department: 'CSE' | 'ME' | 'ECE';
};

export type Department = {
  id: string;
  name: string;
};

export type EventRegistration = {
  id: string;
  student_id: string;
  event_id: string;
  registration_status: 'pending' | 'approved' | 'rejected';
};
