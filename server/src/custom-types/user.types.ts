export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  leaveBalance: number;
  matchPassword(enteredPassword: string): Promise<boolean>;
}
