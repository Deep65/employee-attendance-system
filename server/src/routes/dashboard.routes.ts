import { Router } from 'express';
import {
  getAdminDashboard,
  getEmployeeDashboard,
} from '@controllers/dashboard.controller';
import { authenticate, authorize } from '@middlewares/auth.middleware';

const dashboardRouter = Router();

dashboardRouter.use(authenticate);

dashboardRouter.get('/admin', authorize('admin'), getAdminDashboard);
dashboardRouter.get('/employee', getEmployeeDashboard);

export default dashboardRouter;

