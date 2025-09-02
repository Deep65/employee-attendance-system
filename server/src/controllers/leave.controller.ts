import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Leave from '@models/leave.model';
import User from '@models/user.model';
import { AuthRequest } from '@middlewares/auth.middleware';
import { LeaveType, LeaveStatus } from 'enums/leaves.enum';

const calculateWorkingDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};

export const applyForLeave = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { startDate, endDate, leaveType, reason } = req.body;
    const employeeId = req.user._id;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Cannot request leave for past dates' });
      return;
    }

    if (end < start) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'End date must be after start date' });
      return;
    }

    const user = await User.findById(employeeId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      return;
    }

    const workingDays = calculateWorkingDays(start, end);
    if (user.leaveBalance < workingDays) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Insufficient leave balance',
        required: workingDays,
        available: user.leaveBalance,
      });
      return;
    }

    const overlappingLeave = await Leave.findOne({
      employee: employeeId,
      status: { $in: [LeaveStatus.PENDING, LeaveStatus.APPROVED] },
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start },
        },
      ],
    });

    if (overlappingLeave) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'You already have a leave request for this period' });
      return;
    }

    const leave = new Leave({
      employee: employeeId,
      startDate: start,
      endDate: end,
      leaveType,
      reason,
    });

    await leave.save();

    res.status(StatusCodes.CREATED).json({
      message: 'Leave request submitted successfully',
      leave,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const getMyLeaves = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const employeeId = req.user._id;
    const { status } = req.query;

    const filter: any = { employee: employeeId };
    if (status) {
      filter.status = status;
    }

    const leaves = await Leave.find(filter)
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({ leaves });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const getAllLeaves = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { status, employee } = req.query;

    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (employee) {
      filter.employee = employee;
    }

    const leaves = await Leave.find(filter)
      .populate('employee', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({ leaves });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const approveLeave = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { leaveId } = req.params;
    const adminId = req.user._id;

    const leave = await Leave.findById(leaveId).populate('employee');
    if (!leave) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Leave request not found' });
      return;
    }

    if (leave.status !== LeaveStatus.PENDING) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Leave request has already been processed' });
      return;
    }

    const workingDays = calculateWorkingDays(leave.startDate, leave.endDate);
    const employee = leave.employee as any;

    if (employee.leaveBalance < workingDays) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Employee has insufficient leave balance' });
      return;
    }

    leave.status = LeaveStatus.APPROVED;
    leave.approvedBy = adminId;
    leave.approvedAt = new Date();

    employee.leaveBalance -= workingDays;

    await Promise.all([leave.save(), employee.save()]);

    res.status(StatusCodes.OK).json({
      message: 'Leave request approved successfully',
      leave,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const rejectLeave = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { leaveId } = req.params;
    const { rejectionReason } = req.body;
    const adminId = req.user._id;

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Leave request not found' });
      return;
    }

    if (leave.status !== LeaveStatus.PENDING) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Leave request has already been processed' });
      return;
    }

    leave.status = LeaveStatus.REJECTED;
    leave.approvedBy = adminId;
    leave.rejectedAt = new Date();
    leave.rejectionReason = rejectionReason;

    await leave.save();

    res.status(StatusCodes.OK).json({
      message: 'Leave request rejected successfully',
      leave,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};
