import { Router } from 'express';
import {
  checkIn,
  checkOut,
  getMyAttendance,
  getTodayAttendance,
} from '@controllers/attendance.controller';
import { authenticate } from '@middlewares/auth.middleware';

const attendanceRouter = Router();

attendanceRouter.use(authenticate);

attendanceRouter.post('/check-in', checkIn);
attendanceRouter.post('/check-out', checkOut);
attendanceRouter.get('/my-attendance', getMyAttendance);
attendanceRouter.get('/today', getTodayAttendance);

export default attendanceRouter;

