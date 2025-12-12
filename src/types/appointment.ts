export interface Appointment {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  assignedStaff: number;
  color: string;
  clientNames: string[];
  staffNames: string[];
}

