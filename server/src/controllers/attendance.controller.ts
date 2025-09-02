import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Attendance from '@models/attendance.model';
import { AuthRequest } from '@middlewares/auth.middleware';

export const checkIn = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const employeeId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    if (attendance && attendance.checkIn) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Already checked in today' });
      return;
    }

    if (!attendance) {
      attendance = new Attendance({
        employee: employeeId,
        date: today,
        checkIn: new Date(),
      });
    } else {
      attendance.checkIn = new Date();
    }

    await attendance.save();

    res.status(StatusCodes.OK).json({
      message: 'Checked in successfully',
      checkIn: attendance.checkIn,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const checkOut = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const employeeId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    if (!attendance || !attendance.checkIn) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Must check in first' });
      return;
    }

    if (attendance.checkOut) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Already checked out today' });
      return;
    }

    attendance.checkOut = new Date();
    await attendance.save();

    res.status(StatusCodes.OK).json({
      message: 'Checked out successfully',
      checkOut: attendance.checkOut,
      hoursWorked: attendance.hoursWorked,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const getMyAttendance = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const employeeId = req.user._id;
    const { month, year } = req.query;

    const startDate = new Date();
    if (year && month) {
      startDate.setFullYear(
        parseInt(year as string),
        parseInt(month as string) - 1,
        1,
      );
    } else {
      startDate.setMonth(startDate.getMonth() - 1); // Default to last month
    }
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // Last day of the month
    endDate.setHours(23, 59, 59, 999);

    const attendance = await Attendance.find({
      employee: employeeId,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    const totalHours = attendance.reduce(
      (sum, record) => sum + (record.hoursWorked || 0),
      0,
    );

    res.status(StatusCodes.OK).json({
      attendance,
      totalHours: Math.round(totalHours * 100) / 100,
      totalDays: attendance.length,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const getTodayAttendance = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const employeeId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    res.status(StatusCodes.OK).json({
      attendance: attendance || null,
      isCheckedIn: attendance?.checkIn ? true : false,
      isCheckedOut: attendance?.checkOut ? true : false,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

