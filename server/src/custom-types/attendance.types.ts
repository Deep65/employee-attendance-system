import { Document, Types } from 'mongoose';

export interface IAttendance extends Document {
  employee: Types.ObjectId;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  hoursWorked?: number;
  isPresent: boolean;
  notes?: string;
}
