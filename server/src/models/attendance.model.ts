import mongoose, { Model, Schema } from 'mongoose';
import { IAttendance } from 'custom-types/attendance.types';

const attendanceSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    hoursWorked: {
      type: Number,
      default: 0,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
attendanceSchema.index({ date: 1 });

attendanceSchema.pre('save', function (next) {
  if (this.checkIn && this.checkOut) {
    const diffInMs = this.checkOut.getTime() - this.checkIn.getTime();
    this.hoursWorked = Math.round((diffInMs / (1000 * 60 * 60)) * 100) / 100;
    this.isPresent = true;
  }
  next();
});

const Attendance: Model<IAttendance> = mongoose.model<IAttendance>(
  'Attendance',
  attendanceSchema,
);

export default Attendance;
