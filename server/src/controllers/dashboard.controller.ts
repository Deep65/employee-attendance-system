import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '@models/user.model';
import Leave from '@models/leave.model';
import Attendance from '@models/attendance.model';
import { AuthRequest } from '@middlewares/auth.middleware';
import { LeaveStatus } from 'enums/leaves.enum';

export const getAdminDashboard = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'employee' });

    const pendingLeaves = await Leave.countDocuments({
      status: LeaveStatus.PENDING,
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttendance = await Attendance.find({ date: today });
    const presentToday = todayAttendance.filter((att) => att.isPresent).length;
    const absentToday = totalEmployees - presentToday;

    const recentLeaves = await Leave.find({ status: LeaveStatus.PENDING })
      .populate('employee', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyAttendance = await Attendance.find({
      date: { $gte: startOfMonth },
    });

    const totalWorkingDays = Math.floor(
      (new Date().getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24),
    );
    const averageAttendance =
      totalEmployees > 0
        ? (monthlyAttendance.filter((att) => att.isPresent).length /
            (totalEmployees * totalWorkingDays)) *
          100
        : 0;

    res.status(StatusCodes.OK).json({
      totalEmployees,
      pendingLeaves,
      todayAttendance: {
        present: presentToday,
        absent: absentToday,
        total: totalEmployees,
      },
      monthlyStats: {
        averageAttendance: Math.round(averageAttendance * 100) / 100,
        totalWorkingDays,
      },
      recentLeaves,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const getEmployeeDashboard = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const employeeId = req.user._id;

    const user = await User.findById(employeeId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      return;
    }

    const startOfYear = new Date();
    startOfYear.setMonth(0, 1);
    startOfYear.setHours(0, 0, 0, 0);

    const approvedLeaves = await Leave.find({
      employee: employeeId,
      status: LeaveStatus.APPROVED,
      startDate: { $gte: startOfYear },
    });

    const totalLeaveDaysUsed = approvedLeaves.reduce((sum, leave) => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      let count = 0;
      const current = new Date(start);

      while (current <= end) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          count++;
        }
        current.setDate(current.getDate() + 1);
      }

      return sum + count;
    }, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyAttendance = await Attendance.find({
      employee: employeeId,
      date: { $gte: startOfMonth },
    });

    const totalHoursThisMonth = monthlyAttendance.reduce(
      (sum, att) => sum + (att.hoursWorked || 0),
      0,
    );
    const presentDays = monthlyAttendance.filter((att) => att.isPresent).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    const pendingLeaves = await Leave.find({
      employee: employeeId,
      status: LeaveStatus.PENDING,
    });

    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        leaveBalance: user.leaveBalance,
        totalLeaveDaysUsed,
      },
      todayAttendance: {
        isCheckedIn: todayAttendance?.checkIn ? true : false,
        isCheckedOut: todayAttendance?.checkOut ? true : false,
        checkIn: todayAttendance?.checkIn,
        checkOut: todayAttendance?.checkOut,
        hoursWorked: todayAttendance?.hoursWorked || 0,
      },
      monthlyStats: {
        totalHours: Math.round(totalHoursThisMonth * 100) / 100,
        presentDays,
        totalWorkingDays: Math.floor(
          (new Date().getTime() - startOfMonth.getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      },
      pendingLeaves: pendingLeaves.length,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};
