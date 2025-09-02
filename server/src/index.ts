import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from '@config/db';
import userRouter from '@routes/user.routes';
import attendanceRouter from '@routes/attendance.routes';
import leaveRouter from '@routes/leave.routes';
import dashboardRouter from '@routes/dashboard.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) =>
  res.json({ ok: true, time: new Date().toISOString() }),
);

app.use('/auth', userRouter);
app.use('/attendance', attendanceRouter);
app.use('/leaves', leaveRouter);
app.use('/dashboard', dashboardRouter);

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
})();
