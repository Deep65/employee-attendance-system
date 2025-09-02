import { Document, Types } from 'mongoose';
import { LeaveStatus, LeaveType } from 'enums/leaves.enum';

export interface ILeave extends Document {
  employee: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  leaveType: LeaveType;
  reason: string;
  status: LeaveStatus;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
}
