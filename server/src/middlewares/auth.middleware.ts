import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '@utils/jwt';
import User from '@models/user.model';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Access denied. No token provided.' });
      return;
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token.' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token.' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    console.log(req.user, 'req.user');
    if (!req.user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Access denied. User not authenticated.' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Access denied. Insufficient permissions.' });
      return;
    }

    next();
  };
};

