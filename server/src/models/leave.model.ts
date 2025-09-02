import mongoose, { Model, Schema } from 'mongoose';
import { ILeave } from 'custom-types/leave.types';
import { LeaveType, LeaveStatus } from 'enums/leaves.enum';

const leaveSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    leaveType: {
      type: String,
      enum: Object.values(LeaveType),
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(LeaveStatus),
      default: LeaveStatus.PENDING,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: {
      type: Date,
    },
    rejectedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

leaveSchema.index({ employee: 1, startDate: 1 });
leaveSchema.index({ status: 1 });

const Leave: Model<ILeave> = mongoose.model<ILeave>('Leave', leaveSchema);

export default Leave;
