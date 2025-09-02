import { Router } from 'express';
import {
  applyForLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
} from '@controllers/leave.controller';
import { authenticate, authorize } from '@middlewares/auth.middleware';

const leaveRouter = Router();

leaveRouter.use(authenticate);

leaveRouter.post('/apply', applyForLeave);
leaveRouter.get('/my-leaves', getMyLeaves);

leaveRouter.get('/all', authorize('admin'), getAllLeaves);
leaveRouter.patch('/:leaveId/approve', authorize('admin'), approveLeave);
leaveRouter.patch('/:leaveId/reject', authorize('admin'), rejectLeave);

export default leaveRouter;

