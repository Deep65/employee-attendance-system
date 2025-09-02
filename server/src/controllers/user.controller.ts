import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import User from '@models/user.model';
import { generateToken } from '@utils/jwt';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'User already exists' });
      return;
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    res.status(StatusCodes.CREATED).json({
      _id: user._id,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken({
      _id: user._id.toString() as string,
      email: user.email,
      role: user.role,
    });

    res.status(StatusCodes.OK).json({
      role: user.role,
      token,
    });
  } catch (error) {
    console.log(error, 'error');
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};
